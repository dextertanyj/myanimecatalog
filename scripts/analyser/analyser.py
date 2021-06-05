import json
import logging
import os
import re
import subprocess

FFPROBE_COMMAND = ["ffprobe", "-v", "quiet", "-hide_banner", "-print_format", "json", "-show_format", "-show_streams"]
CRC32_REGEX = "\[[A-Z0-9]{8}\]"


class Analyser:
    def __init__(self, root):
        self.__root = root
        self.__folder = os.path.basename(os.path.normpath(root))

    def analyse(self, filename):
        data = self.__run_ffprobe(filename)
        if not data:
            return None
        return self.__process_data(filename, data)

    def __run_ffprobe(self, filepath):
        """
        Returns an object that contains the output of ffprobe on the specified file.
        """
        command_arguments = FFPROBE_COMMAND + [str.format("{0}", filepath)]
        program = subprocess.run(command_arguments, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        output = json.loads(program.stdout.decode('utf-8'))
        return output

    def __process_data(self, file, data):
        """
        Extracts the path, checksum, size, codec, duration, and resolution of the file from the given data.
        """
        try:
            streams = data["streams"]
            default_video_streams = [s for s in streams if s["disposition"]["default"] == 1 and s["codec_type"] == "video"]
            if len(default_video_streams) == 0:
                default_video_stream = [s for s in streams if s["codec_type"] == "video"][0]
            else:
                default_video_stream = default_video_streams[0]
            codec_name = default_video_stream["codec_name"].upper()
            codec_profile = str.format("({0})", default_video_stream["profile"])
            codec = str.format("{0} {1}", codec_name, codec_profile)
            res_height = default_video_stream["height"]
            res_width = default_video_stream["width"]

            properties = data["format"]
            size = int(properties["size"])
            duration = int(round(float(properties["duration"]), 0))
            minutes, seconds = divmod(duration, 60)
            hours, minutes = divmod(minutes, 60)
            path = properties["filename"]
            relative_path = self.__relative_path(path)
            checksum = self.__get_checksum(relative_path)
            output = {
                "path": relative_path,
                "checksum": checksum,
                "size": size,
                "codec": codec,
                "hours": hours,
                "minutes": minutes,
                "seconds": seconds,
                "height": res_height,
                "width": res_width,
            }
            return output
        except (KeyError, AttributeError, IndexError) as err:
            logging.warning(str.format("Unable to read file {0}: {1}", file, err))
            return None

    def __relative_path(self, path):
        """
        Converts the given absolute path to a relative path with respect to the root folder.
        """
        relative_path = os.path.relpath(path, self.__root)
        return os.path.join(self.__folder, relative_path)

    def __get_checksum(self, filename):
        """
        Returns the checksum from the filename, if any.
        """
        pattern = re.compile(CRC32_REGEX)
        match = pattern.search(filename)
        if not match:
            logging.info(str.format("Checksum not found for {0}.", filename))
            return None
        return match.group(0)[1:-1]
