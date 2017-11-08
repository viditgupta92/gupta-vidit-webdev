(function () {
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);
    
    function FlickrService($http) {
        var api = {
            "searchPhotos": searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var key = "430fc3ef97d50a0d04c1c47047ee94c4";
            var secret = "012ef366d62e580f";
            var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
