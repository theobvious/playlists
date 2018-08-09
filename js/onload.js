$(document).ready(function() {
    
    //append form fields
    $('#addSongBtn').on('click', function() {
        $('#songsTab').append(
            `<form class="song">
                <label>Name: <input name="name" class="newSongName"></label>
                <label>Url: <input name="url" class="newSongUrl" placeholder="Link must end in .mp3"></label><br>
            </form>`
            );    
    });

    //save playlist button
    $('#submitPlaylist').on('click', function() {
        if (validateSongs()) {
            $('#modalError').html('');
            createPlaylist();
            $('#addModal').hide();
            $('.modal-backdrop').remove();
        } else {
            $('#modalError').html('Songs must be links to mp3!');
        }
    });

    //save edited playlist button
    $('#saveEdits').on('click', function() {
        var id = $('#newPlaylistId').val();
        if (validateSongs()) {
            $('#modalError').html('');
            savePlaylist(id);
            $('#addModal').hide();
            $('.modal-backdrop').remove();
        } else {
            $('#modalError').html('Songs must be links to mp3!');
        }
    });

    //when adding make edit button invisible
    $('#addBtnMain').on('click', function() {
        clearForm();
        $('#addModalTitle').text('Add playlist');
        showTab(0);
        $('#saveEdits').hide();
        $('#submitPlaylist').show();
    });

    //preview album image on change
    $('#newPlaylistImage').on('mousemove', function() {
        $('#imgPreview').css({
            'background': 'url('+$('#newPlaylistImage').val()+')',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center center'
        })
    }
    )

    //search button
    $('#searchBtn').on('click', function() {
        var service = new playlistService();
        service.getPlaylists(findPlaylist);
        $('#allBtn').show();
    });
 
    //show all playlists
    $('#allBtn').on('click', function() {
        getList();
        $('#allBtn').hide();
        $('#searchBox').val('');
    });

});

