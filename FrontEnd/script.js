// // Ajout dynamique du portfolio
// async function generateGallery() {
//     // Récupération des données via l'API
//     const response = await fetch("http://localhost:5678/api/works");
//     const allWorks = await response.json();
//     const gallery = document.querySelector(".gallery");

//     // Stockage des œuvres pour le filtrage
//     window.allWorks = allWorks;

//     // Création de la galerie
//     renderGallery(allWorks);
// }

// // Fonction pour afficher la galerie
// function renderGallery(works) {
//     const gallery = document.querySelector(".gallery");
//     gallery.innerHTML = ""; // Réinitialiser la galerie

//     works.forEach(work => {
//         const figureElement = document.createElement("figure");
//         const imgElement = document.createElement("img");
//         const figcaptionElement = document.createElement("figcaption");

//         imgElement.src = work.imageUrl;
//         figcaptionElement.innerText = work.title;

//         gallery.appendChild(figureElement);
//         figureElement.appendChild(imgElement);
//         figureElement.appendChild(figcaptionElement);
//     });
// }

// // Initialiser la galerie
// generateGallery();

// // Création des filtres
// const mesProjetsTitle = document.querySelector(".mes-projets-title");
// const divElement = document.createElement("div");
// const ulElement = document.createElement("ul");

// divElement.classList.add("filters-container");
// ulElement.classList.add("filters-list");

// mesProjetsTitle.appendChild(divElement);
// divElement.appendChild(ulElement);

// const buttonNames = ["Tous", "Objets", "Appartements", "Hotels & restaurants"];
// const buttonClasses = ["btnTous", "btnObjets", "btnAppartements", "btnHotelsRestaurants"];

// // Création et ajout des boutons
// buttonNames.forEach((name, index) => {
//     const liElement = document.createElement("li");
//     const button = document.createElement("button");
//     button.textContent = name;

//     liElement.classList.add("filter-item");
//     button.classList.add("filter-btn", buttonClasses[index]);

//     // Écouteur d'événements pour filtrer les œuvres
//     button.addEventListener("click", () => {
//         filterGallery(index);
//     });

//     ulElement.appendChild(liElement);
//     liElement.appendChild(button);
    
// });

// // Fonction de filtrage
// function filterGallery(index) {
//     let filteredWorks;

//     if (index === 0) {
//         // "Tous"
//         filteredWorks = window.allWorks;
//     } else {
//         // Filtrer par catégorie
//         const categoryId = index; // Les indices correspondent aux ID des catégories
//         filteredWorks = window.allWorks.filter(work => work.categoryId === categoryId);
//     }

//     // Rendre la galerie avec les œuvres filtrées
//     renderGallery(filteredWorks);
// }

// // Initialiser la galerie
// generateGallery();

// Fonction pour générer la galerie dynamiquement
async function generateGallery() {
    // Récupération des données via l'API
    const response = await fetch("http://localhost:5678/api/works");
    const allWorks = await response.json();
    const gallery = document.querySelector(".gallery");

    // Stockage des œuvres pour le filtrage
    window.allWorks = allWorks;

    // Création de la galerie
    renderGallery(allWorks);
}

// Fonction pour afficher la galerie
function renderGallery(works) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // Réinitialiser la galerie

    works.forEach(work => {
        const figureElement = document.createElement("figure");
        const imgElement = document.createElement("img");
        const figcaptionElement = document.createElement("figcaption");

        imgElement.src = work.imageUrl;
        figcaptionElement.innerText = work.title;

        gallery.appendChild(figureElement);
        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);
    });
}

