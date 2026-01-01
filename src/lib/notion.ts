// Types for Notion properties
export interface Project {
  id: string;
  name: string;
  description: string;
  agency: string;
  client: string;
  roles: string[];
  technologies: string[];
  year: number | null;
  url: string;
}

// Notion API response types
interface NotionRichText {
  plain_text: string;
}

interface NotionMultiSelect {
  name: string;
}

interface NotionPage {
  id: string;
  properties: {
    Name?: { title: NotionRichText[] };
    Description?: { rich_text: NotionRichText[] };
    Agency?: { rich_text: NotionRichText[] };
    Client?: { rich_text: NotionRichText[] };
    Roles?: { multi_select: NotionMultiSelect[] };
    Technologies?: { multi_select: NotionMultiSelect[] };
    Year?: { number: number | null };
    Link?: { url: string | null };
  };
}

interface NotionQueryResponse {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string | null;
}

// Helper to extract text from Notion rich text
function getRichText(items: NotionRichText[] | undefined): string {
  if (!items?.length) return '';
  return items.map((t) => t.plain_text).join('');
}

// Helper to extract multi-select values
function getMultiSelect(items: NotionMultiSelect[] | undefined): string[] {
  if (!items?.length) return [];
  return items.map((s) => s.name);
}

// Transform Notion page to Project
function transformPage(page: NotionPage): Project {
  const props = page.properties;
  
  return {
    id: page.id,
    name: getRichText(props.Name?.title),
    description: getRichText(props.Description?.rich_text),
    agency: getRichText(props.Agency?.rich_text),
    client: getRichText(props.Client?.rich_text),
    roles: getMultiSelect(props.Roles?.multi_select),
    technologies: getMultiSelect(props.Technologies?.multi_select),
    year: props.Year?.number ?? null,
    url: props.Link?.url || '',
  };
}

// Fetch all projects from Notion using fetch API
export async function fetchProjects(): Promise<Project[]> {
  const token = import.meta.env.NOTION_TOKEN;
  const databaseId = import.meta.env.NOTION_DATABASE_ID;
  
  if (!token || !databaseId) {
    console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID environment variables');
    return [];
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        sorts: [
          {
            property: 'Year',
            direction: 'descending',
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Notion API error:', response.status, error);
      return [];
    }

    const data: NotionQueryResponse = await response.json();
    const projects = data.results.map(transformPage);

    return projects;
  } catch (error) {
    console.error('Failed to fetch projects from Notion:', error);
    return [];
  }
}
