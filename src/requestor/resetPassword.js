import Api from './api';

const SendMeLink = (email) => {
  const data = {
    email
  };
  return Api.post('main/reset_passwd_send/', false, data);
};

const ConfirmToken = (token) => Api.get(`main/reset_passwd_confirm/${token}`);

const SetNewPassword = (newPassword) => Api.post('main/reset_passwd_set_new/', true, { new_password: newPassword, new_password_confirm: newPassword });

export default {
  SendMeLink,
  ConfirmToken,
  SetNewPassword
};