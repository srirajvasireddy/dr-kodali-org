import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  Leaf,
  Mail,
  Menu,
  Pause,
  Phone,
  Play,
  Quote,
  Scale,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";
import {
  trackEvent,
  trackPageView,
  trackSectionViews,
} from "./analytics";
import "./App.css";

const navItems = [
  ["Our Story", "/our-story"],
  ["His Legacy", "/legacy"],
  ["Our Work", "/our-work"],
  ["Impact", "/impact"],
  ["Women at Crossroads", "/women-at-crossroads"],
  ["Press", "/press"],
] as const;

const routePages = {
  "/": "home",
  "/our-story": "story",
  "/legacy": "legacy",
  "/our-work": "work",
  "/impact": "impact",
  "/women-at-crossroads": "crossroads",
  "/press": "press",
  "/get-involved": "join",
} as const;

const pageTitles: Record<string, string> = {
  "/": "Dr. Kodali Veeriah Educational Academy",
  "/our-story": "Our Story | Dr. Kodali Veeriah Educational Academy",
  "/legacy": "His Legacy | Dr. Kodali Veeriah Educational Academy",
  "/our-work": "Our Work | Dr. Kodali Veeriah Educational Academy",
  "/impact": "Community Impact | Dr. Kodali Veeriah Educational Academy",
  "/women-at-crossroads":
    "Women at Crossroads | Dr. Kodali Veeriah Educational Academy",
  "/press": "Press Coverage | Dr. Kodali Veeriah Educational Academy",
  "/get-involved": "Get Involved | Dr. Kodali Veeriah Educational Academy",
};

const programs = [
  {
    number: "01",
    title: "Homemaker’s Institute",
    text: "Free practical learning in yoga, meditation, acupressure, computer basics, fashion design, beauty therapy, cooking, nutrition, flower arrangement, interiors and handicrafts.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Education for all",
    text: "Talent tests, adult literacy, support for school dropouts, value-based education, science exhibitions, seminars and workshops that make learning accessible.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Women’s helpline",
    text: "Advice, information, guidance and counselling for women facing harassment or difficult circumstances.",
    icon: HeartHandshake,
  },
  {
    number: "04",
    title: "Healthy communities",
    text: "Health camps, preventive awareness, Chetana courses for prisoners, and programmes on health, legal rights and personal wellbeing.",
    icon: Users,
  },
  {
    number: "05",
    title: "Happy Villages",
    text: "Rural and slum outreach through environmental education, zero-budget farming, square-foot gardening, seed distribution and community-led renewal.",
    icon: Leaf,
  },
];

const objectives = [
  "Advance and spread education, science, art, technology and literature.",
  "Provide medical relief and maintenance for the sick.",
  "Relieve hardship among people who are poor, aged, disabled, orphaned or affected by natural calamities.",
  "Undertake, promote and support rural development programmes.",
  "Organise lectures, debates, discussions, seminars and excursions to diffuse knowledge and carry forward traditional values.",
  "Develop agriculture, irrigation and animal husbandry through modern methods for small farmers and rural empowerment.",
  "Help students from every community continue their studies.",
  "Collaborate with and support people, societies and institutions working toward similar aims.",
];

const founderMilestones = [
  [
    "Early service",
    "Published poems and articles, earned state-level prizes, and taught literacy to women and school dropouts in Narendradev Colony and N.V.R. Colony.",
  ],
  [
    "1982–1987",
    "Participated in N.S.S. international camps and celebrations, and contributed to the Telugu Ganga project at Srikalahasti.",
  ],
  [
    "2001",
    "Established the academy in her grandfather’s memory, translating the values she inherited into sustained community action.",
  ],
  [
    "Ongoing",
    "Led learning, health, agriculture, environment and anti-corruption initiatives, and created the Happy Villages project.",
  ],
];

