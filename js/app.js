var app = angular.module('helpdeskApp', []);

app.controller('HelpdeskCtrl', function ($scope) {
    var STORAGE_KEY = 'helpdesk_tickets';

    var sampleTickets = [
        {
            id: 101,
            name: 'Rohan Sharma',
            department: 'IT',
            category: 'Network',
            priority: 'High',
            title: 'Wi-Fi not working in Lab 2',
            description: 'Internet keeps disconnecting on lab PCs.',
            status: 'Open',
            date: '2026-11-17'
        },
        {
            id: 102,
            name: 'Priya Verma',
            department: 'Accounts',
            category: 'Software',
            priority: 'Medium',
            title: 'Excel crashes on startup',
            description: 'Microsoft Excel closes automatically when opening files.',
            status: 'In Progress',
            date: '2026-11-16'
        },
        {
            id: 103,
            name: 'Amit Patel',
            department: 'Admin',
            category: 'Hardware',
            priority: 'Low',
            title: 'Keyboard keys stuck',
            description: 'Enter and Space keys are not working properly.',
            status: 'Resolved',
            date: '2026-11-15'
        }
    ];

    // Load saved tickets or use sample tickets
    var saved = localStorage.getItem(STORAGE_KEY);
    $scope.tickets = saved ? JSON.parse(saved) : sampleTickets;

    $scope.categories = ['Hardware', 'Software', 'Network', 'Email / Login', 'Other'];
    $scope.priorities = ['Low', 'Medium', 'High'];
    $scope.statuses = ['Open', 'In Progress', 'Resolved'];

    $scope.searchText = '';
    $scope.statusFilter = '';

    $scope.newTicket = {
        name: '',
        department: '',
        category: 'Hardware',
        priority: 'Medium',
        title: '',
        description: ''
    };

    $scope.saveTickets = function () {
        localStorage.setItem(STORAGE_KEY, JSON.stringify($scope.tickets));
    };

    $scope.addTicket = function () {
        if (!$scope.newTicket.name || !$scope.newTicket.title) {
            return;
        }

        var nextId = 101;
        for (var i = 0; i < $scope.tickets.length; i++) {
            if ($scope.tickets[i].id >= nextId) {
                nextId = $scope.tickets[i].id + 1;
            }
        }

        var ticket = {
            id: nextId,
            name: $scope.newTicket.name,
            department: $scope.newTicket.department || 'General',
            category: $scope.newTicket.category,
            priority: $scope.newTicket.priority,
            title: $scope.newTicket.title,
            description: $scope.newTicket.description,
            status: 'Open',
            date: new Date().toISOString().slice(0, 10)
        };

        $scope.tickets.unshift(ticket);
        $scope.saveTickets();

        $scope.newTicket = {
            name: '',
            department: '',
            category: 'Hardware',
            priority: 'Medium',
            title: '',
            description: ''
        };
    };

    $scope.deleteTicket = function (ticket) {
        var index = $scope.tickets.indexOf(ticket);
        if (index !== -1) {
            $scope.tickets.splice(index, 1);
            $scope.saveTickets();
        }
    };

    $scope.countByStatus = function (status) {
        var count = 0;
        for (var i = 0; i < $scope.tickets.length; i++) {
            if ($scope.tickets[i].status === status) {
                count++;
            }
        }
        return count;
    };
});
