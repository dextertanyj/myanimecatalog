import os
import re

REGEX_TEMPLATE = "(.*{0}$)|(.*{0}\/.*)"

def indexer(directory_path, excluded_folders):
	"""
	Returns all files (with their absolute path) contained in the directory, and its subdirectories, given as argument.
	Ignores any files contained in folders specified within the list of exlcuded folders.
	
	Parameters:
	directory_path (string): The absolute path of the directory to scan.
	excluded_folders (list[string]): A list of folder names that should be excluded during the scan.

	Returns:
	list[string]: The list of file paths of all files stored within the directory and its subdirectories.
	"""
	filepaths = []
	if excluded_folders:
		exclude_expression = "|".join(map(lambda s: str.format(REGEX_TEMPLATE, s), excluded_folders))
		pattern = re.compile(exclude_expression)
	else:
		pattern = None
	for (dirpath, dirnames, filenames) in os.walk(directory_path, topdown=True):
		if pattern and pattern.search(dirpath):
			continue
		for filename in filenames:
			if filename[0] == ".":
				continue
			filepaths.append(os.path.join(dirpath,filename))
	return filepaths