const gallery = [
  {
    src: "/media/impact-4k/vizag-1.webp",
    thumb: "/media/impact-web/vizag-1.webp",
    alt: "Community service in Visakhapatnam",
    title: "Visakhapatnam service",
    caption: "Four days of service in Visakhapatnam’s underserved communities.",
  },
  {
    src: "/media/impact-4k/vizag-2.webp",
    thumb: "/media/impact-web/vizag-2.webp",
    alt: "Volunteers serving in Visakhapatnam",
    title: "Relief with dignity",
    caption: "Academy volunteers connecting directly with families.",
  },
  {
    src: "/media/impact-4k/vizag-3.webp",
    thumb: "/media/impact-web/vizag-3.webp",
    alt: "Community outreach during Visakhapatnam service",
    title: "Community outreach",
    caption: "Practical assistance delivered where it was needed.",
  },
  {
    src: "/media/impact-4k/vizag-4.webp",
    thumb: "/media/impact-web/vizag-4.webp",
    alt: "People at a Visakhapatnam service event",
    title: "Four days of action",
    caption: "Working side by side with local families.",
  },
  {
    src: "/media/impact-4k/memorial-1.webp",
    thumb: "/media/moments/memorial-1.webp",
    alt: "Guests at Dr Kodali Veeriah memorial meeting",
    title: "A legacy remembered",
    caption: "The first Dr. Kodali Veeriah memorial meeting.",
  },
  {
    src: "/media/impact-4k/memorial-2.webp",
    thumb: "/media/moments/memorial-2.webp",
    alt: "Speaker at Dr Kodali Veeriah memorial meeting",
    title: "Education in public life",
    caption: "Leaders and educators gathered to share knowledge.",
  },
  {
    src: "/media/impact-4k/memorial-3.webp",
    thumb: "/media/moments/memorial-3.webp",
    alt: "Felicitation at a memorial gathering",
    title: "Honouring service",
    caption: "Recognising a life dedicated to public service.",
  },
  {
    src: "/media/impact-4k/memorial-4.webp",
    thumb: "/media/moments/memorial-4.webp",
    alt: "Guests on stage at a memorial event",
    title: "First memorial meet",
    caption: "Friends, physicians and civic leaders in remembrance.",
  },
  {
    src: "/media/impact-4k/memorial-5.webp",
    thumb: "/media/moments/memorial-5.webp",
    alt: "Garlanding at a public event",
    title: "Public remembrance",
    caption: "A public gathering honouring Dr. Kodali Veeriah.",
  },
  {
    src: "/media/impact-4k/memorial-6.webp",
    thumb: "/media/moments/memorial-6.webp",
    alt: "Felicitation of a woman leader",
    title: "Women in leadership",
    caption: "Recognising women who served public life.",
  },
  {
    src: "/media/impact-4k/memorial-7.webp",
    thumb: "/media/moments/memorial-7.webp",
    alt: "Community leaders at an academy event",
    title: "A community together",
    caption: "Service brought local leaders and residents together.",
  },
  {
    src: "/media/impact-4k/anti-corruption.webp",
    thumb: "/media/moments/anti-corruption.webp",
    alt: "Procession against corruption",
    title: "Against corruption",
    caption: "A procession calling for accountable public institutions.",
  },
  {
    src: "/media/impact-4k/seeds.webp",
    thumb: "/media/moments/seeds.webp",
    alt: "Seeds being distributed to farmers",
    title: "Supporting farmers",
    caption: "Seeds distributed to local farmers.",
  },
  {
    src: "/media/impact-4k/vinayaka-2.webp",
    thumb: "/media/moments/vinayaka-2.webp",
    alt: "Community members at an academy programme",
    title: "Neighbourhood action",
    caption: "Local participation at an academy programme.",
  },
  {
    src: "/media/impact-4k/village-2.webp",
    thumb: "/media/moments/village-2.webp",
    alt: "Happy Villages community programme",
    title: "Palleku Podam",
    caption: "Back to the villages—working together to make them better.",
  },
  {
    src: "/media/impact-4k/village-3.webp",
    thumb: "/media/moments/village-3.webp",
    alt: "Villagers participating in a community meeting",
    title: "Happy Villages",
    caption: "Residents taking part in community-led rural renewal.",
  },
  {
    src: "/media/impact-4k/village-4.webp",
    thumb: "/media/moments/village-4.webp",
    alt: "Environmental awareness programme in a village",
    title: "Environmental awareness",
    caption:
      "A village conversation about global warming and protecting nature.",
  },
  {
    src: "/media/impact-4k/village-5.webp",
    thumb: "/media/moments/village-5.webp",
    alt: "Academy team speaking with rural residents",
    title: "Back to the roots",
    caption: "Practical learning shared directly with local residents.",
  },
  {
    src: "/media/home-carousel-landscape/01-4k.webp",
    thumb: "/media/home-carousel-landscape/01-hd.webp",
    alt: "Bandhavi distributing food to children during a community service programme",
    title: "Serving children with care",
    caption: "Food and support shared directly with children in the community.",
  },
  {
    src: "/media/home-carousel-landscape/02-4k.webp",
    thumb: "/media/home-carousel-landscape/02-hd.webp",
    alt: "Academy volunteers distributing food and supplies in the community",
    title: "Relief, shared person to person",
    caption: "Volunteers delivering practical assistance with dignity.",
  },
  {
    src: "/media/home-carousel-landscape/03-4k.webp",
    thumb: "/media/home-carousel-landscape/03-hd.webp",
    alt: "Bandhavi and community leaders taking part in an anti-corruption procession",
    title: "Standing together against corruption",
    caption: "Community voices coming together for accountable public life.",
  },
  {
    src: "/media/home-carousel-landscape/04-4k.webp",
    thumb: "/media/home-carousel-landscape/04-hd.webp",
    alt: "Seeds being presented to support farmers and rural livelihoods",
    title: "Seeds for stronger livelihoods",
    caption: "Supporting farmers through practical rural initiatives.",
  },
  {
    src: "/media/home-carousel-landscape/05-4k.webp",
    thumb: "/media/home-carousel-landscape/05-hd.webp",
    alt: "A large gathering of women participating in an academy programme",
    title: "Women gathering, learning and leading",
    caption: "A shared space for learning, confidence and community.",
  },
  {
    src: "/media/home-carousel-landscape/06-4k.webp",
    thumb: "/media/home-carousel-landscape/06-hd.webp",
    alt: "Bandhavi being recognised for her contribution to community service",
    title: "Honouring service and contribution",
    caption: "Recognition for sustained work in service of others.",
  },
  {
    src: "/media/home-carousel-landscape/07-4k.webp",
    thumb: "/media/home-carousel-landscape/07-hd.webp",
    alt: "Students and community members receiving support at an academy event",
    title: "Supporting students and families",
    caption: "Educational and community support reaching people directly.",
  },
  {
    src: "/media/home-carousel-landscape/08-4k.webp",
    thumb: "/media/home-carousel-landscape/08-hd.webp",
    alt: "Bandhavi joining community leaders for a tree planting programme",
    title: "Planting hope for the future",
    caption: "Environmental action rooted in community participation.",
  },
  {
    src: "/media/home-carousel-landscape/09-4k.webp",
    thumb: "/media/home-carousel-landscape/09-hd.webp",
    alt: "Community members receiving assistance during a public service programme",
    title: "Community service in action",
    caption: "Care translated into meaningful help for local families.",
  },
  {
    src: "/media/home-carousel-landscape/10-4k.webp",
    thumb: "/media/home-carousel-landscape/10-hd.webp",
    alt: "Bandhavi speaking with children during a community outreach programme",
    title: "Reaching children where they are",
    caption: "Listening, encouraging and connecting through outreach.",
  },
];

