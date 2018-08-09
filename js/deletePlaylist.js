//delete confirmation
function modalConfirm(id){  
    $("#yesBtn").on("click", function(){
        deleteList(id);
    });
};

//delete playlist
function deleteList(id) {
    var service = new playlistService();
    service.deletePlaylist(id, getList);
    audio.pause();
    audio.currentTime = 0;
    audio.src = '';    
    $('#player').hide();
    $(document).prop('title', 'Excellent music player');
}