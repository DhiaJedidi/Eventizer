# copy.md — Eventizer Landing Page Copy

> Written by a UX writer applying the four quality standards: Purposeful · Concise · Conversational · Clear.
> All copy is in French, "vous" register. Use exactly as written. Do not paraphrase, do not improve without explicit instruction.
> Character counts are provided — respect them. Every label, error, success state, and ARIA string is included.

---

## Voice at a glance

| Principle | Application |
|---|---|
| **Confident, not boastful** | Lead with numbers and outcomes. Let facts speak. |
| **Clear over clever** | No wordplay that could confuse. Say what you mean. |
| **Active voice (85%)** | "Eventizer gère" not "est géré par Eventizer" |
| **Purposeful brevity** | Every word earns its place. Cut the rest. |
| **Human warmth** | Professional but never cold. Acknowledges the user's reality. |

---

## Navbar

| Element | Copy | Notes |
|---|---|---|
| Logo `aria-label` | `Eventizer — retour à l'accueil` | Screen reader only |
| Nav link 1 | `Services` | Anchor: `#services` |
| Nav link 2 | `Plateforme` | Anchor: `#plateforme` |
| Nav link 3 | `Références` | Anchor: `#references` |
| Nav link 4 | `Équipe` | Anchor: `#equipe` |
| Nav link 5 | `Contact` | Anchor: `#contact` |
| CTA button | `Demandez un devis` | Links to `#contact` |
| Mobile menu `aria-label` (closed) | `Ouvrir le menu de navigation` | |
| Mobile menu `aria-label` (open) | `Fermer le menu de navigation` | |

---

## Hero

**Eyebrow** (small label above H1, 42 chars)
```
Agence événementielle & plateforme digitale
```

**H1 headline** (47 chars — primary keyword included naturally)
```
Vos événements, maîtrisés de A à Z.
```

> UX rationale: Short, direct, outcome-framed. The user's goal (mastery, control) is the subject — not Eventizer's features. Period adds authority.

**Subheadline** (167 chars — explains the unique positioning)
```
Eventizer réunit l'expertise d'une agence événementielle complète 
et la puissance d'une plateforme digitale propriétaire. 
Un seul interlocuteur. Zéro complication.
```

> UX rationale: Two sentences do two jobs — establishes dual identity, then resolves the implied user pain (vendor juggling) in six words.

**Primary CTA button** (18 chars)
```
Demandez un devis
```
`aria-label`: `Demander un devis pour votre événement`

**Secondary CTA button** (23 chars)
```
Découvrir nos services
```
`aria-label`: `Découvrir les services d'Eventizer`

**Hero trust strip** (below CTAs, 3 items inline)
```
250+ événements · Djerba 2022 · Startup Innovante
```

**Hero image alt**
```
Équipe Eventizer lors d'un congrès scientifique professionnel à Tunis
```

**Scroll indicator aria-label**
```
Défiler vers le contenu
```

---

## Stats (Chiffres clés)

**Section aria-label**
```
Chiffres clés — Eventizer en chiffres
```

| Stat | Label | Notes |
|---|---|---|
| `250+` | `Événements organisés` | |
| `1 000+` | `Journalistes gérés` | |
| `700+` | `Participants digitalisés` | |
| `6 ans` | `D'expertise` | |

> UX rationale: Labels use past-tense nouns ("organisés") not present ("en cours") — signals proven track record, not current capacity. "Digitalisés" is specific to Eventizer's platform — not generic.

---

## Pillars (Les 4 piliers)

**Section eyebrow**
```
Nos expertises
```

**Section H2** (40 chars)
```
Quatre piliers, une seule équipe.
```

**Section subheadline** (113 chars)
```
De la logistique terrain à la technologie digitale, 
nous couvrons chaque dimension de votre événement.
```

---

### Pillar 1 — Management Événementiel

**H3**
```
Management Événementiel
```

**Description** (max 20 words)
```
De la planification à l'exécution complète sur le terrain. 
Transferts, hébergement, badging, scénographie, finances — tout est pris en charge.
```

**Service list** (4 items, max 7 words each)
```
• Gestion des transferts et de la flotte
• Accueil et badging intelligent Jour J
• Équipement des salles de conférence
• Hôtellerie, restauration et dîners de gala
```

**Expand CTA**
```
En savoir plus
```
`aria-label`: `En savoir plus sur le Management Événementiel`

---

### Pillar 2 — IT & Tech

**H3**
```
IT & Tech
```

**Description** (max 20 words)
```
Une plateforme événementielle construite en interne et une équipe de développeurs 
seniors pour digitaliser chaque étape de votre événement.
```

**Service list**
```
• Inscription en ligne et contrôle d'accès QR
• Tableaux de bord en temps réel
• Matchmaking B2B intégré
• Bornes tactiles d'inscription sur site
```

