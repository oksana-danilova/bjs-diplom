"use strict";

// Выход из личного кабинета

let logoutButton = new LogoutButton();
logoutButton.action = function() {
	ApiConnector.logout((response) => {
		if (response.success) {
			location.reload();
		}
	});
};

// Получение информации о пользователе

ApiConnector.current((response) => {
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
});

// Получение текущих курсов валюты

let ratesBoard = new RatesBoard();

function getStocks() {
	ApiConnector.getStocks((response) => {
		if (response.success) {
			ratesBoard.clearTable(response.data);
			ratesBoard.fillTable(response.data);
		}
	});
}
getStocks();
setInterval(getStocks, 60000);

// Операции с деньгами

let moneyManager = new MoneyManager();

//Пополнение баланса

moneyManager.addMoneyCallback = function(data) {
	ApiConnector.addMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Баланс успешно пополнен");
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};

//Конвертирование валюты

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Конвертирование валюты успешно выполнено");
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};

//Перевод валюты

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Перевод валюты успешно выполнен");
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	});
};

// Работа с избранным

let favoritesWidget = new FavoritesWidget();

//Запрос начального списка избранного

ApiConnector.getFavorites((response) => {
	if (response.success) {
		favoritesWidget.clearTable(response.data);
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

//Добавление пользователя в список избранных

favoritesWidget.addUserCallback = function(data) {
	ApiConnector.addUserToFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable(response.data);
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен в список избранных");
		} else {
			favoritesWidget.setMessage(response.success, response.error);
		}
	});
};

//Удаление пользователя из избранного

favoritesWidget.removeUserCallback = function(data) {
	ApiConnector.removeUserFromFavorites(data, (response) => {
		if (response.success) {
			favoritesWidget.clearTable(response.data);
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, "Пользователь успешно удален из списка избранных");
		} else {
			favoritesWidget.setMessage(response.success, response.error);
		}
	});
};