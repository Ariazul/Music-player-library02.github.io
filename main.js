let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');


//All songs list
let All_song = [
   {
     name: "Directions",
     path: "1.wav",
     img: "img1.jpg",
     singer: "Esta pieza conceptual buscar ilustrar una porción de la afable presencia constante del sonido, que es, intrínseco en nuestras vidas como artistas. Acompañandonos en caminos inciertos dotados de emociones sensibles en sus impredecibles direcciones."
   },
   {
     name: "Changer",
     path: "2.wav",
     img: "img2.jpg",
     singer: "Pieza escénica concebida empleando técnicas conceptuales creativas a fin de crear un guion sonoro, el cual establece una narrativa audiovisual empleando elementos musicales, referencias culturales y efectos de sonido."
   },
   {
     name: "Binaural Secuence",
     path: "3.wav",
     img: "img3.jpg",
     singer: "Pieza experimental creada a partir del empleo de técnicas de espacialización binaural con la intención de ampliar las posibilidades de complementar una escena narrativa de plano secuencia aportando valor desde la dimensión sonora."
   },
   {
     name: "NewSea",
     path: "4.wav",
     img: "img4.jpg",
     singer: "Pieza escénica creada con el propósito de lograr representar una secuencia principal que se integre con un ambiente sonoro que transmita el desarrollo del los sucesos del guion narrativo, empleando diversos detalles en la producción del audio."
   },
   {
     name: "DarkFilm",
     path: "5.wav",
     img: "img5.jpg",
     singer: "Pieza experimental concebida con el propósito de representar la experiencia en primera persona desde una posicion de escucha estática en un espacio determinado, diferenciando la procedencia del sonido a partir de procesar los timbres, los tiempos y los tipos reverberación."
   }
];


// All functions


// function load the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = All_song[index_no].path;
	title.innerHTML = All_song[index_no].name;	
	track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = All_song.length;
	present.innerHTML = index_no + 1;
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}


// next song
function next_song(){
	if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if(index_no > 0){
		index_no -= 1;
		load_track(index_no);
		playsong();

	}else{
		index_no = All_song.length;
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#148F77";
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
           if(autoplay==1){
		       index_no += 1;
		       load_track(index_no);
		       playsong();
           }
	    }
     }