
let currentSong = null;
let songs = [];
let currFolder;

function secondsToMMSS(seconds) {
    seconds = parseInt(seconds, 10);
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    minutes = minutes.toString().padStart(2, '0');
    remainingSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }

    let songUL = document.querySelector(".song-list ul");
    songUL.innerHTML = '';

    for (const song of songs) {
        songUL.innerHTML += `
            <li>
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                    <div>${decodeURIComponent(song)}</div> 
                    <div>Song Artist</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="play.svg" alt="">
                </div>
            </li>`;
    } 
    document.querySelectorAll(".song-list li").forEach(li => {
        li.addEventListener("click", () => {
            // Get the play/pause icon of the clicked item
            let playPauseIcon = li.querySelector(".playnow img");
    
            let songName = li.querySelector(".info div").textContent.trim();
            // Determine if the clicked song is already the current song
            if (currentSong && currentSong.src.includes(encodeURIComponent(songName))) {
                // Toggle play/pause if it's the current song
                if (currentSong.paused) {
                    currentSong.play();
                    playPauseIcon.src = "pause.svg"; // Change to pause icon
                } else {
                    currentSong.pause();
                    playPauseIcon.src = "play.svg"; // Change to play icon
                }
            } else {
                // If it's a different song, always change to pause icon
                document.querySelectorAll(".song-list .playnow img").forEach(img => {
                    img.src = "play.svg"; // Reset all other icons to play
                });
                playPauseIcon.src = "pause.svg"; // Change to pause icon for the clicked item
                playMusic(encodeURIComponent(songName));
            }
        });
    });
    
    return songs;
}

const setupCurrentSong = (track) => {
    if (currentSong) {
        currentSong.pause();
        currentSong.removeEventListener('timeupdate', onTimeUpdate);
        currentSong.removeEventListener('ended', playNextSong);
        currentSong = null;
    }

    currentSong = new Audio(`/${currFolder}/` + track);
    currentSong.addEventListener('timeupdate', onTimeUpdate);
    currentSong.addEventListener('ended', playNextSong);
};

const onTimeUpdate = () => {
    if (currentSong) {
        document.querySelector(".songtime").textContent = `${secondsToMMSS(currentSong.currentTime)} / ${secondsToMMSS(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    }
};

const playNextSong = () => {
    let currentIndex = songs.findIndex(song => encodeURIComponent(song) === decodeURIComponent(currentSong.src.split(`/${currFolder}/`).pop()));
    if (currentIndex >= 0 && currentIndex < songs.length - 1) {
        playMusic(songs[currentIndex + 1]);
    } else if (currentIndex === songs.length - 1) {
        playMusic(songs[0]); // Loop back to the first song
    }
};

const playMusic = (track) => {
    if (!currentSong || currentSong.src !== `/${currFolder}/` + track) {
        setupCurrentSong(track);
    }

    let playButton = document.getElementById('play');
    if (playButton) {
        if (currentSong.paused) {
            currentSong.play();
            playButton.src = "pause.svg";
        } else {
            currentSong.pause();
            playButton.src = "play.svg";
        }
    }

    document.querySelector(".songinfo").textContent = decodeURIComponent(track);
};

// Add your displayAlbums function here
// Add your main function here

// Remember to call your main function to initialize the application

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
    
    
    if (e.href.includes("/songs")) {
        let folder = e.href.split("/").slice(-1)[0]

        //Get metaData of folder
        
        let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);


        // let a = await fetch(`http://127.0.0.1:5500/songs/hss/info.json`);
        let response = await a.json();
        




        cardContainer.innerHTML = cardContainer.innerHTML + `   <div data-folder="Hs" class="card">
          <div class="play">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 36 36"
                  fill="none" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#1ED760">
                  <circle cx="18" cy="18" r="15" fill="#1ED760" />
                  <!-- Filled circle with Spotify green color -->
                  <path d="M13.5 10.5L21 18L13.5 25.5" fill="#000000" transform="translate(1.5, 0)" />
                  <!-- Centered black play button with translation -->
              </svg>
          </div>
          <img src="covers/1.png" alt="">
          <h2>Sleep Nights!</h2>
          <p>Gentle Ambient piano to help you fall asleep. </p>
      </div>
      <div data-folder="Honey" class="card">
          <div class="play">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 36 36"
                  fill="none" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#1ED760">
                  <circle cx="18" cy="18" r="15" fill="#1ED760" />
                  <!-- Filled circle with Spotify green color -->
                  <path d="M13.5 10.5L21 18L13.5 25.5" fill="#000000" transform="translate(1.5, 0)" />
                  <!-- Centered black play button with translation -->
              </svg>
          </div>
         
          <img src="/songs/${folder}/cover.jpg" alt="">
          <h2>${response.title}</h2>
          <p> ${response.description}</p>
      </div>`
    }
    }
}


  




















async function main() {
    await getSongs("songs/Honey");

    if (songs.length > 0) {
        document.querySelector(".songinfo").textContent = decodeURIComponent(songs[0]);
        setupCurrentSong(songs[0]); // Setup but don't play
    }


    //Display albums on Page
    displayAlbums()






    let playButton = document.getElementById('play');
    if (playButton) {
        playButton.src = "play.svg";

        playButton.addEventListener("click", () => {
            if (currentSong && currentSong.paused) {
                currentSong.play();
                playButton.src = "pause.svg";
            } else if (currentSong) {
                currentSong.pause();
                playButton.src = "play.svg";
            }
        });
    }


    //for updating seekbar 
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
        //   console.log( currentSong.currentTime= ((currentSong.duration)* percent)/100)  
    })

    //event listener for hamburger menu

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })
    //event listener for closing hamburger menu

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-250%";
    })


    //prev and next

    prevsong.addEventListener("click", () => {


        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])

        if ((index + 1) >= 0) {
            playMusic(songs[index + 1])
        }
    })

    nextsong.addEventListener("click", () => {

        currentSong.pause()
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])


        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    //event for volume control
      document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("input", (e) => {
        const volume = parseInt(e.target.value) / 100;
        currentSong.volume = volume;
        const volumeImage = document.querySelector(".volume>img");
    
    // If volume is more than 0, set to volume.svg, else set to mute.svg
    if (volume > 0) {
        volumeImage.src = volumeImage.src.includes("mute.svg") ? volumeImage.src.replace("mute.svg", "volume.svg") : volumeImage.src;
    } else {
        volumeImage.src = volumeImage.src.includes("volume.svg") ? volumeImage.src.replace("volume.svg", "mute.svg") : volumeImage.src;
    }
});



    //load playlist when card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
        })
    })


    //event listener for mute img
  
    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg");
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        } else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg");
            currentSong.volume = 1; // Set a default volume level when unmuting, or retain the previous level if you've stored it
            document.querySelector(".range").getElementsByTagName("input")[0].value = 50; // Update this value to reflect the actual volume level
        }
    });

}





main();
