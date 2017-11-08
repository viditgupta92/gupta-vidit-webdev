/**
 * Created by vidit on 11/2/2017.
 */
(function () {
    angular
        .module("Football")
        .factory('FootballService', cricketService);

    function cricketService($http) {
        var api = {
            "currentSeason": currentSeason,
            "currentWeek": currentWeek,
            "standings": standings,
            "getWeekStats": getWeekStats,
            "getTeams": getTeams,
            "getTeamPlayers": getTeamPlayers,
            "teamNews": teamNews
        };
        return api;

        function currentSeason() {
            return $http({
                headers: {'Ocp-Apim-Subscription-Key': '466e217389a64464bc4a97b12d3e090a'},
                type: "GET",
                url: 'https://api.fantasydata.net/v3/nfl/stats/JSON/CurrentSeason'
            });
        }

        function currentWeek() {
            return $http({
                headers: {'Ocp-Apim-Subscription-Key': '466e217389a64464bc4a97b12d3e090a'},
                type: "GET",
                url: 'https://api.fantasydata.net/v3/nfl/scores/JSON/CurrentWeek'
            });
        }

        function standings(season) {
            var url = 'https://api.fantasydata.net/v3/nfl/stats/JSON/Standings/' + season;
            return $http({
                headers: {'Ocp-Apim-Subscription-Key': '466e217389a64464bc4a97b12d3e090a'},
                method: "GET",
                url: url
            });
        }

        function getWeekStats(season, week) {
            var url = 'https://api.fantasydata.net/v3/nfl/stats/JSON/ScoresByWeek/' + season + '/' + week;
            return $http({
                headers: {'Ocp-Apim-Subscription-Key': '466e217389a64464bc4a97b12d3e090a'},
                method: "GET",
                url: url
            });
        }

        function getTeams(season) {
            var url = 'https://api.fantasydata.net/v3/nfl/stats/JSON/Teams/' + season;
            return $http({
                headers: {'Ocp-Apim-Subscription-Key': '466e217389a64464bc4a97b12d3e090a'},
                method: "GET",
                url: url
            });
        }

        function getTeamPlayers(teamName) {
            var url = 'https://api.fantasydata.net/v3/nfl/stats/JSON/Players/' + teamName;
            return $http({
                headers: {'Ocp-Apim-Subscription-Key': '466e217389a64464bc4a97b12d3e090a'},
                method: "GET",
                url: url
            });
        }

        function teamNews(team) {
            var url = 'https://api.fantasydata.net/v3/nfl/stats/JSON/NewsByTeam/' + team;
            return $http({
                headers: {'Ocp-Apim-Subscription-Key': '466e217389a64464bc4a97b12d3e090a'},
                method: "GET",
                url: url
            });
        }
    }
})();