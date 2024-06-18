const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";
const searchBox = document.getElementById('search-box');
const displayTitle = document.getElementById('display-title')


async function fetchGames(genres, q) {
    try {
        let url = `${BASE_URL}/games?limit=40`;
        if (genres) {
            url += `&genres=${genres}`
        }
        if (q) {
            url += `&q=${q}`;
        }
        const res = await fetch (url);
        if (!res.ok) {
            throw new Error(error);
        }
        const gamesData = await res.json();
        return gamesData;
    }
    catch (error) {
        console.error(error);
    }

}

async function renderGames(genres = null, q = '') {
    try{
        const gamesData = await fetchGames(genres, q);
        const displayGame= document.getElementById('game-area');
        displayGame.innerHTML ='';
        gamesData.data.forEach(game => {
            
                const gameContainer = document.createElement('div');
                gameContainer.classList.add('game-container');

                const gameTitle = document.createElement('div');
                gameTitle.textContent = game.name;
                gameTitle.classList.add('game-title')
                gameTitle.onclick = e => {
                    window.location.href = `http://127.0.0.1:5500/stema/singleGame/index.html?id=${game.appid}`;
                }
        
                const gameImage = document.createElement('img');
                gameImage.src = game.header_image;
                gameImage.classList.add('game-img');
                gameImage.onclick = e => {
                    window.location.href = `http://127.0.0.1:5500/stema/singleGame/index.html?id=${game.appid}`;
                }



                const tagContainer = document.createElement('div');
                tagContainer.classList.add('tag-container');
                tagContainer.setAttribute('id', 'tag-container');

                game.steamspy_tags.forEach(tag => {
                    const tagItem = document.createElement('div');
                    tagItem.textContent = tag;
                    tagItem.classList.add('tag-item');
                    tagContainer.appendChild(tagItem);
                });

                gameContainer.appendChild(gameImage);
                gameContainer.appendChild(gameTitle);
                gameContainer.appendChild(tagContainer);


                displayGame.appendChild(gameContainer);
            })
        }
    catch(error) {
        console.error (error);
    }   
}


async function fetchGenres() {
    try {
        let url = `${BASE_URL}/genres`;
        const res = await fetch (url);
        if (!res.ok) {
            throw new Error(error);
        }
        const genresData = await res.json();
        return genresData;
    }
    catch (error) {
        console.error(error);
    }
}

async function renderGenres() {
    try {
        const genresData = await fetchGenres();
        const displayGenres = document.getElementById('genre-area');
        const genreContainer = document.getElementById('genre-container')

        displayGenres.innerHTML = '';
        genresData.data.forEach(genre => {
            
            const genreList = document.createElement('div');
            genreList.textContent = genre.name;
            genreList.classList.add('genre-items');

            genreList.onclick = () => {
                selectedGenre = genre.name;     
                renderGames(selectedGenre); 
                displayTitle.textContent = genre.name;
            }

            genreContainer.appendChild(genreList);

            displayGenres.appendChild(genreContainer);

            
        })
    }
    catch (error) {
        console.error (error);
    }
}

searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const q = searchBox.value.trim();
        console.log(q)
        renderGames(null, q)
    }
})



renderGames();
renderGenres();


console.log ("hello world")