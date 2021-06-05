import csv
import json
import logging
import os
import re
import subprocess
import sys
from enum import Enum

from analyser.analyser import Analyser
from analyser.indexer import indexer
from readers.csvreader import csv_reader
from writers.csvwriter import CSVWriter
from writers.jsonwriter import JSONWriter

log_file = os.path.join(os.path.dirname(__file__), "info.log")
logging.basicConfig(filename=log_file, encoding='utf-8', level=logging.INFO)

INVALID_SELECTION_PROMPT = "Invalid selection."
OUTPUT_TYPE_PROMPT = "Please select output type (csv/json): "
TLD_PROMPT = "Please input the top level directory: "
EXCLUDE_FOLDER_PROMPT = (
		"Please input the names of subfolders to exclude " +
		"[separate multiple entries with \"/\"] (Default: {}): "
)
EXISTING_FILE_PROMPT = "Please input the name of the csv file containing existing records (Default: {0}): "
OUTPUT_FILE_PROMPT = "Please enter the output file name (Default: {0}): "
DEFAULT_EXCLUDE = ["Extras"]
DEFAULT_OUTPUT_CSV = "output.csv"
DEFAULT_OUTPUT_JSON = "output.txt"
DEFAULT_EXISTING_FILE = "fileList.csv"

# The structure of the directory should follow that of the Plex recommendations.

def main():
	working_directory = os.path.dirname(__file__)
	directory_path = input(TLD_PROMPT)
	analyser = Analyser(directory_path)

	output_type = input(OUTPUT_TYPE_PROMPT).lower()
	while (output_type != "csv" and output_type != "json"):
		print(INVALID_SELECTION_PROMPT)
		output_type = input(OUTPUT_TYPE_PROMPT).lower()

	output_file_name = DEFAULT_OUTPUT_CSV if output_type == "csv" else DEFAULT_OUTPUT_JSON
	output_file = input(str.format(OUTPUT_FILE_PROMPT, output_file_name))

	excluded_subfolders = input(EXCLUDE_FOLDER_PROMPT.format("/".join(DEFAULT_EXCLUDE)))
	if excluded_subfolders:
		excluded_subfolders = map(lambda s: s.strip(), excluded_subfolders.split("/"))
	else:
		excluded_subfolders = DEFAULT_EXCLUDE

	existing_record_file = input(EXISTING_FILE_PROMPT.format(DEFAULT_EXISTING_FILE))
	if not existing_record_file:
		existing_record_file = DEFAULT_EXISTING_FILE

	try:
		existing_records = os.path.join(working_directory, existing_record_file)
		existing_entries = set(map(lambda entry: entry[0], csv_reader(existing_records)))
	except IOError:
		logging.info("File containing existing entries not found.")
		existing_entries = set()
	

	output_path = os.path.join(os.path.dirname(__file__), output_file_name)
	if (output_type == "csv"):
		writer = CSVWriter(output_path)
	else:
		writer = JSONWriter(output_path)

	print("Indexing files...")
	files = indexer(directory_path, excluded_subfolders)
	files = [x for x in files if not any(s for s in existing_entries if s in x)]
	file_count = len(files)
	print("Indexing complete. {0} new files found.".format(file_count))

	print("Analysing files...")
	processed_count = 0
	percent_completed = 0
	for file in files:
		data = analyser.analyse(file)
		processed_count += 1
		if int((processed_count / file_count) * 100) > percent_completed:
			percent_completed = int((processed_count / file_count) * 100)
			sys.stdout.write('\r')
			sys.stdout.write("{}% completed".format(percent_completed))
			sys.stdout.flush()
		if not data:
			logging.warning("{} could not be analysed. ".format(file))
			continue
		writer.write(data)

	print()
	writer.close()

if __name__ == "__main__":
	main()
