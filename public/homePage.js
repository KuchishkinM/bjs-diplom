const logoutUser = new LogoutButton();

logoutUser.action = function () {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data)
  }
});

const userRatesBoard = new RatesBoard();

setInterval(function getRatesBoard() {
  ApiConnector.getStocks(response => {
    if (response.success) {
      userRatesBoard.clearTable();
      userRatesBoard.fillTable(response.data);
    }
  });
}, 1000);

const userMoneyManager = new MoneyManager();

userMoneyManager.addMoneyCallback = function (data) {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      userMoneyManager.setMessage(true, 'Баланс пополнен')
    } else {
      userMoneyManager.setMessage(false, response.error)
    }
  })
};

userMoneyManager.conversionMoneyCallback = function (data) {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      userMoneyManager.setMessage(true, 'Конвертация удалась')
    } else {
      userMoneyManager.setMessage(false, response.error)
    }
  })
};

userMoneyManager.sendMoneyCallback = function (data) {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      userMoneyManager.setMessage(true, 'Успешный перевод')
    } else {
      userMoneyManager.setMessage(false, response.error)
    }
  })
};

const userFavoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
  if (response.success) {
    userFavoritesWidget.clearTable();
    userFavoritesWidget.fillTable(response.data);
    userMoneyManager.updateUsersList(response.data);
  }
});

userFavoritesWidget.addUserCallback = function (data) {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      userFavoritesWidget.clearTable();
      userFavoritesWidget.fillTable(response.data);
      userMoneyManager.updateUsersList(response.data);
      userFavoritesWidget.setMessage(true, 'Пользователь добавлен')
    } else {
      userFavoritesWidget.setMessage(false, response.error)
    }
  })
};

userFavoritesWidget.removeUserCallback = function (data) {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      userFavoritesWidget.clearTable();
      userFavoritesWidget.fillTable(response.data);
      userMoneyManager.updateUsersList(response.data);
      userFavoritesWidget.setMessage(true, 'Пользователь удален')
    } else {
      userFavoritesWidget.setMessage(false, response.error)
    }
  })
};