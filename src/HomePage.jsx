import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiAmazonwebservices,
  SiPython,
  SiJavascript,
  SiC,
  SiCplusplus,
  SiOpenai,
  SiGoogle,
  SiLeetcode,
  SiCodechef,
  SiCodeforces,
  SiLinkedin,
  SiGmail,
  SiCisco,
} from 'react-icons/si';
import {
  HiArrowUpRight,
  HiArrowDownTray,
  HiArrowRight,
  HiArrowUp,
  HiSun,
  HiMoon,
  HiCheck,
  HiCheckBadge,
  HiOutlineClipboardDocument,
} from 'react-icons/hi2';
import './HomePage.css';

/* ---------- DATA ---------- */

const EMAIL = 'chpurnabhargav@gmail.com';
const GITHUB_URL = 'https://github.com/chpurnabhargav';
const LINKEDIN_URL = 'https://www.linkedin.com/in/purna-bhargav-challagundla-a783b1292/';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'coding', label: 'Coding' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  { icon: SiGithub, href: GITHUB_URL, label: 'GitHub' },
  { icon: SiLinkedin, href: LINKEDIN_URL, label: 'LinkedIn' },
  { icon: SiGmail, href: `mailto:${EMAIL}`, label: 'Email' },
];

const PROJECTS = [
  {
    title: 'Fill Your Code',
    tagline: 'An AI coding assistant for students',
    description:
      'A real-time coding assistant where students paste any code and get Gemini-powered explanations and suggestions, so learning and collaboration happen in one place.',
    tech: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Gemini API', 'Render'],
    github: 'https://github.com/chpurnabhargav/Fill-Your-Code',
    demo: 'https://fill-your-code.onrender.com/',
    featured: true,
  },
  {
    title: 'Think Check',
    tagline: 'Adaptive learning, AI-evaluated',
    description:
      'An adaptive learning platform that generates MCQs and written assessments, evaluates answers with Gemini, and builds study roadmaps with downloadable notes.',
    tech: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Gemini API'],
    github: 'https://github.com/chpurnabhargav/ThinkCheck/',
    demo: null,
    featured: true,
  },
  {
    title: 'Inter-Block Outpass System',
    tagline: 'Automated student outpass approvals',
    description:
      'Replaces paper outpass slips with an approval workflow, with role-based access for students, faculty, admins, and VO officers on a MySQL backend.',
    tech: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
    github: 'https://github.com/chpurnabhargav/Inter-Block-OutPass-System',
    demo: null,
    featured: false,
  },
  {
    title: 'AI News Agent',
    tagline: 'Automated AI news aggregation',
    description:
      'An automated agent that collects the latest AI news from multiple reliable sources, then processes, organizes, and delivers it in one place.',
    tech: ['Python', 'AI Agents', 'Web Scraping', 'Automation'],
    github: 'https://github.com/chpurnabhargav/ai-news-agent/',
    demo: null,
    featured: false,
  },
  {
    title: 'Detecting Adrenocortical Carcinoma',
    tagline: 'Bioinformatics meets code',
    description:
      'Analyzes TP53 gene sequences to help identify adrenocortical carcinoma, exploring how programming applies to genomic analysis.',
    tech: ['Python', 'Bioinformatics', 'Sequencing'],
    github: 'https://github.com/chpurnabhargav/Detecting-Adrenocortical-carcinoma',
    demo: null,
    featured: false,
  },
];

const TECH_STACK = [
  { name: 'React', icon: SiReact },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Express', icon: SiExpress },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'MySQL', icon: SiMysql },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'Python', icon: SiPython },
  { name: 'C', icon: SiC },
  { name: 'C++', icon: SiCplusplus },
  { name: 'Git', icon: SiGit },
  { name: 'GitHub', icon: SiGithub },
  { name: 'AWS', icon: SiAmazonwebservices },
  { name: 'Gemini', icon: SiGoogle },
  { name: 'OpenAI', icon: SiOpenai },
];

const FETCH_TIMEOUT_MS = 12000;

function fetchJSON(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { signal: controller.signal })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
    .finally(() => clearTimeout(timer));
}

const fetchLeetCodeRating = () =>
  fetchJSON('https://leetcode-stats.tashif.codes/chpurnabhargav/rating').then((j) => {
    if (j.status !== 'success' || !j.data || !Array.isArray(j.data.history)) {
      throw new Error('Bad response');
    }
    return j.data.history
      .filter((h) => h.attended !== false)
      .map((h) => ({
        date: h.timestamp * 1000,
        rating: Math.round(h.rating),
        name: h.contestName,
      }));
  });

const fetchCodeChefRating = () =>
  fetchJSON('https://codechef-stats-api-two.vercel.app/purnabhargav/rating').then((j) => {
    if (j.status !== 'success' || !j.data || !Array.isArray(j.data.history)) {
      throw new Error('Bad response');
    }
    return j.data.history.map((h) => ({
      date: h.timestamp * 1000,
      rating: Math.round(h.rating),
      name: h.contestName,
    }));
  });

