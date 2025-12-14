# 🎮 Les Tables de Multiplication - Application PWA

Une application web interactive et ludique pour aider les enfants à réviser et maîtriser les tables de multiplication de 2 à 10.

## ✨ Caractéristiques principales

✅ **Interface amusante et colorée** - Conçue spécifiquement pour les enfants  
✅ **Quiz interactif** - 10 questions par session avec feedback immédiat  
✅ **Sélection flexible** - Choisir une ou plusieurs tables à réviser  
✅ **Retesting automatique** - Refaire uniquement les questions mal répondues  
✅ **Responsive design** - Fonctionne sur tous les écrans (mobile, tablette, desktop)  
✅ **Progressive Web App (PWA)** - Installez comme une vraie app mobile  
✅ **Mode offline complet** - Fonctionne sans connexion internet  
✅ **Scores et feedback** - Messages motivants selon la performance  

## 🚀 Installation et Utilisation

### Option 1 : Site en ligne (RECOMMANDÉ) 🌐

L'application est déployée en ligne avec HTTPS complet (nécessaire pour les PWA).

1. **Ouvrez le lien dans Chrome/Safari sur mobile :**
   - Sur Android : https://tables-multiplication.netlify.app
   - Sur iPhone : https://tables-multiplication.netlify.app

2. **Installez l'application :**

#### Sur Android 📱
- Ouvrez l'app dans **Chrome**
- Appuyez sur le **menu ⋮** (3 points) en haut à droite
- Sélectionnez **"Installer l'application"**
- L'app apparaît sur votre écran d'accueil !
- Cliquez sur l'icône pour lancer l'app

#### Sur iPhone 📱
- Ouvrez l'app dans **Safari**
- Appuyez sur le **bouton Partage** (↗️) en bas
- Sélectionnez **"Sur l'écran d'accueil"**
- Appuyez sur **"Ajouter"**
- L'app apparaît sur votre écran d'accueil !

### Option 2 : Installation locale (pour développement) 💻

#### Sur Windows/WSL avec Python :

```bash
# Naviguer dans le dossier
cd /chemin/vers/tables-multiplication

# Lancer le serveur local
python3 -m http.server 8000
```

Puis ouvrez : `http://localhost:8000`

**Attention :** L'installation PWA ne fonctionne qu'en HTTPS. Pour un vrai test PWA offline, utilisez l'option 1 (en ligne).

## 📱 Utilisation de l'Application

### Flux de jeu standard :

1. **Accueil** : Sélectionnez les tables à réviser (2 à 10)
2. **Quiz** : Répondez à 10 questions avec feedback immédiat
3. **Résultats** : Consultez votre score et vos erreurs
4. **Retesting** : (Optionnel) Refaites les questions mal répondues

### Fonctionnalités spéciales :

**🔄 Mode Retesting**
- Après chaque quiz, si vous avez des erreurs
- Un bouton "Refaire les erreurs" apparaît
- Vous pouvez vous concentrer sur vos points faibles

**📊 Barre de progression**
- Suivez votre avancée au fur et à mesure
- 10 questions par session

**✅ Messages motivants**
- 10/10 : "Extraordinaire !" 🌟
- 8-9/10 : "Très bien !" 🎉
- 6-7/10 : "Pas mal !" 👍
- 4-5/10 : "C'est un début !" 💪
- 0-3/10 : "Continue tes efforts !" 🚀

## 🌐 Mode Hors Ligne (Offline)

L'application fonctionne **complètement offline** une fois installée !

### Comment ça marche ?

- **Service Worker** : Stocke l'app en cache automatiquement
- **Première visite** : Télécharge tous les fichiers (15 secondes)
- **Visites suivantes** : Utilise le cache (instantané)
- **Sans internet** : L'app fonctionne normalement

### Pour tester le mode offline :

