
angular.module("ui.appery", ["ui.appery.tpls", "ui.appery.tabs", "indexVision"]);
angular.module("ui.appery.tpls", ["template/tabs/tab.html","template/tabs/tabset.html"]);

angular.module('ui.appery.tabs', [])

    .controller('TabsetController', ['$scope', function TabsetCtrl($scope) {
        var ctrl = this,
            tabs = ctrl.tabs = $scope.tabs = [];

        ctrl.select = function(selectedTab) {
            angular.forEach(tabs, function(tab) {
                if (tab.active && tab !== selectedTab) {
                    tab.active = false;
                    tab.onDeselect();
                }
            });
            selectedTab.active = true;
            selectedTab.onSelect();
        };

        ctrl.addTab = function addTab(tab) {
            tabs.push(tab);
            // we can't run the select function on the first tab
            // since that would select it twice
            if (tabs.length === 1 && tab.active !== false) {
                tab.active = true;
            } else if (tab.active) {
                ctrl.select(tab);
            }
            else {
                tab.active = false;
            }
        };

        ctrl.removeTab = function removeTab(tab) {
            var index = tabs.indexOf(tab);
            //Select a new tab if the tab to be removed is selected and not destroyed
            if (tab.active && tabs.length > 1 && !destroyed) {
                //If this is the last tab, select the previous tab. else, the next tab.
                var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
                ctrl.select(tabs[newActiveIndex]);
            }
            tabs.splice(index, 1);
        };

        var destroyed;
        $scope.$on('$destroy', function() {
            destroyed = true;
        });
    }])


    .directive('tabset', function() {
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            scope: {

            },
            controller: 'TabsetController',
            templateUrl: 'template/tabs/tabset.html',
            link: function(scope, element, attrs) {
                scope.position = angular.isDefined(attrs.position) ? "tabs-" + attrs.position: "";
                scope.type = angular.isDefined(attrs.type) ? "tabs-" + attrs.type : "";
            }
        };
    })


    .directive('tab', ['$parse', function($parse) {
        return {
            require: '^tabset',
            restrict: 'EA',
            replace: true,
            templateUrl: 'template/tabs/tab.html',
            transclude: true,
            scope: {
                active: '=?',
                heading: '@',
                onSelect: '&select', //This callback is called in contentHeadingTransclude
                //once it inserts the tab's content into the dom
                onDeselect: '&deselect'
            },
            controller: function() {
                //Empty controller so other directives can require being 'under' a tab
            },
            compile: function(elm, attrs, transclude) {
                return function postLink(scope, elm, attrs, tabsetCtrl) {
                    scope.$watch('active', function(active) {
                        if (active) {
                            tabsetCtrl.select(scope);
                        }
                    });

                    scope.disabled = false;
                    if ( attrs.disabled ) {
                        scope.$parent.$watch($parse(attrs.disabled), function(value) {
                            scope.disabled = !! value;
                        });
                    }

                    scope.select = function() {
                        if ( !scope.disabled ) {
                            scope.active = true;
                        }
                    };

                    tabsetCtrl.addTab(scope);
                    scope.$on('$destroy', function() {
                        tabsetCtrl.removeTab(scope);
                    });

                    //We need to transclude later, once the content container is ready.
                    //when this link happens, we're inside a tab heading.
                    scope.$transcludeFn = transclude;
                };
            }
        };
    }])

    .directive('tabHeadingTransclude', [function() {
        return {
            restrict: 'A',
            require: '^tab',
            link: function(scope, elm, attrs, tabCtrl) {
                scope.$watch('headingElement', function updateHeadingElement(heading) {
                    if (heading) {
                        elm.html('');
                        elm.append(heading);
                    }
                });
            }
        };
    }])

    .directive('tabContentTransclude', function() {
        return {
            restrict: 'A',
            require: '^tabset',
            link: function(scope, elm, attrs) {
                var tab = scope.$eval(attrs.tabContentTransclude);

                //Now our tab is ready to be transcluded: both the tab heading area
                //and the tab content area are loaded.  Transclude 'em both.
                tab.$transcludeFn(tab.$parent, function(contents) {
                    angular.forEach(contents, function(node) {
                        if (isTabHeading(node)) {
                            //Let tabHeadingTransclude know.
                            tab.headingElement = node;
                        } else {
                            elm.append(node);
                        }
                    });
                });
            }
        };
        function isTabHeading(node) {
            return node.tagName &&  (
                node.hasAttribute('tab-heading') ||
                node.hasAttribute('data-tab-heading') ||
                node.tagName.toLowerCase() === 'tab-heading' ||
                node.tagName.toLowerCase() === 'data-tab-heading'
                );
        }
    });



angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/tabs/tab.html",
            "<a ng-click=\"select()\" class=\"tab-item\" ng-class=\"{active: active, disabled: disabled}\" tab-heading-transclude>\n" +
            "{{heading}}\n" +
            "</a>\n" +
            "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("template/tabs/tabset.html",
            "<div>\n" +
            "<div class=\"{{position}} {{type}}\"  >\n" +
            "<div class=\"tabs rel-tabs\"  ng-transclude >\n" +
            "</div>\n" +
            "<div class=\"tab-content\" ng-class=\"{'has-tabs-top': position == 'tabs-top'}\">\n" +
            "    <div class=\"tab-pane\" \n" +
            "         ng-repeat=\"tab in tabs\" \n" +
            "         ng-class=\"{active: tab.active}\"\n" +
            "         tab-content-transclude=\"tab\">\n" +
            "    </div>\n" +
            "  </div>\n" +
            "</div>\n" +
            "</div>\n" +
            "");
}]);

angular.module("indexVision", [])
    .directive("showTopTabs", function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                var ngViewEl = document.querySelector("[data-aio-id=\"ng-view\"]");
                if (scope.visionStatus !== undefined) {
                    if (attrs.showTopTabs == "true") { //check screen property and control content class
                        scope.visionStatus.topTabs = true;
                        if (ngViewEl.hasAttribute('hastoptabs')) {
                            el.addClass("has-tabs-top");
                        }
                    }
                    else {
                        scope.visionStatus.topTabs = false;
                        el.removeClass("has-tabs-top");
                        if (ngViewEl.hasAttribute('hasheader') && ngViewEl.hasAttribute('hastoptabs')) { // check if tabs was hide control header class
                            document.querySelector("[data-aio-id=\"header\"]").classList.remove("has-tabs-top");
                        }
                    }
                }

            }
        };
    })
    .directive("showHeader", function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                if (scope.visionStatus !== undefined) { //check screen property and control content class
                    var ngViewEl = document.querySelector("[data-aio-id=\"ng-view\"]");
                    if (attrs.showHeader == "true") {
                        scope.visionStatus.header = true;
                        if (ngViewEl.hasAttribute('hasheader')) {
                            el.addClass("has-header");
                        }
                        if (ngViewEl.hasAttribute('hasheader') && ngViewEl.hasAttribute('hastoptabs')) {
                            if (attrs.showTabs == "true") {
                                document.querySelector("[data-aio-id=\"header\"]").classList.add("has-tabs-top"); // check if tabs was hide control header class
                            }
                        }
                    }
                    else {
                        scope.visionStatus.header = false;
                        el.removeClass("has-header");
                    }
                }
            }
        };
    })
    .directive("showFooter", function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                var ngViewEl = document.querySelector("[data-aio-id=\"ng-view\"]");
                if (scope.visionStatus !== undefined) { //check screen property and control content class
                    if (attrs.showFooter == "true") {
                        scope.visionStatus.footer = true;

                        if (ngViewEl.hasAttribute('hasfooter')) {
                            el.addClass("has-footer");
                        }
                        if (ngViewEl.hasAttribute('hasfooter') && ngViewEl.hasAttribute('hasbottabs')) {
                            if (attrs.showTabs == "true") {
                                document.querySelector("[data-aio-id=\"footer\"]").classList.add("has-tabs"); // check if tabs was hide control footer class
                            }
                        }
                    }
                    else {
                        scope.visionStatus.footer = false;
                        el.removeClass("has-footer");
                    }
                }
            }
        };
    }).directive("showTabs", function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                if (scope.visionStatus !== undefined) { //check screen property and control content class
                    var ngViewEl = document.querySelector("[data-aio-id=\"ng-view\"]");
                    if (attrs.showTabs == "true") {
                        scope.visionStatus.botTabs = true;
                        if (ngViewEl.hasAttribute('hasbottabs')) {
                            el.addClass("has-tabs");
                        }
                    }
                    else {
                        scope.visionStatus.botTabs = false;
                        el.removeClass("has-tabs");
                        if (ngViewEl.hasAttribute('hasfooter') && ngViewEl.hasAttribute('hasbottabs')) {
                            document.querySelector("[data-aio-id=\"footer\"]").classList.remove("has-tabs"); // check if tabs was hide control footer class
                        }
                    }
                }
            }
        };
    });