import FadeInSection from "./client/hooks/FadeIn";
import Button from "./Button";

function formatLocalDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostCard({ props, className, fade=true }) {
  if (!props || typeof props !== "object") {
    console.warn("Invalid post object:", post);
    return null;
  }

  const title = props.title || 'Untitled';
  const description = props.description || '';
  const imageUrl = props.cover_image || '/assets/placeholder.png';
  const slug = props.slug || '';
  const tags = props.tag_list || [];
  const date = formatLocalDate(props.published_at);

  return fade ? (
    <FadeInSection className={className}>
      <div className="flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt={title || 'Blog post image'}
          className="w-full h-48 object-cover rounded-t-2xl"
        />

        <div className="flex flex-col flex-grow justify-between p-5">
          <div>

            <div className="mb-2 text-white flex gap-2">
              <img
                  src="/assets/pfp.png"
                  alt="Hamd's profile photo"
                  className="w-6 h-6 rounded-full object-cover"
                />
              <span>hamdivazim &#x2022; {date}</span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>

            <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-3">
              {description}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

          </div>

          <div className="mt-auto flex justify-between items-center">
            <div></div>
            {slug && (
              <Button
                href={`/blog/${slug}`}
                className="text-sm text-indigo-300 hover:text-white"
              >
                Read 
              </Button>
            )}
          </div>
        </div>
      </div>
    </FadeInSection>
  ) : (
      <div className="flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt={title || 'Blog post image'}
          className="w-full h-48 object-cover rounded-t-2xl"
        />

        <div className="flex flex-col flex-grow justify-between p-5">
          <div>

            <div className="mb-2 text-white flex gap-2">
              <img
                  src="/assets/pfp.png"
                  alt="Hamd's profile photo"
                  className="w-6 h-6 rounded-full object-cover"
                />
              <span>hamdivazim &#x2022; {date}</span>
            </div>

            <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>

            <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-3">
              {description}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

          </div>

          <div className="mt-auto flex justify-between items-center">
            <div></div>
            {slug && (
              <Button
                href={`/blog/${slug}`}
                className="text-sm text-indigo-300 hover:text-white"
              >
                Read 
              </Button>
            )}
          </div>
        </div>
      </div>
  );
}
