import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Zap, Eye, Bot, FileText, Mic, Briefcase, Settings, Target, Building, Home, Heart, ExternalLink } from 'lucide-react';
import { AccessibleButton } from '../App';
import heroImg from '../assets/premium_hero_bg.png';
import interview from '../assets/interview.jpg';
import interview1 from '../assets/laughing.jpg';
import interview2 from '../assets/work.jpg';
import meetsyncDashboard from '../assets/meetsync-dashboard.png';


const SLIDES = [
  {
    src: interview,
    alt: 'interview'
  },
  {
    src: interview1,
    alt: 'happy person'
  },
  {
    src: interview2,
    alt: 'working employee'
  },
];

function Dots({ total, current, onSelect }) {
  return (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to slide ${i + 1}`}
          style={{
            width: i === current ? '12px' : '5px',
            height: '5px',
            borderRadius: '999px',
            background: i === current ? '#ffffff' : 'rgba(255, 255, 255, 0.3)',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      ))}
    </div>
  );
}

export default function LandingHero() {
  const [current, setCurrent] = useState(0);
  const { scrollY } = useScroll();

  // Transform scroll position (0 to 600px) to blur amount (0 to 12px)
  const blurAmount = useTransform(scrollY, [0, 600], ['blur(0px)', 'blur(12px)']);
  // Optionally dim the background slightly as we scroll
  const backgroundDim = useTransform(scrollY, [0, 600], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.3)']);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Fixed Background Layer with Scroll Blur */}
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `var(--hero-gradient), url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          zIndex: -1,
          filter: blurAmount,
        }}
      />

      {/* Subtle Dark Overlay that increases on scroll */}
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          background: backgroundDim,
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      {/* ── Hero Section ── */}
      <section
        className="hero-section"
        aria-labelledby="hero-heading"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
          padding: '120px 24px 60px',
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '60px',
            flexWrap: 'wrap',
          }}
        >
          {/* ── LEFT: Text ── */}
          <div style={{ flex: '1 1 45%', minWidth: '300px', position: 'relative', zIndex: 10 }}>

            <motion.h1
              variants={itemVariants}
              id="hero-heading"
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 4rem)',
                fontWeight: '800',
                marginBottom: '24px',
                color: 'var(--text-primary)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
              }}
            >
              Find <span className="text-gradient" >Work</span> That
              <br />
              <span className="text-gradient">Works For You</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              style={{
                fontSize: '1.15rem',
                color: 'var(--text-muted)',
                marginBottom: '40px',
                maxWidth: '500px',
                lineHeight: '1.7',
              }}
            >
              {' '}
              <strong style={{ color: 'var(--text-primary)' }}>Connecting highly talented professionals with disabilities to employers who value true inclusion. 500+ accessible roles.</strong>
            </motion.p>

            <motion.div
              variants={itemVariants}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
            >
              <Link to="/jobs" style={{ textDecoration: 'none' }}>
                <AccessibleButton
                  style={{
                    minHeight: '54px',
                    borderRadius: '14px',
                    fontSize: '1rem',
                    padding: '0 32px',
                  }}
                  aria-label="Browse all accessible job listings"
                >
                  Browse Jobs
                </AccessibleButton>
              </Link>
              <Link to="/employer" style={{ textDecoration: 'none' }}>
                <AccessibleButton
                  variant="outline"
                  style={{
                    minHeight: '54px',
                    borderRadius: '14px',
                    fontSize: '1rem',
                    padding: '0 32px',
                    background: 'var(--bg-primary)',
                  }}
                  aria-label="View employer dashboard and post jobs"
                >
                  I'm an Employer
                </AccessibleButton>
              </Link>
            </motion.div>


          </div>

          {/* ── RIGHT: Image Carousel ── */}
          <motion.div
            variants={itemVariants}
            style={{
              flex: '1 1 40%',
              minWidth: '280px',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Card */}
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(124,58,237,0.18), 0 4px 16px rgba(0,0,0,0.08)',
                aspectRatio: '4/3',
                background: '#ede9fe',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={SLIDES[current].src}
                  alt={SLIDES[current].alt}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.55, ease: 'easeInOut' }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </AnimatePresence>

              {/* Bottom label overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '32px 20px 16px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)',
                  color: 'white',
                }}
              >
                <p style={{ margin: 0, fontSize: '0.88rem', fontWeight: '600' }}>
                  {SLIDES[current].alt}
                </p>
              </div>
            </div>

            {/* Dots */}
            <Dots total={SLIDES.length} current={current} onSelect={setCurrent} />

          </motion.div>
        </motion.div>
      </section>

      {/* ── All Sections Below Hero with Grain Background ── */}
      <div className="grain-bg" style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Platform Features Section ── */}
        <section style={{ padding: '100px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--accent-teal)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem' }}>
                Explore Platform
              </p>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', margin: '20px 0 0', lineHeight: '1.1', color: 'var(--text-primary)' }}>
                Comprehensive Tools for Your Success
              </h2>
              <p style={{ maxWidth: '700px', margin: '24px auto 0', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                Discover features specifically tailored to empower individuals with disabilities, ensuring an inclusive, efficient, and seamless job-seeking journey.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {/* Feature 1 */}
              <motion.div
                whileHover={{ y: -5 }}
                style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Bot size={28} color="var(--accent-purple)" />
                </div>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.4rem', color: 'var(--text-primary)' }}>AI Chatbot Assistant</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1rem' }}>
                  Enjoy a hands-free, accessible browsing experience with our intelligent 24/7 chatbot ready to assist you anytime.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                whileHover={{ y: -5 }}
                style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <FileText size={28} color="#2563EB" />
                </div>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.4rem', color: 'var(--text-primary)' }}>AI Resume Builder</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1rem' }}>
                  Craft professional, ATS-friendly resumes effortlessly using our AI builder designed to highlight your unique strengths.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                whileHover={{ y: -5 }}
                style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(13,148,136,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Target size={28} color="var(--accent-teal)" />
                </div>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.4rem', color: 'var(--text-primary)' }}>Interactive Interview Prep</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1rem' }}>
                  Practice with realistic, AI-powered mock interviews to boost your confidence and ace your next big opportunity.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                whileHover={{ y: -5 }}
                style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Briefcase size={28} color="#F59E0B" />
                </div>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.4rem', color: 'var(--text-primary)' }}>Accessible Job Board</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1rem' }}>
                  Browse and apply for roles easily on a smart platform tailored natively for screen readers and mobility needs.
                </p>
              </motion.div>

              {/* Feature 5 */}
              <motion.div
                whileHover={{ y: -5 }}
                style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(236,72,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Mic size={28} color="#EC4899" />
                </div>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.4rem', color: 'var(--text-primary)' }}>Voice Navigation</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1rem' }}>
                  Navigate the entire platform hands-free using intuitive voice commands designed for maximum accessibility.
                </p>
              </motion.div>

              {/* Feature 6 */}
              <motion.div
                whileHover={{ y: -5 }}
                style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.04)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Settings size={28} color="#10B981" />
                </div>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.4rem', color: 'var(--text-primary)' }}>Personalized Accessibility Tools</h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1rem' }}>
                  Customize your visual and motor experience instantly with our comprehensive built-in accessibility menu.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Empowering Your Hiring Journey — Bento Grid ── */}
        <section style={{ padding: '80px 24px' }}>
          <style>{`
            .bento-wrap { max-width: 1200px; margin: 0 auto; }
            .bento-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 20px;
            }
            #bento-c1, #bento-c4 {
              display: flex;
              flex-direction: column;
            }
            @media (min-width: 768px) {
              .bento-grid {
                grid-template-columns: repeat(12, 1fr);
              }
              #bento-c1 { grid-column: span 8; }
              #bento-c2 { grid-column: span 4; }
              #bento-c3 { grid-column: span 4; }
              #bento-c4 { grid-column: span 8; }
              #bento-c1, #bento-c4 { flex-direction: row !important; }
              #bento-c1 .bento-img-wrap,
              #bento-c4 .bento-img-wrap {
                width: 45%;
                flex-shrink: 0;
                height: auto;
                min-height: 220px;
              }
              #bento-c1 .bento-text,
              #bento-c4 .bento-text { flex: 1; }
            }
          `}</style>

          <div className="bento-wrap">
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '16px', color: 'var(--accent-purple)' }}>
                Empowering Your Hiring Journey
              </h2>
              <p style={{ maxWidth: '672px', margin: '0 auto', fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                We provide the tools and support needed to transform your workspace into a beacon of accessibility and productivity.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="bento-grid">

              {/* Card 1 — Tax Incentives (wide): text LEFT, image RIGHT */}
              <div
                id="bento-c1"
                style={{
                  background: 'var(--card-bg)',
                  padding: '36px',
                  borderRadius: '28px',
                  border: '1px solid var(--border)',
                  gap: '28px',
                  alignItems: 'stretch',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-teal)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(13,148,136,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="bento-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(13,148,136,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--accent-teal)' }}>payments</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--text-primary)' }}>Maximize Tax Incentives</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px', fontSize: '0.95rem' }}>
                    Learn how your organization can benefit from government credits and diversity grants designed to support inclusive hiring practices.
                  </p>
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-teal)', textDecoration: 'none' }}>
                    View Eligibility Guide <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                  </a>
                </div>
                <div className="bento-img-wrap" style={{ borderRadius: '16px', overflow: 'hidden', height: '200px' }}>
                  <img
                    src={interview2}
                    alt="Tax incentives"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              </div>

              {/* Card 2 — Training & Support (dark purple, narrow) */}
              <div
                id="bento-c2"
                style={{
                  padding: '36px',
                  borderRadius: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: 'var(--accent-purple)',
                }}
              >
                <div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <span className="material-symbols-outlined" style={{ color: '#fff' }}>school</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 12px', color: '#fff' }}>Training &amp; Support</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', fontSize: '0.95rem', margin: 0 }}>
                    We offer specialized sensitivity training and workplace setup guidance for your existing HR teams.
                  </p>
                </div>
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-teal)', margin: 0 }}>
                    Comprehensive 4-week program
                  </p>
                </div>
              </div>

              {/* Card 3 — Diverse Talent Pool (teal, narrow) */}
              <div
                id="bento-c3"
                style={{
                  padding: '36px',
                  borderRadius: '28px',
                  background: 'var(--accent-teal)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <span className="material-symbols-outlined" style={{ color: '#fff' }}>diversity_3</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 12px', color: '#fff' }}>Diverse Talent Pool</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', marginBottom: '28px', fontSize: '0.95rem', flex: 1 }}>
                  Access pre-vetted candidates with expertise in tech, finance, design, and manufacturing.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['12k+ Candidates', '94% Retention'].map(tag => (
                    <span key={tag} style={{ padding: '6px 14px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.2)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 4 — AI Matching (wide): image LEFT, text RIGHT */}
              <div
                id="bento-c4"
                style={{
                  background: 'var(--card-bg)',
                  padding: '36px',
                  borderRadius: '28px',
                  border: '1px solid var(--border)',
                  gap: '28px',
                  alignItems: 'stretch',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-teal)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(13,148,136,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="bento-img-wrap" style={{ borderRadius: '16px', overflow: 'hidden', height: '200px' }}>
                  <img
                    src={meetsyncDashboard}
                    alt="AI matching"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div className="bento-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(13,148,136,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <span className="material-symbols-outlined" style={{ color: 'var(--accent-teal)' }}>psychology</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--text-primary)' }}>AI-Driven Matching</h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px', fontSize: '0.95rem' }}>
                    Our algorithms don't just match keywords; they assess environment compatibility and communication styles for long-term success.
                  </p>
                  <button
                    style={{ alignSelf: 'flex-start', padding: '8px 24px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 700, background: 'rgba(13,148,136,0.1)', color: 'var(--accent-teal)', border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(13,148,136,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,148,136,0.1)'}
                  >
                    How it works
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Government Facilities Section ── */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Government Schemes & Facilities
              </h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                Official resources and support programs designed to empower and assist persons with disabilities.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>

              {/* Delhi Government Schemes */}
              <a
                href="https://discomm.delhi.gov.in/discomm/schemes-and-facilities-persons-disabilities"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', flexDirection: 'column', padding: '32px', background: 'var(--card-bg)', borderRadius: '24px',
                  boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)', transition: 'all 0.3s ease', textDecoration: 'none', color: 'inherit', textAlign: 'center', alignItems: 'center'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'var(--accent-purple)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(37,99,235,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Building size={28} color="#2563EB" />
                </div>
                <h3 style={{ margin: '0 0 12px', fontSize: '1.4rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Delhi State Facilities
                  <ExternalLink size={18} color="var(--text-muted)" />
                </h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', flex: 1 }}>
                  Explore various official schemes, concessions, and facilities provided by the State Commissioner for Persons with Disabilities, Delhi.
                </p>
              </a>

              {/* Gharaunda Scheme */}
              <a
                href="https://nationaltrust.nic.in/gharaunda-scheme/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', flexDirection: 'column', padding: '32px', background: 'var(--card-bg)', borderRadius: '24px',
                  boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)', transition: 'all 0.3s ease', textDecoration: 'none', color: 'inherit', textAlign: 'center', alignItems: 'center'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'var(--accent-purple)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Home size={28} color="#10B981" />
                </div>
                <h3 style={{ margin: '0 0 12px', fontSize: '1.4rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Gharaunda Scheme
                  <ExternalLink size={18} color="var(--text-muted)" />
                </h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', flex: 1 }}>
                  Group Home and Rehabilitation Activities providing supported living for adults with autism, cerebral palsy, mental retardation, and multiple disabilities.
                </p>
              </a>

              {/* Niramaya Scheme */}
              <a
                href="http://nationaltrust.nic.in/scheme/niramaya-scheme/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', flexDirection: 'column', padding: '32px', background: 'var(--card-bg)', borderRadius: '24px',
                  boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)', transition: 'all 0.3s ease', textDecoration: 'none', color: 'inherit', textAlign: 'center', alignItems: 'center'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = 'var(--accent-purple)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <Heart size={28} color="#EF4444" />
                </div>
                <h3 style={{ margin: '0 0 12px', fontSize: '1.4rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  Niramaya Scheme
                  <ExternalLink size={18} color="var(--text-muted)" />
                </h3>
                <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: '1.6', flex: 1 }}>
                  A comprehensive Health Insurance Scheme providing affordable health insurance coverage to persons with disabilities nationwide.
                </p>
              </a>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}