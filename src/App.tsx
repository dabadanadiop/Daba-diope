import React, { useState, useEffect, useRef } from "react";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
}

interface Project {
  id: string;
  number: string;
  category: "UX/UI" | "Graphisme" | "Canva" | "Branding" | "Motion";
  categoryLabel: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  challenge: string;
  solution: string;
  tools: string[];
  deliverables: string[];
  image: string;
  imageAlt: string;
  video?: string;      // local /photo/xxx.mp4
  thumbnail?: string;  // local /photo/xxx-thumb.jpg
  pdfLink?: string;    // local /photo/xxx.pdf
  moodboard?: string;  // local /photo/xxx-moodboard.jpg
  moodboardTitle?: string;
  secondaryImage?: string;
  secondaryImageTitle?: string;
  featured?: boolean;
}

interface SkillItem {
  name: string;
  category: "visual" | "uxui" | "tools" | "strategy";
  icon: string;
  level: number; // percentage 0-100
  tag: string;
  description: string;
}

/* ─── Navigation Items ───────────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Compétences", href: "#competences" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
  { label: "Parcours", href: "#parcours" },
  { label: "Contact", href: "#contact" },
];

/* ─── Projects Data ─────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: "proj-wagnou-daba",
    number: "01",
    category: "Branding",
    categoryLabel: "Identité Visuelle & Culinaire",
    title: "Wagnou Daba — Identité Visuelle & Expérience Culinaire",
    shortDesc: "Direction artistique complète, charte graphique, menus digitaux et kit de communication Canva pour la marque Wagnou Daba.",
    fullDesc: "Conception globale de l'identité de marque pour 'Wagnou Daba' (La cuisine de Daba). Ce projet met en valeur la richesse et la générosité des saveurs et traditions locales à travers un univers visuel chaleureux, des menus digitaux attractifs, des packagings soignés et des templates pour les réseaux sociaux.",
    challenge: "Créer une identité gourmande, moderne et ancrée dans les traditions sénégalaises, capable de séduire une clientèle exigeante tout en facilitant la commande digitale.",
    solution: "Élaboration d'une direction artistique aux teintes épicées (terracotta, ocre safran et crème), typographies expressives, création de menus digitaux interactifs et modèles Canva prêts à l'emploi pour les publications quotidiennes.",
    tools: ["Canva Pro", "Figma", "Adobe Illustrator", "Photoshop"],
    deliverables: ["Logotype & Guide de style (Brandbook)", "Menus digitaux interactifs & cartes print", "Kit de communication Instagram & TikTok", "Packaging & étiquettes personnalisées"],
    image: "/photo/wagnou-daba-thumb.jpg",
    thumbnail: "/photo/wagnou-daba-thumb.jpg",
    video: "/photo/wagnou-daba-demo.mp4",
    imageAlt: "Projet Wagnou Daba - Identité visuelle culinaire et digitale par Daba Diop",
    featured: true,
  },
  {
    id: "proj-tollou-daba",
    number: "02",
    category: "UX/UI",
    categoryLabel: "UX/UI Design & Charte Graphique",
    title: "Tollou Daba — Charte Graphique, Moodboard & Expérience Agroécologique",
    shortDesc: "Direction artistique complète, moodboard officiel (#FBC02D & #045630), charte graphique et conception UX/UI pour récoltes maraîchères fraîches.",
    fullDesc: "Conception globale de l'identité visuelle et de l'expérience digitale pour 'Tollou Daba' (Le verger & champ de Daba), une initiative agroécologique dédiée à la valorisation des récoltes maraîchères et bio du terroir sénégalais. Le projet intègre le moodboard officiel (teintes ocre solaire #FBC02D et vert végétal #045630), la vidéo de présentation et la charte graphique complète PDF.",
    challenge: "Offrir un parcours utilisateur simple et rapide permettant aux consommateurs de découvrir les récoltes de saison et composer leur panier maraîcher en quelques clics tout en valorisant l'authenticité de la terre.",
    solution: "Élaboration d'un moodboard d'inspiration agricole vibrant, création d'un Design System sous Figma aux teintes végétales et éco-responsables, filtres intelligents et ergonomie mobile fluide.",
    tools: ["Figma", "Moodboard & DA", "Design System", "Wireframing UX", "Canva Pro"],
    deliverables: [
      "Moodboard officiel de direction artistique (HD)",
      "Vidéo de présentation officielle (MP4)",
      "Charte graphique complète (PDF)",
      "Maquettes UI Web & Mobile haute-fidélité",
      "Prototype interactif cliquable",
    ],
    image: "/photo/tollou-thumb.jpg",
    thumbnail: "/photo/tollou-thumb.jpg",
    video: "/photo/tollou.mp4",
    moodboard: "/photo/tollu-moodboard.jpg",
    moodboardTitle: "Moodboard Officiel Tollou Daba",
    pdfLink: "/photo/charte-graphique-tollu-daba.pdf",
    imageAlt: "Projet Tollou Daba - Présentation vidéo, moodboard et charte graphique agroécologique par Daba Diop",
    featured: true,
  },
  {
    id: "proj-odc-femmes-tech",
    number: "03",
    category: "UX/UI",
    categoryLabel: "UX/UI & Prototypage Figma",
    title: "ODC Femmes Tech — Prototype Interactif Figma",
    shortDesc: "Prototype haute-fidélité d'une application mobile dédiée aux femmes techniciennes de l'Orange Digital Center.",
    fullDesc: "Conception et prototypage complet d'une application mobile sous Figma pour le programme ODC Femmes Tech. L'application facilite l'accès aux ressources de formation, le suivi de progression et la mise en réseau des apprenantes. Voir la vidéo de démonstration du prototype interactif.",
    challenge: "Concevoir une interface inclusive, simple et inspirante qui encourage les femmes à s'engager dans les parcours numériques de l'ODC.",
    solution: "Recherche utilisateur approfondie, personas, wireframes et prototype Figma interactif avec navigation fluide, palettes chaleureuses et iconographie inclusive.",
    tools: ["Figma", "Prototypage interactif", "Design System", "User Research"],
    deliverables: ["Wireframes basse & haute fidélité", "Prototype Figma interactif (vidéo)", "Design System documenté", "Rapport de recherche utilisateur"],
    image: "/photo/odc-prototype-thumb.jpg",
    thumbnail: "/photo/odc-prototype-thumb.jpg",
    video: "/photo/odc-femmes-tech-prototype.mp4",
    imageAlt: "Prototype Figma ODC Femmes Tech par Daba Diop",
    featured: true,
  },
  {
    id: "proj-origin-juice",
    number: "04",
    category: "Branding",
    categoryLabel: "Branding & Packaging",
    title: "Origin Juice — Identité de Marque & Packaging",
    shortDesc: "Création de l'identité visuelle et du packaging pour Origin Juice, une marque de jus frais sénégalais haut de gamme.",
    fullDesc: "Direction artistique complète pour Origin Juice : logo, palette chromatique, typographie, packaging bouteille et canette, déclinaisons print et digitales. Un univers de marque ancré dans la fraîcheur et l'authenticité des fruits locaux.",
    challenge: "Se démarquer sur un marché concurrentiel en créant une identité premium qui évoque l'authenticité sénégalaise et la fraîcheur naturelle.",
    solution: "Palette colorée aux tons vitaminés (orangé, vert tropical, blanc laiteux), logo illustratif avec motifs botaniques et typographie élégante pour un positionnement haut de gamme.",
    tools: ["Adobe Illustrator", "Photoshop", "Canva Pro", "Design Print"],
    deliverables: ["Logo & charte graphique complète", "Packaging bouteille & canette", "Déclinaisons réseaux sociaux", "Guide d'utilisation de marque"],
    image: "/photo/origin-juice-thumb.jpg",
    thumbnail: "/photo/origin-juice-thumb.jpg",
    video: "/photo/origin-juice-prototype.mp4",
    imageAlt: "Origin Juice - Identité visuelle et packaging par Daba Diop",
  },
  {
    id: "proj-senegal-regions",
    number: "05",
    category: "UX/UI",
    categoryLabel: "UX/UI & Infographie Interactive",
    title: "Sénégal Régions — Carte Interactive & Infographie",
    shortDesc: "Conception d'une carte interactive et infographie visuelle des régions du Sénégal pour une plateforme de valorisation culturelle.",
    fullDesc: "Projet d'infographie interactive présentant les 14 régions du Sénégal avec leurs particularités culturelles, économiques et touristiques. L'interface permet une navigation intuitive par région avec des fiches détaillées animées.",
    challenge: "Rendre accessible et engageante une grande quantité d'informations géographiques et culturelles sur les régions sénégalaises.",
    solution: "Carte SVG interactive avec animations au survol, code couleur régional, fiches pop-up riches en contenu et navigation fluide adaptée mobile.",
    tools: ["Figma", "Canva Pro", "Motion Design", "Infographie"],
    deliverables: ["Carte interactive haute-fidélité", "14 fiches régions illustrées", "Prototype animé cliquable", "Export print grand format"],
    image: "/photo/senegal-regions-thumb.jpg",
    thumbnail: "/photo/senegal-regions-thumb.jpg",
    video: "/photo/senegal-regions-prototype.mp4",
    imageAlt: "Carte interactive des régions du Sénégal par Daba Diop",
  },
  {
    id: "proj-countdown-motion",
    number: "06",
    category: "Motion",
    categoryLabel: "Motion Design & Animation",
    title: "Countdown Motion — Animation & Design Cinétique",
    shortDesc: "Animation motion design d'un compte à rebours dynamique pour lancement de campagne ou événement digital.",
    fullDesc: "Création d'une animation motion design percutante pour un compte à rebours de lancement. Les éléments typographiques, les transitions et les effets visuels créent une montée en tension jusqu'au moment révélation.",
    challenge: "Créer un sentiment d'anticipation et d'urgence visuelle en quelques secondes d'animation pour maximiser l'impact lors d'un lancement.",
    solution: "Animation cinétique combinant typographie animée, effets de particules, transitions rapides et palette de couleurs contrastées pour un rendu professionnel.",
    tools: ["Canva Pro", "Motion Design", "Direction Artistique", "After Effects"],
    deliverables: ["Animation MP4 HD exportée", "Version courte & longue", "Déclinaisons réseaux sociaux", "Fichiers sources fournis"],
    image: "/photo/countdown-thumb.jpg",
    thumbnail: "/photo/countdown-thumb.jpg",
    video: "/photo/countdown-motion.mp4",
    imageAlt: "Animation Motion Design Countdown par Daba Diop",
  },
  {
    id: "proj-moodboard-sheet",
    number: "07",
    category: "Graphisme",
    categoryLabel: "Moodboard & Direction Artistique",
    title: "Moodboard & Planche de Style — Direction Artistique Daba Diop",
    shortDesc: "Création de moodboards et planches de style pour définir l'univers visuel et la direction artistique des projets de marque.",
    fullDesc: "Développement de moodboards inspirants et de planches de style (style sheets) complètes incluant palettes de couleurs, typographies, textures, iconographie et principes graphiques. Ces outils servent de référence visuelle pour garantir la cohérence de l'identité de marque sur tous les supports.",
    challenge: "Traduire l'essence d'une marque en un système visuel cohérent et inspirant, utilisable par toute l'équipe créative.",
    solution: "Recherche d'inspiration, sélection d'images évocatrices, définition de gammes chromatiques harmonisées, choix typographiques et documentation des règles d'usage dans une planche de style structurée.",
    tools: ["Canva Pro", "Adobe Photoshop", "Adobe Illustrator", "Pinterest", "Milanote"],
    deliverables: ["Moodboard d'inspiration visuelle", "Planche de style (Style Sheet) complète", "Palette couleurs & typographies", "Règles d'usage & déclinaisons"],
    image: "/photo/moodboard-daba.jpg",
    thumbnail: "/photo/moodboard-daba.jpg",
    moodboard: "/photo/moodboard-daba.jpg",
    moodboardTitle: "Moodboard d'inspiration YOUPY",
    secondaryImage: "/photo/sheet-daba.jpg",
    secondaryImageTitle: "Planche de Style (Brandguideline Sheet YOUPY)",
    imageAlt: "Moodboard et planche de style direction artistique par Daba Diop",
  },
];

/* ─── Skills Data ───────────────────────────────────────────────────── */
const SKILLS_DATA: SkillItem[] = [
  {
    name: "Design Graphique & Branding",
    category: "visual",
    icon: "🎨",
    level: 95,
    tag: "Identité & Visuels",
    description: "Création de chartes graphiques, logos, supports print & digitaux avec cohérence et élégance.",
  },
  {
    name: "Maîtrise Canva Pro",
    category: "tools",
    icon: "✨",
    level: 98,
    tag: "Expertise Outil",
    description: "Conception ultra-rapide de visuels professionnels, carrousels, présentations et templates interactifs.",
  },
  {
    name: "UX/UI Design & Figma",
    category: "uxui",
    icon: "🖥️",
    level: 88,
    tag: "Interfaces Web & Mobile",
    description: "Wireframing, prototypage interactif, architecture de l'information et conception de Design Systems.",
  },
  {
    name: "Suite Adobe (Photoshop / Illustrator)",
    category: "tools",
    icon: "🪄",
    level: 82,
    tag: "Retouche & Vectoriel",
    description: "Retouche photo experte, création vectorielle et compositions graphiques sur mesure.",
  },
  {
    name: "Design d'Expérience & Recherche",
    category: "uxui",
    icon: "🔍",
    level: 85,
    tag: "User Research",
    description: "Parcours utilisateurs (User Flow), tests d'ergonomie, empathie et conception centrée sur l'humain.",
  },
  {
    name: "Stratégie de Contenu Social Media",
    category: "strategy",
    icon: "📱",
    level: 90,
    tag: "Digital & Impact",
    description: "Structuration de formats visuels engageants pour LinkedIn, Instagram et communication d'entreprise.",
  },
  {
    name: "Motion Design & Animation",
    category: "visual",
    icon: "🎬",
    level: 78,
    tag: "Animation & Cinétique",
    description: "Création d'animations typographiques, comptes à rebours et visuels animés percutants pour campagnes digitales.",
  },
];

