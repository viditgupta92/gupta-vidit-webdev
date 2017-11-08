/**
 * Created by vidit on 11/4/2017.
 */
(function () {
    angular
        .module("Football")
        .controller("TeamController", teamController);
    function teamController($scope, $routeParams, FootballService) {
        var vm = this;
        vm.teamId = $routeParams['tid'];

        function init() {

            FootballService
                .getTeamPlayers(vm.teamId)
                .then(function (response) {
                    vm.team = response.data;
                });
        }

        init();
    }
})();
/**
 * Created by vidit on 11/4/2017.
 */
