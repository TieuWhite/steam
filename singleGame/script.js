const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";
const url_string = window.location.href;
const url = new URL(url_string);
const gameId = url.searchParams.get('id');

if (!gameId) {
    window.location.href = 'http://127.0.0.1:5500/stema/index.html';
}

async function fetchGames(appid) {
    try {
        let url = `${BASE_URL}/single-game/${appid}`;
        const res = await fetch(url);
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

function renderGame(detail) {
    try {    
        const displayTitle = document.getElementById('display-title')
        const displayGame = document.getElementById('game-area');
        displayGame.innerHTML = `
                <div class="game-background" style="background-image: url('${detail.background}')">
                    <div class="game-container">
                        <img class="game-img" src="${detail.header_image}">
                        <div class="game-info">
                                <div class="game-description">${detail.description}</div>
                                <div id="game-tag" class="game-tag"></div>
                        </div>
                    </div>
                </div>
            `
        
        const gameTag = document.getElementById('game-tag');
        detail.steamspy_tags.forEach(tag => {
            const tagItem = document.createElement('div');
            tagItem.classList.add('tag-item');
            tagItem.textContent = tag;
            gameTag.appendChild(tagItem);
        })

        displayTitle.textContent = `${detail.name}`;
    }
    catch (error) {
        console.error(error);
    }
}

async function fetchGenres() {
    try {
        let url = `${BASE_URL}/genres`;
        const res = await fetch(url);
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
        console.error(error);
    }
}

fetchGames(gameId).then(respond => {
    renderGame(respond.data);
})

renderGenres()
