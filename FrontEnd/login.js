// Sélectionne le formulaire de connexion par son ID
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    // Empêche le rechargement de la page lors de la soumission du formulaire
    event.preventDefault(); 
    
    // Récupère les valeurs des champs email et mot de passe
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // Envoie une requête POST à l'API de connexion
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST', // Utilise la méthode POST
            headers: { 'Content-Type': 'application/json' }, // Indique que les données envoyées sont au format JSON
            body: JSON.stringify({ email, password }) // Convertit les données en JSON
        });

        // Convertit la réponse en JSON
        const data = await response.json();

        // Si la réponse est positive (code 200)
        if (response.ok) {
            // Stocke le token d'authentification dans le localStorage
            localStorage.setItem('authToken', data.token);
            console.log('authToken')
            // Redirige l'utilisateur vers la page d'accueil
            window.location.href = 'index.html';
        } else {
            // Affiche un message d'erreur si les informations de connexion sont incorrectes
            alert("Erreur dans l’identifiant ou le mot de passe");
            // alert(data.message);
        }
    } catch (error) {
        // Affiche un message d'erreur en cas de problème avec la requête
        console.error('Erreur:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
    }
});
