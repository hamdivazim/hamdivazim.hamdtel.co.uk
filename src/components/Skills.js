import { BadgeCheckIcon, ChipIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { skills, skills_details } from "../data";

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkillClick = (index) => {
    setSelectedSkill(index === selectedSkill ? null : index); // Toggle the selected skill
  };

  return (
    <section id="skills">
      <div className="container px-5 py-10 mx-auto">
        <div className="text-center mb-20">
          <ChipIcon className="w-10 inline-block mb-4" />
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
            Skills &amp; Technologies
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            I'm experienced in a variety of programming languages, technologies, and cloud concepts, such as Python, SQL, and AWS.
          </p>
        </div>
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
          {skills.map((skill, index) => (
            <div key={skill} className="p-2 sm:w-1/2 w-full">
              <div
                className="bg-gray-800 rounded flex flex-col p-4 h-full items-start cursor-pointer"
                //
              >
                <div className="flex items-center">
                  <BadgeCheckIcon className="text-indigo-400 w-6 h-6 flex-shrink-0 mr-4" />
                  <span className="title-font font-medium text-white">
                    {skill}
                  </span>
                </div>
                {selectedSkill === index && (
                  <p
                    className="text-white mt-2"
                    dangerouslySetInnerHTML={{ __html: skills_details[index] }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// onClick={() => handleSkillClick(index)}
// TODO: Implement clicking functionality on skills