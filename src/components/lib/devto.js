import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

// todo - fix code highlighting and styling not working

export async function getRecentPosts(num=3) {
  const res = await fetch(`https://dev.to/api/articles?username=hamdivazim&per_page=${num}`, {
    method: 'GET'
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Dev.to API error: ${res.status} - ${err.message}`);
  }

  const data = await res.json();
  return data;
}

export async function getAllSlugs() {
  const response = await fetch(`https://dev.to/api/articles?username=hamdivazim`);
  const articles = await response.json();
  return articles.map(article => article.slug);
}

export async function getPostBySlug(slug) {
  const response = await fetch(`https://dev.to/api/articles/hamdivazim/${slug}`);
  const article = await response.json();
  article.renderedHTML = mdToHTML(article.body_markdown);
  return article;
}

export function mdToHTML(markdown) {
  const md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs rounded-lg overflow-x-auto text-sm my-4"><code class="language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
        } catch (_) {}
      }

      return `<pre class="hljs rounded-lg overflow-x-auto text-sm my-4"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
  });

  md.renderer.rules.heading_open = (tokens, idx) => {
    const tag = tokens[idx].tag;
    const sizes = {
      h1: 'text-3xl font-bold mt-6 mb-4',
      h2: 'text-2xl font-semibold mt-5 mb-3',
      h3: 'text-xl font-semibold mt-4 mb-2',
      h4: 'text-lg font-semibold mt-3 mb-2',
      h5: 'text-base font-semibold mt-2 mb-1',
      h6: 'text-base font-semibold mt-2 mb-1 italic',
    };
    return `<${tag} class="${sizes[tag] || 'text-lg font-semibold mt-3 mb-2'}">`;
  };

  md.renderer.rules.paragraph_open = () => `<p class="leading-relaxed mb-4">`;

  md.renderer.rules.code_inline = (tokens, idx) => {
    const token = tokens[idx];
    return `<code class="inline-code">${md.utils.escapeHtml(token.content)}</code>`;
  };

  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    return `<pre class="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-6 text-sm"><code>${md.utils.escapeHtml(token.content)}</code></pre>\n`;
  };

  md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx];
    const src = token.attrGet('src') || '';
    const alt = token.content || '';
    return `<img src="${src}" alt="${alt}" class="rounded-lg max-w-full h-auto my-4 mx-auto" />`;
  };

  md.renderer.rules.blockquote_open = () => (
    `<blockquote class="border-l-4 border-indigo-500 pl-4 italic text-gray-300 my-6">`
  );

  md.renderer.rules.bullet_list_open = () => `<ul class="list-disc list-inside mb-4">`;
  md.renderer.rules.ordered_list_open = () => `<ol class="list-decimal list-inside mb-4">`;
  md.renderer.rules.list_item_open = () => `<li class="mb-1">`;

  md.renderer.rules.link_open = (tokens, idx) => {
    const token = tokens[idx];
    const href = token.attrGet('href') || '#';
    const targetAttr = href.startsWith('http')
      ? ' target="_blank" rel="noopener noreferrer"'
      : '';
    return `<a href="${href}" class="text-cyan-400 hover:text-cyan-300 hover:underline"${targetAttr}>`;
  };

  md.renderer.rules.hr = () => `<hr class="my-8 border-gray-700" />`;

  return md.render(markdown);
}

export async function getPosts(page=1) {
  const res = await fetch(`https://dev.to/api/articles?username=hamdivazim&per_page=5&page=${page}`, {
    method: 'GET'
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Dev.to API error: ${res.status} - ${err.message}`);
  }

  const data = await res.json();
  return data;
}

export async function searchPosts(keyword) {
  const res = await fetch(`https://dev.to/api/articles?username=hamdivazim&per_page=50`, {
    method: 'GET'
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Dev.to API error: ${res.status} - ${err.message}`);
  }

  const data = await res.json();

  const lower = keyword.toLowerCase();
  return data.filter(post => {
    const title = post.title?.toLowerCase() ?? "";
    const desc = post.description?.toLowerCase() ?? "";
    const tags = (post.tag_list || []).map(t => t.toLowerCase());
    return (
      title.includes(lower) ||
      desc.includes(lower) ||
      tags.some(tag => tag.includes(lower))
    );
  });

}