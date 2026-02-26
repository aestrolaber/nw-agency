export type Lang = "en" | "fr";

export const translations = {
    en: {
        // Navbar
        nav: {
            services: "Services",
            about: "About",
            demo: "Demo",
            contact: "Contact",
            cta: "Book Assessment",
        },
        // Hero
        hero: {
            badge: "AI Sales Infrastructure · Always On",
            line1: "Revenue meets",
            line2: "Precision.",
            body: "Stop losing leads after hours. We install AI sales agents that answer calls, capture leads, and convert visitors — 24/7, while you sleep.",
            cta1: "Book Free Assessment",
            cta2: "See Live Demo",
            scroll: "scroll",
        },
        // Features
        features: {
            label: "What We Install",
            heading1: "Three systems.",
            heading2: "Zero gaps.",
            card1: {
                label: "The Leaking Bucket",
                title: "24/7 AI answers calls & chats while you sleep",
                stat1: { title: "After-Hours Lost Leads", sub: "avg. missed revenue" },
                stat2: { title: "Unanswered Support Calls", sub: "go to competitors" },
                stat3: { title: "No-Reply Website Chats", sub: "lower conversions" },
            },
            card2: {
                label: "Live Feed",
                title: "Instant lead capture — every visitor, every time",
                messages: [
                    "→ New lead captured: Sarah M. (roofing quote)",
                    "→ Chat answered at 02:14 AM · booked appt",
                    "→ Call deflected: Emma resolved issue",
                    "→ Lead score updated: HIGH INTENT detected",
                    "→ Follow-up SMS sent automatically",
                    "→ Booking confirmed: Demo call, Thursday 3pm",
                ],
            },
            card3: {
                label: "Setup Protocol",
                title: "Done-for-you setup in 48 hours or less",
                deploy: "Deploy AI Agent",
                active: "✓ AI Agent Active",
            },
        },
        // Philosophy
        philosophy: {
            label: "Our Philosophy",
            line1: "Most agencies focus on: building websites, running ads, and sending reports.",
            line2: "We focus on:",
            accent: "converting revenue",
            line3: "— automatically, at scale, every hour of every day.",
        },
        // Protocol
        protocol: {
            label: "The Process",
            heading1: "From zero to",
            heading2: "live in 48h.",
            steps: [
                {
                    num: "01",
                    title: "Audit & Discovery",
                    desc: "We analyze your current website, customer journey, and lead-loss points in 24 hours.",
                },
                {
                    num: "02",
                    title: "AI Agent Build",
                    desc: "We configure your branded voice and chat agents — trained on your business, your tone, your offers.",
                },
                {
                    num: "03",
                    title: "Install & Activate",
                    desc: "Embed code drops onto your site. Agent goes live. You get a dashboard. We monitor forever.",
                },
            ],
        },
        // Pricing
        pricing: {
            label: "Investment",
            heading1: "Simple pricing.",
            heading2: "Serious results.",
            tiers: [
                {
                    name: "Starter",
                    price: "$497",
                    sub: "/month",
                    desc: "Perfect for solo operators and small teams wanting to stop leaking leads.",
                    features: [
                        "AI Web Chat Agent",
                        "Business hours coverage",
                        "Lead capture to email",
                        "1 bot persona",
                        "Monthly report",
                    ],
                    cta: "Get Started",
                },
                {
                    name: "Performance",
                    price: "$997",
                    sub: "/month",
                    desc: "The full system — voice + chat + calendar booking running 24/7.",
                    features: [
                        "AI Voice + Chat Agents",
                        "24/7 coverage",
                        "CRM / HighLevel integration",
                        "Custom bot persona & script",
                        "Weekly performance dashboard",
                        "Book AI Impact Assessment",
                    ],
                    cta: "Book Assessment",
                },
                {
                    name: "Enterprise",
                    price: "Custom",
                    sub: "",
                    desc: "Multi-location businesses and agencies needing white-label AI at scale.",
                    features: [
                        "Everything in Performance",
                        "Multi-location deployment",
                        "White-label option",
                        "Dedicated account manager",
                        "SLA uptime guarantee",
                    ],
                    cta: "Contact Us",
                },
            ],
        },
        // Contact
        contact: {
            label: "Get Started",
            heading1: "Book your free",
            heading2: "AI Impact Assessment.",
            body: "Tell us about your business. We'll show you exactly how much revenue you're leaving on the table — and build a live demo of your AI agent in 48 hours.",
            fields: {
                name: "Full Name",
                email: "Email Address",
                phone: "Phone Number",
                business: "Business Name",
                url: "Your Website URL (optional — we'll build your demo)",
            },
            placeholders: {
                name: "Jane Smith",
                email: "jane@business.com",
                phone: "+1 555 000 0000",
                business: "Smith Roofing Co.",
                url: "https://yourbusiness.com",
            },
            cta: "Book My Free Assessment",
            successTitle: "You're in.",
            successBody: "We'll reach out within 4 hours to schedule your AI Impact Assessment.",
        },
        // Footer
        footer: {
            tagline: "AI-powered sales agents that capture leads & answer customers 24/7. Never miss another opportunity.",
            status: "All Systems Operational",
            copyright: "© 2026 nw. All rights reserved.",
            credit: "Built with AI. Powered by humans who care.",
            cols: [
                {
                    title: "Agency",
                    links: ["Services", "About", "Process", "Pricing"],
                },
                {
                    title: "Platform",
                    links: ["Live Demo", "Voice AI", "Chat AI", "Dashboard"],
                },
                {
                    title: "Legal",
                    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
                },
            ],
        },
        // Demo
        demo: {
            badge: "Your Personalized Demo",
            heading: "We've already built this for",
            subheading: "Check out your website below with our AI agent installed. This is exactly what your customers would see — 24/7, even at 2am.",
            voiceBadge: "Test Voice AI",
            voiceHeading: "Meet {name} — your AI voice agent",
            voiceSubheading: "Click below to hear how {name} answers when a customer calls {business} after hours.",
            voiceCall: "Call {name}",
            voiceEnd: "End Call",
            voiceActive: "{name} is speaking...",
            leadBadge: "Ready to activate this for real?",
            leadHeading: "Book your AI Impact Assessment",
            leadNamePrefix: "Your name",
            leadEmailPrefix: "Your email",
            leadCta: "Book My Assessment",
            chatGreeting: "Hi! I'm {name} from {business}. How can I help you today? 😊",
            chatWait: "Great question! Let me get someone from {business} to follow up with you shortly. Can I get your name and best contact number?",
            chatOnline: "Online",
            chatInput: "Type your message...",
        },
    },

    fr: {
        nav: {
            services: "Services",
            about: "À propos",
            demo: "Démo",
            contact: "Contact",
            cta: "Réserver un bilan",
        },
        hero: {
            badge: "Infrastructure IA de vente · Toujours active",
            line1: "Le revenu rencontre",
            line2: "la précision.",
            body: "Arrêtez de perdre des prospects en dehors des heures d'ouverture. Nous installons des agents IA qui répondent aux appels, capturent les leads et convertissent les visiteurs — 24h/24, pendant que vous dormez.",
            cta1: "Réserver mon bilan gratuit",
            cta2: "Voir la démo en direct",
            scroll: "défiler",
        },
        features: {
            label: "Ce que nous installons",
            heading1: "Trois systèmes.",
            heading2: "Zéro fuite.",
            card1: {
                label: "Le seau qui fuit",
                title: "L'IA répond aux appels et chats 24h/24 pendant que vous dormez",
                stat1: { title: "Leads perdus hors horaires", sub: "revenu manqué moyen" },
                stat2: { title: "Appels sans réponse", sub: "vont à la concurrence" },
                stat3: { title: "Chats web ignorés", sub: "taux de conversion réduit" },
            },
            card2: {
                label: "Flux en direct",
                title: "Capture de leads instantanée — chaque visiteur, à chaque fois",
                messages: [
                    "→ Nouveau lead capturé : Sophie M. (devis toiture)",
                    "→ Chat répondu à 02h14 · rendez-vous pris",
                    "→ Appel géré : Emma a résolu le problème",
                    "→ Score lead mis à jour : INTENTION HAUTE détectée",
                    "→ SMS de suivi envoyé automatiquement",
                    "→ Réservation confirmée : Démo jeudi à 15h",
                ],
            },
            card3: {
                label: "Protocole d'installation",
                title: "Installation clé en main en 48 heures ou moins",
                deploy: "Déployer l'agent IA",
                active: "✓ Agent IA actif",
            },
        },
        philosophy: {
            label: "Notre philosophie",
            line1: "La plupart des agences se concentrent sur : créer des sites web, gérer des publicités et envoyer des rapports.",
            line2: "Nous, nous nous concentrons sur :",
            accent: "convertir en chiffre d'affaires",
            line3: "— automatiquement, à grande échelle, chaque heure de chaque journée.",
        },
        protocol: {
            label: "Le processus",
            heading1: "De zéro à",
            heading2: "en ligne en 48h.",
            steps: [
                {
                    num: "01",
                    title: "Audit & Découverte",
                    desc: "Nous analysons votre site, votre parcours client et vos points de fuite de leads en 24 heures.",
                },
                {
                    num: "02",
                    title: "Création de l'agent IA",
                    desc: "Nous configurons vos agents vocaux et de chat à votre image — formés sur votre entreprise, votre ton, vos offres.",
                },
                {
                    num: "03",
                    title: "Installation & Activation",
                    desc: "Le code s'intègre sur votre site. L'agent est en ligne. Vous obtenez un tableau de bord. Nous surveillons en permanence.",
                },
            ],
        },
        pricing: {
            label: "Investissement",
            heading1: "Tarifs simples.",
            heading2: "Résultats sérieux.",
            tiers: [
                {
                    name: "Starter",
                    price: "497 $",
                    sub: "/mois",
                    desc: "Parfait pour les indépendants et petites équipes voulant arrêter de perdre des leads.",
                    features: [
                        "Agent chat IA sur site web",
                        "Couverture aux heures d'ouverture",
                        "Capture de leads par e-mail",
                        "1 persona bot",
                        "Rapport mensuel",
                    ],
                    cta: "Démarrer",
                },
                {
                    name: "Performance",
                    price: "997 $",
                    sub: "/mois",
                    desc: "Le système complet — voix + chat + prise de rendez-vous 24h/24.",
                    features: [
                        "Agents voix + chat IA",
                        "Couverture 24h/24",
                        "Intégration CRM / HighLevel",
                        "Persona & script personnalisés",
                        "Tableau de bord hebdomadaire",
                        "Bilan d'impact IA inclus",
                    ],
                    cta: "Réserver un bilan",
                },
                {
                    name: "Entreprise",
                    price: "Sur mesure",
                    sub: "",
                    desc: "Pour les entreprises multi-sites et agences souhaitant l'IA en marque blanche à grande échelle.",
                    features: [
                        "Tout ce qui est inclus dans Performance",
                        "Déploiement multi-sites",
                        "Option marque blanche",
                        "Chargé de compte dédié",
                        "Garantie de disponibilité SLA",
                    ],
                    cta: "Nous contacter",
                },
            ],
        },
        contact: {
            label: "Commencer",
            heading1: "Réservez votre",
            heading2: "bilan d'impact IA gratuit.",
            body: "Parlez-nous de votre activité. Nous vous montrerons exactement combien de revenus vous perdez — et construirons une démo en direct de votre agent IA en 48 heures.",
            fields: {
                name: "Nom complet",
                email: "Adresse e-mail",
                phone: "Numéro de téléphone",
                business: "Nom de l'entreprise",
                url: "URL de votre site (optionnel — nous construirons votre démo)",
            },
            placeholders: {
                name: "Marie Dupont",
                email: "marie@entreprise.com",
                phone: "+33 6 00 00 00 00",
                business: "Dupont Toiture",
                url: "https://votreentreprise.com",
            },
            cta: "Réserver mon bilan gratuit",
            successTitle: "C'est parti !",
            successBody: "Nous vous contacterons dans les 4 heures pour planifier votre bilan d'impact IA.",
        },
        footer: {
            tagline: "Des agents IA qui capturent les leads et répondent aux clients 24h/24. Ne ratez plus jamais une opportunité.",
            status: "Tous les systèmes opérationnels",
            copyright: "© 2026 nw. Tous droits réservés.",
            credit: "Construit avec l'IA. Propulsé par des humains passionnés.",
            cols: [
                {
                    title: "Agence",
                    links: ["Services", "À propos", "Processus", "Tarifs"],
                },
                {
                    title: "Plateforme",
                    links: ["Démo en direct", "IA vocale", "Chat IA", "Tableau de bord"],
                },
                {
                    title: "Légal",
                    links: ["Politique de confidentialité", "Conditions d'utilisation", "Politique des cookies"],
                },
            ],
        },
        // Demo
        demo: {
            badge: "Votre démo personnalisée",
            heading: "Nous avons déjà construit cela pour",
            subheading: "Découvrez votre site web ci-dessous avec notre agent IA installé. C'est exactement ce que vos clients verraient — 24h/24, même à 2h du matin.",
            voiceBadge: "Tester l'IA vocale",
            voiceHeading: "Découvrez {name} — votre agent vocal IA",
            voiceSubheading: "Cliquez ci-dessous pour entendre comment {name} répond lorsqu'un client appelle {business} après la fermeture.",
            voiceCall: "Appeler {name}",
            voiceEnd: "Terminer l'appel",
            voiceActive: "{name} est en train de parler...",
            leadBadge: "Prêt à activer cela pour de vrai ?",
            leadHeading: "Réservez votre bilan d'impact IA",
            leadNamePrefix: "Votre nom",
            leadEmailPrefix: "Votre e-mail",
            leadCta: "Réserver mon bilan",
            chatGreeting: "Bonjour ! Je suis {name} de {business}. Comment puis-je vous aider aujourd'hui ? 😊",
            chatWait: "Excellente question ! Laissez-moi demander à quelqu'un de {business} de vous recontacter prochainement. Puis-je avoir votre nom et votre meilleur numéro de téléphone ?",
            chatOnline: "En ligne",
            chatInput: "Tapez votre message...",
        },
    },
} as const;

export type Translations = typeof translations.en;
