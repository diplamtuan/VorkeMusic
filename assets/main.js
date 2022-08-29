const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = $('.cd');
const heading = $('.dashboard__header-heading-2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const player = $('.player');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const prevBtn = $('.btn-prev');
const nextBtn = $('.btn-next');
const shuffleBtn = $('.btn-shuffle');
const app = {
    currentIndex: 1,
    isPlaying: false,
    isShuffle: false,
    songs : [
        {
            name:'Peaches',
            path:'./music/song1.mp3',
            author:'Justin Bieber',
            img:'./img/Peaches.jpg'
        },
        {
            name:'Stay',
            path:'./music/song2.mp3',
            author:'Justin Bieber, The Kid LAROI',
            img:'./img/img1.jpg'
        },
        {
            name:'Ghost',
            path:'./music/song3.mp3',
            author:'Justin Bieber',
            img:'./img/img2.jpg'
        },
        {
            name:'Off My Face',
            path:'./music/song4.mp3',
            author:'Justin Bieber',
            img:'./img/img3.jpg'
        },
        {
            name:'Hold on',
            path:'./music/song5.mp3',
            author:'Justin Bieber',
            img:'./img/img4.jpg'
        },
        {
            name:'Intention',
            path:'./music/song6.mp3',
            author:'Justin Bieber',
            img:'./img/img5.jpg'
        },
        {
            name:'I Dont Care',
            path:'./music/song7.mp3',
            author:'Justin Bieber',
            img:'./img/img6.jpg'
        },
        {
            name:'What do you mean',
            path:'./music/song8.mp3',
            author:'Justin Bieber',
            img:'./img/img7.jpg'
        },
        {
            name:'I\'m the One',
            path:'./music/song9.mp3',
            author:'Justin Bieber',
            img:'./img/img8.jpg'
        },
        {
            name:'No Brainer',
            path:'./music/song10.mp3',
            author:'Justin Bieber',
            img:'./img/img9.jpg'
        }
    ],
    render: function() {
        const htmls =this.songs.map((song) => {
            return ` <div class="song">
            <div class="thumb-song" style="background-image:url('${song.img}')"></div>
             <div class="body-song">
                 <h5 class="name-song">${song.name}</h5>
                 <p class="author-song">${song.author}r</p>
             </div>
             <div class="option-song">
                 <i class="option-song-icon fa-solid fa-ellipsis"></i>
             </div>
         </div>`
        })
        $('.playlist').innerHTML = htmls.join('');
    },

    handleEvent: function() {
        //Phong to or thu nho Cd thumb
        const cdWidth = cd.offsetWidth;
        const _this = this;
        //Xu li Rotate Cd Thumb
            const cdThumbEffect = [{
                transform: 'rotate(360deg)'
            },
        ]
            const cdThumbTiming = {
                duration: 10000,
                iterations: Infinity,
            }
            const cdThumbAnimate = cdThumb.animate(cdThumbEffect, cdThumbTiming);
            cdThumbAnimate.pause();
       document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCd = cdWidth - scrollTop;
            cd.style.width = newCd > 0 ? newCd + 'px' : 0;
            cd.style.opacity = newCd / cdWidth;
       }
       //Play audio
       playBtn.onclick = function() {
        if(_this.isPlaying)
        {
            audio.pause();
        }else {
            audio.play();
        }
       }
       
       // Khi song duoc bat
       audio.onplay = function() {
            player.classList.add('playing');
            _this.isPlaying = true;
            cdThumbAnimate.play();
       }
       // Khi song duoc tat
       audio.onpause = function() {
            player.classList.remove('playing');
            _this.isPlaying = false;
            cdThumbAnimate.pause();
       }

       // Xu li timeline cua bai hat
       audio.ontimeupdate = function () {
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
            progress.value = progressPercent;
       }

       // Khi song duoc seek
       progress.onchange = function(e) {
            const seekTime = Math.floor(e.target.value / 100 * audio.duration);
            audio.currentTime = seekTime;            
       }

       //Khi an nut nextSong
       nextBtn.onclick = function() {
            if(_this.isShuffle) {
                _this.playRandomSong();
                audio.play();   
            } else {
                _this.nextSong();
                audio.play();   
            }
            
       } 

       //Khi an nut prevSong
       prevBtn.onclick = function() {
        if(_this.isShuffle) {
            _this.playRandomSong();
            audio.play();
        } else {
            _this.prevSong();
            audio.play();
        }
       }

       //An hien nut shuffle 
       shuffleBtn.onclick = function() {
            _this.isShuffle = !_this.isShuffle;
            shuffleBtn.classList.toggle('active',this.isShuffle);
       }
    },

    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong();
    }, 

    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong();
    },

    //Dinh nghia cac bien moi cho Objects
    definedPropertys: function () {
        Object.defineProperty(this,'currentSong',{
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },

    loadCurrentSong: function (){
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.img})`;
        audio.src = this.currentSong.path;
    },
    playRandomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while( newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function() {
        // Dinh nghia cac thuoc tinh moi cho Object
        this.definedPropertys();

        // Tai? cac bai hat tu playlist
        this.render();
        // Xu li / Kiem soat cac su kien
        this.handleEvent();

        // Tai bai hat hien tai 
        this.loadCurrentSong();
    },

}

app.start();
