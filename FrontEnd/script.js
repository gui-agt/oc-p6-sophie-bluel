// Fonction pour générer la galerie dynamiquement
async function generateGallery() {
    // Récupération des données via l'API
    const response = await fetch("http://localhost:5678/api/works");
    const allWorks = await response.json();

    // Stockage des oeuvres pour le filtrage
    window.allWorks = allWorks;

    // Création de la galerie
    renderGallery(allWorks);
    renderGalleryInModal(allWorks);
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
    allButton.classList.add("filter-btn", "active", "btnTous");
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

        // Écouteur d'événements pour filtrer les oeuvres
        button.addEventListener("click", () => {
            filterGallery(category.id);
        });

        liElement.appendChild(button);
        ulElement.appendChild(liElement);
    });
}


// Ajout de la fonction active button
function setActiveButton() {
    const allButtons = document.querySelectorAll(".filter-btn");

    allButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            allButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
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

    // Rendre la galerie avec les oeuvres filtrées
    renderGallery(filteredWorks);
}

// Initialiser la galerie
generateGallery();


// Fonction pour générer les filtres et bouton actif (dans la fonction applyEditionMode)
async function setupFiltersAndButtons() {
    await generateFilters();
    setActiveButton();
}


// Accéder au token d'authentification
const authToken = localStorage.getItem('authToken');
console.log(authToken);


// Fonction pour appliquer les modifications pour le mode édition

function editionModeHeader() {
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
}

function editionModeModifier() {
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

// Ajout bouton logout après authentification
function editionModeLogOutBtn () {
    const logButton = document.querySelector(".log-btn");
    logButton.innerText = "logout";
    logButton.addEventListener("click", handleLogOut); 
}

// Gestion déconnexion
function handleLogOut () {
    localStorage.clear();
    location.reload();
}

function applyEditionMode () {
    // Accéder au token d'authentification
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
        // Si le token est présent, appliquer les modifications pour le mode édition
        editionModeHeader();
        editionModeModifier();
        editionModeLogOutBtn();
    } else {
        // Si le token n'est pas présent, appliquer les modifications pour les utilisateurs non connectés
        setupFiltersAndButtons();
    }
}

applyEditionMode ();


// // Modal function

// Fonction pour ouvrir la première modale (galerie photo)
function openGalleryModal() {
    const containerModal = document.querySelector(".modal-main-container");
    const galleryModal = document.querySelector(".modal-container-gallery");
    containerModal.style.display = "flex";
    galleryModal.style.display = "block";
}

// Fonction pour fermer toutes les modales
function closeModals() {
    const containerModal = document.querySelector(".modal-main-container");
    const galleryModal = document.querySelector(".modal-container-gallery");
    const addPhotoModal = document.querySelectorAll(".modal-container-add");
    containerModal.style.display = "none";
    galleryModal.style.display = "none";
    addPhotoModal.forEach(modal => modal.style.display = "none");
}

// Fonction pour ouvrir la seconde modale (ajout photo)
function openAddPhotoModal() {
    closeModals(); // Ferme toutes les modales ouvertes
    const containerModal = document.querySelector(".modal-main-container");
    const addPhotoModal = document.querySelector(".modal-container-add");
    containerModal.style.display = "flex";
    addPhotoModal.style.display = "block";
}

// Fonction pour revenir à la modale gallerie
function backGalleryModal () {
    closeModals();
    openGalleryModal();
}

