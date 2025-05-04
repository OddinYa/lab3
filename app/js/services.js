angular.module('familyFinanceApp')
    .factory('FamilyFinanceService', function($http) {
        const baseUrl = 'http://localhost:8080';
        const familyId = 1; // Предполагаем, что работаем с семьей с ID=1
        
        return {
            // Методы для работы с балансом семьи
            getFamilyBalance: function() {
                return $http.get(`${baseUrl}/family/balance/${familyId}`);
            },
            addToFamilyBalance: function(amount) {
                return $http.post(`${baseUrl}/family/balance/${familyId}`, { cash: amount });
            },
            
            // Методы для работы с покупками
            getBuys: function() {
                return $http.get(`${baseUrl}/buys/${familyId}`);
            },
            addBuy: function(buy) {
                return $http.post(`${baseUrl}/buys/${familyId}`, buy);
            },
            deleteBuy: function(buyId) {
                return $http.delete(`${baseUrl}/buys/${buyId}/${familyId}`);
            },
            
            // Методы для работы с пользователями
            getUsers: function() {
                return $http.get(`${baseUrl}/users`);
            },
            getUser: function(userId) {
                return $http.get(`${baseUrl}/users/${userId}`);
            },
            addUser: function(user) {
                return $http.post(`${baseUrl}/users/${familyId}`, user);
            },
            deleteUser: function(userId) {
                return $http.delete(`${baseUrl}/users/${userId}`);
            }
        };
    });

    