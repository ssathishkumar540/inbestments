angular.module('DemoApp', ['ngSanitize', 'ui.select', 'ngFileUpload'])
    .config(function(uiSelectConfig) {}).filter('propsFilter', function() {
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
    }).filter('displayPageData', function() {
        return function(input, start) {
            start = +start; //parse to int  
            return input.slice(start);
        }
    }).controller('MainCtrl', ['$scope', '$filter', 'GridSvc', '$document', '$rootScope', '$window', function($scope, $filter, GridSvc, $document, $rootScope, $window) {
        $scope.person = {};
        $scope.currentPage = 0;
        $scope.showModalDialog = false;
        $scope.primaryOwner = ["A", "L"];
        $scope.uploading_on_behalf = ["A", "L"];
        $scope.UserData = [{
            isAgent: 'true',
            isLender: 'true'
        }]

        var hideContextMenu = function() {
            $scope.isContextMenuVisible = false;
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        };
        $scope.bookingDetails = GridSvc.bookingDetails;

        $document.bind('click', function($evt) {
            var target = angular.element($evt.target).closest('table');
            if (target.length === 0) {
                hideContextMenu();
            }
        });

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

        $scope.SelectFile = function(file) {
            $scope.SelectedFile = file;
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
            if (regex.test($scope.SelectedFile.name.toLowerCase())) {
                if (typeof(FileReader) != "undefined") {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var customers = new Array();
                        var rows = e.target.result.split("\r\n");
                        for (var i = 0; i < rows.length; i++) {
                            var cells = rows[i].split(",");
                            if (cells.length > 1) {
                                var customer = {};
                                customer.propertyAddress = cells[0];
                                customer.propertyUnitNumber = cells[1];
                                customer.propertyCity = cells[2];
                                customer.propertyZip = cells[3];
                                customer.propertyState = cells[4];
                                customer.borrowerFirstName = cells[5];
                                customer.borrowerLastName = cells[6];
                                customer.borrowerEmail = cells[7];
                                customer.homeOwnerMobile = cells[8];
                                customer.homeOwnerDOB = cells[9];
                                customer.homeOwnerAnniversaryDate = cells[10];
                                customer.coBorrowerFirstName = cells[11];
                                customer.coBorrowerLastName = cells[12];
                                customer.coBorrowerEmail = cells[13];
                                customer.coBorrowerMobile = cells[14];
                                customer.coBorrowerDOB = cells[15];
                                customer.mainLoanAmount = cells[16];
                                customer.mainLoanInterestRate = cells[17];
                                customer.loanTermYears = cells[18];
                                customer.loanPurpose = cells[19];
                                customer.LoanNumber = cells[20];
                                customer.monthlyMortageInsure = cells[21];
                                customer.appraisedValue = cells[22];
                                customer.closingDate = cells[23];
                                customers.push(customer);
                                $scope.$apply(function() {
                                    $scope.bookingDetails = customers;
                                    //$scope.bookingDetails.push({});
                                    $scope.IsVisible = true;
                                });
                            }
                        }
                    }
                    reader.readAsText($scope.SelectedFile);
                } else {
                    $window.alert("This browser does not support HTML5.");
                }
            } else {
                $window.alert("Please upload a valid CSV file.");
            }
        };

        $scope.storeData = function($event) {
            $window.localStorage.setItem('personalDetails', JSON.stringify($scope.personalDetails));
            sweetAlert("Success...", "Data Saved Successfully", "success");
        }

        $scope.changedValue = function(data) {
            console.log(data);
        };
        $scope.uploadClientModal = function(data, event) {


            if (!($scope.primaryOwner == 'A' || $scope.primaryOwner == 'L')) {
                sweetAlert("Error...", "Please select primary owner.", "error");
                $('#myModal').modal('hide');
            } else {
                $('#myModal').modal('show')
            }
            if (!($scope.uploading_on_behalf == 'A' || $scope.uploading_on_behalf == 'L')) {
                sweetAlert('Error', 'Please select on behalf of who you are uploading.', 'error');
                $('#myModal').modal('show');
            } else {
                $('#myModal').modal('hide')
            }

        }


        $scope.clear = function() {
            $scope.person.selected = undefined;
        };

        $scope.addNew = function() {
            $scope.bookingDetails.push({
                'listingNumber': '',
                'buildingInfo': '',
                'status': '',
                'address': '',
                'city': '',
                'state': '',
                'zipCode': '',
                'currentPrice': '',
                'contractualDate': '',
                'yearBuilt': '',
                'squareFootage': '',
                'lotSize': '',
                'listingDate': '',
            }, {
                'listingNumber': '',
                'buildingInfo': '',
                'status': '',
                'address': '',
                'city': '',
                'state': '',
                'zipCode': '',
                'currentPrice': '',
                'contractualDate': '',
                'yearBuilt': '',
                'squareFootage': '',
                'lotSize': '',
                'listingDate': '',
            });
        };


    }]).directive('myDirective', function(httpPostFactory) {
        return {
            restrict: 'A',
            scope: {
                myDirective: '=myDirective'
            },
            link: function(scope, element, attr) {

                element.bind('change', function() {
                    var formData = new FormData();
                    formData.append('file', element[0].files[0]);
                    httpPostFactory('upload_image.php', formData)
                        .then(function(response) {
                            $('#imgUpload' + scope.myDirective).attr("src", 'images/' + response.data);
                        })
                });

            }
        };
    }).factory('GridSvc', function() {
        var factory = {},
            i;
        factory.bookingDetails = [{
                propertyAddress: 'Krishnagiri',
                propertyUnitNumber: '12345',
                propertyCity: 'Chennai',
                propertyZip: '600087',
                propertyState: 'Tamilnadu',
                borrowerFirstName: 'sathish',
                borrowerLastName: 'kumar',
                borrowerEmail: 'sat@gmail.com',
                homeOwnerMobile: '56413879',
                homeOwnerDOB: '24-05-1985',
                homeOwnerAnniversaryDate: '24-05-2013',
                coBorrowerFirstName: 'vijay',
                coBorrowerLastName: 'kumar',
                coBorrowerEmail: 'kum@gmail.com',
                coBorrowerMobile: '56687412',
                coBorrowerDOB: '10-08-1990',
                mainLoanAmount: '500000',
                mainLoanInterestRate: '10%',
                loanTermYears: '5',
                loanPurpose: '',
                LoanNumber: '',
                monthlyMortageInsure: '',
                appraisedValue: '',
                closingDate: '',
            },
            {
                propertyAddress: '',
                propertyUnitNumber: '',
                propertyCity: '',
                propertyZip: '',
                propertyState: '',
                borrowerFirstName: '',
                borrowerLastName: '',
                borrowerEmail: '',
                homeOwnerMobile: '',
                homeOwnerDOB: '',
                homeOwnerAnniversaryDate: '',
                coBorrowerFirstName: '',
                coBorrowerLastName: '',
                coBorrowerEmail: '',
                coBorrowerMobile: '',
                coBorrowerDOB: '',
                mainLoanAmount: '',
                mainLoanInterestRate: '',
                loanTermYears: '',
                loanPurpose: '',
                LoanNumber: '',
                monthlyMortageInsure: '',
                appraisedValue: '',
                closingDate: '',
            }, {
                propertyAddress: '',
                propertyUnitNumber: '',
                propertyCity: '',
                propertyZip: '',
                propertyState: '',
                borrowerFirstName: '',
                borrowerLastName: '',
                borrowerEmail: '',
                homeOwnerMobile: '',
                homeOwnerDOB: '',
                homeOwnerAnniversaryDate: '',
                coBorrowerFirstName: '',
                coBorrowerLastName: '',
                coBorrowerEmail: '',
                coBorrowerMobile: '',
                coBorrowerDOB: '',
                mainLoanAmount: '',
                mainLoanInterestRate: '',
                loanTermYears: '',
                loanPurpose: '',
                LoanNumber: '',
                monthlyMortageInsure: '',
                appraisedValue: '',
                closingDate: '',
            }, {
                propertyAddress: '',
                propertyUnitNumber: '',
                propertyCity: '',
                propertyZip: '',
                propertyState: '',
                borrowerFirstName: '',
                borrowerLastName: '',
                borrowerEmail: '',
                homeOwnerMobile: '',
                homeOwnerDOB: '',
                homeOwnerAnniversaryDate: '',
                coBorrowerFirstName: '',
                coBorrowerLastName: '',
                coBorrowerEmail: '',
                coBorrowerMobile: '',
                coBorrowerDOB: '',
                mainLoanAmount: '',
                mainLoanInterestRate: '',
                loanTermYears: '',
                loanPurpose: '',
                LoanNumber: '',
                monthlyMortageInsure: '',
                appraisedValue: '',
                closingDate: '',
            }
        ];
        return factory;
    });