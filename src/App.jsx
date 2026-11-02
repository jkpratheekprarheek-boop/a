import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Award, BriefcaseBusiness,
  Check, ChevronDown, ChevronRight, Code2, ExternalLink, GraduationCap, Instagram,
  Layers3, Linkedin, Mail, Menu, Monitor, MousePointer2, Palette, Send, ShieldCheck,
  Sparkles, X, Zap, BarChart3, BrainCircuit, BookOpen, FileBadge, CakeSlice,
  ShoppingBag, Compass, Upload, Image as ImageIcon, Settings2, CircleDot
} from "lucide-react";
import { profile, socials, skills, certificates, projects } from "./data.js";

const STORAGE_KEY = "pratheek-portfolio-media-v1";

function WingMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 100 64" fill="none" aria-hidden="true">
      <path d="M48 30C33 15 20 10 4 7c4 16 13 26 28 32-11-2-20-1-29 2 13 13 29 18 45 14V30Z" fill="currentColor" />
      <path d="M52 30C67 15 80 10 96 7c-4 16-13 26-28 32 11-2 20-1 29 2-13 13-29 18-45 14V30Z" fill="currentColor" />
      <path d="M50 18v43" stroke="#06101e" strokeWidth="3" strokeLinecap="round" opacity=".75" />
      <path d="M19 19c10 4 18 10 25 18M81 19c-10 4-18 10-25 18" stroke="#06101e" strokeWidth="2.4" strokeLinecap="round" opacity=".62" />
    </svg>
  );
}

function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) => {
        const next = Math.min(100, value + 5 + Math.round(Math.random() * 5));
        if (next >= 100) {
          window.clearInterval(timer);
          window.setTimeout(onFinish, 320);
        }
        return next;
      });
    }, 48);
    return () => window.clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="loader-screen" aria-label="Loading portfolio">
      <div className="loader-orbit orbit-one" />
      <div className="loader-orbit orbit-two" />
      <div className="loader-content">
        <div className="loader-mark"><WingMark /></div>
        <p className="eyebrow">PERSONAL PORTFOLIO</p>
        <h1>PRATHEEK <span>JANADRI</span></h1>
        <div className="loader-track"><span style={{ width: progress + "%" }} /></div>
        <div className="loader-meta"><span>BUILDING THE EXPERIENCE</span><strong>{String(progress).padStart(2, "0")}%</strong></div>
      </div>
      <div className="loader-grain" />
    </div>
  );
}

function SectionHeading({ eyebrow, title, accent, description, number }) {
  return (
    <div className="section-heading reveal">
      <div className="section-index"><span>{number}</span><i /></div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title} <span>{accent}</span></h2>
        {description && <p className="section-description">{description}</p>}
      </div>
    </div>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a className="social-link" href={href || "#contact"} target={href ? "_blank" : undefined} rel={href ? "noreferrer" : undefined} aria-label={label} title={label}>
      {children}
    </a>
  );
}

function StatusPill({ status }) {
  const kind = status === "Completed" ? "complete" : status === "Planned" ? "planned" : "learning";
  return <span className={"status-pill " + kind}><i />{status}</span>;
}

function PortraitStage({ image }) {
  return (
    <div className="portrait-stage">
      <div className="portrait-ring ring-a" />
      <div className="portrait-ring ring-b" />
      <div className="portrait-ring ring-c" />
      <div className="portrait-grid" />
      <div className="portrait-spark spark-a" />
      <div className="portrait-spark spark-b" />
      {image ? (
        <img className="portrait-upload" src={image} alt="Portrait of Pratheek Janadri" />
      ) : (
        <div className="portrait-placeholder">
          <div className="portrait-halo" />
          <WingMark className="portrait-wings" />
          <div className="portrait-initials">PJ</div>
          <span className="portrait-label">YOUR PORTRAIT</span>
          <span className="portrait-caption">UPLOAD A PHOTO IN EDIT MEDIA</span>
        </div>
      )}
      <div className="portrait-orbit-label"><span /> CREATIVE MINDSET / BUSINESS FOCUS</div>
      <div className="portrait-coordinate">15°20' N<br />76°27' E</div>
      <div className="portrait-glass-tag"><span className="live-dot" /> OPEN TO LEARNING</div>
    </div>
  );
}

