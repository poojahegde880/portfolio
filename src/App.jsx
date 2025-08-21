import React, { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Moon, Sun, Menu, X, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl font-bold mb-10 text-center relative inline-block">
    {children}
    <span className="absolute left-1/2 -bottom-2 w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-500 transform -translate-x-1/2 rounded-full"></span>
  </h2>
);

const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const fadeInLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
const fadeInRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const sectionsRef = useRef({});

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={`${darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"} min-h-screen transition-all duration-500`}>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 ${darkMode ? "bg-gray-950" : "bg-white"} bg-opacity-80 backdrop-blur-md shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Pooja Hegde</h1>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className={`transition ${
                  activeSection === link.href.substring(1) ? "text-teal-500 border-b-2 border-teal-500 pb-1" : "hover:text-teal-500"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
              {darkMode ? <Sun /> : <Moon />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className={`${darkMode ? "bg-gray-950" : "bg-white"} md:hidden px-4 py-4 space-y-4`}>
            {navLinks.map((link, i) => (
              <a key={i} href={link.href} onClick={() => setMenuOpen(false)} className="block hover:text-teal-500 transition">{link.name}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <motion.section
        ref={el => (sectionsRef.current["hero"] = el)}
        className="relative flex flex-col items-center justify-center text-center pt-32 pb-20 bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-600 text-white overflow-hidden animate-gradient"
        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
      >
        <motion.img
          src="/profile.jpeg"
          alt="Pooja Hegde"
          className="w-40 h-40 rounded-full shadow-xl border-4 border-white mb-4 object-cover ring-4 ring-teal-300 hover:ring-indigo-300 transition relative z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <h1 className="text-5xl font-extrabold drop-shadow-lg relative z-10">Pooja Hegde</h1>
        <p className="mt-3 text-lg font-medium drop-shadow relative z-10">
         Aspiring Software Engineer • MCA Student (2025) • Full-Stack Developer
        </p>
        <div className="flex gap-6 mt-5 text-2xl relative z-10">
          <a href="https://github.com/poojahegde880" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition"><Github /></a>
          <a href="https://www.linkedin.com/in/poojahegde14" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition"><Linkedin /></a>
          <a href="mailto:poojahegde880@gmail.com" className="hover:text-teal-300 transition"><Mail /></a>
        </div>
        <a href="/Pooja_Hegde.pdf" download className="mt-8 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition relative z-10">
          📄 Download Resume
        </a>
      </motion.section>

      {/* About */}
      <motion.section id="about" ref={el => (sectionsRef.current["about"] = el)}
        className="max-w-4xl mx-auto px-4 py-14"
        variants={fadeInLeft} initial="hidden" whileInView="visible" transition={{ duration: 0.6 }} viewport={{ once: true }}
      >
        <SectionTitle>About Me</SectionTitle>
        <div className={`${darkMode ? "bg-gray-900" : "bg-white"} p-6 rounded-lg shadow-lg`}>
          <p className="leading-relaxed text-lg">
            MCA student (2025) passionate about software engineering, problem-solving, and building scalable full-stack applications.
            Skilled in Java, C++, SQL, Node.js, and modern frontend frameworks.
            I thrive in collaborative environments and love turning ideas into reality.
          </p>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section id="skills" ref={el => (sectionsRef.current["skills"] = el)}
        className={`${darkMode ? "bg-gray-900 text-teal-300" : "bg-gray-100 text-gray-900"} py-14`}
        variants={fadeInRight} initial="hidden" whileInView="visible" transition={{ duration: 0.6 }} viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle>Technical Skills</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {["Java", "C++", "C", "SQL", "Python", "Node.js", "Express", "MySQL", "HTML", "CSS", "JavaScript", "Git/GitHub"].map((skill, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-lg shadow-md text-center font-medium`}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section id="projects" ref={el => (sectionsRef.current["projects"] = el)}
        className="max-w-4xl mx-auto px-4 py-14"
        variants={fadeInUp} initial="hidden" whileInView="visible" transition={{ duration: 0.6 }} viewport={{ once: true }}
      >
        <SectionTitle>Projects</SectionTitle>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Algorithm Visualizer (AlgoViz)", desc: "Interactive web app to visualize search algorithms with step-by-step animations.", tech: "Node.js, Express, JavaScript, MySQL", github: "https://github.com/poojahegde880/algoviz" },
            { title: "Online Rental Equipment Management System", desc: "Platform to rent tech equipment, reducing manual booking time by 40%.", tech: "HTML, CSS, JavaScript, PHP, MySQL", github: "https://github.com/poojahegde880/Rental-Equipment-Management-System" },
            { title: "Blood Bank Management System", desc: "System to streamline donor registration & blood stock management.", tech: "HTML, CSS, PHP, MySQL", github: "https://github.com/poojahegde880/blood-bank" },
            { title: "Portfolio Website ", desc: "A simple personal portfolio website showcasing skills and projects.", tech: "React, Tailwind CSS, Framer Motion", github: "https://github.com/poojahegde880/portfolio" }
          ].map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className={`${darkMode ? "bg-gray-800" : "bg-white"} p-5 rounded-lg shadow-lg border-l-4 border-teal-500 flex flex-col justify-between`}
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-2">{project.desc}</p>
                <p className="text-sm text-teal-500 font-medium">Tech: {project.tech}</p>
              </div>
              <div className="mt-3 flex justify-end">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 shadow-lg hover:scale-110 hover:shadow-2xl transition-transform"
                  title="View Code"
                >
                  <Github className="w-6 h-6 text-white group-hover:text-gray-100 transition-colors" />
                  <span className="absolute -top-8 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded shadow-md transition-all">
                    View Code
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Certifications */}
      <motion.section id="certifications" ref={el => (sectionsRef.current["certifications"] = el)}
        className="max-w-4xl mx-auto px-4 py-14"
        variants={fadeInLeft} initial="hidden" whileInView="visible" transition={{ duration: 0.6 }} viewport={{ once: true }}
      >
        <SectionTitle>Certifications</SectionTitle>
        <ul className="space-y-4">
          {[
            { title: "Data Structures and Algorithms – Infosys Springboard", link: "/certificates/dsa-infosys.pdf" },
            { title: "Java Foundations – Oracle Academy", link: "/certificates/java-foundations.pdf" },
            { title: "Programming in Python – Meta (Coursera)", link: "/certificates/python-meta.pdf" },
            { title: "Empirical Analysis of Encryption & Decryption Algorithms – DSCASC, 2025", link: "https://example.com/encryption-certificate" }
          ].map((cert, i) => (
            <motion.li
              key={i}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className={`${darkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-lg shadow-md flex justify-between items-center`}
            >
              <span>{cert.title}</span>
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-blue-500 shadow-lg hover:scale-110 hover:shadow-2xl transition-transform"
                title="View Certificate"
              >
                <span className="text-white text-sm font-semibold group-hover:text-gray-100 transition-colors">🎓</span>
                <span className="absolute -top-8 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded shadow-md transition-all">
                  View Certificate
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Footer */}
      <footer id="contact" ref={el => (sectionsRef.current["contact"] = el)}
        className={`${darkMode ? "bg-gray-950" : "bg-gray-900"} text-white text-center py-8`}
      >
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/poojahegde880" target="_blank" rel="noreferrer">
            <Github className="w-6 h-6 hover:text-teal-400 transition" />
          </a>
          <a href="https://www.linkedin.com/in/poojahegde14" target="_blank" rel="noreferrer">
            <Linkedin className="w-6 h-6 hover:text-teal-400 transition" />
          </a>
          <a href="mailto:poojahegde880@gmail.com">
            <Mail className="w-6 h-6 hover:text-teal-400 transition" />
          </a>
        </div>
        <p>© {new Date().getFullYear()} Pooja Hegde. All rights reserved.</p>
      </footer>

      {/* Back to Top */}
      {showTopBtn && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg hover:scale-110 hover:shadow-2xl transition-transform"
        >
          <ArrowUp />
        </motion.button>
      )}
    </div>
  );
}