/* ─── Services Data ─────────────────────────────────────────────────── */
const SERVICES_DATA = [
  {
    number: "01",
    title: "Design Graphique & Identité Visuelle",
    short: "Sublimez l'image de votre marque",
    description: "Création d'identités visuelles complètes qui marquent les esprits : logos, palettes, typographies, cartes de visite et supports de communication.",
    highlights: ["Logo & Charte graphique", "Déclinaisons réseaux sociaux", "Supports print & présentations", "Fichiers sources fournis"],
    icon: "🎨",
  },
  {
    number: "02",
    title: "Création Visuelle avec Canva Pro",
    short: "Des visuels percutants et autonomes",
    description: "Conception de kits de templates sur-mesure sur Canva pour permettre à votre équipe de créer facilement du contenu professionnel et régulier.",
    highlights: ["Carrousels & Posts Instagram/LinkedIn", "Présentations d'entreprise", "Bannières & Newsletters", "Templates 100% éditables"],
    icon: "✨",
  },
  {
    number: "03",
    title: "UX/UI Design & Prototypage Figma",
    short: "Des interfaces intuitives et esthétiques",
    description: "Conception d'applications et sites web pensés pour vos utilisateurs : de la recherche UX jusqu'au prototype Figma prêt à être codé.",
    highlights: ["Recherche & User Flows", "Wireframes & Maquettes UI", "Design System réutilisable", "Prototypes cliquables interactifs"],
    icon: "💻",
  },
  {
    number: "04",
    title: "Accompagnement & Assistante Référente Digitale",
    short: "Conseil & harmonisation de vos projets",
    description: "Assistance stratégique et opérationnelle pour vos projets digitaux : optimisation de vos supports, suivi de projet et cohérence globale.",
    highlights: ["Audit visuel de vos supports", "Conseils ergonomiques & UI", "Gestion de contenus visuels", "Coordination créative"],
    icon: "🚀",
  },
];

