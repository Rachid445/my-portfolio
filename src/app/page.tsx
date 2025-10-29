"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Code, Database, Cpu, Webhook } from 'lucide-react';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Data Analyst Student";
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (isLoading) return; // Ma tbdach typing 7ta loading ykmmel
    
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText, isLoading]);

  // Particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isLoading) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 80;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(0, 200, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 200, 255, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationId: number;
    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isLoading]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Message sent successfully! 🎉');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus(''), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const projects = [
    {
      id: "01",
      title: "Smart IoT Dashboard",
      description: "IoT system that displays live sensor data from ESP32 using MQTT and a React dashboard.",
      tech: ["React", "MQTT", "ESP32", "Node.js"],
      year: "2025"
    },
    {
      id: "02",
      title: "Data Visualization App",
      description: "Interactive web app for visualizing CSV data using charts and filters.",
      tech: ["Python", "Flask", "Chart.js", "Pandas"],
      year: "2024"
    },
    {
      id: "03",
      title: "Portfolio Website",
      description: "Personal portfolio website built with Next.js and TailwindCSS.",
      tech: ["Next.js", "TailwindCSS", "Framer Motion"],
      year: "2025"
    }
  ];

  const skills = [
    { category: "Languages", items: ["C", "Python", "JavaScript", "TypeScript"], icon: Code },
    { category: "Web", items: ["React", "Next.js", "TailwindCSS", "Node.js"], icon: Webhook },
    { category: "IoT / Tools", items: ["Arduino", "ESP32", "Raspberry PI", "MQTT", "Git", "Linux"], icon: Cpu },
    { category: "Data", items: ["SQL", "Matplotlib", "Tableau/Power BI", "Pandas", "NumPy"], icon: Database }
  ];

  const certificates = [
    { title: "Data Analysis Certificate", org: "Coming Soon", year: "2025" },
    { title: "Web Development", org: "Coming Soon", year: "2025" },
    { title: "IoT & Embedded Systems", org: "Coming Soon", year: "2025" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-mono animate-pulse">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Canvas for particles */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 z-10 pointer-events-none"
      />

      {/* Cursor follower effect */}
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-10 opacity-20 blur-3xl transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(0,200,255,0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full backdrop-blur-sm bg-black/50 border-b border-gray-800/50 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 md:py-6 flex justify-between items-center">
            <div className="font-mono text-xs sm:text-sm">
              <span className="text-cyan-400">~/</span>
              <span className="text-white">portfolio</span>
            </div>
            
            <div className="flex gap-4 sm:gap-6 md:gap-8 font-mono text-xs sm:text-sm">
              <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors">about</a>
              <a href="#work" className="text-gray-400 hover:text-cyan-400 transition-colors">work</a>
              <a href="#skills" className="text-gray-400 hover:text-cyan-400 transition-colors">skills</a>
              <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors">contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-4 sm:px-6 md:px-12 pt-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="space-y-6 md:space-y-8">
              <div className="font-mono text-cyan-400 text-xs sm:text-sm mb-4 animate-pulse">
                {">"} Hello, World!
              </div>

              {/* Profile Section */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
                <img 
                  src="/profile.png" 
                  alt="Profile photo"
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-4 border-cyan-400 shadow-2xl shadow-cyan-400/30 object-cover hover:scale-105 transition-transform flex-shrink-0"
                />

                <div className="text-center md:text-left">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4">
                    <span className="inline-block animate-[fadeInUp_0.6s_ease-out]">{displayText}</span>
                    <span className="inline-block w-1 h-12 sm:h-16 md:h-20 lg:h-28 bg-cyan-400 ml-2 animate-pulse"></span>
                  </h1>
                  
                  <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-2xl font-light opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
                    Data Analyst Student | Developer (React/Next.js) applying skills in Web Visualization and Embedded Systems (IoT) for data-driven projects.
                  </p>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-4 md:gap-6 pt-6 md:pt-8 opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards]">
                <a 
                  href="#work" 
                  className="group flex items-center gap-2 text-cyan-400 border border-cyan-400/50 px-4 py-2 md:px-6 md:py-3 hover:bg-cyan-400/10 transition-all text-sm md:text-base"
                >
                  <span className="font-mono">View Work</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/cv.pdf" 
                  download
                  className="group flex items-center gap-2 text-white border border-white/50 px-4 py-2 md:px-6 md:py-3 hover:bg-white/10 transition-all text-sm md:text-base"
                >
                  <span className="font-mono">Download CV</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="flex justify-center md:justify-start gap-4 md:gap-6 pt-4 opacity-0 animate-[fadeIn_1s_ease-out_1.4s_forwards]">
                <a href="https://github.com/Rachid445" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-cyan-400 transition-all hover:scale-110">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/rachid-boujarfaoui-647974321/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-cyan-400 transition-all hover:scale-110">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:boujerfaoui01@gmail.com" className="text-gray-600 hover:text-cyan-400 transition-all hover:scale-110">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-black to-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">About Me</h2>
              <div className="w-20 md:w-24 h-1 bg-cyan-400"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div className="space-y-6">
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  I&apos;m a second-year Data Analytics student at <span className="text-cyan-400 font-semibold">Faculty of Applied Sciences - Ait Melloul, Agadir</span>. 
                  My passion lies in transforming data into actionable insights and building innovative solutions.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  I specialize in combining data analysis with web development and IoT systems to create comprehensive, 
                  data-driven applications that solve real-world problems.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  Currently, I serve as a <span className="text-cyan-400 font-semibold">Coordinator at Smart Tech Robotics & AI Club</span>, 
                  where I help organize workshops and events that inspire students to explore emerging technologies.
                </p>
              </div>

              <div className="space-y-8">
                <div className="border-l-2 border-cyan-400 pl-6">
                  <h3 className="text-xl md:text-2xl font-mono text-cyan-400 mb-2">Education</h3>
                  <p className="text-lg font-semibold text-white">Bachelor in Data Analytics</p>
                  <p className="text-gray-400">Faculty of Applied Sciences</p>
                  <p className="text-gray-500 text-sm">Ait Melloul, Agadir • 2024gi - Present</p>
                  <p className="text-gray-300 mt-2">Currently in 2nd year</p>
                </div>

                <div className="border-l-2 border-cyan-400 pl-6">
                  <h3 className="text-xl md:text-2xl font-mono text-cyan-400 mb-2">Activities</h3>
                  <p className="text-lg font-semibold text-white">Coordinator</p>
                  <p className="text-gray-400">Smart Tech Robotics & AI Club</p>
                  <p className="text-gray-300 mt-2">Leading initiatives in robotics, AI, and emerging technologies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="work" className="min-h-screen py-20 md:py-32 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Selected Work</h2>
              <div className="w-20 md:w-24 h-1 bg-cyan-400 animate-[expandWidth_1s_ease-out]"></div>
            </div>

            <div className="space-y-1">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="group border-t border-gray-800/50 py-6 md:py-8 hover:bg-white/[0.02] transition-all cursor-pointer opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                    <div className="flex items-start gap-4 md:gap-6 flex-1">
                      <span className="font-mono text-gray-600 text-xs sm:text-sm flex-shrink-0">{project.id}</span>
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-mono mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400 mb-3 md:mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {project.tech.map((tech, i) => (
                            <span key={i} className="font-mono text-xs text-gray-500 border border-gray-800 px-2 py-1 md:px-3 hover:border-cyan-400/50 transition-colors">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 md:flex-col md:items-end">
                      <span className="font-mono text-xs sm:text-sm text-gray-600">{project.year}</span>
                      <ArrowRight 
                        size={20} 
                        className="text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-2 transition-all" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 md:py-32 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Skills</h2>
              <div className="w-20 md:w-24 h-1 bg-cyan-400"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {skills.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <div key={idx} className="group">
                    <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <Icon size={24} className="text-cyan-400 animate-pulse flex-shrink-0" />
                      <h3 className="text-lg md:text-xl font-mono text-white">{skill.category}</h3>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      {skill.items.map((item, i) => (
                        <div 
                          key={i} 
                          className="text-sm md:text-base text-gray-400 hover:text-white hover:translate-x-2 transition-all cursor-pointer font-mono"
                        >
                          <span className="text-cyan-400 mr-2">▸</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Certificates</h2>
              <div className="w-20 md:w-24 h-1 bg-cyan-400"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {certificates.map((cert, idx) => (
                <div 
                  key={idx}
                  className="group p-6 border border-gray-800 hover:border-cyan-400/50 transition-all bg-gray-900/30 hover:bg-gray-900/50"
                >
                  <h3 className="text-lg md:text-xl font-mono text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-gray-400 mb-1">{cert.org}</p>
                  <p className="text-sm text-gray-500">{cert.year}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-20 md:py-32 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Latest Article</h2>
              <div className="w-20 md:w-24 h-1 bg-cyan-400"></div>
            </div>

            <div className="max-w-4xl">
              <article className="border border-gray-800 p-8 md:p-12 hover:border-cyan-400/50 transition-all bg-gradient-to-br from-gray-900/50 to-black">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 hover:text-cyan-400 transition-colors cursor-pointer">
                  The Future of AI: Transforming Data Analysis
                </h3>
                <p className="text-sm text-gray-500 mb-6 font-mono">March 2025 • 5 min read</p>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p className="text-base md:text-lg">
                    Artificial Intelligence is revolutionizing how we approach data analysis. From predictive modeling to 
                    natural language processing, AI tools are making it easier than ever to extract meaningful insights from 
                    complex datasets.
                  </p>
                  <p className="text-base md:text-lg">
                    As a data analytics student, I&apos;ve witnessed firsthand how machine learning algorithms can identify patterns 
                    that would take humans days or weeks to discover. Tools like TensorFlow, PyTorch, and scikit-learn are 
                    democratizing access to powerful AI capabilities.
                  </p>
                  <p className="text-base md:text-lg">
                    The integration of AI with IoT devices is particularly exciting. Imagine sensors collecting real-time data, 
                    with AI models processing it on the edge to make instant decisions. This is the future we&apos;re building in 
                    our Smart Tech Robotics & AI Club.
                  </p>
                  <p className="text-base md:text-lg">
                    Whether you&apos;re interested in computer vision, NLP, or predictive analytics, now is the perfect time to dive 
                    into AI. The tools are mature, the community is supportive, and the possibilities are endless.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="px-3 py-1 text-xs border border-cyan-400/50 text-cyan-400 font-mono">#AI</span>
                  <span className="px-3 py-1 text-xs border border-cyan-400/50 text-cyan-400 font-mono">#DataScience</span>
                  <span className="px-3 py-1 text-xs border border-cyan-400/50 text-cyan-400 font-mono">#MachineLearning</span>
                  <span className="px-3 py-1 text-xs border border-cyan-400/50 text-cyan-400 font-mono">#IoT</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center py-20 md:py-32 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-16 md:mb-24">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Get In Touch</h2>
              <div className="w-20 md:w-24 h-1 bg-cyan-400"></div>
            </div>

            <div className="max-w-3xl">
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 md:mb-12 font-light">
                I&apos;m currently open to new opportunities and collaborations. 
                Feel free to reach out if you&apos;d like to work together.
              </p>

              {/* Contact Form */}
              <form onSubmit={handleFormSubmit} className="mb-12 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition-colors font-mono"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition-colors font-mono"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-gray-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 text-white focus:border-cyan-400 focus:outline-none transition-colors font-mono resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group flex items-center gap-2 text-cyan-400 border border-cyan-400/50 px-8 py-3 hover:bg-cyan-400/10 transition-all font-mono"
                >
                  <span>Send Message</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {formStatus && (
                  <p className="text-green-400 font-mono text-sm animate-pulse">{formStatus}</p>
                )}
              </form>

              {/* Contact Links */}
              <div className="space-y-4 md:space-y-6">
                <a 
                  href="mailto:boujerfaoui01@gmail.com"
                  className="group flex items-center gap-3 md:gap-4 text-lg sm:text-xl md:text-2xl hover:text-cyan-400 transition-all break-all"
                >
                  <Mail size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform md:w-6 md:h-6" />
                  <span className="font-mono text-sm sm:text-base md:text-xl lg:text-2xl">boujerfaoui01@gmail.com</span>
                  <ArrowRight size={16} className="hidden sm:block flex-shrink-0 group-hover:translate-x-2 transition-transform md:w-5 md:h-5" />
                </a>
                
                <a 
                  href="https://github.com/Rachid445"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 md:gap-4 text-lg sm:text-xl md:text-2xl hover:text-cyan-400 transition-all"
                >
                  <Github size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform md:w-6 md:h-6" />
                  <span className="font-mono text-sm sm:text-base md:text-xl lg:text-2xl">github.com/Rachid445</span>
                  <ArrowRight size={16} className="hidden sm:block flex-shrink-0 group-hover:translate-x-2 transition-transform md:w-5 md:h-5" />
                </a>

                <a 
                  href="https://www.linkedin.com/in/rachid-boujarfaoui-647974321/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 md:gap-4 text-lg sm:text-xl md:text-2xl hover:text-cyan-400 transition-all break-all"
                >
                  <Linkedin size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform md:w-6 md:h-6" />
                  <span className="font-mono text-sm sm:text-base md:text-xl lg:text-2xl">linkedin.com/in/rachid-boujarfaoui</span>
                  <ArrowRight size={16} className="hidden sm:block flex-shrink-0 group-hover:translate-x-2 transition-transform md:w-5 md:h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800/50 py-6 md:py-8 px-4 sm:px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
            <p className="font-mono text-xs sm:text-sm text-gray-600 text-center md:text-left">© 2025 — Built with Next.js & Tailwind</p>
            <p className="font-mono text-xs sm:text-sm text-gray-600 text-center md:text-right">Designed & Developed by Me</p>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-cyan-400 text-black rounded-full shadow-lg hover:bg-cyan-300 transition-all hover:scale-110 animate-[fadeIn_0.3s_ease-out]"
            aria-label="Scroll to top"
          >
            <ArrowRight size={24} className="-rotate-90" />
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }
      `}</style>
    </div>
  );
}