const fetchCodeforcesRating = () =>
  fetchJSON('https://codeforces.com/api/user.rating?handle=bhargav7666').then((j) => {
    if (j.status !== 'OK' || !Array.isArray(j.result)) {
      throw new Error('Bad response');
    }
    return j.result.map((r) => ({
      date: r.ratingUpdateTimeSeconds * 1000,
      rating: r.newRating,
      name: r.contestName,
    }));
  });

// Colors are CSS variables so each theme can supply its own validated steps.
const RATING_SOURCES = [
  {
    key: 'leetcode',
    name: 'LeetCode',
    handle: 'chpurnabhargav',
    url: 'https://leetcode.com/chpurnabhargav',
    color: 'var(--series-1)',
    fetch: fetchLeetCodeRating,
  },
  {
    key: 'codechef',
    name: 'CodeChef',
    handle: 'purnabhargav',
    url: 'https://www.codechef.com/users/purnabhargav',
    color: 'var(--series-2)',
    fetch: fetchCodeChefRating,
  },
  {
    key: 'codeforces',
    name: 'Codeforces',
    handle: 'bhargav7666',
    url: 'https://codeforces.com/profile/bhargav7666',
    color: 'var(--series-3)',
    fetch: fetchCodeforcesRating,
  },
];

const latestRating = (points) => ({
  value: String(points[points.length - 1].rating),
  label: 'Current rating',
});

const CODING_PROFILES = [
  {
    name: 'LeetCode',
    handle: 'chpurnabhargav',
    statLabel: 'Problems solved',
    url: 'https://leetcode.com/chpurnabhargav',
    icon: SiLeetcode,
    fetchStat: () =>
      fetchJSON('https://alfa-leetcode-api.onrender.com/chpurnabhargav/solved').then((j) => ({
        value: String(j.solvedProblem),
        label: 'Problems solved',
      })),
  },
  {
    name: 'CodeChef',
    handle: 'purnabhargav',
    statLabel: 'Current rating',
    url: 'https://www.codechef.com/users/purnabhargav',
    icon: SiCodechef,
    fetchStat: () => loadRatingPoints('ratings-codechef', fetchCodeChefRating).then(latestRating),
  },
  {
    name: 'Codeforces',
    handle: 'bhargav7666',
    statLabel: 'Current rating',
    url: 'https://codeforces.com/profile/bhargav7666',
    icon: SiCodeforces,
    fetchStat: () =>
      loadRatingPoints('ratings-codeforces', fetchCodeforcesRating).then(latestRating),
  },
  {
    name: 'GitHub',
    handle: 'chpurnabhargav',
    statLabel: 'Public repos',
    url: GITHUB_URL,
    icon: SiGithub,
    fetchStat: () =>
      fetchJSON('https://api.github.com/users/chpurnabhargav').then((j) => ({
        value: String(j.public_repos),
        label: 'Public repos',
      })),
  },
];

const STORE_PREFIX = 'pb-cache.';
const CACHE_TTL_MS = 60 * 60 * 1000;
const ratingCache = {};
const inflight = {};