// Fonction pour fermer la modale si l'utilisateur clique à l'extérieur
function closeOnOutsideClick(event) {
    const containerModal = document.querySelector(".modal-main-container");
    const modalContainers = document.querySelectorAll(".modal-main-container > div");

    if (event.target === containerModal) {
        containerModal.style.display = "none";
        modalContainers.forEach(container => {
            container.style.display = "none";
        }
    );
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Ouvrir la modale galerie au clic sur la div .log-modifier
    const logModifier = document.querySelector(".log-modifier");
    if (logModifier) {
        logModifier.addEventListener("click", () => {
            openGalleryModal();
        });
    }

    // Fermer les modales au clic sur les icônes de fermeture
    const closeModalIcons = document.querySelectorAll(".close-modal");
    closeModalIcons.forEach(icon => {
        icon.addEventListener("click", closeModals);
    });

    // Ouvrir la modale ajout photo au clic sur le bouton dans la modale galerie
    const addPhotoButton = document.getElementById("open-add-photo-modal");
    if (addPhotoButton) {
        addPhotoButton.addEventListener("click", openAddPhotoModal);
    }

    // Ajouter l'évènement de clic sur la flèche pour revenir à la modale gallerie
    const arrowLeft = document.querySelector(".back-button-modal");
    if (arrowLeft) {
    arrowLeft.addEventListener("click", backGalleryModal);
    };

    // Ajouter l'événement de clic à document pour fermer la modale en cliquant à l'extérieur
    const containerModal = document.querySelector(".modal-main-container");
    if (containerModal) {
    document.addEventListener("click", closeOnOutsideClick);
    };
}
)


// Fonctionnalité ajout de photos

document.addEventListener('DOMContentLoaded', async () => {

    // Récupère les catégories depuis l'API
    const categoryResponse = await fetch('http://localhost:5678/api/categories');
    const categories = await categoryResponse.json();
    const categorySelect = document.getElementById('categorie');

    // crée un élément <option> et l'ajoute au <select> pour chaque catégorie
    categories.forEach(category => { 
        const option = document.createElement('option');
        option.value = category.id; // Définit la valeur de l'option comme l'ID de la catégorie
        option.textContent = category.name; // Définit le texte de l'option comme le nom de la catégorie
        categorySelect.appendChild(option); // Ajoute l'option au <select>
    });

    // Sélectionne les éléments nécessaires pour l'upload et la prévisualisation d'image
    const photoContainer = document.getElementById('drop-photo-container')
    const landscapeIcon = document.querySelector('.landscape-icon')
    const browseButton = document.getElementById('browse-button');
    const fileInput = document.getElementById('file-input');
    const previewImg = document.getElementById('preview-img');

    // Ajoute un écouteur d'événement pour ouvrir la boîte de dialogue de sélection de fichier
    browseButton.addEventListener('click', () => fileInput.click());

    // Ajoute un écouteur d'événement pour gérer le changement de fichier sélectionné
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; // Récupère le fichier sélectionné
        if (file) {
            // Si un fichier est sélectionné, utilise FileReader pour lire le contenu du fichier
            const reader = new FileReader();
            reader.onload = (e) => {
                // Une fois le fichier lu, affiche l'image dans l'élément <img> de prévisualisation
                previewImg.src = e.target.result;
                previewImg.style.display = 'block'; // Affiche l'élément <img>
                // Cache les autres éléments du bloc parent
                landscapeIcon.style.display = 'none';
                browseButton.style.display = 'none';
                fileInput.style.display = 'none';
                photoContainer.querySelector('p').style.display = 'none';
            };
            reader.readAsDataURL(file); // Lit le fichier comme une URL de données
        }
    });

    // Ajoute fonctionnalité changement d'image lors du clic sur l'image actuellement
    previewImg.addEventListener('click', () => fileInput.click());
});


// Gestion du formulaire d'ajout de photo

