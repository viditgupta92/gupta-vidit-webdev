module.exports = function (app) {
    app.get('/api/mongo/movie', findAllMovies);
    app.post('/api/mongo/movie', createMovie);
    app.delete('/api/mongo/movie/:movieId',deleteMovie);
    app.get('/api/mongo/movie/:movieId', findMovieById);
    app.put('/api/mongo/movie/:movieId',updateMovie);


    // console.log('hello movies');
    var mongoose = require('mongoose');

    var MovieSchema = mongoose.Schema({
        title: String,
        director: String,
        rating: String
    }, {collection: 'movie'});

    var MovieModel = mongoose.model('MovieModel', MovieSchema);

    function findMovieById(req, res) {
        var movieId = req.params.movieId;
        MovieModel
            .findById(movieId)
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function findAllMovies(req, res) {
        MovieModel
            .find()
            .then(
                function (movies) {
                    res.json(movies);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createMovie(req, res) {
        var movie = req.body;

        console.log(movie);

        MovieModel
            .create(movie)
            .then(
                function (movie) {
                    res.json(movie);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }
    
    function updateMovie(req, res) {
        var movieId = req.params.movieId;
        var movie = req.body;
        MovieModel
            .update({_id: movieId},{$set:{title: movie.title}})
            .then(
                function (status) {
                    res.json(status);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function deleteMovie(req,res) {
        var movieId = req.params.movieId;
        MovieModel
            .remove({_id: movieId})
            .then(
                function (movies) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    var promise = MovieModel.find();
    promise.then(
        function (movies) {
            console.log(movies);
        },
        function (error) {

        }
    )
};