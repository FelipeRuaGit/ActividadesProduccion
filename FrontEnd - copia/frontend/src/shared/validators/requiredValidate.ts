export const requiredValidate = (data: any) =>
  data == null || data == undefined || data == '' ? false : true;
