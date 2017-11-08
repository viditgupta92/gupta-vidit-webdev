/**
 * Created by vidit on 11/4/2017.
 */
(function () {
    angular
        .module("Football")
        .controller("WeekController", weekController);
    function weekController($scope, $routeParams, FootballService) {
        var vm = this;
        vm.seasonId = $routeParams['sid'];
        vm.weekId = $routeParams['wid'];

        var dict = new Object();

        function init() {

            FootballService
                .getWeekStats(vm.seasonId, vm.weekId)
                .then(function (response) {
                    vm.games = response.data;
                    getTeams();
                });
        }

        init();

        function getTeams() {
            FootballService
                .getTeams(vm.seasonId)
                .then(function (response) {
                    vm.teams = response.data;
                    logoTable(vm.teams);
                });
        }

        function logoTable(teams) {
            teams.forEach(function (team) {
                dict[team.Key] = team.WikipediaLogoUrl;
            });
        }

        $scope.getTeamLogo = function (teamName) {
            return dict[teamName];
        };
    }
})();