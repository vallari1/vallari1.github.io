import React, { useState } from 'react';
import { BookOpen, Code, Heart, Camera,Wrench, Trophy, Home, User, Mail, Linkedin, Github ,Book} from 'lucide-react';
import emailjs from '@emailjs/browser';
import BlogTab from './BlogTab'; 

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'research', label: 'Research and Patents', icon: BookOpen },
    { id: 'experience', label: 'Experience', icon: Wrench },
    { id: 'volunteering', label: 'Volunteering', icon: Heart },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    //{ id: 'blog', label: 'Blog', icon: Book }, // Add blog tab
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 
            onClick={() => setActiveTab('home')} 
            className="text-xl font-bold mb-4 md:mb-0 cursor-pointer hover:text-blue-300 transition-colors"
          >
            Vallari Ashar
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600'
                      : 'hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
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

    try {
      const templateParams = {
        to_email: 'vallari.ashar13@gmail.com',
        from_name: formState.name,
        from_email: formState.email,
        subject: formState.subject,
        message: formState.message,
        reply_to: formState.email
      };

      await emailjs.send(
        'service_bc3993l',
        'template_8wzqajs',
        templateParams,
        '7wxUw5pDJ8efDgvEZ'
      );

      setStatus({
        type: 'success',
        message: 'Thanks for reaching out! I\'ll get back to you soon.'
      });
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'There was an error sending your message. Please try again or contact me directly via email.'
      });
      console.error('EmailJS error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Get in Touch</h2>
        
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
          <div className="space-y-2">
            <a href="mailto:vallari.ashar13@gmail.com" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
              <Mail className="w-5 h-5" />
              vallari.ashar13@gmail.com
            </a>
            <a href="https://linkedin.com" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
              <Linkedin className="w-5 h-5" />
              LinkedIn Profile
            </a>
            <a href="https://github.com/vallari1" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
              <Github className="w-5 h-5" />
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-8">
    <div className="max-w-4xl mx-auto text-center">
      <img
        src="/profile1.JPG" // Add your profile photo to public folder
        alt="Vallari Ashar"
        className="w-52 h-52 rounded-full mx-auto mb-8 border-4 border-white shadow-lg object-cover"
      />
      <h1 className="text-4xl font-bold mb-4">Vallari Ashar</h1>
      <p className="text-xl mb-4">B.Tech CSE Student @ VIT Chennai</p>
      <p className="text-xl mb-6">Specializing in AI and Robotics</p>

      <div className="flex justify-center gap-4 mb-8">
        <a href="mailto:vallari.ashar9@gmail.com" className="flex items-center gap-2 text-slate-700 hover:text-blue-600">
          <Mail className="w-5 h-5" />
          Email
        </a>
        <a href="https://www.linkedin.com/in/vallari1/" className="flex items-center gap-2 text-slate-700 hover:text-blue-600">
          <Linkedin className="w-5 h-5" />
          LinkedIn
        </a>
        <a href="https://github.com/vallari1" className="flex items-center gap-2 text-slate-700 hover:text-blue-600">
          <Github className="w-5 h-5" />
          GitHub
        </a>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-lg">
        <p className="text-gray-700 mb-6">
          Robotics enthusiast and aspiring AI engineer with hands-on experience in ROS2, computer vision, and autonomous systems.
          Currently leading robotics projects at Technocrats Robotics and conducting research in quantum-enhanced neural networks.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Technical Skills</h3>
            <p>Python, C++, ROS, React, Machine Learning</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Frameworks</h3>
            <p>ROS, React, Docker, Git</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Simulation</h3>
            <p>Gazebo, Isaac Sim, SolidWorks</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsTab = () => (
  <div className="grid grid-flow-row grid-cols-3 gap-6 p-6 relative">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src="/kia.jpeg" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-49 object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">KIA - Open-source Robotic Arm</h3>
        <p className="text-gray-600 mb-4">
          Developed an open source robotic arm with bluetooth control and autonomous hand-shaking capabilities using computer vision.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Arduino</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">RaspberryPi</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">SolidWorks</span>
        </div>
      </div>
    </div>
  


    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className=" relative">
        <img
          src="/Karan.jpeg" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-50 object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">Karan</h3>
        <p className="text-gray-600 mb-4">
          Autonomous ball tracking, recieving and dropping robot, image processing capabilities and great speed and accuracy for the ROBOCON 2024 problem statement
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">OpenCV</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">ROS</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Arduino</span>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className=" relative">
        <img
          src="/Arjun.jpeg" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-50 object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">Arjun</h3>
        <p className="text-gray-600 mb-4">
          Joystick-controlled ball collecting and launching robot, with grippers and linear acutators for sapling pick up as per the ROBOCON 2024 problem statement
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React Native</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">PostgreSQL</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">ResNet18</span>
        </div>
      </div>
    </div>


    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className=" relative">
        <img
          src="/vitrace.jpeg" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-50 object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">VITrace</h3>
        <p className="text-gray-600 mb-4">
          Full stack Lost Item Tracing application that won Top 5 among 164 teams in Solve-a-thon 2024. Selected for implementation across VIT campuses.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React Native</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">PostgreSQL</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">ResNet18</span>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    <div className="relative">
        <img
          src="/robot.jpeg" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-50"/>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">Autonomous Crop Disease Detection Robot</h3>
        <p className="text-gray-600 mb-4">
          Built an autonomous robot for field mapping and real-time crop disease detection using YOLO and ROS2, simulated in Gazebo.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Python</span>
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">C++</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">YOLOv8</span>
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">OpenCV</span>
        </div>
      </div>
    </div>


  </div>
);

const ResearchTab = () => (
  <div className="max-w-4xl mx-auto p-6">
    <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="aspect-w-full aspect-h-full relative">
        <img
          src="/qesnn.png" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-50 object-cover"
        />
      </div><br></br>
      <h3 className="text-xl font-bold mb-2">Quantum-Enhanced Spiking Neural Networks for Closed-Loop Neuromodulation Systems</h3>
      <p className="text-sm text-blue-600 mb-4">International Conference on Innovative Computing, Intelligent Communication and Smart Electrical Systems (ICSES -2024)</p>
      <p className="text-gray-600 mb-4">
        A theoretically advanced framework where input through quantum dot sensors from brain neurons is converted to spike-based data,
        which is then treated as an input layer in QESNN. The output of the neural network creates a closed-loop neuromodulation circuit,
        utilizing deep brain stimulation.
      </p>
      <div className="flex items-center text-sm text-gray-500">
        <span className="mr-4">October 2024</span>
      </div>
    </div>
<br></br>
    <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="aspect-w-full aspect-h-full relative">
        <img
          src="/patent.png" // Add your project image to public/projects folder
          alt="Patent"
          className="w-full h-50 object-cover"
        />
      </div><br></br>
      <h3 className="text-xl font-bold mb-2">A Portable Welding Inspection System & Method for Detecting Structural Defects by Inspecting Weld Material</h3>
      <p className="text-sm text-blue-600 mb-4">IP Application Number: 202441097583</p>
      <p className="text-gray-600 mb-4">
      The present disclosure relates to a portable welding inspection system and method for detecting structural defects by inspecting weld material. The system (102) that detects structural defects in weld material using image-capturing units (108) and ultrasonic sensors (110) coupled to processors (104). The system (102) receives 10 visual data from the image-capturing units (108), including surface images, and ultrasonic data from ultrasonic sensors (110). The visual data is processed using a pre-stored convolutional neural network (CNN) and ultrasonic data using signal processing techniques. The system (102) detects spatial characteristics from the visual data, and temporal characteristics from the ultrasonic data
      </p>
      <div className="flex items-center text-sm text-gray-500">
        <span className="mr-4">October 2024</span>
      </div>
    </div>
  </div>

  
);

const ExperienceTab = () => (
  <div className="max-w-4xl mx-auto p-6">
    
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="aspect-w-full aspect-h-full relative ">
        <img
          src="/tcr-leads.jpeg" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-50 object-cover"
        /><br></br>
      </div>
        <h3 className="text-xl font-bold mb-2">Team Captain</h3>
        <p className="text-gray-600 mb-2">Technocrats Robotics, Chennai | March 2023 – Present</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Scored 100/100 in DD ROBOCON 2025 STAGE 1</li>
          <li>Developed autonomous omni-directional robots using ROS</li>
          <li>Created robots with manual and autonomous capabilities using Raspberry Pi, Arduino, and ESPs</li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="aspect-w-16 aspect-h-9 relative">
        <img
          src="/autonomous.png" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-50 object-cover"
        /><br></br>
      </div>
        <h3 className="text-xl font-bold mb-2">Robotics Research Intern</h3>
        <p className="text-gray-600 mb-2">ACK Robotics, Chennai | Oct 2023 – April 2024</p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Developed Ackermann-style robot with ROS2, NAV2 stack, GPS, and Fields2Cover library</li>
          <li>Implemented YOLOv8 and ResNet101 for PCB anomaly detection</li>
          <li>Gained expertise in navigation, mapping, and SLAM in ROS</li>
        </ul>
      </div>

      
    </div>
  </div>
);

const VolunteeringTab = () => (
  <div className="max-w-4xl mx-auto p-6">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-2">Volunteer Teacher</h3>
      <p className="text-gray-600 mb-2">E-Vidyaloka, Bishunpur | Jan 2024 - Mar 2024</p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>Taught Mathematics to underprivileged Class 8 students in Jharkhand remotely</li>
        <li>Collaborated with government school officials for online learning transition</li>
        <li>Impacted 80-90 students through digital education initiatives</li>
      </ul>
    </div>
  </div>
);

const AchievementsTab = () => (
  <div className="max-w-4xl mx-auto p-6">
    <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <img
          src="/stage1.png" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-50 object-cover"
        /><br></br>
        <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">DD ROBOCON 2025 stage 1</h3>
        <p className="text-gray-600">
          Scored 100/100 and secured 1st position out of 74 teams all over India in Stage 1
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
      <img
          src="/irc.jpg" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-50 object-cover"
        /><br></br>
        <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">International Rover Challenge</h3>
        <p className="text-gray-600">
          Among the top 20 teams from the 100+ registrations at BITS Goa
        </p>
      </div>


      <div className="bg-white rounded-lg shadow-lg p-6">
      <img
          src="/tcr.jpeg" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-50 object-cover"
        /><br></br>
        <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">DD ROBOCON Nationals 2024</h3>
        <p className="text-gray-600">
          Advanced to nationals, competing with 100+ teams from across India
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
      <img
          src="/vitrace-team.jpeg" // Add your project image to public/projects folder
          alt="KIA Robotic Arm"
          className="w-full h-50 object-cover"
        /><br></br>
        <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Top 5 in Solve-a-thon 2024</h3>
        <p className="text-gray-600">
          VITrace project selected for implementation across VIT campuses
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <Trophy className="w-8 h-8 text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">Certifications</h3>
        <ul className="text-gray-600 list-disc list-inside">
          <li>Machine Learning Specialization - Stanford</li>
          <li>Foundations of Cybersecurity - Google</li>
          <li>Summer Analytics for Data Science - IIT Delhi</li>
        </ul>
      </div>
    </div>
  </div>
);
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
      case 'blog':  // Add blog case
        return <BlogTab />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default App;