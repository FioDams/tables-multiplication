// Variables globales
let selectedTables = [];
let selectedFrenchRules = [];
let currentSubject = 'math'; // 'math' ou 'french'
let currentQuestion = null;
let score = 0;
let retryScore = 0;
let questionCount = 0;
const MAX_QUESTIONS = 10;
let mistakesList = []; // Tracker les erreurs
let isRetryMode = false; // Flag pour le mode retesting
let retryQuestionIndex = 0; // Index pour le retesting
let isQuizMode = true; // Flag pour quiz vs apprentissage
let learnIndex = 0; // Index pour le mode apprentissage
let hintUsed = false; // Indice utilisé dans cette question

// Données pour le français
const frenchRules = {
    nom: {
        name: 'Pluriel des noms',
        rule: 'Ajoute -s ou -x au singulier (ex: chat → chats)',
        examples: [
            { singular: 'chat', plural: 'chats', rule: 'nom' },
            { singular: 'maison', plural: 'maisons', rule: 'nom' },
            { singular: 'livre', plural: 'livres', rule: 'nom' },
            { singular: 'école', plural: 'écoles', rule: 'nom' },
            { singular: 'table', plural: 'tables', rule: 'nom' },
            { singular: 'porte', plural: 'portes', rule: 'nom' },
            { singular: 'arbre', plural: 'arbres', rule: 'nom' },
            { singular: 'fleur', plural: 'fleurs', rule: 'nom' }
        ],
        exercises: [
            { singular: 'chien', plural: 'chiens' },
            { singular: 'oiseau', plural: 'oiseaux' },
            { singular: 'papillon', plural: 'papillons' },
            { singular: 'souris', plural: 'souris' },
            { singular: 'lion', plural: 'lions' },
            { singular: 'tigre', plural: 'tigres' },
            { singular: 'ours', plural: 'ours' },
            { singular: 'lapin', plural: 'lapins' },
            { singular: 'cheval', plural: 'chevaux' },
            { singular: 'crayon', plural: 'crayons' },
            { singular: 'stylo', plural: 'stylos' },
            { singular: 'gomme', plural: 'gommes' },
            { singular: 'cahier', plural: 'cahiers' },
            { singular: 'cartable', plural: 'cartables' },
            { singular: 'fenêtre', plural: 'fenêtres' },
            { singular: 'bureau', plural: 'bureaux' },
            { singular: 'chaise', plural: 'chaises' },
            { singular: 'lit', plural: 'lits' },
            { singular: 'canapé', plural: 'canapés' },
            { singular: 'cuisine', plural: 'cuisines' },
            { singular: 'salle', plural: 'salles' },
            { singular: 'tapis', plural: 'tapis' },
            { singular: 'rideaux', plural: 'rideaux' },
            { singular: 'lampe', plural: 'lampes' },
            { singular: 'montagne', plural: 'montagnes' },
            { singular: 'fleuve', plural: 'fleuves' },
            { singular: 'valée', plural: 'vallées' },
            { singular: 'rocher', plural: 'rochers' },
            { singular: 'nuage', plural: 'nuages' },
            { singular: 'pluie', plural: 'pluies' },
            { singular: 'soleil', plural: 'soleils' },
            { singular: 'étoile', plural: 'étoiles' },
            { singular: 'lune', plural: 'lunes' },
            { singular: 'planète', plural: 'planètes' },
            { singular: 'fusée', plural: 'fusées' },
            { singular: 'sandwich', plural: 'sandwichs' },
            { singular: 'fruit', plural: 'fruits' },
            { singular: 'gâteau', plural: 'gâteaux' },
            { singular: 'bonbon', plural: 'bonbons' },
            { singular: 'glace', plural: 'glaces' },
            { singular: 'jus', plural: 'jus' },
            { singular: 'pain', plural: 'pains' },
            { singular: 'fromage', plural: 'fromages' },
            { singular: 'yaourt', plural: 'yaourts' },
            { singular: 'pomme', plural: 'pommes' },
            { singular: 'orange', plural: 'oranges' },
            { singular: 'banane', plural: 'bananes' },
            { singular: 'cerise', plural: 'cerises' },
            { singular: 'jouet', plural: 'jouets' },
            { singular: 'ballon', plural: 'ballons' },
            { singular: 'voiture', plural: 'voitures' },
            { singular: 'train', plural: 'trains' },
            { singular: 'bateau', plural: 'bateaux' },
            { singular: 'avion', plural: 'avions' },
            { singular: 'vélo', plural: 'vélos' },
            { singular: 'skateboard', plural: 'skateboards' },
            { singular: 'poupée', plural: 'poupées' },
            { singular: 'jeu', plural: 'jeux' },
            { singular: 'peluche', plural: 'peluches' },
            { singular: 'robot', plural: 'robots' },
            { singular: 'dinosaure', plural: 'dinosaures' },
            { singular: 'super-héros', plural: 'super-héros' },
            { singular: 'costume', plural: 'costumes' },
            { singular: 'robe', plural: 'robes' },
            { singular: 'pantalon', plural: 'pantalons' },
            { singular: 'chemise', plural: 'chemises' },
            { singular: 'pull', plural: 'pulls' },
            { singular: 'chaussette', plural: 'chaussettes' },
            { singular: 'chaussure', plural: 'chaussures' },
            { singular: 'chapeau', plural: 'chapeaux' },
            { singular: 'bonnet', plural: 'bonnets' },
            { singular: 'gant', plural: 'gants' },
            { singular: 'écharpe', plural: 'écharpes' },
            { singular: 'montre', plural: 'montres' },
            { singular: 'bracelet', plural: 'bracelets' },
            { singular: 'collier', plural: 'colliers' },
            { singular: 'boucle', plural: 'boucles' }
        ]
    },
    verbe: {
        name: 'Pluriel des verbes (conjugaison)',
        rule: 'À la 3e personne du pluriel, les verbes se terminent par -ent',
        examples: [
            { singular: 'Il chante', plural: 'Ils chantent', rule: 'verbe' },
            { singular: 'Elle joue', plural: 'Elles jouent', rule: 'verbe' },
            { singular: 'Il marche', plural: 'Ils marchent', rule: 'verbe' },
            { singular: 'Elle mange', plural: 'Elles mangent', rule: 'verbe' },
            { singular: 'Il saute', plural: 'Ils sautent', rule: 'verbe' },
            { singular: 'Elle court', plural: 'Elles courent', rule: 'verbe' },
            { singular: 'Il rit', plural: 'Ils rient', rule: 'verbe' },
            { singular: 'Elle écrit', plural: 'Elles écrivent', rule: 'verbe' }
        ],
        exercises: [
            { singular: 'Il danse', plural: 'Ils dansent' },
            { singular: 'Elle peint', plural: 'Elles peignent' },
            { singular: 'Il saute', plural: 'Ils sautent' },
            { singular: 'Elle nage', plural: 'Elles nagent' },
            { singular: 'Il lit', plural: 'Ils lisent' },
            { singular: 'Elle dessine', plural: 'Elles dessinent' },
            { singular: 'Il parle', plural: 'Ils parlent' },
            { singular: 'Elle écoute', plural: 'Elles écoutent' },
            { singular: 'Il regarde', plural: 'Ils regardent' },
            { singular: 'Elle ferme', plural: 'Elles ferment' },
            { singular: 'Il ouvre', plural: 'Ils ouvrent' },
            { singular: 'Elle compte', plural: 'Elles comptent' },
            { singular: 'Il cherche', plural: 'Ils cherchent' },
            { singular: 'Elle trouve', plural: 'Elles trouvent' },
            { singular: 'Il pense', plural: 'Ils pensent' },
            { singular: 'Elle voit', plural: 'Elles voient' },
            { singular: 'Il entend', plural: 'Ils entendent' },
            { singular: 'Elle sent', plural: 'Elles sentent' },
            { singular: 'Il goûte', plural: 'Ils goûtent' },
            { singular: 'Elle touche', plural: 'Elles touchent' },
            { singular: 'Il salit', plural: 'Ils salissent' },
            { singular: 'Elle lave', plural: 'Elles lavent' },
            { singular: 'Il repasse', plural: 'Ils repassent' },
            { singular: 'Elle coud', plural: 'Elles cousent' },
            { singular: 'Il cuisine', plural: 'Ils cuisinent' },
            { singular: 'Elle mange', plural: 'Elles mangent' },
            { singular: 'Il boit', plural: 'Ils boivent' },
            { singular: 'Elle dort', plural: 'Elles dorment' },
            { singular: 'Il se réveille', plural: 'Ils se réveillent' },
            { singular: 'Elle se lève', plural: 'Elles se lèvent' },
            { singular: 'Il se couche', plural: 'Ils se couchent' },
            { singular: 'Elle prend', plural: 'Elles prennent' },
            { singular: 'Il donne', plural: 'Ils donnent' },
            { singular: 'Elle reçoit', plural: 'Elles reçoivent' },
            { singular: 'Il pousse', plural: 'Ils poussent' },
            { singular: 'Elle tire', plural: 'Elles tirent' },
            { singular: 'Il glisse', plural: 'Ils glissent' },
            { singular: 'Elle tombe', plural: 'Elles tombent' },
            { singular: 'Il se lève', plural: 'Ils se lèvent' },
            { singular: 'Elle va', plural: 'Elles vont' },
            { singular: 'Il vient', plural: 'Ils viennent' },
            { singular: 'Elle reste', plural: 'Elles restent' },
            { singular: 'Il part', plural: 'Ils partent' },
            { singular: 'Elle arrive', plural: 'Elles arrivent' },
            { singular: 'Il attend', plural: 'Ils attendent' },
            { singular: 'Elle crie', plural: 'Elles crient' },
            { singular: 'Il respire', plural: 'Ils respirent' },
            { singular: 'Elle sourit', plural: 'Elles sourient' },
            { singular: 'Il pleure', plural: 'Ils pleurent' },
            { singular: 'Elle rit', plural: 'Elles rient' }
        ]
    },
    adjectif: {
        name: 'Pluriel des adjectifs',
        rule: 'Ajoute -s au singulier (ex: joli → jolis)',
        examples: [
            { singular: 'joli', plural: 'jolis', rule: 'adjectif' },
            { singular: 'grand', plural: 'grands', rule: 'adjectif' },
            { singular: 'petit', plural: 'petits', rule: 'adjectif' },
            { singular: 'bleu', plural: 'bleus', rule: 'adjectif' },
            { singular: 'rouge', plural: 'rouges', rule: 'adjectif' },
            { singular: 'jaune', plural: 'jaunes', rule: 'adjectif' },
            { singular: 'fort', plural: 'forts', rule: 'adjectif' },
            { singular: 'faible', plural: 'faibles', rule: 'adjectif' }
        ],
        exercises: [
            { singular: 'blanc', plural: 'blancs' },
            { singular: 'noir', plural: 'noirs' },
            { singular: 'gris', plural: 'gris' },
            { singular: 'vert', plural: 'verts' },
            { singular: 'orange', plural: 'oranges' },
            { singular: 'rose', plural: 'roses' },
            { singular: 'violet', plural: 'violets' },
            { singular: 'marron', plural: 'marrons' },
            { singular: 'long', plural: 'longs' },
            { singular: 'court', plural: 'courts' },
            { singular: 'épais', plural: 'épais' },
            { singular: 'fin', plural: 'fins' },
            { singular: 'gros', plural: 'gros' },
            { singular: 'mince', plural: 'minces' },
            { singular: 'haut', plural: 'hauts' },
            { singular: 'bas', plural: 'bas' },
            { singular: 'large', plural: 'larges' },
            { singular: 'étroit', plural: 'étroits' },
            { singular: 'lourd', plural: 'lourds' },
            { singular: 'léger', plural: 'légers' },
            { singular: 'rapide', plural: 'rapides' },
            { singular: 'lent', plural: 'lents' },
            { singular: 'doux', plural: 'doux' },
            { singular: 'dur', plural: 'durs' },
            { singular: 'chaud', plural: 'chauds' },
            { singular: 'froid', plural: 'froids' },
            { singular: 'sec', plural: 'secs' },
            { singular: 'mouillé', plural: 'mouillés' },
            { singular: 'mouillée', plural: 'mouillées' },
            { singular: 'neuf', plural: 'neufs' },
            { singular: 'vieux', plural: 'vieux' },
            { singular: 'ancien', plural: 'anciens' },
            { singular: 'moderne', plural: 'modernes' },
            { singular: 'beau', plural: 'beaux' },
            { singular: 'laid', plural: 'laids' },
            { singular: 'magnifique', plural: 'magnifiques' },
            { singular: 'horrible', plural: 'horribles' },
            { singular: 'gentil', plural: 'gentils' },
            { singular: 'méchant', plural: 'méchants' },
            { singular: 'heureux', plural: 'heureux' },
            { singular: 'triste', plural: 'tristes' },
            { singular: 'joyeux', plural: 'joyeux' },
            { singular: 'sérieux', plural: 'sérieux' },
            { singular: 'intelligent', plural: 'intelligents' },
            { singular: 'bête', plural: 'bêtes' },
            { singular: 'courageux', plural: 'courageux' },
            { singular: 'prudent', plural: 'prudents' },
            { singular: 'timide', plural: 'timides' },
            { singular: 'sportif', plural: 'sportifs' },
            { singular: 'paresseux', plural: 'paresseux' },
            { singular: 'actif', plural: 'actifs' }
        ]
    },
    accord: {
        name: 'Accord sujet-verbe',
        rule: 'Le verbe s\'accorde avec le sujet (ex: Je suis, Ils sont)',
        examples: [
            { subject: 'Je', infinitif: 'être', answer: 'suis', rule: 'accord' },
            { subject: 'Tu', infinitif: 'être', answer: 'es', rule: 'accord' },
            { subject: 'Il/Elle', infinitif: 'être', answer: 'est', rule: 'accord' },
            { subject: 'Nous', infinitif: 'être', answer: 'sommes', rule: 'accord' },
            { subject: 'Vous', infinitif: 'être', answer: 'êtes', rule: 'accord' },
            { subject: 'Ils/Elles', infinitif: 'être', answer: 'sont', rule: 'accord' }
        ],
        exercises: [
            // VERBE ÊTRE - irrégulier
            { subject: 'Je', infinitif: 'être', answer: 'suis' },
            { subject: 'Tu', infinitif: 'être', answer: 'es' },
            { subject: 'Il', infinitif: 'être', answer: 'est' },
            { subject: 'Elle', infinitif: 'être', answer: 'est' },
            { subject: 'Nous', infinitif: 'être', answer: 'sommes' },
            { subject: 'Vous', infinitif: 'être', answer: 'êtes' },
            { subject: 'Ils', infinitif: 'être', answer: 'sont' },
            { subject: 'Elles', infinitif: 'être', answer: 'sont' },
            // VERBE AVOIR - irrégulier
            { subject: 'Je', infinitif: 'avoir', answer: 'ai' },
            { subject: 'Tu', infinitif: 'avoir', answer: 'as' },
            { subject: 'Il', infinitif: 'avoir', answer: 'a' },
            { subject: 'Elle', infinitif: 'avoir', answer: 'a' },
            { subject: 'Nous', infinitif: 'avoir', answer: 'avons' },
            { subject: 'Vous', infinitif: 'avoir', answer: 'avez' },
            { subject: 'Ils', infinitif: 'avoir', answer: 'ont' },
            { subject: 'Elles', infinitif: 'avoir', answer: 'ont' },
            // VERBE ALLER - irrégulier
            { subject: 'Je', infinitif: 'aller', answer: 'vais' },
            { subject: 'Tu', infinitif: 'aller', answer: 'vas' },
            { subject: 'Il', infinitif: 'aller', answer: 'va' },
            { subject: 'Elle', infinitif: 'aller', answer: 'va' },
            { subject: 'Nous', infinitif: 'aller', answer: 'allons' },
            { subject: 'Vous', infinitif: 'aller', answer: 'allez' },
            { subject: 'Ils', infinitif: 'aller', answer: 'vont' },
            { subject: 'Elles', infinitif: 'aller', answer: 'vont' },
            // VERBE FAIRE - irrégulier
            { subject: 'Je', infinitif: 'faire', answer: 'fais' },
            { subject: 'Tu', infinitif: 'faire', answer: 'fais' },
            { subject: 'Il', infinitif: 'faire', answer: 'fait' },
            { subject: 'Elle', infinitif: 'faire', answer: 'fait' },
            { subject: 'Nous', infinitif: 'faire', answer: 'faisons' },
            { subject: 'Vous', infinitif: 'faire', answer: 'faites' },
            { subject: 'Ils', infinitif: 'faire', answer: 'font' },
            { subject: 'Elles', infinitif: 'faire', answer: 'font' },
            // VERBE POUVOIR - irrégulier
            { subject: 'Je', infinitif: 'pouvoir', answer: 'peux' },
            { subject: 'Tu', infinitif: 'pouvoir', answer: 'peux' },
            { subject: 'Il', infinitif: 'pouvoir', answer: 'peut' },
            { subject: 'Elle', infinitif: 'pouvoir', answer: 'peut' },
            { subject: 'Nous', infinitif: 'pouvoir', answer: 'pouvons' },
            { subject: 'Vous', infinitif: 'pouvoir', answer: 'pouvez' },
            { subject: 'Ils', infinitif: 'pouvoir', answer: 'peuvent' },
            { subject: 'Elles', infinitif: 'pouvoir', answer: 'peuvent' },
            // VERBE VOULOIR - irrégulier
            { subject: 'Je', infinitif: 'vouloir', answer: 'veux' },
            { subject: 'Tu', infinitif: 'vouloir', answer: 'veux' },
            { subject: 'Il', infinitif: 'vouloir', answer: 'veut' },
            { subject: 'Elle', infinitif: 'vouloir', answer: 'veut' },
            { subject: 'Nous', infinitif: 'vouloir', answer: 'voulons' },
            { subject: 'Vous', infinitif: 'vouloir', answer: 'voulez' },
            { subject: 'Ils', infinitif: 'vouloir', answer: 'veulent' },
            { subject: 'Elles', infinitif: 'vouloir', answer: 'veulent' },
            // VERBE DEVOIR - irrégulier
            { subject: 'Je', infinitif: 'devoir', answer: 'dois' },
            { subject: 'Tu', infinitif: 'devoir', answer: 'dois' },
            { subject: 'Il', infinitif: 'devoir', answer: 'doit' },
            { subject: 'Elle', infinitif: 'devoir', answer: 'doit' },
            { subject: 'Nous', infinitif: 'devoir', answer: 'devons' },
            { subject: 'Vous', infinitif: 'devoir', answer: 'devez' },
            { subject: 'Ils', infinitif: 'devoir', answer: 'doivent' },
            { subject: 'Elles', infinitif: 'devoir', answer: 'doivent' },
            // VERBE VENIR - irrégulier
            { subject: 'Je', infinitif: 'venir', answer: 'viens' },
            { subject: 'Tu', infinitif: 'venir', answer: 'viens' },
            { subject: 'Il', infinitif: 'venir', answer: 'vient' },
            { subject: 'Elle', infinitif: 'venir', answer: 'vient' },
            { subject: 'Nous', infinitif: 'venir', answer: 'venons' },
            { subject: 'Vous', infinitif: 'venir', answer: 'venez' },
            { subject: 'Ils', infinitif: 'venir', answer: 'viennent' },
            { subject: 'Elles', infinitif: 'venir', answer: 'viennent' },
            // VERBE VOIR - irrégulier
            { subject: 'Je', infinitif: 'voir', answer: 'vois' },
            { subject: 'Tu', infinitif: 'voir', answer: 'vois' },
            { subject: 'Il', infinitif: 'voir', answer: 'voit' },
            { subject: 'Elle', infinitif: 'voir', answer: 'voit' },
            { subject: 'Nous', infinitif: 'voir', answer: 'voyons' },
            { subject: 'Vous', infinitif: 'voir', answer: 'voyez' },
            { subject: 'Ils', infinitif: 'voir', answer: 'voient' },
            { subject: 'Elles', infinitif: 'voir', answer: 'voient' },
            // VERBE SAVOIR - irrégulier
            { subject: 'Je', infinitif: 'savoir', answer: 'sais' },
            { subject: 'Tu', infinitif: 'savoir', answer: 'sais' },
            { subject: 'Il', infinitif: 'savoir', answer: 'sait' },
            { subject: 'Elle', infinitif: 'savoir', answer: 'sait' },
            { subject: 'Nous', infinitif: 'savoir', answer: 'savons' },
            { subject: 'Vous', infinitif: 'savoir', answer: 'savez' },
            { subject: 'Ils', infinitif: 'savoir', answer: 'savent' },
            { subject: 'Elles', infinitif: 'savoir', answer: 'savent' },
            // 1ER GROUPE - PARLER
            { subject: 'Je', infinitif: 'parler', answer: 'parle' },
            { subject: 'Tu', infinitif: 'parler', answer: 'parles' },
            { subject: 'Il', infinitif: 'parler', answer: 'parle' },
            { subject: 'Elle', infinitif: 'parler', answer: 'parle' },
            { subject: 'Nous', infinitif: 'parler', answer: 'parlons' },
            { subject: 'Vous', infinitif: 'parler', answer: 'parlez' },
            { subject: 'Ils', infinitif: 'parler', answer: 'parlent' },
            { subject: 'Elles', infinitif: 'parler', answer: 'parlent' },
            // 1ER GROUPE - MARCHER
            { subject: 'Je', infinitif: 'marcher', answer: 'marche' },
            { subject: 'Tu', infinitif: 'marcher', answer: 'marches' },
            { subject: 'Il', infinitif: 'marcher', answer: 'marche' },
            { subject: 'Elle', infinitif: 'marcher', answer: 'marche' },
            { subject: 'Nous', infinitif: 'marcher', answer: 'marchons' },
            { subject: 'Vous', infinitif: 'marcher', answer: 'marchez' },
            { subject: 'Ils', infinitif: 'marcher', answer: 'marchent' },
            { subject: 'Elles', infinitif: 'marcher', answer: 'marchent' },
            // 1ER GROUPE - JOUER
            { subject: 'Je', infinitif: 'jouer', answer: 'joue' },
            { subject: 'Tu', infinitif: 'jouer', answer: 'joues' },
            { subject: 'Il', infinitif: 'jouer', answer: 'joue' },
            { subject: 'Elle', infinitif: 'jouer', answer: 'joue' },
            { subject: 'Nous', infinitif: 'jouer', answer: 'jouons' },
            { subject: 'Vous', infinitif: 'jouer', answer: 'jouez' },
            { subject: 'Ils', infinitif: 'jouer', answer: 'jouent' },
            { subject: 'Elles', infinitif: 'jouer', answer: 'jouent' },
            // 1ER GROUPE - DANSER
            { subject: 'Je', infinitif: 'danser', answer: 'danse' },
            { subject: 'Tu', infinitif: 'danser', answer: 'danses' },
            { subject: 'Il', infinitif: 'danser', answer: 'danse' },
            { subject: 'Elle', infinitif: 'danser', answer: 'danse' },
            { subject: 'Nous', infinitif: 'danser', answer: 'dansons' },
            { subject: 'Vous', infinitif: 'danser', answer: 'dansez' },
            { subject: 'Ils', infinitif: 'danser', answer: 'dansent' },
            { subject: 'Elles', infinitif: 'danser', answer: 'dansent' },
            // 1ER GROUPE - CHANTER
            { subject: 'Je', infinitif: 'chanter', answer: 'chante' },
            { subject: 'Tu', infinitif: 'chanter', answer: 'chantes' },
            { subject: 'Il', infinitif: 'chanter', answer: 'chante' },
            { subject: 'Elle', infinitif: 'chanter', answer: 'chante' },
            { subject: 'Nous', infinitif: 'chanter', answer: 'chantons' },
            { subject: 'Vous', infinitif: 'chanter', answer: 'chantez' },
            { subject: 'Ils', infinitif: 'chanter', answer: 'chantent' },
            { subject: 'Elles', infinitif: 'chanter', answer: 'chantent' },
            // 1ER GROUPE - REGARDER
            { subject: 'Je', infinitif: 'regarder', answer: 'regarde' },
            { subject: 'Tu', infinitif: 'regarder', answer: 'regardes' },
            { subject: 'Il', infinitif: 'regarder', answer: 'regarde' },
            { subject: 'Elle', infinitif: 'regarder', answer: 'regarde' },
            { subject: 'Nous', infinitif: 'regarder', answer: 'regardons' },
            { subject: 'Vous', infinitif: 'regarder', answer: 'regardez' },
            { subject: 'Ils', infinitif: 'regarder', answer: 'regardent' },
            { subject: 'Elles', infinitif: 'regarder', answer: 'regardent' },
            // 1ER GROUPE - ÉCOUTER
            { subject: 'Je', infinitif: 'écouter', answer: 'écoute' },
            { subject: 'Tu', infinitif: 'écouter', answer: 'écoutes' },
            { subject: 'Il', infinitif: 'écouter', answer: 'écoute' },
            { subject: 'Elle', infinitif: 'écouter', answer: 'écoute' },
            { subject: 'Nous', infinitif: 'écouter', answer: 'écoutons' },
            { subject: 'Vous', infinitif: 'écouter', answer: 'écoutez' },
            { subject: 'Ils', infinitif: 'écouter', answer: 'écoutent' },
            { subject: 'Elles', infinitif: 'écouter', answer: 'écoutent' },
            // 1ER GROUPE - SAUTER
            { subject: 'Je', infinitif: 'sauter', answer: 'saute' },
            { subject: 'Tu', infinitif: 'sauter', answer: 'sautes' },
            { subject: 'Il', infinitif: 'sauter', answer: 'saute' },
            { subject: 'Elle', infinitif: 'sauter', answer: 'saute' },
            { subject: 'Nous', infinitif: 'sauter', answer: 'sautons' },
            { subject: 'Vous', infinitif: 'sauter', answer: 'sautez' },
            { subject: 'Ils', infinitif: 'sauter', answer: 'sautent' },
            { subject: 'Elles', infinitif: 'sauter', answer: 'sautent' },
            // 1ER GROUPE - MANGER
            { subject: 'Je', infinitif: 'manger', answer: 'mange' },
            { subject: 'Tu', infinitif: 'manger', answer: 'manges' },
            { subject: 'Il', infinitif: 'manger', answer: 'mange' },
            { subject: 'Elle', infinitif: 'manger', answer: 'mange' },
            { subject: 'Nous', infinitif: 'manger', answer: 'mangeons' },
            { subject: 'Vous', infinitif: 'manger', answer: 'mangez' },
            { subject: 'Ils', infinitif: 'manger', answer: 'mangent' },
            { subject: 'Elles', infinitif: 'manger', answer: 'mangent' },
            // 3E GROUPE - BOIRE
            { subject: 'Je', infinitif: 'boire', answer: 'bois' },
            { subject: 'Tu', infinitif: 'boire', answer: 'bois' },
            { subject: 'Il', infinitif: 'boire', answer: 'boit' },
            { subject: 'Elle', infinitif: 'boire', answer: 'boit' },
            { subject: 'Nous', infinitif: 'boire', answer: 'buvons' },
            { subject: 'Vous', infinitif: 'boire', answer: 'buvez' },
            { subject: 'Ils', infinitif: 'boire', answer: 'boivent' },
            { subject: 'Elles', infinitif: 'boire', answer: 'boivent' },
            // 1ER GROUPE - DESSINER
            { subject: 'Je', infinitif: 'dessiner', answer: 'dessine' },
            { subject: 'Tu', infinitif: 'dessiner', answer: 'dessines' },
            { subject: 'Il', infinitif: 'dessiner', answer: 'dessine' },
            { subject: 'Elle', infinitif: 'dessiner', answer: 'dessine' },
            { subject: 'Nous', infinitif: 'dessiner', answer: 'dessinons' },
            { subject: 'Vous', infinitif: 'dessiner', answer: 'dessinez' },
            { subject: 'Ils', infinitif: 'dessiner', answer: 'dessinent' },
            { subject: 'Elles', infinitif: 'dessiner', answer: 'dessinent' },
            // 1ER GROUPE - NAGER
            { subject: 'Je', infinitif: 'nager', answer: 'nage' },
            { subject: 'Tu', infinitif: 'nager', answer: 'nages' },
            { subject: 'Il', infinitif: 'nager', answer: 'nage' },
            { subject: 'Elle', infinitif: 'nager', answer: 'nage' },
            { subject: 'Nous', infinitif: 'nager', answer: 'nageons' },
            { subject: 'Vous', infinitif: 'nager', answer: 'nagez' },
            { subject: 'Ils', infinitif: 'nager', answer: 'nagent' },
            { subject: 'Elles', infinitif: 'nager', answer: 'nagent' },
            // 3E GROUPE - COURIR
            { subject: 'Je', infinitif: 'courir', answer: 'cours' },
            { subject: 'Tu', infinitif: 'courir', answer: 'cours' },
            { subject: 'Il', infinitif: 'courir', answer: 'court' },
            { subject: 'Elle', infinitif: 'courir', answer: 'court' },
            { subject: 'Nous', infinitif: 'courir', answer: 'courons' },
            { subject: 'Vous', infinitif: 'courir', answer: 'courez' },
            { subject: 'Ils', infinitif: 'courir', answer: 'courent' },
            { subject: 'Elles', infinitif: 'courir', answer: 'courent' },
            // 3E GROUPE - LIRE
            { subject: 'Je', infinitif: 'lire', answer: 'lis' },
            { subject: 'Tu', infinitif: 'lire', answer: 'lis' },
            { subject: 'Il', infinitif: 'lire', answer: 'lit' },
            { subject: 'Elle', infinitif: 'lire', answer: 'lit' },
            { subject: 'Nous', infinitif: 'lire', answer: 'lisons' },
            { subject: 'Vous', infinitif: 'lire', answer: 'lisez' },
            { subject: 'Ils', infinitif: 'lire', answer: 'lisent' },
            { subject: 'Elles', infinitif: 'lire', answer: 'lisent' },
            // 3E GROUPE - ÉCRIRE
            { subject: 'Je', infinitif: 'écrire', answer: 'écris' },
            { subject: 'Tu', infinitif: 'écrire', answer: 'écris' },
            { subject: 'Il', infinitif: 'écrire', answer: 'écrit' },
            { subject: 'Elle', infinitif: 'écrire', answer: 'écrit' },
            { subject: 'Nous', infinitif: 'écrire', answer: 'écrivons' },
            { subject: 'Vous', infinitif: 'écrire', answer: 'écrivez' },
            { subject: 'Ils', infinitif: 'écrire', answer: 'écrivent' },
            { subject: 'Elles', infinitif: 'écrire', answer: 'écrivent' },
            // 2E GROUPE - FINIR
            { subject: 'Je', infinitif: 'finir', answer: 'finis' },
            { subject: 'Tu', infinitif: 'finir', answer: 'finis' },
            { subject: 'Il', infinitif: 'finir', answer: 'finit' },
            { subject: 'Elle', infinitif: 'finir', answer: 'finit' },
            { subject: 'Nous', infinitif: 'finir', answer: 'finissons' },
            { subject: 'Vous', infinitif: 'finir', answer: 'finissez' },
            { subject: 'Ils', infinitif: 'finir', answer: 'finissent' },
            { subject: 'Elles', infinitif: 'finir', answer: 'finissent' },
            // 2E GROUPE - CHOISIR
            { subject: 'Je', infinitif: 'choisir', answer: 'choisis' },
            { subject: 'Tu', infinitif: 'choisir', answer: 'choisis' },
            { subject: 'Il', infinitif: 'choisir', answer: 'choisit' },
            { subject: 'Elle', infinitif: 'choisir', answer: 'choisit' },
            { subject: 'Nous', infinitif: 'choisir', answer: 'choisissons' },
            { subject: 'Vous', infinitif: 'choisir', answer: 'choisissez' },
            { subject: 'Ils', infinitif: 'choisir', answer: 'choisissent' },
            { subject: 'Elles', infinitif: 'choisir', answer: 'choisissent' },
            // 2E GROUPE - GRANDIR
            { subject: 'Je', infinitif: 'grandir', answer: 'grandis' },
            { subject: 'Tu', infinitif: 'grandir', answer: 'grandis' },
            { subject: 'Il', infinitif: 'grandir', answer: 'grandit' },
            { subject: 'Elle', infinitif: 'grandir', answer: 'grandit' },
            { subject: 'Nous', infinitif: 'grandir', answer: 'grandissons' },
            { subject: 'Vous', infinitif: 'grandir', answer: 'grandissez' },
            { subject: 'Ils', infinitif: 'grandir', answer: 'grandissent' },
            { subject: 'Elles', infinitif: 'grandir', answer: 'grandissent' },
            // 2E GROUPE - REMPLIR
            { subject: 'Je', infinitif: 'remplir', answer: 'remplis' },
            { subject: 'Tu', infinitif: 'remplir', answer: 'remplis' },
            { subject: 'Il', infinitif: 'remplir', answer: 'remplit' },
            { subject: 'Elle', infinitif: 'remplir', answer: 'remplit' },
            { subject: 'Nous', infinitif: 'remplir', answer: 'remplissons' },
            { subject: 'Vous', infinitif: 'remplir', answer: 'remplissez' },
            { subject: 'Ils', infinitif: 'remplir', answer: 'remplissent' },
            { subject: 'Elles', infinitif: 'remplir', answer: 'remplissent' },
            // 1ER GROUPE - AIMER
            { subject: 'Je', infinitif: 'aimer', answer: 'aime' },
            { subject: 'Tu', infinitif: 'aimer', answer: 'aimes' },
            { subject: 'Il', infinitif: 'aimer', answer: 'aime' },
            { subject: 'Elle', infinitif: 'aimer', answer: 'aime' },
            { subject: 'Nous', infinitif: 'aimer', answer: 'aimons' },
            { subject: 'Vous', infinitif: 'aimer', answer: 'aimez' },
            { subject: 'Ils', infinitif: 'aimer', answer: 'aiment' },
            { subject: 'Elles', infinitif: 'aimer', answer: 'aiment' },
            // 1ER GROUPE - CRIER
            { subject: 'Je', infinitif: 'crier', answer: 'crie' },
            { subject: 'Tu', infinitif: 'crier', answer: 'cries' },
            { subject: 'Il', infinitif: 'crier', answer: 'crie' },
            { subject: 'Elle', infinitif: 'crier', answer: 'crie' },
            { subject: 'Nous', infinitif: 'crier', answer: 'crions' },
            { subject: 'Vous', infinitif: 'crier', answer: 'criez' },
            { subject: 'Ils', infinitif: 'crier', answer: 'crient' },
            { subject: 'Elles', infinitif: 'crier', answer: 'crient' },
            // 3E GROUPE - RIRE
            { subject: 'Je', infinitif: 'rire', answer: 'ris' },
            { subject: 'Tu', infinitif: 'rire', answer: 'ris' },
            { subject: 'Il', infinitif: 'rire', answer: 'rit' },
            { subject: 'Elle', infinitif: 'rire', answer: 'rit' },
            { subject: 'Nous', infinitif: 'rire', answer: 'rions' },
            { subject: 'Vous', infinitif: 'rire', answer: 'riez' },
            { subject: 'Ils', infinitif: 'rire', answer: 'rient' },
            { subject: 'Elles', infinitif: 'rire', answer: 'rient' },
            // 1ER GROUPE - CHERCHER
            { subject: 'Je', infinitif: 'chercher', answer: 'cherche' },
            { subject: 'Tu', infinitif: 'chercher', answer: 'cherches' },
            { subject: 'Il', infinitif: 'chercher', answer: 'cherche' },
            { subject: 'Elle', infinitif: 'chercher', answer: 'cherche' },
            { subject: 'Nous', infinitif: 'chercher', answer: 'cherchons' },
            { subject: 'Vous', infinitif: 'chercher', answer: 'cherchez' },
            { subject: 'Ils', infinitif: 'chercher', answer: 'cherchent' },
            { subject: 'Elles', infinitif: 'chercher', answer: 'cherchent' },
            // 1ER GROUPE - TROUVER
            { subject: 'Je', infinitif: 'trouver', answer: 'trouve' },
            { subject: 'Tu', infinitif: 'trouver', answer: 'trouves' },
            { subject: 'Il', infinitif: 'trouver', answer: 'trouve' },
            { subject: 'Elle', infinitif: 'trouver', answer: 'trouve' },
            { subject: 'Nous', infinitif: 'trouver', answer: 'trouvons' },
            { subject: 'Vous', infinitif: 'trouver', answer: 'trouvez' },
            { subject: 'Ils', infinitif: 'trouver', answer: 'trouvent' },
            { subject: 'Elles', infinitif: 'trouver', answer: 'trouvent' },
            // 1ER GROUPE - MONTRER
            { subject: 'Je', infinitif: 'montrer', answer: 'montre' },
            { subject: 'Tu', infinitif: 'montrer', answer: 'montres' },
            { subject: 'Il', infinitif: 'montrer', answer: 'montre' },
            { subject: 'Elle', infinitif: 'montrer', answer: 'montre' },
            { subject: 'Nous', infinitif: 'montrer', answer: 'montrons' },
            { subject: 'Vous', infinitif: 'montrer', answer: 'montrez' },
            { subject: 'Ils', infinitif: 'montrer', answer: 'montrent' },
            { subject: 'Elles', infinitif: 'montrer', answer: 'montrent' },
            // 1ER GROUPE - DONNER
            { subject: 'Je', infinitif: 'donner', answer: 'donne' },
            { subject: 'Tu', infinitif: 'donner', answer: 'donnes' },
            { subject: 'Il', infinitif: 'donner', answer: 'donne' },
            { subject: 'Elle', infinitif: 'donner', answer: 'donne' },
            { subject: 'Nous', infinitif: 'donner', answer: 'donnons' },
            { subject: 'Vous', infinitif: 'donner', answer: 'donnez' },
            { subject: 'Ils', infinitif: 'donner', answer: 'donnent' },
            { subject: 'Elles', infinitif: 'donner', answer: 'donnent' },
            // 3E GROUPE - PRENDRE
            { subject: 'Je', infinitif: 'prendre', answer: 'prends' },
            { subject: 'Tu', infinitif: 'prendre', answer: 'prends' },
            { subject: 'Il', infinitif: 'prendre', answer: 'prend' },
            { subject: 'Elle', infinitif: 'prendre', answer: 'prend' },
            { subject: 'Nous', infinitif: 'prendre', answer: 'prenons' },
            { subject: 'Vous', infinitif: 'prendre', answer: 'prenez' },
            { subject: 'Ils', infinitif: 'prendre', answer: 'prennent' },
            { subject: 'Elles', infinitif: 'prendre', answer: 'prennent' },
            // 1ER GROUPE - OUBLIER
            { subject: 'Je', infinitif: 'oublier', answer: 'oublie' },
            { subject: 'Tu', infinitif: 'oublier', answer: 'oublies' },
            { subject: 'Il', infinitif: 'oublier', answer: 'oublie' },
            { subject: 'Elle', infinitif: 'oublier', answer: 'oublie' },
            { subject: 'Nous', infinitif: 'oublier', answer: 'oublions' },
            { subject: 'Vous', infinitif: 'oublier', answer: 'oubliez' },
            { subject: 'Ils', infinitif: 'oublier', answer: 'oublient' },
            { subject: 'Elles', infinitif: 'oublier', answer: 'oublient' },
            // 1ER GROUPE - PENSER
            { subject: 'Je', infinitif: 'penser', answer: 'pense' },
            { subject: 'Tu', infinitif: 'penser', answer: 'penses' },
            { subject: 'Il', infinitif: 'penser', answer: 'pense' },
            { subject: 'Elle', infinitif: 'penser', answer: 'pense' },
            { subject: 'Nous', infinitif: 'penser', answer: 'pensons' },
            { subject: 'Vous', infinitif: 'penser', answer: 'pensez' },
            { subject: 'Ils', infinitif: 'penser', answer: 'pensent' },
            { subject: 'Elles', infinitif: 'penser', answer: 'pensent' },
            // 1ER GROUPE - TOURNER
            { subject: 'Je', infinitif: 'tourner', answer: 'tourne' },
            { subject: 'Tu', infinitif: 'tourner', answer: 'tournes' },
            { subject: 'Il', infinitif: 'tourner', answer: 'tourne' },
            { subject: 'Elle', infinitif: 'tourner', answer: 'tourne' },
            { subject: 'Nous', infinitif: 'tourner', answer: 'tournons' },
            { subject: 'Vous', infinitif: 'tourner', answer: 'tournez' },
            { subject: 'Ils', infinitif: 'tourner', answer: 'tournent' },
            { subject: 'Elles', infinitif: 'tourner', answer: 'tournent' },
            // 1ER GROUPE - APPORTER
            { subject: 'Je', infinitif: 'apporter', answer: 'apporte' },
            { subject: 'Tu', infinitif: 'apporter', answer: 'apportes' },
            { subject: 'Il', infinitif: 'apporter', answer: 'apporte' },
            { subject: 'Elle', infinitif: 'apporter', answer: 'apporte' },
            { subject: 'Nous', infinitif: 'apporter', answer: 'apportons' },
            { subject: 'Vous', infinitif: 'apporter', answer: 'apportez' },
            { subject: 'Ils', infinitif: 'apporter', answer: 'apportent' },
            { subject: 'Elles', infinitif: 'apporter', answer: 'apportent' },
            // 3E GROUPE - ATTENDRE
            { subject: 'Je', infinitif: 'attendre', answer: 'attends' },
            { subject: 'Tu', infinitif: 'attendre', answer: 'attends' },
            { subject: 'Il', infinitif: 'attendre', answer: 'attend' },
            { subject: 'Elle', infinitif: 'attendre', answer: 'attend' },
            { subject: 'Nous', infinitif: 'attendre', answer: 'attendons' },
            { subject: 'Vous', infinitif: 'attendre', answer: 'attendez' },
            { subject: 'Ils', infinitif: 'attendre', answer: 'attendent' },
            { subject: 'Elles', infinitif: 'attendre', answer: 'attendent' },
            // 2E GROUPE - ROUGIR
            { subject: 'Je', infinitif: 'rougir', answer: 'rougis' },
            { subject: 'Tu', infinitif: 'rougir', answer: 'rougis' },
            { subject: 'Il', infinitif: 'rougir', answer: 'rougit' },
            { subject: 'Elle', infinitif: 'rougir', answer: 'rougit' },
            { subject: 'Nous', infinitif: 'rougir', answer: 'rougissons' },
            { subject: 'Vous', infinitif: 'rougir', answer: 'rougissez' },
            { subject: 'Ils', infinitif: 'rougir', answer: 'rougissent' },
            { subject: 'Elles', infinitif: 'rougir', answer: 'rougissent' },
            // 2E GROUPE - PUNIR
            { subject: 'Je', infinitif: 'punir', answer: 'punis' },
            { subject: 'Tu', infinitif: 'punir', answer: 'punis' },
            { subject: 'Il', infinitif: 'punir', answer: 'punit' },
            { subject: 'Elle', infinitif: 'punir', answer: 'punit' },
            { subject: 'Nous', infinitif: 'punir', answer: 'punissons' },
            { subject: 'Vous', infinitif: 'punir', answer: 'punissez' },
            { subject: 'Ils', infinitif: 'punir', answer: 'punissent' },
            { subject: 'Elles', infinitif: 'punir', answer: 'punissent' },
            // 1ER GROUPE - TOMBER
            { subject: 'Je', infinitif: 'tomber', answer: 'tombe' },
            { subject: 'Tu', infinitif: 'tomber', answer: 'tombes' },
            { subject: 'Il', infinitif: 'tomber', answer: 'tombe' },
            { subject: 'Elle', infinitif: 'tomber', answer: 'tombe' },
            { subject: 'Nous', infinitif: 'tomber', answer: 'tombons' },
            { subject: 'Vous', infinitif: 'tomber', answer: 'tombez' },
            { subject: 'Ils', infinitif: 'tomber', answer: 'tombent' },
            { subject: 'Elles', infinitif: 'tomber', answer: 'tombent' },
            // 1ER GROUPE - ARRÊTER
            { subject: 'Je', infinitif: 'arrêter', answer: 'arrête' },
            { subject: 'Tu', infinitif: 'arrêter', answer: 'arrêtes' },
            { subject: 'Il', infinitif: 'arrêter', answer: 'arrête' },
            { subject: 'Elle', infinitif: 'arrêter', answer: 'arrête' },
            { subject: 'Nous', infinitif: 'arrêter', answer: 'arrêtons' },
            { subject: 'Vous', infinitif: 'arrêter', answer: 'arrêtez' },
            { subject: 'Ils', infinitif: 'arrêter', answer: 'arrêtent' },
            { subject: 'Elles', infinitif: 'arrêter', answer: 'arrêtent' },
            // 1ER GROUPE - LEVER
            { subject: 'Je', infinitif: 'lever', answer: 'lève' },
            { subject: 'Tu', infinitif: 'lever', answer: 'lèves' },
            { subject: 'Il', infinitif: 'lever', answer: 'lève' },
            { subject: 'Elle', infinitif: 'lever', answer: 'lève' },
            { subject: 'Nous', infinitif: 'lever', answer: 'levons' },
            { subject: 'Vous', infinitif: 'lever', answer: 'levez' },
            { subject: 'Ils', infinitif: 'lever', answer: 'lèvent' },
            { subject: 'Elles', infinitif: 'lever', answer: 'lèvent' },
            // 1ER GROUPE - APPELER
            { subject: 'Je', infinitif: 'appeler', answer: 'appelle' },
            { subject: 'Tu', infinitif: 'appeler', answer: 'appelles' },
            { subject: 'Il', infinitif: 'appeler', answer: 'appelle' },
            { subject: 'Elle', infinitif: 'appeler', answer: 'appelle' },
            { subject: 'Nous', infinitif: 'appeler', answer: 'appelons' },
            { subject: 'Vous', infinitif: 'appeler', answer: 'appelez' },
            { subject: 'Ils', infinitif: 'appeler', answer: 'appellent' },
            { subject: 'Elles', infinitif: 'appeler', answer: 'appellent' },
            // 1ER GROUPE - PASSER
            { subject: 'Je', infinitif: 'passer', answer: 'passe' },
            { subject: 'Tu', infinitif: 'passer', answer: 'passes' },
            { subject: 'Il', infinitif: 'passer', answer: 'passe' },
            { subject: 'Elle', infinitif: 'passer', answer: 'passe' },
            { subject: 'Nous', infinitif: 'passer', answer: 'passons' },
            { subject: 'Vous', infinitif: 'passer', answer: 'passez' },
            { subject: 'Ils', infinitif: 'passer', answer: 'passent' },
            { subject: 'Elles', infinitif: 'passer', answer: 'passent' },
            // 1ER GROUPE - ENTRER
            { subject: 'Je', infinitif: 'entrer', answer: 'entre' },
            { subject: 'Tu', infinitif: 'entrer', answer: 'entres' },
            { subject: 'Il', infinitif: 'entrer', answer: 'entre' },
            { subject: 'Elle', infinitif: 'entrer', answer: 'entre' },
            { subject: 'Nous', infinitif: 'entrer', answer: 'entrons' },
            { subject: 'Vous', infinitif: 'entrer', answer: 'entrez' },
            { subject: 'Ils', infinitif: 'entrer', answer: 'entrent' },
            { subject: 'Elles', infinitif: 'entrer', answer: 'entrent' },
            // 3E GROUPE - SORTIR
            { subject: 'Je', infinitif: 'sortir', answer: 'sors' },
            { subject: 'Tu', infinitif: 'sortir', answer: 'sors' },
            { subject: 'Il', infinitif: 'sortir', answer: 'sort' },
            { subject: 'Elle', infinitif: 'sortir', answer: 'sort' },
            { subject: 'Nous', infinitif: 'sortir', answer: 'sortons' },
            { subject: 'Vous', infinitif: 'sortir', answer: 'sortez' },
            { subject: 'Ils', infinitif: 'sortir', answer: 'sortent' },
            { subject: 'Elles', infinitif: 'sortir', answer: 'sortent' },
            // 1ER GROUPE - RESPIRER
            { subject: 'Je', infinitif: 'respirer', answer: 'respire' },
            { subject: 'Tu', infinitif: 'respirer', answer: 'respires' },
            { subject: 'Il', infinitif: 'respirer', answer: 'respire' },
            { subject: 'Elle', infinitif: 'respirer', answer: 'respire' },
            { subject: 'Nous', infinitif: 'respirer', answer: 'respirons' },
            { subject: 'Vous', infinitif: 'respirer', answer: 'respirez' },
            { subject: 'Ils', infinitif: 'respirer', answer: 'respirent' },
            { subject: 'Elles', infinitif: 'respirer', answer: 'respirent' },
            // 1ER GROUPE - BRILLER
            { subject: 'Je', infinitif: 'briller', answer: 'brille' },
            { subject: 'Tu', infinitif: 'briller', answer: 'brilles' },
            { subject: 'Il', infinitif: 'briller', answer: 'brille' },
            { subject: 'Elle', infinitif: 'briller', answer: 'brille' },
            { subject: 'Nous', infinitif: 'briller', answer: 'brillons' },
            { subject: 'Vous', infinitif: 'briller', answer: 'brillez' },
            { subject: 'Ils', infinitif: 'briller', answer: 'brillent' },
            { subject: 'Elles', infinitif: 'briller', answer: 'brillent' },
            // 3E GROUPE - CONSTRUIRE
            { subject: 'Je', infinitif: 'construire', answer: 'construis' },
            { subject: 'Tu', infinitif: 'construire', answer: 'construis' },
            { subject: 'Il', infinitif: 'construire', answer: 'construit' },
            { subject: 'Elle', infinitif: 'construire', answer: 'construit' },
            { subject: 'Nous', infinitif: 'construire', answer: 'construisons' },
            { subject: 'Vous', infinitif: 'construire', answer: 'construisez' },
            { subject: 'Ils', infinitif: 'construire', answer: 'construisent' },
            { subject: 'Elles', infinitif: 'construire', answer: 'construisent' }
        ]
    }
};

