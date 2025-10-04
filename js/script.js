// Déclaration d'une variable globale qui stockera toutes les données de l'application (produits, utilisateurs, utilisateur actuel)
window.appData = null;
// Déclaration d'une variable qui contiendra l'instance du modal Bootstrap pour les produits
let productModal, userModal;



// =================== Ajout d'un écouteur d'événements sur tout le document pour détecter les saisies (input events) ======================= //

// On attache un "écouteur d'événement" au document entier.
// Ici, on écoute l'événement "input", qui se déclenche dès que l'utilisateur saisit quelque chose
// (par ex. dans un champ texte <input>).
document.addEventListener("input", function(e) {

  // Vérifie si l'élément qui a déclenché l'événement est bien le champ de recherche
  // On compare son attribut id avec "searchInput".
  if (e.target.id === "searchInput") {

    // On récupère ce que l'utilisateur a tapé dans le champ de recherche.
    // e.target.value → le contenu du champ saisi.
    // .toLowerCase() → convertit le texte en minuscules pour éviter les problèmes
    // entre majuscules/minuscules (ex: "Chaise" == "chaise").
    const term = e.target.value.toLowerCase();

    // On sélectionne toutes les lignes (<tr>) du tableau des produits.
    // "#productsTable tr" → signifie : "toutes les lignes dans l’élément ayant l’id productsTable".
    const rows = document.querySelectorAll("#productsTable tr");

    // On parcourt chaque ligne trouvée dans le tableau.
    rows.forEach(row => {

      // On récupère le contenu de la 2ème cellule de la ligne (index [1]) → qui correspond au "Nom du produit".
      // ?.textContent : le point d’interrogation évite une erreur si la cellule n’existe pas.
      // toLowerCase() : on convertit en minuscules pour comparer correctement.
      const name = row.cells[1]?.textContent.toLowerCase();

      // On récupère le contenu de la 3ème cellule de la ligne (index [2]) → qui correspond à la "Quantité".
      const qty = row.cells[2]?.textContent.toLowerCase();

      // Vérifie si ce que l’utilisateur a tapé (term) se trouve dans le nom OU dans la quantité.
      if (name.includes(term) || qty.includes(term)) {
        // ✅ Si le mot recherché est trouvé → on garde la ligne visible.
        row.style.display = "";
      } else {
        // ❌ Si le mot recherché n’est pas trouvé → on cache la ligne en modifiant son style CSS.
        row.style.display = "none";
      }
    });
  }
});

// =================== Fin de l'écouteur d'événements sur les saisies ======================= //





// ===================== Fonction qui sauvegarde les données de l'application dans le localStorage du navigateur ===================== //

// Déclaration d'une fonction appelée "saveAppData".
// Une fonction regroupe du code qu'on peut réutiliser à plusieurs endroits du programme.
function saveAppData() {

  // Ici, on enregistre les données de l'application (window.appData) dans le "localStorage".
  // localStorage : c’est une mémoire interne au navigateur qui garde des informations même si on ferme la page ou l'ordinateur.
  // JSON.stringify(window.appData) : transforme l'objet JavaScript "appData" en texte au format JSON,
  // car localStorage ne peut stocker que des chaînes de caractères.
  // "appData" : c’est la clé utilisée pour retrouver ces données plus tard.
  localStorage.setItem("appData", JSON.stringify(window.appData));

  // Cette ligne affiche un message dans la console du navigateur pour dire :
  // "Données sauvegardées :" suivi du contenu de window.appData.
  // Cela aide le développeur à vérifier que la sauvegarde a bien été faite.
  console.log("Données sauvegardées :", window.appData);
}

// ===================== Fin de la fonction qui sauvegarde les données dans le localStorage ===================== //




// ================== Fonction qui charge les données de l'application depuis le localStorage ================== //

// Déclaration d'une fonction appelée "loadAppData".
// Son rôle est de récupérer les données qui ont été sauvegardées dans le navigateur (via saveAppData).
function loadAppData() {

  // On récupère du localStorage la valeur associée à la clé "appData".
  // Cela correspond aux données sauvegardées précédemment (par exemple produits et utilisateurs).
  // Si rien n’a été sauvegardé, cette valeur sera "null".
  const d = localStorage.getItem("appData");

  // On vérifie si on a bien trouvé des données dans le localStorage.
  if (d) {
    // On utilise un bloc "try...catch" : c’est une structure pour tester du code qui pourrait générer une erreur
    // et réagir si une erreur survient (au lieu de faire planter tout le programme).
    try {
      // On convertit (parse) la chaîne JSON récupérée en véritable objet JavaScript.
      // Exemple : un texte comme '{"name":"Produit A"}' devient un objet {name: "Produit A"}.
      window.appData = JSON.parse(d);

      // On vérifie que dans l'objet chargé, il existe bien un tableau "users".
      // Cela garantit que les données ne sont pas corrompues ou incomplètes.
      if (!window.appData.users || !Array.isArray(window.appData.users)) {
        // Si les données sont incorrectes, on informe le développeur via un message dans la console.
        console.log("Données corrompues, réinitialisation");
        // On lance une erreur volontairement pour passer directement dans le bloc "catch".
        throw new Error("Invalid data");
      }

    } catch (e) {
      // Si une erreur est survenue (par exemple JSON mal formé ou problème d'accès aux données),
      // on affiche un message dans la console pour prévenir.
      console.log("Erreur de parsing, réinitialisation");
      // On force la variable window.appData à null pour signaler qu’il faudra recréer des données propres.
      window.appData = null;
    }
  }

  // Si on n’a trouvé aucune donnée OU si les données étaient invalides :
  if (!window.appData) {
    // On signale dans la console que l’on va créer des données par défaut.
    console.log("Création des données initiales");

    // On définit un nouvel objet window.appData avec des valeurs de base.
    window.appData = {
      // Un tableau vide pour les produits (rien n’est encore enregistré).
      products: [],

      // Un tableau d’utilisateurs par défaut pour tester l’application :
      // 1 administrateur (admin) et 1 utilisateur standard (user).
      users: [
        {username: "admin", password: "admin123", role: "admin", status: "Actif"},
        {username: "user", password: "user123", role: "user", status: "Actif"}
      ],

      // Au démarrage, aucun utilisateur n’est connecté (on attend une connexion via le formulaire).
      currentUser: null
    };

    // On sauvegarde immédiatement ces nouvelles données dans le localStorage
    // afin qu’elles soient disponibles lors du prochain chargement de la page.
    saveAppData();
  }

  // On affiche dans la console l’état final de window.appData
  // pour vérifier quelles données ont été effectivement chargées.
  console.log("Données chargées:", window.appData);
}

// ================== Fin de la fonction loadAppData ================== //





/*************************************************************
 * 🟢 Mise en route de l’application après le chargement de la page
 * → Ce code s’exécute automatiquement une fois que toute la page HTML est prête.
 * → Son rôle est d’activer toutes les fonctionnalités de l’application :
 *    - Charger les données sauvegardées
 *    - Préparer les fenêtres modales (produits et utilisateurs)
 *    - Activer les boutons (connexion, ajout produit, export, etc.)
 *    - Gérer la connexion/déconnexion des utilisateurs
 *************************************************************/

