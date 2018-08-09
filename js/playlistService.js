//database connection functions
function playlistService() {
    this.getPlaylists = function (callback) {
        $.ajax({
            type: "Get",
            url: "./api/playlist",
            contentType: "application/json",
            success: function (result, status, xhr) {
                callback(result.data);
            }
        });
    };

    this.getPlaylistById = function (id, callback) {
        $.ajax({
            type: "Get",
            url: "./api/playlist/" + id,
            contentType: "application/json",
            success: function (result, status, xhr) {
                callback(result.data);
            }
        });
    };

    this.getPlaylistSongsById = function (id, callback) {
        $.ajax({
            type: "Get",
            url: "./api/playlist/" + id + "/songs",
            success: function (result, status, xhr) {
                callback(result.data);
            }
        });
    };

    this.addPlaylist = function (playlist, callback) {
        $.ajax({
            type: "Post",
            url: "./api/playlist",
            data: playlist,
            success: function (result, status, xhr) {
                callback();
            }
        });
    }

    this.updatePlaylist = function (id, info) {
        $.ajax({
            type: "Post",
            url: "./api/playlist/" + id,
            data: info,
            success: function (result, status, xhr) {
                console.log('success');
            }
        });
    }

    this.updatePlaylistSongs = function (id, songs, callback) {
        $.ajax({
            type: "Post",
            url: "./api/playlist/" + id + "/songs",
            data: songs,
            success: function (result, status, xhr) {
                callback();
            }
        });
    }

    this.deletePlaylist = function (id, callback) {
        $.ajax({
            type: "Delete",
            url: "./api/playlist/" + id,
            contentType: "application/json",
            success: function (result, status, xhr) {
                callback();
            }
        });
    };}
