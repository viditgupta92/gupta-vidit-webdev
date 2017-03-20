(function () {
    angular
        .module('MovieApp',[])
        .config(configuration)
        .controller('MovieController', MovieController);

    function configuration($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
    }

    function MovieController($http) {
        var vm = this;
        vm.createMovie = createMovie;
        vm.deleteMovie = deleteMovie;
        vm.selectMovie = selectMovie;
        vm.updateMovie = updateMovie;

        function init() {
            findAllMovies();
        }
        init();

        function findAllMovies() {
            $http
                .get('/api/mongo/movie')
                .success(renderMovies);
        }
        
        function createMovie(movie) {
            $http
                .post('/api/mongo/movie',movie)
                .success(findAllMovies);

        }

        function deleteMovie(movieId) {
            $http
                .delete('/api/mongo/movie/'+movieId)
                .success(findAllMovies);
        }

        function selectMovie(movieId) {
            $http
                .get('/api/mongo/movie/'+movieId)
                .success(renderMovie);
        }

        function updateMovie(movie) {
            $http
                .put('/api/mongo/movie/'+movie._id, movie)
                .success(findAllMovies);
        }

        function renderMovie(movie) {
            vm.movie = movie;
        }

        function renderMovies(movies) {
            vm.movies = movies;
        }
    }
})();