// With allowStale, returns the last good value however old it is, so a
// flaky third-party API falls back to real (if dated) numbers.
function readCache(key, allowStale = false) {
  try {
    const raw = localStorage.getItem(STORE_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (!entry || !entry.at || !entry.value) return null;
    if (!allowStale && Date.now() - entry.at > CACHE_TTL_MS) return null;
    if (Array.isArray(entry.value) && entry.value.length === 0) return null;
    return entry.value;
  } catch {
    return null;
  }
}

function writeCache(key, value) {
  try {
    localStorage.setItem(STORE_PREFIX + key, JSON.stringify({ at: Date.now(), value }));
  } catch {
    /* storage unavailable or full, skip caching */
  }
}

function loadRatingPoints(key, fetcher) {
  const cached = readCache(key);
  if (cached) return Promise.resolve(cached);
  if (!inflight[key]) {
    inflight[key] = fetcher()
      .then((points) => {
        writeCache(key, points);
        return points;
      })
      .catch((err) => {
        const stale = readCache(key, true);
        if (stale) return stale;
        throw err;
      })
      .finally(() => {
        delete inflight[key];
      });
  }
  return inflight[key];
}

const EXPERIENCE = [
  {
    role: 'Software Engineer Intern',
    org: 'Visa Inc. · DPS',
    period: 'Summer 2026',
    tag: 'Internship',
    bullets: [
      'Automated the payment-mapping workflow for Visa’s DPS team, replacing a manual, error-prone process with reusable internal tooling',
      'Worked with engineers and operations to cut turnaround time on payment-mapping reviews while keeping mapping accuracy high',
      'Gained hands-on experience with enterprise payments infrastructure and the full software delivery lifecycle at scale',
    ],
  },
  {
    role: 'Full Stack Developer',
    org: 'Personal & hackathon projects',
    period: '2023 to Present',
    bullets: [
      'Built and deployed full-stack apps with React, Node.js, Express, MongoDB, and Supabase, including Fill Your Code and Think Check',
      'Implemented authentication, dashboards, REST APIs, and CI/CD on Render',
      'Designed responsive, accessible UI components with purposeful motion',
    ],
  },
];

const SKILL_GROUPS = [
  {
    label: 'Languages',
    items: ['C', 'C++', 'Java', 'Python', 'JavaScript'],
  },
  {
    label: 'Frontend',
    items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    label: 'Backend & databases',
    items: ['Node.js', 'Express', 'REST APIs', 'SQL', 'MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    label: 'AI & data',
    items: ['OpenAI API', 'Gemini API', 'AI Agents', 'Pandas', 'scikit-learn'],
  },
  {
    label: 'Cloud & tools',
    items: ['AWS', 'Git', 'GitHub', 'VS Code'],
  },
  {
    label: 'CS fundamentals',
    items: ['Data Structures & Algorithms', 'Operating Systems', 'Computer Networks'],
  },
];

const EDUCATION = [
  {
    degree: 'B.Tech, Computer Science',
    school: 'KLH University',
    period: '2023 to 2027',
    meta: 'CGPA 9.7',
  },
  {
    degree: 'Higher Secondary Education',
    school: 'Sri Chaitanya Junior College',
    period: '2021 to 2023',
    meta: 'CGPA 8.8',
  },
];

const CERTIFICATIONS = [
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2026', icon: SiAmazonwebservices },
  { title: 'CCNA: Introduction to Networks', issuer: 'Cisco', year: '2025', icon: SiCisco },
  { title: 'MongoDB Associate Developer', issuer: 'MongoDB', year: '2025', icon: SiMongodb },
  { title: 'Automation Anywhere RPA (RPC)', issuer: 'Automation Anywhere', year: '2025', icon: HiCheckBadge },
  { title: 'AWS Academy Cloud Foundations', issuer: 'AWS Academy', year: '2024', icon: SiAmazonwebservices },
];

const ROLES = [
  'Full Stack Developer',
  'AI Engineer in training',
  'Data Science & AI Agent Learner',
  'Competitive Programmer',
];

// Shown until the live contest count loads (or if a rating API is down).
const CONTESTS_FALLBACK = 22;

const EASE = [0.22, 1, 0.36, 1];

/* ---------- HOOKS ---------- */

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, ...optionsRef.current }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

function useElementWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    setWidth(node.clientWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

function useScrollSpy(ids) {
  const [active, setActive] = useState('');
  const key = ids.join(',');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    key
      .split(',')
      .filter(Boolean)
      .forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    return () => observer.disconnect();
  }, [key]);

  return active;
}

// Counts from the last shown value, so a target that changes later
// (e.g. a live number replacing its fallback) animates smoothly.
function useCountUp(target, inView, decimals = 0, duration = 1600) {
  const [value, setValue] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const from = fromRef.current;
    const factor = 10 ** decimals;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round((from + (target - from) * eased) * factor) / factor;
      fromRef.current = next;
      setValue(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, decimals, duration]);

  return value;
}

function useTypewriter(words, typeSpeed = 85, deleteSpeed = 40, pauseDelay = 1900) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[index % words.length];
    let timeout;

    if (!deleting && sub === word.length) {
      timeout = setTimeout(() => setDeleting(true), pauseDelay);
    } else if (deleting && sub === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 500);
    } else {
      timeout = setTimeout(() => {
        setSub((s) => s + (deleting ? -1 : 1));
      }, deleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [sub, deleting, index, words, typeSpeed, deleteSpeed, pauseDelay, reduce]);

  return reduce ? words[0] : words[index % words.length].slice(0, sub);
}

const THEME_KEY = 'pb-theme';

// index.html sets data-theme before first paint; this keeps it in sync.
function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b1019' : '#e9ecf1');
  }, [theme]);

  // Follow the OS setting until the visitor picks a theme themselves.
  useEffect(() => {
    let stored = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch {
      /* storage unavailable */
    }
    if (stored || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable, theme still applies for this visit */
    }
  };

  return [theme, toggle];
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const hash = id === 'top' ? '' : `#${id}`;
  window.history.replaceState(null, '', window.location.pathname + hash);
}

/* ---------- AMBIENT COMPONENTS ---------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
      onClick={() => scrollToSection('top')}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <HiArrowUp />
    </button>
  );
}

function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMouseMove} className={`spotlight-card ${className}`}>
      {children}
    </div>
  );
}

/* ---------- SUB-COMPONENTS ---------- */

function Reveal({ children, delay = 0, y = 24, className = '' }) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      className="nav__theme"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
    >
      {dark ? <HiSun /> : <HiMoon />}
    </button>
  );
}

