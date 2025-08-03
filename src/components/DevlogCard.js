import FadeInSection from "./client/hooks/FadeIn";

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

export default function DevlogCard({ props, className }) {
  const title = props.title?.rich_text[0]?.text.content || 'Untitled';
  const body = props.body?.rich_text[0]?.text.content || '';
  const imageUrl = props.image?.files[0].external.url || '/images/placeholder.png';
  const tags = props.tags?.multi_select || [];
  const date = props.date?.date.start;

  return (
    <FadeInSection className={className}>
      <div className="flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-96 object-cover rounded-t-2xl"
        />

        <div className="flex flex-col flex-grow justify-between p-5">
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>

            <div className="mb-2 text-white flex gap-2">
              <img
                  src="/assets/pfp.png"
                  alt="Hamd's profile photo"
                  className="w-6 h-6 rounded-full object-cover"
                />
              <span>hamdivazim &#x2022; {date}</span>
            </div>

            <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-3">
              {body}
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
        </div>
      </div>
    </FadeInSection>
  );
}
