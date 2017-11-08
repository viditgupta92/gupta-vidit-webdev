(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir($routeParams) {
        function linkFunc(scope, element, attributes) {

            var pageId = $routeParams.pid;
            // var widgetId = $routeParams.wid;
            var index1 = -1;
            var index2 = -1;

            element.sortable({
                axis: 'y',
                cursor: 'move',
                start: function (event, ui) {
                    index1 = ui.item.index();
                    // console.log(index1);
                },
                stop: function (event, ui) {
                    index2 = ui.item.index();
                    // console.log(index2);
                    scope.sortableController.sort(index1, index2, pageId);
                }
            });
        }

        return {
            scope: {},
            link: linkFunc,
            controller: sortableController,
            controllerAs: 'sortableController'
        };
    }

    function sortableController(WidgetService) {
        var vm = this;
        vm.sort = sort;

        function sort(start, end, pageId) {
            WidgetService.sort(start, end, pageId);
        }
    }
})();