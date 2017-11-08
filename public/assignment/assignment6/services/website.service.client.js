(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            "createWebsite": createWebsite,
            "findWebsiteByUser": findWebsiteByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser
        };
        return api;

        function createWebsite(userId, newWebsite) {
            return $http.post("/api/user/" + userId + "/website", newWebsite)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteByUser(userId) {
            return $http.get("/api/user/" + userId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/" + websiteId)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(websiteId, newWebsite) {
            return $http.put("/api/website/" + websiteId, newWebsite)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/" + websiteId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/user/" + userId + "/website")
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();
