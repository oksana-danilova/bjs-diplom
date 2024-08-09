'use strict'

let newUser = new UserForm();

newUser.loginFormCallback = function(data) {
  ApiConnector.login(data, responce => {
    if (responce.success) {
      location.reload();
    } else {
      newUser.setLoginErrorMessage(responce.error);
    }
  });
}

newUser.registerFormCallback = function(data) {
  ApiConnector.register(data, responce => {
    if (responce.success) {
      location.reload();
    } else {
      newUser.setRegisterErrorMessage(responce.error);
    }
  });
}