"use client";

import { useEffect, useState } from "react";
import { searchPosts } from "../lib/devto";
import PostCard from "../PostCard";

export default function BlogSearch() {
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (input.trim()) {
        setKeyword(input.trim());
        setHasSearched(true);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [input]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const posts = await searchPosts(keyword);
      setResults(posts);
      setLoading(false);
    };

    if (keyword) {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [keyword]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setKeyword(input.trim());
      setHasSearched(true);
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search blog posts..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-inner placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      {loading && (
        <p className="text-sm text-indigo-300 mt-4">Searching...</p>
      )}

      {!loading && hasSearched && results.length === 0 && (
        <p className="text-sm text-indigo-300 mt-4">No posts found.</p>
      )}

      <ul className="space-y-4 mt-4">
        {results.map((post, i) => (
          <li key={post.id ?? i}>
            <PostCard props={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
