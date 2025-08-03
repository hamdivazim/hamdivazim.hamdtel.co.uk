import React from 'react';

export default function SkillCard({ icon: Icon, name }) {
  return (
    <div className="backdrop-blur-md bg-white/10 shadow-md p-4 flex items-center space-x-4 border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
      <div className="text-white text-3xl">
        <Icon />
      </div>
      <span className="text-white text-lg font-medium">{name}</span>
    </div>
  );
}
