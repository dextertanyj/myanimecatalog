import * as Yup from 'yup';

const pathFormat = Yup.string().typeError(`File path should be a string`);
const codecFormat = Yup.string().typeError(`Codec should be a string`);
const hoursFormat = Yup.number()
  .typeError(`Hours should be a number`)
  .min(0, `Invalid duration`);
const minutesFormat = Yup.number()
  .typeError(`Minutes should be a number`)
  .min(0, `Invalid duration`);
const secondsFormat = Yup.number()
  .typeError(`Seconds should be a number`)
  .min(0, `Invalid duration`);
const sizeFormat = Yup.number()
  .typeError(`File size should be a number`)
  .min(1, `Invalid file size`);
const sourceFormat = Yup.string().typeError(`Source type should be a string`);
const widthFormat = Yup.number()
  .typeError(`Width should be a number`)
  .min(1, `Invalid resolution`);
const heightFormat = Yup.number()
  .typeError(`Height should be a number`)
  .min(1, `Invalid resolution`);
const checksumFormat = Yup.string().typeError(`Checksum should be a string`);

export const FileFormJsonSchema = Yup.object({
  path: pathFormat,
  codec: codecFormat,
  hours: hoursFormat,
  minutes: minutesFormat,
  seconds: secondsFormat,
  size: sizeFormat,
  source: sourceFormat,
  width: widthFormat,
  height: heightFormat,
  checksum: checksumFormat,
});

export const FileFormValidationSchema = Yup.object({
  path: pathFormat.required(`Please enter the file path`),
  codec: codecFormat.required(`Please enter the video codec`),
  hours: hoursFormat.required(`Please input the duration`),
  minutes: minutesFormat.required(`Please input the duration`),
  seconds: secondsFormat.required(`Please input the duration`),
  size: sizeFormat.required(`Please enter the file size`),
  source: sourceFormat.required(`Please choose a source type`),
  width: widthFormat.required(`Please enter the resolution`),
  height: heightFormat.required(`Please enter the resolution`),
  checksum: checksumFormat.required(`Please enter the checksum`),
});
