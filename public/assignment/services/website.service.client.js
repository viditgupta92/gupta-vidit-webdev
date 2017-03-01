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
                return $http.post("/api/user/"+userId+"/website",newWebsite);
            }

            function findWebsiteByUser(userId) {
                return $http.get("/api/user/"+userId);
            }

            function findWebsiteById(websiteId) {
                return $http.get("/api/website/"+websiteId);
            }

            function updateWebsite(websiteId, newWebsite) {
                return $http.put("/api/website/"+websiteId, newWebsite);
            }

            function deleteWebsite(websiteId) {
                return $http.delete("/api/website/"+websiteId);
            }
            
            function findAllWebsitesForUser(userId) {
                return $http.get("/api/user/"+userId+"/website");
            }
            
        }
})();