// Éléments du DOM - Sujet
const subjectScreen = document.getElementById('subject-screen');
const mathBtn = document.getElementById('math-btn');
const frenchBtn = document.getElementById('french-btn');

// Éléments du DOM - Menus
const mainMenuScreen = document.getElementById('main-menu-screen');
const frenchMenuScreen = document.getElementById('french-menu-screen');
const learnBtn = document.getElementById('learn-btn');
const quizBtn = document.getElementById('quiz-btn');
const frenchLearnBtn = document.getElementById('french-learn-btn');
const frenchQuizBtn = document.getElementById('french-quiz-btn');
const backToMenuBtn = document.getElementById('back-to-menu-btn');
const backToSubjectBtn = document.getElementById('back-to-subject-btn');
const backToSubjectFrenchBtn = document.getElementById('back-to-subject-french-btn');
const frenchBackToMenuBtn = document.getElementById('french-back-to-menu-btn');

// Éléments du DOM - Apprentissage
const learnScreen = document.getElementById('learn-screen');
const learnContent = document.getElementById('learn-content');
const learnTable = document.getElementById('learn-table');
const learnPrevBtn = document.getElementById('learn-prev-btn');
const learnNextBtn = document.getElementById('learn-next-btn');
const learnQuitBtn = document.getElementById('learn-quit-btn');