// On dit au navigateur : "Exécute ce code uniquement quand la page est complètement chargée"
document.addEventListener("DOMContentLoaded", function() {

  // Affiche un message dans la console pour vérifier que la page est bien chargée
  console.log("Page chargée");

  // Appelle une fonction qui recharge les données sauvegardées (produits, utilisateurs, etc.)
  loadAppData();

  // Affiche dans la console ce qui a été chargé (utile pour vérifier si tout va bien)
  console.log("Données après chargement:", window.appData);

  // Prépare une "fenêtre modale" Bootstrap pour les produits (fenêtre popup qui s’ouvre quand on clique)
  productModal = new bootstrap.Modal(document.getElementById("productModal"));

  // Prépare aussi une "fenêtre modale" Bootstrap pour les utilisateurs
  userModal = new bootstrap.Modal(document.getElementById("userModal"));

  // =====================================
  // Fonctionnalité : masquer/démasquer le mot de passe
  // =====================================

  // On récupère le bouton/zone cliquable qui permet d’afficher ou masquer le mot de passe
  const togglePassword = document.getElementById("togglePassword");

  // On récupère le champ de saisie du mot de passe
  const passwordField = document.getElementById("password");

  // On récupère l’icône (œil ou œil barré) pour l’afficher correctement
  const togglePasswordIcon = document.getElementById("togglePasswordIcon");

  // On dit : "Quand on clique sur l’icône/zone togglePassword"
  togglePassword.addEventListener("click", function() {

    // On vérifie si le champ est actuellement "password" (texte caché)
    // Si oui → on le change en "text" (texte visible)
    // Sinon → on le remet en "password"
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";

    // On applique le nouveau type (password ou text) au champ du mot de passe
    passwordField.setAttribute("type", type);

    // On change l’icône en fonction du mode choisi
    if (type === "password") {
      // Si c’est masqué → on affiche l’œil normal
      togglePasswordIcon.classList.remove("fa-eye-slash");
      togglePasswordIcon.classList.add("fa-eye");
    } else {
      // Si c’est visible → on affiche l’œil barré
      togglePasswordIcon.classList.remove("fa-eye");
      togglePasswordIcon.classList.add("fa-eye-slash");
    }
  });

  // =====================================
  // Vérification de l’utilisateur déjà connecté
  // =====================================

  // On vérifie si un utilisateur est déjà connecté (données sauvegardées dans appData)
  if (window.appData.currentUser) {
    console.log("Utilisateur déjà connecté:", window.appData.currentUser);

    // Si oui → on affiche directement l’application principale
    showMainApp();
  } else {
    console.log("Aucun utilisateur connecté");

    // Sinon → on reste sur la page de connexion
    showLoginPage();
  }

  // =====================================
  // Gestion des événements (connexion, boutons, formulaires…)
  // =====================================

  // Quand on clique sur "Se connecter", on empêche l’envoi normal du formulaire
  // et on appelle notre fonction handleLogin pour vérifier les identifiants
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    console.log("Form submit intercepté");
    handleLogin(e);
  });

  // Quand on clique sur "Déconnexion" → on appelle handleLogout
  document.getElementById("logoutBtn").addEventListener("click", handleLogout);

  // Quand on clique sur "Ajouter produit" → on vide le formulaire et on ouvre la fenêtre modale
  document.getElementById("addProductBtn").addEventListener("click", function() {
    document.getElementById("productForm").reset(); // on réinitialise le formulaire
    document.getElementById("productId").value = ""; // on vide l’ID (nouveau produit)
    productModal.show(); // on ouvre la fenêtre popup
  });

  // Quand on clique sur "Enregistrer produit" → on appelle la fonction saveProduct
  document.getElementById("saveProductBtn").addEventListener("click", saveProduct);

  // Quand on clique sur "Exporter CSV" → on appelle la fonction exportToCSV
  document.getElementById("exportBtn").addEventListener("click", exportToCSV);

  // Quand on clique sur "Admin" → on appelle la fonction showAdminPage
  document.getElementById("adminBtn").addEventListener("click", showAdminPage);

  // Quand on clique sur "Retour au Dashboard" → on appelle showDashboard
  document.getElementById("backToDashboard").addEventListener("click", showDashboard);

  // Quand on clique sur "Nouvel utilisateur" → on vide le formulaire et on ouvre la modale
  document.getElementById("addUserBtn").addEventListener("click", function() {
    document.getElementById("userForm").reset();
    userModal.show();
  });

  // Quand on clique sur "Créer utilisateur" → on appelle saveUser
  document.getElementById("saveUserBtn").addEventListener("click", saveUser);

  // Quand on clique sur "Exporter JSON" → on appelle exportJSON
  document.getElementById("exportJSONBtn").addEventListener("click", exportJSON);

  // Quand on clique sur "Importer JSON" → on déclenche un clic caché sur l’input file
  document.getElementById("importJSONBtn").addEventListener("click", function() {
    document.getElementById("importFile").click();
  });

  // Quand un fichier est choisi dans "Importer JSON" → on appelle importJSON
  document.getElementById("importFile").addEventListener("change", importJSON);
});
/*************************************************************
 * 🟢 Mise en route de l’application après le chargement de la page
 * → Ce code s’exécute automatiquement une fois que toute la page HTML est prête.
 * → Son rôle est d’activer toutes les fonctionnalités de l’application :
 *    - Charger les données sauvegardées
 *    - Préparer les fenêtres modales (produits et utilisateurs)
 *    - Activer les boutons (connexion, ajout produit, export, etc.)
 *    - Gérer la connexion/déconnexion des utilisateurs
 *************************************************************/






/*************************************************************
 * 🟢 Fonction de gestion de la connexion utilisateur
 * → Cette fonction est appelée quand quelqu’un essaie de se connecter.
 * → Son rôle est de :
 *    - Empêcher l’envoi normal du formulaire (rechargement de la page)
 *    - Vérifier si les identifiants (username + password) correspondent
 *    - Connecter l’utilisateur si tout est correct
 *    - Sinon, afficher un message d’erreur
 *************************************************************/

// Déclaration de la fonction handleLogin qui reçoit un "événement" (e) en paramètre
function handleLogin(e) {

  // Empêche le comportement normal du formulaire (qui est de recharger la page)
  e.preventDefault();

  // Affiche un message dans la console pour dire que la fonction a été appelée
  console.log("handleLogin appelé");
  
  // Récupère la valeur saisie dans le champ "username" (identifiant)
  const u = document.getElementById("username").value;

  // Récupère la valeur saisie dans le champ "password" (mot de passe)
  const p = document.getElementById("password").value;
  
  // Affiche dans la console la tentative de connexion avec l’identifiant et le mot de passe
  console.log("Tentative de connexion:", u, p);

  // Affiche dans la console la liste des utilisateurs disponibles (stockés dans appData)
  console.log("Users disponibles:", window.appData.users);
  
  // Recherche dans la liste des utilisateurs un objet qui correspond exactement :
  // - même identifiant (username)
  // - même mot de passe (password)
  // - ET statut égal à "Actif"
  const usr = window.appData.users.find(
    x => x.username === u && x.password === p && x.status === "Actif"
  );
  
  // Affiche dans la console l’utilisateur trouvé ou "undefined" si aucun ne correspond
  console.log("Utilisateur trouvé:", usr);
  
  // Vérifie si un utilisateur a bien été trouvé
  if (usr) {
    // Si oui → on enregistre cet utilisateur comme étant le "currentUser" (utilisateur actuel connecté)
    window.appData.currentUser = {username: usr.username, role: usr.role};

    // On sauvegarde les données mises à jour (y compris l’utilisateur connecté)
    saveAppData();

    // On affiche dans la console que la connexion a réussi pour cet utilisateur
    console.log("Connexion réussie pour:", usr.username);

    // On affiche l’application principale (dashboard, produits, etc.)
    showMainApp();

    // On affiche une alerte visuelle "Connexion réussie"
    // Paramètres : (message, type, jouer le son ?)
    showAlert("Connexion réussie", "success", true);

  } else {
    // Si aucun utilisateur valide n’a été trouvé → on affiche dans la console l’échec
    console.log("Échec de connexion");

    // On affiche une alerte visuelle d’erreur
    showAlert("Identifiants incorrects ou utilisateur inactif", "danger", true);
  }
}
/*************************************************************
 * 🟢 Fonction de gestion de la connexion utilisateur
 * → Cette fonction est appelée quand quelqu’un essaie de se connecter.
 * → Son rôle est de :
 *    - Empêcher l’envoi normal du formulaire (rechargement de la page)
 *    - Vérifier si les identifiants (username + password) correspondent
 *    - Connecter l’utilisateur si tout est correct
 *    - Sinon, afficher un message d’erreur
 *************************************************************/





/*************************************************************
 * 🔴 Fonction de déconnexion utilisateur
 * → Cette fonction est appelée quand l’utilisateur clique
 *   sur le bouton "Déconnexion".
 * → Son rôle est de :
 *    - Supprimer l’utilisateur actuellement connecté
 *    - Sauvegarder cet état (aucun utilisateur connecté)
 *    - Réinitialiser le formulaire de connexion (vider login + mot de passe)
 *    - Afficher la page de connexion
 *    - Montrer un message confirmant la déconnexion
 *************************************************************/

