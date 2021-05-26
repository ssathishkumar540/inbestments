angular.module('DemoApp', ['ngSanitize', 'ui.select'])
    .config(function(uiSelectConfig) {
        // uiSelectConfig.defaultTheme = 'select2';
        // uiSelectConfig.defaultTheme = 'selectize';
    }).filter('propsFilter', function() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        }
    }).controller('MainCtrl', ['$scope', function($scope) {
        $scope.person = {};
        $scope.people = [{
            name: 'aaronmorrow@ihsthomes.com'
        }, {
            name: 'bob.kelly@exprealty.com'
        }, {
            name: 'briegrovesrealty@gmail.com'
        }, {
            name: 'chenruxin007@gmail.com'
        }, {
            name: 'cheri@cheriwestphal.com'
        }, {
            name: 'christopher@bricksfolios.com'
        }, {
            name: 'corey.clark@exprealty.com'
        }, {
            name: 'GlenTweet@gmail.com'
        }, {
            name: 'hello@inBestments.com'
        }, {
            name: 'hello@inBestments.com'
        }, {
            name: 'hodsonandcompany@gmail.com'
        }, {
            name: 'homesbyfekade@hotmail.com'
        }];

        $scope.lender = [{
            name: 'aaronmorrow@ihsthomes.com'
        }, {
            name: 'bob.kelly@exprealty.com'
        }, {
            name: 'briegrovesrealty@gmail.com'
        }, {
            name: 'chenruxin007@gmail.com'
        }, {
            name: 'cheri@cheriwestphal.com'
        }, {
            name: 'christopher@bricksfolios.com'
        }, {
            name: 'corey.clark@exprealty.com'
        }, {
            name: 'GlenTweet@gmail.com'
        }, {
            name: 'hello@inBestments.com'
        }, {
            name: 'hello@inBestments.com'
        }, {
            name: 'hodsonandcompany@gmail.com'
        }, {
            name: 'homesbyfekade@hotmail.com'
        }];

        $scope.uploadClientDetails = function(data) {
            if (data.length > 0) {

            } else {
                sweetAlert("Error...", "Please Choose a Lender or an Agent", "error");
            }

        }
    }]);