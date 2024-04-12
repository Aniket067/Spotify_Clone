// let currentSong = null;
// let songs;
// let currFolder;

// function secondsToMMSS(seconds) {
//     seconds = parseInt(seconds, 10);
//     let minutes = Math.floor(seconds / 60);
//     let remainingSeconds = seconds % 60;
//     minutes = minutes.toString().padStart(2, '0');
//     remainingSeconds = remainingSeconds.toString().padStart(2, '0');
//     return `${minutes}:${remainingSeconds}`;
// }

// // async function getSongs(folder) {
// //     try {
// //         currFolder = folder;
// //         let response = await fetch(`http://127.0.0.1:5500/${folder}/`);
// //         let text = await response.text();
// //         let div = document.createElement("div");
// //         div.innerHTML = text;
// //         let links = div.getElementsByTagName("a");
// //         let songs = [];

// //         for (let link of links) {
// //             if (link.href.endsWith(".mp3")) {
// //                 songs.push(link.href.split(`/${folder}/`)[1]);
// //             }
// //         }
// //         return songs;
// //     } catch (error) {
// //         console.error("Error fetching songs:", error);
// //     }
// // }
// async function getSongs(folder) {
//     currFolder = folder;
//     let a = await fetch(`/${folder}/`)
//     let response = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a")
//     songs = []
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split(`/${folder}/`)[1])
//         }
//     }
 


//     // Show all the songs in the playlist
//     let songUL = document.querySelector(".song-list").getElementsByTagName("ul")[0]
//     songUL.innerHTML = ""
//     for (const song of songs) {
//         songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" width="34" src="music.svg" alt="">
//                             <div class="info">
//                                 <div> ${song.replaceAll("%20", " ")}</div>
//                                 <div>Harry</div>
//                             </div>
//                             <div class="playnow">
//                                 <span>Play Now</span>
//                                 <img class="invert" src="play.svg" alt="">
//                             </div> </li>`;
//     }

//     // Attach an event listener to each song
//     Array.from(document.querySelector(".song-list").getElementsByTagName("li")).forEach(e => {
//         e.addEventListener("click", element => {
//             playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

//         })
//     })

//     return songs
// }





// const setupCurrentSong = (track) => {
//     if (currentSong) {
//         currentSong.pause();
//         currentSong.removeEventListener('timeupdate', onTimeUpdate);
//         currentSong = null;
//     }

//     currentSong = new Audio(`/${currFolder}/` + track);
//     currentSong.addEventListener('timeupdate', onTimeUpdate);
// }

// const onTimeUpdate = () => {
//     if (currentSong) {
//         document.querySelector(".songtime").textContent = `${secondsToMMSS(currentSong.currentTime)} / ${secondsToMMSS(currentSong.duration)}`;
//         document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
//     }
// };

// document.querySelector(".seekbar").addEventListener("click", e => {
//     // ... (No changes here)
// });
// const playMusic = (track) => {
//     if (!currentSong || currentSong.src !== `/${currFolder}/` + track) {
//         setupCurrentSong(track);
//     }

//     let playButton = document.getElementById('play');
//     if (playButton) {
//         if (currentSong.paused) {
//             currentSong.play();
//             playButton.src = "pause.svg";
//         } else {
//             currentSong.pause();
//             playButton.src = "play.svg";
//         }
//     }

//     document.querySelector(".songinfo").textContent = track;
// }

 
// // async function displayAlbums(){
// //     let a = await fetch(`http://127.0.0.1:5500/songs/`)
// //     let response = await a.text();
// //     let div = document.createElement("div")
// //     div.innerHTML = response;
// //     console.log(div)
// //    let anchors= div.getElementsByTagName("a")
// //  Array.from(anchors).forEach(async  e=>{
// //     console.log(e.href)
// //     if(e.href.includes("/songs")){
// //      let folder =   console.log(e.href.split("/").slice(-1 )[0])
// //      //Metadata from url
// //      let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
// //      let response = await a.json();
// //      console.log(response)
// //     }
// //  })
// // }



// async function displayAlbums() {
//     console.log("displaying albums")
//     let a = await fetch(`/songs/`)
//     let response = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let anchors = div.getElementsByTagName("a")
//     let cardContainer = document.querySelector(".cardContainer")
//     let array = Array.from(anchors)
//     for (let index = 0; index < array.length; index++) {
//         const e = array[index]; 
//         if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
//             let folder = e.href.split("/").slice(-2)[0]
//             // Get the metadata of the folder
//             let a = await fetch(`/songs/${folder}/info.json`)
//             let response = await a.json(); 
//             cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="${folder}" class="card">
//             <div class="play">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//                     xmlns="http://www.w3.org/2000/svg">
//                     <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
//                         stroke-linejoin="round" />
//                 </svg>
//             </div>

//             <img src="/songs/${folder}/cover.jpg" alt="">
//             <h2>${response.title}</h2>
//             <p>${response.description}</p>
//         </div>`
//         }
//     }
// }








// async function main() {
//     await getSongs("songs/Honey");

//     //Display albums

//     displayAlbums()




//     if (songs.length > 0) {
//         document.querySelector(".songinfo").textContent = decodeURIComponent(songs[0]);
//         setupCurrentSong(songs[0]); // Setup but don't play
//     }

   

//     let playButton = document.getElementById('play');
//     if (playButton) {
//         playButton.src = "play.svg";

//         playButton.addEventListener("click", () => {
//             if (currentSong && currentSong.paused) {
//                 currentSong.play();
//                 playButton.src = "pause.svg";
//             } else if (currentSong) {
//                 currentSong.pause();
//                 playButton.src = "play.svg";
//             }
//         });
//     }


//     //for updating seekbar 
//     document.querySelector(".seekbar").addEventListener("click", e => {
//         let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

//         document.querySelector(".circle").style.left = percent + "%";
//         currentSong.currentTime = ((currentSong.duration) * percent) / 100
//         //   console.log( currentSong.currentTime= ((currentSong.duration)* percent)/100)  
//     })

//     //event listener for hamburger menu

//     document.querySelector(".hamburger").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "0";
//     })
//     //event listener for closing hamburger menu

//     document.querySelector(".close").addEventListener("click", () => {
//         document.querySelector(".left").style.left = "-250%";
//     })


//     //prev and next

//     prevsong.addEventListener("click", () => {


//         let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])

//         if ((index + 1) >= 0) {
//             playMusic(songs[index + 1])
//         }
//     })

//     nextsong.addEventListener("click", () => {

//         currentSong.pause()
//         let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])


//         if ((index + 1) < songs.length) {
//             playMusic(songs[index + 1])
//         }
//     })

//     //event for volume control
//     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {

//         currentSong.volume = parseInt(e.target.value) / 100

//     })


//     //load playlist when card is clicked
//     Array.from(document.getElementsByClassName(".card")).forEach(e=>{
//         e.addEventListener("click", async item=>{
//             songs = await getSongs(`songs/${item.dataset.folder}`)
        
//         })
//     })
// }





// main();








