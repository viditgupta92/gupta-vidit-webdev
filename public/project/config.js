/**
 * Created by vidit on 11/1/2017.
 */
(function () {
    angular
        .module("Football")
        .config(configuration);
    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "view/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/:tid/news", {
                templateUrl: "view/news.view.client.html",
                controller: "NewsController",
                controllerAs: "model"
            })
            .when("/:sid/week/:wid", {
                templateUrl: "view/week.view.client.html",
                controller: "WeekController",
                controllerAs: "model"
            })
            .when("/:tid/team", {
                templateUrl: "view/team.view.client.html",
                controller: "TeamController",
                controllerAs: "model"
            })
    }
})();