const pressImages = [
  "001",
  "004",
  "005",
  "007",
  "008",
  "009",
  "010",
  "012",
  "013",
  "015",
  "016",
  "017",
  "018",
  "020",
  "021",
  "022",
  "023",
  "024",
  "025",
  "026",
  "027",
  "028",
  "029",
  "030",
  "031",
  "032",
];
const pressPile = ["021", "012", "028", "016", "031", "009", "001"];
const featuredGallery = gallery.slice(0, 4);

const homeCarousel = gallery.filter(({ src }) =>
  src.startsWith("/media/home-carousel-landscape/"),
);

// The moments grid renders at ~160px wide. `thumb` is the wrong source for it:
// for carousel entries it is the 1404px file the home hero needs for its
// srcSet, so reusing it there costs 2.5 MB to draw postage stamps. These are
// 400px derivatives of the same masters — crisper on retina, ~15 KB each.
const momentThumb = (src: string) =>
  `/media/moments/${src.split("/").pop()!.replace(/\.\w+$/, "")}.webp`;

// The slider tops out at 1240px (1760px on very wide screens). Offering the
// 1600px variant alongside the 2880px master lets non-retina displays take
// the smaller file instead of always paying for the master.
const impactWeb = (src: string) =>
  `/media/impact-web/${src.split("/").pop()!}`;

// The thumb strip draws at roughly 84x42. It used to be fed the same 1404px
// files the main slide needs, which cost 2.5 MB to render ten postage stamps.
const carouselThumb = (src: string) =>
  `/media/carousel-thumbs/${src.split("/").pop()!}`;

