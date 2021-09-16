let elForm = MakeElem('#form')
let movieList = MakeElem('.movie__list')
let movieGenreList = MakeElem('.movie__genre-list')
let movieGenre = MakeElem('.movie__genre')
let movieSearch = MakeElem('.movie__search')
let movieSelect = MakeElem('.select')
let elModal = MakeElem(".modal")
let modalBtn = MakeElem(".modal__btn")



function renderGenresSelect(films, element) {
    const result = []
    films.forEach(film => {
        film.genres.forEach(genre =>{
            if (!result.includes(genre)) {
                result.push(genre)
            }
        })
    })
    
    result.forEach(genre =>{
        const newOption = CreateDom('option')
        newOption.value = genre;
        newOption.textContent = genre
        
        element.appendChild(newOption)
    })
}

renderGenresSelect(films, movieGenre)



function render(arrFilm, element) {

    element.innerHTML = null
    arrFilm.forEach(film => {
        
        //creating elements
        let newLi = CreateDom('li')
        let newImg = CreateDom('img')
        let elBtn = CreateDom("button")
        
        //creating attributes 
        newLi.setAttribute('class','movie__item' )
        newImg.setAttribute('src', film.poster)
        newImg.setAttribute('width','220')
        newImg.setAttribute('height','300')
        elBtn.setAttribute("class", "btn")
        
        
        //elements content
        elBtn.textContent = "More"
        elBtn.dataset.uuid = film.id
        
        //appendChilds
        newLi.appendChild(newImg)
        newLi.appendChild(elBtn)
        movieList.appendChild(newLi)

        elBtn.addEventListener("click", (evn) =>{

            let filmID = evn.target.dataset.uuid
            let x = arrFilm.find((e) => filmID == e.id)
            let elText = MakeElem(".text")
            let movieGenres = MakeElem(".movie__genres")
            let movieItemTitle = MakeElem(".movie__item-title")
            let movietime = MakeElem(".release_date")


            movieItemTitle.textContent = x.title;
            elText.textContent = x.overview;
            movieGenres.textContent = x.genres
            movietime.textContent = normalizeDate(x.release_date)
            elModal.classList.add("modal--active")
        })
        modalBtn.addEventListener("click", () =>{
            elModal.classList.remove("modal--active")
        })
    });
}

render(films, movieList)


elForm.addEventListener('keyup',(e)  =>{
    e.preventDefault()
    
    let selectGenres = movieGenre.value.trim()
    let searchFilms = movieSearch.value.trim()
    let regex = RegExp(searchFilms, 'gi')


    let searchedFilms = films.filter((film) =>{
        return film.title.match(regex)
    })
    
    

    let foundFilms = []
    
    if (selectGenres == 'All'){
        foundFilms = searchedFilms
    }else {
        foundFilms = searchedFilms.filter(film =>{
            return film.genres.includes(selectGenres)
        })
    }
    render(foundFilms,movieList )
})

let rec = new webkitSpeechRecognition();

vois.addEventListener('click', function(e){
    e.preventDefault();

    rec.start()

    rec.lang = 'en-US'

rec.onerror = function(){
    console.log("error")
}

rec.onend = function(){
    console.log('aloqa tugadi')
}

rec.onresult = function(e){
    

    movieSearch.value = e.results[0][0].transcript;

}
})