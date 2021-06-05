import json


class JSONWriter:
	def __init__(self, output_path):
		self.__file = open(output_path, "a+", encoding="utf-8", newline = '')

	def write(self, data):
		string = json.dumps(data, ensure_ascii=False)
		self.__file.write(str.format("{0}\r\n",string))

	def close(self):
		self.__file.close()