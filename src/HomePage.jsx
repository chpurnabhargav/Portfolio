import { useEffect, useRef, useState } from 'react';
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
  SiHackerrank,
  SiLinkedin,
  SiGmail,
} from 'react-icons/si';
import { HiArrowUpRight, HiArrowDownTray, HiArrowRight } from 'react-icons/hi2';
import './HomePage.css';

/* ---------- DATA ---------- */

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'coding', label: 'Coding' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  { icon: SiGithub, href: 'https://github.com/chpurnabhargav', label: 'GitHub' },
  { icon: SiLinkedin, href: 'https://www.linkedin.com/in/purna-bhargav-challagundla-a783b1292/', label: 'LinkedIn' },
  { icon: SiGmail, href: 'mailto:chpurnabhargav@gmail.com', label: 'Email' },
];

const PROJECTS = [
  {
    title: 'Fill Your Code',
    tagline: 'An AI coding assistant for students',
    description:
      'A real-time AI coding assistant built with Node.js, Express, and React. Students can ask about any code and get Gemini-powered suggestions for collaboration and learning in one place.',
    tech: ['Node.js', 'Express', 'React', 'Tailwind CSS', 'Gemini API', 'Render'],
    github: 'https://github.com/chpurnabhargav/Fill-Your-Code',
    demo: 'https://fill-your-code.onrender.com/',
    featured: true,
  },
  {
    title: 'Think Check',
    tagline: 'Adaptive learning, AI-evaluated',
    description:
      'AI-driven adaptive learning platform with dynamic MCQs, written assessments, smart roadmaps, and downloadable notes. Your personal study buddy, powered by Gemini AI.',
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'Gemini API'],
    github: 'https://github.com/chpurnabhargav/ThinkCheck/',
    demo: null,
    featured: true,
  },
  {
    title: 'Inter-Block Outpass System',
    tagline: 'Automated student outpass approvals',
    description:
      'Full-stack web application for automated student outpass approvals. MySQL with role-based access for Students, Faculty, Admins, and VO Officers.',
    tech: ['Node.js', 'Express', 'React', 'MySQL', 'Tailwind CSS'],
    github: 'https://github.com/chpurnabhargav/Inter-Block-OutPass-System',
    demo: null,
    featured: false,
  },
  {
    title: 'Detecting Adrenocortical Carcinoma',
    tagline: 'Bioinformatics meets code',
    description:
      'Identifies adrenocortical carcinoma using TP53 gene sequencing to explore how programming applies to genomic analysis.',
    tech: ['Python', 'Bioinformatics', 'Sequencing'],
    github: 'https://github.com/chpurnabhargav/Detecting-Adrenocortical-carcinoma',
    demo: null,
    featured: false,
  },
  {
  title: 'AI-NEWS',
  tagline: 'Automated AI News Aggregation Agent',
  description:
    'An automated AI agent that collects the latest AI news from multiple reliable sources, processes and organizes the information, and delivers it in one place.',
  tech: ['Python', 'AI Agents', 'Web Scraping', 'Automation'],
  github: 'https://github.com/chpurnabhargav/ai-news-agent/',
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

const CODING_PROFILES = [
  {
    name: 'LeetCode',
    handle: 'chpurnabhargav',
    statLabel: 'Problems Solved',
    url: 'https://leetcode.com/chpurnabhargav',
    icon: SiLeetcode,
    fetchStat: () =>
      fetch('https://alfa-leetcode-api.onrender.com/chpurnabhargav/solved')
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
        .then((j) => ({ value: String(j.solvedProblem), label: 'Problems Solved' })),
  },
  {
    name: 'CodeChef',
    handle: 'purnabhargav',
    statLabel: 'Current Rating',
    url: 'https://www.codechef.com/users/purnabhargav',
    icon: SiCodechef,
    fetchStat: () =>
      loadRatingPoints('ratings-codechef', fetchCodeChefRating).then((points) => ({
        value: String(points[points.length - 1].rating),
        label: 'Current Rating',
      })),
  },
  {
    name: 'Codeforces',
    handle: 'bhargav7666',
    statLabel: 'Current Rating',
    url: 'https://codeforces.com/profile/bhargav7666',
    icon: SiCodeforces,
    fetchStat: () =>
      loadRatingPoints('ratings-codeforces', fetchCodeforcesRating).then((points) => ({
        value: String(points[points.length - 1].rating),
        label: 'Current Rating',
      })),
  },
  {
    name: 'GitHub',
    handle: 'chpurnabhargav',
    statLabel: 'Repositories',
    url: 'https://github.com/chpurnabhargav',
    icon: SiGithub,
    fetchStat: () =>
      fetch('https://api.github.com/users/chpurnabhargav')
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
        .then((j) => ({ value: String(j.public_repos), label: 'Repositories' })),
  },
];

const fetchLeetCodeRating = () =>
  fetch('https://leetcode-stats.tashif.codes/chpurnabhargav/rating').then((r) =>
    r.ok
      ? r.json()
      : Promise.reject(new Error('HTTP ' + r.status))
  ).then((j) => {
    if (j.status !== 'success' || !j.data || !Array.isArray(j.data.history)) {
      throw new Error('Bad response');
    }
    return j.data.history.map((h) => ({
      date: h.timestamp * 1000,
      rating: Math.round(h.rating),
      name: h.contestName,
    }));
  });

const fetchCodeChefRating = () =>
  fetch('https://codechef-stats-api-two.vercel.app/purnabhargav/rating').then((r) =>
    r.ok
      ? r.json()
      : Promise.reject(new Error('HTTP ' + r.status))
  ).then((j) => {
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
  fetch('https://codeforces.com/api/user.rating?handle=bhargav7666').then((r) =>
    r.ok
      ? r.json()
      : Promise.reject(new Error('HTTP ' + r.status))
  ).then((j) => {
    if (j.status !== 'OK' || !Array.isArray(j.result)) {
      throw new Error('Bad response');
    }
    return j.result.map((r) => ({
      date: r.ratingUpdateTimeSeconds * 1000,
      rating: r.newRating,
      name: r.contestName,
    }));
  });

const RATING_SOURCES = [
  {
    key: 'leetcode',
    name: 'LeetCode',
    handle: 'chpurnabhargav',
    url: 'https://leetcode.com/chpurnabhargav',
    color: '#2f4bff',
    fetch: fetchLeetCodeRating,
  },
  {
    key: 'codechef',
    name: 'CodeChef',
    handle: 'purnabhargav',
    url: 'https://www.codechef.com/users/purnabhargav',
    color: '#0f7a52',
    fetch: fetchCodeChefRating,
  },
  {
    key: 'codeforces',
    name: 'Codeforces',
    handle: 'bhargav7666',
    url: 'https://codeforces.com/profile/bhargav7666',
    color: '#d98407',
    fetch: fetchCodeforcesRating,
  },
];

const STORE_PREFIX = 'pb-cache.';
const CACHE_TTL_MS = 60 * 60 * 1000;
const ratingCache = {};
const inflight = {};

function readCache(key) {
  try {
    const raw = localStorage.getItem(STORE_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (!entry || !entry.at || !entry.value || Date.now() - entry.at > CACHE_TTL_MS) return null;
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
      .finally(() => {
        delete inflight[key];
      });
  }
  return inflight[key];
}

const EXPERIENCE = [
  {
    role: 'Software Engineer Intern',
    org: 'Visa Inc. (DPS)',
    period: 'Summer 2026',
    tag: 'Internship',
    bullets: [
      'Automated the workflow of payment mappings within Visa\'s DPS team, replacing a manual, error-prone process with reusable internal tooling',
      'Collaborated with engineers and ops to cut turnaround time on payment mapping reviews while keeping mapping accuracy high',
      'Gained hands-on experience with enterprise payments infrastructure and the full software delivery lifecycle at scale',
    ],
  },
  {
    role: 'Full Stack Developer',
    org: 'Personal & Hackathon Projects',
    period: '2024 to Present',
    bullets: [
      'Built full-stack applications using React, Node.js, MongoDB, and Supabase',
      'Implemented authentication, dashboards, REST APIs, and CI/CD on Render',
    ],
  },
  {
    role: 'Frontend Developer',
    org: 'Portfolio & UI Projects',
    period: '2023 to Present',
    bullets: [
      'Designed responsive UI components with smooth, intentional animations',
      'Translated product requirements into clean, accessible interfaces',
    ],
  },
  {
    role: 'Competitive Programmer',
    org: 'LeetCode · CodeChef · Codeforces',
    period: '2023 to Present',
    bullets: [
      '300+ DSA problems across arrays, graphs, DP, and system design topics',
      'Sharpening speed, logic, and pattern recognition through daily practice',
    ],
  },
];

const SKILL_GROUPS = [
  {
    label: 'Languages',
    items: ['C', 'C++', 'Python', 'Java', 'JavaScript'],
  },
  {
    label: 'Frontend',
    items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'SQL', 'PostgreSQL', 'MySQL'],
  },
  {
    label: 'AI, ML & Data',
    items: ['Python', 'OpenAI API', 'Gemini API', 'Pandas', 'scikit-learn', 'AI Agents'],
  },
  {
    label: 'Tools & DevOps',
    items: ['Git', 'GitHub', 'VS Code', 'AWS', 'Networking', 'No-Code'],
  },
  {
    label: 'Other',
    items: ['Operating Systems', 'IoT', 'FreeCAD', '3D Printing', 'Content Editing'],
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
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2026' },
  { title: 'CCNA: Introduction to Networks', issuer: 'Cisco', year: '2025' },
  { title: 'MongoDB Associate Developer', issuer: 'MongoDB', year: '2025' },
  { title: 'Automation Anywhere RPA (RPC)', issuer: 'Automation Anywhere', year: '2025' },
  { title: 'AWS Academy Cloud Foundations', issuer: 'AWS Academy', year: '2024' },
];

const ROLES = [
  'Full Stack Developer',
  'AI Engineer in training',
  'Data Science & AI Agent Learner',
  'Competitive Programmer',
];

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

function useCountUp(target, inView, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

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

function CursorGlow() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: -600, y: -600 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce]);

  return (
    <div
      className={`cursor-glow ${reduce ? 'cursor-glow--off' : ''}`}
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
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
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <HiArrowUpRight />
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
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__logo" onClick={(e) => handleClick(e, 'top')}>
          <span className="nav__logo-dot" />
          <span>Bhargav</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`nav__link ${active === l.id ? 'nav__link--active' : ''}`}
              onClick={(e) => handleClick(e, l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <a href="/resume.pdf" download="Bhargav_Resume.pdf" className="nav__cta">
            Resume
            <HiArrowUpRight />
          </a>
          <button
            type="button"
            className={`nav__toggle ${open ? 'nav__toggle--open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`nav__mobile ${open ? 'nav__mobile--open' : ''}`}>
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
          Resume
          <HiArrowUpRight />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const typedRole = useTypewriter(ROLES);

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--1" />
        <span className="hero__blob hero__blob--2" />
        <span className="hero__blob hero__blob--3" />
      </div>
      <div className="hero__grid container">
        <div className="hero__copy">
          <Reveal delay={0.05} y={32}>
            <h1 className="hero__name">
              Purna <span className="hero__name-accent">Bhargav</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="hero__role">
              {typedRole}
              <span className="hero__caret" aria-hidden="true" />
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="hero__bio">
              I&apos;m a CS undergrad at KLH University, focused on shipping full-stack
              products with React, Node.js, and modern AI APIs. I&apos;m constantly learning
              data science and AI agents with the goal of becoming an AI engineer. I care
              about clean interfaces, fast feedback loops, and code that actually runs
              in production.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="hero__cta">
              <a href="#work" className="btn btn--primary" onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
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
                >
                  <Icon />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40} className="hero__portrait-wrap">
          <div className="hero__portrait">
            <img src="/img.jpg" alt="Purna Bhargav" />
            <div className="hero__portrait-glow" aria-hidden="true" />
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
  // Double the list so the loop is seamless
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="marquee" aria-label="Technologies I work with">
      <div className="marquee__track">
        {items.map((t, i) => {
          const Icon = t.icon;
          return (
            <div key={`${t.name}-${i}`} className="marquee__item">
              <Icon />
              <span>{t.name}</span>
            </div>
          );
        })}
      </div>
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
            {i < words.length - 1 ? '\u00A0' : ''}
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

function StatCard({ value, suffix = '', label, delay }) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView();
  const count = useCountUp(value, inView);

  return (
    <motion.div
      ref={ref}
      className="about__stat"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <div className="about__stat-value">
        {reduce ? value : count}
        {suffix && <span className="about__stat-suffix">{suffix}</span>}
      </div>
      <div className="about__stat-label">{label}</div>
    </motion.div>
  );
}

function About() {
  const stats = [
    { value: 4, label: 'Projects built' },
    { value: 22, label: 'Competitive contests entered' },
    { value: 2, suffix: '+', label: 'Years writing code' },
    { value: 5, label: 'Industry certifications' },
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
              since the Gemini and OpenAI APIs made it tractable to ship them on a weekend.
            </p>
            <p>
              Right now I&apos;m studying data science and building AI agents in my spare
              time. My goal is to grow into an AI engineer, not just someone who calls
              the APIs.
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

function Projects() {
  return (
    <section className="work" id="work">
      <div className="container">
        <SectionHeader
          eyebrow="02 · Selected work"
          title="Projects I&apos;ve built and shipped."
          description="A selection of recent work, with source code and live demos."
        />

        <div className="work__grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <SpotlightCard className={`work__card ${p.featured ? 'work__card--featured' : ''}`}>
                <div className="work__card-head">
                  <div className="work__card-index">0{i + 1}</div>
                  <div className="work__card-tags">
                    {p.featured && <span className="work__tag work__tag--accent">Featured</span>}
                  </div>
                </div>

                <h3 className="work__card-title">{p.title}</h3>
                <p className="work__card-tagline">{p.tagline}</p>
                <p className="work__card-desc">{p.description}</p>

                <div className="work__card-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="work__tech">{t}</span>
                  ))}
                </div>

                <div className="work__card-links">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="work__link">
                    <SiGithub /> Source
                  </a>
                  {p.demo ? (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="work__link work__link--primary">
                      Live demo <HiArrowUpRight />
                    </a>
                  ) : (
                    <span className="work__link work__link--disabled">No live demo</span>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
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
  const [stat, setStat] = useState({ value: '…', label: profile.statLabel, pending: true });

  useEffect(() => {
    if (!profile.fetchStat) return;

    let cancelled = false;
    const cached = readCache('stat-' + profile.name);
    if (cached) {
      setStat({ value: cached.value, label: cached.label, pending: false });
      return;
    }

    setStat({ value: '…', label: profile.statLabel, pending: true });
    profile
      .fetchStat()
      .then((s) => {
        if (cancelled) return;
        writeCache('stat-' + profile.name, s);
        setStat({ value: s.value, label: s.label, pending: false });
      })
      .catch(() => {
        if (cancelled) return;
        setStat({ value: '—', label: profile.statLabel, pending: false });
      });

    return () => {
      cancelled = true;
    };
  }, [profile]);

  return stat;
}

const CG_W = 720;
const CG_H = 224;
const CG_PAD_X = 12;
const CG_PAD_Y = 22;

function CombinedGraph({ series }) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInView();
  const [hv, setHv] = useState(null);

  const fmtDate = (ts) =>
    new Date(ts).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  const fmtFullDate = (ts) =>
    new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (series.length === 0) {
    return (
      <div className="combined-chart__empty">
        Rating data is temporarily unavailable.
      </div>
    );
  }

  const allPoints = series.flatMap((s) => (s.points || []).filter(Boolean));
  const t0 = Math.min(...allPoints.map((p) => p.date));
  const t1 = Math.max(...allPoints.map((p) => p.date));
  const tspan = t1 - t0 || 1;

  const x = (date) => CG_PAD_X + ((date - t0) / tspan) * (CG_W - CG_PAD_X * 2);

  const prepared = series.map((s) => {
    const ratings = s.points.map((p) => p.rating);
    const min = Math.min(...ratings);
    const max = Math.max(...ratings);
    const rspan = max - min || 1;
    const lo = min - rspan * 0.15;
    const hi = max + rspan * 0.15;
    const y = (r) => CG_H - CG_PAD_Y - ((r - lo) / (hi - lo)) * (CG_H - CG_PAD_Y * 2);
    return {
      s,
      y,
      line: s.points
        .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.date).toFixed(1)},${y(p.rating).toFixed(1)}`)
        .join(' '),
    };
  });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * CG_W;
    const py = ((e.clientY - rect.top) / rect.height) * CG_H;
    setHv({ x: px, y: py });
  };

  const active =
    hv === null
      ? null
      : prepared.reduce((acc, { s, y }) => {
          for (const p of s.points) {
            const dx = x(p.date) - hv.x;
            const dy = y(p.rating) - hv.y;
            const d = dx * dx + dy * dy;
            if (!acc || d < acc.d) acc = { s, p, py: y(p.rating), d };
          }
          return acc;
        }, null);

  const ax = active === null ? 0 : x(active.p.date);

  return (
    <div
      className="combined-chart__plot"
      ref={ref}
      style={{ touchAction: 'none' }}
      onPointerMove={onMove}
      onPointerLeave={() => setHv(null)}
    >
      <svg viewBox={`0 0 ${CG_W} ${CG_H}`} role="img" aria-label="Combined rating history">
        {[0.2, 0.4, 0.6, 0.8].map((f) => (
          <line
            key={f}
            x1={CG_PAD_X}
            x2={CG_W - CG_PAD_X}
            y1={CG_H * f}
            y2={CG_H * f}
            className="combined-chart__grid"
          />
        ))}

        {prepared.map(({ s, line }) => (
          <motion.path
            key={s.key}
            d={line}
            className="combined-chart__line"
            stroke={s.color}
            fill="none"
            strokeOpacity={active && active.s.key !== s.key ? 0.18 : 1}
            style={{ transition: 'stroke-opacity 0.25s' }}
            initial={reduce ? false : { pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.1, ease: EASE }}
          />
        ))}

        {prepared.map(({ s, y }) => {
          const p = s.points[s.points.length - 1];
          return (
            <circle
              key={`end-${s.key}`}
              cx={x(p.date)}
              cy={y(p.rating)}
              r={s.points.length === 1 ? 3.5 : 3}
              fill={s.color}
              stroke="#f7f8fb"
              strokeWidth="1.5"
              opacity={active && active.s.key !== s.key ? 0.3 : 1}
            />
          );
        })}

        {active !== null && (
          <>
            <line
              x1={ax}
              x2={ax}
              y1={CG_PAD_Y * 0.5}
              y2={CG_H - CG_PAD_Y * 0.5}
              className="combined-chart__cursor"
            />
            <circle
              cx={ax}
              cy={active.py}
              r="5"
              fill="#f7f8fb"
              stroke={active.s.color}
              strokeWidth="2.5"
            />
          </>
        )}
      </svg>

      <div className="combined-chart__labels">
        <span>{fmtDate(t0)}</span>
        <span>{fmtDate((t0 + t1) / 2)}</span>
        <span>{fmtDate(t1)}</span>
      </div>

      {active !== null && (
        <div
          className="combined-chart__tooltip"
          style={{ left: `${Math.min(86, Math.max(14, (ax / CG_W) * 100))}%` }}
        >
          <div className="combined-chart__tooltip-date">{fmtFullDate(active.p.date)}</div>
          <div className="combined-chart__tooltip-row">
            <span
              className="combined-chart__tooltip-dot"
              style={{ background: active.s.color }}
            />
            <span className="combined-chart__tooltip-name">{active.s.name}</span>
            <span className="combined-chart__tooltip-rating">{active.p.rating}</span>
            <span className="combined-chart__tooltip-contest" title={active.p.name}>
              {active.p.name}
            </span>
          </div>
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
      <span className="legend-chip__name">{name}</span>
      {ready ? (
        <>
          <span className="legend-chip__current">{data.current}</span>
          <span className="legend-chip__meta">
            peak {data.max} · {data.points.length} contest{data.points.length === 1 ? '' : 's'}
          </span>
        </>
      ) : (
        <span className="legend-chip__meta">@{handle} · unavailable</span>
      )}
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

  return (
    <Reveal className="combined-chart">
      <div className="combined-chart__head">
        <div>
          <h3 className="rating__title">Live rating history</h3>
          <p className="rating__sub">
            Combined rating history from LeetCode, CodeChef, and Codeforces.
          </p>
        </div>
        <span className="combined-chart__live">
          <span className="combined-chart__live-dot" />
          {isLoading ? 'Syncing…' : 'Live'}
        </span>
      </div>

      {isLoading ? (
        <div className="combined-chart__skeleton" aria-hidden="true" />
      ) : (
        <CombinedGraph series={ready} />
      )}

      <div className="combined-chart__legend">
        {series.map((s) => (
          <LegendChip key={s.key} source={s} />
        ))}
      </div>

      {!isLoading && (
        <table className="sr-only">
          <caption>Recent contest ratings on LeetCode, CodeChef, and Codeforces</caption>
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
                  <td>
                    {new Date(p.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
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

  return (
    <Reveal key={profile.name} delay={index * 0.05}>
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
        <div className="coding__card-icon">
          <Icon />
        </div>
        <div className="coding__card-body">
          <div className="coding__card-name">{profile.name}</div>
          <div className="coding__card-handle">@{profile.handle}</div>
        </div>
        <div className={'coding__card-stat' + (stat.pending ? ' is-pending' : '')}>
          <div className="coding__card-stat-value">{stat.value}</div>
          <div className="coding__card-stat-label">{stat.label}</div>
        </div>
        <HiArrowUpRight className="coding__card-arrow" />
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
          description="Live ratings from LeetCode, CodeChef, and Codeforces."
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
          title="Work, internships, and practice."
          description="A timeline of roles, projects, and ongoing practice."
        />

        <div className="experience__list">
          {EXPERIENCE.map((item, i) => (
            <Reveal key={item.role} delay={i * 0.08} className="experience__item">
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
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills">
      <div className="container">
        <SectionHeader
          eyebrow="05 · Skills"
          title="The tools and technologies I use."
        />

        <div className="skills__groups">
          {SKILL_GROUPS.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.04} className="skills__group">
              <div className="skills__group-label">{group.label}</div>
              <div className="skills__tags">
                {group.items.map((s) => (
                  <span key={s} className="skills__tag">{s}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="edu-cert">
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
              {CERTIFICATIONS.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.05} className="edu-cert__cert">
                  <div className="edu-cert__cert-row">
                    <div>
                      <h3 className="edu-cert__title">{c.title}</h3>
                      <p className="edu-cert__sub">{c.issuer}</p>
                    </div>
                    <span className="edu-cert__year">{c.year}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
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
            Open for interesting collaborations.
            The fastest way to reach me is email.
          </p>
          <div className="contact__cta">
            <a href="mailto:chpurnabhargav@gmail.com" className="btn btn--primary btn--lg">
              <SiGmail />
              chpurnabhargav@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/purna-bhargav-challagundla-a783b1292/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--lg"
            >
              <SiLinkedin />
              LinkedIn
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
        <p>© {new Date().getFullYear()} Purna Bhargav CH.</p>
        <a href="#top" className="footer__top" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

/* ---------- PAGE ---------- */

export default function HomePage() {
  // Always scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  return (
    <div className="page">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
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