// Éléments du DOM - Écrans
const welcomeScreen = document.getElementById('welcome-screen');
const frenchWelcomeScreen = document.getElementById('french-welcome-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const retryScreen = document.getElementById('retry-screen');
const startBtn = document.getElementById('start-btn');
const frenchStartBtn = document.getElementById('french-start-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const hintBtn = document.getElementById('hint-btn');
const retryErrorsBtn = document.getElementById('retry-errors-btn');
const retrySubmitBtn = document.getElementById('retry-submit-btn');
const answerInput = document.getElementById('answer-input');
const retryAnswerInput = document.getElementById('retry-answer-input');
const questionElement = document.getElementById('question');
const retryQuestionElement = document.getElementById('retry-question');
const feedbackElement = document.getElementById('feedback');
const retryFeedbackElement = document.getElementById('retry-feedback');
const scoreElement = document.getElementById('score');
const retryScoreElement = document.getElementById('retry-score');
const finalScoreElement = document.getElementById('final-score');
const endTitleElement = document.getElementById('end-title');
const endMessageElement = document.getElementById('end-message');
const progressFill = document.getElementById('progress');
const retryProgressFill = document.getElementById('retry-progress');
const errorSummaryElement = document.getElementById('error-summary');

// ÉCOUTEURS D'ÉVÉNEMENTS - CHOIX DU SUJET
mathBtn.addEventListener('click', () => {
    currentSubject = 'math';
    showScreen(mainMenuScreen);
});

frenchBtn.addEventListener('click', () => {
    currentSubject = 'french';
    showScreen(frenchMenuScreen);
});

// ÉCOUTEURS D'ÉVÉNEMENTS - MENUS MATH
learnBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#welcome-screen .table-selection input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    showScreen(welcomeScreen);
    isQuizMode = false;
});

quizBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#welcome-screen .table-selection input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    showScreen(welcomeScreen);
    isQuizMode = true;
});

// ÉCOUTEURS D'ÉVÉNEMENTS - MENUS FRANÇAIS
frenchLearnBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#french-welcome-screen .french-rule');
    checkboxes.forEach(cb => cb.checked = false);
    showScreen(frenchWelcomeScreen);
    isQuizMode = false;
});

frenchQuizBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#french-welcome-screen .french-rule');
    checkboxes.forEach(cb => cb.checked = false);
    showScreen(frenchWelcomeScreen);
    isQuizMode = true;
});

// RETOURS
backToMenuBtn.addEventListener('click', goBackToMenu);

// Écouteurs d'événements - Apprentissage
learnPrevBtn.addEventListener('click', () => learnNavigate(-1));
learnNextBtn.addEventListener('click', () => learnNavigate(1));
learnQuitBtn.addEventListener('click', goBackToMenu);


backToSubjectBtn.addEventListener('click', () => {
    currentSubject = null;
    showScreen(subjectScreen);
});
backToSubjectFrenchBtn.addEventListener('click', () => {
    currentSubject = null;
    showScreen(subjectScreen);
});
frenchBackToMenuBtn.addEventListener('click', () => goBackToMenu());

// JEUX
startBtn.addEventListener('click', startGame);
frenchStartBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);
hintBtn.addEventListener('click', showHint);
restartBtn.addEventListener('click', restartGame);
retryErrorsBtn.addEventListener('click', retryErrors);
retrySubmitBtn.addEventListener('click', checkRetryAnswer);

