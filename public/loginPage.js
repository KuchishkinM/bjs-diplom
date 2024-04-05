"use strict";

const formForUser = new UserForm();

formForUser.loginFormCallback = function (data) {
     (data, response => {
        if (response.success) {
            location.reload();
        } else {
            formForUser.setLoginErrorMessage('Ошибка при авторизации!!!')
        }
    });
};

formForUser.registerFormCallback = function (data) {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            formForUser.setRegisterErrorMessage('Ошибка при регистрации!!!')
        }
    });
};

