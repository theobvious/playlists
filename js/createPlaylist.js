//create new playlist
function createPlaylist() {
    var service = new playlistService();
    var songs = [];
    $('.song').each(function(){
        var a = $(this).serializeArray();
        var returnObj = {};
        for (var i = 0; i < a.length; i++){
            returnObj[a[i]['name']] = a[i]['value'];
        }
        if (returnObj.name !== '' && returnObj.url !== '') songs.push(returnObj);
    });

    var playlist = {
        'name': $('#newPlaylistName').val(),
        'image': $('#newPlaylistImage').val(),
        'songs': songs
    }

    //cleanup modal close
    clearForm();    
    $('#addModal').toggle();
    $('.modal-backdrop').remove();

    service.addPlaylist(playlist, getList);
    $('#player').hide();
}