**Expand CTA**
```
En savoir plus
```
`aria-label`: `En savoir plus sur notre expertise IT & Tech`

---

### Pillar 3 — Communication Digitale

**H3**
```
Communication Digitale
```

**Description** (max 20 words)
```
Stratégie social media, relations presse, créations graphiques et branding événementiel — 
pour que votre événement existe avant, pendant et après.
```

**Service list**
```
• Stratégie et gestion des réseaux sociaux
• Relations journalistes et dossiers de presse
• Créations graphiques et A/B testing
• Identité visuelle et signalétique événementielle
```

**Expand CTA**
```
En savoir plus
```
`aria-label`: `En savoir plus sur la Communication Digitale`

---

### Pillar 4 — Production Audiovisuelle

**H3**
```
Production Audiovisuelle
```

**Description** (max 20 words)
```
Captation 4K professionnelle, montage sur place, récapitulatifs quotidiens et photobooth IA — 
pour garder la mémoire de chaque moment fort.
```

**Service list**
```
• Caméras Sony FX3 et A7IV — 4K plein format
• Montage vidéo sur site, même jour
• Photobooth IA personnalisé selon le thème
• Couverture photo et vidéo complète
```

**Expand CTA**
```
En savoir plus
```
`aria-label`: `En savoir plus sur la Production Audiovisuelle`

---

## Platform (Notre plateforme)

**Section eyebrow**
```
Notre technologie
```

**H2** (60 chars)
```
La plateforme qui donne aux organisateurs le contrôle total.
```

> UX rationale: "contrôle total" mirrors the user's goal. "Aux organisateurs" — user-centered, second-person equivalent. Not "notre plateforme qui permet de…" (features-first) but "la plateforme qui donne… le contrôle" (outcome-first).

**Body** (max 40 words)
```
Développée en interne depuis 2020, la plateforme Eventizer centralise toutes les données 
de votre événement — inscriptions, paiements, accès, hébergement, tableaux de bord — 
accessibles en temps réel, depuis n'importe quel écran.
```

**Feature list** (8 items — label only, icons in design system)
```
Inscription en ligne
Contrôle d'accès QR
Tableaux de bord live
Matchmaking B2B
Suivi des paiements
Portail journalistes
Gestion des rooming lists
Notifications SMS
```

**Feature list aria-label** (section)
```
Modules de la plateforme Eventizer
```

**Proof point callout** (95 chars)
```
Utilisée officiellement pour 1 000+ journalistes au 18e Sommet de la Francophonie, Djerba 2022.
```

> UX rationale: Verifiable, specific, prestigious. Not "utilisée lors de grands événements" — that's vague. This claim is publicly verifiable.

**Platform screenshot alt**
```
Dashboard temps réel de la plateforme Eventizer — suivi des inscriptions, paiements et accès participants
```

**CTA button**
```
Parlons de votre projet
```
`aria-label`: `Contacter Eventizer pour discuter de votre projet événementiel`

---

## Case Studies (Références)

**Section eyebrow**
```
Ils nous ont fait confiance
```

**H2** (52 chars)
```
Des événements à grande échelle, livrés avec succès.
```

---

### Case 1 — Sommet de la Francophonie

**H3**
```
18e Sommet de la Francophonie — Djerba 2022
```

**Badges**
```
Institutionnel   International
```

**Key stat**
```
1 000+
```
**Stat label**
```
journalistes accrédités
```

**Description** (max 35 words)
```
Plateforme officielle d'accréditation pour les journalistes de l'ensemble des pays francophones. 
Centralisation, gestion des accès et communication en temps réel pour l'un des plus grands sommets internationaux.
```

**Image alt**
```
18e Sommet de la Francophonie Djerba 2022 — plateforme d'accréditation journalistes Eventizer
```

---

### Case 2 — Journées de Radiologie

**H3**
```
23es Journées Franco-Tunisiennes de Radiologie
```

**Badges**
```
Congrès scientifique   Médical
```

**Key stat**
```
700+
```
**Stat label**
```
participants digitalisés
```

**Description** (max 35 words)
```
Gestion clé en main du congrès : inscription QR, contrôle d'accès salle par salle, 
équipement plénière et workshops, couverture photo/vidéo et récapitulatifs vidéo quotidiens sur 3 jours.
```

**Image alt**
```
Congrès Franco-Tunisien de Radiologie — gestion événementielle et digitale par Eventizer
```

---

### Case 3 — Osstem Meeting Tunisia

**H3**
```
Osstem Meeting Tunisia
```

**Badges**
```
Médical   Corporate
```

**Key stat**
```
Gestion terrain
```
**Stat label**
```
de A à Z
```

**Description** (max 35 words)
```
Accueil brandé, badging sécurisé, installation AV complète et couverture photo/vidéo — 
tout orchestré par l'équipe Eventizer sur site, du montage à la clôture.
```

