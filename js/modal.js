var currentTab = 0;
var x = document.getElementsByClassName('tab');

showTab(currentTab);

function showTab(n) {
  x[n].style.display = 'block';
  if (n == 0) {
    $('#prevBtn').css('display','none');
    x[1].style.display = 'none';
  } else {
    $('#prevBtn').css('display', 'inline');
  }   
}

function next() {
  if (validateInfo()) {
    x[0].style.display = 'none';
    showTab(1);
  }
}

function prev() {
  x[1].style.display = 'none';
  showTab(0);
}

function validateInfo() {
  var name = $('#newPlaylistName').val();
  var image = $('#newPlaylistImage').val();
  var info;

  if (name == '') {
    $('#newPlaylistName').addClass('invalid');
    info = false;
  } else info = true;
  
  if (image == '') {
    $('#newPlaylistImage').addClass('invalid');
    info = false;
  } else info = true;

return info;  
}

function validateSongs() {
  var songInfo;
  var invalidCount = 0;
  var songCount = 0;
  var urls = $('.newSongUrl');
  var regex = new RegExp('^[-a-zA-Z0-9@:%_\+.~#?&//=]+\.(mp3|MP3)$');

  urls.each(function() {
    if ($(this).val() !== '') {
      songCount++;
      if (!regex.test($(this).val())) {
        invalidCount++;
        $(this).addClass('invalid');
      }
    }
  });

  if (invalidCount == 0 && songCount > 0) {
    return true;
  }
}
