"use strict";

const formForUser = new UserForm();

formForUser.loginFormCallback = function (data) {
     ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            formForUser.setLoginErrorMessage(response.error)
        }
    });
};

formForUser.registerFormCallback = function (data) {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            formForUser.setRegisterErrorMessage(response.error)
        }
    });
};