// Déclaration de la fonction handleLogout (aucun paramètre car elle est appelée directement au clic)
function handleLogout() {

  // Supprime l’utilisateur actuellement connecté en mettant "currentUser" à null
  // (null = aucun utilisateur connecté)
  window.appData.currentUser = null;

  // Sauvegarde immédiatement cette nouvelle donnée (donc : personne n’est connecté)
  saveAppData();

  // Vide le champ "Identifiant" du formulaire de connexion
  document.getElementById("username").value = "";

  // Vide aussi le champ "Mot de passe"
  document.getElementById("password").value = "";

  // Affiche de nouveau la page de connexion (l’utilisateur est renvoyé vers l’écran de login)
  showLoginPage();

  // Affiche un message visuel (alerte) confirmant la déconnexion
  // Paramètres : (message, type d’alerte, activer le son ?)
  showAlert("Déconnexion réussie", "info", true);
}
/*************************************************************
 * 🔴 Fonction de déconnexion utilisateur
 * → Cette fonction est appelée quand l’utilisateur clique
 *   sur le bouton "Déconnexion".
 * → Son rôle est de :
 *    - Supprimer l’utilisateur actuellement connecté
 *    - Sauvegarder cet état (aucun utilisateur connecté)
 *    - Réinitialiser le formulaire de connexion (vider login + mot de passe)
 *    - Afficher la page de connexion
 *    - Montrer un message confirmant la déconnexion
 *************************************************************/




/*************************************************************
 * 🟢 Fonction : showLoginPage
 * → Cette fonction a pour rôle d’afficher la page de connexion
 *   et de masquer l’application principale.
 * → En clair : elle est utilisée quand l’utilisateur n’est
 *   pas connecté ou vient de se déconnecter.
 *************************************************************/

// Déclaration de la fonction showLoginPage (aucun paramètre nécessaire)
function showLoginPage() {

  // On sélectionne l’élément HTML ayant l’ID "loginPage"
  // et on supprime la classe CSS "hidden".
  // → Résultat : la page de connexion redevient visible.
  document.getElementById("loginPage").classList.remove("hidden");

  // On sélectionne l’élément HTML ayant l’ID "mainApp"
  // et on lui ajoute la classe CSS "hidden".
  // → Résultat : l’interface principale de l’application est cachée.
  document.getElementById("mainApp").classList.add("hidden");
}
/*************************************************************
 * 🟢 Fonction : showLoginPage
 * → Cette fonction a pour rôle d’afficher la page de connexion
 *   et de masquer l’application principale.
 * → En clair : elle est utilisée quand l’utilisateur n’est
 *   pas connecté ou vient de se déconnecter.
 *************************************************************/




/*************************************************************
 * 🟢 Fonction : showMainApp
 * → Cette fonction a pour rôle d’afficher l’interface principale
 *   de l’application une fois que l’utilisateur est connecté.
 * → En parallèle, elle masque la page de connexion et affiche
 *   certaines informations dynamiques (comme le nom de l’utilisateur).
 *************************************************************/

// Déclaration de la fonction showMainApp (aucun paramètre nécessaire)
function showMainApp() {

  // On sélectionne l’élément HTML ayant l’ID "loginPage"
  // et on ajoute la classe CSS "hidden".
  // → Résultat : la page de connexion est cachée.
  document.getElementById("loginPage").classList.add("hidden");

  // On sélectionne l’élément HTML ayant l’ID "mainApp"
  // et on supprime la classe CSS "hidden".
  // → Résultat : l’application principale devient visible.
  document.getElementById("mainApp").classList.remove("hidden");

  // On sélectionne l’élément HTML ayant l’ID "currentUser".
  // On met à jour son contenu texte avec le nom d’utilisateur
  // actuellement connecté, récupéré dans window.appData.currentUser.username.
  // → Exemple : si l’utilisateur connecté est "admin",
  //    le texte affiché sera "admin".
  document.getElementById("currentUser").textContent = window.appData.currentUser.username;

  // On sélectionne le bouton ayant l’ID "adminBtn".
  // On modifie son style CSS (display) :
  //   - Si le rôle de l’utilisateur est "admin", le bouton est visible ("inline-block").
  //   - Sinon, si le rôle est "user", le bouton reste caché ("none").
  // → Cela garantit que seul un administrateur voit ce bouton spécial.
  document.getElementById("adminBtn").style.display = 
    window.appData.currentUser.role === "admin" ? "inline-block" : "none";

  // On appelle la fonction showDashboard()
  // → Cela permet de charger et d’afficher le tableau de bord
  //   (statistiques, liste de produits, etc.) dès que l’utilisateur
  //   est correctement connecté.
  showDashboard();
}
/*************************************************************
 * 🟢 Fonction : showMainApp
 * → Cette fonction a pour rôle d’afficher l’interface principale
 *   de l’application une fois que l’utilisateur est connecté.
 * → En parallèle, elle masque la page de connexion et affiche
 *   certaines informations dynamiques (comme le nom de l’utilisateur).
 *************************************************************/




/*************************************************************
 * 🟢 Fonction : showDashboard
 * → Cette fonction sert à afficher le tableau de bord principal
 *   de l’application (les statistiques, la liste des produits, etc.)
 *   et à masquer la page d’administration si elle était visible.
 * → Elle met aussi à jour les données affichées sur le tableau de bord.
 *************************************************************/

// Déclaration de la fonction showDashboard (aucun paramètre nécessaire)
function showDashboard() {

  // On sélectionne l’élément HTML ayant l’ID "dashboardPage".
  // On supprime la classe CSS "hidden".
  // → Résultat : la section du tableau de bord devient visible à l’écran.
  document.getElementById("dashboardPage").classList.remove("hidden");

  // On sélectionne l’élément HTML ayant l’ID "adminPage".
  // On ajoute la classe CSS "hidden".
  // → Résultat : la page d’administration (gestion des utilisateurs)
  //   est cachée pour laisser place uniquement au tableau de bord.
  document.getElementById("adminPage").classList.add("hidden");

  // On appelle la fonction updateDashboard().
  // → Cette fonction va recalculer et réafficher toutes les informations
  //   importantes du tableau de bord : 
  //      - nombre total de produits,
  //      - quantité totale en stock,
  //      - nombre de produits en rupture,
  //      - et la mise à jour de la liste des produits affichés.
  updateDashboard();
}
/*************************************************************
 * 🟢 Fonction : showDashboard
 * → Cette fonction sert à afficher le tableau de bord principal
 *   de l’application (les statistiques, la liste des produits, etc.)
 *   et à masquer la page d’administration si elle était visible.
 * → Elle met aussi à jour les données affichées sur le tableau de bord.
 *************************************************************/




/*************************************************************
 * 🔴 Fonction : showAdminPage
 * → Cette fonction sert à afficher la page d’administration 
 *   (gestion des utilisateurs).
 * → Elle vérifie d’abord si l’utilisateur connecté est bien 
 *   un administrateur, sinon l’accès est refusé.
 *************************************************************/

// Déclaration de la fonction showAdminPage (aucun paramètre)
function showAdminPage() {

  // Vérifie si l’utilisateur actuellement connecté n’est PAS un administrateur.
  // On regarde la propriété "role" de l’utilisateur courant stocké dans window.appData.
  // Si ce rôle est différent de "admin" → alors l’accès doit être bloqué.
  if (window.appData.currentUser.role !== "admin") {

    // Si ce n’est pas un admin, on appelle la fonction showAlert().
    // Cette fonction affiche un message d’alerte à l’écran.
    // Ici le message est : "Accès refusé - Droits administrateur requis".
    // Le type "danger" indique une alerte rouge ⚠️.
    // Le paramètre "true" sert à déclencher aussi un son d’alerte.
    showAlert("Accès refusé - Droits administrateur requis", "danger", true);

    // On arrête l’exécution de la fonction immédiatement avec "return".
    // Résultat : le reste du code n’est pas exécuté si l’utilisateur n’est pas admin.
    return;
  }

  // Si on est bien un administrateur, alors on cache le tableau de bord.
  // Pour cela, on ajoute la classe CSS "hidden" à l’élément ayant l’ID "dashboardPage".
  document.getElementById("dashboardPage").classList.add("hidden");

  // Ensuite, on rend visible la page d’administration.
  // Pour cela, on enlève la classe CSS "hidden" à l’élément ayant l’ID "adminPage".
  document.getElementById("adminPage").classList.remove("hidden");

  // Enfin, on appelle la fonction loadAdminData().
  // Cette fonction va charger et afficher la liste des utilisateurs existants
  // dans le tableau de la page d’administration.
  loadAdminData();
}
/*************************************************************
 * 🔴 Fonction : showAdminPage
 * → Cette fonction sert à afficher la page d’administration 
 *   (gestion des utilisateurs).
 * → Elle vérifie d’abord si l’utilisateur connecté est bien 
 *   un administrateur, sinon l’accès est refusé.
 *************************************************************/




