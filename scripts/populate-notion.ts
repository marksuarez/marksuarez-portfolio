import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID!;

// Projects data from the existing site
const projects = [
  {
    name: "Diamond Schmitt Architects",
    url: "https://dsai.ca",
    description: "A new portfolio website for an international architecture practice based in Toronto. Features included user-centered content management, WebGL shaders and scroll effects.",
    agency: "Frontier",
    client: "Diamond Schmitt Architects",
    roles: ["Development"],
    technologies: ["WordPress", "WebGL", "ScrollMagic", "GSAP", "MixItUp"],
    year: 2019
  },
  {
    name: "Frontier",
    url: "https://frontier.is",
    description: "Agency website with creative animations and scroll effects.",
    agency: "Frontier",
    client: "Frontier",
    roles: ["Development"],
    technologies: ["WordPress", "ScrollMagic", "GSAP", "DrawSVG"],
    year: 2019
  },
  {
    name: "Willful.co",
    url: "https://willful.co",
    description: "Marketing website for online will creation platform.",
    agency: "Freelance",
    client: "Willful",
    roles: ["Development"],
    technologies: ["Webflow", "CMS", "Swiftype"],
    year: 2020
  },
  {
    name: "CBC Original Voices",
    url: "https://cbc.ca/originalvoices",
    description: "Interactive storytelling experience for CBC.",
    agency: "Frontier",
    client: "CBC",
    roles: ["Development"],
    technologies: ["WordPress", "SVG", "Parallax", "Open Graph API"],
    year: 2018
  },
  {
    name: "Piece Together",
    url: "https://wepiecetogether.com",
    description: "E-commerce website with custom animations.",
    agency: "Freelance",
    client: "Piece Together",
    roles: ["Development"],
    technologies: ["WordPress", "WooCommerce", "Lottie", "BodyMovin"],
    year: 2020
  },
  {
    name: "Key Gordon",
    url: "https://keygordon.com",
    description: "Corporate website for communications agency.",
    agency: "Key Gordon",
    client: "Key Gordon",
    roles: ["Development"],
    technologies: ["WordPress"],
    year: 2017
  },
  {
    name: "Bridgeable",
    url: "https://bridgeable.com",
    description: "Service design consultancy website with scroll animations.",
    agency: "Frontier",
    client: "Bridgeable",
    roles: ["Development"],
    technologies: ["WordPress", "ScrollMagic", "GSAP"],
    year: 2018
  },
  {
    name: "Futurestarters",
    url: "https://futurestarters.org",
    description: "Non-profit website with interactive elements.",
    agency: "Frontier",
    client: "Futurestarters",
    roles: ["Development"],
    technologies: ["WordPress", "ScrollMagic", "GSAP"],
    year: 2019
  },
  {
    name: "Fogo Island Inn",
    url: "https://fogoislandinn.ca",
    description: "Luxury hotel website.",
    agency: "Frontier",
    client: "Fogo Island Inn",
    roles: ["Development"],
    technologies: ["WordPress"],
    year: 2018
  },
  {
    name: "Ryerson FEAS - Infinite Perspectives",
    url: "http://infiniteperspectives.ryerson.ca/",
    description: "University faculty showcase with page transitions.",
    agency: "Frontier",
    client: "Ryerson University",
    roles: ["Development"],
    technologies: ["WordPress", "Barba"],
    year: 2019
  },
  {
    name: "W Financial",
    url: "https://w-financial.com",
    description: "Financial services company website.",
    agency: "Freelance",
    client: "W Financial",
    roles: ["Development"],
    technologies: ["HTML/CSS", "JavaScript"],
    year: 2020
  },
  {
    name: "Peregrine Investment Management",
    url: "https://peregrineinv.com/",
    description: "Investment management firm website.",
    agency: "Freelance",
    client: "Peregrine Investment",
    roles: ["Development"],
    technologies: ["WordPress"],
    year: 2020
  },
  {
    name: "Gryphon",
    url: "https://gryphonsecure.com/",
    description: "Security company website with SVG animations.",
    agency: "Freelance",
    client: "Gryphon",
    roles: ["Development"],
    technologies: ["WordPress", "SVG"],
    year: 2020
  },
  {
    name: "InvestEco",
    url: "https://investeco.com/",
    description: "Impact investment firm website.",
    agency: "Freelance",
    client: "InvestEco",
    roles: ["Development"],
    technologies: ["WordPress"],
    year: 2020
  },
  {
    name: "Toupee",
    url: "https://toupee.ltd",
    description: "Creative studio website with video backgrounds.",
    agency: "Freelance",
    client: "Toupee",
    roles: ["Development"],
    technologies: ["WordPress", "HTML5 Video"],
    year: 2020
  },
  {
    name: "Karimjee Resolutions Inc.",
    url: "https://karimjeeresolutions.com",
    description: "Dispute resolution services website.",
    agency: "Freelance",
    client: "Karimjee Resolutions",
    roles: ["Development"],
    technologies: ["WordPress"],
    year: 2020
  }
];

async function createProject(project: typeof projects[0]) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: project.name,
              },
            },
          ],
        },
        Description: {
          rich_text: [
            {
              text: {
                content: project.description,
              },
            },
          ],
        },
        Agency: {
          rich_text: [
            {
              text: {
                content: project.agency,
              },
            },
          ],
        },
        Client: {
          rich_text: [
            {
              text: {
                content: project.client,
              },
            },
          ],
        },
        Roles: {
          multi_select: project.roles.map(role => ({ name: role })),
        },
        Technologies: {
          multi_select: project.technologies.map(tech => ({ name: tech })),
        },
        Year: {
          number: project.year,
        },
        Link: {
          url: project.url,
        },
      },
    });
    console.log(`✅ Created: ${project.name}`);
    return response;
  } catch (error: any) {
    console.error(`❌ Failed to create ${project.name}:`, error.message);
    throw error;
  }
}

async function populateDatabase() {
  console.log('🚀 Starting to populate Notion database...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const project of projects) {
    try {
      await createProject(project);
      successCount++;
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      failCount++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📝 Total: ${projects.length}`);
}

populateDatabase();