/* ─── Reveal Hook ────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function RevealSection({
  children,
  className = "",
  as: Tag = "section",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
  id?: string;
}) {
  const ref = useReveal();
  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement & HTMLDivElement>}
      id={id}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ─── Toast Notification Component ───────────────────────────────────── */
function ToastNotification({
  message,
  visible,
}: {
  message: string;
  visible: boolean;
}) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeInUp flex items-center gap-3 bg-[var(--color-ink)] text-white px-5 py-3.5 rounded-2xl shadow-xl border border-white/15">
      <span className="flex h-2.5 w-2.5 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      <span className="font-body text-sm font-medium">{message}</span>
    </div>
  );
}

/* ─── Project Modal Component ────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const [activeMedia, setActiveMedia] = useState<"video" | "moodboard" | "secondary" | "image" | "pdf">("video");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      if (project.video) {
        setActiveMedia("video");
      } else if (project.moodboard) {
        setActiveMedia("moodboard");
      } else if (project.secondaryImage) {
        setActiveMedia("secondary");
      } else if (project.image && !project.image.endsWith(".pdf")) {
        setActiveMedia("image");
      } else {
        setActiveMedia("pdf");
      }
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImage) {
          setLightboxImage(null);
        } else {
          onClose();
        }
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose, lightboxImage]);

  if (!project) return null;

  // Determine available media tabs
  const mediaTabs: { id: "video" | "moodboard" | "secondary" | "image" | "pdf"; label: string; icon: string }[] = [];
  if (project.video) {
    mediaTabs.push({ id: "video", label: "Vidéo de présentation", icon: "🎬" });
  }
  if (project.moodboard) {
    mediaTabs.push({ id: "moodboard", label: project.moodboardTitle || "Moodboard officiel", icon: "🎨" });
  }
  if (project.secondaryImage) {
    mediaTabs.push({ id: "secondary", label: project.secondaryImageTitle || "Planche de style", icon: "📐" });
  }
  if (!project.video && !project.moodboard && project.image && !project.image.endsWith(".pdf")) {
    mediaTabs.push({ id: "image", label: "Visuel du projet", icon: "🖼️" });
  }
  if (project.pdfLink) {
    mediaTabs.push({ id: "pdf", label: "Charte Graphique PDF", icon: "📄" });
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md transition-all">
        <div
          className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-warm-border)] my-auto max-h-[90vh] flex flex-col animate-fadeInUp"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-warm-border)] bg-[var(--color-warm-white)]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--color-rose-pale)] text-[var(--color-rose-primary)]">
                {project.categoryLabel}
              </span>
              <span className="text-xs text-[var(--color-ink-muted)]">
                Projet #{project.number}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Fermer la modale"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div id="project-modal-scroll" className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Media Selector Tabs (if multiple media available) */}
            <div>
              {mediaTabs.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 mb-3.5">
                  {mediaTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveMedia(tab.id)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeMedia === tab.id
                          ? "bg-[var(--color-rose-primary)] text-white shadow-sm ring-2 ring-[var(--color-rose-blush)]"
                          : "bg-white border border-[var(--color-warm-border)] text-[var(--color-ink)] hover:border-[var(--color-rose-primary)]"
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                      {tab.id === "moodboard" && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 ml-0.5">
                          HD
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Main Media Player / Image / PDF Box */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-[var(--color-warm-border)] shadow-inner flex items-center justify-center">
                {activeMedia === "video" && project.video ? (
                  <video
                    src={project.video}
                    poster={project.thumbnail || project.image}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain"
                  >
                    <source src={project.video} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture directe de cette vidéo.
                  </video>
                ) : activeMedia === "moodboard" && project.moodboard ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-stone-900 group">
                    <img
                      src={project.moodboard}
                      alt={`Moodboard officiel ${project.title}`}
                      className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
                      onClick={() => setLightboxImage(project.moodboard!)}
                      loading="eager"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setLightboxImage(project.moodboard!)}
                        className="bg-black/80 hover:bg-black text-white text-xs px-3.5 py-2 rounded-full backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg border border-white/20 cursor-pointer"
                      >
                        <span>🔍</span>
                        <span>Agrandir / Plein écran (HD)</span>
                      </button>
                    </div>
                  </div>
                ) : activeMedia === "secondary" && project.secondaryImage ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-stone-900 group">
                    <img
                      src={project.secondaryImage}
                      alt={project.secondaryImageTitle || "Planche de style"}
                      className="w-full h-full object-contain cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
                      onClick={() => setLightboxImage(project.secondaryImage!)}
                      loading="eager"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setLightboxImage(project.secondaryImage!)}
                        className="bg-black/80 hover:bg-black text-white text-xs px-3.5 py-2 rounded-full backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg border border-white/20 cursor-pointer"
                      >
                        <span>🔍</span>
                        <span>Agrandir / Plein écran</span>
                      </button>
                    </div>
                  </div>
                ) : activeMedia === "pdf" && project.pdfLink ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[var(--color-warm-white)] text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[var(--color-rose-pale)] border border-[var(--color-rose-blush)] flex items-center justify-center mb-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-rose-primary)]">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <p className="font-body text-lg text-[var(--color-ink)] font-semibold mb-2">Charte Graphique PDF</p>
                    <p className="font-body text-sm text-[var(--color-ink-muted)] mb-4">Consultez le document officiel en haute définition</p>
                    <a
                      href={project.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[var(--color-rose-primary)] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--color-rose-deep)] transition-all shadow-sm"
                    >
                      📄 Ouvrir la charte PDF
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    </a>
                  </div>
                ) : (
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-full object-contain cursor-zoom-in"
                    onClick={() => setLightboxImage(project.image)}
                    onError={(e) => {
                      if (project.thumbnail && e.currentTarget.src !== project.thumbnail) {
                        e.currentTarget.src = project.thumbnail;
                      }
                    }}
                  />
                )}
              </div>
            </div>

            <div>
              <h2 id="modal-title" className="font-display text-3xl sm:text-4xl text-[var(--color-ink)] mb-3">
                {project.title}
              </h2>
              <p className="font-body text-lg text-[var(--color-ink-soft)] leading-relaxed">
                {project.fullDesc}
              </p>
            </div>

            {/* Grid Challenge & Solution */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[var(--color-rose-pale)] p-6 rounded-2xl border border-[var(--color-rose-blush)]">
                <h4 className="font-body font-bold text-[var(--color-rose-deep)] mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <span>🎯</span> Le Challenge
                </h4>
                <p className="font-body text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200/60">
                <h4 className="font-body font-bold text-emerald-800 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <span>💡</span> La Solution Apportée
                </h4>
                <p className="font-body text-sm text-emerald-950 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Dedicated Moodboard Highlight Section */}
            {project.moodboard && (
              <div className="bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/60 p-6 sm:p-7 rounded-2xl border border-amber-200/70 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shadow-xs">
                      🎨
                    </div>
                    <div>
                      <h4 className="font-display text-xl text-[var(--color-ink)] font-bold">
                        {project.moodboardTitle || "Moodboard Officiel & Univers Visuel"}
                      </h4>
                      <p className="font-body text-xs text-[var(--color-ink-soft)]">
                        Inspirations, chromatisme, textures et direction artistique
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeMedia !== "moodboard" && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMedia("moodboard");
                          const scrollEl = document.getElementById("project-modal-scroll");
                          if (scrollEl) scrollEl.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>👁️</span>
                        <span>Afficher ci-dessus</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setLightboxImage(project.moodboard!)}
                      className="px-3.5 py-1.5 rounded-full bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>🔍</span>
                      <span>Plein écran HD</span>
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-5 pt-2 items-center">
                  <div
                    onClick={() => setLightboxImage(project.moodboard!)}
                    className="sm:col-span-1 relative aspect-4/3 rounded-xl overflow-hidden cursor-zoom-in group shadow-md border border-white"
                  >
                    <img
                      src={project.moodboard}
                      alt="Aperçu Moodboard"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1">
                      <span>🔍</span> Agrandir HD
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-3">
                    <p className="font-body text-xs sm:text-sm text-[var(--color-ink-soft)] leading-relaxed">
                      {project.id === "proj-tollou-daba"
                        ? "Le moodboard de Tollou Daba capture l'essence vivrière et agroécologique du Sénégal : semences fertiles, cultures maraîchères (mangues fraîches, melons gorgés de soleil, pommes de terre, choux) et tonalités de terroir qui ancrent la marque."
                        : "Ce moodboard structure les références visuelles clés : harmonie des couleurs, ambiance émotionnelle, styles d'illustration et codes graphiques."}
                    </p>

                    {project.id === "proj-tollou-daba" && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-xs font-mono shadow-2xs">
                          <span className="w-3.5 h-3.5 rounded-full shadow-xs" style={{ backgroundColor: "#FBC02D" }}></span>
                          <span className="font-bold text-[var(--color-ink)]">#FBC02D</span>
                          <span className="text-[10px] text-[var(--color-ink-muted)]">Ocre Solaire</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-emerald-200 text-xs font-mono shadow-2xs">
                          <span className="w-3.5 h-3.5 rounded-full shadow-xs" style={{ backgroundColor: "#045630" }}></span>
                          <span className="font-bold text-[var(--color-ink)]">#045630</span>
                          <span className="text-[10px] text-[var(--color-ink-muted)]">Vert Végétal</span>
                        </div>
                      </div>
                    )}
                    {project.id === "proj-moodboard-sheet" && (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-xs font-mono shadow-2xs">
                          <span className="w-3.5 h-3.5 rounded-full shadow-xs" style={{ backgroundColor: "#3B60AA" }}></span>
                          <span className="font-bold text-[var(--color-ink)]">#3B60AA</span>
                          <span className="text-[10px] text-[var(--color-ink-muted)]">Bleu Ciel</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-pink-200 text-xs font-mono shadow-2xs">
                          <span className="w-3.5 h-3.5 rounded-full shadow-xs" style={{ backgroundColor: "#E9417A" }}></span>
                          <span className="font-bold text-[var(--color-ink)]">#E9417A</span>
                          <span className="text-[10px] text-[var(--color-ink-muted)]">Rose Corail</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tools & Deliverables */}
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div>
                <h4 className="font-body font-semibold text-sm text-[var(--color-ink)] uppercase tracking-wider mb-3">
                  Outils Utilisés
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 rounded-xl bg-[var(--color-warm-muted)] text-[var(--color-ink)] text-xs font-medium border border-[var(--color-warm-border)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-body font-semibold text-sm text-[var(--color-ink)] uppercase tracking-wider mb-3">
                  Livrables Clés
                </h4>
                <ul className="space-y-1.5">
                  {project.deliverables.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs font-body text-[var(--color-ink-soft)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-rose-primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-[var(--color-warm-white)] border-t border-[var(--color-warm-border)] flex items-center justify-between flex-wrap gap-3">
            <button
              onClick={onClose}
              className="text-sm font-body text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors cursor-pointer"
            >
              Fermer l'aperçu
            </button>
            <div className="flex items-center gap-3">
              {project.pdfLink && (
                <a
                  href={project.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border border-[var(--color-warm-border)] text-[var(--color-ink)] px-4 py-2.5 rounded-full text-sm font-medium hover:border-[var(--color-rose-primary)] transition-all shadow-sm"
                >
                  📄 Voir la charte PDF
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                </a>
              )}
              {project.moodboard && (
                <button
                  type="button"
                  onClick={() => setLightboxImage(project.moodboard!)}
                  className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2.5 rounded-full text-sm font-medium transition-all shadow-sm cursor-pointer"
                >
                  🎨 Moodboard HD
                </button>
              )}
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-[var(--color-rose-primary)] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--color-rose-deep)] transition-all shadow-sm"
              >
                Discuter d'un projet similaire
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-60 bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div className="w-full max-w-5xl flex items-center justify-between pb-3 text-white">
            <span className="text-sm font-semibold flex items-center gap-2">
              <span>🎨</span>
              <span>Aperçu Haute Définition</span>
            </span>
            <button
              onClick={() => setLightboxImage(null)}
              className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>✕</span> Fermer
            </button>
          </div>
          <div
            className="relative max-w-5xl max-h-[85vh] overflow-auto rounded-2xl bg-black/40 p-2 flex items-center justify-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Aperçu haute résolution"
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl cursor-default"
            />
          </div>
          <p className="text-white/60 text-xs mt-3 font-body text-center">
            Cliquez n'importe où en dehors de l'image ou sur la touche Échap pour fermer
          </p>
        </div>
      )}
    </>
  );
}

