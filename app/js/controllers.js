
angular.module('familyFinanceApp')
    .controller('MainController', function($scope, FamilyFinanceService) {
        $scope.newBuy = {};
        $scope.buys = [];
        $scope.familyBalance = 0;
        $scope.users = [];
        $scope.amount = 0;
        
        // Загрузка данных при инициализации
        function loadData() {
            FamilyFinanceService.getFamilyBalance().then(function(response) {
                $scope.familyBalance = response.data;
            });
            
            FamilyFinanceService.getBuys().then(function(response) {
                $scope.buys = response.data;
            });
            
            FamilyFinanceService.getUsers().then(function(response) {
                $scope.users = response.data;
            });
        }
        
        loadData();

        $scope.addToFamilyBalance = function(amount) {
            if (amount && amount > 0) {
                FamilyFinanceService.addToFamilyBalance(amount).then(function() {
                    loadData(); // Перезагружаем данные после пополнения
                    $scope.amount = 0; // Сбрасываем введенную сумму
                }).catch(function(error) {
                    console.error('Error adding to balance:', error);
                });
            } else {
                alert('Пожалуйста, введите положительную сумму');
            }
        };
        
        // Добавление новой покупки
        $scope.addBuy = function() {
            if ($scope.newBuyForm.$valid) {
                // Приводим типы данных к нужному формату
                var buyData = {
                    idUser: Number($scope.newBuy.idUser),  // Преобразуем в число
                    cost: parseFloat($scope.newBuy.cost),  // Преобразуем в float
                    name: String($scope.newBuy.name),      // Явное преобразование в строку
                    date: typeof $scope.newBuy.date === 'string' ? 
                          $scope.newBuy.date : 
                          $scope.newBuy.date.toISOString().split('T')[0]
                }; 

                FamilyFinanceService.addBuy(buyData).then(function() {
                    loadData();
                    $scope.newBuy = {};
                    $scope.newBuyForm.$setPristine();
                }).catch(function(error) {
                    console.error('Error adding buy:', error);
                    alert('Ошибка при добавлении: ' + error.data.message);
                });
            }
            
        };
        
        // Удаление покупки
        $scope.deleteBuy = function(buyId) {
            if (confirm('Вы уверены, что хотите удалить эту покупку?')) {
                FamilyFinanceService.deleteBuy(buyId).then(function() {
                    loadData(); // Перезагружаем данные после удаления
                }).catch(function(error) {
                    console.error('Error deleting buy:', error);
                });
            }
        };
    })
    .controller('UserController', function($scope, FamilyFinanceService) {
        $scope.users = [];
       
        
        // Загрузка пользователей
        function loadUsers() {
            FamilyFinanceService.getUsers().then(function(response) {
                $scope.users = response.data;
            }).catch(function(error) {
                console.error('Error loading users:', error);
            });
        }
        
        loadUsers();

        $scope.newUser = {
            name: '',
            money: {
                cash: 0
            },
            spending: 0, // по умолчанию
            buyList: [] // по умолчанию
        };
        
        $scope.addUser = function() {
            if ($scope.userForm.$valid) {
                
                var userToSend = {
                    name: $scope.newUser.name,
                    money: {
                        cash: parseFloat($scope.newUser.money.cash) || 0
                    },
                    spending: 0, // по умолчанию
                     buyList: [] // по умолчанию
                    
                };
                
                FamilyFinanceService.addUser(userToSend)
                    .then(function() {
                      
                        $scope.newUser = {  
                            name: '',
                            money: { cash: 0 },
                            spending: 0,
                            buyList: []
                        };
                        $scope.userForm.$setPristine(); 
                        
                        
                        loadUsers();
                    })
                    .catch(function(error) {
                        console.error('Ошибка при добавлении:', error);
                        alert('Ошибка: ' + (error.data.message || 'неизвестная ошибка'));
                    });
            }
        };
        
        // Удаление пользователя
        $scope.deleteUser = function(userId) {
            if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
                FamilyFinanceService.deleteUser(userId).then(function() {
                    loadUsers(); 
                }).catch(function(error) {
                    console.error('Error deleting user:', error);
                });
            }
        };
    });