import csv


def csv_reader(filepath):
	"""
	Returns a list of lines from the specified file.
	"""
	files = []
	with open(filepath, encoding='utf-8', newline='') as csvfile:
		reader = csv.reader(csvfile)
		for row in reader:
			files.append(row)
	return files
