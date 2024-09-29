import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutDetailPage from './AboutDetailPage';
import PostPage from './PostPage';
import AllPosts from './components/AllPosts.js';
import Navbar from './components/Navbar.js';
import MoreProjects from './MoreProjects.js';
import NotFound from './NotFound.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutDetailPage />} />
        <Route path="/posts" element={(
          <main className="text-gray-400 bg-gray-900 body-font min-h-screen">
          <Navbar />
          <AllPosts />
        </main>
        )} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/projects" element={<MoreProjects />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
