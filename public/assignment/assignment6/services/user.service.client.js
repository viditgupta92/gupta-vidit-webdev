(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);
    
    function userService($http) {
        var api = {
            "login": login,
            "createUser": createUser,
            "findCurrentUser": findCurrentUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "logout": logout,
            "register": register

        };
        return api;

        function login(user) {
            console.log(user);
            return $http.post("/api/login", user);
        }

        function createUser(user){
            return $http.post("/api/user", user)
                .then (function (response) {
                    return response.data;
                });
        }

        function findCurrentUser() {
            var url = "/api/user";
            return $http.get(url);
        }

        function findUserById(uid) {
             return $http.get("/api/user/"+uid)
                 .then (function (response) {
                     return response.data;
                 });
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username)
                .then (function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password)
                .then (function (response) {
                    return response.data;
                });
        }

        function updateUser(newUser) {
            console.log(newUser);
            return $http.put("/api/user/"+newUser._id, newUser)
                .then (function (response) {
                    return response.data;
                });
        }

        function deleteUser(uid) {
            return $http.delete("/api/user/"+uid)
                .then (function (response) {
                    return response.data;
                });
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }
    }
})();