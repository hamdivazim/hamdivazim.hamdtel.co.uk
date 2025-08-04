'use client';

import { useState, useMemo, useEffect } from 'react';
import ProjectCard from '../ProjectCard';

export default function ProjectsSearch({ projects }) {
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');

  useEffect(() => {
    const delay = setTimeout(() => {
      setSubmittedSearch(search.trim().toLowerCase());
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const filteredProjects = useMemo(() => {
    if (!submittedSearch) return [];
    return projects.filter((project) => {
      const name = project.properties.name.title[0]?.plain_text.toLowerCase() || '';
      const description = project.properties.description.rich_text[0]?.plain_text.toLowerCase() || '';
      return (
        name.includes(submittedSearch) ||
        description.includes(submittedSearch)
      );
    });
  }, [projects, submittedSearch]);

  return (
    <div className="space-y-6">
      <div className="w-full max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {submittedSearch && (
        <div className="flex flex-col gap-6 mt-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} props={project.properties} />
            ))
          ) : (
            <p className="text-center text-gray-500">No projects found.</p>
          )}
        </div>
      )}
    </div>
  );
}
