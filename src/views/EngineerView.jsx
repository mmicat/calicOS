import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Faux3DButton from '../components/Faux3DButton';
import styles from './ViewStyles.module.css';
import { Download, X } from 'lucide-react';
import { Github } from '../components/BrandIcons';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5
};

const Slideshow = ({ images, style, className }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', ...style }} className={`slideshow-wrapper ${className || ''}`}>
      <img src={images[0]} alt="" style={{ width: '100%', height: 'auto', visibility: 'hidden', display: 'block' }} className={styles.slideshowBaseImage} />
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          className={styles.slideshowMotionImage}
        />
      </AnimatePresence>
    </div>
  );
};

const MediaModal = ({ isOpen, onClose, project }) => {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div 
          className={styles.modalOverlay} 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={styles.modalContent} 
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <button className={styles.closeButton} onClick={onClose}><X size={18} /></button>
            <div className={styles.modalSplitLayout}>
              <div className={styles.modalImageCol}>
                {Array.isArray(project.image) ? (
                  <Slideshow images={project.image} />
                ) : (
                  <img src={project.image} alt={project.title} />
                )}
              </div>
              <div className={styles.modalInfoCol}>
                <h2 className={styles.modalInfoTitle}>{project.title}</h2>
                <p className={styles.modalInfoRole}>{project.role}</p>
                <p className={styles.modalInfoDesc}>{project.desc}</p>
                {project.link && (
                  <div className={styles.modalActions}>
                    <Faux3DButton href={project.link} color="var(--color-emerald)">View Live</Faux3DButton>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EngineerView = () => {
  const [modalState, setModalState] = useState({ isOpen: false, project: null });

  const openModal = (project) => setModalState({ isOpen: true, project });
  const closeModal = () => setModalState({ isOpen: false, project: null });

  const PROJECTS = [
    {
      title: "Immersive DTLite for Evacuation Training",
      role: "Simulation Engineer",
      image: null,
      desc: "Autonomous agent behavior and dynamic hazard modeling in game engines. Logged real-time simulation analytics and used LLMs for natural language coaching.",
      link: null
    },
    {
      title: "Witch Doctor",
      role: "Game Designer & Sprite Artist",
      image: null,
      desc: "Collaborated in a 6-month program utilizing C# logic and iterative testing to win \"Best Overall Game\".",
      link: null
    },
    {
      title: "Pawfinder",
      role: "Full-Stack Developer",
      image: null,
      desc: "Collaborated on a Java Spring & Spring Data pet adoption platform to streamline rescue-to-adoption pipelines. Architected backend entity relationships and user scenarios for a data-driven experience using Git for version control.",
      link: null
    },
    {
      title: "HRC Automator",
      role: "Full-Stack Developer",
      image: [
        "../media/Screenshot HRCA Dashboard.png",
        "../media/Screenshot Invoices Engine.png",
        "../media/Screenshot New Job Card.png",
        '../media/Screenshot Loyalty Cards.png'
      ],
      desc: "A private, auth-protected web app built for Hot Rides Customs Garage to replace the manual process of creating service job cards. Generates numbered Job Cards to PDFs, invoices specific job cards with real-time totals, and maintains a client/vehicle database. Deployed on Render.",
      link: "https://github.com/mmicat/hrc-automator"
    },
    {
      title: "Space Lullaby",
      role: "Creative Developer",
      image: "../media/Screenshot Space Lullaby & The Outlaw's Archive.png",
      desc: "An interactive web experience exploring a space lullaby concept, recognized for its take on storytelling, design and user interaction.",
      link: "https://mira-m-ismail.github.io/SpaceLullaby/space-lullaby.html"
    }
  ];

  const sortedProjects = [...PROJECTS].sort((a, b) => {
    const hasImageA = a.image !== null;
    const hasImageB = b.image !== null;
    return hasImageB - hasImageA;
  });

  return (
    <>
      <MediaModal isOpen={modalState.isOpen} onClose={closeModal} project={modalState.project} />
      
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className={styles.viewContainer}
      >
        <section id="hero" className={styles.section}>
          <motion.h1 layoutId="heroTitle" className={styles.heroTitle}>
            MIRA<br/>ISMAIL
          </motion.h1>
          <motion.p layoutId="heroSubtitle" className={styles.heroSubtitle}>Creative Systems & Web Engineer</motion.p>
          <p className={styles.heroDesc}>Advocate for good, merging systems engineering & beautifully human UI.</p>
          <div className={styles.actionRow}>
            <Faux3DButton color="var(--color-canary)" href="/media/Mira_Mohamad_Ismail_CV.pdf">
              <Download size={18} />
              Resume
            </Faux3DButton>
            <Faux3DButton color="var(--color-limeade)" href="https://github.com/mira-m-ismail">
              <Github size={18} />
              GitHub
            </Faux3DButton>
          </div>
        </section>

        <section id="about" className={styles.section}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.cardDesc} style={{ fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1rem' }}>
              A student at <a href="https://www.rit.edu/dubai/" target="_blank" rel="noreferrer" className={styles.hoverLink}>Rochester Institute of Technology, Dubai</a>, passionate about product design, design engineering, and creative technology.<br></br>I'm building scalable systems while ensuring ethics, accessibility and human expression are at the forefront, always. 
            </p>
            <p>
              When I'm not coding, I'm cooking up events with my friends or creating digital art!
            </p>
          </div>
        </section>

        <section id="projects" className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects & Initiatives</h2>
          <div className={styles.projectGrid}>
            {sortedProjects.map((project, i) => (
              project.image ? (
                <div key={i} className={`${styles.card} ${styles.projectCard}`}>
                  <div className={styles.projectImageContainer}>
                    {Array.isArray(project.image) ? (
                      <Slideshow images={project.image} style={{ height: '100%' }} />
                    ) : (
                      <img src={project.image} alt={project.title} />
                    )}
                    <div className={styles.projectHoverOverlay}>
                      <p className={styles.projectHoverDesc}>{project.desc}</p>
                      <button className={styles.projectMoreBtn} onClick={() => openModal(project)}>More</button>
                    </div>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectRole}>{project.role}</p>
                </div>
              ) : (
                <div key={i} className={`${styles.card} ${styles.projectCardTextOnly}`}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectRole} style={{ marginBottom: '1rem' }}>{project.role}</p>
                  <p className={styles.cardDesc} style={{ flexGrow: 1 }}>{project.desc}</p>
                  {project.link && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <Faux3DButton href={project.link} color="var(--color-emerald)">View Live</Faux3DButton>
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </section>

        <section id="stack" className={styles.section}>
          <h2 className={styles.sectionTitle}>Tech Stack</h2>
          <div className={styles.stackGrid}>
            {['React', 'Next.js', 'Node.js', 'TypeScript', 'Spring Boot', 'MySQL', 'PostgreSQL', 'Python', 'Framer Motion', 'Vite', 'Flask', 'Figma', 'HTML/CSS', 'JavaScript', 'Java', 'WordPress', 'AI/ML'].map((tech, i) => (
              <motion.div 
                key={tech} 
                className={styles.stackBadge}
                whileHover={{ y: -5, rotate: i % 2 === 0 ? 2 : -2 }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </section>

        <section id="experience" className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <h3><a href="https://www.developforgood.org/" target="_blank" rel="noreferrer" className={styles.hoverLink}>Develop for Good</a></h3>
              <p className={styles.meta}>Software Engineer Fellow | May 2026 - Aug 2026</p>
              <p className={styles.cardDesc}>Building the KidsWork Hub learning platform for <a href="https://makeanimpactnow.org/" target="_blank" rel="noreferrer" className={styles.hoverLink}>Make An Impact Foundation</a> aimed at kids grades 6 to 12, streamlining high-impact educational content delivery.</p>
            </div>
            <div className={styles.timelineItem}>
              <h3><a href="https://www.instagram.com/hotridescustoms/" target="_blank" rel="noreferrer" className={styles.hoverLink}>Hot Rides Customs Garage LLC</a></h3>
              <p className={styles.meta}>Full-Stack Systems Developer | 2024 - Present</p>
              <p className={styles.cardDesc}>Developed and deployed an automated Job Card & Invoice Generator using React, Node.js, and MySQL. Also built their commercial landing page.</p>
            </div>
            <div className={styles.timelineItem}>
              <h3><span>Tabby</span></h3>
              <p className={styles.meta}>Regression UX Tester | 2024 - 2025</p>
              <p className={styles.cardDesc}>Comprehensively tested Android apps to uphold high QA standards for both English and Arabic versions.</p>
            </div>
            <div className={styles.timelineItem}>
              <h3><a href="https://scrapyard.hackclub.com/sharjah" target="_blank" rel="noreferrer" className={styles.hoverLink}>Scrapyard Hackathon</a></h3>
              <p className={styles.meta}>Marketing MVP | Jan - Mar 2025</p>
              <p className={styles.cardDesc}>A global hackathon run by high school students for "stupid inventions!" Ran locally at Sheraa' Hub, AUS. Responsible for marketing initiatives securing participants and sponsors like balsamiq & Hetzner.</p>
            </div>
          </div>
        </section>

        <section id="certificates" className={styles.section}>
          <h2 className={styles.sectionTitle}>Certificates & Awards</h2>
          <div className={styles.shelfContainer}>
            <div className={styles.shelf}>
              <div className={styles.shelfItem}>
                <img src="/media/GDC DesignAThon.png" alt="DesignAThon Prize" />
              </div>
              <div className={styles.shelfItem}>
                <img src="/media/Scrapyard Sharjah MVP.png" alt="Scrapyard MVP" />
              </div>
              <div className={styles.shelfItem}>
                <img src="/media/Endless Best Game.png" alt="Best Overall Game" />
              </div>
            </div>
            <div className={styles.shelf}>
              <div className={styles.shelfItem}>
                <img src="/media/GDC Artist.png" alt="Artist Recognition" />
              </div>
              <div className={styles.shelfItem}>
                <img src="/media/Fall25 Deans List.png" alt="Fall 2025 Deans List" />
              </div>
            </div>
            <div className={styles.shelf}>
              <div className={styles.shelfItem}><span>CodePath AI201: Applications of AI Engineering</span></div>
              <div className={styles.shelfItem}><span>CodePath WEB102: Intermediate Web Development</span></div>
              <div className={styles.shelfItem}><span>Develop For Good Fellowship</span></div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default EngineerView;
