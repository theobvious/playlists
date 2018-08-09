//prepare and display the player
function renderPlayer(playlist) {   
    //get id
    var id = playlist.id;

    //get song source urls
    var sources = JSON.parse(playlist.songs);
    
    //draw player body
    $('#player').html(`
    <div id="playingImg" class="album">
        <div class="playMiddle"><i class="fa fa-pause"></i></div>
    </div>
    <div class="currentPlayer">
        <div><audio id="audio" controls><source src="`+sources[0]['url']+`" type="audio/mpeg"></audio></div>
        <div id="nowPlaying"></div>
        <div id="currentPlaylist"></div>
    </div>`);

    $('#playerControls').html(`
        <i class="fa fa-times" id="exitBtn"></i><br/>
        <i class="fa fa-pencil" data-toggle="modal" data-target="#addModal" id="editPlaylistBtn"></i>
        <i class="fa fa-trash" id="deleteBtn" data-toggle="modal" data-target="#confirmModal"></i>
    `);

    $('#playingImg').css({
        'background': 'url('+playlist.image+')',
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': 'center center'
    })

    $('#player').addClass('container');

    //make buttons functional
    $('#editPlaylistBtn').on('click', function() {
        showTab(0);    
        retrieve(id);
    });
    
    $('#deleteBtn').on('click', function() {
        modalConfirm(id)
    });

    $('#exitBtn').on('click', function() {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        $('#playercontainer').hide();
        $(document).prop('title', 'Excellent music player');
    });

    //form playlist section
    $.each(sources, function(){
        $('#currentPlaylist').append('<p><i class="playIcon"></i> <span class="playlistItem">'+this.name+'</span></p>');
    });

    //show finished player
    $('#playercontainer').slideDown('1000').css({'display':'flex'});

    play(sources);
};

//playlist functionality
function play(list){
    
    //autoplay on load
    audio.play();
    
    //prep for changing tracks
    var listArray = Object.values(list);
    var playIndex = 0;

    $(document).prop('title', listArray[playIndex]['name']);
    $('#nowPlaying').html('NOW PLAYING: '+listArray[0]['name']);

    $('.playlistItem').each(function() {
        if($(this).text() == listArray[playIndex]['name']) {
            $(this).addClass('.playlistItemActive');
            $(this).prev('.playIcon').addClass('fa fa-play');
        }
    })

    //changing the button
    $('#playingImg').on('click', function() {
        if (audio.paused) {
            audio.play();
            $('#playingImg').addClass('playingImgActive');
            $('.playMiddle').html('<i class="fa fa-pause">');
        }
        else {
            audio.pause();
            $('#playingImg').removeClass('playingImgActive');
            $('.playMiddle').html('<i class="fa fa-play">');
        }
    });

    //make playlist browsable
    $('.playlistItem').on('click', function(){
        $('.playlistItem').removeClass('playlistItemActive');
        $('.playIcon').removeClass('fa fa-play');

        $(event.currentTarget).addClass('playlistItemActive');
        $(event.currentTarget).prev('.playIcon').addClass('fa fa-play');

        var playNow = '';
        var titleNow = '';
        for (var song of listArray) {
            if (song.name == $(this).text()) {
                playNow = song.url;
                titleNow = song.name;
            }
        }
        $('#playingImg').addClass('playingImgActive');
        $('.playMiddle').html('<i class="fa fa-pause">');
        $('#nowPlaying').html('NOW PLAYING: '+titleNow)
        audio.setAttribute("src", playNow);
        $(document).prop('title', titleNow);
            audio.play();
        

        $('.playlistItem').mouseover(function() {
            if ($(event.currentTarget).hasClass('playlistItemActive')) {
                $(event.currentTarget).prev('.playIcon').removeClass('fa fa-play').addClass('fa fa-pause');
            }
        }).mouseout(function() {
            if ($(event.currentTarget).hasClass('playlistItemActive')) {
                $(event.currentTarget).prev('.playIcon').removeClass('fa fa-pause').addClass('fa fa-play');
            }
        })
    
        $('.playlistItemActive').on('click', function() {
            if (!audio.paused) {
                $(event.currentTarget).prev('.playIcon').removeClass('fa fa-play').addClass('fa fa-pause');
                audio.pause();
            } else {
                $(event.currentTarget).prev('.playIcon').removeClass('fa fa-pause').addClass('fa fa-play');
                audio.play();
            }
        })
    })

    
    //autoplay next song when song ends
    audio.onended = function() {
        if (playIndex < listArray.length - 1) {
            playIndex++;
        } else playIndex = 0;
        audio.setAttribute("src", listArray[playIndex]['url']);
        var name = listArray[playIndex]['name'];

        $(document).prop('title', name);
        $('#nowPlaying').html('NOW PLAYING: '+name)

        $('.playlistItem').removeClass('playlistItemActive');
        $('.playIcon').removeClass('fa fa-play');

        $('.playlistItem').each(function() {
            if($(this).text().indexOf(name) !== -1) {
                $(this).addClass('.playlistItemActive');
                $(this).prev('.playIcon').addClass('fa fa-play');
            }
        })

        audio.load();
    }

    //make sure the spinning image is in sync when controlled from outside
    audio.onplay = function() {
        $('#playingImg').addClass('playingImgActive');
        $('.playMiddle').html('<i class="fa fa-pause">');
    }

    audio.onpause = function(){
        $('#playingImg').removeClass('playingImgActive');
        $('.playMiddle').html('<i class="fa fa-play">');
    }
}