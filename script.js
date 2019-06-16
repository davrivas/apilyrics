var button = document.getElementById('submit');
var artist = document.getElementById('artist');
var song = document.getElementById('song');
var songLyrics = document.getElementById('songLyrics');

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
};

button.addEventListener('click', function() {
    if ((artistValue !== "" && songValue !== "") || (artistValue != undefined && songValue != undefined)) {
        songLyrics.innerText = "";

        var client = new HttpClient();
        var artistValue = artist.value;
        var songValue = song.value;

        client.get('https://api.lyrics.ovh/v1/'+ artistValue + '/' + songValue, function(response) {
            var responseObject = JSON.parse(response);
            var lyrics = responseObject.lyrics;
            songLyrics.innerText = lyrics;
        });
    }
});