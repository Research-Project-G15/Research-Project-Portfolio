
import React, { useEffect, useRef, useState } from 'react';


const Home: React.FC = () => {
  const [navActive, setNavActive] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const formMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {


      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formMessageRef.current) {
       formMessageRef.current.textContent = 'Thank you for your message! We will get back to you soon.';
       formMessageRef.current.className = 'form-message success';
       setTimeout(() => {
         if (formMessageRef.current) formMessageRef.current.className = 'form-message';
       }, 5000);
    }
    (e.target as HTMLFormElement).reset();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetAttr = entry.target.getAttribute('data-target');
                if (targetAttr) {
                  const target = parseInt(targetAttr);
                  let current = 0;
                  const increment = target / 100;
                  const timer = setInterval(() => {
                      current += increment;
                      if (current >= target) {
                          entry.target.textContent = Math.ceil(target).toString() + (entry.target.tagName.toLowerCase() === 'span' ? '%' : '');
                          clearInterval(timer);
                      } else {
                          entry.target.textContent = Math.ceil(current).toString();
                      }
                  }, 20);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statNumbers = document.querySelectorAll('.stat-number span[data-target], .stat-number[data-target]');
    statNumbers.forEach(stat => observer.observe(stat));
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-card, .objective-card, .contribution-item, .layer-card, .org-card, .tech-item, .function-card, .security-item, .test-card, .metric-card, .demo-feature, .team-member');
        elements.forEach(element => {
            const el = element as HTMLElement;
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    const elements = document.querySelectorAll('.about-card, .objective-card, .contribution-item, .layer-card, .org-card, .tech-item, .function-card, .security-item, .test-card, .metric-card, .demo-feature, .team-member');
    elements.forEach(element => {
        const el = element as HTMLElement;
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 100);
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="home-container">
    {/* Navigation */}
    <nav className="navbar" id="navbar">
        <div className="container">
            <div className="nav-brand">
                <i className="fas fa-cube"></i>
                <span>Blockchain Land Registry</span>
            </div>
            <button className="nav-toggle" onClick={() => setNavActive(!navActive)}  aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul className={`nav-menu ${navActive ? "active" : ""}`}>
                <li><a href="#home" className="nav-link active">Home</a></li>
                <li><a href="#about" className="nav-link">About</a></li>
                <li><a href="#architecture" className="nav-link">Architecture</a></li>
                <li><a href="#technology" className="nav-link">Technology</a></li>
                <li><a href="#demo" className="nav-link">Demo</a></li>
                <li><a href="#testing" className="nav-link">Testing</a></li>
                <li><a href="#team" className="nav-link">Team</a></li>
                <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
        </div>
    </nav>

    {/* Hero Section */}
    <section id="home" className="hero">
        <div className="container">
            <div className="hero-content">
                <div className="hero-badge">
                    <i className="fas fa-shield-alt"></i>
                    <span>Blockchain Research Project</span>
                </div>
                <h1 className="hero-title">
                    Blockchain-Based Land Deed<br />
                    <span className="highlight">Verification System</span>
                </h1>
                <p className="hero-subtitle">
                    A comprehensive full-stack implementation using Hyperledger Fabric and MERN stack
                    to revolutionize land registry operations in Sri Lanka
                </p>
                <div className="hero-stats">
                    <div className="stat-item">
                        <div className="stat-number" data-target="4">0</div>
                        <div className="stat-label">Organizations</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number" data-target="3">0</div>
                        <div className="stat-label">System Layers</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number" data-target="18">0</div>
                        <div className="stat-label">TPS Throughput</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number"><span data-target="99">0</span>%</div>
                        <div className="stat-label">Fraud Detection</div>
                    </div>
                </div>
                <div className="hero-buttons">
                    <a href="https://www.lkland.live" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        <i className="fas fa-external-link-alt"></i> Live Site
                    </a>
                    <a href="https://github.com/yourusername/blockchain-land-registry" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                        <i className="fab fa-github"></i> GitHub
                    </a>
                </div>
            </div>
            <div className="hero-visual">
                <div className="blockchain-animation">
                    <div className="block block-1">
                        <i className="fas fa-cube"></i>
                    </div>
                    <div className="block block-2">
                        <i className="fas fa-cube"></i>
                    </div>
                    <div className="block block-3">
                        <i className="fas fa-cube"></i>
                    </div>
                    <div className="block block-4">
                        <i className="fas fa-cube"></i>
                    </div>
                </div>
            </div>
        </div>
        <div className="scroll-indicator">
            <span>Scroll Down</span>
            <i className="fas fa-chevron-down"></i>
        </div>
    </section>

    {/* About Section */}
    <section id="about" className="about">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">The Problem & Solution</span>
                <h2 className="section-title">About This Research</h2>
                <p className="section-subtitle">
                    Addressing critical inefficiencies in Sri Lanka's land registration system
                </p>
            </div>

            <div className="about-grid">
                <div className="about-card problem-card">
                    <div className="card-icon problem">
                        <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3>Current Problems</h3>
                    <ul className="problem-list">
                        <li><i className="fas fa-times-circle"></i> 2-3 weeks verification delay</li>
                        <li><i className="fas fa-times-circle"></i> Fraud vulnerability (₹ millions lost)</li>
                        <li><i className="fas fa-times-circle"></i> No tamper-proof audit trail</li>
                        <li><i className="fas fa-times-circle"></i> Single point of failure</li>
                        <li><i className="fas fa-times-circle"></i> Manual paper-based processes</li>
                    </ul>
                </div>

                <div className="about-card solution-card">
                    <div className="card-icon solution">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <h3>Our Solution</h3>
                    <ul className="solution-list">
                        <li><i className="fas fa-check-circle"></i> Instant verification (&lt;1 second)</li>
                        <li><i className="fas fa-check-circle"></i> Cryptographic fraud detection</li>
                        <li><i className="fas fa-check-circle"></i> Immutable blockchain audit trail</li>
                        <li><i className="fas fa-check-circle"></i> Distributed across 4 organizations</li>
                        <li><i className="fas fa-check-circle"></i> Automated digital workflow</li>
                    </ul>
                </div>
            </div>

            <div className="objectives">
                <h3 className="objectives-title">Research Objectives</h3>
                <div className="objectives-grid">
                    <div className="objective-card">
                        <div className="objective-number">01</div>
                        <p>Design and implement a complete 3-layer blockchain system using Hyperledger Fabric,
                            Express.js backend, and React frontend</p>
                    </div>
                    <div className="objective-card">
                        <div className="objective-number">02</div>
                        <p>Deploy a 4-organization permissioned network (Land Registry, Private Bank, Public Bank,
                            Notary)</p>
                    </div>
                    <div className="objective-card">
                        <div className="objective-number">03</div>
                        <p>Develop formal framework reconciling blockchain immutability with PDPA Right to Erasure</p>
                    </div>
                    <div className="objective-card">
                        <div className="objective-number">04</div>
                        <p>Demonstrate prevention of major attack scenarios through comprehensive fraud detection
                            testing</p>
                    </div>
                </div>
            </div>

            <div className="research-contributions">
                <h3>Key Contributions</h3>
                <div className="contributions-grid">
                    <div className="contribution-item">
                        <i className="fas fa-code"></i>
                        <h4>Practical</h4>
                        <p>Production-ready full-stack implementation with complete GitHub repository</p>
                    </div>
                    <div className="contribution-item">
                        <i className="fas fa-graduation-cap"></i>
                        <h4>Theoretical</h4>
                        <p>Novel formal framework with three provable properties for PDPA compliance</p>
                    </div>
                    <div className="contribution-item">
                        <i className="fas fa-shield-alt"></i>
                        <h4>Security</h4>
                        <p>Validated fraud detection identifying unauthorized database modifications</p>
                    </div>
                    <div className="contribution-item">
                        <i className="fas fa-layer-group"></i>
                        <h4>Architectural</h4>
                        <p>Three-layer design pattern separating immutable and mutable data concerns</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Architecture Section */}
    <section id="architecture" className="architecture">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">System Design</span>
                <h2 className="section-title">Three-Layer Architecture</h2>
                <p className="section-subtitle">
                    Separation of concerns between immutability, storage, and user interaction
                </p>
            </div>

            <div className="architecture-diagram" style={{ textAlign: 'center', marginBottom: '60px' }}>
                <div 
                    className="expandable-image-wrapper" 
                    onClick={() => setExpandedImage('/Research-Project-Portfolio/img/arch-diagram.svg')}
                    style={{ 
                        maxWidth: '1000px', 
                        margin: '0 auto',
                        backgroundColor: 'var(--bg-primary)',
                        padding: '24px'
                    }}
                >
                    <img 
                        src="/Research-Project-Portfolio/img/arch-diagram.svg" 
                        alt="System Architecture Diagram" 
                    />
                    <div className="expandable-image-overlay">
                        <i className="fas fa-search-plus"></i>
                        <span>Click to expand</span>
                    </div>
                </div>
            </div>

            <div className="layers-grid">
                <div className="layer-card">
                    <div className="layer-header">
                        <div className="layer-icon">
                            <i className="fas fa-cubes"></i>
                        </div>
                        <div>
                            <h3>Layer 1: Blockchain</h3>
                            <span className="layer-status completed">✓ Completed</span>
                        </div>
                    </div>
                    <p className="layer-description">
                        Hyperledger Fabric 2.5.4 network storing cryptographic hashes (SHA-256)
                        and minimal metadata for immutable verification
                    </p>
                    <ul className="layer-features">
                        <li><i className="fas fa-check"></i> 4 organizations, 2 peers each</li>
                        <li><i className="fas fa-check"></i> Dedicated CA per organization</li>
                        <li><i className="fas fa-check"></i> RAFT-based orderer with TLS</li>
                        <li><i className="fas fa-check"></i> Go chaincode — RegisterDeed, VerifyDeed, MarkAsErased</li>
                    </ul>
                </div>

                <div className="layer-card">
                    <div className="layer-header">
                        <div className="layer-icon">
                            <i className="fas fa-server"></i>
                        </div>
                        <div>
                            <h3>Layer 2: Backend & Database</h3>
                            <span className="layer-status completed">✓ Completed</span>
                        </div>
                    </div>
                    <p className="layer-description">
                        Express.js API with Fabric Gateway SDK integration, MongoDB for mutable
                        metadata, and Cloudinary for encrypted document storage
                    </p>
                    <ul className="layer-features">
                        <li><i className="fas fa-check"></i> RESTful API + Fabric Gateway SDK</li>
                        <li><i className="fas fa-check"></i> JWT & Bcrypt authentication</li>
                        <li><i className="fas fa-check"></i> Cloudinary encrypted document storage</li>
                        <li><i className="fas fa-check"></i> Automatic retry & audit logging</li>
                    </ul>
                </div>

                <div className="layer-card">
                    <div className="layer-header">
                        <div className="layer-icon">
                            <i className="fas fa-desktop"></i>
                        </div>
                        <div>
                            <h3>Layer 3: Frontend</h3>
                            <span className="layer-status completed">✓ Completed</span>
                        </div>
                    </div>
                    <p className="layer-description">
                        React.js frontend with Tailwind CSS, role-based access control,
                        real-time blockchain status monitoring, and fraud detection UI
                    </p>
                    <ul className="layer-features">
                        <li><i className="fas fa-check"></i> React.js + Tailwind CSS</li>
                        <li><i className="fas fa-check"></i> Real-time blockchain status</li>
                        <li><i className="fas fa-check"></i> Public verification portal</li>
                        <li><i className="fas fa-check"></i> Role-based admin dashboard</li>
                    </ul>
                </div>
            </div>

            <div className="organizations">
                <h3>Four-Organization Network</h3>
                <div className="org-grid">
                    <div className="org-card">
                        <div className="org-icon">
                            <i className="fas fa-landmark"></i>
                        </div>
                        <h4>Land Registry</h4>
                        <p className="org-role">Full Access</p>
                        <ul>
                            <li>Register deeds</li>
                            <li>Mark as erased</li>
                            <li>Query & verify</li>
                        </ul>
                        <span className="org-port">Port: 7051</span>
                    </div>

                    <div className="org-card">
                        <div className="org-icon">
                            <i className="fas fa-university"></i>
                        </div>
                        <h4>Private Bank</h4>
                        <p className="org-role">Read & Verify</p>
                        <ul>
                            <li>Query deeds</li>
                            <li>Verify authenticity</li>
                            <li>Loan processing</li>
                        </ul>
                        <span className="org-port">Port: 8051</span>
                    </div>

                    <div className="org-card">
                        <div className="org-icon">
                            <i className="fas fa-building"></i>
                        </div>
                        <h4>Public Bank</h4>
                        <p className="org-role">Read & Verify</p>
                        <ul>
                            <li>Query deeds</li>
                            <li>Verify authenticity</li>
                            <li>Government loans</li>
                        </ul>
                        <span className="org-port">Port: 9051</span>
                    </div>

                    <div className="org-card">
                        <div className="org-icon">
                            <i className="fas fa-balance-scale"></i>
                        </div>
                        <h4>Notary</h4>
                        <p className="org-role">Read Only</p>
                        <ul>
                            <li>Query deeds</li>
                            <li>Verify for legal</li>
                            <li>No write access</li>
                        </ul>
                        <span className="org-port">Port: 10051</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Smart Contract & PDPA Section */}
    <section id="chaincode" className="technology">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">Chaincode & Privacy</span>
                <h2 className="section-title">Smart Contract & PDPA Compliance</h2>
                <p className="section-subtitle">
                    Go chaincode functions and compliance with Sri Lanka&rsquo;s Personal Data Protection Act (PDPA) No. 9 of 2022
                </p>
            </div>

            <div className="layers-grid">
                <div className="layer-card">
                    <div className="layer-header">
                        <div className="layer-icon">
                            <i className="fas fa-file-code"></i>
                        </div>
                        <div>
                            <h3>Chaincode Functions</h3>
                            <span className="layer-status completed">5 Functions</span>
                        </div>
                    </div>
                    <ul className="layer-features">
                        <li><i className="fas fa-check"></i> <strong>RegisterDeed</strong> &mdash; Hash & store deed on-chain</li>
                        <li><i className="fas fa-check"></i> <strong>QueryDeed</strong> &mdash; Retrieve deed by ID</li>
                        <li><i className="fas fa-check"></i> <strong>VerifyDeed</strong> &mdash; Hash comparison for fraud detection</li>
                        <li><i className="fas fa-check"></i> <strong>MarkAsErased</strong> &mdash; PDPA Right to Erasure</li>
                        <li><i className="fas fa-check"></i> <strong>QueryAllDeeds</strong> &mdash; Fetch all records</li>
                    </ul>
                </div>

                <div className="layer-card">
                    <div className="layer-header">
                        <div className="layer-icon">
                            <i className="fas fa-shield-alt"></i>
                        </div>
                        <div>
                            <h3>PDPA Compliance Framework</h3>
                            <span className="layer-status completed">✓ Implemented</span>
                        </div>
                    </div>
                    <p className="layer-description">
                        Reconciling blockchain immutability with the &ldquo;Right to be Forgotten&rdquo; under PDPA No. 9 of 2022
                    </p>
                    <ul className="layer-features">
                        <li><i className="fas fa-check"></i> No personal data stored on-chain</li>
                        <li><i className="fas fa-check"></i> Only SHA-256 hashes & non-sensitive metadata on ledger</li>
                        <li><i className="fas fa-check"></i> MarkAsErased for Right to Erasure</li>
                        <li><i className="fas fa-check"></i> Off-chain personal data in deletable MongoDB</li>
                    </ul>
                </div>

                <div className="layer-card">
                    <div className="layer-header">
                        <div className="layer-icon">
                            <i className="fas fa-rocket"></i>
                        </div>
                        <div>
                            <h3>Future Roadmap</h3>
                            <span className="layer-status" style={{background: '#fdf5e0', color: '#B8860B'}}>Planned</span>
                        </div>
                    </div>
                    <ul className="layer-features">
                        <li><i className="fas fa-check"></i> Automated crypto-shredding for full PDPA compliance</li>
                        <li><i className="fas fa-check"></i> React Native mobile app for field registrars</li>
                        <li><i className="fas fa-check"></i> Formal security audits & penetration testing</li>
                        <li><i className="fas fa-check"></i> Integration with Sri Lanka government APIs</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    {/* Technology Section */}
    <section id="technology" className="technology">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">Tech Stack</span>
                <h2 className="section-title">Technology & Implementation</h2>
                <p className="section-subtitle">
                    Modern technologies powering the blockchain land registry system
                </p>
            </div>

            <div className="tech-stack">
                <div className="tech-category">
                    <h3><i className="fas fa-cube"></i> Blockchain</h3>
                    <div className="tech-items">
                        <div className="tech-item">
                            <div className="tech-icon"><i className="fas fa-cubes"></i></div>
                            <span>Hyperledger Fabric 2.5.4</span>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon"><i className="fab fa-golang"></i></div>
                            <span>Go 1.20</span>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon"><i className="fab fa-docker"></i></div>
                            <span>Docker 28.3.2</span>
                        </div>
                    </div>
                </div>

                <div className="tech-category">
                    <h3><i className="fas fa-server"></i> Backend</h3>
                    <div className="tech-items">
                        <div className="tech-item">
                            <div className="tech-icon"><i className="fab fa-node-js"></i></div>
                            <span>Node.js v18+</span>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon"><i className="fas fa-code"></i></div>
                            <span>Express.js 5</span>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon"><i className="fas fa-database"></i></div>
                            <span>MongoDB Atlas</span>
                        </div>
                    </div>
                </div>

                <div className="tech-category">
                    <h3><i className="fas fa-desktop"></i> Frontend</h3>
                    <div className="tech-items">
                        <div className="tech-item">
                            <div className="tech-icon"><i className="fab fa-react"></i></div>
                            <span>React 18</span>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon"><i className="fas fa-code"></i></div>
                            <span>TypeScript 5</span>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon"><i className="fas fa-wind"></i></div>
                            <span>Tailwind CSS</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="smart-contract">
                <h3>Smart Contract Functions</h3>
                <div className="functions-grid">
                    <div className="function-card">
                        <div className="function-header">
                            <code>RegisterDeed()</code>
                            <span className="function-type">Write</span>
                        </div>
                        <p>Creates new deed record with SHA-256 hash on blockchain ledger</p>
                    </div>

                    <div className="function-card">
                        <div className="function-header">
                            <code>QueryDeed()</code>
                            <span className="function-type read">Read</span>
                        </div>
                        <p>Retrieves complete deed record including hash and metadata</p>
                    </div>

                    <div className="function-card">
                        <div className="function-header">
                            <code>VerifyDeed()</code>
                            <span className="function-type read">Read</span>
                        </div>
                        <p>Compares provided hash against blockchain for authenticity check</p>
                    </div>

                    <div className="function-card">
                        <div className="function-header">
                            <code>MarkAsErased()</code>
                            <span className="function-type">Write</span>
                        </div>
                        <p>PDPA compliance: marks deed as erased while preserving hash</p>
                    </div>

                    <div className="function-card">
                        <div className="function-header">
                            <code>QueryAllDeeds()</code>
                            <span className="function-type read">Read</span>
                        </div>
                        <p>Returns complete list of all registered deeds for audit trail</p>
                    </div>
                </div>
            </div>

            <div className="security-features">
                <h3>Security Features</h3>
                <div className="security-grid">
                    <div className="security-item">
                        <i className="fas fa-fingerprint"></i>
                        <h4>SHA-256 Hashing</h4>
                        <p>Cryptographic fingerprint for each document ensuring uniqueness</p>
                    </div>
                    <div className="security-item">
                        <i className="fas fa-lock"></i>
                        <h4>TLS Encryption</h4>
                        <p>All network communication secured with X.509 certificates</p>
                    </div>
                    <div className="security-item">
                        <i className="fas fa-users-cog"></i>
                        <h4>Role-Based Access</h4>
                        <p>Granular permissions based on organization and user role</p>
                    </div>
                    <div className="security-item">
                        <i className="fas fa-database"></i>
                        <h4>Immutable Ledger</h4>
                        <p>Append-only blockchain preventing record modification</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Demo Section */}
    <section id="demo" className="demo">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">Live Demonstration</span>
                <h2 className="section-title">System Demo & Screenshots</h2>
                <p className="section-subtitle">
                    See the blockchain land registry system in action
                </p>
            </div>

            <div className="video-demo">
                <h3>Video Demonstration</h3>
                <div className="video-container">
                    <iframe width="100%" height="500"
                        src="https://www.youtube-nocookie.com/embed/WrMf8WMJvEw?autoplay=1&mute=1&rel=0"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                </div>
            </div>

            {/* ADD YOUR SCREENSHOTS HERE */}
            <div className="screenshots">
                <h3>System Screenshots</h3>
                <div className="screenshots-grid">
                    <div className="screenshot-item">
                        <div 
                            className="expandable-image-wrapper" 
                            onClick={() => setExpandedImage('/Research-Project-Portfolio/img/dashboard.png')}
                            style={{ marginBottom: '16px' }}
                        >
                            <img 
                                src="/Research-Project-Portfolio/img/dashboard.png" 
                                alt="Dashboard" 
                                onError={(e) => { e.currentTarget.src = "/Research-Project-Portfolio/img/reg-deed.png"; }}
                            />
                            <div className="expandable-image-overlay">
                                <i className="fas fa-search-plus"></i>
                                <span>Click to expand</span>
                            </div>
                        </div>
                        <p>Real-time blockchain status monitoring</p>
                    </div>
                    <div className="screenshot-item">
                        <div 
                            className="expandable-image-wrapper" 
                            onClick={() => setExpandedImage('/Research-Project-Portfolio/img/reg-deed.png')}
                            style={{ marginBottom: '16px' }}
                        >
                            <img 
                                src="/Research-Project-Portfolio/img/reg-deed.png" 
                                alt="Register Deed" 
                            />
                            <div className="expandable-image-overlay">
                                <i className="fas fa-search-plus"></i>
                                <span>Click to expand</span>
                            </div>
                        </div>
                        <p>Deed registration with blockchain confirmation</p>
                    </div>
                    <div className="screenshot-item">
                        <div 
                            className="expandable-image-wrapper" 
                            onClick={() => setExpandedImage('/Research-Project-Portfolio/img/verify.png')}
                            style={{ marginBottom: '16px' }}
                        >
                            <img 
                                src="/Research-Project-Portfolio/img/verify.png" 
                                alt="Verify Deed" 
                                onError={(e) => { e.currentTarget.src = "/Research-Project-Portfolio/img/reg-deed.png"; }}
                            />
                            <div className="expandable-image-overlay">
                                <i className="fas fa-search-plus"></i>
                                <span>Click to expand</span>
                            </div>
                        </div>
                        <p>Public verification portal (no login required)</p>
                    </div>
                    <div className="screenshot-item">
                        <div 
                            className="expandable-image-wrapper" 
                            onClick={() => setExpandedImage('/Research-Project-Portfolio/img/fraud.png')}
                            style={{ marginBottom: '16px' }}
                        >
                            <img 
                                src="/Research-Project-Portfolio/img/fraud.png" 
                                alt="Fraud Detection" 
                                onError={(e) => { e.currentTarget.src = "/Research-Project-Portfolio/img/reg-deed.png"; }}
                            />
                            <div className="expandable-image-overlay">
                                <i className="fas fa-search-plus"></i>
                                <span>Click to expand</span>
                            </div>
                        </div>
                        <p>Tampering detection with hash comparison</p>
                    </div>
                    <div className="screenshot-item">
                        <div 
                            className="expandable-image-wrapper" 
                            onClick={() => setExpandedImage('/Research-Project-Portfolio/img/transfer.png')}
                            style={{ marginBottom: '16px' }}
                        >
                            <img 
                                src="/Research-Project-Portfolio/img/transfer.png" 
                                alt="Transfer Ownership" 
                                onError={(e) => { e.currentTarget.src = "/Research-Project-Portfolio/img/reg-deed.png"; }}
                            />
                            <div className="expandable-image-overlay">
                                <i className="fas fa-search-plus"></i>
                                <span>Click to expand</span>
                            </div>
                        </div>
                        <p>Ownership transfer with audit trail</p>
                    </div>
                    <div className="screenshot-item">
                        <div 
                            className="expandable-image-wrapper" 
                            onClick={() => setExpandedImage('/Research-Project-Portfolio/img/audit-logs.png')}
                            style={{ marginBottom: '16px' }}
                        >
                            <img 
                                src="/Research-Project-Portfolio/img/audit-logs.png" 
                                alt="Audit Logs" 
                                onError={(e) => { e.currentTarget.src = "/Research-Project-Portfolio/img/audit-logs"; }}
                            />
                            <div className="expandable-image-overlay">
                                <i className="fas fa-search-plus"></i>
                                <span>Click to expand</span>
                            </div>
                        </div>
                        <p>Complete system activity history</p>
                    </div>
                </div>
            </div>

            <div className="features-demo">
                <h3>Key Features Demonstrated</h3>
                <div className="demo-features">
                    <div className="demo-feature">
                        <div className="demo-icon">
                            <i className="fas fa-tachometer-alt"></i>
                        </div>
                        <h4>Instant Verification</h4>
                        <p>2-3 weeks → &lt;1.5 seconds verification time</p>
                    </div>
                    <div className="demo-feature">
                        <div className="demo-icon">
                            <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <h4>Fraud Detection</h4>
                        <p>Automatic tampering detection through hash comparison</p>
                    </div>
                    <div className="demo-feature">
                        <div className="demo-icon">
                            <i className="fas fa-sync-alt"></i>
                        </div>
                        <h4>Graceful Degradation</h4>
                        <p>System works offline with automatic blockchain sync</p>
                    </div>
                    <div className="demo-feature">
                        <div className="demo-icon">
                            <i className="fas fa-file-alt"></i>
                        </div>
                        <h4>PDPA Compliance</h4>
                        <p>Right to Erasure while maintaining audit trail</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Testing Section */}
    <section id="testing" className="testing">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">Validation & Results</span>
                <h2 className="section-title">Testing & Performance</h2>
                <p className="section-subtitle">
                    Comprehensive testing validates security, performance, and functionality
                </p>
            </div>

            <div className="test-results">
                <h3>Test Scenarios</h3>
                <div className="tests-grid">
                    <div className="test-card passed">
                        <div className="test-header">
                            <span className="test-number">Test 1</span>
                            <span className="test-status"><i className="fas fa-check-circle"></i> PASSED</span>
                        </div>
                        <h4>Deed Registration</h4>
                        <p>End-to-end registration with blockchain confirmation in 3.2 seconds</p>
                    </div>

                    <div className="test-card passed">
                        <div className="test-header">
                            <span className="test-number">Test 2</span>
                            <span className="test-status"><i className="fas fa-check-circle"></i> PASSED</span>
                        </div>
                        <h4>Public Verification</h4>
                        <p>Instant deed verification without authentication in 0.8 seconds</p>
                    </div>

                    <div className="test-card passed">
                        <div className="test-header">
                            <span className="test-number">Test 3</span>
                            <span className="test-status"><i className="fas fa-check-circle"></i> PASSED</span>
                        </div>
                        <h4>Ownership Transfer</h4>
                        <p>Transfer creates new blockchain record while maintaining history</p>
                    </div>

                    <div className="test-card passed highlight">
                        <div className="test-header">
                            <span className="test-number">Test 4</span>
                            <span className="test-status"><i className="fas fa-check-circle"></i> PASSED</span>
                        </div>
                        <h4>Fraud Detection</h4>
                        <p><strong>CRITICAL:</strong> System detected unauthorized database tampering through hash
                            mismatch</p>
                    </div>

                    <div className="test-card passed">
                        <div className="test-header">
                            <span className="test-number">Test 5</span>
                            <span className="test-status"><i className="fas fa-check-circle"></i> PASSED</span>
                        </div>
                        <h4>Graceful Degradation</h4>
                        <p>Automatic retry service successfully recovered from blockchain downtime</p>
                    </div>

                    <div className="test-card passed">
                        <div className="test-header">
                            <span className="test-number">Test 6</span>
                            <span className="test-status"><i className="fas fa-check-circle"></i> PASSED</span>
                        </div>
                        <h4>Concurrent Access</h4>
                        <p>3 simultaneous registrations processed successfully without conflicts</p>
                    </div>
                </div>
            </div>

            <div className="performance-metrics">
                <h3>Performance Metrics</h3>
                <div className="metrics-grid">
                    <div className="metric-card">
                        <div className="metric-value">2.5-3.5s</div>
                        <div className="metric-label">Registration Time</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">0.6-1.2s</div>
                        <div className="metric-label">Verification Time</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">12-18</div>
                        <div className="metric-label">TPS Throughput</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">3,000×</div>
                        <div className="metric-label">Capacity Headroom</div>
                    </div>
                </div>
            </div>

            <div className="security-analysis">
                <h3>Security Analysis</h3>
                <table className="security-table">
                    <thead>
                        <tr>
                            <th>Attack Scenario</th>
                            <th>Traditional System</th>
                            <th>Our Blockchain</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Admin Tampering</td>
                            <td>Succeeds silently</td>
                            <td>Hash mismatch detected instantly</td>
                            <td><span className="status-badge prevented">✓ PREVENTED</span></td>
                        </tr>
                        <tr>
                            <td>Backdating Records</td>
                            <td>Easy to modify timestamp</td>
                            <td>Blockchain consensus timestamp</td>
                            <td><span className="status-badge prevented">✓ PREVENTED</span></td>
                        </tr>
                        <tr>
                            <td>Evidence Deletion</td>
                            <td>DELETE command removes all</td>
                            <td>Append-only immutable ledger</td>
                            <td><span className="status-badge prevented">✓ PREVENTED</span></td>
                        </tr>
                        <tr>
                            <td>Multi-Party Collusion</td>
                            <td>Two admins can cover tracks</td>
                            <td>Requires 4-org consensus</td>
                            <td><span className="status-badge prevented">✓ PREVENTED</span></td>
                        </tr>
                        <tr>
                            <td>Entry-Point Fraud</td>
                            <td>Also fails here</td>
                            <td>Cannot prevent initial fraud</td>
                            <td><span className="status-badge limitation">✗ LIMITATION</span></td>
                        </tr>
                    </tbody>
                </table>
                <p className="limitation-note">
                    <i className="fas fa-info-circle"></i>
                    <strong>Honest Limitation:</strong> The system cannot prevent fraudulent data entry at registration.
                    This is a fundamental limitation of all blockchain systems—blockchain secures post-registration
                    integrity, not pre-registration validation.
                </p>
            </div>

            <div className="comparison">
                <h3>Comparison: Blockchain vs Traditional System</h3>
                <div className="comparison-grid">
                    <div className="comparison-item">
                        <h4>Verification Speed</h4>
                        <div className="comparison-bars">
                            <div className="comparison-bar">
                                <div className="bar-label">Traditional</div>
                                <div className="bar-fill traditional" style={{width: '100%'}}>2-3 weeks</div>
                            </div>
                            <div className="comparison-bar">
                                <div className="bar-label">Blockchain</div>
                                <div className="bar-fill blockchain" style={{width: '5%'}}>&lt;1 sec</div>
                            </div>
                        </div>
                        <p className="improvement">1,800,000× faster</p>
                    </div>
                    <div className="comparison-item">
                        <h4>Tampering Detection</h4>
                        <div className="comparison-bars">
                            <div className="comparison-bar">
                                <div className="bar-label">Traditional</div>
                                <div className="bar-fill traditional" style={{width: '100%'}}>Often never</div>
                            </div>
                            <div className="comparison-bar">
                                <div className="bar-label">Blockchain</div>
                                <div className="bar-fill blockchain" style={{width: '5%'}}>Instant</div>
                            </div>
                        </div>
                        <p className="improvement">Mathematical proof vs trust</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Team Section */}
    <section id="team" className="team">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">Research Team</span>
                <h2 className="section-title">Meet the Team</h2>
                <p className="section-subtitle">
                    Dedicated researchers and supervisors driving the project forward
                </p>
            </div>

            <div className="team-section-wrapper">
                <div className="team-bg-stripe"></div>
                <div className="team-grid">
                    <div className="team-member">
                        <div className="member-photo">
                            <img src="/Research-Project-Portfolio/img/chamila.png" alt="Chamila Karunatilake" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0'}}/>
                        </div>
                        <h3 className="member-name">Mr. Chamila Karunatilake</h3>
                        <p className="member-role">Research Supervisor</p>
                        <div className="member-divider"></div>
                        <div className="member-meta">
                            <p>Senior Lecturer</p>
                            <p>Dept. of ICT, Faculty of Technology, USJ</p>
                        </div>
                        <div className="member-links">
                            <a href="https://www.linkedin.com/in/chamila-karunatilake-36b9b327/" target="_blank" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="mailto:chamilakarunatilake@sjp.ac.lk" title="Email"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <div className="member-photo">
                            <img src="/Research-Project-Portfolio/img/senaka.png" alt="Senaka Amarakeerthi" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0'}}/>
                        </div>
                        <h3 className="member-name">Dr. Senaka Amarakeerthi</h3>
                        <p className="member-role">Research Supervisor</p>
                        <div className="member-divider"></div>
                        <div className="member-meta">
                            <p>Senior Lecturer</p>
                            <p>Otago Polytechnic Auckland International Campus</p>
                        </div>
                        <div className="member-links">
                            <a href="https://www.linkedin.com/in/senaka-amarakeerthi-96648719/" target="_blank" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="mailto:supervisor2@sjp.ac.lk" title="Email"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <div className="member-photo">
                            <img src="/Research-Project-Portfolio/img/malshan.png" alt="Dinusha Malshan" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0'}}/>
                        </div>
                        <h3 className="member-name">Mr. Dinusha Malshan</h3>
                        <p className="member-role">Research Leader</p>
                        <div className="member-divider"></div>
                        <div className="member-meta">
                            <p>Lecturer</p>
                            <p>Dept. of ICT, Faculty of Technology, USJ</p>
                        </div>
                        <div className="member-links">
                            <a href="https://www.linkedin.com/in/dinusha-malshan-13633219a/" target="_blank" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="mailto:supervisor3@sjp.ac.lk" title="Email"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="team-section-wrapper">
                <div className="team-bg-stripe"></div>
                <div className="team-grid">
                    <div className="team-member">
                        <div className="member-photo">
                            <img src="/Research-Project-Portfolio/img/dulara.png" alt="M.A.D. Silva" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0'}}/>
                        </div>
                        <h3 className="member-name">M.A.D. Silva</h3>
                        <p className="member-role">Researcher</p>
                        <div className="member-divider"></div>
                        <div className="member-meta">
                            <p>BICT (Hons) — ICT/21/924</p>
                            <p>University of Sri Jayewardenepura</p>
                        </div>
                        <div className="member-links">
                            <a href="https://www.linkedin.com/in/dularaabhiranda21/" target="_blank" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://github.com/DularaAbhiranda" target="_blank" title="GitHub"><i className="fab fa-github"></i></a>
                            <a href="mailto:ict21924@fot.sjp.ac.lk" title="Email"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <div className="member-photo">
                            <img src="/Research-Project-Portfolio/img/nadun.png" alt="H.N.S. Daluwatta" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0'}}/>
                        </div>
                        <h3 className="member-name">H.N.S. Daluwatta</h3>
                        <p className="member-role">Researcher</p>
                        <div className="member-divider"></div>
                        <div className="member-meta">
                            <p>BICT (Hons) — ICT/21/820</p>
                            <p>University of Sri Jayewardenepura</p>
                        </div>
                        <div className="member-links">
                            <a href="https://www.linkedin.com/in/nadundaluwatta/" target="_blank" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://github.com/NadunDalu" target="_blank" title="GitHub"><i className="fab fa-github"></i></a>
                            <a href="mailto:ict21820@fot.sjp.ac.lk" title="Email"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>

                    <div className="team-member">
                        <div className="member-photo">
                            <img src="/Research-Project-Portfolio/img/dilshi.png" alt="W.M.D. Piyumika" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0'}}/>
                        </div>
                        <h3 className="member-name">W.M.D. Piyumika</h3>
                        <p className="member-role">Researcher</p>
                        <div className="member-divider"></div>
                        <div className="member-meta">
                            <p>BICT (Hons) — ICT/21/898</p>
                            <p>University of Sri Jayewardenepura</p>
                        </div>
                        <div className="member-links">
                            <a href="https://www.linkedin.com/in/dilshi-piyumika-a56042268/" target="_blank" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://github.com/dilshi126" target="_blank" title="GitHub"><i className="fab fa-github"></i></a>
                            <a href="mailto:ict21820@fot.sjp.ac.lk" title="Email"><i className="fas fa-envelope"></i></a>
                        </div>
                    </div>
                </div>
            </div>


            {/* ADD UNIVERSITY LOGO HERE */}
            <div className="university-info">
                <div className="university-logo">
                    <img src="/Research-Project-Portfolio/img/usjp-logo.png" alt="University of Sri Jayewardenepura Logo" />
                </div>
                <div className="university-details">
                    <h3>University of Sri Jayewardenepura</h3>
                    <p><i className="fas fa-graduation-cap" style={{color:'var(--primary)', width:'20px'}}></i> Faculty of Technology</p>
                    <p><i className="fas fa-laptop-code" style={{color:'var(--primary)', width:'20px'}}></i> Department of Information and Communication Technology</p>
                    <p><i className="fas fa-certificate" style={{color:'var(--primary)', width:'20px'}}></i> Bachelor of Information and Communication Technology (Hons) in Networking</p>
                </div>
            </div>
        </div>
    </section>

    {/* Contact Section */}
    <section id="contact" className="contact">
        <div className="container">
            <div className="section-header">
                <span className="section-badge">Get In Touch</span>
                <h2 className="section-title">Contact Us</h2>
                <p className="section-subtitle">
                    Have questions about the research? Want to collaborate? Reach out!
                </p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="contact-item">
                        <div className="contact-icon">
                            <i className="fas fa-envelope"></i>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>b6g15nk@gmail.com</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <i className="fas fa-university"></i>
                        </div>
                        <div>
                            <h4>University</h4>
                            <p>University of Sri Jayewardenepura</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <i className="fab fa-github"></i>
                        </div>
                        <div>
                            <h4>GitHub Repository</h4>
                            <p><a href="https://github.com/Research-Project-G15" target="_blank">View
                                    Source Code</a></p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-icon">
                            <i className="fas fa-file-pdf"></i>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
                            <h4 style={{marginBottom: '10px'}}>Download Thesis</h4>
                            <a 
                                href="https://drive.google.com/file/d/1eodTn_MvW_9m1CW_Jt_iNslowL80XUIF/view?usp=sharing" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn btn-primary" 
                                style={{padding: '8px 16px', fontSize: '14px'}}
                            >
                                <i className="fas fa-download"></i> Thesis Draft 2 (PDF)
                            </a>
                        </div>
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleContactSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" id="subject" name="subject" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows={5} required></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        <i className="fas fa-paper-plane"></i> Send Message
                    </button>

                    <div id="formMessage" className="form-message" ref={formMessageRef}></div>
                </form>
            </div>
        </div>
    </section>

    {/* Footer */}
    <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3><i className="fas fa-cube"></i> Blockchain Land Registry</h3>
                    <p>A comprehensive research project addressing land deed verification challenges in Sri Lanka
                        through blockchain technology.</p>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#architecture">Architecture</a></li>
                        <li><a href="#demo">Demo</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="https://github.com/Research-Project-G1" target="_blank">GitHub
                                Repository</a></li>
                        <li><a href="https://drive.google.com/file/d/1eodTn_MvW_9m1CW_Jt_iNslowL80XUIF/view?usp=sharing" download>Download Thesis</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Connect</h4>
                    <div className="social-links">
                        <a href="https://github.com/Research-Project-G1" target="_blank" title="GitHub"><i className="fab fa-github"></i></a>
                        <a href="mailto:b6g15nk@gmail.com" title="Email"><i className="fas fa-envelope"></i></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 Blockchain Land Registry Research Project. University of Sri Jayewardenepura.</p>
            </div>
        </div>
    </footer>

    {/* Scroll to Top Button */}
    <button onClick={scrollToTop} className={`scroll-top ${showScroll ? "visible" : ""}`} aria-label="Scroll to top"><i className="fas fa-arrow-up"></i></button>

    {/* Lightbox Modal */}
    <div className={`lightbox-modal ${expandedImage ? 'active' : ''}`} onClick={() => setExpandedImage(null)}>
        <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setExpandedImage(null)}>
                <i className="fas fa-times"></i>
            </button>
            {expandedImage && (
                <img src={expandedImage} alt="Expanded view" className="lightbox-img" />
            )}
        </div>
    </div>

    </div>
  );
};
export default Home;
