# 🛒 GreenCart - Application de Gestion de Stock

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?logo=bootstrap&logoColor=white)

Application web moderne et intuitive pour la gestion des stocks d'un supermarché à Marseille. Interface élégante avec effet glassmorphism, animations fluides et système d'authentification complet.

---

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [Comptes de test](#-comptes-de-test)
- [Captures d'écran](#-captures-décran)
- [Personnalisation](#-personnalisation)
- [Contributeurs](#-contributeurs)
- [Licence](#-licence)

---

## 🎯 Aperçu

**GreenCart** est une application web de gestion de stock conçue pour les supermarchés et commerces de détail. 
Elle offre une interface utilisateur moderne avec des animations fluides, un système de gestion complet des produits et des utilisateurs, ainsi que des fonctionnalités d'import/export de données.

### Points forts

✅ **Interface moderne** : Design glassmorphism avec dégradés colorés et animations CSS  
✅ **Gestion complète** : Produits, utilisateurs, catégories, stocks  
✅ **Alertes intelligentes** : Notifications automatiques pour les stocks bas  
✅ **Export de données** : CSV et JSON pour sauvegarde et analyse  
✅ **Responsive** : Compatible mobile, tablette et desktop  
✅ **Accessible** : Attributs ARIA et labels sémantiques  
✅ **100% Frontend** : Aucun serveur requis, fonctionne en local

---

## ⚡ Fonctionnalités

### 🔐 Authentification et Sécurité
- Système de connexion avec identifiants
- Deux niveaux d'accès : **Administrateur** et **Utilisateur**
- Gestion des statuts (Actif/Inactif)
- Protection contre l'auto-suppression/désactivation

### 📦 Gestion des Produits
- ➕ Ajout de nouveaux produits
- ✏️ Modification des produits existants
- 🗑️ Suppression avec confirmation
- 📊 Affichage en tableau avec filtres
- 🔍 Recherche dynamique par nom ou quantité
- 🏷️ Catégorisation (Électronique, Alimentaire, Vêtements, Meubles, Autre)
- ⚠️ Alertes automatiques pour stocks bas (≤ 5 unités)
- 📈 Statistiques en temps réel

### 👥 Gestion des Utilisateurs (Admin uniquement)
- Création de nouveaux utilisateurs
- Modification des rôles (Admin/User)
- Activation/Désactivation des comptes
- Suppression d'utilisateurs

### 💾 Import/Export de Données
- **Export CSV** : Liste complète des produits avec horodatage
- **Export JSON** : Sauvegarde totale (produits + utilisateurs + métadonnées)
- **Import JSON** : Restauration complète des données

### 🎨 Interface Utilisateur
- Dashboard avec statistiques visuelles
- Cartes animées avec effets de survol
- Badges colorés par catégorie
- Système d'alertes contextuelles avec sons
- Bouton "Retour en haut" avec animation
- Émojis flottants décoratifs
- Barre de défilement personnalisée multicolore

---

## 🛠️ Technologies utilisées

### Frontend
- **HTML5** : Structure sémantique et accessible
- **CSS3** : Animations, glassmorphism, responsive design
- **JavaScript ES6** : Logique applicative moderne

### Frameworks et Bibliothèques
- **Bootstrap 5.3.0** : Framework CSS pour le responsive et les composants
- **Font Awesome 6.4.0** : Bibliothèque d'icônes
- **Google Fonts** : Police Poppins

### Stockage
- **LocalStorage** : Persistance des données côté client

---

## 📥 Installation

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Aucun serveur web nécessaire

### Étapes d'installation

1. **Cloner ou télécharger le projet**
```bash
git clone https://github.com/votre-utilisateur/greencart.git
cd greencart
```

2. **Structure des fichiers**
```
greencart/
│
├── index.html          # Page principale
├── css/
│   └── styles.css      # Styles personnalisés
├── js/
│   └── script.js       # Logique JavaScript
└── README.md           # Documentation
```

3. **Lancer l'application**
- Double-cliquez sur `index.html`
- Ou ouvrez-le avec votre navigateur préféré
- Ou utilisez un serveur local (optionnel) :
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server
```

---

## 🚀 Utilisation

### Première connexion

1. Ouvrez `index.html` dans votre navigateur
2. Utilisez l'un des comptes de test :

| Rôle | Identifiant | Mot de passe |
|------|-------------|--------------|
| **Administrateur** | `admin` | `admin123` |
| **Utilisateur** | `user` | `user123` |

### Gestion des produits

#### Ajouter un produit
1. Cliquez sur **"Ajouter un produit"**
2. Remplissez le formulaire :
   - Nom du produit
   - Quantité
   - Prix (€)
   - Catégorie
3. Cliquez sur **"Enregistrer"**

#### Modifier un produit
1. Cliquez sur l'icône ✏️ (Éditer) dans la ligne du produit
2. Modifiez les informations
3. Cliquez sur **"Enregistrer"**

#### Supprimer un produit
1. Cliquez sur l'icône 🗑️ (Supprimer)
2. Confirmez la suppression

#### Rechercher un produit
- Tapez dans la barre de recherche (nom ou quantité)
- Le filtrage s'effectue en temps réel

### Gestion des utilisateurs (Admin)

1. Cliquez sur **"Gestion des utilisateurs"**
2. Options disponibles :
   - ➕ Ajouter un utilisateur
   - 🔄 Activer/Désactiver un compte
   - 🗑️ Supprimer un utilisateur

### Export de données

#### Export CSV
1. Cliquez sur **"Exporter en CSV"**
2. Le fichier `stock_export_[date]_[heure].csv` est téléchargé

#### Export JSON
1. Cliquez sur **"Exporter en JSON"**
2. Le fichier `sauvegarde_stock_[date]_[heure].json` est téléchargé

### Import de données

1. Cliquez sur **"Importer en JSON"**
2. Sélectionnez un fichier JSON valide
3. Les données sont restaurées automatiquement

---

## 📁 Structure du projet

```
greencart/
│
├── index.html                 # Page principale avec structure HTML
│   ├── Page de connexion     # Formulaire d'authentification
│   ├── Dashboard             # Statistiques et liste des produits
│   ├── Page Admin            # Gestion des utilisateurs
│   └── Modales               # Formulaires produits et utilisateurs
│
├── css/
│   └── styles.css            # Styles personnalisés
│       ├── Variables         # Couleurs et polices
│       ├── Animations        # Keyframes et transitions
│       ├── Glassmorphism     # Effets de transparence
│       ├── Responsive        # Media queries
│       └── Scrollbar         # Barre de défilement personnalisée
│
├── js/
│   └── script.js             # Logique applicative
│       ├── Gestion données   # Load/Save LocalStorage
│       ├── Authentification  # Login/Logout
│       ├── CRUD Produits     # Create, Read, Update, Delete
│       ├── CRUD Utilisateurs # Gestion admin
│       ├── Import/Export     # CSV et JSON
│       ├── Recherche         # Filtrage dynamique
│       └── Alertes           # Notifications avec sons
│
└── README.md                 # Documentation du projet
```

---

## 🔑 Comptes de test

### Administrateur
```
Identifiant : admin
Mot de passe : admin123
```
**Permissions** : Accès complet (produits + utilisateurs)

### Utilisateur standard
```
Identifiant : user
Mot de passe : user123
```
**Permissions** : Gestion des produits uniquement

---

## 🖼️ Captures d'écran

### Page de connexion
- Design moderne avec effet glassmorphism
- Animation de logo pulsant
- Badges de catégories colorés
- Émojis flottants en arrière-plan

### Dashboard principal
- 3 cartes de statistiques animées
- Tableau responsive des produits
- Badges colorés par catégorie et statut
- Barre de recherche en temps réel

### Gestion des utilisateurs (Admin)
- Liste complète des comptes
- Actions : Activer/Désactiver/Supprimer
- Protection contre l'auto-modification

---

## 🎨 Personnalisation

### Modifier les couleurs

Éditez `css/styles.css` :

```css
/* Couleur principale */
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Couleur navbar */
.navbar {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%) !important;
}
```

### Ajouter des catégories

1. Dans `index.html`, modifiez le `<select>` des catégories
2. Dans `css/styles.css`, ajoutez un badge de couleur :
```css
.badge-nouvelle-categorie {
  background: linear-gradient(135deg, #couleur1, #couleur2);
}
```
3. Dans `js/script.js`, ajoutez la catégorie à l'objet `categoryColors`

### Modifier le seuil de stock bas

Dans `js/script.js`, ligne 452 :
```javascript
// Changer 5 par votre seuil souhaité
const lowStockProducts = prods.filter(p => p.quantity <= 5);
```

---

## 🤝 Contributeurs

**Auteur principal** : Jean-Claude Lugo

Contributions bienvenues ! Pour contribuer :
1. Forkez le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence **MIT**.

```
MIT License

Copyright (c) 2025 Jean-Claude Lugo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support et Contact

Pour toute question, suggestion ou signalement de bug :

- 📧 Email : contact@greencart-marseille.fr
- 🐛 Issues : [GitHub Issues](https://github.com/votre-utilisateur/greencart/issues)
- 📖 Documentation : Ce README

---

## 🔮 Roadmap / Améliorations futures

- [ ] Mode sombre/clair
- [ ] Statistiques avancées avec graphiques
- [ ] Historique des modifications
- [ ] Notifications push
- [ ] Impression de rapports PDF
- [ ] Multi-langues (FR/EN)
- [ ] API backend (optionnel)
- [ ] Application mobile (PWA)
- [ ] Code-barres et QR codes
- [ ] Gestion des fournisseurs

---

## ⭐ Remerciements

- **Bootstrap** pour le framework CSS
- **Font Awesome** pour les icônes
- **Google Fonts** pour la police Poppins
- Tous les contributeurs et utilisateurs

---

<div align="center">

**Fait avec ❤️ à Marseille**

⭐ Si ce projet vous a été utile, n'hésitez pas à lui donner une étoile !

[⬆ Retour en haut](#-greencart---application-de-gestion-de-stock)

</div>