/* ─── Navbar Component ───────────────────────────────────────────────── */
function Navbar({ onCopyEmail }: { onCopyEmail: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Scroll spy
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-warm-white)]/90 backdrop-blur-md shadow-sm border-b border-[var(--color-warm-border)]/80 py-3"
          : "bg-transparent py-5"
      }`}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-6 flex items-center justify-between"
        aria-label="Navigation principale"
      >
        {/* Brand Logo */}
        <a
          href="#accueil"
          className="group flex items-center gap-2.5"
          aria-label="Daba Diop — Accueil"
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[var(--color-rose-pale)] border border-[var(--color-rose-blush)] text-[var(--color-rose-deep)] font-display text-xl font-bold group-hover:scale-105 transition-transform">
            D
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-rose-primary)] transition-colors leading-tight">
              Daba Diop
            </span>
            <span className="text-[10px] tracking-widest uppercase font-body text-[var(--color-rose-deep)] font-semibold">
              Assistante Référente Digitale
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1.5 bg-white/70 p-1.5 rounded-full border border-[var(--color-warm-border)] shadow-xs backdrop-blur-sm" role="list">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-xs font-body font-medium transition-all duration-200 block ${
                    isActive
                      ? "bg-[var(--color-rose-primary)] text-white shadow-xs"
                      : "text-[var(--color-ink-soft)] hover:text-[var(--color-rose-primary)] hover:bg-[var(--color-rose-pale)]/60"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onCopyEmail}
            className="text-xs font-medium font-body text-[var(--color-ink-soft)] hover:text-[var(--color-rose-primary)] px-3 py-2 rounded-full hover:bg-[var(--color-rose-pale)] transition-all flex items-center gap-1.5"
            title="Copier l'adresse e-mail de Daba Diop"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copier Email
          </button>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[var(--color-ink)] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[var(--color-rose-deep)] transition-all shadow-xs"
          >
            Me contacter
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </a>
        </div>

        {/* Mobile menu trigger button */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 rounded-xl bg-white border border-[var(--color-warm-border)] p-2.5 text-[var(--color-ink)]"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-full bg-current transition-all duration-300 ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-current transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-current transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile drop menu */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[480px] opacity-100 border-b border-[var(--color-warm-border)]" : "max-h-0 opacity-0"
        } bg-[var(--color-warm-white)]/98 backdrop-blur-lg`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col px-6 py-4 gap-1" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={closeMenu}
                className="flex items-center justify-between py-3 text-sm font-body text-[var(--color-ink-soft)] hover:text-[var(--color-rose-primary)] border-b border-[var(--color-warm-border)]/40"
              >
                <span>{item.label}</span>
                <span className="text-xs text-[var(--color-rose-primary)]">→</span>
              </a>
            </li>
          ))}
          <li className="pt-4 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={closeMenu}
              className="inline-flex items-center justify-center w-full bg-[var(--color-rose-primary)] text-white py-3 rounded-xl text-sm font-medium shadow-sm hover:bg-[var(--color-rose-deep)] transition-colors"
            >
              Me contacter
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

