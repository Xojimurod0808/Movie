let elForm = MakeElem('#form')
let movieList = MakeElem('.movie__list')
let movieGenreList = MakeElem('.movie__genre-list')
let movieGenre = MakeElem('.movie__genre')
let movieSearch = MakeElem('.movie__search')



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
        let newHeading = CreateDom('h2')
        let newTime = CreateDom('time')
        let newGenreLi = CreateDom('p')
        let elText = CreateDom("p")
        
        //creating attributes 
        newLi.setAttribute('class','movie__item' )
        newImg.setAttribute('src', film.poster)
        newImg.setAttribute('width','220')
        newImg.setAttribute('height','300')
        newHeading.setAttribute('class', 'movie__item-title')
        newTime.setAttribute('datetime', normalizeDate(film.release_date))
        newGenreLi.setAttribute('class', 'movie__genre')
        elText.setAttribute("class", "text")
        
        
        //elements content
        newHeading.textContent = film.title
        newTime.textContent = normalizeDate(film.release_date)
        newGenreLi.textContent = film.genres
        elText.textContent = film.overview
        
        //appendChilds
        newLi.appendChild(newImg)
        newLi.appendChild(newHeading)
        newLi.appendChild(newTime)
        newLi.appendChild(newGenreLi)
        newLi.appendChild(elText)
        movieList.appendChild(newLi)
    });
}

render(films, movieList)


elForm.addEventListener('submit',(e)  =>{
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
