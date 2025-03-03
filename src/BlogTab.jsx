import React, { useState } from 'react';
import { Book } from 'lucide-react';
import { marked } from 'marked';

const blogPosts = [
  {
    id: 1,
    title: 'Quantum Neural Networks: The Future of AI',
    excerpt: 'Exploring the intersection of quantum computing and artificial intelligence...',
    date: 'November 15, 2024',
    readTime: '5 min read',
    tags: ['Quantum Computing', 'AI', 'Research'],
    image: '/quantum-ai.jpeg',
    fullContent: `
      # Quantum Neural Networks: The Future of AI

      In the rapidly evolving landscape of artificial intelligence, quantum neural networks represent a groundbreaking frontier that promises to revolutionize computational capabilities...

      ## Key Insights
      - Quantum computers can process complex neural network computations exponentially faster
      - Quantum entanglement allows for more sophisticated machine learning models
      - Current challenges include quantum decoherence and scalability

      Stay tuned for a deep dive into this exciting technological convergence!
    `
  },
  {
    id: 2,
    title: 'ROS2: Building Autonomous Robotics Systems',
    excerpt: 'A comprehensive guide to developing robust robotic applications using ROS2...',
    date: 'October 20, 2024',
    readTime: '7 min read',
    tags: ['Robotics', 'ROS2', 'Software Development'],
    image: '/ros2-robotics.jpeg',
    fullContent: `
      # ROS2: Revolutionizing Autonomous Robotics

      Robot Operating System 2 (ROS2) has emerged as a game-changing framework for building sophisticated autonomous robotic systems...

      ## Core Advantages of ROS2
      - Improved security model
      - Real-time communication capabilities
      - Enhanced cross-platform support
      - Robust distributed computing architecture

      Dive into the world of modern robotics software engineering!
    `
  },
  {
    id: 3,
    title: 'AI in Agriculture: Beyond Traditional Farming',
    excerpt: 'How artificial intelligence is transforming agricultural practices and sustainability...',
    date: 'September 5, 2024',
    readTime: '6 min read',
    tags: ['AI', 'Agriculture', 'Sustainability'],
    image: '/ai-agriculture.jpeg',
    fullContent: `
      # AI: The New Frontier in Agricultural Innovation

      Artificial intelligence is reshaping agriculture, offering unprecedented insights and optimization strategies...

      ## Transformative AI Applications
      - Precision crop monitoring
      - Automated disease detection
      - Predictive yield optimization
      - Sustainable resource management

      The future of farming is intelligent, data-driven, and sustainable!
    `
  }
];

const BlogPostPreview = ({ post, onReadMore }) => (
  <div 
    onClick={() => onReadMore(post)}
    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
  >
    <div className="relative">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2">
        <span className="text-sm">{post.readTime}</span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-sm text-gray-500">{post.date}</span>
      </div>
    </div>
  </div>
);

const BlogPostModal = ({ post, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
      >
        ✕
      </button>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
        <div className="flex items-center text-gray-600 mb-6">
          <span className="mr-4">{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: marked.parse(post.fullContent) }}
        />
      </div>
    </div>
  </div>
);

const BlogTab = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
          <Book className="mr-4 text-blue-600" /> My Tech Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogPostPreview 
              key={post.id} 
              post={post} 
              onReadMore={handleReadMore} 
            />
          ))}
        </div>
        {selectedPost && (
          <BlogPostModal 
            post={selectedPost} 
            onClose={handleCloseModal} 
          />
        )}
      </div>
    </div>
  );
};

export default BlogTab;