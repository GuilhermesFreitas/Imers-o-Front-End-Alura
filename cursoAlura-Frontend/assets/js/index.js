const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:1000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            
            const filteredResults = result.filter(artist =>
                artist.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            displayResults(filteredResults);
        });
}

function displayResults(result) {
    resultPlaylist.classList.add("hidden");
    const gridContainer = document.querySelector('.grid-container'); // Seleciona o container dos artistas

    
    gridContainer.innerHTML = '';

    if (result.length === 0) {
        
        gridContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        resultArtist.classList.remove('hidden');
        return;
    }

    
    result.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('artist-card');

        card.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${element.urlImg}" alt="${element.name}">
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${element.name}</span>
                <span class="artist-categorie">${element.genre}</span>
            </div>
        `;

        gridContainer.appendChild(card); // Adiciona o card ao container
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});