/**
 * Created by vidit on 11/1/2017.
 */
(function () {
    angular
        .module("Football")
        .controller("HomeController", homeController);
    function homeController($scope, $location, FootballService) {
        var vm = this;
        var season;
        vm.week = [];
        var dict = new Object();
        vm.conferences = new Object();

        vm.getTeamNews = getTeamNews;
        vm.getTeam = getTeam;
        vm.getWeekStats = getWeekStats;

        function init() {
            FootballService
                // .currentSeason()
                .lastSeason()
                .then(function (response) {
                    vm.season = response.data;
                    season = vm.season;
                    currentWeek();
                    standings(vm.season);
                    getTeams();
                });
        }

        init();

        function currentWeek() {
            FootballService
                .currentWeek()
                .then(function (response) {
                    // vm.current_week = response.data;
                    vm.current_week = 17;
                    for (var i = 1; i <= vm.current_week; i++) {
                        (vm.week).push(i);
                    }
                });
        }

        function standings(season) {
            FootballService
                .standings(vm.season)
                .then(function (response) {
                    vm.standings = response.data;
                    getDivisionData(vm.standings);
                });
        }

        function getDivisionData(standings) {
            standings.forEach(function (standing) {
                var current = standing.Conference + " " + standing.Division;
                if (current in vm.conferences) {
                    vm.conferences[current].push(standing);
                }
                else {
                    vm.conferences[current] = [];
                    vm.conferences[current].push(standing);
                }
            });
        }

        $scope.getTeamLogo = function (teamName) {
            return dict[teamName];
        };

        function getTeams() {
            FootballService
                .getTeams(season)
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

        function getTeamNews(teamName) {
            $location.url("/" + teamName + "/news");
        }

        function getTeam(teamName) {
            $location.url("/" + teamName + "/team");
        }

        function getWeekStats(season, week) {
            $location.url("/" + season + "/week/" + week);
        }
    }
})();