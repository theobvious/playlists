//on load get all playlists
function getList() {
    var service = new playlistService();
    service.getPlaylists(renderAll);
}

//display all fetched albums
function renderAll(playlists) {
    $('#main').html('');
    for(var playlist of playlists) {
        $newId = playlist.id;
        $newName = playlist.name;
        $newImage = playlist.image;
        $('#main').append(`
        <div class='disc'>
            <div class='title'>`+$newName+`</div>
            <div class='album' id='`+$newId+`'>
                <div class='middle'> 
                    <i class='fa fa-pencil controls editBtnLocal' data-toggle="modal" data-target="#addModal"></i>
                    <i class='fa fa-play controls'></i>
                    <i class='fa fa-trash controls deleteBtnLocal'  data-toggle="modal" data-target="#confirmModal"></i>
                </div>
            </div>
        </div>`);
        $('#'+$newId).css({
            'background': 'url('+$newImage+')',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center center'
        });  
    }
    
    //edit button
    $('.editBtnLocal').on('click', function () {
        $('#addModalTitle').text('Edit playlist');  
        showTab(0);    
        var num = $(event.currentTarget).closest('.album').attr('id');
        retrieve(num);
    })

    //delete button
    $('.deleteBtnLocal').on('click', function () {
        var num = $(event.currentTarget).closest('.album').attr('id');
        modalConfirm(num);
    })

    //play button
    $('.middle > .fa-play').on('click', function(event) {
        var num = $(event.currentTarget).closest('.album').attr('id');
        for(var playlist of playlists) {
            if (playlist.id == num) {
                renderPlayer(playlist);
            }
        }
    });
    
    //make title rounded
    $('.title').arctext({radius: 100});
};


//search by name
function findPlaylist (data) {
    var input = $('#searchBox').val();
    var result = [];
    
    for(var i=0; i<data.length; i++) {
        if(data[i].name == input) {
            result.push(data[i]);
        }
    };

    if(result.length == 0) {
        $('#main').html('<div class="error">No playlists found, try entering full playlist title or use the button above to return to full list.</div>');
    } else renderAll(result);
} 

//make modal empty on reload
function clearForm() {
    $('#addModal form :input').val('');
    $('#addModal form :input').removeClass('invalid');
    $('#imgPreview').css('background','');
    $('#modalError').text('');
}