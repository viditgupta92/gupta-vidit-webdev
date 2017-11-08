/**
 * Created by vidit on 11/4/2017.
 */
(function () {
    angular
        .module("Football")
        .controller("NewsController", newsController);
    function newsController($scope, $routeParams, FootballService) {
        var vm = this;
        vm.teamId = $routeParams['tid'];

        function init() {

            FootballService
                .teamNews(vm.teamId)
                .then(function (response) {
                    vm.teamNews = response.data;
                });
        }

        init();
    }
})();