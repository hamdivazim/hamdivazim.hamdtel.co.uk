"use client";

import { useEffect, useState, useCallback } from "react";
import PostCard from "../PostCard";
import { getPosts } from "../lib/devto";

export default function BlogExtraPosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newPosts = (await getPosts(page)) ?? [];

      const validPosts = newPosts.filter(
        (post) => post && typeof post === "object" && post.title
      );

      if (validPosts.length > 0) {
        setPosts((prev) => [...prev, ...validPosts]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, [loading, page, hasMore]);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= docHeight - 100) {
        loadMorePosts();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadMorePosts]);

  return (
    <div>
      <ul className="space-y-4">
        {posts.map((post, i) => (
          <li key={post?.id}>
            <PostCard props={post} />
          </li>
        ))}
      </ul>

      {loading && (
        <p className="text-center mt-4 text-gray-300">Loading more…</p>
      )}
      {!hasMore && (
        <p className="text-center mt-4 text-gray-500">No more posts.</p>
      )}
    </div>
  );
}