**Image alt**
```
Osstem Meeting Tunisia — gestion événementielle complète par Eventizer
```

---

### Case 4 — B-Connected

**H3**
```
B-Connected — Salon Professionnel
```

**Badges**
```
Salon professionnel   B2B
```

**Key stat**
```
3 niveaux
```
**Stat label**
```
Platinum · Gold · Silver
```

**Description** (max 35 words)
```
Conception du plan des stands, gestion des exposants de A à Z, vis-à-vis dédié par exposant, 
logistique d'installation et de désinstallation complète.
```

**Image alt**
```
B-Connected salon professionnel Tunisie — gestion exposants et plan des stands par Eventizer
```

---

## Team (Notre équipe)

**Section eyebrow**
```
Notre équipe
```

**H2** (49 chars)
```
Les personnes derrière chaque événement réussi.
```

> UX rationale: "Les personnes" is humanizing — not "notre équipe expérimentée" (self-congratulatory). Behind "chaque événement réussi" links the team to proof already established.

| Name | H3 | Role label | One-liner (max 15 words) |
|---|---|---|---|
| Ahmed Jamoussi | `Ahmed Jamoussi` | `CEO` | `Stratégie globale, coordination des équipes et garantie de la qualité de chaque livrable.` |
| Eya Houas | `Eya Houas` | `Project Manager` | `Orchestration de tous les pôles impliqués : IT, logistique, production, communication.` |
| Yassine Abbes | `Yassine Abbes` | `Technical Manager` | `Architecture de la plateforme, intégration des modules et scalabilité sous pression.` |
| Fedi Chtourou | `Fedi Chtourou` | `Event Manager` | `Gestion opérationnelle terrain, participants, fournisseurs et déroulement du Jour J.` |
| Montassar Ben Kaddour | `Montassar Ben Kaddour` | `Account Manager` | `Relations fournisseurs, suivi des livraisons et interface entre le client et les prestataires.` |
| Fatma Saddoud | `Fatma Saddoud` | `Marketing & Communication Manager` | `Stratégie de communication événementielle, réseaux sociaux et supports de promotion.` |

**Team photo alts** (pattern: `[First name Last name], [Role] chez Eventizer`)
```
Ahmed Jamoussi, CEO chez Eventizer
Eya Houas, Project Manager chez Eventizer
Yassine Abbes, Technical Manager chez Eventizer
Fedi Chtourou, Event Manager chez Eventizer
Montassar Ben Kaddour, Account Manager chez Eventizer
Fatma Saddoud, Marketing & Communication Manager chez Eventizer
```

---

## Why Eventizer (Pourquoi nous choisir)

**Section eyebrow**
```
Pourquoi nous choisir
```

**H2** (33 chars)
```
Un partenaire, pas un prestataire.
```

> UX rationale: "Prestataire" is the commodity framing clients fear (transactional, replaceable). "Partenaire" signals long-term, invested relationship. The contrast does the work in six words.

---

### Differentiator 1

**H3** (21 chars)
```
Un seul interlocuteur
```

**Body** (max 40 words)
```
Vous ne gérez pas dix fournisseurs. Vous nous parlez — et nous gérons tout le reste. 
Hôtels, transporteurs, exposants, studios : Eventizer absorbe toute la complexité de coordination, 
pour que vous puissiez vous concentrer sur votre événement.
```

---

### Differentiator 2

**H3** (28 chars)
```
Une technologie propriétaire
```

**Body** (max 40 words)
```
Notre plateforme n'est pas un outil générique acheté sur étagère. 
Elle a été construite pour nos propres événements, affinée sur 250+ réalisations. 
Vous bénéficiez d'un outil éprouvé — pas d'un logiciel standard.
```

---

### Differentiator 3

**H3** (24 chars)
```
Une transparence totale
```

**Body** (max 40 words)
```
Accès en temps réel à vos données financières, vos inscriptions, votre logistique. 
Pas de surprises en fin de mission, pas d'opacité sur les dépenses — 
une visibilité complète à chaque étape de votre projet.
```

---

## Contact

**Section eyebrow**
```
Parlons de votre projet
```

**H2** (42 chars)
```
Prêt à organiser quelque chose de mémorable ?
```

**Subheadline** (99 chars)
```
Décrivez-nous votre événement — nous revenons vers vous dans les 24 heures 
avec une première proposition.
```

> UX rationale: "24 heures" sets a concrete expectation. "Première proposition" signals the process starts immediately — reduces the friction of reaching out.

---

### Form labels & placeholders

