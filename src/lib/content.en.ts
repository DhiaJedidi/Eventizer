/**
 * content.en.ts — English mirror of content.ts (the single source of on-page text).
 *
 * Two consumers:
 *  1. src/seed.ts populates Payload globals/collections from this module.
 *  2. src/lib/queries.ts uses it as the fallback when a global/collection is not
 *     yet seeded, so every section always renders real copy — never empty,
 *     never placeholder.
 *
 * Structural mirror of content.ts with all user-facing text translated to English.
 */

export const SITE = {
  name: 'Eventizer',
  tagline: 'Innovate · Connect · Digitize',
  url: 'https://www.eventizer.tn',
} as const

export const NAV = {
  logoAria: 'Eventizer — back to home',
  links: [
    { label: 'Services', href: '#services' },
    { label: 'Platform', href: '#plateforme' },
    { label: 'References', href: '#references' },
    { label: 'Team', href: '#equipe' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ],
  cta: 'Request a quote',
  menuOpenAria: 'Open the navigation menu',
  menuCloseAria: 'Close the navigation menu',
} as const

export const SKIP_LINK = 'Skip to main content'

export const HERO = {
  eyebrow: 'Event agency & digital platform',
  h1: 'Your events, mastered from A to Z.',
  subheadline:
    'Eventizer combines the expertise of a full-service event agency with the power of a proprietary digital platform. One single point of contact. Zero hassle.',
  primaryCta: 'Request a quote',
  primaryCtaAria: 'Request a quote for your event',
  secondaryCta: 'Discover our services',
  secondaryCtaAria: "Discover Eventizer's services",
  trustStrip: '250+ events · Djerba 2022 · Innovative Startup',
  imageAlt: 'Eventizer team at a professional scientific congress in Tunis',
  scrollAria: 'Scroll to content',
} as const

export const STATS = {
  sectionAria: 'Key figures — Eventizer in numbers',
  metrics: [
    { value: '250+', label: 'Events organized' },
    { value: '1 000+', label: 'Journalists managed' },
    { value: '700+', label: 'Participants digitized' },
    { value: '6 ans', label: 'Of expertise' },
  ],
} as const

export const PILLARS = {
  eyebrow: 'Our expertise',
  h2: 'Four pillars, one single team.',
  subheadline:
    'From on-the-ground logistics to digital technology, we cover every dimension of your event.',
  items: [
    {
      title: 'Event Management',
      description:
        'From planning to full on-site execution. Transfers, accommodation, badging, scenography, finances — everything is taken care of.',
      services: [
        'Transfer and fleet management',
        'Smart welcome and badging on the day',
        'Conference room equipment',
        'Hospitality, catering and gala dinners',
      ],
      expandCta: 'Learn more',
      expandAria: 'Learn more about Event Management',
    },
    {
      title: 'IT & Tech',
      description:
        'An in-house event platform and a team of senior developers to digitize every stage of your event.',
      services: [
        'Online registration and QR access control',
        'Real-time dashboards',
        'Integrated B2B matchmaking',
        'On-site touchscreen registration kiosks',
      ],
      expandCta: 'Learn more',
      expandAria: 'Learn more about our IT & Tech expertise',
    },
    {
      title: 'Digital Communication',
      description:
        'Social media strategy, press relations, graphic design and event branding — so your event exists before, during and after.',
      services: [
        'Social media strategy and management',
        'Journalist relations and press kits',
        'Graphic design and A/B testing',
        'Visual identity and event signage',
      ],
      expandCta: 'Learn more',
      expandAria: 'Learn more about Digital Communication',
    },
    {
      title: 'Audiovisual Production',
      description:
        'Professional 4K capture, on-site editing, daily recaps and an AI photobooth — to preserve the memory of every highlight.',
      services: [
        'Sony FX3 and A7IV cameras — full-frame 4K',
        'On-site video editing, same day',
        'AI photobooth customized to the theme',
        'Full photo and video coverage',
      ],
      expandCta: 'Learn more',
      expandAria: 'Learn more about Audiovisual Production',
    },
  ],
} as const

export const PLATFORM = {
  eyebrow: 'Our technology',
  h2: 'The platform that gives organizers total control.',
  body:
    'Developed in-house since 2020, the Eventizer platform centralizes all of your event data — registrations, payments, access, accommodation, dashboards — accessible in real time, from any screen.',
  features: [
    'Online registration',
    'QR access control',
    'Live dashboards',
    'B2B matchmaking',
    'Payment tracking',
    'Journalist portal',
    'Rooming list management',
    'SMS notifications',
  ],
  featuresAria: 'Eventizer platform modules',
  proofPoint:
    'Officially used for 1,000+ journalists at the 18th Francophonie Summit, Djerba 2022.',
  screenshotAlt:
    'Real-time dashboard of the Eventizer platform — tracking registrations, payments and participant access',
  cta: "Let's talk about your project",
  ctaAria: 'Contact Eventizer to discuss your event project',
} as const

export const CASE_STUDIES = {
  eyebrow: 'They trusted us',
  h2: 'Large-scale events, delivered successfully.',
  items: [
    {
      slug: 'sommet-francophonie-djerba-2022',
      title: '18th Francophonie Summit — Djerba 2022',
      badges: ['Institutional', 'International'],
      keyStat: '1 000+',
      statLabel: 'accredited journalists',
      description:
        'Official accreditation platform for journalists from every Francophone country. Centralization, access management and real-time communication for one of the largest international summits.',
      imageAlt:
        '18th Francophonie Summit Djerba 2022 — Eventizer journalist accreditation platform',
    },
    {
      slug: 'journees-radiologie',
      title: '23rd Franco-Tunisian Radiology Days',
      badges: ['Scientific congress', 'Medical'],
      keyStat: '700+',
      statLabel: 'participants digitized',
      description:
        'Turnkey management of the congress: QR registration, room-by-room access control, plenary and workshop equipment, photo/video coverage and daily video recaps over 3 days.',
      imageAlt:
        'Franco-Tunisian Radiology Congress — event and digital management by Eventizer',
    },
    {
      slug: 'osstem-meeting-tunisia',
      title: 'Osstem Meeting Tunisia',
      badges: ['Medical', 'Corporate'],
      keyStat: 'On-site management',
      statLabel: 'from A to Z',
      description:
        'Branded welcome, secure badging, complete AV setup and photo/video coverage — all orchestrated by the Eventizer team on site, from setup to closing.',
      imageAlt: 'Osstem Meeting Tunisia — complete event management by Eventizer',
    },
    {
      slug: 'b-connected',
      title: 'B-Connected — Trade Show',
      badges: ['Trade show', 'B2B'],
      keyStat: '3 niveaux',
      statLabel: 'Platinum · Gold · Silver',
      description:
        'Booth floor plan design, end-to-end exhibitor management, a dedicated contact per exhibitor, and complete setup and teardown logistics.',
      imageAlt:
        'B-Connected trade show Tunisia — exhibitor management and booth floor plan by Eventizer',
    },
  ],
} as const

// "They trusted us" — references strip (editable in /admin → Sections).
export const TRUSTED = {
  eyebrow: 'They trusted us',
  references: ['Sommet de la Francophonie', 'Journées de Radiologie', 'Osstem Meeting Tunisia', 'B-Connected'],
} as const

// Placeholder testimonials mapped to real Eventizer references. Attribution is
// role-based (no invented individuals) — replace with real, named, consented
// quotes before launch (seo.md/landing-page: authentic social proof converts).
export const TESTIMONIALS = {
  eyebrow: 'Testimonials',
  h2: 'Our clients trust us, event after event.',
  prevAria: 'Previous testimonial',
  nextAria: 'Next testimonial',
  ticker: ['Sommet de la Francophonie', 'Journées de Radiologie', 'Osstem Meeting Tunisia', 'B-Connected'],
  items: [
    {
      quote: 'Coordinating an international summit demands a flawless partner. Eventizer was exactly that, from protocol to accreditation.',
      author: "Comité d'organisation",
      role: 'Logistics & accreditation',
      company: 'Sommet de la Francophonie',
    },
    {
      quote: 'Registrations, access control, daily video recaps: our congress managed from A to Z, without a single hitch.',
      author: 'Comité scientifique',
      role: 'Annual medical congress',
      company: 'Journées de Radiologie',
    },
    {
      quote: 'A responsive team, from the first brief to the last minute. Welcome, badging and production: flawless execution.',
      author: 'Responsable événementiel',
      role: 'Osstem Tunisie',
      company: 'Osstem Meeting Tunisia',
    },
    {
      quote: "Our B2B trade show wouldn't have had the same impact without their platform and their on-site production.",
      author: 'Direction du salon',
      role: 'Exhibitors & booths',
      company: 'B-Connected',
    },
  ],
} as const

export const TEAM = {
  eyebrow: 'Our team',
  h2: 'The people behind every successful event.',
  gridAria: 'The Eventizer team',
  members: [
    {
      name: 'Ahmed Jamoussi',
      role: 'CEO',
      oneLiner:
        'Overall strategy, team coordination and quality assurance for every deliverable.',
      imageAlt: 'Ahmed Jamoussi, CEO at Eventizer',
    },
    {
      name: 'Eya Houas',
      role: 'Project Manager',
      oneLiner:
        'Orchestrating every team involved: IT, logistics, production, communication.',
      imageAlt: 'Eya Houas, Project Manager at Eventizer',
    },
    {
      name: 'Yassine Abbes',
      role: 'Technical Manager',
      oneLiner:
        'Platform architecture, module integration and scalability under pressure.',
      imageAlt: 'Yassine Abbes, Technical Manager at Eventizer',
    },
    {
      name: 'Fedi Chtourou',
      role: 'Event Manager',
      oneLiner:
        'On-the-ground operational management of participants, suppliers and the flow of the big day.',
      imageAlt: 'Fedi Chtourou, Event Manager at Eventizer',
    },
    {
      name: 'Montassar Ben Kaddour',
      role: 'Account Manager',
      oneLiner:
        'Supplier relations, delivery tracking and the interface between the client and vendors.',
      imageAlt: 'Montassar Ben Kaddour, Account Manager at Eventizer',
    },
    {
      name: 'Fatma Saddoud',
      role: 'Marketing & Communication Manager',
      oneLiner:
        'Event communication strategy, social media and promotional materials.',
      imageAlt: 'Fatma Saddoud, Marketing & Communication Manager at Eventizer',
    },
  ],
} as const

export const WHY = {
  eyebrow: 'Why choose us',
  h2: 'A partner, not a vendor.',
  differentiators: [
    {
      title: 'One single point of contact',
      body:
        "You don't manage ten suppliers. You talk to us — and we handle everything else. Hotels, transporters, exhibitors, studios: Eventizer absorbs all the coordination complexity, so you can focus on your event.",
    },
    {
      title: 'Proprietary technology',
      body:
        "Our platform isn't a generic off-the-shelf tool. It was built for our own events, refined over 250+ projects. You get a proven tool — not standard software.",
    },
    {
      title: 'Total transparency',
      body:
        'Real-time access to your financial data, your registrations, your logistics. No surprises at the end of the assignment, no opacity on spending — complete visibility at every stage of your project.',
    },
  ],
} as const

// Team-building experiences. Photos reuse case-study images as placeholders —
// swap for real team-building shots before launch.
export const TEAM_BUILDING = {
  h2: 'Team Building in action mode!',
  intro: 'Immersive experiences that bond your teams — from role-play to life-size challenges.',
  cta: 'Organize your team building',
  ctaAria: 'Request a quote for a team building',
  selectAria: 'View this team building experience',
  items: [
    { title: 'Werewolf', subtitle: 'A wolf among us.', image: '/images/cases/sommet.png' },
    { title: 'The Game', subtitle: 'Survive the game.', image: '/images/cases/radiologie.png' },
    { title: 'Arena', subtitle: 'Fight or die.', image: '/images/cases/osstem.png' },
    { title: 'Escape Game', subtitle: 'A game of life or death.', image: '/images/cases/bconnected.png' },
    { title: 'Mafia', subtitle: 'Unmask the traitor.', image: '/images/cases/sommet.png' },
    { title: 'The Tribe', subtitle: 'Strength in unity.', image: '/images/cases/radiologie.png' },
  ],
} as const

// Le Blog — editorial insights. Placeholder articles + images; swap for real
// content (or a Payload "posts" collection) before launch.
export const BLOG = {
  eyebrow: 'The Blog',
  homeHeading: 'Tips, field insights & trends',
  tagline: 'Real field insights to design events that leave a lasting impression.',
  taglineBold: 'Think. Plan. Perform.',
  viewAll: 'View all articles',
  listHeading: 'The Blog',
  listSubtitle:
    'Tips, field insights and trends to design events that leave a lasting impression.',
  backToList: 'All articles',
  byline: 'By',
  ctaTitle: 'Got an event project in mind?',
  ctaSubtitle: "Let's talk about it — we'll get back to you within 24 hours with a first proposal.",
  ctaLabel: 'Request a quote',
  readLabel: 'min read',
  categories: ['All', 'Events', 'Technology', 'Trends'],
  posts: [
    {
      slug: 'reussir-un-congres-checklist',
      category: 'Events',
      title: 'Nailing a congress from A to Z: the complete checklist',
      excerpt:
        'Registration, production, accommodation: the method to run a congress leaving nothing to chance.',
      author: 'The Eventizer team',
      date: 'March 12, 2026',
      readMin: 8,
      image: '/images/pillars/management.png',
      body: [
        {
          text: 'A successful congress is won well before the big day. Between managing registrations, coordinating speakers and on-site logistics, every detail counts — and the slightest flaw shows.',
        },
        {
          heading: 'Anticipating registrations',
          text: 'An online registration platform with a QR code and real-time tracking eliminates queues at the welcome desk. At any moment you know who is expected, who has arrived, and in which room.',
        },
        {
          heading: 'Orchestrating the big day',
          text: 'Room-by-room access control, plenary and workshop equipment, photo and video coverage: everything is rehearsed upstream. A centralized production desk and a clear brief prevent improvisation.',
        },
        {
          text: 'At Eventizer, a single point of contact drives everything — from registration to closing — so you can focus on the content of your congress.',
        },
      ],
    },
    {
      slug: 'badging-qr-controle-acces',
      category: 'Technology',
      title: 'QR badging and access control: what changes everything on the big day',
      excerpt: "The QR badge isn't a gimmick: it's what streamlines the welcome and secures your access.",
      author: 'The Eventizer team',
      date: 'March 5, 2026',
      readMin: 6,
      image: '/images/pillars/tech.png',
      body: [
        {
          text: 'On the big day, the welcome sets the tone. Smooth badging reassures participants; a thirty-minute queue annoys them before the first speech.',
        },
        {
          heading: 'One scan, one second',
          text: 'The QR code generated at registration enables instant access control. No more paper lists, no more searching for names: the participant scans, the badge activates, they walk in.',
        },
        {
          heading: 'Data that serves a purpose',
          text: 'Every scan feeds your dashboards: attendance rate per room, peak times, no-shows. All indicators to adjust live and measure impact after the event.',
        },
      ],
    },
    {
      slug: 'evenements-hybrides-2026',
      category: 'Trends',
      title: 'Hybrid events: what your attendees expect in 2026',
      excerpt: 'In-person is back, but remote is here to stay. Here is what your attendees really expect.',
      author: 'The Eventizer team',
      date: 'Feb. 26, 2026',
      readMin: 7,
      image: '/images/cases/sommet.png',
      body: [
        {
          text: "The hybrid event is no longer a fallback, it's an expectation. Your attendees want to choose: on site for networking, remote when the schedule demands it.",
        },
        {
          heading: 'One experience, two audiences',
          text: "Succeeding at hybrid isn't about filming a room. It's about designing a journey conceived for the screen as much as for in-person: interactions, polls, online networking sessions.",
        },
        {
          heading: 'Technology in service of content',
          text: 'Multi-camera production, streaming platform, question moderation: the infrastructure must fade away to make room for the message. That is the whole challenge of 2026.',
        },
      ],
    },
    {
      slug: 'team-building-immersif',
      category: 'Events',
      title: 'Immersive team building: bonding your teams through play',
      excerpt: 'Werewolf, escape game, life-size challenges: play remains the best team glue.',
      author: 'The Eventizer team',
      date: 'Feb. 18, 2026',
      readMin: 5,
      image: '/images/pillars/communication.png',
      body: [
        {
          text: "You don't bond a team with a slideshow. Immersive team building creates shared memories — and that's what people remember months later.",
        },
        {
          heading: 'Play as a revealer',
          text: 'Placed in real situations, employees reveal qualities that daily routine hides: leadership, creativity, composure. Play shifts hierarchies and frees up speech.',
        },
        {
          heading: 'Tailor-made, not off-the-shelf',
          text: 'Every team has its own culture. Good team building adapts to your goals — cohesion, onboarding, celebration — rather than rolling out a standard activity.',
        },
      ],
    },
    {
      slug: 'mesurer-roi-evenement-data',
      category: 'Technology',
      title: 'Measuring your event ROI with real-time data',
      excerpt: "An event isn't measured by gut feeling. Data turns intuition into proof.",
      author: 'The Eventizer team',
      date: 'Feb. 9, 2026',
      readMin: 9,
      image: '/images/pillars/audiovisuel.png',
      body: [
        {
          text: 'How much did your event really bring in? Without data, the answer remains an impression. With it, it becomes an argument.',
        },
        {
          heading: 'Measuring in real time',
          text: 'Registrations, attendance, engagement, payments: tracking these indicators in real time lets you act during the event, not just report on it afterwards.',
        },
        {
          heading: 'From dashboard to decision',
          text: "The right indicators aren't there to fill a report. They inform your next trade-offs: which format to keep, which slot to favor, where to reinvest.",
        },
      ],
    },
    {
      slug: 'salons-professionnels-presentiel',
      category: 'Trends',
      title: 'Trade shows: the great return of in-person',
      excerpt: 'The B2B trade show is finding its audience again. Provided you take care of both the exhibitor and visitor experience.',
      author: 'The Eventizer team',
      date: 'Feb. 2, 2026',
      readMin: 6,
      image: '/images/cases/bconnected.png',
      body: [
        {
          text: "After years of uncertainty, in-person B2B is bouncing back strong. But expectations have changed: people no longer come just to look, they come to experience and to meet.",
        },
        {
          heading: 'The exhibitor at the center',
          text: 'An optimized booth floor plan, a dedicated contact, seamless setup logistics: a relaxed exhibitor sells better. Their experience determines the success of the show.',
        },
        {
          heading: 'Matchmaking, the new argument',
          text: 'Connecting the right profiles — visitors and exhibitors — even before the doors open maximizes qualified meetings. Chance is no longer enough.',
        },
      ],
    },
  ],
} as const

export type BlogPost = (typeof BLOG.posts)[number]

export const CONTACT = {
  eyebrow: "Let's talk about your project",
  h2: 'Ready to organize something memorable?',
  subheadline:
    "Tell us about your event — we'll get back to you within 24 hours with a first proposal.",
  formAria: 'Quote request form',
  fields: {
    firstName: { label: 'First name', placeholder: 'Marie' },
    lastName: { label: 'Last name', placeholder: 'Dupont' },
    email: { label: 'Business email', placeholder: 'marie.dupont@entreprise.com' },
    phone: { label: 'Phone', placeholder: '+216 XX XXX XXX' },
    eventType: { label: 'Event type', placeholder: 'Choose a type' },
    message: {
      label: 'Your message',
      placeholder:
        'Describe your event: type, estimated date, number of participants…',
    },
  },
  eventTypeOptions: [
    'Scientific congress',
    'Trade show',
    'Seminar',
    'Team building',
    'Gala dinner',
    'Other',
  ],
  submit: 'Send my request',
  submitAria: 'Submit the quote request form',
  loading: 'Sending…',
  loadingAria: 'Form submission in progress, please wait',
  reassurance: 'Reply within 24h — no commitment required.',
  errors: {
    firstNameRequired: 'Your first name is required.',
    firstNameShort: 'Your first name must be at least 2 characters.',
    lastNameRequired: 'Your last name is required.',
    emailRequired: 'Your email is required.',
    emailInvalid:
      "This email doesn't look valid. Check the format (e.g. name@company.com).",
    phoneRequired: 'Your phone number is required.',
    phoneInvalid: "This number doesn't look valid. Use the format +216 XX XXX XXX.",
    eventTypeRequired:
      'Select the event type to help us point you in the right direction.',
    messageRequired:
      'Briefly describe your event so we can give you an accurate answer.',
    messageShort:
      'Add a few details about your event — date, location, number of participants.',
  },
  success: {
    title: 'Your request has been sent.',
    body:
      'We will reply within 24 hours with a first proposal tailored to your event.',
    altPrompt: 'In the meantime, you can reach us directly:',
  },
  systemError:
    'Sending failed. Check your connection and try again. If the problem persists, contact us directly.',
  details: {
    heading: 'Or contact us directly',
    phoneAria: 'Call Eventizer',
    emailAria: 'Send an email to Eventizer',
    whatsapp: 'Message on WhatsApp',
    whatsappAria: 'Contact Eventizer via WhatsApp',
    availability: 'Available Monday to Friday, 9am – 6pm',
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
  logoAria: 'Eventizer — back to home',
  tagline: 'Innovate · Connect · Digitize',
  links: [
    { label: 'Services', href: '#services' },
    { label: 'Platform', href: '#plateforme' },
    { label: 'References', href: '#references' },
    { label: 'Team', href: '#equipe' },
    { label: 'Contact', href: '#contact' },
  ],
  legalLink: 'Legal notice',
  copyright: '© 2026 Eventizer. All rights reserved.',
  social: [
    { label: 'Eventizer on LinkedIn', href: 'https://www.linkedin.com/company/eventizer', name: 'LinkedIn' },
    { label: 'Eventizer on Instagram', href: 'https://www.instagram.com/eventizer.tn', name: 'Instagram' },
    { label: 'Eventizer on Facebook', href: 'https://www.facebook.com/eventizer.tn', name: 'Facebook' },
  ],
} as const
