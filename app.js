const searchBar = document.getElementById("searchBar");
const charactersList = document.getElementById('charactersList');
const hideButton = document.getElementById('hideButton');
const allBtn = document.getElementById('allBtn');
let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {

    const searchString = e.target.value.toLowerCase();

    console.log(searchString);

    const filteredCharacters = hpCharacters.filter(character => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });

    displayCharacters(filteredCharacters);
})


const loadCharacters = async () => {
    try {
        const res = await fetch('https://hp-api.herokuapp.com/api/characters');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);

    } catch (err) {
        console.error(err);
    }
};


const displayCharacters = (characters) => {

    const htmlString = characters

        .map((character) => {
            if (character.image == "") {
                return `<li class="character">
                <h2>${character.name}</h2>       
            </li>`;
            } else if (character.image !== "") {
                return `<li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <p>Birth Date: ${character.dateOfBirth}</p>
                <img src="${character.image}"></img>
            </li>`;
            }
        })

        .join('');

    charactersList.innerHTML = htmlString;




    hideButton.addEventListener('click', () => {

        const htmlString = characters
            .map((character) => {
                if (character.image == "") {

                } else if (character.image !== "") {
                    return `<li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>`;
                }
            })

            .join('');
        charactersList.innerHTML = htmlString;
    })
    allBtn.addEventListener('click', () => {
        const htmlString = characters
            .map((character) => {
                if (character.image == "") {
                    return `<li class="character">
                <h2>${character.name}</h2>       
            </li>`;
                } else if (character.image !== "") {
                    return `<li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>`;
                }
            })
    
            .join('');
    
        charactersList.innerHTML = htmlString;
    })
};




loadCharacters();