| Field | Label | Placeholder | Helper text |
|---|---|---|---|
| First name | `Prénom` | `Marie` | — |
| Last name | `Nom` | `Dupont` | — |
| Email | `Email professionnel` | `marie.dupont@entreprise.com` | — |
| Phone | `Téléphone` | `+216 XX XXX XXX` | — |
| Event type | `Type d'événement` | `Choisissez un type` | — |
| Message | `Votre message` | `Décrivez votre événement : type, date estimée, nombre de participants…` | — |

**Select options (event type)**
```
Choisissez un type       ← disabled default
Congrès scientifique
Salon professionnel
Séminaire
Team building
Dîner de gala
Autre
```

**Submit button** (21 chars)
```
Envoyer ma demande
```
`aria-label`: `Envoyer le formulaire de demande de devis`

**Loading state** (button — during submit)
```
Envoi en cours…
```
`aria-disabled`: `true` during submit

**Reassurance line** (below submit button, 47 chars)
```
Réponse sous 24h — aucun engagement requis.
```

---

### Form validation — error messages

Apply UX writing error pattern: `[What's wrong]. [How to fix it].`
Show on field blur, not on every keystroke.

| Field | Error condition | Error message |
|---|---|---|
| Prénom | Empty | `Votre prénom est requis.` |
| Prénom | Too short (< 2 chars) | `Votre prénom doit contenir au moins 2 caractères.` |
| Nom | Empty | `Votre nom est requis.` |
| Email | Empty | `Votre email est requis.` |
| Email | Invalid format | `Cet email ne semble pas valide. Vérifiez le format (ex : nom@entreprise.com).` |
| Téléphone | Empty | `Votre numéro de téléphone est requis.` |
| Téléphone | Invalid format | `Ce numéro ne semble pas valide. Utilisez le format +216 XX XXX XXX.` |
| Type d'événement | Not selected | `Sélectionnez le type d'événement pour nous aider à vous orienter.` |
| Message | Empty | `Décrivez brièvement votre événement pour que nous puissions vous répondre précisément.` |
| Message | Too short (< 20 chars) | `Ajoutez quelques détails sur votre événement — date, lieu, nombre de participants.` |

> UX rationale: Errors never blame ("champ invalide" is accusatory). Each tells the user what to do, not just what went wrong. The message for Message field explains *why* detail helps — motivates completion.

---

### Form states — success & error

**Success state** (replaces form after submit)

```
Votre demande a bien été envoyée.

Nous vous répondons dans les 24 heures avec une première proposition adaptée à votre événement.

En attendant, vous pouvez nous joindre directement :
[Téléphone]  [WhatsApp]
```

> UX rationale: Confirms what happened (past tense, specific). Sets expectation (24h, first proposal). Offers alternative contact — no dead end.

**System error** (if form submission fails — API/network error)
```
L'envoi a échoué. Vérifiez votre connexion et réessayez.
Si le problème persiste, contactez-nous directement au [Téléphone].
```

> UX rationale: Explains what failed, offers recovery, gives escape hatch (phone). Never says "erreur inconnue."

---

### Contact details block (right column)

**Heading**
```
Ou contactez-nous directement
```

**Phone label** (screen reader)
```
Appeler Eventizer
```

**Email label** (screen reader)
```
Envoyer un email à Eventizer
```

**WhatsApp button**
```
Écrire sur WhatsApp
```
`aria-label`: `Contacter Eventizer via WhatsApp`

**Availability note**
```
Disponible du lundi au vendredi, 9h – 18h
```

---

## Footer

| Element | Copy |
|---|---|
| Logo `aria-label` | `Eventizer — retour à l'accueil` |
| Tagline | `Innovate · Connect · Digitize` |
| Nav link 1 | `Services` |
| Nav link 2 | `Plateforme` |
| Nav link 3 | `Références` |
| Nav link 4 | `Équipe` |
| Nav link 5 | `Contact` |
| Legal link | `Mentions légales` |
| Copyright | `© 2026 Eventizer. Tous droits réservés.` |
| LinkedIn `aria-label` | `Eventizer sur LinkedIn` |
| Instagram `aria-label` | `Eventizer sur Instagram` |
| Facebook `aria-label` | `Eventizer sur Facebook` |

---

## Accessibility strings reference

All hidden but machine-readable strings for screen readers and assistive tech.

| Element | `aria-label` or `aria-description` |
|---|---|
| Skip link (first element) | `Passer au contenu principal` |
| Scroll indicator | `Défiler vers le contenu` |
| Stats section | `Chiffres clés — Eventizer en chiffres` |
| Platform features list | `Modules de la plateforme Eventizer` |
| Case study card (each) | `Référence client : [Event name]` |
| Team grid | `L'équipe Eventizer` |
| Contact form | `Formulaire de demande de devis` |
| Form submit (loading) | `Envoi du formulaire en cours, veuillez patienter` |
| WhatsApp button | `Contacter Eventizer via WhatsApp` |
| Decorative shapes | `aria-hidden="true"` — never described |
