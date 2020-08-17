//https://api.lyrics.ovh/v1/Coldplay/Adventure of a Lifetime
//https://api.lyrics.ovh/suggest/

//Targeting the elements by their ids
const lyricSearch = document.getElementById('lyricSearch');
const searchBtn = document.getElementById('searchBtn');

let totalResult = document.getElementById('totalResult');

// api URL
const apiURL = 'https://api.lyrics.ovh/';

//search by song
function searchSong(term) {
    fetch(`${apiURL}/suggest/${term}`)
        .then(res => res.json())
        .then(data => {
            displayData(data);
            console.log(data);
        })
}

//Event handler in search-button
searchBtn.addEventListener('click', function () {

    const searchTerm = lyricSearch.value;
    //checking search value is empty or not
    if (searchTerm == "") {
        alert('The search value is empty!');
    }
    else {
        searchSong(searchTerm);
    }
})
//Event handler in getLyrics-button
const getLyrics = (artistName, title) => {
    console.log(artistName, title);

    fetch(`${apiURL}v1/${artistName}/${title}`)
        .then(res => res.json())
        .then(data => { displayLyrics(data, artistName, title) })
}
//display lyrics
function displayLyrics(data, artistName, title) {
    document.getElementById("getTitle").innerHTML = `${title}`;
    document.getElementById("getArtist").innerHTML = `- ${artistName}`;

    if (data.lyrics) {
        document.getElementById("getLyrics").innerHTML = `${data.lyrics}`;
        // console.log(data.lyrics);
    }
    else if (data.lyrics == undefined) {
        document.getElementById("getLyrics").innerHTML = "Lyrics is not found !";
    }
}
//display data
function displayData(data) {
    totalResult.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const element = data.data[i];
        // console.log(element.album.title);
        const title = element.album.title;
        const shortTitle = element.title_short;
        const artistName = element.artist.name;
        const albumImage = element.album.cover_small;

        totalResult.innerHTML += `<div class="single-result row align-items-center my-5 p-3 ">
                                        <div class="col-md-3">
                                            <img src="${albumImage}" alt="">
                                        </div>
                                        <div class="col-md-6 text-center">
                                            <h3 class="lyrics-name">${title} - ${shortTitle} </h3>
                                            <p class="author lead">Album by <span>${artistName}</span></p>
                                        </div>
                                        <div class="col-md-3 text-md-right text-center">
                                            <a href="#" onclick="getLyrics('${artistName}', '${title}')" class="btn btn-success">Get Lyrics</a>
                                        </div>
                                    </div>
                            `;
    }
}