/*************************************************************
 * 🎨 Objet categoryColors
 * → Cet objet sert à associer chaque catégorie de produit 
 *   (Électronique, Alimentaire, Vêtements, etc.)
 *   à une couleur particulière en utilisant les classes Bootstrap.
 * → Ces classes définissent l'apparence visuelle (couleur, texte).
 *************************************************************/

// Déclaration d’une constante appelée "categoryColors"
// Une constante (const) signifie que la variable ne pourra pas être réassignée,
// mais on peut toujours modifier son contenu interne si c’est un objet.
const categoryColors = {

  // Pour la catégorie "Électronique" :
  // On associe la classe Bootstrap "bg-primary" (fond bleu).
  "Électronique": "bg-primary",

  // Pour la catégorie "Alimentaire" :
  // On associe la classe "bg-success" (fond vert).
  "Alimentaire": "bg-success",

  // Pour la catégorie "Vêtements" :
  // On associe deux classes Bootstrap : "bg-warning" (fond jaune)
  // et "text-dark" (texte en noir pour rester lisible).
  "Vêtements": "bg-warning text-dark",

  // Pour la catégorie "Meubles" :
  // On associe "bg-info" (fond bleu clair) et "text-dark" (texte noir).
  "Meubles": "bg-info text-dark",

  // Pour la catégorie "Autre" :
  // On associe "bg-secondary" (fond gris).
  "Autre": "bg-secondary"
};
/*************************************************************
 * 🎨 Objet categoryColors
 * → Cet objet sert à associer chaque catégorie de produit 
 *   (Électronique, Alimentaire, Vêtements, etc.)
 *   à une couleur particulière en utilisant les classes Bootstrap.
 * → Ces classes définissent l'apparence visuelle (couleur, texte).
 *************************************************************/



/*************************************************************
 * 📊 Fonction updateDashboard
 * → Cette fonction met à jour le tableau de bord et la liste
 *   des produits affichés dans l’application.
 * → Elle compte les produits, les quantités, détecte les stocks bas
 *   et construit le tableau HTML des produits.
 *************************************************************/

// Déclaration de la fonction "updateDashboard"
function updateDashboard() {

  // On récupère tous les produits enregistrés dans l'application
  // Ils sont stockés dans "window.appData.products"
  const prods = window.appData.products;

  // On met à jour le nombre total de produits dans l’élément HTML
  // dont l’id est "totalProducts"
  document.getElementById("totalProducts").textContent = prods.length;

  // On calcule la quantité totale de tous les produits
  // avec la méthode reduce (on additionne les "quantity")
  // et on affiche ce résultat dans l’élément HTML avec l’id "totalQuantity"
  document.getElementById("totalQuantity").textContent = prods.reduce((a, p) => a + p.quantity, 0);
  
  // On filtre uniquement les produits qui ont une quantité
  // inférieure ou égale à 5 (donc en stock bas).
  const lowStockProducts = prods.filter(p => p.quantity <= 5);

  // On met à jour l’élément HTML "lowStock" avec le nombre
  // de produits qui ont un stock faible
  document.getElementById("lowStock").textContent = lowStockProducts.length;

  // Si au moins un produit est en stock bas (lowStockProducts > 0)
  if (lowStockProducts.length > 0) {
    // On récupère les noms et quantités de ces produits
    // Exemple : "Shampooing (2)", "Ciseaux (1)"
    const productNames = lowStockProducts.map(p => `"${p.name}" (${p.quantity})`).join(", ");
    
    // On appelle la fonction showAlert pour afficher
    // une alerte ⚠️ groupée listant tous les produits en stock bas
    showAlert(`⚠️ Stock bas détecté pour ${lowStockProducts.length} produit(s): ${productNames}`, "warning", true);
  }

  // On sélectionne le corps du tableau HTML (<tbody>) qui affiche les produits
  const tbody = document.getElementById("productsTable");

  // Si aucun produit n’existe (liste vide)
  if (prods.length === 0) {
    // On affiche un message "Aucun produit" centré
    // colspan='7' permet de fusionner 7 colonnes
    tbody.innerHTML = "<tr><td colspan='7' class='text-center text-muted'>Aucun produit</td></tr>";
    return; // On sort de la fonction
  }

  // Sinon, on construit dynamiquement le tableau HTML avec tous les produits
  tbody.innerHTML = prods.map(p => 
    "<tr>" +
      // Colonne ID
      "<td>" + p.id + "</td>" +
      // Colonne Nom du produit
      "<td>" + p.name + "</td>" +
      // Colonne Quantité avec badge (rouge si <=5, vert sinon)
      "<td><span class='badge badge-stock " + (p.quantity <= 5 ? "bg-danger" : "bg-success") + "'>" + p.quantity + "</span></td>" +
      // Colonne Prix (formaté en 2 décimales avec "€")
      "<td>" + p.price.toFixed(2) + " €</td>" +
      // Colonne Catégorie (couleur choisie selon categoryColors)
      "<td><span class='badge " + (categoryColors[p.category] || "bg-light text-dark") + "'>" + p.category + "</span></td>" +
      // Colonne Statut (Stock Bas ou En Stock)
      "<td><span class='badge " + (p.quantity <= 5 ? "bg-warning text-dark" : "bg-success") + "'>" + (p.quantity <= 5 ? "Stock Bas" : "En Stock") + "</span></td>" +
      // Colonne Actions (boutons Modifier et Supprimer)
      "<td>" +
        // Bouton Modifier avec icône ✏️ (fa-edit)
        "<button class='btn btn-sm btn-primary me-1' onclick='editProduct(" + p.id + ")'><i class='fas fa-edit'></i></button>" +
        // Bouton Supprimer avec icône 🗑️ (fa-trash)
        "<button class='btn btn-sm btn-danger' onclick='deleteProduct(" + p.id + ")'><i class='fas fa-trash'></i></button>" +
      "</td>" +
    "</tr>"
  ).join(""); // join("") colle toutes les lignes ensemble pour remplir le tableau
}
/*************************************************************
 * 📊 Fonction updateDashboard
 * → Cette fonction met à jour le tableau de bord et la liste
 *   des produits affichés dans l’application.
 * → Elle compte les produits, les quantités, détecte les stocks bas
 *   et construit le tableau HTML des produits.
 *************************************************************/



/*************************************************************
 * 💾 Fonction saveProduct
 * → Cette fonction enregistre un produit (ajout ou modification).
 * → Elle lit les données saisies dans le formulaire,
 *   vérifie leur validité, et met à jour la liste des produits.
 *************************************************************/

