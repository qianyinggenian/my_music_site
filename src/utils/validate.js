function validateRequiredFn (rule, value, callback) {
  setTimeout(() => {
    if ((value !== 0 && !value) || (value + '').toString().trim() === '') {
      callback(new Error('* 非空选项!'));
    } else {
      callback();
    }
  });
}
/* 判断是否为空（当input框失去焦点时触发） */
const Required = { required: true, validator: validateRequiredFn, message: '* 非空选项', trigger: 'blur' };
/* 判断(选择下拉，radio单选框)是否为空（当值为改变的时候触发） */
const RequiredChange = { required: true, message: '*非空选项', trigger: 'change' };
/* 判断checkbox复选框是否为空（当值为改变的时候触发） */
const RequiredCheckboxChange = { type: 'array', required: true, message: '*非空选项', trigger: 'change' };
export default {
  Required,
  RequiredChange,
  RequiredCheckboxChange
};