function ProjectVisual({ kind }) {
  if (kind === "crumbs") {
    return (
      <div className="project-visual crumbs-visual">
        <div className="crumbs-glow" />
        <span className="visual-kicker">FRESHLY MADE / EST. CONCEPT</span>
        <div className="cake-art"><CakeSlice size={100} strokeWidth={1.1} /></div>
        <div className="crumbs-wordmark">crumbs<span>.</span></div>
        <div className="visual-bottom"><span>BAKED WITH PURPOSE</span><ArrowUpRight size={18} /></div>
      </div>
    );
  }
  if (kind === "nike") {
    return (
      <div className="project-visual nike-visual">
        <div className="nike-lines" />
        <span className="visual-kicker">MOVE WITH INTENT</span>
        <div className="shoe-shape"><div className="shoe-sole" /><div className="shoe-body" /><div className="shoe-swoosh">◜</div></div>
        <div className="nike-wordmark">NIKE<span> / CONCEPT</span></div>
        <div className="visual-bottom"><span>PRODUCT / CULTURE / MOTION</span><ArrowUpRight size={18} /></div>
      </div>
    );
  }
  return (
    <div className="project-visual aeronix-visual">
      <div className="aeronix-rays" />
      <WingMark className="aeronix-mark" />
      <div className="aeronix-wordmark">AERONIX</div>
      <span className="visual-kicker">BEYOND THE ORDINARY</span>
      <div className="visual-bottom"><span>FUTURE IN EVERY STEP</span><ArrowUpRight size={18} /></div>
    </div>
  );
}

function ImageUploadRow({ title, description, value, onChange }) {
  return (
    <div className="upload-row">
      <div className="upload-preview">
        {value ? <img src={value} alt="" /> : <ImageIcon size={21} />}
      </div>
      <div className="upload-copy"><strong>{title}</strong><span>{description}</span></div>
      <label className="upload-button">
        <Upload size={14} /> {value ? "Replace" : "Upload"}
        <input type="file" accept="image/*" onChange={(event) => onChange(event.target.files?.[0])} />
      </label>
      {value && <button className="icon-button remove-upload" onClick={() => onChange(null)} aria-label={"Remove " + title + " image"}><X size={15} /></button>}
    </div>
  );
}

function AdminPanel({ assets, onUpload, onClose }) {
  const mediaItems = [
    { key: "portrait", title: "Hero portrait", description: "A clear professional photo for the opening section." },
    ...certificates.map((item) => ({ key: item.id, title: item.title, description: item.issuer + " certificate image." })),
    { key: "achievement", title: "Young Turks certificate", description: "Certificate of Merit preview for the achievement section." }
  ];
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="admin-panel" role="dialog" aria-modal="true" aria-labelledby="admin-title">
        <div className="admin-header">
          <div><p className="eyebrow">LOCAL MEDIA MANAGER</p><h2 id="admin-title">Edit <span>media</span></h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close media manager"><X /></button>
        </div>
        <p className="admin-note">Add your original portrait and certificate images. These previews are saved only in this browser on this device; they are not uploaded to GitHub or a server.</p>
        <div className="upload-list">
          {mediaItems.map((item) => (
            <ImageUploadRow key={item.key} title={item.title} description={item.description} value={assets[item.key]} onChange={(file) => onUpload(item.key, file)} />
          ))}
        </div>
        <div className="admin-footer"><span><ShieldCheck size={15} /> Private local preview</span><button className="button button-primary button-small" onClick={onClose}>Done <Check size={15} /></button></div>
      </section>
    </div>
  );
}

