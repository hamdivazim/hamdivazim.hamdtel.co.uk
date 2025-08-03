import FadeInSection from "./client/hooks/FadeIn";
import { FaGitAlt, FaDotCircle } from "react-icons/fa";
import Button from "./Button";

const notionToTailwind = {
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  purple: 'bg-purple-100 text-purple-800',
  pink: 'bg-pink-100 text-pink-800',
  brown: 'bg-yellow-200 text-yellow-900',
  orange: 'bg-orange-100 text-orange-800',
  gray: 'bg-gray-100 text-gray-800',
  default: 'bg-gray-100 text-gray-800',
};

export default function ProjectCard({ props, className }) {
  const title = props.name?.title[0]?.text.content || 'Untitled';
  const description = props.description?.rich_text[0]?.text.content || '';
  const imageUrl = props.thumbnail?.url || '/assets/placeholder.png';
  const url = props.url?.url || '#';
  const tags = props.tags?.multi_select || [];
  const status = props.status?.select?.name;
  const statusColour = props.status?.select?.color;
  const repo = props.repo?.url;

  return (
    <FadeInSection className={className}>
      <div className="flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-2xl"
        />

        <div className="flex flex-col flex-grow justify-between p-5">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>

            {status && (
                <span
                    className="inline-flex items-center mb-3 text-xs font-semibold px-3 py-1 border rounded-full bg-white/10 border-white/20 text-white"
                >
                    <FaDotCircle 
                    className={`${notionToTailwind[statusColour] || notionToTailwind.default} mr-2 text-sm`} 
                    style={{ backgroundColor: 'transparent' }}
                    />
                    {status}
                </span>
            )}

            <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-3">
              {description}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map(tag => (
                  <span
                    key={tag.id}
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${notionToTailwind[tag.color] || notionToTailwind.default}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto flex justify-between items-center">
            {repo ? (
              <div className="flex items-center gap-2 text-sm text-gray-200 hover:text-white transition-colors">
                <FaGitAlt className="text-lg" />
                <a
                  href={`https://github.com/${repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline break-all"
                >
                  Repo
                </a>
              </div>
            ) : (
                <div></div>
            )}
            {url && (
              <Button
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-300 hover:text-white"
              >
                Visit 
              </Button>
            )}
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