// Middle rung between the 1404px and 3840px slide tiers. Without it a 2x
// laptop needs ~1500px and has to jump to the 3840px master — 727 KB where
// 168 KB will do.
const carouselMid = (src: string) => src.replace("-4k.webp", "-2k.webp");

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidePlaying, setSlidePlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [homeSlide, setHomeSlide] = useState(0);
  const [homePlaying, setHomePlaying] = useState(true);
  const [homeTouchStart, setHomeTouchStart] = useState<number | null>(null);
  // Off-screen slides are laid out (opacity 0), not removed, so `loading=lazy`
  // never held them back — all ten downloaded up front. Mount a slide's image
  // only once its slide has been reached, keeping one slide of lookahead so
  // the next is already decoded before the 4.8s auto-advance lands on it.
  // Slides already seen stay mounted so the .75s cross-fade still has an
  // outgoing image to fade out, even when a thumb click jumps several along.
  const [homeSlidesReady, setHomeSlidesReady] = useState(() => new Set([0, 1]));
  const [homeSlideSeen, setHomeSlideSeen] = useState(0);
  if (homeSlideSeen !== homeSlide) {
    // Adjusting state during render — React's documented alternative to an
    // effect here; it bails out on the very next pass instead of cascading.
    setHomeSlideSeen(homeSlide);
    setHomeSlidesReady((ready) => {
      const after = (homeSlide + 1) % homeCarousel.length;
      if (ready.has(homeSlide) && ready.has(after)) return ready;
      const grown = new Set(ready);
      grown.add(homeSlide);
      grown.add(after);
      return grown;
    });
  }
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const pageKey: (typeof routePages)[keyof typeof routePages] | "not-found" =
    currentPath in routePages
      ? routePages[currentPath as keyof typeof routePages]
      : "not-found";
  const isHome = pageKey === "home";

  useEffect(() => {
    document.title =
      pageTitles[currentPath] ??
      "Page Not Found | Dr. Kodali Veeriah Educational Academy";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPath]);

  useEffect(() => {
    trackPageView();
    trackSectionViews();
  }, [currentPath]);

  // One event per opened photograph, whichever way it was opened — thumbnail,
  // arrow button or keyboard.
  useEffect(() => {
    if (activeImage === null) return;
    trackEvent("gallery_image_view", {
      image_title: gallery[activeImage].title,
      image_index: activeImage + 1,
      image_src: gallery[activeImage].src,
    });
  }, [activeImage]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (activeImage !== null && event.key === "ArrowRight") {
        trackEvent("gallery_navigate", {
          method: "keyboard",
          direction: "next",
        });
        setActiveImage((activeImage + 1) % gallery.length);
      }
      if (activeImage !== null && event.key === "ArrowLeft") {
        trackEvent("gallery_navigate", {
          method: "keyboard",
          direction: "previous",
        });
        setActiveImage((activeImage - 1 + gallery.length) % gallery.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  useEffect(() => {
    if (!slidePlaying) return;
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % featuredGallery.length),
      5500,
    );
    return () => window.clearInterval(timer);
  }, [slidePlaying]);

  useEffect(() => {
    if (
      !homePlaying ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(
      () => setHomeSlide((current) => (current + 1) % homeCarousel.length),
      4800, // keep in step with the lookahead in the homeSlidesReady effect
    );
    return () => window.clearInterval(timer);
  }, [homePlaying]);

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        setIsScrolled(window.scrollY > 40);
        setScrollProgress(
          scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0,
        );
      });
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      ".statement-copy, .section-heading, .legacy-portrait, .legacy-date, .legacy-story, .legacy-aside, .values-band, .program, .impact-intro, .impact-slider, .more-moments, .founder-title, .founder-story, .founder-timeline, .crossroads-copy, .crossroads-stage, .objectives-head, .objective-list li, .press-copy, .press-stack, .press-grid, .join-copy, .join-form",
    );
    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("reveal-visible"));
      return;
    }
    targets.forEach((target, index) => {
      target.classList.add("reveal-ready");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const handleJoin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    trackEvent("form_submit", {
      form_name: "join-form",
      has_phone: Boolean(data.get("phone")),
      has_email: Boolean(data.get("email")),
      message_length: String(data.get("message") || "").length,
    });
    const body = `Name: ${name}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
    window.location.href = `mailto:pbandhavi@yahoo.com?subject=${encodeURIComponent(`Website enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="site-shell">
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      <header
        className={`site-header${isScrolled || !isHome ? " header-scrolled" : ""}`}
      >
        <a
          className="brand"
          href="/"
          aria-label="Dr Kodali Veeriah Educational Academy home"
        >
          <span className="brand-mark">DK</span>
          <span className="brand-copy">
            <strong>Dr. Kodali Veeriah</strong>
            <small>Educational Academy</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a
              className={currentPath === href ? "active" : undefined}
              aria-current={currentPath === href ? "page" : undefined}
              key={href}
              href={href}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className={`header-cta${currentPath === "/get-involved" ? " active" : ""}`}
          aria-current={currentPath === "/get-involved" ? "page" : undefined}
          href="/get-involved"
        >
          Get involved <ArrowRight size={17} />
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map(([label, href]) => (
            <a
              className={currentPath === href ? "active" : undefined}
              aria-current={currentPath === href ? "page" : undefined}
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              <ArrowRight size={18} />
            </a>
          ))}
          <a
            className={currentPath === "/get-involved" ? "active" : undefined}
            aria-current={currentPath === "/get-involved" ? "page" : undefined}
            href="/get-involved"
            onClick={() => setMenuOpen(false)}
          >
            Get involved <ArrowRight size={18} />
          </a>
        </nav>
      )}

      <main className={isHome ? "page-home" : "inner-page"}>
        {pageKey === "home" && (
        <section
          className="hero home-hero"
          id="top"
        >
          <div className="hero-glow" aria-hidden="true" />
          <span className="hero-monogram" aria-hidden="true">
            DK
          </span>
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> In memory of Dr. Kodali Veeriah • Since 2001
            </p>
            <h1>
              A legacy of care.
              <br />
              <em>A community of possibility.</em>
            </h1>
            <p className="hero-intro">
              A nonprofit led by Vasireddy Priya Bandhavi, helping women,
              students, families and rural communities move forward with
              knowledge, confidence and dignity.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/our-work">
                Explore our work <ArrowRight size={18} />
              </a>
              <a className="text-link" href="/our-story">
                Our story <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div
            className="home-visual home-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Moments from the academy's founding years"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                trackEvent("carousel_navigate", {
                  carousel: "home",
                  method: "keyboard",
                  direction: "next",
                });
                setHomeSlide((homeSlide + 1) % homeCarousel.length);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                trackEvent("carousel_navigate", {
                  carousel: "home",
                  method: "keyboard",
                  direction: "previous",
                });
                setHomeSlide(
                  (homeSlide - 1 + homeCarousel.length) % homeCarousel.length,
                );
              }
            }}
            onTouchStart={(event) =>
              setHomeTouchStart(event.touches[0].clientX)
            }
            onTouchEnd={(event) => {
              if (homeTouchStart === null) return;
              const distance = event.changedTouches[0].clientX - homeTouchStart;
              if (Math.abs(distance) > 45) {
                trackEvent("carousel_navigate", {
                  carousel: "home",
                  method: "swipe",
                  direction: distance < 0 ? "next" : "previous",
                });
                setHomeSlide((current) =>
                  distance < 0
                    ? (current + 1) % homeCarousel.length
                    : (current - 1 + homeCarousel.length) % homeCarousel.length,
                );
              }
              setHomeTouchStart(null);
            }}
          >
            <div className="home-carousel-stage" aria-live="off">
              {homeCarousel.map((image, index) => (
                <figure
                  className={`home-carousel-slide${index === homeSlide ? " active" : ""}`}
                  aria-hidden={index !== homeSlide}
                  key={image.src}
                >
                  {homeSlidesReady.has(index) && (
                    <img
                      className="home-carousel-image"
                      src={image.thumb}
                      srcSet={`${image.thumb} 1404w, ${carouselMid(image.src)} 2000w, ${image.src} 3840w`}
                      // Measured, not guessed: the slide renders ~53vw, capping
                      // near 990px on very wide screens. The old 62vw overstated
                      // it by a fifth, which pushed retina laptops onto the
                      // 3840px master when 2000px covers them.
                      sizes="(max-width: 720px) 100vw, (min-width: 1800px) 990px, 53vw"
                      alt={image.alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                    />
                  )}
                  <figcaption>
                    <span>
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(homeCarousel.length).padStart(2, "0")}
                    </span>
                    <div>
                      <small>Moments of service</small>
                      <strong>{image.title}</strong>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="home-carousel-toolbar">
              <div className="home-carousel-buttons">
                <button
                  type="button"
                  onClick={() =>
                    setHomeSlide(
                      (homeSlide - 1 + homeCarousel.length) %
                        homeCarousel.length,
                    )
                  }
                  aria-label="Previous historical photograph"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setHomePlaying(!homePlaying)}
                  aria-label={
                    homePlaying
                      ? "Pause historical photographs"
                      : "Play historical photographs"
                  }
                >
                  {homePlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setHomeSlide((homeSlide + 1) % homeCarousel.length)
                  }
                  aria-label="Next historical photograph"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <div className="home-carousel-progress" aria-hidden="true">
                <span
                  key={homeSlide}
                  className={homePlaying ? "playing" : ""}
                />
              </div>
            </div>
            <div
              className="home-carousel-thumbs"
              aria-label="Choose a historical photograph"
            >
              {homeCarousel.map((image, index) => (
                <button
                  type="button"
                  className={index === homeSlide ? "active" : ""}
                  onClick={() => setHomeSlide(index)}
                  aria-label={`Show ${image.title}`}
                  aria-current={index === homeSlide ? "true" : undefined}
                  key={image.src}
                >
                  <img src={carouselThumb(image.src)} alt="" />
                </button>
              ))}
            </div>
          </div>
          <div className="impact-strip" aria-label="Academy highlights">
            <div>
              <strong>2001</strong>
              <span>Academy registered</span>
            </div>
            <div>
              <strong>10,000+</strong>
              <span>Women supported</span>
            </div>
            <div>
              <strong>25+ yrs</strong>
              <span>Recorded service</span>
            </div>
            <div>
              <strong>Tenali</strong>
              <span>Rooted in Andhra Pradesh</span>
            </div>
          </div>
          <a className="scroll-cue" href="/our-story">
            Discover our story <ArrowRight size={15} />
          </a>
        </section>
        )}

        {pageKey === "story" && (
        <section
          className="statement-section section-pad"
          id="story"
        >
          <div className="section-index">01 / OUR STORY</div>
          <div className="statement-copy">
            <Quote size={42} strokeWidth={1.3} />
            <h2>A living memorial, expressed through service.</h2>
            <p>
              Dr. Kodali Veeriah Educational Academy was established in November
              2001 in his loving memory. Led by his granddaughter Vasireddy
              Priya Bandhavi, the nonprofit turns the values he lived by into
              practical help for people and communities.
            </p>
          </div>
        </section>
        )}

        {pageKey === "legacy" && (
        <section
          className="legacy cinematic-legacy section-pad"
          id="legacy"
        >
          <div className="legacy-glow" aria-hidden="true" />
          <span className="legacy-monogram" aria-hidden="true">
            DK
          </span>
          <div className="legacy-top">
            <div className="section-heading">
              <p className="kicker light">The life we honour</p>
              <h2>
                Remembering
                <br />
                Dr. Kodali Veeriah.
              </h2>
            </div>
            <div className="legacy-portrait">
              <div className="portrait-frame">
                <img
                  src="/media/portraits/kodaliveraiah-hd.webp"
                  alt="Dr. Kodali Veeriah seated at his desk"
                />
                <div className="portrait-label">
                  <span>1928—2000</span>
                  <strong>
                    Physician. Reformer.
                    <br />
                    Public servant.
                  </strong>
                </div>
              </div>
              <div className="since-badge">
                <span>
                  His values
                  <br />
                  live on
                </span>
                <strong>DK</strong>
              </div>
            </div>
          </div>
          <div className="legacy-grid">
            <div className="legacy-date">
              <span>20 August 1928</span>
              <i />
              <span>10 December 2000</span>
            </div>
            <div className="legacy-story">
              <p className="lead">
                Dr. Veeriah was a respected physician and surgeon from Moparru
                village near Tenali in Andhra Pradesh’s Guntur district.
              </p>
              <p>
                He graduated from Andhra Medical College, Visakhapatnam in 1950,
                securing second rank and a gold medal. In 1952, he began a
                general medical practice in Tenali with Dr. Kurra
                Veeraraghaviah. Together they kept treatment affordable and
                cared for people who could not pay.
              </p>
              <p>
                A lifelong social activist, he worked closely with leaders
                including Loknayak Jayaprakash Narayan and Ram Manohar Lohia. He
                brought Jayaprakash Narayan to Moparru and organised meetings
                around Tenali on socialist policy.
              </p>
              <p>
                He was elected MLA for Vemuru in 1985 as a Telugu Desam Party
                candidate, while remaining accessible to people from society’s
                most vulnerable sections.
              </p>
            </div>
            <aside className="legacy-aside">
              <span className="big-initial">V</span>
              <p>
                As a member of the Senate and Syndicates of Andhra and Nagarjuna
                Universities, he studied educational institutions across the
                USA, Canada, the UK, Ireland, Switzerland and Egypt—and brought
                those ideas home.
              </p>
              <p>
                He was also closely associated with V.S.R. &amp; N.V.R. College,
                Tenali, from its inception.
              </p>
            </aside>
          </div>
        </section>
        )}

        {pageKey === "legacy" && (
        <section className="values-band">
          <p>The values he lived by</p>
          <div>
            <span>
              <b>Dama</b>
              <small>Self-restraint</small>
            </span>
            <span>
              <b>Daana</b>
              <small>Generosity</small>
            </span>
            <span>
              <b>Daya</b>
              <small>Compassion</small>
            </span>
          </div>
        </section>
        )}

        {pageKey === "work" && (
        <section
          className="work section-pad"
          id="work"
        >
          <div className="section-heading split-heading">
            <div>
              <p className="kicker">How we help</p>
              <h2>
                Programs that meet
                <br />
                people where they are.
              </h2>
            </div>
            <p>
              Every programme begins with a simple question: what would help
              this person, family or village move forward with dignity?
            </p>
          </div>
          <div className="program-list">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <article className="program" key={program.number}>
                  <span className="program-number">{program.number}</span>
                  <Icon className="program-icon" size={26} strokeWidth={1.5} />
                  <h3>{program.title}</h3>
                  <p>{program.text}</p>
                </article>
              );
            })}
          </div>
        </section>
        )}

        {pageKey === "impact" && (
        <section
          className="impact section-pad"
          id="impact"
        >
          <div className="impact-intro">
            <p className="kicker light">Community impact</p>
            <h2>
              Compassion
              <br />
              becomes action.
            </h2>
            <p>
              Moments from education, health, relief and rural-development
              programmes across Andhra Pradesh.
            </p>
          </div>
          <div
            className="impact-slider"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured community impact"
            onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
            onTouchEnd={(event) => {
              if (touchStart === null) return;
              const distance = event.changedTouches[0].clientX - touchStart;
              if (Math.abs(distance) > 50) {
                trackEvent("carousel_navigate", {
                  carousel: "impact",
                  method: "swipe",
                  direction: distance < 0 ? "next" : "previous",
                });
                setActiveSlide((current) =>
                  distance < 0
                    ? (current + 1) % featuredGallery.length
                    : (current - 1 + featuredGallery.length) %
                      featuredGallery.length,
                );
              }
              setTouchStart(null);
            }}
          >
            <div className="impact-slides" aria-live="polite">
              {featuredGallery.map((image, index) => (
                <figure
                  className={`impact-slide${index === activeSlide ? " active" : ""}`}
                  aria-hidden={index !== activeSlide}
                  key={image.src}
                >
                  <img
                    src={impactWeb(image.src)}
                    srcSet={`${impactWeb(image.src)} 1600w, ${image.src} 2880w`}
                    sizes="(max-width: 720px) 100vw, min(1240px, 92vw)"
                    alt={image.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <button
                    type="button"
                    className="slide-expand"
                    onClick={() => setActiveImage(index)}
                    aria-label={`Open ${image.title} in gallery`}
                  >
                    <ArrowUpRight size={18} />
                  </button>
                  <figcaption>
                    <span>
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(featuredGallery.length).padStart(2, "0")}
                    </span>
                    <div>
                      <strong>{image.title}</strong>
                      <p>{image.caption}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="slider-controls">
              <button
                type="button"
                onClick={() =>
                  setActiveSlide(
                    (activeSlide - 1 + featuredGallery.length) %
                      featuredGallery.length,
                  )
                }
                aria-label="Previous impact story"
              >
                <ChevronLeft />
              </button>
              <div className="slider-dots">
                {featuredGallery.map((image, index) => (
                  <button
                    type="button"
                    className={index === activeSlide ? "active" : ""}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show ${image.title}`}
                    aria-current={index === activeSlide ? "true" : undefined}
                    key={image.src}
                  >
                    <span />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setActiveSlide((activeSlide + 1) % featuredGallery.length)
                }
                aria-label="Next impact story"
              >
                <ChevronRight />
              </button>
              <button
                type="button"
                className="slider-play"
                onClick={() => setSlidePlaying(!slidePlaying)}
                aria-label={slidePlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {slidePlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            </div>
          </div>
          <div className="more-moments">
            <div className="moments-heading">
              <span>More moments from our work</span>
              <small>
                Open any photograph to view its high-resolution master
              </small>
            </div>
            <div className="moments-grid">
              {gallery.slice(4).map((image, index) => (
                <button
                  className="moment-item"
                  type="button"
                  key={image.src}
                  onClick={() => setActiveImage(index + 4)}
                  aria-label={`View ${image.title}`}
                >
                  <img
                    src={momentThumb(image.src)}
                    alt={image.alt}
                    loading="lazy"
                  />
                  <span>{image.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
        )}

        {pageKey === "story" && (
        <section className="founder section-pad">
          <div className="founder-title">
            <p className="kicker">Carrying the legacy forward</p>
            <h2>
              Vasireddy
              <br />
              <em>Priya Bandhavi</em>
            </h2>
            <p className="founder-role">Founder &amp; Secretary</p>
            <div className="founder-portrait">
              <div className="portrait-frame">
                <img
                  src="/media/portraits/bandhavi-founder.webp"
                  alt="Vasireddy Priya Bandhavi, Founder and Secretary"
                  loading="lazy"
                />
                <div className="portrait-label">
                  <span>Tenali • Andhra Pradesh</span>
                  <strong>
                    Service
                    <br />
                    with purpose
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className="founder-story">
            <p className="lead">
              The eldest granddaughter of Dr. Kodali Veeriah, Bandhavi
              transformed the values he gave her into an organisation built for
              service.
            </p>
            <p>
              Through the academy she organised seminars, workshops, health
              camps, science exhibitions and mathematical talent tests spanning
              education, health, agriculture, gardening and the environment. The
              Homemaker’s Institute supported more than 6,000 women through free
              classes, while the helpline offered women advice, information and
              counselling.
            </p>
            <p>
              She also took part in the fight against corruption through
              rallies, dharnas, hunger strikes and public-awareness campaigns
              undertaken with the appropriate permissions.
            </p>
          </div>
          <div className="founder-timeline">
            {founderMilestones.map(([year, text]) => (
              <div key={year}>
                <span>{year}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        )}

        {pageKey === "crossroads" && (
        <section
          className="crossroads section-pad"
          id="crossroads"
        >
          <div className="crossroads-copy">
            <div className="crossroads-identity">
              <img
                src="/media/women-at-crossroads/logo.jpg"
                alt="Women at Crossroads — Reset to Rise"
              />
              <div>
                <p className="kicker">Building community today</p>
                <div className="youtube-label">
                  <Play size={22} fill="currentColor" />
                  <span>Now on YouTube</span>
                </div>
              </div>
            </div>
            <h2>
              Women at
              <br />
              <em>Crossroads.</em>
            </h2>
            <p className="crossroads-intro">
              A new community created by Bandhavi for women navigating change,
              identity, purpose and the question of what comes next.
            </p>
            <a
              className="button crossroads-button"
              href="https://www.youtube.com/@womenatcrossroads"
              target="_blank"
              rel="noreferrer"
            >
              <Play size={19} fill="currentColor" /> Visit the channel{" "}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <a
            className="crossroads-cover"
            href="https://www.youtube.com/@womenatcrossroads"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Women at Crossroads on YouTube"
          >
            <img
              src="/media/women-at-crossroads/cover.jpg"
              alt="Women at Crossroads — Reset to Rise, empowering and supporting women toward success"
            />
            <span>
              <Play size={18} fill="currentColor" /> Explore Women at Crossroads{" "}
              <ArrowUpRight size={17} />
            </span>
          </a>
          <blockquote className="crossroads-quote">
            <Quote size={30} />
            <p>
              “There comes a time in every woman’s life when she wonders, ‘Is
              this all my life is meant to be?’ I asked myself the same
              question. That question has taken me on a new journey. I’ll be
              sharing that journey with you. I hope you’ll walk with me.”
            </p>
            <footer>— Vasireddy Priya Bandhavi</footer>
          </blockquote>
        </section>
        )}

        {pageKey === "work" && (
        <section className="objectives section-pad">
          <div className="objectives-head">
            <Scale size={30} strokeWidth={1.4} />
            <p className="kicker">Our commitments</p>
            <h2>
              What guides
              <br />
              every program.
            </h2>
          </div>
          <ol className="objective-list">
            {objectives.map((objective, index) => (
              <li key={objective}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{objective}</p>
              </li>
            ))}
          </ol>
        </section>
        )}

        {pageKey === "press" && (
        <section
          className="press-section section-pad"
          id="press"
        >
          <div className="press-copy">
            <p className="kicker light">Our work in the news</p>
            <h2>
              Service that
              <br />
              inspires attention.
            </h2>
            <p>
              Newspapers across Andhra Pradesh have covered the academy’s
              education, women’s empowerment, environmental and
              community-welfare programmes.
            </p>
            <div className="pile-caption">
              <span>Featured coverage</span>
              <small>Watch the story build, one article at a time.</small>
            </div>
          </div>
          <div
            className="press-stack"
            aria-label="Animated pile of press clippings"
          >
            <div className="article-pile" aria-hidden="true">
              {pressPile.map((image) => (
                <figure className="article-sheet" key={image}>
                  <img
                    src={`/media/press/full/${image}.webp`}
                    alt=""
                    loading="lazy"
                  />
                  <span>Press / {image} • 4K master</span>
                </figure>
              ))}
            </div>
          </div>
          <div className="press-grid">
            <div className="press-grid-title">
              <span>Press coverage</span>
              <small>Open any clipping to view the 4K master</small>
            </div>
            {pressImages.map((image) => (
              <a
                href={`/media/press/4k/${image}.webp`}
                target="_blank"
                rel="noreferrer"
                key={image}
              >
                <img
                  src={`/media/press/full/${image}.webp`}
                  alt={`Press clipping ${image}`}
                  loading="lazy"
                />
                <span>{image}</span>
              </a>
            ))}
          </div>
        </section>
        )}

        {pageKey === "join" && (
        <section
          className="join section-pad"
          id="join"
        >
          <div className="join-copy">
            <p className="kicker">Get involved</p>
            <h2>
              Stand with us.
              <br />
              Serve with us.
            </h2>
            <p>
              Volunteer, collaborate, share a suggestion or simply begin a
              conversation about serving communities in and around Tenali.
            </p>
            <div className="contact-links">
              <a href="tel:+919705311228">
                <Phone size={20} />
                <span>
                  <small>Call</small>+91 97053 11228
                </span>
              </a>
              <a href="mailto:pbandhavi@yahoo.com">
                <Mail size={20} />
                <span>
                  <small>Email</small>pbandhavi@yahoo.com
                </span>
              </a>
              <a
                href="https://www.facebook.com/bandhavi.vasireddy"
                target="_blank"
                rel="noreferrer"
              >
                <UserRound size={20} />
                <span>
                  <small>Connect</small>Bandhavi Vasireddy
                </span>
              </a>
            </div>
          </div>
          <form className="join-form" onSubmit={handleJoin}>
            <div className="form-row">
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your full name"
                />
              </label>
              <label>
                Phone
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Your phone number"
                />
              </label>
            </div>
            <label>
              Email
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </label>
            <label>
              Suggestion or query
              <textarea
                name="message"
                rows={5}
                required
                placeholder="How would you like to help?"
              />
            </label>
            <button className="button button-primary" type="submit">
              Send your message <ArrowRight size={18} />
            </button>
            <p className="form-note">
              Submitting opens your email app with the message ready to send.
            </p>
          </form>
        </section>
        )}

        {pageKey === "not-found" && (
          <section className="not-found section-pad">
            <p className="kicker">Page not found</p>
            <h1>
              This page has wandered
              <br />
              <em>off the path.</em>
            </h1>
            <p>
              The story you are looking for may have moved. Return home to
              continue exploring the academy’s work.
            </p>
            <a className="button button-primary" href="/">
              Return home <ArrowRight size={18} />
            </a>
          </section>
        )}
      </main>

      {!isHome && (
        <footer className="site-footer">
          <div className="footer-brand">
            <span className="brand-mark">DK</span>
            <p>
              <strong>Dr. Kodali Veeriah Educational Academy</strong>
              <small>Tenali, Andhra Pradesh, India</small>
            </p>
          </div>
          <p>Continuing a legacy of education, service and human dignity.</p>
          <div className="footer-bottom">
            <span>Registered November 2001</span>
            <span className="footer-credit">
              Powered by{" "}
              <a
                href="https://www.srirajvasireddy.com"
                target="_blank"
                rel="noreferrer"
              >
                Sriraj Vasireddy
              </a>
            </span>
            <span>Serving communities with compassion</span>
          </div>
        </footer>
      )}

      {activeImage !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={gallery[activeImage].title}
          onClick={() => setActiveImage(null)}
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={() => setActiveImage(null)}
            aria-label="Close gallery"
          >
            <X />
          </button>
          <button
            className="lightbox-nav prev"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveImage(
                (activeImage - 1 + gallery.length) % gallery.length,
              );
            }}
            aria-label="Previous image"
          >
            <ChevronLeft />
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img
              src={gallery[activeImage].src}
              alt={gallery[activeImage].alt}
            />
            <figcaption>
              <span>
                {String(activeImage + 1).padStart(2, "0")} / {gallery.length}
              </span>
              <div>
                <strong>{gallery[activeImage].title}</strong>
                <p>{gallery[activeImage].caption}</p>
              </div>
            </figcaption>
          </figure>
          <button
            className="lightbox-nav next"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveImage((activeImage + 1) % gallery.length);
            }}
            aria-label="Next image"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
