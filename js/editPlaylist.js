//get all data and fill edit modal
function retrieve(id) {
    var service = new playlistService();
    service.getPlaylistById(id, preloadInfo);
    service.getPlaylistSongsById(id, preloadSongs);

    //fills first page of modal 
    function preloadInfo(data) {
        $('#newPlaylistId').val(id);
        $('#newPlaylistName').val(data.name);
        $('#newPlaylistImage').val(data.image);
        $('#imgPreview').css({
            'background': 'url('+data.image+')',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center center'
        })
    }

    //fills songs in modal
    function preloadSongs(data) {
        $('#songsTab').html("");
        for (var i = 0; i < data.songs.length; i++) {
            $('#addModalTitle').text('Edit playlist');
            $('#songsTab').append(`
            <form class="song">
                <label>Name: <input name="name" class="newSongName" value="`+data.songs[i].name+`"></input></label>
                <label>Url: <input name="url" class="newSongUrl" value="`+data.songs[i].url+`"></input></label><br>
            </form>`);
            $('#submitPlaylist').hide();
            $('#saveEdits').show();
        };
    }; 
}

//save edited playlist
function savePlaylist(id) {
    var service = new playlistService();

    var songArray = [];
    $('.song').each(function(){
        var a = $(this).serializeArray();
        var returnObj = {};
        for (var i = 0; i < a.length; i++){
            returnObj[a[i]['name']] = a[i]['value'];
        }
        if (returnObj.name !== '' && returnObj.url !== '') songArray.push(returnObj);
    });
            
    var info = {
        'name': $('#newPlaylistName').val(),
        'image': $('#newPlaylistImage').val(),
    }

    var songs = {
        'songs': songArray
    }

    var songsJson = JSON.stringify();

    var playlist = {
        'id': $('#newPlaylistId').val(),
        'name': $('#newPlaylistName').val(),
        'image': $('#newPlaylistImage').val(),
        'songs': JSON.stringify(songArray)
    };

    service.updatePlaylist(id, info);
    service.updatePlaylistSongs(id, songs, getList)

    renderPlayer(playlist);
}