// INPUT
answerInput.addEventListener('input', function() {
    if (currentSubject === 'math') {
        this.value = this.value.replace(/\D/g, '');
    }
});

answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});

retryAnswerInput.addEventListener('input', function() {
    if (currentSubject === 'math') {
        this.value = this.value.replace(/\D/g, '');
    }
});

retryAnswerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkRetryAnswer();
});

// FONCTIONS PRINCIPALES
function startGame() {
    if (currentSubject === 'math') {
        const checkboxes = document.querySelectorAll('#welcome-screen .table-selection input[type="checkbox"]:checked');
        if (checkboxes.length === 0) {
            alert('Sélectionne au moins une table ! 😊');
            return;
        }
        selectedTables = Array.from(checkboxes).map(cb => parseInt(cb.value));
    } else {
        const checkboxes = document.querySelectorAll('#french-welcome-screen .french-rule:checked');
        if (checkboxes.length === 0) {
            alert('Sélectionne au moins une règle ! 😊');
            return;
        }
        selectedFrenchRules = Array.from(checkboxes).map(cb => cb.value);
    }

    score = 0;
    questionCount = 0;
    mistakesList = [];
    isRetryMode = false;

    if (isQuizMode) {
        showScreen(gameScreen);
        if (currentSubject === 'math') {
            generateQuestion();
        } else {
            generateFrenchQuestion();
        }
    } else {
        learnIndex = 0;
        showScreen(document.getElementById('learn-screen'));
        displayLearnContent();
    }
}

