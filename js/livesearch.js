$(document).ready(function() {
  
    $.ajaxSetup({ cache: false });
    $('#searchBox').keyup(function(){
        var service = new playlistService();

        //initiate search at 2+ characters and add button to return to all playlists
        if ($('#searchBox').val().length > 1) {
            $('#main').html('');
            service.getPlaylists(locatePlaylist);
            $('#allBtn').show();
        } 
        
        //return all playlists when search box empty
        if ($('#searchBox').val() == '') {
            service.getPlaylists(renderAll);
            $('#allBtn').hide();
        }
    })
    
    function locatePlaylist(data) {
        var searchField = $('#searchBox').val();
        var expression = new RegExp(searchField, "i");

          $.each(data, function(key, value){
           if (value.name.search(expression) != -1) {
                $('#main').append(`
                <div class="disc">
                    <div class="title">`+value.name+`</div>
                    <div class="album" id="`+value.id+`">
                        <div class="middle"><i class="fa fa-play controls"></i></div>
                    </div>
                </div>`);
                $('#'+value.id).css({
                    'background': 'url('+value.image+')',
                    'background-size': 'cover',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center center'
                });  
                //play button
                $('.middle > .fa-play').on('click', function(event) {
                    var num = $(event.currentTarget).closest('.album').attr('id');
                    renderPlayer(data[num-1]);
                });
                
                //make title rounded
                $('.title').arctext({radius: 100});
           }
          });   
    }
});