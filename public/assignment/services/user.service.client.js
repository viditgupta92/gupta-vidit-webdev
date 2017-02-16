(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);
    
    function userService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user){
            users.push(user);
        }

        function findUserById(uid) {
            for(var u in users){
                var user = users[u];
                if( user._id == uid){
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for(var u in users){
                var user = users[u];
                if( user._id == uid){
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users){
                var user = users[u];
                if( user.username == username &&
                    user.password == password){
                    return angular.copy(user);
                }
            }
            return null;
        }

        function updateUser(userId, newUser) {
            for(var u in users){
                var user = users[u];
                if( user._id == userId){
                    user.firstName = newUser.firstName;
                    user.lastName = newUser.lastName;
                    return user;
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for(var u in users){
                if(users[u]._id === userId){
                    users.splice(u,1);
                }
            }
        }
    }
})();