/* ─── Hero Section (Nouvelle Page de Garde Élégante & Signature) ─────── */
function Hero({ onCopyEmail }: { onCopyEmail: () => void }) {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Dakar is GMT+0
      const hours = now.getUTCHours().toString().padStart(2, "0");
      const minutes = now.getUTCMinutes().toString().padStart(2, "0");
      setLocalTime(`${hours}:${minutes} GMT`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="accueil"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center overflow-hidden bg-[var(--color-warm-white)]"
      aria-labelledby="hero-title"
    >
      {/* Dynamic background lighting / glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#E29587]/20 via-[#C17C74]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-[var(--color-rose-blush)]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[var(--color-warm-muted)] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* Top Status Banner Strip */}
        <div className="animate-fadeInUp opacity-0 flex flex-wrap items-center justify-between gap-3 pb-8 mb-6 border-b border-[var(--color-warm-border)]/60 text-xs font-body">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-emerald-800 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Disponible pour opportunités & projets créatifs</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[var(--color-ink-muted)]">
            <span className="flex items-center gap-1.5">
              <span className="text-sm">📍</span> Dakar, Sénégal
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-warm-border)]" />
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <span>🕒</span> {localTime || "Dakar (GMT)"}
            </span>
          </div>
        </div>

        {/* Hero Grid Split Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column : Editorial Typography & Action */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Tag */}
            <div className="animate-fadeInUp animate-delay-100 opacity-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-rose-pale)] border border-[var(--color-rose-blush)] text-[var(--color-rose-deep)] text-xs font-semibold tracking-wider uppercase">
              <span className="text-sm">✨</span> Portfolio 2026 · Assistante Référente Digitale
            </div>

            {/* Main Headline */}
            <h1
              id="hero-title"
              className="animate-fadeInUp animate-delay-200 opacity-0 font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink)] leading-[1.12] tracking-tight"
            >
              Donner vie à vos idées avec{" "}
              <span className="italic gradient-text-rose font-normal">clarté</span>,{" "}
              <span className="italic gradient-text-rose font-normal">élégance</span> &{" "}
              <span className="italic gradient-text-rose font-normal">impact</span>.
            </h1>

            {/* Elevator Pitch */}
            <p className="animate-fadeInUp animate-delay-300 opacity-0 font-body text-base sm:text-lg text-[var(--color-ink-soft)] leading-relaxed max-w-xl">
              Je suis <strong className="font-semibold text-[var(--color-ink)]">Daba Diop</strong>, assistante référente digitale et designer passionnée basée à Dakar. J'accompagne marques et projets dans la création d'expériences visuelles mémorables — du design graphique à l'UX/UI avec Canva, Figma et une approche centrée sur l'humain.
            </p>

            {/* Action Buttons Row */}
            <div className="animate-fadeInUp animate-delay-400 opacity-0 flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#projets"
                className="inline-flex items-center gap-2.5 bg-[var(--color-rose-primary)] text-white px-7 py-3.5 rounded-full font-body font-semibold text-sm hover:bg-[var(--color-rose-deep)] hover:shadow-lg hover:shadow-[var(--color-rose-primary)]/20 active:scale-95 transition-all"
              >
                Découvrir mes réalisations
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <a
                href="assets/Daba-Diop-CV.pdf"
                download
                className="inline-flex items-center gap-2 bg-white border border-[var(--color-warm-border)] text-[var(--color-ink)] px-6 py-3.5 rounded-full font-body font-medium text-sm hover:border-[var(--color-rose-primary)] hover:text-[var(--color-rose-primary)] hover:shadow-xs active:scale-95 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Télécharger mon CV
              </a>

              <a
                href="https://wa.me/221770000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600/10 text-emerald-800 border border-emerald-200 px-4 py-3.5 rounded-full font-body text-xs font-semibold hover:bg-emerald-600 hover:text-white transition-all"
                title="Démarrer une discussion sur WhatsApp"
              >
                <span>💬</span> WhatsApp
              </a>
            </div>

            {/* Trust Metrics Strip */}
            <div className="animate-fadeInUp animate-delay-500 opacity-0 pt-6 border-t border-[var(--color-warm-border)]/60 grid grid-cols-3 gap-4">
              <div>
                <p className="font-display text-2xl sm:text-3xl text-[var(--color-ink)] font-bold">25+</p>
                <p className="font-body text-xs text-[var(--color-ink-muted)]">Projets & Visuels créés</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl text-[var(--color-rose-primary)] font-bold">100%</p>
                <p className="font-body text-xs text-[var(--color-ink-muted)]">Approche centrée humain</p>
              </div>
              <div>
                <p className="font-display text-2xl sm:text-3xl text-[var(--color-ink)] font-bold">ODC</p>
                <p className="font-body text-xs text-[var(--color-ink-muted)]">Orange Digital Center</p>
              </div>
            </div>
          </div>

          {/* Right Column : Signature Portrait Stage & Floating Interactive Badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fadeInUp animate-delay-300 opacity-0">
            <div className="relative">
              {/* Outer Decorative Glow Rings */}
              <div className="absolute -inset-4 rounded-3xl border border-[var(--color-rose-blush)]/70 pointer-events-none" />
              <div className="absolute -inset-8 rounded-3xl border border-[var(--color-warm-border)]/50 pointer-events-none" />
              
              {/* Radial gradient background behind photo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-rose-accent)]/30 to-[var(--color-rose-primary)]/20 rounded-3xl blur-2xl -z-10" />

              {/* Main Photo Card */}
              <div className="relative w-72 h-96 sm:w-80 sm:h-[440px] rounded-3xl overflow-hidden bg-[var(--color-rose-pale)] border-2 border-white shadow-2xl">
                <img
                  src="/photo/ODC-Shoot-P8-2026-12.jpg"
                  alt="Daba Diop - Portrait professionnel Assistante référente digitale & UX/UI Designer"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                  onError={(e) => {
                    if (e.currentTarget.src !== "/photo/ODC-Shoot-P8-2026 12.jpg") {
                      e.currentTarget.src = "/photo/ODC-Shoot-P8-2026 12.jpg";
                    }
                  }}
                />
                
                {/* Refined Ambient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/35 via-transparent to-black/10 pointer-events-none" />
                
                {/* Bottom Signature Name Bar */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 shadow-md flex items-center justify-between">
                  <div>
                    <p className="font-display text-sm text-[var(--color-ink)] font-bold">Daba Diop</p>
                    <p className="font-body text-[10px] text-[var(--color-rose-deep)] font-medium">Assistante Référente Digitale</p>
                  </div>
                  <span className="text-xs bg-[var(--color-rose-pale)] px-2.5 py-1 rounded-full text-[var(--color-rose-primary)] font-bold">
                    ODC
                  </span>
                </div>
              </div>

              {/* Floating Badge 1: UX/UI & Figma (Top-Left) */}
              <div className="absolute -top-4 -left-6 sm:-left-10 bg-white/95 backdrop-blur-md border border-[var(--color-warm-border)] px-4 py-2.5 rounded-2xl shadow-lg animate-float flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-base">
                  🎨
                </div>
                <div>
                  <p className="font-body text-xs font-bold text-[var(--color-ink)]">UX/UI & Prototypage</p>
                  <p className="font-body text-[10px] text-[var(--color-ink-muted)]">Figma & Design System</p>
                </div>
              </div>

              {/* Floating Badge 2: Canva Expert (Bottom-Right) */}
              <div className="absolute -bottom-5 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md border border-[var(--color-warm-border)] px-4 py-2.5 rounded-2xl shadow-lg animate-float-delayed flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 flex items-center justify-center text-base">
                  ✨
                </div>
                <div>
                  <p className="font-body text-xs font-bold text-[var(--color-ink)]">Canva Pro & Visuals</p>
                  <p className="font-body text-[10px] text-[var(--color-rose-deep)]">Branding & Social Media</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Skills Marquee Ticker */}
      <div className="absolute bottom-0 left-0 right-0 py-3 bg-[var(--color-ink)] text-white/90 overflow-hidden border-y border-white/10 select-none">
        <div className="animate-marquee flex items-center gap-8 text-xs font-body tracking-widest font-semibold uppercase">
          <span>✦ DESIGN GRAPHIQUE</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>UX/UI DESIGN</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>CANVA PRO EXPERT</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>IDENTITÉ VISUELLE & BRANDING</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>PROTOTYPAGE FIGMA</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>STRATÉGIE DIGITALE</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>DAKAR · SÉNÉGAL</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>✦ DESIGN GRAPHIQUE</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>UX/UI DESIGN</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>CANVA PRO EXPERT</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>IDENTITÉ VISUELLE & BRANDING</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>PROTOTYPAGE FIGMA</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>STRATÉGIE DIGITALE</span>
          <span className="text-[var(--color-rose-accent)]">●</span>
          <span>DAKAR · SÉNÉGAL</span>
        </div>
      </div>
    </section>
  );
}