function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleClick = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className={`nav ${scrolled || open ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__logo" onClick={(e) => handleClick(e, 'top')}>
          <span className="nav__logo-mark" aria-hidden="true">B</span>
          <span>Bhargav</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav__link ${active === l.id ? 'nav__link--active' : ''}`}
              aria-current={active === l.id ? 'true' : undefined}
              onClick={(e) => handleClick(e, l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href="/resume.pdf" download="Bhargav_Resume.pdf" className="nav__cta">
            Resume
            <HiArrowDownTray />
          </a>
          <button
            type="button"
            className={`nav__toggle ${open ? 'nav__toggle--open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`nav__mobile ${open ? 'nav__mobile--open' : ''}`}
        aria-label="Mobile"
        inert={!open}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`nav__mobile-link ${active === l.id ? 'nav__mobile-link--active' : ''}`}
            onClick={(e) => handleClick(e, l.id)}
          >
            {l.label}
          </a>
        ))}
        <a href="/resume.pdf" download="Bhargav_Resume.pdf" className="nav__mobile-cta">
          Download resume
          <HiArrowDownTray />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const typedRole = useTypewriter(ROLES);

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__grid container">
        <div className="hero__copy">
          <Reveal>
            <p className="hero__status">
              <span className="hero__status-dot" aria-hidden="true" />
              Software Engineer Intern at <strong>Visa</strong>
              <span className="hero__status-sep" aria-hidden="true">·</span>
              <span className="hero__status-date">Summer 2026</span>
            </p>
          </Reveal>

          <Reveal delay={0.05} y={32}>
            <h1 className="hero__name">
              Purna <span className="hero__name-accent">Bhargav</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="hero__role">
              <span className="sr-only">Full Stack Developer and aspiring AI engineer</span>
              <span aria-hidden="true">
                {typedRole}
                <span className="hero__caret" />
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="hero__bio">
              I&apos;m a Computer Science undergrad at KLH University who ships full-stack
              products with React, Node.js, and modern AI APIs. Right now I&apos;m going
              deeper into data science and AI agents on the way to becoming an AI engineer.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="hero__cta">
              <a href="#work" className="btn btn--primary" onClick={(e) => {
                e.preventDefault();
                scrollToSection('work');
              }}>
                View my work
                <HiArrowRight />
              </a>
              <a href="/resume.pdf" download="Bhargav_Resume.pdf" className="btn btn--ghost">
                <HiArrowDownTray />
                Download resume
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="hero__socials" aria-label="Social links">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="hero__social"
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  title={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40} className="hero__portrait-wrap">
          <div className="hero__portrait">
            <img
              src="/img.jpg"
              alt="Portrait of Purna Bhargav"
              width="413"
              height="531"
              fetchPriority="high"
            />
          </div>
          <div className="hero__portrait-meta">
            <span className="hero__portrait-name">Purna Bhargav CH</span>
            <span className="hero__portrait-role">B.Tech CS · KLH &apos;27</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const renderItems = (hidden) =>
    TECH_STACK.map((t) => {
      const Icon = t.icon;
      return (
        <li key={`${t.name}-${hidden ? 'b' : 'a'}`} className="marquee__item" aria-hidden={hidden || undefined}>
          <Icon aria-hidden="true" />
          <span>{t.name}</span>
        </li>
      );
    });

  // The list is rendered twice so the loop is seamless; the copy is hidden from screen readers.
  return (
    <section className="marquee" aria-label="Technologies I work with">
      <ul className="marquee__track">
        {renderItems(false)}
        {renderItems(true)}
      </ul>
    </section>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView();
  const words = title.split(' ');

  return (
    <div ref={ref} className="section-header">
      <motion.span
        className="section-header__eyebrow"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {eyebrow}
      </motion.span>
      <h2 className="section-header__title">
        {words.map((w, i) => (
          <motion.span
            key={`${w}-${i}`}
            className="section-header__word"
            initial={reduce ? false : { opacity: 0, y: 18, rotate: 3 }}
            animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 + i * 0.05, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </h2>
      {description && (
        <motion.p
          className="section-header__desc"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 + words.length * 0.05, ease: EASE }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

function StatCard({ value, decimals = 0, suffix = '', label, delay }) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView();
  const count = useCountUp(value, inView, decimals);
  const shown = reduce ? value : count;

  return (
    <motion.div
      ref={ref}
      className="about__stat"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <div className="about__stat-value">
        {shown.toFixed(decimals)}
        {suffix && <span className="about__stat-suffix">{suffix}</span>}
      </div>
      <div className="about__stat-label">{label}</div>
    </motion.div>
  );
}

// Total rated contests across all three platforms. Only replaces the
// fallback when every platform answers, so a partial sum never undercounts.
function useContestCount() {
  const [count, setCount] = useState(CONTESTS_FALLBACK);

  useEffect(() => {
    let cancelled = false;
    Promise.all(RATING_SOURCES.map((s) => loadRatingPoints('ratings-' + s.key, s.fetch)))
      .then((all) => {
        if (cancelled) return;
        const total = all.reduce((n, points) => n + points.length, 0);
        if (total > 0) setCount(total);
      })
      .catch(() => {
        /* keep the fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return count;
}

function About() {
  const contests = useContestCount();
  const stats = [
    { value: 9.7, decimals: 1, label: 'CGPA, B.Tech Computer Science' },
    { value: PROJECTS.length, label: 'Projects built and open-sourced' },
    { value: contests, label: 'Rated coding contests' },
    { value: CERTIFICATIONS.length, label: 'Industry certifications' },
  ];

  return (
    <section className="about" id="about">
      <div className="container">
        <SectionHeader
          eyebrow="01 · About"
          title="Builder first, specialist second."
          description="Who I am and what I work on."
        />

        <div className="about__grid">
          <Reveal className="about__story" delay={0.05}>
            <p>
              I started writing code to make small things work, then kept going because
              the small things started adding up. Today I work mostly across the stack
              with React and Node.js, and I&apos;ve been leaning into AI-powered products
              since the Gemini and OpenAI APIs made it practical to ship them on a weekend.
            </p>
            <p>
              This summer I interned as a software engineer at Visa, automating a manual
              payments workflow. Now I&apos;m studying data science and building AI agents,
              with the goal of growing into an AI engineer, not just someone who calls the APIs.
            </p>
            <p>
              Outside of code I write for my college magazine, tinker with FreeCAD and
              3D printing, and grind LeetCode more than is probably healthy.
            </p>
          </Reveal>

          <div className="about__stats">
            {stats.map((s, i) => (
              <StatCard key={s.label} {...s} delay={0.1 + i * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }) {
  return (
    <SpotlightCard className={`work__card ${p.featured ? 'work__card--featured' : ''}`}>
      <div className="work__card-body">
        <div className="work__card-head">
          <span className="work__card-index">{String(index + 1).padStart(2, '0')}</span>
          {p.featured && <span className="work__tag work__tag--accent">Featured</span>}
          {p.demo && <span className="work__tag work__tag--live">Live</span>}
        </div>

        <h3 className="work__card-title">{p.title}</h3>
        <p className="work__card-tagline">{p.tagline}</p>
        <p className="work__card-desc">{p.description}</p>

        <ul className="work__card-tech" aria-label="Tech stack">
          {p.tech.map((t) => (
            <li key={t} className="work__tech">{t}</li>
          ))}
        </ul>

        <div className="work__card-links">
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="work__link">
            <SiGithub /> Source code
            <span className="sr-only"> for {p.title}</span>
          </a>
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="work__link work__link--primary">
              Live demo <HiArrowUpRight />
              <span className="sr-only"> of {p.title}</span>
            </a>
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}

function Projects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section className="work" id="work">
      <div className="container">
        <SectionHeader
          eyebrow="02 · Selected work"
          title="Projects I’ve built and shipped."
          description="Full-stack and AI projects, each with source code on GitHub."
        />

        <div className="work__grid work__grid--featured">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
        <div className="work__grid work__grid--rest">
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <ProjectCard project={p} index={featured.length + i} />
            </Reveal>
          ))}
        </div>

        <Reveal className="work__more">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            <SiGithub />
            More on GitHub
            <HiArrowUpRight />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- LIVE RATING CHARTS ---------- */

function buildRatingResult(points) {
  const valid = (points || []).filter(
    (p) =>
      p &&
      typeof p.date === 'number' &&
      Number.isFinite(p.date) &&
      typeof p.rating === 'number' &&
      Number.isFinite(p.rating)
  );
  const sorted = [...valid].sort((a, b) => a.date - b.date);
  return {
    status: sorted.length ? 'ready' : 'error',
    points: sorted,
    current: sorted.length ? sorted[sorted.length - 1].rating : 0,
    max: sorted.length ? Math.max(...sorted.map((p) => p.rating)) : 0,
  };
}

function useRatingData(source) {
  const [state, setState] = useState({ status: 'loading', points: [], current: 0, max: 0 });

  useEffect(() => {
    if (ratingCache[source.key]) {
      setState(ratingCache[source.key]);
      return;
    }

    let cancelled = false;
    setState({ status: 'loading', points: [], current: 0, max: 0 });

    loadRatingPoints('ratings-' + source.key, source.fetch)
      .then((points) => {
        if (cancelled) return;
        const result = buildRatingResult(points);
        ratingCache[source.key] = result;
        setState(result);
      })
      .catch(() => {
        if (cancelled) return;
        const result = { status: 'error', points: [], current: 0, max: 0 };
        ratingCache[source.key] = result;
        setState(result);
      });

    return () => {
      cancelled = true;
    };
  }, [source]);

  return state;
}

function useLiveStat(profile) {
  const [stat, setStat] = useState({ value: null, label: profile.statLabel, pending: true });

  useEffect(() => {
    if (!profile.fetchStat) return;

    let cancelled = false;
    const cacheKey = 'stat-' + profile.name;
    const cached = readCache(cacheKey);
    if (cached) {
      setStat({ value: cached.value, label: cached.label, pending: false });
      return;
    }

    setStat({ value: null, label: profile.statLabel, pending: true });
    profile
      .fetchStat()
      .then((s) => {
        if (cancelled) return;
        writeCache(cacheKey, s);
        setStat({ value: s.value, label: s.label, pending: false });
      })
      .catch(() => {
        if (cancelled) return;
        const stale = readCache(cacheKey, true);
        setStat(
          stale
            ? { value: stale.value, label: stale.label, pending: false }
            : { value: null, label: profile.statLabel, pending: false }
        );
      });

    return () => {
      cancelled = true;
    };
  }, [profile]);

  return stat;
}

const CG_H = 260;
const CG_PAD = { top: 14, right: 58, bottom: 30, left: 44 };
const LABEL_GAP = 16;

function niceStep(span, targetTicks = 4) {
  const raw = span / targetTicks;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const n = raw / mag;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * mag;
}

const fmtMonth = (ts) =>
  new Date(ts).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
const fmtFullDate = (ts) =>
  new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

function CombinedGraph({ series }) {
  const reduce = useReducedMotion();
  const [viewRef, inView] = useInView();
  const [sizeRef, width] = useElementWidth();
  const [hv, setHv] = useState(null);

  const setRefs = useCallback(
    (node) => {
      viewRef.current = node;
      sizeRef.current = node;
    },
    [viewRef, sizeRef]
  );

  const W = Math.max(width, 1);
  const plotL = CG_PAD.left;
  const plotR = W - CG_PAD.right;
  const plotT = CG_PAD.top;
  const plotB = CG_H - CG_PAD.bottom;

  // One shared rating axis for every platform.
  const allPoints = series.flatMap((s) => s.points);
  const t0 = Math.min(...allPoints.map((p) => p.date));
  const t1 = Math.max(...allPoints.map((p) => p.date));
  const tspan = t1 - t0 || 1;
  const rMin = Math.min(...allPoints.map((p) => p.rating));
  const rMax = Math.max(...allPoints.map((p) => p.rating));
  const step = niceStep(rMax - rMin || 100);
  const lo = Math.floor(rMin / step) * step;
  const hi = Math.max(Math.ceil(rMax / step) * step, lo + step);

  const x = (date) => plotL + ((date - t0) / tspan) * Math.max(plotR - plotL, 1);
  const y = (r) => plotT + (1 - (r - lo) / (hi - lo)) * (plotB - plotT);

  const yTicks = [];
  for (let v = lo; v <= hi + step / 1000; v += step) yTicks.push(v);

  const xTickCount = W < 480 ? 3 : 5;
  const xTicks = Array.from({ length: xTickCount }, (_, i) => t0 + (i / (xTickCount - 1)) * tspan);

  const prepared = series.map((s) => ({
    s,
    line: s.points
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.date).toFixed(1)},${y(p.rating).toFixed(1)}`)
      .join(' '),
  }));

  // Latest-rating labels in the right gutter, nudged apart so they never overlap.
  const endLabels = series
    .map((s) => {
      const p = s.points[s.points.length - 1];
      return { key: s.key, color: s.color, rating: p.rating, y: y(p.rating) };
    })
    .sort((a, b) => a.y - b.y);
  for (let i = 1; i < endLabels.length; i++) {
    endLabels[i].y = Math.max(endLabels[i].y, endLabels[i - 1].y + LABEL_GAP);
  }
  const overflow = endLabels.length ? endLabels[endLabels.length - 1].y - (plotB + 4) : 0;
  if (overflow > 0) endLabels.forEach((l) => (l.y -= overflow));

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHv({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const active =
    hv === null
      ? null
      : series.reduce((acc, s) => {
          for (const p of s.points) {
            const dx = x(p.date) - hv.x;
            const dy = y(p.rating) - hv.y;
            const d = dx * dx + dy * dy;
            if (!acc || d < acc.d) acc = { s, p, d };
          }
          return acc;
        }, null);

  const ax = active ? x(active.p.date) : 0;
  const ay = active ? y(active.p.rating) : 0;
  const dim = (key) => active && active.s.key !== key;

  return (
    <div
      className="combined-chart__plot"
      ref={setRefs}
      style={{ touchAction: 'pan-y' }}
      onPointerMove={onMove}
      onPointerDown={onMove}
      onPointerLeave={() => setHv(null)}
    >
      {width > 0 && (
        <svg
          width={W}
          height={CG_H}
          viewBox={`0 0 ${W} ${CG_H}`}
          role="img"
          aria-label="Contest rating history for LeetCode, CodeChef, and Codeforces"
        >
          {yTicks.map((v) => (
            <g key={v}>
              <line x1={plotL} x2={plotR} y1={y(v)} y2={y(v)} className="combined-chart__grid" />
              <text x={plotL - 8} y={y(v)} className="combined-chart__axis" textAnchor="end" dominantBaseline="middle">
                {v}
              </text>
            </g>
          ))}
          {xTicks.map((t, i) => (
            <text
              key={t}
              x={x(t)}
              y={CG_H - 8}
              className="combined-chart__axis"
              textAnchor={i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'}
            >
              {fmtMonth(t)}
            </text>
          ))}

          {prepared.map(({ s, line }) => (
            <motion.path
              key={s.key}
              d={line}
              className="combined-chart__line"
              fill="none"
              style={{ stroke: s.color, opacity: dim(s.key) ? 0.2 : 1 }}
              initial={reduce ? false : { pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.1, ease: EASE }}
            />
          ))}

          {series.map((s) => {
            const p = s.points[s.points.length - 1];
            return (
              <circle
                key={`end-${s.key}`}
                cx={x(p.date)}
                cy={y(p.rating)}
                r="4"
                className="combined-chart__marker"
                style={{ fill: s.color, opacity: dim(s.key) ? 0.3 : 1 }}
              />
            );
          })}

          {endLabels.map((l) => (
            <g key={`label-${l.key}`} style={{ opacity: dim(l.key) ? 0.35 : 1 }}>
              <line
                x1={plotR + 6}
                x2={plotR + 16}
                y1={l.y}
                y2={l.y}
                className="combined-chart__swatch"
                style={{ stroke: l.color }}
              />
              <text x={plotR + 21} y={l.y} className="combined-chart__end" dominantBaseline="middle">
                {l.rating}
              </text>
            </g>
          ))}

          {active && (
            <>
              <line x1={ax} x2={ax} y1={plotT} y2={plotB} className="combined-chart__cursor" />
              <circle
                cx={ax}
                cy={ay}
                r="5.5"
                className="combined-chart__focus"
                style={{ stroke: active.s.color }}
              />
            </>
          )}
        </svg>
      )}

      {active && (
        <div
          className={`combined-chart__tooltip ${ay < CG_H / 2 ? 'is-below' : ''}`}
          style={{
            left: Math.min(W - 118, Math.max(118, ax)),
            top: ay,
          }}
        >
          <div className="combined-chart__tooltip-date">{fmtFullDate(active.p.date)}</div>
          <div className="combined-chart__tooltip-row">
            <span className="combined-chart__tooltip-dot" style={{ background: active.s.color }} />
            <span className="combined-chart__tooltip-name">{active.s.name}</span>
            <span className="combined-chart__tooltip-rating">{active.p.rating}</span>
          </div>
          {active.p.name && (
            <div className="combined-chart__tooltip-contest" title={active.p.name}>
              {active.p.name}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LegendChip({ source }) {
  const { data, color, name, handle, url } = source;
  const ready = data.status === 'ready' && data.points.length > 0;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`legend-chip ${ready ? '' : 'legend-chip--off'}`}
    >
      <span className="legend-chip__dot" style={{ background: color }} />
      <span className="legend-chip__text">
        <span className="legend-chip__name">{name}</span>
        <span className="legend-chip__meta">
          {ready
            ? `Peak ${data.max} · ${data.points.length} contest${data.points.length === 1 ? '' : 's'}`
            : data.status === 'loading'
              ? `@${handle}`
              : `Couldn’t load · view @${handle}`}
        </span>
      </span>
      {ready && <span className="legend-chip__current">{data.current}</span>}
      <HiArrowUpRight className="legend-chip__arrow" />
    </a>
  );
}

function CombinedRatingCard() {
  const lc = useRatingData(RATING_SOURCES[0]);
  const cc = useRatingData(RATING_SOURCES[1]);
  const cf = useRatingData(RATING_SOURCES[2]);

  const series = [
    { ...RATING_SOURCES[0], data: lc },
    { ...RATING_SOURCES[1], data: cc },
    { ...RATING_SOURCES[2], data: cf },
  ];

  const isLoading = series.some((s) => s.data.status === 'loading');
  const ready = series
    .filter((s) => s.data.status === 'ready' && s.data.points.length > 0)
    .map((s) => ({ ...s, points: s.data.points }));
  const status = isLoading ? 'syncing' : ready.length ? 'live' : 'offline';
  const statusLabel = { syncing: 'Syncing…', live: 'Live', offline: 'Offline' }[status];

  return (
    <Reveal className="combined-chart">
      <div className="combined-chart__head">
        <div>
          <h3 className="rating__title">Contest rating history</h3>
          <p className="rating__sub">
            Every rated contest on LeetCode, CodeChef, and Codeforces, on one rating scale.
          </p>
        </div>
        <span className={`combined-chart__live combined-chart__live--${status}`}>
          <span className="combined-chart__live-dot" />
          {statusLabel}
        </span>
      </div>

      {isLoading ? (
        <div className="combined-chart__skeleton" aria-hidden="true" />
      ) : ready.length ? (
        <CombinedGraph series={ready} />
      ) : (
        <div className="combined-chart__empty">
          <p>The rating services aren&apos;t responding right now.</p>
          <p>Each profile below has the full, verifiable history.</p>
        </div>
      )}

      <div className="combined-chart__legend">
        {series.map((s) => (
          <LegendChip key={s.key} source={s} />
        ))}
      </div>

      {!isLoading && ready.length > 0 && (
        <table className="sr-only">
          <caption>Contest ratings on LeetCode, CodeChef, and Codeforces</caption>
          <thead>
            <tr>
              <th scope="col">Platform</th>
              <th scope="col">Date</th>
              <th scope="col">Contest</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
            {ready.map((s) =>
              s.points.map((p, i) => (
                <tr key={s.key + '-' + i}>
                  <td>{s.name}</td>
                  <td>{fmtFullDate(p.date)}</td>
                  <td>{p.name}</td>
                  <td>{p.rating}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </Reveal>
  );
}

function CodingCard({ profile, index }) {
  const Icon = profile.icon;
  const stat = useLiveStat(profile);
  const failed = !stat.pending && stat.value === null;

  return (
    <Reveal delay={index * 0.05}>
      <a
        href={profile.url}
        target="_blank"
        rel="noopener noreferrer"
        className="coding__card"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
          e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
        }}
      >
        <div className="coding__card-top">
          <span className="coding__card-icon">
            <Icon />
          </span>
          <span className="coding__card-name">{profile.name}</span>
          <HiArrowUpRight className="coding__card-arrow" />
        </div>
        <div className={'coding__card-stat' + (stat.pending ? ' is-pending' : '')}>
          <div className={'coding__card-stat-value' + (failed ? ' is-empty' : '')}>
            {stat.pending ? '000' : failed ? 'View profile' : stat.value}
          </div>
          <div className="coding__card-stat-label">{stat.label}</div>
        </div>
        <div className="coding__card-handle">@{profile.handle}</div>
      </a>
    </Reveal>
  );
}

function Coding() {
  return (
    <section className="coding" id="coding">
      <div className="container">
        <SectionHeader
          eyebrow="03 · Competitive coding"
          title="Coding practice with verifiable ratings."
          description="Numbers pulled live from each platform. Click through to verify."
        />

        <div className="coding__grid">
          {CODING_PROFILES.map((p, i) => (
            <CodingCard key={p.name} profile={p} index={i} />
          ))}
        </div>

        <CombinedRatingCard />
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <SectionHeader
          eyebrow="04 · Experience"
          title="Where I’ve done the work."
          description="Industry experience and the projects I build alongside it."
        />

        <ol className="experience__list">
          {EXPERIENCE.map((item, i) => (
            <li key={item.role}>
              <Reveal delay={i * 0.08} className="experience__item">
                <div className="experience__period">{item.period}</div>
                <div className="experience__content">
                  <div className="experience__role-row">
                    <h3 className="experience__role">{item.role}</h3>
                    {item.tag && <span className="experience__tag">{item.tag}</span>}
                  </div>
                  <p className="experience__org">{item.org}</p>
                  <ul className="experience__bullets">
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <SectionHeader
          eyebrow="05 · Skills"
          title="The tools and technologies I use."
        />

        <div className="skills__groups">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.04} className="skills__group">
              <h3 className="skills__group-label">{group.label}</h3>
              <ul className="skills__tags">
                {group.items.map((s) => (
                  <li key={s} className="skills__tag">{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="edu-cert" id="education">
      <div className="container">
        <div className="edu-cert__grid">
          <div>
            <SectionHeader eyebrow="06 · Education" title="Where I studied." />
            <div className="edu-cert__list">
              {EDUCATION.map((e, i) => (
                <Reveal key={e.degree} delay={i * 0.06} className="edu-cert__item">
                  <div className="edu-cert__period">{e.period}</div>
                  <h3 className="edu-cert__title">{e.degree}</h3>
                  <p className="edu-cert__sub">{e.school}</p>
                  <span className="edu-cert__meta">{e.meta}</span>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader eyebrow="07 · Certifications" title="Certifications and credentials." />
            <div className="edu-cert__list">
              {CERTIFICATIONS.map((c, i) => {
                const Icon = c.icon;
                return (
                  <Reveal key={c.title} delay={i * 0.05} className="edu-cert__cert">
                    <span className="edu-cert__icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div className="edu-cert__cert-body">
                      <h3 className="edu-cert__title">{c.title}</h3>
                      <p className="edu-cert__sub">{c.issuer}</p>
                    </div>
                    <span className="edu-cert__year">{c.year}</span>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <button type="button" className="btn btn--ghost btn--lg" onClick={copy}>
      {copied ? <HiCheck /> : <HiOutlineClipboardDocument />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <Reveal className="contact__inner">
          <span className="section-header__eyebrow">08 · Contact</span>
          <h2 className="contact__title">
            Let&apos;s build <span className="hero__name-accent">something</span>.
          </h2>
          <p className="contact__desc">
            Open to interesting collaborations and opportunities.
            Email is the fastest way to reach me.
          </p>
          <div className="contact__cta">
            <a href={`mailto:${EMAIL}`} className="btn btn--primary btn--lg">
              <SiGmail />
              {EMAIL}
            </a>
            <CopyEmailButton />
          </div>
          <div className="contact__links">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <SiLinkedin /> LinkedIn
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <SiGithub /> GitHub
            </a>
            <a href="/resume.pdf" download="Bhargav_Resume.pdf">
              <HiArrowDownTray /> Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} Purna Bhargav CH · Built with React &amp; Vite</p>
        <div className="footer__socials">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ---------- PAGE ---------- */

export default function HomePage() {
  const [theme, toggleTheme] = useTheme();

  // Open deep links like /#contact at their section; otherwise start at the top.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const target = id && document.getElementById(id);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  return (
    <div className="page">
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Coding />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