// MATHÉMATIQUES
function generateQuestion() {
    const table = selectedTables[Math.floor(Math.random() * selectedTables.length)];
    let number = 0;
    do {
        number = Math.floor(Math.random() * 8) + 2;
    } while(number == currentQuestion?.number);

    currentQuestion = {
        table: table,
        number: number,
        answer: (table * number).toString(),
        type: 'math'
    };

    questionElement.textContent = `${table} × ${number} = ?`;
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    answerInput.value = '';
    answerInput.disabled = false;
    submitBtn.disabled = false;
    answerInput.focus();
    hintBtn.disabled = false;
    hintUsed = false;
}

// FRANÇAIS - Générer une question
function generateFrenchQuestion() {
    // Choisir une règle aléatoire
    const rule = selectedFrenchRules[Math.floor(Math.random() * selectedFrenchRules.length)];
    // Utiliser les exercices pour varier le contenu
    const exercises = frenchRules[rule].exercises;
    const exercise = exercises[Math.floor(Math.random() * exercises.length)];

    let questionText, correctAnswer;

    if (rule === 'nom' || rule === 'adjectif') {
        questionText = `Pluriel de "${exercise.singular}" :`;
        correctAnswer = exercise.plural;
    } else if (rule === 'verbe') {
        questionText = `Transforme au pluriel : "${exercise.singular}" devient ?`;
        correctAnswer = exercise.plural;
    } else if (rule === 'accord') {
        questionText = `Conjugue : "${exercise.subject} ___" (verbe ${exercise.infinitif}) :`;
        correctAnswer = exercise.answer;
    }

    currentQuestion = {
        question: questionText,
        answer: correctAnswer,
        rule: rule,
        type: 'french'
    };

    questionElement.textContent = questionText;
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    answerInput.value = '';
    answerInput.disabled = false;
    submitBtn.disabled = false;
    answerInput.focus();
    hintBtn.disabled = false;
    hintUsed = false;
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();

    if (userAnswer === '') {
        feedbackElement.textContent = '⚠️ Écris une réponse !';
        feedbackElement.className = 'feedback incorrect';
        return;
    }

    answerInput.disabled = true;
    submitBtn.disabled = true;
    hintBtn.disabled = true;

    questionCount++;

    const correctAnswer = currentQuestion.answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        if (hintUsed) {
            score += 0;
            feedbackElement.textContent = '✅ Correct ! (indice utilisé: -1 pt)';
        } else {
            score++;
            feedbackElement.textContent = '✅ Bravo ! C\'est correct !';
        }
        feedbackElement.className = 'feedback correct';
    } else {
        feedbackElement.textContent = `❌ Oups ! La réponse était "${currentQuestion.answer}"`;
        feedbackElement.className = 'feedback incorrect';
        mistakesList.push(JSON.parse(JSON.stringify(currentQuestion)));
    }

    scoreElement.textContent = score;
    updateProgressBar();

    if (questionCount >= MAX_QUESTIONS) {
        setTimeout(showEndScreen, 1500);
    } else {
        setTimeout(() => {
            if (currentSubject === 'math') {
                generateQuestion();
            } else {
                generateFrenchQuestion();
            }
        }, 1500);
    }
}

