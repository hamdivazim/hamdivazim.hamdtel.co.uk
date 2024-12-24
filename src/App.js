import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import AboutDetailPage from './AboutDetailPage';
import PostPage from './PostPage';
import AllPosts from './components/AllPosts.js';
import Navbar from './components/Navbar.js';
import MoreProjects from './MoreProjects.js';
import NotFound from './NotFound.js';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

function App() {
  useEffect(() => {
    let userToken = localStorage.getItem('user_token');
    
    if (!userToken) {
      userToken = generateUUID();
      localStorage.setItem('user_token', userToken);
    }

    console.log('User UUID:', userToken);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutDetailPage />} />
        <Route path="/posts" element={
          <main className="text-gray-400 bg-gray-900 body-font min-h-screen">
            <Navbar />
            <AllPosts />
          </main>
        } />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/projects" element={<MoreProjects />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
