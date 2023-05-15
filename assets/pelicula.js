//leer id palicula desde url 
// ejemplo id 550 = Club de la pelea

const urlvalores = new URLSearchParams(window.location.search);
const id = urlvalores.get("id");
console.log("id pelicula: ", id);

const consulta = 'https://api.themoviedb.org/3/movie/'+id+'?api_key=45082c7b0f792bc71f372fbce1b42c61&language=es-es&append_to_response=credits'
const urlbaseimagen = 'https://image.tmdb.org/t/p/w1066_and_h600_bestv2/' 
const urlactorimagen = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' 

//conectar a la base de datos themoviedb

fetch(consulta)

.then(response => response.json())


.then(data => {
    console.log(data);  
        
    
    const titulopelicula = document.getElementById('titulo');
    titulopelicula.textContent = data.title;
    document.title = data.title+' - Popcorn';

    const imagenpelicula = document.getElementById("imagen");
    const laurl =`url(${urlbaseimagen}${data.backdrop_path})`;
    imagenpelicula.style.backgroundImage = laurl;       

    const sinopsis = document.getElementById('sinopsistxt');
    sinopsis.textContent = data.overview;

    const poster = document.getElementById('poster');
    poster.src = `${urlactorimagen}${data.poster_path}`; 


	// obtener el director de la película
	const director = data.credits.crew.find(member => member.department === "Directing" && member.job === "Director");
	// mostrar el nombre del director en la página
	if (director) {
	const directorElement = document.getElementById('directortxt');
	directorElement.textContent = `${director.name}`;
    const idDirector= `${director.id}`;


//datos del director

    const consultadirector=`https://api.themoviedb.org/3/person/${idDirector}?api_key=45082c7b0f792bc71f372fbce1b42c61&language=es-es`;
    console.log(consultadirector);  

    fetch(consultadirector)
						.then(response => response.json())
						.then(personData => {
                            console.log(personData);  

                            const detalledirector = document.getElementById('director-biografia');
                            detalledirector.textContent = personData.biography;
                            
                            const fotodirector = document.getElementById('fotodirector');
                            fotodirector.src = `${urlactorimagen}${personData.profile_path}`; 

						})
						.catch(error => console.error(error));


    }


       
    const fotoactor1 = document.getElementById('imgactor1');
    fotoactor1.src = `${urlactorimagen}${data.credits.cast[0].profile_path}`; 
    fotoactor1.alt = data.credits.cast[0].name; 
    const actor1 = document.getElementById('actor1');
    actor1.textContent = data.credits.cast[0].name;
    const papel1 = document.getElementById('papel1');
    papel1.textContent = data.credits.cast[0].character;

    const fotoactor2 = document.getElementById('imgactor2');
    fotoactor2.src = `${urlactorimagen}${data.credits.cast[1].profile_path}`; 
    fotoactor2.alt = data.credits.cast[1].name; 
    const actor2 = document.getElementById('actor2');
    actor2.textContent = data.credits.cast[1].name;
    const papel2 = document.getElementById('papel2');
    papel2.textContent = data.credits.cast[1].character;

    const fotoactor3 = document.getElementById('imgactor3');
    fotoactor3.src = `${urlactorimagen}${data.credits.cast[2].profile_path}`; 
    fotoactor3.alt = data.credits.cast[2].name; 
    const actor3 = document.getElementById('actor3');
    actor3.textContent = data.credits.cast[2].name;
    const papel3 = document.getElementById('papel3');
    papel3.textContent = data.credits.cast[2].character;

    var actores="";

    let n=3;
    while (n < 20) {
    n++;
    actores = actores+data.credits.cast[n].name;
    actores = actores+", ";
    }
    const elenco = document.getElementById('elenco');
    elenco.textContent = actores;

})
.catch(error => console.error(error));

   const consultavideo ='https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=45082c7b0f792bc71f372fbce1b42c61'

       fetch(consultavideo)
       .then(response => response.json())
       .then(datavideo => {
       console.log(datavideo);

       const trailer = document.getElementById('trailer');
       trailer.src = "https://www.youtube.com/embed/"+datavideo.results[0].key;
       })
	.catch(error => console.error(error));



