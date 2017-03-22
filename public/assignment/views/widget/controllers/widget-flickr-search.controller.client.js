(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController",FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService, WidgetService) {
        var vm =this;
        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            vm.pageId = $routeParams.pid;
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var widget = {
                'url': url,
                'type':'i'
            };
            WidgetService
                .createWidget(vm.pageId, widget)
                .then(renderWidget);
                // .updateWidget(websiteId, pageId, widgetId, {url: url})
                // .then();
        }

        function renderWidget(page) {
            var userId = $routeParams.uid;
            var websiteId = $routeParams.wid;
            // var widgetId = page.data.widgets;
            $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+vm.pageId+"/widget");
        }
    }
})();