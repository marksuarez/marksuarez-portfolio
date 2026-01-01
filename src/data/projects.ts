// Projects are now fetched from Notion - see src/lib/notion.ts
// Re-export the Project type from notion.ts for convenience
export type { Project } from '../lib/notion';

export interface Experience {
  id: string;
  title: string;
  company: string;
  url?: string;
  period: string;
  location: string;
  description: string;
  responsibilities?: string[];
}

export const experiences: Experience[] = [
  {
    id: "freelance",
    title: "Freelance Front-End Developer",
    company: "Freelance",
    url: "/",
    period: "March 2020 - Present",
    location: "Toronto",
    description: "Built custom WordPress, Webflow, and React websites for a variety of clients."
  },
  {
    id: "frontier",
    title: "Front-End Developer",
    company: "Frontier",
    url: "https://frontier.is",
    period: "April 2018 - March 2020",
    location: "Toronto",
    description: "My role as Front-End Developer focussed on building functional and visually interesting web experiences for a wide variety of clients. Particular attention was paid to browser performance, usability, and accessibility, in addition to, delightful animations and effects.",
    responsibilities: [
      "Built custom WordPress themes with custom post types and fields.",
      "Used modern workflow tools like gulp.js to automate our workflow.",
      "Collaborated with designers to enliven and animate using interactive JavaScript libraries such as GSAP, Scrollmagic, Lottie, P5, Three.js, and others.",
      "Built applications like quiz games and rate calculators, using APIs."
    ]
  },
  {
    id: "campjefferson",
    title: "Freelance Graphic Designer",
    company: "Camp Jefferson",
    url: "https://campjefferson.com",
    period: "2018",
    location: "Toronto",
    description: "Ideated and executed branding systems, web design, and identities for clients like Koodo and Porsche. Brand systems included colour systems, typographic systems, and web components."
  },
  {
    id: "keygordon",
    title: "Front-End Developer",
    company: "Key Gordon",
    url: "https://keygordon.com",
    period: "2015 - 2017",
    location: "Toronto",
    description: "Built and launched custom WordPress sites using modern development practices. Collaborated with management and creative team, often contributing to the design process."
  },
  {
    id: "globeandmail",
    title: "Product Designer",
    company: "The Globe and Mail",
    url: "https://theglobeandmail.com",
    period: "2013 - 2014",
    location: "Toronto",
    description: "Worked on the web team to produce new features and enhancements. I was also on the product team which worked on the website redesign. Embedded in development teams which practiced agile workflows (sprints, kanban, Jira). I designed election modules, commenting systems, and iPad apps."
  }
];

export interface Skill {
  id: string;
  title: string;
  items: string[];
}

export const skills: Skill[] = [
  {
    id: "wordpress",
    title: "Custom WordPress Theme Development",
    items: ["Html5, css/scss, js/jQuery, PHP, MySQL, custom post types, custom fields."]
  },
  {
    id: "creative",
    title: "Creative Development",
    items: ["WebGL, P5.js, Greensock, ScrollMagic, SVG, Lottie, Three.js, performance."]
  },
  {
    id: "product",
    title: "Product Design",
    items: [
      "Design Systems and Components",
      "Brand Activation with interactivity and animation",
      "Information Architecture, sitemapping, wireframing, data modelling"
    ]
  },
  {
    id: "other",
    title: "Other",
    items: ["WCAG 2.0 Accessibility, keyboard & screenreader testing."]
  },
  {
    id: "learning",
    title: "2020 Learning Path",
    items: [
      "React and Redux.",
      "WordPress REST API with Gatsby.js."
    ]
  }
];

export interface Education {
  id: string;
  institution: string;
  url?: string;
  degree: string;
  year: string;
}

export const education: Education[] = [
  {
    id: "ocadu",
    institution: "OCADU",
    url: "https://ocadu.ca",
    degree: "Bachelor of Design, Graphic Design",
    year: "2012"
  },
  {
    id: "waterloo",
    institution: "University of Waterloo",
    url: "https://uwaterloo.ca",
    degree: "Bachelor of ES, Urban Planning",
    year: "2007"
  }
];
