let currentAudio = null; 
let currentSongIndex = 0; 
const songs = []; 

const seekBar = document.querySelector(".seek-bar"); 
const show =true;
const currentTimeDisplay = document.querySelector(".current-time"); 
const maxTimeDisplay = document.querySelector(".max-time"); 
const playHover = document.querySelector(".play-pause-btn"); 
const listPlaybutton = document.querySelector(".play-button"); 
const prevBtn = document.querySelector(".prev-btn"); 
const nextBtn = document.querySelector(".next-btn"); 

const muteBtn = document.querySelector(".mute-btn"); 
const volumeBar = document.querySelector(".volume-bar"); 

let isMuted = false; 
let previousVolume = 1; 

//listing photos
const accessKey = "YtuIcfCzXUNLgvOvGn4Kf07eGrhZrHxS00cJ9G0MR8E"; 
const imageGrid = document.getElementById("imageGrid");

const listFolders = async () => {
  try {
    const response = await fetch("https://github.com/MAK585585/spotify/tree/main/songs");
    const result = await response.text();

    let div = document.createElement("div");
    div.innerHTML = result;

    let tds = div.getElementsByTagName("td");

    const cardsDiv = document.querySelector(".cards"); 
    cardsDiv.innerHTML = ""; 
    const moods = [
      { title: "Joy", sentence: "Pure happiness fills the air." },
      { title: "Calm", sentence: "Peaceful moments bring tranquility." },
      { title: "Sadness", sentence: "Heavy heart, thoughts linger long." },
      { title: "Energy", sentence: "Vibrant spirit ignites the day." },
      { title: "Love", sentence: "Warmth surrounds, hearts connect deeply." },
      {
        title: "Adventure",
        sentence: "Excitement awaits, explore the unknown.",
      },
      { title: "Fear", sentence: "Tension rises, shadows loom closer." },
      { title: "Reflection", sentence: "Quiet moments spark deep thoughts." },
      { title: "Anger", sentence: "Fury ignites, emotions boil over." },
      { title: "Surprise", sentence: "Unexpected joy brings delight." },
      { title: "Anxiety", sentence: "Nervous thoughts race in circles." },
      { title: "Hope", sentence: "Light shines in dark times." },
      { title: "Gratitude", sentence: "Thankfulness fills my heart." },
      { title: "Confusion", sentence: "Lost in thoughts, unsure steps." },
      {
        title: "Nostalgia",
        sentence: "Memories linger, hearts remember fondly.",
      },
      { title: "Disgust", sentence: "Strong aversion, turn away quickly." },
      { title: "Curiosity", sentence: "Wonder fuels the mind's exploration." },
      {
        title: "Pride",
        sentence: "Achievement brings a sense of fulfillment.",
      },
      { title: "Loneliness", sentence: "Silence echoes, absence felt deeply." },
      { title: "Contentment", sentence: "Satisfaction in simple pleasures." },
      {
        title: "Frustration",
        sentence: "Blocked paths cause restless energy.",
      },
      { title: "Empathy", sentence: "Understanding others’ pain deeply." },
      {
        title: "Confidence",
        sentence: "Self-assuredness propels forward action.",
      },
      { title: "Satisfaction", sentence: "Content heart, a life well-lived." },
      {
        title: "Disappointment",
        sentence: "Expectations unmet, heart feels heavy.",
      },
      {
        title: "Excitement",
        sentence: "Anticipation builds, adrenaline rushes.",
      },
      { title: "Boredom", sentence: "Time drags, motivation fades away." },
      { title: "Content", sentence: "Simple joys bring lasting peace." },
      { title: "Restlessness", sentence: "Anxious energy seeks expression." },
      { title: "Relief", sentence: "Heavy weight finally lifted away." },
      { title: "Sorrow", sentence: "Tears flow, heart aches deeply." },
      { title: "Passion", sentence: "Fervent desire drives the soul." },
      { title: "Inspiration", sentence: "Creativity sparks new ideas." },
      { title: "Elation", sentence: "Overwhelming joy bursts forth." },
      { title: "Melancholy", sentence: "Bittersweet feelings linger softly." },
      { title: "Euphoria", sentence: "Extreme happiness envelops the spirit." },
      { title: "Doubt", sentence: "Uncertainty clouds clear decisions." },
      { title: "Yearning", sentence: "Deep longing for something missing." },
      { title: "Zeal", sentence: "Enthusiasm fuels every endeavor." },
      { title: "Serenity", sentence: "Calmness blankets the restless mind." },
      { title: "Apathy", sentence: "Indifference settles, no care exists." },
      { title: "Panic", sentence: "Heart races, thoughts scatter wildly." },
      { title: "Tenderness", sentence: "Gentle affection warms the soul." },
      {
        title: "Worry",
        sentence: "Concern lingers, thoughts spiral endlessly.",
      },
      { title: "Acceptance", sentence: "Embrace life as it unfolds." },
      { title: "Trust", sentence: "Belief in others’ good intentions." },
      { title: "Anticipation", sentence: "Excitement grows as moments near." },
      {
        title: "Vulnerability",
        sentence: "Openness invites deeper connections.",
      },
      {
        title: "Frivolity",
        sentence: "Lightheartedness brings joyful moments.",
      },
      { title: "Harmony", sentence: "Balance brings peace to life." },
      { title: "Exhaustion", sentence: "Fatigue settles, rest is needed." },
      { title: "Skepticism", sentence: "Questioning motives before trusting." },
      { title: "Apprehension", sentence: "Unease before the unknown ahead." },
      {
        title: "Hopefulness",
        sentence: "Optimism glimmers through dark times.",
      },
      { title: "Tension", sentence: "Strained feelings create tightness." },
      { title: "Wistfulness", sentence: "Longing for the past’s sweetness." },
      { title: "Triumph", sentence: "Victory celebrated, spirits soar high." },
    ];

    for (let i = 1; i < tds.length; i++) {
      let anchor = tds[i].querySelector("a");
      if (anchor && anchor.href.endsWith("/")) {
        
        let folderName = anchor.textContent.replace(/\//g, ""); 

        let folderCard = document.createElement("div");
        folderCard.classList.add("folder-card"); 
        folderCard.style.cursor = "pointer"; 

        
        folderCard.addEventListener("click", () => {
          listSongsInFolder(folderName); 
        });

        
        const imgElement = await fetchSingerImage();

        
        folderCard.appendChild(imgElement);

        
        let logo = document.createElement("img");
        logo.src = "./photos/logo.svg";
        logo.classList.add("folder-logo"); 
        folderCard.appendChild(logo);

        //play on hover button

        let playHover = document.createElement("div");
        playHover.innerHTML = `
          <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="25" fill="#20d860" />
            <polygon points="20,15 20,35 35,25" fill="black" />
          </svg>
        `;
        playHover.classList.add("play-hover"); 
        folderCard.appendChild(playHover);


       

        
        const randomIndex = Math.floor(Math.random() * moods.length);
        const { title, sentence } = moods[randomIndex];

        
        let folderText = document.createElement("div");
        folderText.classList.add("folder");
        folderText.textContent = folderName;
        folderCard.appendChild(folderText);

        
        let moodText = document.createElement("div");
        moodText.classList.add("mood-text"); 
        let displaySentence =
          sentence.length > 27 ? sentence.slice(0, 24) + "..." : sentence;

        moodText.innerHTML = `<h4>${title}</h4><h5>${displaySentence}</h5>`; 

        folderCard.appendChild(moodText); 

        cardsDiv.appendChild(folderCard);
      }
    }
  } catch (error) {
    console.error("Error fetching folders:", error);
  }
};
const listSongsInFolder = async (folderName) => {
  try {
    const response = await fetch(`https://github.com/MAK585585/spotify/tree/main/songs/${folderName}`);
    const result = await response.text();

    let div = document.createElement("div");
    div.innerHTML = result;

    let tds = div.getElementsByTagName("td");
    const listDiv = document.querySelector(".list-songs");
    listDiv.innerHTML = ""; 

    songs.length = 0; 

    for (let i = 0; i < tds.length; i++) {
      let anchor = tds[i].querySelector("a");
      if (anchor && anchor.href.endsWith(".mp3")) {
        let fileName = anchor.textContent
          .replace(/\.mp3$/, "")
          .replace(/-\d+$/, "");

        
        let audioFilePath = anchor.pathname;

        
        songs.push({ fileName, audioFilePath, playing: false });

        
        let songWrapper = document.createElement("div");
        songWrapper.classList.add("song-wrapper"); 

        
        let helloDiv = document.createElement("div");
        helloDiv.innerHTML =
        
          '<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="hsl(0 0% 65% / 1)" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.288"></g><g id="SVGRepo_iconCarrier"> <path d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM9 19V5L21 3V17M21 17C21 18.1046 19.6569 19 18 19C16.3431 19 15 18.1046 15 17C15 15.8954 16.3431 15 18 15C19.6569 15 21 15.8954 21 17ZM9 9L21 7" stroke="#hsl(0 0% 65% / 1)000000" stroke-width="0.984" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
          helloDiv.classList.add("media-logo");
        helloDiv.style.flex = "1"; 

        let songItem = document.createElement("div");
        songItem.classList.add("song-name");
        songItem.textContent = fileName;
        songItem.style.cursor = "pointer"; 
        songItem.style.flex = "3"; 

        let friendsDiv = document.createElement("div");
        friendsDiv.classList.add("item-right");
        friendsDiv.innerHTML = ` <span>Play Now</span><div class="play-button">
         
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI">
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" fill="hsl(0 0% 65% / 1)"></path>
          </svg>
        </div>`;

        friendsDiv.style.flex = "2"; 

        
        
        friendsDiv.addEventListener("click", () => {
          
          const songIndex = songs.findIndex(
            (song) => song.audioFilePath === audioFilePath
          );

          
          if (songs[songIndex].playing) {
            
            currentAudio.pause();
            songs[songIndex].playing = false; 

      
            const playIcon = "./photos/play-button.svg";
            playHover.innerHTML = `<img src="${playIcon}" alt="Play">`; 
        
          

            
            friendsDiv.innerHTML = `<span>Play Now</span><div class="play-button">
              <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI">
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" fill="hsl(0 0% 65% / 1)"></path>
              </svg>
            </div>`;
          } else {
            
            if (currentAudio) {
              const previousSongIndex = songs.findIndex((song) => song.playing);
              if (previousSongIndex !== -1) {
                
                currentAudio.pause();
                songs[previousSongIndex].playing = false; 

                
                const previousButtonDiv = listDiv.children[previousSongIndex];
                previousButtonDiv.querySelector(".item-right").innerHTML = `<span>Play Now</span><div class="play-button">
                  <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI">
                    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z" fill="hsl(0 0% 65% / 1)"></path>
                  </svg>
                </div>`;
              }
            }

            
            playAudio(audioFilePath);
         
         
            if( songs[songIndex].playing = true && currentAudio){
              friendsDiv.innerHTML = `
              <span class="music-animation">
                <img class="invert" src="./photos/Animation - 1727891555972 (1).gif" width="70px" alt="Music Animation">
              </span>
              <img src="./photos/pause-button.svg" width="27px" alt="" style="margin-left: 12px;">
            `;
          

            }
             
             

            
            
          }
        });

        
        songWrapper.appendChild(helloDiv);
        songWrapper.appendChild(songItem);
        songWrapper.appendChild(friendsDiv);

     


        
        listDiv.appendChild(songWrapper);
      }
    }

    if (songs.length > 0) {
      currentSongIndex = 0; 
      playAudio(songs[currentSongIndex].audioFilePath); 
      
    }
  } catch (error) {
    console.error("Error fetching songs in folder:", error);
  }
};
window.addEventListener("DOMContentLoaded", () => {
 
  listSongsInFolder("ncs");


});


const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`; 
};

const playAudio = (audioFilePath) => {
  
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0; 
  }

  
  currentAudio = new Audio(audioFilePath);

  

  currentAudio.volume = volumeBar.value; 
  currentAudio.play();

  
  playHover.innerHTML = `<img src="./photos/pause-button.svg" alt="Pause">`;

  
  currentAudio.addEventListener("timeupdate", () => {
    seekBar.max = currentAudio.duration; 
    seekBar.value = currentAudio.currentTime; 

    
    currentTimeDisplay.textContent = formatTime(currentAudio.currentTime);

    
    maxTimeDisplay.textContent = formatTime(currentAudio.duration);
  });

  
  seekBar.addEventListener("input", () => {
    currentAudio.currentTime = seekBar.value; 
  });
};


playHover.addEventListener("click", () => {
  if (currentAudio) {
    const playIcon = "./photos/play-button.svg";
    const pauseIcon = "./photos/pause-button.svg"; 

    if (currentAudio.paused) {
      currentAudio.play();
      playHover.innerHTML = `<img src="${pauseIcon}" alt="Pause">`;
      listPlaybutton.innerHTML=`<svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 dYnaPI">
  <path d="M4 1.713a.7.7 0 0 1 .7.7v12.572a.7.7 0 0 1-1.4 0V2.413a.7.7 0 0 1 .7-.7zM12 1.713a.7.7 0 0 1 .7.7v12.572a.7.7 0 0 1-1.4 0V2.413a.7.7 0 0 1 .7-.7z" fill="hsl(0 0% 65% / 1)"></path>
</svg>
`
    } else {
      currentAudio.pause();
   

      playHover.innerHTML = `<img src="${playIcon}" alt="Play">`;
      listPlaybutton.innerHTML=` <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="25" r="25" fill="#20d860" />
            <polygon points="20,15 20,35 35,25" fill="black" />
          </svg>`
    }
  }
});


prevBtn.addEventListener("click", () => {
  if (currentSongIndex > 0) {
    currentSongIndex--;
    playAudio(songs[currentSongIndex].audioFilePath);
  }
});


nextBtn.addEventListener("click", () => {
  if (currentSongIndex < songs.length - 1) {
    currentSongIndex++;
    playAudio(songs[currentSongIndex].audioFilePath);
  }
});



const muteIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M11 5L6 9H2v6h4l5 4V5z" />
  <line x1="19" y1="9" x2="23" y2="13" />
  <line x1="19" y1="13" x2="23" y2="9" />
</svg>

`;

const unmuteIcon = `
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19 9a5 5 0 0 1 0 6" />
            <path d="M21 7a9 9 0 0 1 0 10" />
          </svg>
`;


muteBtn.addEventListener("click", () => {
  if (currentAudio) {
    if (isMuted) {
      currentAudio.volume = previousVolume; 
      muteBtn.innerHTML = unmuteIcon; 
      isMuted = false;
    } else {
      previousVolume = currentAudio.volume; 
      currentAudio.volume = 0; 
      muteBtn.innerHTML = muteIcon; 
      isMuted = true;
    }
  }
});


muteBtn.innerHTML = unmuteIcon;


volumeBar.addEventListener("input", () => {
  if (currentAudio) {
    currentAudio.volume = volumeBar.value; 
    if (volumeBar.value == 0) {
      muteBtn.innerHTML = muteIcon;
      isMuted = true;
    } else {
      muteBtn.innerHTML = unmuteIcon;
      isMuted = false;
    }
  }
});


listFolders();

//listing photos in album





const usedImages = new Set();

async function fetchSingerImage() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=singer&client_id=${accessKey}`
    );
    const data = await response.json();
    const availableImages = data.results.map((image) => image.urls.small); 

    
    if (usedImages.size >= availableImages.length) {
      usedImages.clear(); 
    }

    
    let imageUrl = "";
    for (let i = 0; i < availableImages.length; i++) {
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      imageUrl = availableImages[randomIndex];
      if (!usedImages.has(imageUrl)) {
        usedImages.add(imageUrl); 
        break; 
      }
    }

    
    if (imageUrl) {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.alt = "Singer";
      return imgElement;
    } else {
      console.warn("No available images left to use.");
      return null; 
    }
  } catch (error) {
    console.error("Error fetching singer image:", error);
  }
}