1. Installez l'app depuis l'écran d'accueil
2. Ouvrez l'app une première fois (elle se met en cache)
3. **Coupe complètement le WiFi/données**
4. Rouvrez l'app depuis l'écran d'accueil
5. **L'app fonctionne normalement !** ✅

## 🛠️ Structure du Projet

```
tables-multiplication/
├── index.html              # Page principale avec interface
├── styles.css              # Styles responsive (mobile optimisé)
├── script.js               # Logique du jeu en JavaScript
├── manifest.json           # Configuration PWA
├── service-worker.js       # Cache et mode offline
└── README.md              # Ce fichier
```

## 🔧 Dépannage

### L'application ne s'installe pas sur Android

**Causes possibles :**
- ❌ Connexion HTTP au lieu de HTTPS
- ❌ Service Worker non enregistré
- ❌ Manifest.json mal configuré

**Solutions :**
✅ Utilisez le lien Netlify (HTTPS) en ligne  
✅ Vérifiez la console (F12) pour les erreurs  
✅ Effacez le cache du navigateur et réessayez

### L'app n'apparaît pas après installation

- Sur Android : Cherchez l'icône "Tables Maths" sur votre écran d'accueil
- Sur iPhone : L'app s'ajoute à la fin de votre écran d'accueil
- Balayez vers la droite pour la trouver

### L'app fonctionne en ligne mais pas offline

- ⚠️ Attendez 10-15 secondes à la première visite (mise en cache)
- ⚠️ Assurez-vous d'avoir ouvert l'app en ligne une fois d'abord
- ⚠️ Supprimez l'app et réinstallez-la

### Le clavier numérique ne s'affiche pas

- L'app force le clavier numérique sur mobile (type="number")
- Si ce n'est pas le cas, c'est une limitation du navigateur
- L'input refuse automatiquement les caractères non-numériques

## 📊 Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design responsive avec media queries
- **JavaScript vanilla** - Logique sans framework
- **Service Worker API** - Mise en cache et offline
- **Web App Manifest** - Configuration PWA
- **Google Fonts (Fredoka)** - Police web moderne

## 🎨 Design et UX

- **Mobile-first** - Optimisé pour petits écrans
- **Responsive** : 480px, 768px, desktop
- **Accessible** : Contraste élevé, texte lisible
- **Performant** : Chargement rapide, animation fluide
- **Enfant-friendly** : Couleurs vives, police arrondie, emojis

## 📦 Déploiement

### Déployer votre propre version sur Netlify

1. Allez sur https://app.netlify.com/drop
2. Glissez-déposez le dossier `tables-multiplication`
3. Attendez 10 secondes
4. Voilà ! L'app est en ligne avec HTTPS 🚀

### Personnalisation

Vous pouvez modifier :
- **Couleurs** : Changez `#667eea` et `#764ba2` dans `styles.css`
- **Police** : Modifiez l'import Google Fonts dans `index.html`
- **Contenu** : Éditez le texte et messages dans `index.html` et `script.js`

## 📝 Licence

Cette application est libre d'utilisation pour un usage éducatif.

## 🤝 Contribution

N'hésitez pas à proposer des améliorations ou des corrections !

---

## ❓ FAQ

**Q: Faut-il une connexion internet pour jouer ?**  
R: Non ! Une fois installée, l'app fonctionne complètement offline.

**Q: L'app prend combien de place ?**  
R: Moins de 200 KB au total. Très léger !

**Q: Ça marche sur quel navigateur ?**  
R: Chrome Android, Safari iPhone, Edge, Firefox... tous les navigateurs modernes.

**Q: On peut changer les tables à réviser ?**  
R: Oui ! Retournez à l'accueil avec "Rejouer" pour sélectionner d'autres tables.

**Q: Comment voir si on progresse ?**  
R: L'app affiche le score de chaque session, avec des messages motivants à la fin.

---

**Créée avec ❤️ pour aider les enfants à apprendre en s'amusant ! 🎓📚**