function updateProgressBar() {
    const percentage = (questionCount / MAX_QUESTIONS) * 100;
    progressFill.style.width = percentage + '%';
}

function showEndScreen() {
    showScreen(endScreen);
    finalScoreElement.textContent = score;
    
    if (score === 10) {
        endTitleElement.textContent = '🌟 Extraordinaire ! 🌟';
        endMessageElement.textContent = 'Tu es un champion !';
    } else if (score >= 8) {
        endTitleElement.textContent = '🎉 Très bien ! 🎉';
        endMessageElement.textContent = 'Beau travail ! Continue comme ça !';
    } else if (score >= 6) {
        endTitleElement.textContent = '👍 Pas mal ! 👍';
        endMessageElement.textContent = 'Tu progresses ! Encore un peu de pratique et ce sera parfait !';
    } else if (score >= 4) {
        endTitleElement.textContent = '💪 C\'est un début ! 💪';
        endMessageElement.textContent = 'Réessaye ! Tu vas t\'améliorer avec la pratique !';
    } else {
        endTitleElement.textContent = '🚀 Continue tes efforts ! 🚀';
        endMessageElement.textContent = 'N\'abandonne pas ! Chaque tentative te rend meilleur !';
    }

    if (mistakesList.length > 0) {
        let errorText = mistakesList.map(err => {
            if (err.type === 'math') {
                return `${err.table} × ${err.number} = ${err.answer}`;
            } else {
                return `${err.question} → ${err.answer}`;
            }
        }).join('<br>');
        
        errorSummaryElement.innerHTML = `
            <p><strong>❌ Tes erreurs (${mistakesList.length}) :</strong></p>
            <p>${errorText}</p>
        `;
        retryErrorsBtn.style.display = 'block';
    } else {
        errorSummaryElement.innerHTML = '';
        retryErrorsBtn.style.display = 'none';
    }
}