function saveProduct() {

  // Récupère l'ID du produit (caché dans le formulaire).
  // Si on modifie un produit existant, l'ID est rempli.
  // Si on ajoute un nouveau produit, l'ID est vide.
  const id = document.getElementById("productId").value;

  // Récupère le nom du produit écrit dans le champ "Nom".
  const name = document.getElementById("productName").value;

  // Récupère la quantité saisie dans le champ "Quantité"
  // et convertit la valeur en entier avec parseInt.
  const q = parseInt(document.getElementById("productQuantity").value);

  // Récupère le prix saisi dans le champ "Prix"
  // et convertit la valeur en nombre décimal avec parseFloat.
  const price = parseFloat(document.getElementById("productPrice").value);

  // Récupère la catégorie sélectionnée dans le menu déroulant.
  const cat = document.getElementById("productCategory").value;
  
  // Vérifie si les champs sont valides :
  // - Le nom ne doit pas être vide (!name)
  // - La quantité doit être un nombre valide (isNaN(q) = faux)
  // - Le prix doit être un nombre valide (isNaN(price) = faux)
  if (!name || isNaN(q) || isNaN(price)) {
    // Si une erreur est détectée → affiche une alerte rouge (danger)
    showAlert("Champs invalides", "danger", true);
    return; // Stoppe la fonction sans enregistrer
  }
  
  // Si on est en mode "modification" (id existe déjà)
  if (id) {
    // On cherche la position (index) du produit dans la liste
    // en comparant les ID existants avec l'ID du formulaire
    const i = window.appData.products.findIndex(p => p.id == id);

    // On remplace les anciennes données du produit par les nouvelles
    window.appData.products[i] = {
      id: parseInt(id),   // ID converti en nombre entier
      name: name,         // Nom du produit
      quantity: q,        // Quantité
      price: price,       // Prix
      category: cat       // Catégorie
    };

  } else {
    // Sinon (si aucun ID → nouveau produit)
    // On crée un nouvel ID unique :
    // - Si la liste n’est pas vide → prend le plus grand ID existant + 1
    // - Si la liste est vide → commence à 1
    const nid = window.appData.products.length
      ? Math.max(...window.appData.products.map(p => p.id)) + 1
      : 1;

    // On ajoute ce nouveau produit dans le tableau "products"
    window.appData.products.push({
      id: nid,       // Nouvel identifiant unique
      name: name,    // Nom
      quantity: q,   // Quantité
      price: price,  // Prix
      category: cat  // Catégorie
    });
  }
  
  // Sauvegarde les données dans le stockage local du navigateur
  saveAppData();

  // Ferme la fenêtre modale du formulaire
  productModal.hide();

  // Met à jour le tableau de bord et la liste des produits
  updateDashboard();

  // Affiche une alerte verte (success) pour confirmer
  showAlert("Produit enregistré", "success", true);
}
/*************************************************************
 * 💾 Fonction saveProduct
 * → Cette fonction enregistre un produit (ajout ou modification).
 * → Elle lit les données saisies dans le formulaire,
 *   vérifie leur validité, et met à jour la liste des produits.
 *************************************************************/




/*************************************************************
 * ✏️ Fonction editProduct
 * → Cette fonction permet d'éditer (modifier) un produit existant.
 * → Elle remplit automatiquement le formulaire avec les infos
 *   du produit choisi pour que l'utilisateur puisse les changer.
 *************************************************************/

function editProduct(id) {
  
  // Recherche dans la liste des produits (window.appData.products)
  // celui dont l'ID correspond à celui passé en paramètre.
  // → "find" parcourt le tableau et renvoie le 1er élément qui correspond.
  const p = window.appData.products.find(p => p.id == id);

  // Remplit le champ caché "productId" avec l'ID du produit trouvé.
  // Cela permet de savoir qu'on est en mode "modification" et pas en "ajout".
  document.getElementById("productId").value = p.id;

  // Remplit le champ du formulaire pour le nom du produit
  // avec la valeur existante (ex: "Shampooing").
  document.getElementById("productName").value = p.name;

  // Remplit le champ du formulaire pour la quantité
  // avec la valeur enregistrée (ex: 12).
  document.getElementById("productQuantity").value = p.quantity;

  // Remplit le champ du formulaire pour le prix
  // avec la valeur enregistrée (ex: 9.99).
  document.getElementById("productPrice").value = p.price;

  // Remplit le champ du formulaire pour la catégorie
  // (menu déroulant) avec la catégorie du produit (ex: "Cosmétiques").
  document.getElementById("productCategory").value = p.category;

  // Enfin, on affiche la fenêtre modale (le formulaire) pour permettre
  // à l’utilisateur de voir et modifier les informations.
  productModal.show();
}
/*************************************************************
 * ✏️ Fonction editProduct
 * → Cette fonction permet d'éditer (modifier) un produit existant.
 * → Elle remplit automatiquement le formulaire avec les infos
 *   du produit choisi pour que l'utilisateur puisse les changer.
 *************************************************************/




/*************************************************************
 * 🗑️ Fonction deleteProduct
 * → Cette fonction permet de supprimer un produit de la liste.
 * → Elle demande d’abord une confirmation à l’utilisateur avant
 *   d’effacer définitivement le produit choisi.
 *************************************************************/

function deleteProduct(id) {
  
  // On cherche dans la liste des produits (window.appData.products)
  // le produit qui a l'ID correspondant à celui passé en paramètre.
  // → "find" retourne l'objet produit (par ex: {id:2, name:"Gel coiffant", ...}).
  const product = window.appData.products.find(p => p.id == id);

  // On demande à l'utilisateur une confirmation avant la suppression.
  // La fonction "confirm" affiche une boîte avec "OK" et "Annuler".
  // → Si l’utilisateur clique sur "OK", confirmDelete = true.
  // → Si l’utilisateur clique sur "Annuler", confirmDelete = false.
  const confirmDelete = confirm(`Voulez-vous vraiment supprimer le produit "${product.name}" ?`);

  // Si l’utilisateur a cliqué sur "Annuler" (confirmDelete = false) :
  // - On affiche une alerte "Suppression annulée".
  // - On arrête la fonction avec "return".
  if (!confirmDelete) {
    showAlert("Suppression annulée", "warning", true);
    return;
  }

  // Sinon (l’utilisateur a confirmé) :
  // On met à jour la liste des produits en retirant celui qui a l’ID à supprimer.
  // → "filter" garde seulement les produits dont l'ID est différent.
  window.appData.products = window.appData.products.filter(p => p.id != id);

  // On sauvegarde les données modifiées dans le stockage local (localStorage).
  saveAppData();

  // On recharge l’affichage du tableau de bord avec la liste mise à jour.
  updateDashboard();

  // On affiche un message visuel d'information confirmant la suppression.
  // Exemple : Produit "Gel coiffant" supprimé
  showAlert(`Produit "${product.name}" supprimé`, "info", true);
}
/*************************************************************
 * 🗑️ Fonction deleteProduct
 * → Cette fonction permet de supprimer un produit de la liste.
 * → Elle demande d’abord une confirmation à l’utilisateur avant
 *   d’effacer définitivement le produit choisi.
 *************************************************************/




/*************************************************************
 * 📤 Fonction exportToCSV
 * → Cette fonction permet d’exporter la liste des produits
 *   au format CSV (fichier lisible par Excel).
 *************************************************************/

