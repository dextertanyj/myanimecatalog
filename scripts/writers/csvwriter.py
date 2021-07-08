import csv


class CSVWriter:
	def __init__(self, output_path):
		self.__file = open(output_path, "a+", encoding="utf-8", newline = '')
		self.__writer = csv.writer(self.__file)

	def write(self, data):
		duration = str.format("{0}:{1}:{2}", data["hours"], data["minutes"], data["seconds"])
		resolution = str.format("{0}×{1}", data["width"], data["height"])
		row_data = (data["path"], data["checksum"], data["size"], data["codec"], duration, resolution)
		self.__writer.writerow(row_data)

	def close(self):
		self.__file.close()
