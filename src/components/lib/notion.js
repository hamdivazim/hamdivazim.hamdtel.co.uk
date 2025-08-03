export async function getRecentProjects(num=3) {
  const res = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_PROJECTS_DB_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        sorts: [
          { property: 'date', direction: 'descending' }
        ],
        page_size: num,
    })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion API error: ${res.status} - ${err.message}`);
  }

  const data = await res.json();
  return data.results;
}

export async function getAllProjects() {
  const res = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_PROJECTS_DB_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        sorts: [
          { property: 'date', direction: 'descending' }
        ],
    })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion API error: ${res.status} - ${err.message}`);
  }

  const data = await res.json();
  return data.results;
}

export async function getLatestDevlog() {
  const res = await fetch(`https://api.notion.com/v1/databases/23e28b160f0f800cb3beddf12bef273a/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        sorts: [
          { property: 'date', direction: 'descending' }
        ],
        "page_size": 7
    })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion API error: ${res.status} - ${err.message}`);
  }

  const data = await res.json();
  return data.results;
}