function exportToCSV() {

  // Vérifie si la liste des produits est vide.
  // window.appData.products.length === 0 signifie qu'il n’y a aucun produit.
  // Si c’est le cas → on affiche une alerte et on arrête la fonction.
  if (window.appData.products.length === 0) {
    showAlert("Aucun produit à exporter", "warning", true);
    return;
  }

  // On définit l’en-tête (les titres des colonnes) du fichier CSV.
  // Chaque élément du tableau correspond à une colonne : ID, Nom, etc.
  const headers = ["ID", "Nom", "Quantité", "Prix", "Catégorie", "Statut"];

  // On construit les lignes de données à partir de chaque produit.
  // map() parcourt chaque produit et crée un tableau de valeurs.
  const rows = window.appData.products.map(p => {
    // On calcule le statut en fonction de la quantité :
    // - Si quantité < 5 → "Stock Bas"
    // - Sinon → "En Stock"
    const statut = p.quantity < 5 ? "Stock Bas" : "En Stock";

    // On retourne un tableau avec toutes les infos du produit.
    // Les textes sont entourés de guillemets (") pour éviter les erreurs.
    return [p.id, '"' + p.name + '"', p.quantity, p.price.toFixed(2), '"' + p.category + '"', '"' + statut + '"'];
  });

  // On assemble toutes les lignes pour créer un texte CSV.
  // headers.join(";") → crée la ligne des titres séparés par ";"
  // rows.map(...).join(";") → crée toutes les lignes des produits
  // .join("\n") → met chaque ligne à la suite sur une nouvelle ligne.
  const csv = [headers.join(";")].concat(rows.map(r => r.join(";"))).join("\n");

  // On crée un objet spécial appelé "Blob" contenant le texte du CSV.
  // "\uFEFF" → ajout d’un caractère spécial pour bien gérer les accents.
  // type: "text/csv;charset=utf-8;" → indique que c’est un fichier CSV en UTF-8.
  const blob = new Blob(["\uFEFF" + csv], {type: "text/csv;charset=utf-8;"});

  // On crée un lien (élément <a>) invisible qui va servir à télécharger le fichier.
  const link = document.createElement("a");

  // On génère un horodatage (date + heure) pour nommer le fichier.
  const now = new Date();
  const ts = now.toLocaleDateString("fr-FR").replace(/\//g, "-") + "_" + now.toLocaleTimeString("fr-FR").replace(/:/g, "-");

  // On associe le contenu du fichier CSV au lien de téléchargement.
  link.href = URL.createObjectURL(blob);

  // On définit le nom du fichier qui sera téléchargé (ex: stock_export_01-02-2025_15-45-30.csv).
  link.download = "stock_export_" + ts + ".csv";

  // On "simule" un clic automatique sur le lien pour lancer le téléchargement.
  link.click();

  // Enfin, on affiche une alerte pour dire que l’export s’est bien passé.
  showAlert("Export CSV réussi", "success", true);
}
/*************************************************************
 * 📤 Fonction exportToCSV
 * → Cette fonction permet d’exporter la liste des produits
 *   au format CSV (fichier lisible par Excel).
 *************************************************************/






/*************************************************************
 * 👥 Fonction loadAdminData
 * → Cette fonction sert à afficher la liste des utilisateurs
 *   dans le tableau de la page "Administration".
 *************************************************************/

function loadAdminData() {

  // Affiche dans la console tous les utilisateurs chargés depuis appData.
  // Cela permet de vérifier que les données sont bien présentes.
  console.log("Chargement des utilisateurs:", window.appData.users);

  // Sélectionne dans la page l’élément <tbody> du tableau qui affiche les utilisateurs.
  // Cet élément a l’ID "usersTable".
  const tbody = document.getElementById("usersTable");
  
  // Vérifie si la liste des utilisateurs n’existe pas OU est vide.
  // (!window.appData.users) → signifie qu’il n’y a pas de tableau users.
  // (window.appData.users.length === 0) → signifie que le tableau existe mais ne contient aucun utilisateur.
  if (!window.appData.users || window.appData.users.length === 0) {
    // Si c’est le cas → on affiche une seule ligne "Aucun utilisateur" dans le tableau.
    // colspan='4' → la cellule occupe 4 colonnes pour être bien centrée.
    tbody.innerHTML = "<tr><td colspan='4' class='text-center text-muted'>Aucun utilisateur</td></tr>";
    return; // On arrête la fonction ici.
  }
  
  // Si des utilisateurs existent → on commence à construire le HTML qui affichera chaque utilisateur.
  let html = "";

  // Boucle for → parcourt tous les utilisateurs du tableau "users".
  // i = index (position de l’utilisateur dans le tableau).
  for (let i = 0; i < window.appData.users.length; i++) {

    // On récupère l’utilisateur actuel (celui de la position i).
    const u = window.appData.users[i];

    // Détermine le texte du rôle en fonction de la valeur de u.role.
    // Si rôle = "admin" → "Administrateur", sinon → "Utilisateur".
    const roleText = u.role === "admin" ? "Administrateur" : "Utilisateur";

    // Choisit la couleur du badge en fonction du rôle.
    // "bg-danger" (rouge) pour admin, "bg-primary" (bleu) pour utilisateur.
    const roleBadge = u.role === "admin" ? "bg-danger" : "bg-primary";

    // Définit la couleur du badge de statut en fonction de u.status.
    // Si statut = "Actif" → badge vert, sinon → badge gris.
    const statusBadge = u.status === "Actif" ? "bg-success" : "bg-secondary";

    // Choisit la couleur du bouton "Activer/Désactiver".
    // Si Actif → bouton jaune (warning), sinon → bouton vert (success).
    const toggleBtnClass = u.status === "Actif" ? "btn-warning" : "btn-success";

    // Choisit l’icône du bouton.
    // Si Actif → icône "fa-ban" (interdiction), sinon → icône "fa-check".
    const toggleIcon = u.status === "Actif" ? "fa-ban" : "fa-check";

    // Choisit le texte du bouton.
    // Si Actif → "Désactiver", sinon → "Activer".
    const toggleText = u.status === "Actif" ? "Désactiver" : "Activer";
    
    // Maintenant, on construit la ligne HTML du tableau (<tr>) pour cet utilisateur.

    // Ouvre une nouvelle ligne dans le tableau.
    html += "<tr>";

    // Première cellule : le nom d’utilisateur avec une petite icône devant.
    html += "<td><i class='fas fa-user me-2'></i>" + u.username + "</td>";

    // Deuxième cellule : le rôle (avec un badge coloré).
    html += "<td><span class='badge " + roleBadge + "'>" + roleText + "</span></td>";

    // Troisième cellule : le statut (Actif/Inactif avec un badge).
    html += "<td><span class='badge " + statusBadge + "'>" + u.status + "</span></td>";

    // Quatrième cellule : les actions possibles (activer/désactiver + supprimer).
    html += "<td>";

    // Bouton Activer/Désactiver avec son icône et son texte.
    // onclick appelle la fonction toggleUserStatus(i) avec l’index de l’utilisateur.
    html += "<button class='btn btn-sm " + toggleBtnClass + " me-1' onclick='toggleUserStatus(" + i + ")'>";
    html += "<i class='fas " + toggleIcon + "'></i> " + toggleText;
    html += "</button>";

    // Bouton Supprimer avec icône de poubelle.
    // onclick appelle la fonction deleteUser(i).
    html += "<button class='btn btn-sm btn-danger' onclick='deleteUser(" + i + ")'>";
    html += "<i class='fas fa-trash'></i> Supprimer";
    html += "</button>";

    // Ferme la cellule des actions.
    html += "</td>";

    // Ferme la ligne du tableau.
    html += "</tr>";
  }
  
  // Enfin, on injecte tout le HTML construit dans le tableau des utilisateurs.
  tbody.innerHTML = html;
}
/*************************************************************
 * 👥 Fonction loadAdminData
 * → Cette fonction sert à afficher la liste des utilisateurs
 *   dans le tableau de la page "Administration".
 *************************************************************/






/*************************************************************
 * 🔄 Fonction toggleUserStatus
 * → Cette fonction permet de changer le statut d’un utilisateur
 *   (passer de "Actif" à "Inactif" ou inversement).
 * 
 * Paramètre :
 *   - i : c’est la position (index) de l’utilisateur dans
 *         le tableau window.appData.users.
 *************************************************************/

function toggleUserStatus(i) {

  // On récupère l’utilisateur qui se trouve à la position "i"
  // dans le tableau des utilisateurs (window.appData.users).
  const user = window.appData.users[i];

  // Vérifie si l’utilisateur sélectionné est l’utilisateur actuellement connecté.
  // → On ne veut pas qu’un utilisateur puisse désactiver son propre compte.
  if (user.username === window.appData.currentUser.username) {
    // Si c’est le cas, on affiche un message d’alerte (warning).
    // "Vous ne pouvez pas modifier votre propre statut"
    showAlert("Vous ne pouvez pas modifier votre propre statut", "warning", true);

    // Et on arrête immédiatement la fonction (return).
    return;
  }
  
  // Si l’utilisateur n’est PAS celui actuellement connecté :
  // On change son statut :
  // - Si son statut est "Actif", il devient "Inactif".
  // - Si son statut est "Inactif", il devient "Actif".
  window.appData.users[i].status = window.appData.users[i].status === "Actif" ? "Inactif" : "Actif";

  // On sauvegarde les données mises à jour dans le stockage local (localStorage).
  saveAppData();

  // On recharge la liste des utilisateurs pour refléter le changement dans le tableau.
  loadAdminData();

  // Enfin, on affiche un message de succès à l’écran pour confirmer le changement.
  showAlert("Statut de l'utilisateur mis à jour", "success", true);
}
/*************************************************************
 * 🔄 Fonction toggleUserStatus
 * → Cette fonction permet de changer le statut d’un utilisateur
 *   (passer de "Actif" à "Inactif" ou inversement).
 * 
 * Paramètre :
 *   - i : c’est la position (index) de l’utilisateur dans
 *         le tableau window.appData.users.
 *************************************************************/





/*************************************************************
 * ❌ Fonction deleteUser
 * → Cette fonction permet de supprimer un utilisateur du système.
 * 
 * Paramètre :
 *   - i : c’est la position (index) de l’utilisateur dans
 *         le tableau window.appData.users.
 *************************************************************/

function deleteUser(i) {

  // On récupère l’utilisateur qui se trouve à la position "i"
  // dans le tableau window.appData.users.
  const user = window.appData.users[i];

  // Vérifie si l’utilisateur que l’on veut supprimer
  // est le même que l’utilisateur actuellement connecté.
  // → On ne veut pas qu’un utilisateur puisse supprimer son propre compte.
  if (user.username === window.appData.currentUser.username) {
    // Si c’est le cas, on affiche un message d’alerte (danger).
    // "Vous ne pouvez pas supprimer votre propre compte"
    showAlert("Vous ne pouvez pas supprimer votre propre compte", "danger", true);

    // Et on arrête immédiatement la fonction (return).
    return;
  }
  
  // Si l’utilisateur n’est pas celui actuellement connecté :
  // On affiche une boîte de confirmation avec un message.
  // L’utilisateur doit cliquer sur "OK" ou "Annuler".
  if (confirm("Êtes-vous sûr de vouloir supprimer l'utilisateur \"" + user.username + "\" ?")) {

    // Si l’administrateur a cliqué sur "OK" :
    // On supprime l’utilisateur du tableau des utilisateurs.
    // La méthode .splice(i, 1) enlève 1 élément à la position i.
    window.appData.users.splice(i, 1);

    // On sauvegarde les nouvelles données mises à jour (sans cet utilisateur).
    saveAppData();

    // On recharge la liste des utilisateurs pour afficher les changements.
    loadAdminData();

    // On affiche un message d’information confirmant la suppression.
    showAlert("Utilisateur supprimé", "info", true);
  }
}
/*************************************************************
 * ❌ Fonction deleteUser
 * → Cette fonction permet de supprimer un utilisateur du système.
 * 
 * Paramètre :
 *   - i : c’est la position (index) de l’utilisateur dans
 *         le tableau window.appData.users.
 *************************************************************/




/*************************************************************
 * 👤 Fonction saveUser
 * → Cette fonction permet d’ajouter un nouvel utilisateur
 *   dans la liste des utilisateurs du système.
 *************************************************************/

function saveUser() {

  // On récupère la valeur entrée dans le champ texte "newUsername".
  // La méthode .trim() enlève les espaces avant et après le texte.
  const u = document.getElementById("newUsername").value.trim();

  // On récupère la valeur entrée dans le champ "newPassword".
  const p = document.getElementById("newPassword").value;

  // On récupère la valeur sélectionnée dans la liste déroulante "newRole".
  // Exemple : "admin" ou "user".
  const r = document.getElementById("newRole").value;
  
  // Vérification : si l’un des champs (nom ou mot de passe) est vide...
  if (!u || !p) {
    // On affiche un message d’erreur (alerte danger).
    showAlert("Tous les champs sont obligatoires", "danger", true);

    // Et on arrête immédiatement la fonction.
    return;
  }
  
  // Vérification : on regarde si le nom d’utilisateur existe déjà.
  // La méthode .find() cherche un utilisateur qui a le même username.
  if (window.appData.users.find(x => x.username === u)) {
    // Si le nom existe déjà, on affiche un message d’avertissement.
    showAlert("Ce nom d'utilisateur existe déjà", "warning", true);

    // Et on arrête la fonction (l’utilisateur n’est pas ajouté).
    return;
  }
  
  // Si toutes les conditions sont respectées :
  // On ajoute un nouvel utilisateur dans le tableau des utilisateurs.
  // Avec son nom, mot de passe, rôle, et son statut "Actif".
  window.appData.users.push({username: u, password: p, role: r, status: "Actif"});

  // On sauvegarde les nouvelles données mises à jour.
  saveAppData();

  // On recharge la liste des utilisateurs pour afficher ce nouveau compte.
  loadAdminData();

  // On ferme la fenêtre modale (popup) du formulaire d’ajout.
  userModal.hide();

  // On réinitialise le formulaire pour le vider (nom, mot de passe, rôle).
  document.getElementById("userForm").reset();

  // Enfin, on affiche un message de succès confirmant la création.
  showAlert("Utilisateur créé avec succès", "success", true);
}
/*************************************************************
 * 👤 Fonction saveUser
 * → Cette fonction permet d’ajouter un nouvel utilisateur
 *   dans la liste des utilisateurs du système.
 *************************************************************/





/*************************************************************
 * 💾 Fonction exportJSON
 * → Cette fonction sert à exporter toutes les données
 *   (produits + utilisateurs) dans un fichier JSON téléchargeable.
 *   Elle ajoute aussi des informations sur l’état du stock.
 *************************************************************/

function exportJSON() {

  // On crée un nouvel objet enrichi basé sur window.appData
  // → On garde toutes les données existantes avec "...window.appData"
  // → Mais on modifie la partie "products" pour y ajouter l’état du stock.
  const enrichedData = {
    ...window.appData,

    // On parcourt tous les produits avec .map() pour créer une nouvelle liste
    products: window.appData.products.map(p => {

      // Déclaration d’une variable qui contiendra l’état du stock
      let etatStock;

      // Si la quantité est exactement 0 → le produit est en rupture
      if (p.quantity === 0) {
        etatStock = "Rupture";

      // Si la quantité est comprise entre 1 et 5 → stock critique
      } else if (p.quantity <= 5) {
        etatStock = "Critique";

      // Si la quantité est entre 6 et 15 → stock faible
      } else if (p.quantity <= 15) {
        etatStock = "Faible";

      // Si la quantité est entre 16 et 50 → stock normal
      } else if (p.quantity <= 50) {
        etatStock = "Normal";

      // Si la quantité est supérieure à 50 → excellent stock
      } else {
        etatStock = "Excellent";
      }
      
      // On retourne un nouvel objet produit qui contient :
      // - toutes les infos du produit d’origine (...p)
      // - un champ "etatStock" avec le texte calculé ci-dessus
      // - un champ "statut" pour dire "Stock Bas" ou "En Stock"
      return {
        ...p,
        etatStock: etatStock,
        statut: p.quantity <= 5 ? "Stock Bas" : "En Stock"
      };
    })
  };
  
  // On convertit l’objet enrichi en texte JSON bien formaté (indenté avec 2 espaces).
  const dataStr = JSON.stringify(enrichedData, null, 2);

  // On crée un objet "Blob" qui contient ce texte JSON.
  // Un Blob est une "boîte" de données qu’on peut télécharger comme un fichier.
  const blob = new Blob([dataStr], {type: "application/json;charset=utf-8;"});

  // On crée un lien HTML invisible qui servira à déclencher le téléchargement.
  const link = document.createElement("a");

  // On récupère la date et l’heure actuelle.
  const now = new Date();

  // On génère un "timestamp" (horodatage) au format français :
  // Exemple → 02-10-2025_14-35-22
  const ts = now.toLocaleDateString("fr-FR").replace(/\//g, "-") + "_" + 
             now.toLocaleTimeString("fr-FR").replace(/:/g, "-");

  // On donne au lien une URL temporaire qui pointe vers le fichier Blob.
  link.href = URL.createObjectURL(blob);

  // On définit le nom du fichier téléchargé avec la date et l’heure incluses.
  link.download = "sauvegarde_stock_" + ts + ".json";

  // On "simule" un clic sur le lien → cela lance directement le téléchargement.
  link.click();

  // On affiche une alerte de succès pour confirmer que l’export a bien marché.
  showAlert("Export JSON réussi !", "success", true);
}
/*************************************************************
 * 💾 Fonction exportJSON
 * → Cette fonction sert à exporter toutes les données
 *   (produits + utilisateurs) dans un fichier JSON téléchargeable.
 *   Elle ajoute aussi des informations sur l’état du stock.
 *************************************************************/






/*************************************************************
 * 📥 Fonction importJSON
 * → Cette fonction permet d’importer un fichier JSON sauvegardé
 *   précédemment afin de recharger toutes les données (produits,
 *   utilisateurs, etc.) dans l’application.
 *************************************************************/

function importJSON(event) {

  // On récupère le fichier sélectionné par l’utilisateur.
  // "event.target.files[0]" signifie : le premier fichier choisi.
  const file = event.target.files[0];

  // Si aucun fichier n’a été choisi, on arrête la fonction immédiatement.
  if (!file) return;
  
  // On crée un nouvel objet FileReader.
  // FileReader est un outil intégré dans le navigateur pour lire le contenu d’un fichier.
  const reader = new FileReader();

  // Quand le fichier sera complètement lu, cette fonction "onload" sera exécutée.
  reader.onload = function(e) {
    try {
      // On essaye de convertir le contenu du fichier texte en objet JavaScript.
      // JSON.parse() prend une chaîne JSON et la transforme en un vrai objet.
      const importedData = JSON.parse(e.target.result);

      // On vérifie que les données importées contiennent bien deux choses :
      // - une liste de produits
      // - une liste d’utilisateurs
      if (importedData.products && importedData.users) {
        
        // Si c’est correct, on remplace complètement nos données actuelles
        // (window.appData) par celles importées.
        window.appData = importedData;

        // On sauvegarde ces nouvelles données dans le localStorage.
        saveAppData();

        // On met à jour le tableau de bord avec les nouvelles données produits.
        updateDashboard();

        // Si un utilisateur est déjà connecté et qu’il est administrateur,
        // on recharge aussi la partie administration (liste des utilisateurs).
        if (window.appData.currentUser && window.appData.currentUser.role === "admin") {
          loadAdminData();
        }

        // On informe l’utilisateur que l’importation s’est bien déroulée.
        showAlert("Import JSON réussi !", "success", true);

      } else {
        // Si les données importées ne contiennent pas "products" ou "users",
        // on avertit l’utilisateur que le fichier est invalide.
        showAlert("Fichier JSON invalide", "danger", true);
      }
    } catch (err) {
      // Si une erreur survient (par exemple : JSON mal formé),
      // on affiche une alerte pour prévenir l’utilisateur.
      showAlert("Erreur lors de la lecture du fichier", "danger", true);
    }
  };

  // On demande au FileReader de lire le fichier comme du texte (encodé en UTF-8).
  // Dès que la lecture sera finie, le code dans "reader.onload" sera exécuté.
  reader.readAsText(file, "UTF-8");
}
/*************************************************************
 * 📥 Fonction importJSON
 * → Cette fonction permet d’importer un fichier JSON sauvegardé
 *   précédemment afin de recharger toutes les données (produits,
 *   utilisateurs, etc.) dans l’application.
 *************************************************************/





/*************************************************************
 * ⬆️ Fonctionnalité "Retour en haut de page"
 * → Ce code permet d’afficher un bouton qui apparaît uniquement
 *   quand on descend dans la page. En cliquant dessus, on remonte
 *   automatiquement tout en haut avec un effet de défilement fluide.
 *************************************************************/

// On récupère l’élément du bouton "retour en haut" en ciblant son identifiant.
const scrollTopBtn = document.getElementById("scrollTopBtn");

// On ajoute un "écouteur d’événement" sur la fenêtre (window).
// Ici on attend un événement de type "scroll", c’est-à-dire quand
// l’utilisateur fait défiler la page vers le bas ou vers le haut.
window.addEventListener("scroll", function() {

  // On vérifie deux conditions :
  // 1. Est-ce que la page a été défilée de plus de 200 pixels (window.scrollY > 200) ?
  // 2. Est-ce que la partie "dashboardPage" est visible (donc pas cachée) ?
  if (window.scrollY > 200 && !document.getElementById("dashboardPage").classList.contains("hidden")) {
    
    // Si ces deux conditions sont vraies :
    // On ajoute la classe CSS "show" au bouton.
    // Cette classe rend le bouton visible grâce aux styles définis dans le CSS.
    scrollTopBtn.classList.add("show");

  } else {
    // Sinon (si la page est en haut OU si la page Dashboard est masquée) :
    // On retire la classe "show" → le bouton redevient invisible.
    scrollTopBtn.classList.remove("show");
  }
});

// On ajoute un autre "écouteur d’événement" sur le bouton lui-même.
// Ici on attend que l’utilisateur clique sur le bouton.
scrollTopBtn.addEventListener("click", function() {

  // Quand le bouton est cliqué → la page remonte automatiquement tout en haut.
  // window.scrollTo permet de déplacer la vue de la page.
  // {top: 0} → aller tout en haut.
  // behavior: "smooth" → le défilement sera fluide et non instantané.
  window.scrollTo({top: 0, behavior: "smooth"});
});
/*************************************************************
 * ⬆️ Fonctionnalité "Retour en haut de page"
 * → Ce code permet d’afficher un bouton qui apparaît uniquement
 *   quand on descend dans la page. En cliquant dessus, on remonte
 *   automatiquement tout en haut avec un effet de défilement fluide.
 *************************************************************/




/*************************************************************
 * 🔔 Fonction "showAlert"
 * → Cette fonction affiche une alerte temporaire en haut de la page
 *   avec un message, une couleur (succès, erreur, etc.), et éventuellement un son.
 * 
 * Paramètres :
 *   msg  → le texte du message à afficher.
 *   type → le type d’alerte (success, danger, warning, info…).
 *   play → si true, joue un son quand l’alerte apparaît.
 *************************************************************/

function showAlert(msg, type, play) {

  // On crée dynamiquement un nouvel élément <div> dans le document.
  const d = document.createElement("div");

  // On applique des classes CSS à cette <div> pour lui donner un style.
  // - "alert alert-[type]" : classes Bootstrap pour colorer l’alerte selon le type (ex: "alert-success").
  // - "alert-dismissible" : rend l’alerte fermable par l’utilisateur.
  // - "fade show" : animations Bootstrap pour apparaître progressivement.
  // - "alert-custom" : classe personnalisée (définie dans le CSS du projet).
  d.className = "alert alert-" + type + " alert-dismissible fade show alert-custom";

  // On choisit quelle icône afficher selon le type d’alerte :
  // - success → ✅ check-circle
  // - danger  → ❌ times-circle
  // - autre   → ⚠️ exclamation-triangle
  const icon = type === "success" ? "check-circle" : (type === "danger" ? "times-circle" : "exclamation-triangle");

  // On définit le contenu HTML de l’alerte.
  // - Une <div> qui contient :
  //   1. Une icône (FontAwesome) correspondant au type.
  //   2. Le message (msg) passé en paramètre.
  //   3. Un bouton pour fermer l’alerte ("btn-close").
  d.innerHTML = "<div class='d-flex align-items-center'>" +
                  "<i class='fas fa-" + icon + " me-2'></i>" + msg +
                  "<button class='btn-close' data-bs-dismiss='alert'></button>" +
                "</div>";

  // On ajoute l’alerte nouvellement créée dans le conteneur prévu (#alertContainer).
  document.getElementById("alertContainer").appendChild(d);

  // 🎵 Si le paramètre "play" est vrai (true) → on joue un son d’alerte.
  if (play) {
    try {
      // On récupère l’élément audio avec l’ID "alertSound".
      const a = document.getElementById("alertSound");

      // On remet la lecture du son au début (important si le son est déjà en cours).
      a.currentTime = 0;

      // On lance la lecture du son.
      a.play();
    } catch (e) {
      // Si une erreur se produit (exemple : navigateur qui bloque le son),
      // on l’ignore et le programme continue sans planter.
    }
  }

  // ⏳ On définit un délai automatique : après 4000 millisecondes (4 secondes),
  // l’alerte sera supprimée de la page pour ne pas encombrer l’écran.
  setTimeout(function() {
    d.remove();
  }, 4000);
}
/*************************************************************
 * 🔔 Fonction "showAlert"
 * → Cette fonction affiche une alerte temporaire en haut de la page
 *   avec un message, une couleur (succès, erreur, etc.), et éventuellement un son.
 * 
 * Paramètres :
 *   msg  → le texte du message à afficher.
 *   type → le type d’alerte (success, danger, warning, info…).
 *   play → si true, joue un son quand l’alerte apparaît.
 *************************************************************/