function restartGame() {
    score = 0;
    retryScore = 0;
    questionCount = 0;
    selectedTables = [];
    selectedFrenchRules = [];
    mistakesList = [];
    isRetryMode = false;

    if (currentSubject === 'math') {
        document.querySelectorAll('#welcome-screen input[type="checkbox"]').forEach(cb => cb.checked = false);
        showScreen(welcomeScreen);
    } else {
        document.querySelectorAll('#french-welcome-screen .french-rule').forEach(cb => cb.checked = false);
        showScreen(frenchWelcomeScreen);
    }
}

function retryErrors() {
    if (mistakesList.length === 0) {
        alert('Pas d\'erreurs à refaire !');
        return;
    }

    isRetryMode = true;
    retryQuestionIndex = 0;
    scoreElement.textContent = '0';
    showScreen(retryScreen);
    document.getElementById('retry-total').textContent = mistakesList.length;
    generateRetryQuestion();
}

function generateRetryQuestion() {
    if (retryQuestionIndex >= mistakesList.length) {
        showRetryEndScreen();
        return;
    }

    currentQuestion = mistakesList[retryQuestionIndex];
    
    if (currentQuestion.type === 'math') {
        retryQuestionElement.textContent = `${currentQuestion.table} × ${currentQuestion.number} = ?`;
    } else {
        retryQuestionElement.textContent = currentQuestion.question;
    }

    retryFeedbackElement.textContent = '';
    retryFeedbackElement.className = 'feedback';
    retryAnswerInput.value = '';
    retryAnswerInput.disabled = false;
    retrySubmitBtn.disabled = false;
    retryAnswerInput.focus();
}

function checkRetryAnswer() {
    let userAnswer;
    
    if (currentSubject === 'math') {
        userAnswer = parseInt(retryAnswerInput.value);
        if (isNaN(userAnswer)) {
            retryFeedbackElement.textContent = '⚠️ Écris un nombre !';
            retryFeedbackElement.className = 'feedback incorrect';
            return;
        }
    } else {
        userAnswer = retryAnswerInput.value.trim().toLowerCase();
        if (userAnswer === '') {
            retryFeedbackElement.textContent = '⚠️ Écris une réponse !';
            retryFeedbackElement.className = 'feedback incorrect';
            return;
        }
    }

    retryAnswerInput.disabled = true;
    retrySubmitBtn.disabled = true;

    const correctAnswer = currentSubject === 'math' ? parseInt(currentQuestion.answer) : currentQuestion.answer.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        retryScore++;
        retryFeedbackElement.textContent = '✅ Bravo ! C\'est correct cette fois !';
        retryFeedbackElement.className = 'feedback correct';
    } else {
        retryFeedbackElement.textContent = `❌ Oups ! La réponse était "${currentQuestion.answer}"`;
        retryFeedbackElement.className = 'feedback incorrect';
    }

    retryScoreElement.textContent = retryScore;
    retryQuestionIndex++;
    const percentage = (retryQuestionIndex / mistakesList.length) * 100;
    retryProgressFill.style.width = percentage + '%';

    setTimeout(generateRetryQuestion, 1500);
}

function showRetryEndScreen() {
    showScreen(endScreen);
    finalScoreElement.textContent = score + retryScore;
    endTitleElement.textContent = '🎯 Retesting Terminé ! 🎯';
    
    if (retryScore === mistakesList.length) {
        endMessageElement.textContent = '🌟 Parfait ! Tu as corrigé toutes tes erreurs !';
    } else if (retryScore >= mistakesList.length * 0.8) {
        endMessageElement.textContent = '✨ Très bon ! Tu as fait de gros progrès !';
    } else {
        endMessageElement.textContent = '💪 Continue à t\'entraîner, tu vas y arriver !';
    }
    
    errorSummaryElement.innerHTML = '';
    retryErrorsBtn.style.display = 'none';
}

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
    });
    screen.classList.add('active');
}

// MODE APPRENTISSAGE
function displayLearnContent() {
    if (currentSubject === 'math') {
        const table = selectedTables[learnIndex];
        document.getElementById('learn-table').textContent = table;
        
        let content = '';
        for (let i = 1; i <= 10; i++) {
            content += `<div class="learn-item">${table} × ${i} = <span class="learn-item-result">${table * i}</span></div>`;
        }
        document.getElementById('learn-content').innerHTML = content;
    } else {
        const rule = selectedFrenchRules[learnIndex];
        const ruleData = frenchRules[rule];
        document.getElementById('learn-table').textContent = ruleData.name;
        
        let content = `<div class="learn-item"><strong>Règle : ${ruleData.rule}</strong></div><br>`;
        content += `<div class="learn-item"><strong>Exemples :</strong></div>`;
        
        ruleData.examples.forEach(ex => {
            if (ex.singular) {
                content += `<div class="learn-item">${ex.singular} → <span class="learn-item-result">${ex.plural}</span></div>`;
            } else if (ex.infinitif) {
                content += `<div class="learn-item">${ex.subject} <span class="learn-item-result">${ex.answer}</span></div>`;
            } else {
                content += `<div class="learn-item">${ex.subject} <span class="learn-item-result">${ex.verb}</span></div>`;
            }
        });
        
        content += `<br><div class="learn-item"><strong>Exercices supplémentaires :</strong></div>`;
        ruleData.exercises.slice(0, 15).forEach(ex => {
            if (ex.singular) {
                content += `<div class="learn-item">${ex.singular} → <span class="learn-item-result">${ex.plural}</span></div>`;
            } else if (ex.infinitif) {
                content += `<div class="learn-item">${ex.subject} <span class="learn-item-result">${ex.answer}</span></div>`;
            } else {
                content += `<div class="learn-item">${ex.subject} <span class="learn-item-result">${ex.verb}</span></div>`;
            }
        });
        
        document.getElementById('learn-content').innerHTML = content;
    }

    const maxIndex = currentSubject === 'math' ? selectedTables.length : selectedFrenchRules.length;
    document.getElementById('learn-prev-btn').disabled = learnIndex === 0;
    document.getElementById('learn-next-btn').disabled = learnIndex === maxIndex - 1;
}

function learnNavigate(direction) {
    const maxIndex = currentSubject === 'math' ? selectedTables.length : selectedFrenchRules.length;
    learnIndex += direction;
    if (learnIndex >= 0 && learnIndex < maxIndex) {
        displayLearnContent();
    }
}

function goBackToMenu() {
    selectedTables = [];
    selectedFrenchRules = [];
    learnIndex = 0;
    score = 0;
    questionCount = 0;
    mistakesList = [];
    isRetryMode = false;
    isQuizMode = true;
    showScreen(subjectScreen);
}

function showHint() {
    if (hintUsed) {
        alert('Tu as déjà utilisé l\'indice pour cette question !');
        return;
    }
    
    hintUsed = true;
    feedbackElement.textContent = `💡 Indice : La réponse est "${currentQuestion.answer}" (tu perdras 1 point)`;
    feedbackElement.className = 'feedback hint';
    hintBtn.disabled = true;
}

function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobile = mobileRegex.test(userAgent.toLowerCase());
    const isSmallScreen = window.innerWidth <= 768;
    return isMobile || isSmallScreen;
}

function setupMobileKeyboardFix() {
    if (!isMobileDevice()) {
        return;
    }
    
    const inputs = [answerInput, retryAnswerInput];
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            document.body.style.paddingBottom = '300px';
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
        
        input.addEventListener('blur', () => {
            document.body.style.paddingBottom = '0';
        });
    });
}

setupMobileKeyboardFix();
console.log('✅ Application prête !');