function CertificateModal({ item, image, onClose }) {
  if (!item) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close certificate details"><X /></button>
        <p className="eyebrow">{item.type}</p>
        <h2 id="certificate-modal-title">{item.title}</h2>
        <p className="modal-issuer">{item.issuer}</p>
        {image ? <img className="certificate-preview" src={image} alt={item.title + " certificate"} /> : <div className="certificate-empty"><FileBadge size={42} /><span>Certificate image not added yet</span><small>Use Edit media to add the original file.</small></div>}
        <p className="modal-description">{item.description}</p>
        <StatusPill status={item.status} />
      </section>
    </div>
  );
}

function SkillCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const iconMap = {
    Accounting: <BarChart3 />,
    Productivity: <Layers3 />,
    "Business Analytics": <BriefcaseBusiness />,
    "AI & Technology": <BrainCircuit />
  };
  return (
    <article className={"skill-card reveal delay-" + (index % 4)} >
      <div className="skill-card-top"><span className="skill-icon">{iconMap[item.category]}</span><span className="skill-number">0{index + 1}</span></div>
      <p className="skill-category">{item.category}</p>
      <h3>{item.title}</h3>
      <StatusPill status={item.status} />
      <button className="skill-expand" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
        {expanded ? "Hide details" : "View details"} <ChevronDown size={15} className={expanded ? "rotated" : ""} />
      </button>
      {expanded && <p className="skill-detail">{item.detail}</p>}
    </article>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [assets, setAssets] = useState({});
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setAssets(JSON.parse(saved));
    } catch (error) {
      console.warn("Could not read locally saved portfolio media.", error);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [loading]);

  const filteredSkills = useMemo(() => {
    if (activeFilter === "All") return skills;
    return skills.filter((item) => item.status === activeFilter);
  }, [activeFilter]);

  const handleUpload = (key, file) => {
    if (file === null) {
      setAssets((previous) => {
        const next = { ...previous };
        delete next[key];
        try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (error) { console.warn("Local media storage is full.", error); }
        return next;
      });
      return;
    }
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAssets((previous) => {
        const next = { ...previous, [key]: reader.result };
        try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (error) { alert("This image is too large for local browser storage. Try a smaller JPG or PNG image."); }
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const navItems = [
    ["home", "Home"], ["about", "About"], ["education", "Education"],
    ["skills", "Skills"], ["credentials", "Credentials"], ["projects", "Projects"], ["contact", "Contact"]
  ];

  const closeMenu = () => setMobileMenu(false);

  return (
    <>
      {loading && <Loader onFinish={() => setLoading(false)} />}
      <div className={"site-shell " + (loading ? "site-loading" : "site-ready")}>
        <div className="ambient ambient-one" /><div className="ambient ambient-two" />
        <header className="site-header">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Pratheek Janadri home"><span className="brand-mark"><WingMark /></span><span className="brand-name">PJ<span>.</span></span></a>
          <nav className={mobileMenu ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
            {navItems.map(([id, label]) => <a key={id} href={"#" + id} className={activeNav === id ? "active" : ""} onClick={closeMenu}>{label}</a>)}
            <button className="nav-admin" onClick={() => { setAdminOpen(true); closeMenu(); }}><Settings2 size={14} /> Edit media</button>
          </nav>
          <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label={mobileMenu ? "Close menu" : "Open menu"}>{mobileMenu ? <X /> : <Menu />}</button>
        </header>

        <main>
          <section className="hero-section" id="home">
            <div className="hero-lightbeam beam-one" /><div className="hero-lightbeam beam-two" /><div className="hero-stars" />
            <div className="hero-copy">
              <p className="hero-greeting"><span className="blue-dot" /> HELLO, I'M</p>
              <h1 className="hero-name"><span>PRATHEEK</span><strong>JANADRI</strong></h1>
              <div className="hero-role"><strong>B.COM STUDENT</strong><i /> <span>ASPIRING PROFESSIONAL</span></div>
              <p className="hero-intro">Exploring the intersection of accounting, business, technology and creative digital experiences.</p>
              <div className="hero-actions">
                <a href="#projects" className="button button-primary">Explore my work <ArrowRight size={17} /></a>
                <a href="#contact" className="button button-ghost">Let's connect <Send size={15} /></a>
              </div>
              <div className="hero-socials">
                <SocialLink href={socials.linkedin} label="LinkedIn"><Linkedin size={17} /></SocialLink>
                <SocialLink href={socials.naukri} label="Naukri.com"><BriefcaseBusiness size={16} /></SocialLink>
                <SocialLink href={socials.instagram} label="Instagram"><Instagram size={17} /></SocialLink>
                <span className="social-caption">FIND ME ONLINE</span>
              </div>
              <a href="#about" className="scroll-cue"><span className="scroll-mouse"><ArrowDown size={14} /></span><span>SCROLL TO EXPLORE</span></a>
            </div>
            <div className="hero-portrait-wrap"><PortraitStage image={assets.portrait} /></div>
            <div className="hero-bottom-note"><span>01 / 07</span><i /><span>IDEAS INTO IMPACT</span></div>
            <div className="hero-side-note">ACCOUNTING <b>×</b> BUSINESS <b>×</b> TECHNOLOGY</div>
          </section>

          <section className="about-section section-wrap" id="about">
            <SectionHeading number="01" eyebrow="A LITTLE ABOUT ME" title="Curiosity meets" accent="purpose." description="A commerce student building practical knowledge, one thoughtful step at a time." />
            <div className="about-grid">
              <div className="about-statement reveal">
                <span className="quote-mark">“</span>
                <h3>Turning ideas into impact through <em>continuous learning.</em></h3>
                <p>I'm a Bachelor of Commerce student at Vijayanagara Sri Krishnadevaraya University (VSKU), interested in financial accounting, business operations, digital tools and emerging technologies.</p>
                <p>I am developing practical skills through structured learning, hands-on practice, academic projects and virtual job simulations.</p>
                <p>My current focus is strengthening my accounting and Excel knowledge while exploring how technology and AI can support modern business operations.</p>
                <div className="signature-line"><span>PRATHEEK JANADRI</span><i /></div>
              </div>
              <div className="about-side">
                <div className="about-info-card reveal delay-1"><span className="about-info-icon"><GraduationCap /></span><div><small>CURRENTLY STUDYING</small><strong>Bachelor of Commerce</strong><span>3rd Semester · VSKU</span></div><ArrowUpRight size={18} /></div>
                <div className="about-info-card reveal delay-2"><span className="about-info-icon"><BookOpen /></span><div><small>LEARNING FOCUS</small><strong>Accounting & Digital Tools</strong><span>Building practical foundations</span></div><ArrowUpRight size={18} /></div>
                <div className="about-info-card reveal delay-3"><span className="about-info-icon"><Sparkles /></span><div><small>MINDSET</small><strong>Stay curious. Keep growing.</strong><span>Progress through consistency</span></div><ArrowUpRight size={18} /></div>
                <div className="about-mantra reveal"><span className="mantra-line" /><span>LEARN / GROW / CONTRIBUTE</span><span className="mantra-star">✳</span></div>
              </div>
            </div>
          </section>

          <section className="education-section section-wrap" id="education">
            <SectionHeading number="02" eyebrow="THE ACADEMIC JOURNEY" title="Building the" accent="foundation." description="A clear record of the education currently in progress." />
            <div className="education-panel reveal">
              <div className="education-visual">
                <div className="education-orbit" /><div className="education-orbit orbit-inner" />
                <GraduationCap size={58} strokeWidth={1.1} />
                <span>EDUCATION / 01</span>
              </div>
              <div className="education-content">
                <div className="education-topline"><span className="status-pill learning"><i /> Currently pursuing</span><span className="education-date">UNDERGRADUATE</span></div>
                <h3>Bachelor of <span>Commerce</span></h3>
                <p className="education-college">{profile.college}</p>
                <p className="education-university">{profile.university} (VSKU)</p>
                <div className="education-tags"><span><BookOpen size={14} /> {profile.semester}</span><span><CircleDot size={13} /> Accounting & Finance</span></div>
                <p className="education-footnote">Academic details are intentionally limited to the information provided. No marks, CGPA or graduation date are assumed.</p>
              </div>
              <div className="education-watermark">B.COM</div>
            </div>
          </section>

          <section className="skills-section section-wrap" id="skills">
            <SectionHeading number="03" eyebrow="TOOLS & CAPABILITIES" title="Skills in" accent="progress." description="An honest snapshot of completed training, active learning and planned next steps." />
            <div className="skills-toolbar reveal">
              <div className="filter-label"><span className="filter-pulse" /> SKILL DIRECTORY</div>
              <div className="filter-buttons">
                {["All", "Completed", "Learning", "Planned"].map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={activeFilter === filter ? "filter-active" : ""}>{filter}</button>)}
              </div>
            </div>
            <div className="skills-grid">
              {filteredSkills.map((item, index) => <SkillCard key={item.id} item={item} index={index} />)}
            </div>
            <div className="skills-footnote reveal"><ShieldCheck size={16} /><span>Learning statuses are shown as stated; no artificial proficiency scores or experience percentages are used.</span></div>
          </section>

          <section className="credentials-section section-wrap" id="credentials">
            <SectionHeading number="04" eyebrow="LEARNING & EXPERIENCE" title="Credentials &" accent="simulations." description="Courses, training and virtual job simulations that support continued professional development." />
            <div className="credentials-grid">
              {certificates.map((item, index) => (
                <article className="credential-card reveal" key={item.id}>
                  <div className="credential-card-head"><div className="credential-icon"><FileBadge size={22} /></div><span className="credential-index">CRED / 0{index + 1}</span></div>
                  <p className="credential-type">{item.type}</p>
                  <h3>{item.title}</h3>
                  <p className="credential-issuer">{item.issuer}</p>
                  <div className="credential-bottom"><StatusPill status={item.status} /><button onClick={() => setSelectedCertificate(item)} className="text-link">View details <ArrowUpRight size={15} /></button></div>
                  {assets[item.id] && <span className="image-added"><Check size={11} /> IMAGE ADDED</span>}
                </article>
              ))}
            </div>
            <div className="credentials-disclaimer reveal"><ShieldCheck size={17} /><p>Virtual job simulations are learning experiences, not employment or formal internships. Certificate dates and IDs are not shown unless verified and added.</p><button onClick={() => setAdminOpen(true)}>Add certificate images <ArrowUpRight size={14} /></button></div>
          </section>

          <section className="achievement-section section-wrap" id="achievement">
            <SectionHeading number="05" eyebrow="A MOMENT TO REMEMBER" title="A milestone in" accent="the journey." description="Recognising a result earned through participation and focused effort." />
            <div className="achievement-card reveal">
              <div className="achievement-light" />
              <div className="achievement-left">
                <div className="achievement-badge"><Award size={25} /><span>CERTIFICATE OF MERIT</span></div>
                <p className="achievement-eyebrow">NAUKRI CAMPUS · YOUNG TURKS 2026</p>
                <h3>Recognised for<br /><span>performance.</span></h3>
                <p className="achievement-copy">A Certificate of Merit in the Naukri Campus Young Turks 2026 assessment.</p>
                <div className="achievement-date"><span>DATE</span><strong>19 OCTOBER 2026</strong></div>
              </div>
              <div className="achievement-score">
                <div className="score-orbit" /><div className="score-number">91.54<span className="score-percentile">PERCENTILE</span></div>
                <div className="score-caption">A percentile result — not percentage marks.</div>
                {assets.achievement ? <img src={assets.achievement} alt="Naukri Campus Young Turks Certificate of Merit" className="achievement-image" /> : <div className="achievement-certificate-placeholder"><FileBadge size={23} /><span>CERTIFICATE PREVIEW</span><button onClick={() => setAdminOpen(true)}>Upload original <Upload size={13} /></button></div>}
              </div>
              <div className="achievement-stamp">MERIT<br />2026</div>
            </div>
          </section>

          <section className="projects-section section-wrap" id="projects">
            <SectionHeading number="06" eyebrow="SELECTED WORK" title="Ideas taking" accent="shape." description="Concept projects exploring digital experiences, product presentation and visual identity." />
            <div className="projects-grid">
              {projects.map((project, index) => (
                <article className={"project-card reveal delay-" + index} key={project.id}>
                  <div className="project-art-wrap"><ProjectVisual kind={project.visual} /><span className="project-open"><ArrowUpRight size={20} /></span></div>
                  <div className="project-info">
                    <div className="project-meta"><span>PROJECT {project.number}</span><span>{project.category}</span></div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <a href="#contact" className="project-link">Discuss this concept <ArrowUpRight size={15} /></a>
                  </div>
                </article>
              ))}
            </div>
            <div className="projects-note reveal"><span className="note-symbol">↗</span><p>These are portfolio concepts. Live project URLs can be added to the project data when available.</p></div>
          </section>

          <section className="contact-section section-wrap" id="contact">
            <div className="contact-orbit orbit-contact-one" /><div className="contact-orbit orbit-contact-two" />
            <SectionHeading number="07" eyebrow="THE NEXT CHAPTER" title="Let's create" accent="something meaningful." description="Open to learning, collaboration and conversations around accounting, business and technology." />
            <div className="contact-content reveal">
              <div><p className="contact-kicker">HAVE A PROJECT OR AN IDEA?</p><h3>Every great connection<br />starts with a <span>hello.</span></h3></div>
              <a className="contact-cta" href={profile.email ? "mailto:" + profile.email : "#contact-details"} onClick={(event) => { if (!profile.email) { event.preventDefault(); document.getElementById("contact-details")?.scrollIntoView({ behavior: "smooth" }); } }}><span>LET'S CONNECT</span><ArrowUpRight size={26} /></a>
            </div>
            <div className="contact-details" id="contact-details">
              <div className="contact-detail-label"><span className="blue-dot" /> SOCIAL & PROFESSIONAL LINKS</div>
              <div className="contact-socials">
                <a href={socials.linkedin || "#contact-details"} target={socials.linkedin ? "_blank" : undefined} rel="noreferrer"><Linkedin size={18} /><span>LinkedIn</span><ArrowUpRight size={15} /></a>
                <a href={socials.naukri || "#contact-details"} target={socials.naukri ? "_blank" : undefined} rel="noreferrer"><BriefcaseBusiness size={18} /><span>Naukri.com</span><ArrowUpRight size={15} /></a>
                <a href={socials.instagram || "#contact-details"} target={socials.instagram ? "_blank" : undefined} rel="noreferrer"><Instagram size={18} /><span>Instagram</span><ArrowUpRight size={15} /></a>
              </div>
              <p className="link-config-note">Profile links and email can be configured in <code>src/data.js</code>.</p>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <a className="footer-brand" href="#home"><WingMark /><span>PJ.</span></a>
          <p>DESIGNED WITH INTENT. BUILT THROUGH CURIOSITY.</p>
          <span>© {new Date().getFullYear()} PRATHEEK JANADRI</span>
          <button onClick={() => setAdminOpen(true)} className="footer-admin"><Settings2 size={13} /> Edit media</button>
        </footer>
      </div>
      {adminOpen && <AdminPanel assets={assets} onUpload={handleUpload} onClose={() => setAdminOpen(false)} />}
      {selectedCertificate && <CertificateModal item={selectedCertificate} image={assets[selectedCertificate.id]} onClose={() => setSelectedCertificate(null)} />}
    </>
  );
}

export default App;
