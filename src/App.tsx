import  { useState,FormEvent,ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import axios from "axios"

import accenture_forage from "../public/assets/images/accenture_forage.png"
import GUVI from "../public/assets/images/GUVI.png"
import HackerRank from "../public/assets/images/HackerRank.png"
import IBM_Python from "../public/assets/images/IBM_Python.png"
import infosys from "../public/assets/images/infosys.png"
import Linkedin from "../public/assets/images/Linkedin.jpeg"
import StockMarketDashboard from "../public/assets/images/StockMarketDashboard.png"


// import { useInView } from 'react-intersection-observer';
import {
  Home,
  User,
  Award,
  Settings,
  Code,
  FileText,
  Mail,
  Menu,
  X,
  ExternalLink,
  Download,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}
const sections = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'certifications', icon: Award, label: 'Certifications' },
  { id: 'skills', icon: Settings, label: 'Skills' },
  { id: 'projects', icon: Code, label: 'Projects' },
  { id: 'resume', icon: FileText, label: 'Resume' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

const skills = [
  { name: 'React', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'Socket.io', level: 80 },
  { name: 'Python', level: 90 },
  { name: 'Docker', level: 85 },
];

const certifications = [
  {
    title: 'Generative AI',
    issuer: 'Generative AI Microsoft And LinkedIn',
    date: '2024',
    image: 'https://media.licdn.com/dms/image/v2/D5622AQEq4S63PdGINA/feedshare-shrink_1280/feedshare-shrink_1280/0/1713449137380?e=1740009600&v=beta&t=TgXChXoBSaYgWgYYzjIdA8fMti23ghhzvwQPdg2S1DM',
  },
  {
    title: 'Python',
    issuer: 'IBM Congnitive Class',
    date: '2024',
    image: IBM_Python,
  },
  {
    title: 'Figma Design',
    issuer: 'GUVI Supported By AICTE',
    date: '2024',
    image: GUVI,
  },
  {
    title: 'HackerRank Python',
    issuer: 'GUVI Supported By AICTE',
    date: '2024',
    image: HackerRank,
  },
  {
    title: 'Data Analytics',
    issuer: 'GUVI Supported By AICTE',
    date: '2024',
    image: accenture_forage,
  },
  {
    title: 'Python',
    issuer: 'Infosys',
    date: '2024',
    image: infosys,
  },
];

const projects = [
  {
    title: 'LinkedIn Clone',
    description: 'Full-stack Linkedin Social Media Website',
    tech: ['React', 'Node.js', 'Firebase'],
    image: Linkedin,
    link: 'https://github.com/Abhijith12371/LinkedinClone',
  },
  {
    title: 'Gemini Clone',
    description: 'Real-time chat platform with AI-powered responses',
    tech: ['React.js', 'Gemini', 'Node.js','Firebase'],
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=400&q=80',
    link: 'https://github.com/Abhijith12371/FullStackGeminiWebApp',
  },
  {
    title: 'Stock Market Dashboard',
    description: 'StockMarket dashboard for Analysis of Market Trends',
    tech: ['React.js', 'Firebase', 'Express'],
    image: StockMarketDashboard,
    link: 'https://github.com/Abhijith12371/StockMarketPredictioDashboard',
  },
];



function App() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
});
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submission triggered");
    console.log("Form data before validation:", formData);

    if (!formData.name || !formData.email || !formData.message) {
        setStatus("All fields are required.");
        console.log("Validation failed");
        return;
    }

    console.log("Validation passed");
    try {
        console.log("Attempting to send data to backend");
        const response = await axios.post("http://localhost:5000/send-email", formData);
        setStatus("Email sent successfully!");
        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Error:", error);
        setStatus("Failed to send email.");
    }
};

  
  

  
  return (
    <div className="flex">
      {/* Sidebar Navigation */}
      <motion.nav
        initial={{ x: -100 }}
        animate={{ x: isNavOpen ? 0 : -100 }}
        className="fixed h-screen glass p-4 z-50"
      >
        <button
          onClick={toggleNav}
          className="absolute -right-12 top-4 glass p-2 rounded-full"
        >
          {isNavOpen ? <X className="nav-icon" /> : <Menu className="nav-icon" />}
        </button>
        
        <div className="flex flex-col gap-8 mt-8">
          {sections.map(({ id, icon: Icon, label }) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.1 }}
              className="relative group"
            >
              <a
                href={`#${id}`}
                onClick={() => setActiveSection(id)}
                className={`block ${
                  activeSection === id ? 'text-purple-400' : 'text-white'
                }`}
              >
                <Icon className="nav-icon" />
              </a>
              <div className="absolute left-full ml-2 px-2 py-1 glass rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 ml-16">
        {/* Hero Section */}
        <section id="home" className="section-container flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold mb-4">Abhijith</h1>
            <TypeAnimation
              sequence={[
                'Web Developer',
                2024,
                'Full Stack Engineer',
                2024,
                'UI/UX Enthusiast',
                2024,
              ]}
              wrapper="h2"
              repeat={Infinity}
              className="text-2xl text-purple-400"
            />
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="section-container">
          <h2 className="heading">About Me</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-xl max-w-3xl mx-auto"
          >
            <p className="text-lg leading-relaxed">
            Hello! I'm a passionate B.Tech student specializing in Data Science, currently in my 3rd year, with a strong enthusiasm for coding and innovation. I combine my expertise in web development, AI/ML, and data analysis to craft impactful, user-centric digital experiences. With certifications in the MERN stack, cybersecurity, and Python for Data Science, I focus on blending clean design principles with cutting-edge technology to solve complex problems. Whether building responsive interfaces, analyzing data for insights, or exploring new trends, I’m always driven to learn, grow, and create something extraordinar
            </p>
          </motion.div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="section-container">
          <h2 className="heading">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="glass group h-64 relative rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end transform transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                  <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                  <p className="text-purple-300">{cert.issuer}</p>
                  <p className="text-sm text-gray-300">{cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="section-container">
          <h2 className="heading">Skills</h2>
          <div className="max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="mb-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-2 glass rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-container">
          <h2 className="heading">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="glass rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 text-sm glass rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
                  >
                    View Project <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="section-container">
          <h2 className="heading">Resume</h2>
          <div className="max-w-3xl mx-auto glass p-8 rounded-xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Professional Experience</h3>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-white/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
            <div className="space-y-8">
              <motion.div
                className="glass p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-2">GEN AI Expert</h4>
                <p className="text-purple-400 mb-2">AI Research Lab • 2023 - Present</p>
                <p className="text-gray-300">
                  Leading research and development in generative AI applications.
                  Implementing state-of-the-art language models and developing innovative AI solutions.
                </p>
              </motion.div>
              <motion.div
                className="glass p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-2">ML Enthusiast</h4>
                <p className="text-purple-400 mb-2">Tech Innovations • 2022 - 2023</p>
                <p className="text-gray-300">
                  Developed and deployed machine learning models for various applications.
                  Specialized in computer vision and natural language processing projects.
                </p>
              </motion.div>
              <motion.div
                className="glass p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-2">Full Stack Developer</h4>
                <p className="text-purple-400 mb-2">Digital Solutions • 2021 - 2022</p>
                <p className="text-gray-300">
                  Built end-to-end web applications using modern frameworks and technologies.
                  Implemented scalable backend solutions and intuitive frontend interfaces.
                </p>
              </motion.div>
              <motion.div
                className="glass p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-2">Frontend Developer</h4>
                <p className="text-purple-400 mb-2">Web Studio • 2020 - 2021</p>
                <p className="text-gray-300">
                  Created responsive and interactive web applications using React and modern CSS.
                  Focused on performance optimization and user experience improvements.
                </p>
              </motion.div>
              <motion.div
                className="glass p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-2">Python Developer</h4>
                <p className="text-purple-400 mb-2">Software Solutions • 2019 - 2020</p>
                <p className="text-gray-300">
                  Developed automation scripts and data processing pipelines using Python.
                  Implemented RESTful APIs and database solutions for various projects.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-container">
          <h2 className="heading">Contact</h2>
          <motion.div
            className="max-w-xl mx-auto glass p-8 rounded-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <form className="space-y-6" action="/send-email" method="POST" onSubmit={handleSubmit}>
  <div>
    <label className="block text-sm font-medium mb-2">Name</label>
    <input
      type="text"
      className="w-full px-4 py-2 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-purple-400"
      placeholder="Your name"
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-2">Email</label>
    <input
      type="email"
      className="w-full px-4 py-2 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-purple-400"
      placeholder="your@email.com"
    />
  </div>
  <div>
    <label className="block text-sm font-medium mb-2">Message</label>
    <textarea
      className="w-full px-4 py-2 rounded-lg glass focus:outline-none focus:ring-2 focus:ring-purple-400 min-h-[150px]"
      placeholder="Your message"
    ></textarea>
  </div>
  <button
    type="submit"
    className="w-full py-3 px-6 glass rounded-lg text-white font-medium hover:bg-white/20 transition-colors"
  >
    Send Message
  </button>
</form>

          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default App;