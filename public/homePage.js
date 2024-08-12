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
			moneyManager.setMessage(response, "Баланс успешно пополнен");
		} else {
			moneyManager.setMessage(!response, "Ошибка пополнения баланса");
		}
	});
};

//Конвертирование валюты

moneyManager.conversionMoneyCallback = function(data) {
	ApiConnector.convertMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(
				response,
				"Конвертирование валюты успешно выполнено",
			);
		} else {
			moneyManager.setMessage(!response, "Ошибка конвертирования валюты");
		}
	});
};

//Перевод валюты

moneyManager.sendMoneyCallback = function(data) {
	ApiConnector.transferMoney(data, (response) => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response, "Перевод валюты успешно выполнен");
		} else {
			moneyManager.setMessage(!response, "Ошибка перевода валюты");
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
			favoritesWidget.setMessage(
				response,
				"Пользователь успешно добавлен в список избранных",
			);
		} else {
			favoritesWidget.setMessage(
				!response,
				"Пользователь не может быть добавлен в список избранных",
			);
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
			favoritesWidget.setMessage(
				response,
				"Пользователь успешно удален из списка избранных",
			);
		} else {
			favoritesWidget.setMessage(
				!response,
				"Пользователь не может быть удален из списка избранных",
			);
		}
	});
};