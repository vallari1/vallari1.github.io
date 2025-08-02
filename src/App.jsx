import React, { useState } from 'react';
import { BookOpen, Code, Heart, Camera, Wrench, Trophy, Home, User, Mail, Linkedin, Github, Book, Download, Menu, X } from 'lucide-react';

// Mock BlogTab component for now
const BlogTab = () => (
  <div className="p-6 bg-gray-50">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
        <Book className="mr-4 text-blue-600" /> My Tech Insights
      </h2>
      <div className="text-center text-gray-600">
        <p>Blog posts coming soon...</p>
      </div>
    </div>
  </div>
);

const Navigation = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const tabs = [
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'research', label: 'Research & Patents', icon: BookOpen },
    { id: 'experience', label: 'Experience', icon: Wrench },
    { id: 'volunteering', label: 'Volunteering', icon: Heart },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <h1 
            onClick={() => handleTabClick('home')} 
            className="text-xl font-bold cursor-pointer hover:text-blue-300 transition-colors flex-shrink-0"
          >
            Vallari Ashar
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors text-sm ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-slate-700 text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-700">
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors text-sm ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-slate-700 text-gray-300 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const ContactTab = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    // Simulate form submission
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: 'Thanks for reaching out! I\'ll get back to you soon.'
      });
      setFormState({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Get in Touch</h2>
          
          {status.message && (
            <div className={`mb-6 p-4 rounded-md ${
              status.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-2 px-4 rounded-md transition-colors`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Other ways to connect:</h3>
            <div className="space-y-3">
              <a href="mailto:vallari.ashar13@gmail.com" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="break-all">vallari.ashar13@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/vallari1/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin className="w-5 h-5 flex-shrink-0" />
                LinkedIn Profile
              </a>
              <a href="https://github.com/vallari1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5 flex-shrink-0" />
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const handleDownloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Vallari_Ashar_Resume.pdf';
    link.download = 'Vallari_Ashar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <img
            src="/profile1.JPG"
            alt="Vallari Ashar"
            className="w-32 h-32 md:w-48 md:h-48 rounded-full mx-auto mb-6 border-4 border-white shadow-lg object-cover"
          />
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800">Vallari Ashar</h1>
          <p className="text-lg md:text-xl mb-2 text-slate-600">B.Tech CSE Student @ VIT Chennai</p>
          <p className="text-lg md:text-xl mb-6 text-slate-600">Specializing in AI and Robotics</p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="mailto:vallari.ashar13@gmail.com" className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors">
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline">Email</span>
            </a>
            <a href="https://www.linkedin.com/in/vallari1/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors">
              <Linkedin className="w-5 h-5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a href="https://github.com/vallari1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors">
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <button 
              onClick={handleDownloadResume}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Resume
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Professional Summary</h2>
          <p className="text-gray-700 mb-6 text-center max-w-4xl mx-auto leading-relaxed">
            Computer Science Engineering student specializing in AI and Robotics with expertise in autonomous systems 
            and FPGA development. Led robotics teams to 1st place nationally in DD ROBOCON 2025 and top-20 
            internationally. Professional experience in mission-critical embedded systems at DRDO for fighter aircraft.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md">
            <h3 className="font-bold mb-3 text-blue-800">Programming Languages</h3>
            <p className="text-blue-700">Python, C/C++, SQL, JavaScript, HTML/CSS, VHDL</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md">
            <h3 className="font-bold mb-3 text-purple-800">Frameworks & Tools</h3>
            <p className="text-purple-700">ROS, Git, Docker, VS Code, AMD VIVADO</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md">
            <h3 className="font-bold mb-3 text-green-800">Simulation & CAD</h3>
            <p className="text-green-700">Gazebo, Isaac Sim, MATLAB, SolidWorks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsTab = () => {
  const projects = [
    {
      title: "Basketball Robots",
      description: "Use basket tracking, localization and internal co-ordination. Have shooting mechansim, extension mechanism, and many others. Powered by STM32, and Jetson Nano.",
      image: "/bots.jpeg",
      tags: ["STM32", "Jetson Developement Kit", "SolidWorks", "ROS2", "Gazebo"],
      date: "Jan - May 2025"
    },
    
    
    {
      title: "KIA - Open-source Robotic Arm",
      description: "Developed an open source robotic arm with bluetooth control and autonomous hand-shaking capabilities using computer vision. Visualized through MoveIt2 in Gazebo for smooth communication and movements.",
      image: "/kia.jpeg",
      tags: ["Arduino", "RaspberryPi", "SolidWorks", "MoveIt2", "Gazebo"],
      date: "June 2024"
    },
    {
      title: "Karan - Autonomous Ball Tracking Robot",
      description: "Autonomous ball tracking, receiving and dropping robot with image processing capabilities and great speed and accuracy for the ROBOCON 2024 problem statement.",
      image: "/Karan.jpeg",
      tags: ["OpenCV", "ROS", "Arduino", "Computer Vision"],
      date: "2024"
    },
    {
      title: "Arjun - Ball Collecting Robot",
      description: "Joystick-controlled ball collecting and launching robot, with grippers and linear actuators for sapling pick up as per the ROBOCON 2024 problem statement.",
      image: "/Arjun.jpeg",
      tags: ["ROS2", "Embedded Systems", "Mechanical Design"],
      date: "2024"
    },
    {
      title: "VITrace - Lost Item Tracking App",
      description: "Full stack Lost Item Tracing application that won Top 5 among 164 teams in Solve-a-thon 2024. Selected for implementation across VIT campuses.",
      image: "/vitrace.jpeg",
      tags: ["React Native", "PostgreSQL", "ResNet18", "Full Stack"],
      date: "April 2024"
    },
    {
      title: "Autonomous Crop Disease Detection Robot",
      description: "Built an autonomous robot for field mapping and real-time crop disease detection using YOLO and ROS2, simulated in Gazebo with Ackermann-style navigation.",
      image: "/robot.jpeg",
      tags: ["Python", "C++", "YOLOv8", "OpenCV", "ROS2", "NAV2"],
      date: "2023"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                  <span className="text-sm text-gray-500">{project.date}</span>
                </div>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResearchTab = () => (
  <div className="min-h-screen bg-gray-50 py-8 px-4">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Research & Patents</h2>
      
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <img
              src="/qesnn.png"
              alt="Quantum-Enhanced Spiking Neural Networks"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-3">Quantum-Enhanced Spiking Neural Networks for Closed-Loop Neuromodulation Systems</h3>
          <p className="text-blue-600 mb-4 font-medium">International Conference on Innovative Computing, Intelligent Communication and Smart Electrical Systems (ICSES-2024)</p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            A theoretically advanced framework where input through quantum dot sensors from brain neurons is converted to spike-based data,
            which is then treated as an input layer in QESNN. The output of the neural network creates a closed-loop neuromodulation circuit,
            utilizing deep brain stimulation.
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <span>October 2024</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="mb-6">
            <img
              src="/patent.png"
              alt="Patent Application"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl md:text-2xl font-bold mb-3">A Portable Welding Inspection System & Method for Detecting Structural Defects</h3>
          <p className="text-blue-600 mb-4 font-medium">IP Application Number: 202441097583</p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Developed an innovative portable welding inspection system integrating high-end cameras and ultrasonic sensors.
            Created a multi-modal transformer for optimized ultrasonic signal processing with 95% accuracy in detecting
            surface and subsurface welding defects, operational latency under 50ms, and 60 FPS at 4K resolution.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">&lt;50ms</div>
              <div className="text-sm text-gray-600">Latency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">60 FPS</div>
              <div className="text-sm text-gray-600">4K Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0.5-20 MHz</div>
              <div className="text-sm text-gray-600">Frequency Range</div>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>October 2024</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ExperienceTab = () => {
  const experiences = [
    {
      title: "Project Intern",
      company: "CASDIC, DRDO",
      location: "Bengaluru, KA",
      period: "May 2025 – July 2025",
      image: "/casdic.jpeg",
      description: [
        "Worked on verification and validation of mission-critical embedded systems for next-generation fighter aircraft including Su-30 MKI upgrade programs",
        "Performed functional testing and diagnostics of flight control software on Xilinx Kintex-7 FPGA development boards using VHDL-based simulation and debugging tools",
        "Gained hands-on experience with avionics protocols, real-time signal processing, and hardware-in-the-loop (HIL) testing environments",
        "Collaborated with DRDO scientists on integration workflows for combat systems, contributing to performance validation under real-time constraints"
      ]
    },
    {
      title: "Team Captain",
      company: "Technocrats Robotics",
      location: "Chennai, TN",
      period: "August 2024 – Present",
      image: "/capn.jpeg",
      description: [
        "Leading a self-funded team to national and international competitions, including the development basketball playing robots for DD ROBOCON",
        "Scored 100/100 in DD ROBOCON STAGE 1 2025, and secured 1st position among 84 national teams",
        "Achieved 20th place among 100+ participants at International Rover Challenge 2025 with our Mars exploration rover, Abhimanyu"
      ]
    },
    {
      title: "Robotics Research Intern",
      company: "ACK Robotics",
      location: "Chennai, TN",
      period: "Oct 2023 – April 2024",
      image: "/autonomous.png",
      description: [
        "Developed an Ackermann-style robot controlled by ROS2, utilizing the NAV2 stack, GPS, and Fields2Cover library to simulate field mapping and navigation in Gazebo",
        "Gained proficiency in navigation, mapping, and SLAM in ROS, achieving 90%+ navigation success rate in Gazebo simulation",
        "Implemented YOLOv8 and ResNet101 for detecting PCB anomalies, defects, and textureless industrial metal objects",
        "Acquired skills in documentation, development, and deployment of robotic software in a professional setting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Professional Experience</h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <img
                    src={exp.image}
                    alt={`${exp.title} at ${exp.company}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{exp.title}</h3>
                  <div className="text-gray-600 mb-2">
                    <span className="font-semibold">{exp.company}</span> • {exp.location}
                  </div>
                  <div className="text-blue-600 mb-4 font-medium">{exp.period}</div>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {exp.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VolunteeringTab = () => (
  <div className="min-h-screen bg-gray-50 py-8 px-4">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Volunteering</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex items-center mb-4">
          <Heart className="w-8 h-8 text-red-500 mr-4" />
          <div>
            <h3 className="text-xl md:text-2xl font-bold">Volunteer Teacher</h3>
            <p className="text-gray-600">E-Vidyaloka, Bishunpur, JK | Jan 2024 - Mar 2024</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Impact</h4>
            <p className="text-blue-700">Taught Mathematics to underprivileged 8th grade students in Jharkhand remotely, impacting 80-90 students</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Collaboration</h4>
            <p className="text-green-700">Collaborated with government school officials to facilitate a smooth transition to online learning</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Mission</h4>
            <p className="text-purple-700">Contributed to bridging the digital education gap for underserved communities in rural India</p>
          </div>
        </div>
      </div>


<br></br>

<div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <div className="flex items-center mb-4">
          <Heart className="w-8 h-8 text-red-500 mr-4" />
          <div>
            <h3 className="text-xl md:text-2xl font-bold">Speaker</h3>
            <p className="text-gray-600">Empower Tech 2024| 3rd October 2023</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Impact</h4>
            <p className="text-blue-700">Invited to talk about robotics as a career, and the basics of how to approach the field as a beginner </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Collaboration</h4>
            <p className="text-green-700">Judged the hackathon and ideathon phase of the workshop</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <img
              src="/profile.JPG"
              alt="Empower Tech 2024"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

);

const AchievementsTab = () => {
  const achievements = [
    {
      title: "DD ROBOCON 2025 Nationals",
      description: "Competed with the best teams from  all over India @ IIT DELHI",
      image: "/team.jpeg",
      color: "from-red-400 to-red-600"
    },
    {
      title: "DD ROBOCON 2025 Stage 1 - 1st Position",
      description: "Scored 100/100 and secured 1st position out of 84 teams all over India in Stage 1",
      image: "/stage1.png",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      title: "International Rover Challenge - Top 20",
      description: "Among the top 20 teams from the 100+ registrations at BITS Goa with our Mars exploration rover",
      image: "/irc.jpg",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "DD ROBOCON Nationals 2024",
      description: "Advanced to nationals, competing with 100+ teams from across India",
      image: "/tcr.jpeg",
      color: "from-green-400 to-green-600"
    },
    {
      title: "Top 5 in Solve-a-thon 2024",
      description: "VITrace project selected for implementation across VIT campuses among 164 teams",
      image: "/vitrace-team.jpeg",
      color: "from-purple-400 to-purple-600"
    }
  ];

  const certifications = [
    "Machine Learning Specialization - DeepLearning.AI (Stanford Online, Andrew Ng)",
    "Foundations of Cybersecurity - Google",
    "Summer Analytics for Data Science - IIT Delhi"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Achievements & Recognition</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-64 object-cover"
                />
                <div className={`absolute top-4 left-4 bg-gradient-to-r ${achievement.color} p-2 rounded-full`}>
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{achievement.title}</h3>
                <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex items-center mb-6">
            <BookOpen className="w-8 h-8 text-blue-500 mr-4" />
            <h3 className="text-2xl font-bold">Certifications</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium text-sm leading-relaxed">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />;
      case 'projects':
        return <ProjectsTab />;
      case 'research':
        return <ResearchTab />;
      case 'experience':
        return <ExperienceTab />;
      case 'volunteering':
        return <VolunteeringTab />;
      case 'achievements':
        return <AchievementsTab />;
      case 'contact':
        return <ContactTab />;
      case 'blog':
        return <BlogTab />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;