// On charge le DOM puis on ajoute la fonction
document.addEventListener('DOMContentLoaded', () => {

// On définit les éléments nécessaire
const validateButton = document.querySelector('.validate-btn');
const fileInput = document.getElementById('file-input');


// Ajoute un écouteur d'événement pour la soumission du formulaire lorsqu'on clique sur le bouton de validation
validateButton.addEventListener('click', async (event) => {
    // Empêche le comportement par défaut du bouton (rechargement de la page)
    event.preventDefault();

    // Crée un objet FormData pour envoyer les données du formulaire via une requête POST
    const formData = new FormData();

    // Vérification fichier sélectionné
    if (fileInput.files.length === 0) {
        alert("Veuillez sélectionner une image.");
        return;
    }

    // Vérification taille fichier (4 Mo max)
    const file = fileInput.files[0];
    const maxSize = 4 * 1024 * 1024; // 4 Mo
    if (file.size > maxSize) {
        alert("Le fichier dépasse la taille autorisée.\nVeuillez cliquer sur l'image pour sélectionner un autre fichier.");
        return;
    }

    // Ajoute le fichier image sélectionné au FormData
    formData.append('image', fileInput.files[0]);

    // Ajoute le titre saisi dans le formulaire au FormData
    formData.append('title', document.getElementById('titre').value);

    // Ajoute la catégorie sélectionnée dans le formulaire au FormData
    formData.append('category', document.getElementById('categorie').value);

    try {
        // Envoie les données du formulaire au serveur via une requête POST
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST', // Méthode HTTP pour envoyer les données
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Authentification avec le jeton stocké
            },
            body: formData // Les données du formulaire envoyées dans le corps de la requête
        });

        // Vérifie si la réponse du serveur est réussie
        if (response.ok) {
            alert('Photo ajoutée avec succès !'); // Affiche un message de succès
            generateGallery(); // Appelle la fonction pour mettre à jour la galerie avec la nouvelle photo
            closeModals(); // Ferme la fenêtre modale
            resetPhotoUpload();
            openGalleryModal();
        } else {
            alert('Erreur lors de l\'ajout de la photo.'); // Affiche un message d'erreur si la requête échoue
        }
    } catch (error) {
        // Capture et affiche les erreurs en cas de problème avec la requête
        console.error('Erreur:', error);
        alert('Erreur lors de l\'ajout de la photo.');
    }
});
});


// Fonction pour réinitialiser l'image uploadée
function resetPhotoUpload() {
    // Réinitialise l'input de fichier
    const fileInput = document.getElementById('file-input');
    fileInput.value = '';

    // Réinitialise l'image de prévisualisation et autres éléments de la modal
    const previewImg = document.getElementById('preview-img');
    previewImg.src = '';
    previewImg.style.display = 'none';

    const landscapeIcon = document.querySelector('.landscape-icon');
    const browseButton = document.getElementById('browse-button');
    const photoContainer = document.getElementById('drop-photo-container');

    // Affiche les éléments par défaut de la modal
    landscapeIcon.style.display = 'block';
    browseButton.style.display = 'block';
    fileInput.style.display = 'none';
    photoContainer.querySelector('p').style.display = 'block';

    // Réinitialise également le titre et la catégorie
    document.getElementById('titre').value = '';
    document.getElementById('categorie').value = '';
}


// Fonction pour afficher la galerie dans la modale
function renderGalleryInModal(works) {
    const galleryThumbnails = document.querySelector(".gallery-thumbnails");
    galleryThumbnails.innerHTML = ""; // Réinitialiser la galerie dans la modale

    works.forEach(work => {
        const figureThumbnail = document.createElement("figure");
        figureThumbnail.classList.add("thumbnail-container"); // Ajouter la classe pour le style
        
        const imgElement = document.createElement("img");
        imgElement.src = work.imageUrl;
        imgElement.classList.add("thumbnail-image"); // Ajouter la classe pour le style

        const deleteIconContainer = document.createElement("div");
        deleteIconContainer.className = "delete-icon-container";
        deleteIconContainer.addEventListener("click", () => deleteThumbnail(work.id, figureThumbnail));

        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fa-solid fa-trash-can delete-icon"; // Ajouter la classe pour le style

        galleryThumbnails.appendChild(figureThumbnail);
        figureThumbnail.appendChild(imgElement);
        figureThumbnail.appendChild(deleteIconContainer);
        deleteIconContainer.appendChild(deleteIcon);      
    });
}

// Fonction pour supprimer une miniature
async function deleteThumbnail(id, thumbnailElement) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });

        if (response.ok) {
            alert('Photo supprimée avec succès !');
            thumbnailElement.remove(); // Retirer la miniature de l'interface
            generateGallery(); // Mettre à jour la galerie principale
        } else {
            alert('Erreur lors de la suppression de la photo.');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression de la photo.');
    }
}