# Contrat de Prestation de Services — Template
> Modèle adapté au statut auto-entrepreneur au Maroc.
> À personnaliser avant chaque signature. Pas un avis juridique.

---

## Comment utiliser ce template

1. Copie ce contenu dans un document Word ou Google Docs
2. Remplace tous les `[CHAMPS EN MAJUSCULES]` avec les vraies informations
3. Imprime en 2 exemplaires — tu gardes un, le client garde l'autre
4. Chaque page paraphée + signature finale avec date

---

---

# CONTRAT DE PRESTATION DE SERVICES

**Entre les soussignés :**

**Le Prestataire :**
- Nom et prénom : [TON NOM COMPLET]
- Auto-entrepreneur, numéro d'inscription : [TON NUMÉRO AE]
- ICE : [TON ICE, si disponible]
- Adresse : [TON ADRESSE]
- Email : [TON EMAIL]
- Téléphone : [TON NUMÉRO]

Ci-après dénommé **« le Prestataire »**

**Et :**

**Le Client :**
- Dénomination : [NOM DU CLIENT / ENTREPRISE]
- Représenté par : [NOM DU REPRÉSENTANT], [TITRE/FONCTION]
- ICE : [ICE CLIENT]
- Adresse : [ADRESSE CLIENT]
- Email : [EMAIL CLIENT]

Ci-après dénommé **« le Client »**

---

## Article 1 — Objet du contrat

Le Prestataire s'engage à fournir au Client les services suivants dans le cadre du projet **[NOM DU PROJET — ex : "Déploiement Agent IA — Legal Plus"]** :

- Conception et déploiement d'un agent conversationnel IA (chat et/ou vocal)
- Configuration multilingue (français, arabe, anglais)
- Intégration sur le site web du client
- [AJOUTER OU RETIRER LES LIGNES SELON LE PÉRIMÈTRE]

Les modalités techniques détaillées sont décrites dans l'**Annexe A** jointe au présent contrat.

---

## Article 2 — Durée

### Option A — Mission ponctuelle (one-shot)
Le présent contrat prend effet à la date de signature et se termine à la **livraison de la prestation**, attendue avant le **[DATE DE LIVRAISON]**.

### Option B — Abonnement mensuel (retainer)
Le présent contrat prend effet le **[DATE DE DÉBUT]** pour une durée initiale de **[DURÉE — ex : 1 mois / 3 mois]**, renouvelable tacitement par période d'un mois sauf résiliation notifiée par l'une des parties avec un préavis de **15 jours calendaires**.

> Utilise Option A pour la setup, Option B pour le retainer mensuel.

---

## Article 3 — Rémunération et modalités de paiement

### Tarification

| Prestation | Montant (MAD TTC) |
|---|---|
| Frais de mise en place (one-time) | [MONTANT ou "0 MAD — offert"] |
| Abonnement mensuel | [MONTANT — ex : 1 500 MAD/mois] |

### Conditions de paiement
- **Mois 1 (pilote)** : [Gratuit / ou 50% à la commande, 50% à la livraison]
- **Mois 2 et suivants** : Paiement à réception de facture, délai maximum **15 jours**
- **Mode de paiement accepté** : Virement bancaire / Cash / [Autres selon accord]

### Coordonnées bancaires du Prestataire
- Banque : [NOM DE TA BANQUE]
- Titulaire : [TON NOM]
- RIB : [TON RIB]

---

## Article 4 — Obligations du Prestataire

Le Prestataire s'engage à :
- Réaliser les prestations décrites à l'Article 1 avec soin et professionnalisme
- Respecter les délais convenus
- Informer le Client de tout retard ou difficulté dans les plus brefs délais
- Maintenir la confidentialité des informations reçues dans le cadre de la mission
- Assurer le support technique pendant toute la durée du contrat (retainer)

---

## Article 5 — Obligations du Client

Le Client s'engage à :
- Fournir au Prestataire les informations et accès nécessaires à la réalisation de la mission (identifiants, contenu, etc.)
- Désigner un interlocuteur unique disponible pour les échanges
- Régler les factures dans les délais convenus
- Ne pas modifier, copier ou redistribuer les éléments livrés sans accord du Prestataire

---

## Article 6 — Propriété intellectuelle

### Livrables
À réception du paiement intégral, le Client dispose d'une **licence d'utilisation** des livrables pour son propre usage commercial.

### Outils et frameworks tiers
Certains composants utilisés (modèles IA, frameworks, APIs) restent soumis aux licences de leurs éditeurs respectifs.

### Portfolio
Le Prestataire se réserve le droit de mentionner la mission dans son portfolio et ses supports commerciaux, sauf opposition écrite du Client dans les 7 jours suivant la livraison.

---

## Article 7 — Confidentialité

Chaque partie s'engage à ne pas divulguer à des tiers les informations confidentielles de l'autre partie reçues dans le cadre du présent contrat. Cette obligation est valable pendant toute la durée du contrat et **2 ans** après sa fin.

---

## Article 8 — Responsabilité

Le Prestataire n'est tenu qu'à une **obligation de moyens**. Sa responsabilité ne pourra être engagée en cas de force majeure, de défaillance d'un service tiers (hébergement, API d'IA, téléphonie) ou de mauvaise utilisation des livrables par le Client.

---

## Article 9 — Résiliation

### Par le Client
Le Client peut résilier le contrat (abonnement) avec un préavis de **15 jours** par email avec accusé de réception. Aucun remboursement de la période en cours.

### Par le Prestataire
Le Prestataire peut résilier en cas de non-paiement persistant (plus de 30 jours de retard) après mise en demeure restée sans effet.

---

## Article 10 — Loi applicable et juridiction

Le présent contrat est régi par le **droit marocain**. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, le tribunal compétent sera celui de **[TA VILLE — ex : Casablanca]**.

---

## Signatures

Fait en deux exemplaires originaux, à [VILLE], le [DATE]

| Prestataire | Client |
|---|---|
| [TON NOM] | [NOM DU REPRÉSENTANT] |
| Signature : _________________ | Signature : _________________ |
| Date : _________________ | Date : _________________ |

---

## Annexe A — Périmètre technique détaillé

> À remplir selon la mission. Exemple pour Legal Plus :

**Agent IA — Legal Plus (Pilot)**

| Composant | Description |
|---|---|
| Agent chat | GPT-4o-mini, personnalité Yasmine, multilingue FR/AR/EN/Darija |
| Agent vocal | VAPI, voix féminine (Azure `fr-FR-DeniseNeural`), même personnalité |
| Intégration | Widget flottant installable sur le site legalplus.ma |
| Lead capture | Collecte nom + email/téléphone, envoi au CRM client |
| Booking | Lien Calendly intégré pour réservation de créneau |
| Hébergement | Vercel (inclus dans le service) |
| Reporting | Rapport mensuel des conversations et leads capturés |
| Mises à jour | 1 mise à jour du prompt/personnalité par mois incluse |

**Exclusions :** Refonte du site client, développement back-end côté client, gestion des rendez-vous après capture.

---

*Ce template est fourni à titre indicatif. Consulte un juriste pour les contrats importants.*
