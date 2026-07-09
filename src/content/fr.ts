/**
 * content.ts — verbatim copy from copy.md (the single source of on-page text).
 *
 * Two consumers:
 *  1. src/seed.ts populates Payload globals/collections from this module.
 *  2. src/lib/queries.ts uses it as the fallback when a global/collection is not
 *     yet seeded, so every section always renders real copy.md text — never empty,
 *     never placeholder.
 *
 * Rule (ai-usage.md §4): text here is copied exactly from copy.md. Do not paraphrase.
 */

export const SITE = {
  name: 'Eventizer',
  tagline: 'Innovate · Connect · Digitize',
  url: 'https://www.eventizer.tn',
} as const

export const NAV = {
  logoAria: 'Eventizer — retour à l’accueil',
  links: [
    { label: 'Services', href: '#services' },
    { label: 'Plateforme', href: '#plateforme' },
    { label: 'Références', href: '#references' },
    { label: 'Équipe', href: '#equipe' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: 'Demandez un devis',
  menuOpenAria: 'Ouvrir le menu de navigation',
  menuCloseAria: 'Fermer le menu de navigation',
} as const

export const SKIP_LINK = 'Passer au contenu principal'

export const HERO = {
  eyebrow: 'Agence événementielle & plateforme digitale',
  h1: 'Vos événements, maîtrisés de A à Z.',
  subheadline:
    'Eventizer réunit l’expertise d’une agence événementielle complète et la puissance d’une plateforme digitale propriétaire. Un seul interlocuteur. Zéro complication.',
  primaryCta: 'Demandez un devis',
  primaryCtaAria: 'Demander un devis pour votre événement',
  secondaryCta: 'Découvrir nos services',
  secondaryCtaAria: 'Découvrir les services d’Eventizer',
  trustStrip: '250+ événements · Djerba 2022 · Startup Innovante',
  imageAlt: 'Équipe Eventizer lors d’un congrès scientifique professionnel à Tunis',
  scrollAria: 'Défiler vers le contenu',
} as const

export const STATS = {
  sectionAria: 'Chiffres clés — Eventizer en chiffres',
  metrics: [
    { value: '250+', label: 'Événements organisés' },
    { value: '1 000+', label: 'Journalistes gérés' },
    { value: '700+', label: 'Participants digitalisés' },
    { value: '6 ans', label: 'D’expertise' },
  ],
} as const

export const PILLARS = {
  eyebrow: 'Nos expertises',
  h2: 'Quatre piliers, une seule équipe.',
  subheadline:
    'De la logistique terrain à la technologie digitale, nous couvrons chaque dimension de votre événement.',
  items: [
    {
      title: 'Management Événementiel',
      description:
        'De la planification à l’exécution complète sur le terrain. Transferts, hébergement, badging, scénographie, finances — tout est pris en charge.',
      services: [
        'Gestion des transferts et de la flotte',
        'Accueil et badging intelligent Jour J',
        'Équipement des salles de conférence',
        'Hôtellerie, restauration et dîners de gala',
      ],
      expandCta: 'En savoir plus',
      expandAria: 'En savoir plus sur le Management Événementiel',
    },
    {
      title: 'IT & Tech',
      description:
        'Une plateforme événementielle construite en interne et une équipe de développeurs seniors pour digitaliser chaque étape de votre événement.',
      services: [
        'Inscription en ligne et contrôle d’accès QR',
        'Tableaux de bord en temps réel',
        'Matchmaking B2B intégré',
        'Bornes tactiles d’inscription sur site',
      ],
      expandCta: 'En savoir plus',
      expandAria: 'En savoir plus sur notre expertise IT & Tech',
    },
    {
      title: 'Communication Digitale',
      description:
        'Stratégie social media, relations presse, créations graphiques et branding événementiel — pour que votre événement existe avant, pendant et après.',
      services: [
        'Stratégie et gestion des réseaux sociaux',
        'Relations journalistes et dossiers de presse',
        'Créations graphiques et A/B testing',
        'Identité visuelle et signalétique événementielle',
      ],
      expandCta: 'En savoir plus',
      expandAria: 'En savoir plus sur la Communication Digitale',
    },
    {
      title: 'Production Audiovisuelle',
      description:
        'Captation 4K professionnelle, montage sur place, récapitulatifs quotidiens et photobooth IA — pour garder la mémoire de chaque moment fort.',
      services: [
        'Caméras Sony FX3 et A7IV — 4K plein format',
        'Montage vidéo sur site, même jour',
        'Photobooth IA personnalisé selon le thème',
        'Couverture photo et vidéo complète',
      ],
      expandCta: 'En savoir plus',
      expandAria: 'En savoir plus sur la Production Audiovisuelle',
    },
  ],
} as const

export const PLATFORM = {
  eyebrow: 'Notre technologie',
  h2: 'La plateforme qui donne aux organisateurs le contrôle total.',
  body:
    'Développée en interne depuis 2020, la plateforme Eventizer centralise toutes les données de votre événement — inscriptions, paiements, accès, hébergement, tableaux de bord — accessibles en temps réel, depuis n’importe quel écran.',
  features: [
    'Inscription en ligne',
    'Contrôle d’accès QR',
    'Tableaux de bord live',
    'Matchmaking B2B',
    'Suivi des paiements',
    'Portail journalistes',
    'Gestion des rooming lists',
    'Notifications SMS',
  ],
  featuresAria: 'Modules de la plateforme Eventizer',
  proofPoint:
    'Utilisée officiellement pour 1 000+ journalistes au 18e Sommet de la Francophonie, Djerba 2022.',
  screenshotAlt:
    'Dashboard temps réel de la plateforme Eventizer — suivi des inscriptions, paiements et accès participants',
  cta: 'Parlons de votre projet',
  ctaAria: 'Contacter Eventizer pour discuter de votre projet événementiel',
} as const

export const CASE_STUDIES = {
  eyebrow: 'Ils nous ont fait confiance',
  h2: 'Des événements à grande échelle, livrés avec succès.',
  items: [
    {
      slug: 'sommet-francophonie-djerba-2022',
      title: '18e Sommet de la Francophonie — Djerba 2022',
      badges: ['Institutionnel', 'International'],
      keyStat: '1 000+',
      statLabel: 'journalistes accrédités',
      description:
        'Plateforme officielle d’accréditation pour les journalistes de l’ensemble des pays francophones. Centralisation, gestion des accès et communication en temps réel pour l’un des plus grands sommets internationaux.',
      imageAlt:
        '18e Sommet de la Francophonie Djerba 2022 — plateforme d’accréditation journalistes Eventizer',
    },
    {
      slug: 'journees-radiologie',
      title: '23es Journées Franco-Tunisiennes de Radiologie',
      badges: ['Congrès scientifique', 'Médical'],
      keyStat: '700+',
      statLabel: 'participants digitalisés',
      description:
        'Gestion clé en main du congrès : inscription QR, contrôle d’accès salle par salle, équipement plénière et workshops, couverture photo/vidéo et récapitulatifs vidéo quotidiens sur 3 jours.',
      imageAlt:
        'Congrès Franco-Tunisien de Radiologie — gestion événementielle et digitale par Eventizer',
    },
    {
      slug: 'osstem-meeting-tunisia',
      title: 'Osstem Meeting Tunisia',
      badges: ['Médical', 'Corporate'],
      keyStat: 'Gestion terrain',
      statLabel: 'de A à Z',
      description:
        'Accueil brandé, badging sécurisé, installation AV complète et couverture photo/vidéo — tout orchestré par l’équipe Eventizer sur site, du montage à la clôture.',
      imageAlt: 'Osstem Meeting Tunisia — gestion événementielle complète par Eventizer',
    },
    {
      slug: 'b-connected',
      title: 'B-Connected — Salon Professionnel',
      badges: ['Salon professionnel', 'B2B'],
      keyStat: '3 niveaux',
      statLabel: 'Platinum · Gold · Silver',
      description:
        'Conception du plan des stands, gestion des exposants de A à Z, vis-à-vis dédié par exposant, logistique d’installation et de désinstallation complète.',
      imageAlt:
        'B-Connected salon professionnel Tunisie — gestion exposants et plan des stands par Eventizer',
    },
  ],
} as const

// "Ils nous ont fait confiance" — references strip (editable in /admin → Sections).
export const TRUSTED = {
  eyebrow: 'Ils nous ont fait confiance',
  references: ['Sommet de la Francophonie', 'Journées de Radiologie', 'Osstem Meeting Tunisia', 'B-Connected'],
} as const

// Placeholder testimonials mapped to real Eventizer references. Attribution is
// role-based (no invented individuals) — replace with real, named, consented
// quotes before launch (seo.md/landing-page: authentic social proof converts).
export const TESTIMONIALS = {
  eyebrow: 'Témoignages',
  h2: 'La confiance de nos clients, événement après événement.',
  prevAria: 'Témoignage précédent',
  nextAria: 'Témoignage suivant',
  ticker: ['Sommet de la Francophonie', 'Journées de Radiologie', 'Osstem Meeting Tunisia', 'B-Connected'],
  items: [
    {
      quote: 'Coordonner un sommet international exige un partenaire irréprochable. Eventizer l’a été, du protocole à l’accréditation.',
      author: 'Comité d’organisation',
      role: 'Logistique & accréditation',
      company: 'Sommet de la Francophonie',
    },
    {
      quote: 'Inscriptions, contrôle d’accès, récap vidéo quotidien : notre congrès géré de A à Z, sans la moindre faille.',
      author: 'Comité scientifique',
      role: 'Congrès médical annuel',
      company: 'Journées de Radiologie',
    },
    {
      quote: 'Une équipe réactive, du premier brief à la dernière minute. Accueil, badging et régie : exécution impeccable.',
      author: 'Responsable événementiel',
      role: 'Osstem Tunisie',
      company: 'Osstem Meeting Tunisia',
    },
    {
      quote: 'Notre salon B2B n’aurait pas eu le même impact sans leur plateforme et leur production sur site.',
      author: 'Direction du salon',
      role: 'Exposants & stands',
      company: 'B-Connected',
    },
  ],
} as const

export const TEAM = {
  eyebrow: 'Notre équipe',
  h2: 'Les personnes derrière chaque événement réussi.',
  gridAria: 'L’équipe Eventizer',
  members: [
    {
      name: 'Ahmed Jamoussi',
      role: 'CEO',
      oneLiner:
        'Stratégie globale, coordination des équipes et garantie de la qualité de chaque livrable.',
      imageAlt: 'Ahmed Jamoussi, CEO chez Eventizer',
    },
    {
      name: 'Eya Houas',
      role: 'Project Manager',
      oneLiner:
        'Orchestration de tous les pôles impliqués : IT, logistique, production, communication.',
      imageAlt: 'Eya Houas, Project Manager chez Eventizer',
    },
    {
      name: 'Yassine Abbes',
      role: 'Technical Manager',
      oneLiner:
        'Architecture de la plateforme, intégration des modules et scalabilité sous pression.',
      imageAlt: 'Yassine Abbes, Technical Manager chez Eventizer',
    },
    {
      name: 'Fedi Chtourou',
      role: 'Event Manager',
      oneLiner:
        'Gestion opérationnelle terrain, participants, fournisseurs et déroulement du Jour J.',
      imageAlt: 'Fedi Chtourou, Event Manager chez Eventizer',
    },
    {
      name: 'Montassar Ben Kaddour',
      role: 'Account Manager',
      oneLiner:
        'Relations fournisseurs, suivi des livraisons et interface entre le client et les prestataires.',
      imageAlt: 'Montassar Ben Kaddour, Account Manager chez Eventizer',
    },
    {
      name: 'Fatma Saddoud',
      role: 'Marketing & Communication Manager',
      oneLiner:
        'Stratégie de communication événementielle, réseaux sociaux et supports de promotion.',
      imageAlt: 'Fatma Saddoud, Marketing & Communication Manager chez Eventizer',
    },
  ],
} as const

export const WHY = {
  eyebrow: 'Pourquoi nous choisir',
  h2: 'Un partenaire, pas un prestataire.',
  differentiators: [
    {
      title: 'Un seul interlocuteur',
      body:
        'Vous ne gérez pas dix fournisseurs. Vous nous parlez — et nous gérons tout le reste. Hôtels, transporteurs, exposants, studios : Eventizer absorbe toute la complexité de coordination, pour que vous puissiez vous concentrer sur votre événement.',
    },
    {
      title: 'Une technologie propriétaire',
      body:
        'Notre plateforme n’est pas un outil générique acheté sur étagère. Elle a été construite pour nos propres événements, affinée sur 250+ réalisations. Vous bénéficiez d’un outil éprouvé — pas d’un logiciel standard.',
    },
    {
      title: 'Une transparence totale',
      body:
        'Accès en temps réel à vos données financières, vos inscriptions, votre logistique. Pas de surprises en fin de mission, pas d’opacité sur les dépenses — une visibilité complète à chaque étape de votre projet.',
    },
  ],
} as const

// Team-building experiences. Photos reuse case-study images as placeholders —
// swap for real team-building shots before launch.
export const TEAM_BUILDING = {
  h2: 'Team Building en mode action !',
  intro: 'Des expériences immersives qui soudent vos équipes — du jeu de rôle au défi grandeur nature.',
  cta: 'Organisez votre team building',
  ctaAria: 'Demander un devis pour un team building',
  selectAria: 'Voir cette expérience de team building',
  items: [
    { title: 'Loup Garou', subtitle: 'Loup parmi nous.', image: '/images/cases/sommet.png' },
    { title: 'Le Jeu', subtitle: 'Survivre au jeu.', image: '/images/cases/radiologie.png' },
    { title: 'Arène', subtitle: 'Combattre ou mourir.', image: '/images/cases/osstem.png' },
    { title: 'Escape Game', subtitle: 'Un jeu de vie ou de mort.', image: '/images/cases/bconnected.png' },
    { title: 'Mafia', subtitle: 'Démasquez le traître.', image: '/images/cases/sommet.png' },
    { title: 'La Tribu', subtitle: 'L’union fait la force.', image: '/images/cases/radiologie.png' },
  ],
} as const

// Le Blog — editorial insights. Placeholder articles + images; swap for real
// content (or a Payload "posts" collection) before launch.
export const BLOG = {
  eyebrow: 'Le Blog',
  homeHeading: 'Conseils, retours d’expérience & tendances',
  tagline: 'De vrais retours de terrain pour concevoir des événements qui marquent les esprits.',
  taglineBold: 'Pensez. Planifiez. Performez.',
  viewAll: 'Voir tous les articles',
  listHeading: 'Le Blog',
  listSubtitle:
    'Conseils, retours d’expérience et tendances pour concevoir des événements qui marquent les esprits.',
  backToList: 'Tous les articles',
  byline: 'Par',
  ctaTitle: 'Un projet d’événement en tête ?',
  ctaSubtitle: 'Parlons-en — nous revenons vers vous sous 24 h avec une première proposition.',
  ctaLabel: 'Demandez un devis',
  readLabel: 'min de lecture',
  categories: ['Tout', 'Événementiel', 'Technologie', 'Tendances'],
  posts: [
    {
      slug: 'reussir-un-congres-checklist',
      category: 'Événementiel',
      title: 'Réussir un congrès de A à Z : la checklist complète',
      excerpt:
        'Inscription, régie, hébergement : la méthode pour piloter un congrès sans rien laisser au hasard.',
      author: 'L’équipe Eventizer',
      date: '12 mars 2026',
      readMin: 8,
      image: '/images/pillars/management.png',
      body: [
        {
          text: 'Un congrès réussi se joue bien avant le jour J. Entre la gestion des inscriptions, la coordination des intervenants et la logistique sur site, chaque détail compte — et la moindre faille se voit.',
        },
        {
          heading: 'Anticiper les inscriptions',
          text: 'Une plateforme d’inscription en ligne avec QR code et suivi en temps réel élimine les files d’attente à l’accueil. Vous savez à tout moment qui est attendu, qui est arrivé, et dans quelle salle.',
        },
        {
          heading: 'Orchestrer le jour J',
          text: 'Contrôle d’accès salle par salle, équipement des plénières et des ateliers, couverture photo et vidéo : tout se répète en amont. Une régie centralisée et un brief clair évitent l’improvisation.',
        },
        {
          text: 'Chez Eventizer, un interlocuteur unique pilote l’ensemble — de l’inscription à la clôture — pour que vous puissiez vous concentrer sur le contenu de votre congrès.',
        },
      ],
    },
    {
      slug: 'badging-qr-controle-acces',
      category: 'Technologie',
      title: 'Badging QR et contrôle d’accès : ce qui change tout le jour J',
      excerpt: 'Le badge QR n’est pas un gadget : c’est ce qui fluidifie l’accueil et sécurise vos accès.',
      author: 'L’équipe Eventizer',
      date: '5 mars 2026',
      readMin: 6,
      image: '/images/pillars/tech.png',
      body: [
        {
          text: 'Le jour J, l’accueil donne le ton. Un badging fluide rassure les participants ; une file de trente minutes les agace avant même le premier discours.',
        },
        {
          heading: 'Un scan, une seconde',
          text: 'Le QR code généré à l’inscription permet un contrôle d’accès instantané. Plus de listes papier, plus de recherche de nom : le participant scanne, le badge s’active, il entre.',
        },
        {
          heading: 'Des données qui servent',
          text: 'Chaque scan alimente vos tableaux de bord : taux de présence par salle, pics d’affluence, no-shows. Autant d’indicateurs pour ajuster en direct et mesurer l’impact après l’événement.',
        },
      ],
    },
    {
      slug: 'evenements-hybrides-2026',
      category: 'Tendances',
      title: 'Événements hybrides : ce que vos participants attendent en 2026',
      excerpt: 'Le présentiel revient, mais le distanciel reste. Voici ce que vos participants attendent vraiment.',
      author: 'L’équipe Eventizer',
      date: '26 févr. 2026',
      readMin: 7,
      image: '/images/cases/sommet.png',
      body: [
        {
          text: 'L’événement hybride n’est plus une solution de repli, c’est une attente. Vos participants veulent choisir : sur place pour le réseautage, à distance quand l’agenda l’impose.',
        },
        {
          heading: 'Une expérience, deux audiences',
          text: 'Réussir l’hybride, ce n’est pas filmer une salle. C’est concevoir un parcours pensé pour l’écran autant que pour le présentiel : interactions, sondages, sessions de networking en ligne.',
        },
        {
          heading: 'La technique au service du contenu',
          text: 'Régie multicaméra, plateforme de diffusion, modération des questions : l’infrastructure doit s’effacer pour laisser place au message. C’est tout l’enjeu de 2026.',
        },
      ],
    },
    {
      slug: 'team-building-immersif',
      category: 'Événementiel',
      title: 'Team building immersif : souder vos équipes par le jeu',
      excerpt: 'Loup-garou, escape game, défis grandeur nature : le jeu reste le meilleur ciment d’équipe.',
      author: 'L’équipe Eventizer',
      date: '18 févr. 2026',
      readMin: 5,
      image: '/images/pillars/communication.png',
      body: [
        {
          text: 'On ne soude pas une équipe avec un diaporama. Le team building immersif crée des souvenirs partagés — et c’est ce dont on se souvient des mois plus tard.',
        },
        {
          heading: 'Le jeu comme révélateur',
          text: 'Mis en situation, les collaborateurs révèlent des qualités que le quotidien masque : leadership, créativité, sang-froid. Le jeu déplace les hiérarchies et libère la parole.',
        },
        {
          heading: 'Du sur-mesure, pas du catalogue',
          text: 'Chaque équipe a sa culture. Un bon team building s’adapte à vos objectifs — cohésion, intégration, célébration — plutôt que de dérouler une animation standard.',
        },
      ],
    },
    {
      slug: 'mesurer-roi-evenement-data',
      category: 'Technologie',
      title: 'Mesurer le ROI de votre événement avec la data en temps réel',
      excerpt: 'Un événement ne se mesure pas au ressenti. La data transforme l’intuition en preuve.',
      author: 'L’équipe Eventizer',
      date: '9 févr. 2026',
      readMin: 9,
      image: '/images/pillars/audiovisuel.png',
      body: [
        {
          text: 'Combien votre événement a-t-il vraiment rapporté ? Sans données, la réponse reste une impression. Avec elles, elle devient un argument.',
        },
        {
          heading: 'Mesurer en direct',
          text: 'Inscriptions, présence, engagement, paiements : suivre ces indicateurs en temps réel permet d’agir pendant l’événement, pas seulement de constater après.',
        },
        {
          heading: 'Du tableau de bord à la décision',
          text: 'Les bons indicateurs ne servent pas à remplir un rapport. Ils éclairent vos prochains arbitrages : quel format garder, quel créneau privilégier, où réinvestir.',
        },
      ],
    },
    {
      slug: 'salons-professionnels-presentiel',
      category: 'Tendances',
      title: 'Salons professionnels : le grand retour du présentiel',
      excerpt: 'Le salon B2B retrouve son public. À condition de soigner l’expérience exposant comme visiteur.',
      author: 'L’équipe Eventizer',
      date: '2 févr. 2026',
      readMin: 6,
      image: '/images/cases/bconnected.png',
      body: [
        {
          text: 'Après des années d’incertitude, le présentiel B2B repart fort. Mais les attentes ont changé : on ne vient plus seulement voir, on vient vivre et rencontrer.',
        },
        {
          heading: 'L’exposant au centre',
          text: 'Plan des stands optimisé, vis-à-vis dédié, logistique d’installation sans accroc : un exposant serein vend mieux. Son expérience conditionne le succès du salon.',
        },
        {
          heading: 'Le matchmaking, nouvel argument',
          text: 'Mettre en relation les bons profils — visiteurs et exposants — avant même l’ouverture maximise les rendez-vous qualifiés. Le hasard ne suffit plus.',
        },
      ],
    },
  ],
} as const

export type BlogPost = (typeof BLOG.posts)[number]

export const CONTACT = {
  eyebrow: 'Parlons de votre projet',
  h2: 'Prêt à organiser quelque chose de mémorable ?',
  subheadline:
    'Décrivez-nous votre événement — nous revenons vers vous dans les 24 heures avec une première proposition.',
  formAria: 'Formulaire de demande de devis',
  fields: {
    firstName: { label: 'Prénom', placeholder: 'Marie' },
    lastName: { label: 'Nom', placeholder: 'Dupont' },
    email: { label: 'Email professionnel', placeholder: 'marie.dupont@entreprise.com' },
    phone: { label: 'Téléphone', placeholder: '+216 XX XXX XXX' },
    eventType: { label: 'Type d’événement', placeholder: 'Choisissez un type' },
    message: {
      label: 'Votre message',
      placeholder:
        'Décrivez votre événement : type, date estimée, nombre de participants…',
    },
  },
  eventTypeOptions: [
    'Congrès scientifique',
    'Salon professionnel',
    'Séminaire',
    'Team building',
    'Dîner de gala',
    'Autre',
  ],
  submit: 'Envoyer ma demande',
  submitAria: 'Envoyer le formulaire de demande de devis',
  loading: 'Envoi en cours…',
  loadingAria: 'Envoi du formulaire en cours, veuillez patienter',
  reassurance: 'Réponse sous 24h — aucun engagement requis.',
  errors: {
    firstNameRequired: 'Votre prénom est requis.',
    firstNameShort: 'Votre prénom doit contenir au moins 2 caractères.',
    lastNameRequired: 'Votre nom est requis.',
    emailRequired: 'Votre email est requis.',
    emailInvalid:
      'Cet email ne semble pas valide. Vérifiez le format (ex : nom@entreprise.com).',
    phoneRequired: 'Votre numéro de téléphone est requis.',
    phoneInvalid: 'Ce numéro ne semble pas valide. Utilisez le format +216 XX XXX XXX.',
    eventTypeRequired:
      'Sélectionnez le type d’événement pour nous aider à vous orienter.',
    messageRequired:
      'Décrivez brièvement votre événement pour que nous puissions vous répondre précisément.',
    messageShort:
      'Ajoutez quelques détails sur votre événement — date, lieu, nombre de participants.',
  },
  success: {
    title: 'Votre demande a bien été envoyée.',
    body:
      'Nous vous répondons dans les 24 heures avec une première proposition adaptée à votre événement.',
    altPrompt: 'En attendant, vous pouvez nous joindre directement :',
  },
  systemError:
    'L’envoi a échoué. Vérifiez votre connexion et réessayez. Si le problème persiste, contactez-nous directement.',
  details: {
    heading: 'Ou contactez-nous directement',
    phoneAria: 'Appeler Eventizer',
    emailAria: 'Envoyer un email à Eventizer',
    whatsapp: 'Écrire sur WhatsApp',
    whatsappAria: 'Contacter Eventizer via WhatsApp',
    availability: 'Disponible du lundi au vendredi, 9h – 18h',
  },
} as const

/**
 * Contact coordinates. copy.md / seo.md carry placeholders (e.g. +216 XX XXX XXX);
 * these are not invented numbers — they are wired through ContactInfo (editable in
 * Payload) and must be replaced with the real values before launch. tel:/wa.me links
 * derive from `phoneHref` / `whatsappNumber` (digits only, no spaces).
 */
export const CONTACT_INFO = {
  phoneDisplay: '+216 XX XXX XXX',
  phoneHref: '+216XXXXXXXX',
  email: 'contact@eventizer.tn',
  whatsappNumber: '216XXXXXXXX',
} as const

export const FOOTER = {
  logoAria: 'Eventizer — retour à l’accueil',
  tagline: 'Innovate · Connect · Digitize',
  links: [
    { label: 'Services', href: '#services' },
    { label: 'Plateforme', href: '#plateforme' },
    { label: 'Références', href: '#references' },
    { label: 'Équipe', href: '#equipe' },
    { label: 'Contact', href: '#contact' },
  ],
  legalLink: 'Mentions légales',
  copyright: '© 2026 Eventizer. Tous droits réservés.',
  social: [
    { label: 'Eventizer sur LinkedIn', href: 'https://www.linkedin.com/company/eventizer', name: 'LinkedIn' },
    { label: 'Eventizer sur Instagram', href: 'https://www.instagram.com/eventizer.tn', name: 'Instagram' },
    { label: 'Eventizer sur Facebook', href: 'https://www.facebook.com/eventizer.tn', name: 'Facebook' },
  ],
} as const