// Fonction pour générer les boutons de filtre dynamiquement
async function generateFilters() {
    // Récupération des catégories via l'API
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    const mesProjetsTitle = document.querySelector(".mes-projets-title");
    const divElement = document.createElement("div");
    const ulElement = document.createElement("ul");

    divElement.classList.add("filters-container");
    ulElement.classList.add("filters-list");

    mesProjetsTitle.appendChild(divElement);
    divElement.appendChild(ulElement);

    // Ajout du bouton "Tous"
    const allLiElement = document.createElement("li");
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allLiElement.classList.add("filter-item");
    allButton.classList.add("filter-btn", "btnTous");
    allButton.addEventListener("click", () => filterGallery(0));
    allLiElement.appendChild(allButton);
    ulElement.appendChild(allLiElement);

    // Création et ajout des boutons de catégorie
    categories.forEach(category => {
        const liElement = document.createElement("li");
        const button = document.createElement("button");
        button.textContent = category.name;

        liElement.classList.add("filter-item");
        button.classList.add("filter-btn", `btn${category.name.replace(/\s+/g, '')}`); // Supprime les espaces pour les noms de classe

        // Écouteur d'événements pour filtrer les œuvres
        button.addEventListener("click", () => {
            filterGallery(category.id);
        });

        liElement.appendChild(button);
        ulElement.appendChild(liElement);
    });
}

// Fonction de filtrage
function filterGallery(categoryId) {
    let filteredWorks;

    if (categoryId === 0) {
        // "Tous"
        filteredWorks = window.allWorks;
    } else {
        // Filtrer par catégorie
        filteredWorks = window.allWorks.filter(work => work.categoryId === categoryId);
    }

    // Rendre la galerie avec les œuvres filtrées
    renderGallery(filteredWorks);
}

// Initialiser la galerie (et les filtres dans la fonction applyEditionMode)
generateGallery();




// // Accéder au token d'authentification
// const authToken = localStorage.getItem('authToken');
// console.log(authToken);

// // Vider le Local Storage
// localStorage.clear();
// console.log("Local Storage has been cleared");




// Fonction pour appliquer les modifications pour le mode édition

function editionMode() {
    // Fonctionnalité ajout de la banner
    const header = document.querySelector("header");
    // Créer la nouvelle div
    const divBanner = document.createElement("div");
    divBanner.classList.add("log-banner");
    // Ajouter l'icône à la div
    const favicon = document.createElement("i");
    favicon.className = "fa-regular fa-pen-to-square";
    favicon.classList.add("fav-edition");
    divBanner.appendChild(favicon);
    // Ajouter le paragraphe à la div
    const pEdition = document.createElement("p");
    pEdition.textContent = "Mode édition";
    pEdition.classList.add("banner-p")
    divBanner.appendChild(pEdition);
    // modification css header original lors du mode édition
    document.querySelector(".header-container")
    .classList.add("header-container-edition")
    // Insérer la nouvelle div avant la première div existante dans le header
    const firstDiv = header.querySelector("div");
    header.insertBefore(divBanner, firstDiv);

    // Fonctionnalité ajout élément "modifier"
    const mesProjetsTitle = document.querySelector(".mes-projets-title")
    mesProjetsTitle.classList.add("mes-projets-title-edition")
    // Créer la nouvelle div
    const divModifier = document.createElement("div");
    divModifier.classList.add("log-modifier");
    // Créer l'élément i à la div
    const faviconModifier = document.createElement("i");
    faviconModifier.className = "fa-regular fa-pen-to-square";
    faviconModifier.classList.add("fav-edition-modifier");
    divModifier.appendChild(faviconModifier);
    // Créer l'élément p "modifier"
    const pModifier = document.createElement("p");
    pModifier.textContent = "modifier";
    pModifier.classList.add("modifier-p")
    divModifier.appendChild(pModifier);
    // modification css section portfolio original lors du mode édition
    document.querySelector("#portfolio")
    .classList.add("log-section-modifier")
    // Insérer la nouvelle div après le titre h2
    mesProjetsTitle.parentNode.insertBefore(divModifier, mesProjetsTitle.nextSibling);


}

function applyEditionMode () {
    // Accéder au token d'authentification
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
        // Si le token est présent, appliquer les modifications pour le mode édition
        editionMode();
    } else {
        // Si le token n'est pas présent, appliquer les modifications pour les utilisateurs non connectés
        generateFilters();
    }

}

applyEditionMode ();