/* ─── About Section (À Propos & Philosophie) ─────────────────────────── */
function About() {
  const pillars = [
    {
      icon: "🎯",
      title: "Clarté & Simplicité",
      desc: "Rendre l'information immédiatement compréhensible et agréable à parcourir.",
    },
    {
      icon: "❤️",
      title: "Approche Centrée Humain",
      desc: "Concevoir chaque visuel et chaque parcours en comprenant les vrais besoins des utilisateurs.",
    },
    {
      icon: "✨",
      title: "Sens du Détail & Esthétique",
      desc: "Créer une harmonie visuelle raffinée qui valorise l'image de marque.",
    },
    {
      icon: "⚡",
      title: "Agilité & Efficacité",
      desc: "Livrer des résultats de haute qualité avec des outils modernes comme Canva et Figma.",
    },
  ];

  return (
    <RevealSection id="apropos" className="py-24 md:py-32 bg-[var(--color-warm-muted)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-rose-pale)] text-[var(--color-rose-deep)] text-xs font-semibold uppercase tracking-wider">
              À Propos de moi
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[var(--color-ink)] leading-tight">
              Une vision créative au service de vos{" "}
              <span className="italic text-[var(--color-rose-primary)]">ambitions digitales</span>.
            </h2>

            <p className="font-body text-[var(--color-ink-soft)] text-base sm:text-lg leading-relaxed">
              Passionnée par l'intersection entre le design, la technologie et la communication, je mets mes compétences en <strong>Design Graphique</strong>, <strong>Canva</strong> et <strong>UX/UI Design</strong> au service de projets qui cherchent à se démarquer.
            </p>

            <p className="font-body text-[var(--color-ink-soft)] text-base leading-relaxed">
              Mon objectif est simple : transformer des concepts parfois complexes en supports visuels limpides, esthétiques et engageants. Formée auprès d'écosystèmes d'excellence comme l'Orange Digital Center, je combine rigueur méthodologique et créativité spontanée.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-body text-xs text-[var(--color-ink-muted)] uppercase">Localisation</p>
                  <p className="font-body font-semibold text-sm text-[var(--color-ink)]">Dakar, Sénégal</p>
                </div>
              </div>
              <div className="w-px h-10 bg-[var(--color-warm-border)]" />
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌍</span>
                <div>
                  <p className="font-body text-xs text-[var(--color-ink-muted)] uppercase">Disponibilité</p>
                  <p className="font-body font-semibold text-sm text-[var(--color-ink)]">Présentiel & Remote</p>
                </div>
              </div>
            </div>
          </div>

          {/* Value cards */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="card-luxury p-6 rounded-3xl space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-rose-pale)] border border-[var(--color-rose-blush)] flex items-center justify-center text-xl">
                  {pillar.icon}
                </div>
                <h3 className="font-body font-bold text-base text-[var(--color-ink)]">
                  {pillar.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[var(--color-ink-muted)] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Skills Section (Compétences & Stack) ────────────────────────────── */
function Skills() {
  const [filter, setFilter] = useState<"all" | "visual" | "uxui" | "tools" | "strategy">("all");

  const filteredSkills = filter === "all" ? SKILLS_DATA : SKILLS_DATA.filter((s) => s.category === filter);

  return (
    <RevealSection id="competences" className="py-24 md:py-32 bg-[var(--color-warm-white)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-rose-pale)] text-[var(--color-rose-deep)] text-xs font-semibold uppercase tracking-wider mb-4">
              Expertise & Savoir-faire
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[var(--color-ink)]">
              Ce que je maîtrise & pratique
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 bg-[var(--color-warm-muted)] p-1.5 rounded-2xl border border-[var(--color-warm-border)]">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-body font-medium transition-all ${
                filter === "all"
                  ? "bg-white text-[var(--color-ink)] shadow-xs"
                  : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFilter("visual")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-body font-medium transition-all ${
                filter === "visual"
                  ? "bg-white text-[var(--color-ink)] shadow-xs"
                  : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              Design Graphique
            </button>
            <button
              onClick={() => setFilter("uxui")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-body font-medium transition-all ${
                filter === "uxui"
                  ? "bg-white text-[var(--color-ink)] shadow-xs"
                  : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              UX/UI Design
            </button>
            <button
              onClick={() => setFilter("tools")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-body font-medium transition-all ${
                filter === "tools"
                  ? "bg-white text-[var(--color-ink)] shadow-xs"
                  : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              Canva & Outils
            </button>
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="card-luxury p-7 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2.5 rounded-2xl bg-[var(--color-rose-pale)] border border-[var(--color-rose-blush)]">
                    {skill.icon}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[var(--color-rose-deep)] bg-[var(--color-rose-pale)] px-2.5 py-1 rounded-full">
                    {skill.tag}
                  </span>
                </div>

                <h3 className="font-body font-bold text-lg text-[var(--color-ink)] mb-2">
                  {skill.name}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[var(--color-ink-muted)] leading-relaxed mb-6">
                  {skill.description}
                </p>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center text-xs font-body font-semibold mb-2">
                  <span className="text-[var(--color-ink-soft)]">Niveau de maîtrise</span>
                  <span className="text-[var(--color-rose-primary)]">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-[var(--color-warm-muted)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-terracotta)] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Services Section ───────────────────────────────────────────────── */
function Services() {
  return (
    <RevealSection id="services" className="py-24 md:py-32 bg-[var(--color-rose-pale)]/70">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[var(--color-rose-deep)] text-xs font-semibold uppercase tracking-wider mb-4 border border-[var(--color-rose-blush)]">
            Services & Collaborations
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[var(--color-ink)] mb-4">
            Comment nous pouvons travailler ensemble
          </h2>
          <p className="font-body text-sm sm:text-base text-[var(--color-ink-soft)]">
            Des solutions visuelles complètes, clé en main et conçues pour générer des résultats concrets pour votre communication.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.number}
              className="bg-white rounded-3xl p-8 border border-[var(--color-rose-blush)] shadow-xs hover:border-[var(--color-rose-primary)] hover:shadow-xl hover:shadow-[var(--color-rose-primary)]/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 rounded-2xl bg-[var(--color-rose-pale)] flex items-center justify-center text-2xl border border-[var(--color-rose-blush)]">
                    {service.icon}
                  </span>
                  <span className="font-display text-3xl text-[var(--color-rose-primary)]/40 font-bold">
                    {service.number}
                  </span>
                </div>

                <h3 className="font-body font-bold text-xl text-[var(--color-ink)] mb-2">
                  {service.title}
                </h3>
                <p className="font-body text-xs font-medium text-[var(--color-rose-deep)] uppercase tracking-wider mb-3">
                  {service.short}
                </p>
                <p className="font-body text-sm text-[var(--color-ink-soft)] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-4 border-t border-[var(--color-warm-border)]">
                  {service.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-xs font-body text-[var(--color-ink-soft)]">
                      <span className="text-[var(--color-rose-primary)] font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-between w-full bg-[var(--color-warm-white)] hover:bg-[var(--color-rose-primary)] text-[var(--color-ink)] hover:text-white px-5 py-3 rounded-2xl text-xs font-semibold transition-all border border-[var(--color-warm-border)] hover:border-[var(--color-rose-primary)] group"
                >
                  <span>Demander un devis ou échanger</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Project Card Media Component ───────────────────────────────────── */
function ProjectCardMedia({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative aspect-[16/10] overflow-hidden bg-[var(--color-warm-muted)]"
    >
      {project.video ? (
        <video
          ref={videoRef}
          src={project.video}
          poster={project.thumbnail || project.image}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      ) : (
        <img
          src={
            project.thumbnail && !project.thumbnail.endsWith(".pdf")
              ? project.thumbnail
              : !project.image.endsWith(".pdf")
              ? project.image
              : "/photo/tollou-thumb.jpg"
          }
          alt={project.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (project.image && !project.image.endsWith(".pdf") && target.src !== project.image) {
              target.src = project.image;
            } else if (target.src !== "/photo/tollou-thumb.jpg") {
              target.src = "/photo/tollou-thumb.jpg";
            }
          }}
        />
      )}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[var(--color-rose-deep)] shadow-xs pointer-events-none">
        {project.categoryLabel}
      </div>
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono pointer-events-none">
        #{project.number}
      </div>
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 pointer-events-none">
        {project.pdfLink && (
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[var(--color-ink)] shadow-xs flex items-center gap-1.5">
            <span>📄</span>
            <span>Charte PDF</span>
          </div>
        )}
        {project.moodboard && (
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-amber-900 shadow-xs flex items-center gap-1.5">
            <span>🎨</span>
            <span>Moodboard</span>
          </div>
        )}
      </div>
      {project.video && (
        <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1.5 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Vidéo active</span>
        </div>
      )}
      {project.video && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-rose-primary)] ml-1">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Projects Section ───────────────────────────────────────────────── */
function Projects({ onSelectProject }: { onSelectProject: (p: Project) => void }) {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? PROJECTS
      : filter === "Graphisme"
      ? PROJECTS.filter((p) => p.category === "Graphisme" || Boolean(p.moodboard))
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <RevealSection id="projets" className="py-24 md:py-32 bg-[var(--color-warm-white)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-rose-pale)] text-[var(--color-rose-deep)] text-xs font-semibold uppercase tracking-wider mb-4">
              Portfolio & Réalisations
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[var(--color-ink)]">
              Projets sélectionnés
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-[var(--color-warm-muted)] p-1.5 rounded-2xl border border-[var(--color-warm-border)]">
            {[
              { id: "all", label: "Tous les projets" },
              { id: "Branding", label: "Identité Visuelle" },
              { id: "UX/UI", label: "UX/UI Design" },
              { id: "Graphisme", label: "Moodboards & Graphisme" },
              { id: "Motion", label: "Motion Design" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-body font-medium transition-all ${
                  filter === tab.id
                    ? "bg-white text-[var(--color-ink)] shadow-xs"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer card-luxury rounded-3xl overflow-hidden flex flex-col justify-between"
            >
              {/* Image / video thumbnail banner with hover preview */}
              <ProjectCardMedia project={project} />

              {/* Text content */}
              <div className="p-7 space-y-4">
                <h3 className="font-display text-2xl text-[var(--color-ink)] group-hover:text-[var(--color-rose-primary)] transition-colors">
                  {project.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  {project.shortDesc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-lg bg-[var(--color-rose-pale)] text-[var(--color-rose-deep)] text-[11px] font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[var(--color-warm-border)] flex items-center justify-between">
                  <span className="font-body text-xs font-semibold text-[var(--color-rose-primary)] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Voir les détails du projet <span>→</span>
                  </span>
                  <span className="text-xs text-[var(--color-ink-muted)] font-body">Cliquer pour ouvrir</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Parcours & Timeline ────────────────────────────────────────────── */
function Parcours() {
  const [tab, setTab] = useState<"experience" | "formation">("formation");

  const timelineData = [
    {
      type: "formation",
      title: "Formation Assistante Référente Digitale & Design",
      org: "Orange Digital Center (ODC) · Dakar",
      period: "2024 - 2026",
      desc: "Programme intensif en compétences numériques, design graphique, ergonomie web, communication digitale et gestion de projets innovants.",
      icon: "🎓",
    },
    {
      type: "formation",
      title: "Spécialisation UX/UI & Outils Créatifs",
      org: "Ateliers & Certifications Professionnelles",
      period: "2025",
      desc: "Maîtrise avancée de Canva, Figma, méthodologie Design Thinking et création de Design Systems.",
      icon: "📜",
    },
    {
      type: "experience",
      title: "Assistante Référente Digitale & Créatrice de Contenu",
      org: "Projets & Collaborations · Dakar",
      period: "2025 - Présent",
      desc: "Conception de chartes graphiques, kits Canva pour réseaux sociaux et refonte de maquettes d'applications mobiles.",
      icon: "💼",
    },
    {
      type: "experience",
      title: "Designer Graphique & Assistante Création",
      org: "Missions Indépendantes & Associatives",
      period: "2024 - 2025",
      desc: "Production de supports visuels imprimés (affiches, brochures) et déclinaisons de bannières digitales.",
      icon: "✨",
    },
  ];

  const filteredTimeline = timelineData.filter((item) => item.type === tab);

  return (
    <RevealSection id="parcours" className="py-24 md:py-32 bg-[var(--color-warm-muted)]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-rose-pale)] text-[var(--color-rose-deep)] text-xs font-semibold uppercase tracking-wider mb-4">
            Parcours & Évolution
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-[var(--color-ink)] mb-4">
            Formations & Expériences
          </h2>
          <p className="font-body text-sm text-[var(--color-ink-soft)]">
            Un cheminement guidé par la curiosité, l'apprentissage continu et la recherche constante de l'excellence.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-2xl border border-[var(--color-warm-border)] flex gap-2 shadow-xs">
            <button
              onClick={() => setTab("formation")}
              className={`px-5 py-2.5 rounded-xl text-xs font-body font-semibold transition-all ${
                tab === "formation"
                  ? "bg-[var(--color-rose-primary)] text-white shadow-xs"
                  : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              🎓 Formations & Certifications
            </button>
            <button
              onClick={() => setTab("experience")}
              className={`px-5 py-2.5 rounded-xl text-xs font-body font-semibold transition-all ${
                tab === "experience"
                  ? "bg-[var(--color-rose-primary)] text-white shadow-xs"
                  : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              💼 Expériences Professionnelles
            </button>
          </div>
        </div>

        {/* Timeline list */}
        <div className="space-y-6">
          {filteredTimeline.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-[var(--color-warm-border)] shadow-xs hover:border-[var(--color-rose-primary)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-2xl bg-[var(--color-rose-pale)] border border-[var(--color-rose-blush)] flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </span>
                <div>
                  <span className="text-xs font-semibold text-[var(--color-rose-deep)] uppercase tracking-wider">
                    {item.period}
                  </span>
                  <h3 className="font-body font-bold text-lg text-[var(--color-ink)] mt-0.5">
                    {item.title}
                  </h3>
                  <p className="font-body text-xs font-medium text-[var(--color-ink-muted)] mb-2">
                    {item.org}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-[var(--color-ink-soft)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Contact Section ────────────────────────────────────────────────── */
function Contact({ onCopyEmail }: { onCopyEmail: () => void }) {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.nom.trim()) errs.nom = "Veuillez indiquer votre nom.";
    if (!form.email.trim()) {
      errs.email = "Veuillez indiquer votre adresse e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Veuillez indiquer un e-mail valide.";
    }
    if (!form.sujet.trim()) errs.sujet = "Veuillez préciser le sujet.";
    if (!form.message.trim()) errs.message = "Veuillez écrire votre message.";
    else if (form.message.trim().length < 8) errs.message = "Votre message est un peu court.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setForm({ nom: "", email: "", sujet: "", message: "" });
  };

  return (
    <RevealSection id="contact" className="py-24 md:py-32 bg-[var(--color-ink)] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[var(--color-rose-accent)] text-xs font-semibold uppercase tracking-wider mb-4">
                Prise de contact
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight">
                Donnons vie à votre prochain <span className="italic text-[var(--color-rose-primary)]">projet</span>.
              </h2>
            </div>

            <p className="font-body text-[#c4b5b0] text-sm sm:text-base leading-relaxed">
              Vous avez un projet de création visuelle, un besoin en UX/UI ou souhaitez intégrer une assistante référente digitale passionnée à votre équipe ? Je suis à votre écoute !
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-body text-xs text-[#9c8c88] uppercase">Localisation</p>
                  <p className="font-body font-semibold text-sm text-white">Dakar, Sénégal (Disponible en remote)</p>
                </div>
              </div>

              <div
                onClick={onCopyEmail}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--color-rose-primary)] cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-body text-xs text-[#9c8c88] uppercase">E-mail</p>
                    <p className="font-body font-semibold text-sm text-white group-hover:text-[var(--color-rose-accent)] transition-colors">
                      contact.dabadiop@gmail.com
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[var(--color-rose-accent)] font-body underline">Copier</span>
              </div>

              <a
                href="https://wa.me/221770000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400 cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-body text-xs text-emerald-400 uppercase font-semibold">WhatsApp Direct</p>
                    <p className="font-body font-semibold text-sm text-white">
                      Discuter instantanément
                    </p>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-body">Ouvrir →</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-semibold text-white hover:bg-white hover:text-[var(--color-ink)] transition-all font-body"
              >
                LinkedIn Profile ↗
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full border border-white/20 text-xs font-semibold text-white hover:bg-white hover:text-[var(--color-ink)] transition-all font-body"
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Contact Interactive Form */}
          <div className="lg:col-span-7 bg-[var(--color-warm-white)] rounded-3xl p-8 sm:p-10 text-[var(--color-ink)] shadow-2xl border border-white/20">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeInUp">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <h3 className="font-display text-3xl text-[var(--color-ink)]">
                  Message envoyé avec succès !
                </h3>
                <p className="font-body text-sm text-[var(--color-ink-soft)] max-w-sm mx-auto">
                  Merci beaucoup pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[var(--color-rose-primary)] text-white text-xs font-semibold hover:bg-[var(--color-rose-deep)] transition-all font-body"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <h3 className="font-display text-2xl text-[var(--color-ink)] mb-2">
                  Envoyez-moi un mot
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nom" className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">
                      Votre Nom *
                    </label>
                    <input
                      id="nom"
                      type="text"
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      placeholder="Ex: Amadou Diallo"
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-body text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-rose-primary)] transition-colors ${
                        errors.nom ? "border-red-400 bg-red-50/20" : "border-[var(--color-warm-border)]"
                      }`}
                    />
                    {errors.nom && <p className="text-red-500 text-[11px] mt-1 font-body">{errors.nom}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">
                      Adresse E-mail *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="amadou@domaine.com"
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-body text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-rose-primary)] transition-colors ${
                        errors.email ? "border-red-400 bg-red-50/20" : "border-[var(--color-warm-border)]"
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-[11px] mt-1 font-body">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">
                    Sujet de la demande *
                  </label>
                  <input
                    id="sujet"
                    type="text"
                    value={form.sujet}
                    onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                    placeholder="Ex: Projet d'identité visuelle / Opportunité d'emploi"
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-body text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-rose-primary)] transition-colors ${
                      errors.sujet ? "border-red-400 bg-red-50/20" : "border-[var(--color-warm-border)]"
                    }`}
                  />
                  {errors.sujet && <p className="text-red-500 text-[11px] mt-1 font-body">{errors.sujet}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-soft)] mb-2">
                    Votre Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Décrivez brièvement votre projet ou votre proposition..."
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-sm font-body text-[var(--color-ink)] resize-none focus:outline-none focus:border-[var(--color-rose-primary)] transition-colors ${
                      errors.message ? "border-red-400 bg-red-50/20" : "border-[var(--color-warm-border)]"
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-[11px] mt-1 font-body">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[var(--color-rose-primary)] hover:bg-[var(--color-rose-deep)] text-white font-body font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-98"
                >
                  Envoyer le message →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

/* ─── Footer Component ───────────────────────────────────────────────── */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-ink)] border-t border-white/10 py-10 text-[#a89793] font-body text-xs" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/10 text-white font-display font-bold">
            D
          </span>
          <div>
            <p className="text-white font-display text-sm font-bold">Daba Diop</p>
            <p className="text-[10px] text-[#736460]">Assistante Référente Digitale · Design & UX/UI · Dakar</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a href="#accueil" className="hover:text-white transition-colors">Accueil</a>
          <a href="#projets" className="hover:text-white transition-colors">Projets</a>
          <a href="#competences" className="hover:text-white transition-colors">Compétences</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <p>© {currentYear} Daba Diop. Tous droits réservés.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-[var(--color-rose-primary)] hover:text-white flex items-center justify-center text-white transition-colors"
            title="Retour en haut"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Application ───────────────────────────────────────────────── */
export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText("contact.dabadiop@gmail.com");
    setToastMessage("E-mail copié dans le presse-papier !");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);
  };

  return (
    <div className="min-h-full flex flex-col bg-[var(--color-warm-white)] text-[var(--color-ink)] selection:bg-[var(--color-rose-blush)] selection:text-[var(--color-ink)]">
      <Navbar onCopyEmail={handleCopyEmail} />
      
      <main id="main-content" className="flex-1">
        <Hero onCopyEmail={handleCopyEmail} />
        <About />
        <Skills />
        <Services />
        <Projects onSelectProject={(p) => setSelectedProject(p)} />
        <Parcours />
        <Contact onCopyEmail={handleCopyEmail} />
      </main>

      <Footer />

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Floating Toast notification */}
      <ToastNotification message={toastMessage} visible={showToast} />
    </div>
  );
}
