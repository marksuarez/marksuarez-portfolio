# Mark Suarez Portfolio - Astro Rebuild Plan

## Overview

Rebuild the existing portfolio site as a 1:1 static site using modern technologies:
- **Astro** - Static site generator
- **React** - Component library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Alpine.js** - Lightweight reactivity (with collapse plugin)
- **GSAP** - Animation library with plugins:
  - ScrollSmoother
  - ScrollTrigger
  - ScrollTo
  - SplitText
- **MixItUp** - Filtering/sorting

## Status: ✅ Phase 2 Complete

### Completed Features
- [x] Project structure set up
- [x] Astro + React + TypeScript + Tailwind configured
- [x] Custom Styrene fonts integrated
- [x] Header component with navigation
- [x] Footer component
- [x] Projects page with MixItUp filtering
- [x] CV page with Experience, Skills, Education
- [x] GSAP ScrollSmoother integration
- [x] Alpine.js collapsible filter panel
- [x] Clickable tag filters
- [x] Responsive design matching original
- [x] GitHub repo setup with CI/CD
- [x] GitHub Pages deployment
- [x] **Notion API integration** - Projects fetched from Notion database at build time

### Notion Integration
- **Database ID**: Stored in `NOTION_DATABASE_ID` env variable
- **API Token**: Stored in `NOTION_TOKEN` env variable  
- **Fetch Method**: Native `fetch()` API to Notion REST API v2022-06-28
- **Build Time**: Projects are fetched during `astro build`
- **GitHub Secrets**: Add `NOTION_TOKEN` and `NOTION_DATABASE_ID` as repository secrets

### Database Schema
| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Project name |
| Description | Rich Text | Project description |
| Agency | Rich Text | Agency/company |
| Client | Rich Text | Client name |
| Roles | Multi-select | Roles (Development, Design, etc.) |
| Technologies | Multi-select | Tech stack (WordPress, GSAP, etc.) |
| Year | Number | Project year |
| Link | URL | Project URL |

### Next Steps
- [ ] Add project detail pages
- [ ] Add thumbnail images to Notion
- [ ] Consider ISR or on-demand revalidation

## Deployment

### GitHub Pages Setup
- Repository: `marksuarez-portfolio`
- Branch: `main`
- Deploy via: GitHub Actions
- URL: `https://<username>.github.io/marksuarez-portfolio/`

### CI/CD Pipeline
- Trigger: Push to `main` branch
- Build: `npm run build`
- Deploy: GitHub Pages action

## Project Structure

```
sitenew/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions workflow
├── public/
│   ├── fonts/                    # Custom Styrene fonts
│   ├── svg/                      # SVG assets
│   ├── favicon.ico
│   └── apple-touch-icon.png
├── src/
│   ├── components/
│   │   ├── Header.astro          # Site header with nav
│   │   ├── Footer.astro          # Site footer
│   │   ├── ProjectItem.astro     # Project list item
│   │   └── CVSection.astro       # CV section component
│   ├── layouts/
│   │   └── BaseLayout.astro      # Base HTML layout with GSAP
│   ├── pages/
│   │   ├── index.astro           # Projects page with MixItUp
│   │   └── cv.astro              # CV page
│   ├── data/
│   │   └── projects.ts           # Project data (for future Notion integration)
│   └── styles/
│       └── global.css            # Global styles + Tailwind + fonts
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Design Specifications (from original site)

### Colors
- **Primary Text**: `#394041`
- **Link Blue**: `#0054FF`
- **Link Hover Red**: `#FF5D5D`
- **Background Light**: `#F1F3F2`
- **White**: `#FFFFFF`

### Typography
- **Font Family**: StyreneA (primary), StyreneB (secondary)
- **Base Size**: 16px mobile, 18px desktop
- **Line Height**: 1.25em

### Breakpoints
- Mobile: < 48em (768px)
- Desktop: >= 48em (768px)

### Layout
- Container max-width: 840px
- Container padding: 20px

## Implementation Phases

### Phase 1: Project Setup
1. Initialize Astro project with React & TypeScript
2. Configure Tailwind CSS with custom theme
3. Set up project structure

### Phase 2: Core Components
1. BaseLayout.astro - HTML structure, fonts, meta
2. Header.astro - Logo, navigation
3. Footer.astro - Email, site link

### Phase 3: Pages
1. index.astro - Projects list
2. cv.astro - CV with Experience, Skills, Education

### Phase 4: Animations & Interactivity
1. GSAP ScrollSmoother integration
2. ScrollTrigger animations
3. Alpine.js for simple interactions
4. MixItUp for project filtering (future)

### Phase 5: Polish
1. Custom fonts integration
2. SVG icons
3. Responsive testing
4. Performance optimization

## Dependencies

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/react": "^4.x",
    "@astrojs/tailwind": "^6.x",
    "@astrojs/alpinejs": "^0.4.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "gsap": "^3.x",
    "mixitup": "^3.x",
    "mixitup-multifilter": "^0.x",
    "mixitup-pagination": "^0.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^3.x",
    "@types/react": "^18.x",
    "@types/mixitup": "^3.x"
  }
}
```

## Tailwind Custom Configuration

```javascript
// Custom theme extending Tailwind
theme: {
  extend: {
    colors: {
      'primary': '#394041',
      'link': '#0054FF',
      'link-hover': '#FF5D5D',
      'bg-light': '#F1F3F2',
    },
    fontFamily: {
      'styrene-a': ['StyreneA', 'sans-serif'],
      'styrene-b': ['StyreneB', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '20px',
    },
  }
}
```

## Data Structure (for Notion integration)

```typescript
interface Project {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  tags: string[];
}

interface Experience {
  id: string;
  title: string;
  company: string;
  url?: string;
  period: string;
  location: string;
  description: string;
  responsibilities?: string[];
}

interface Skill {
  id: string;
  title: string;
  items: string[];
}

interface Education {
  id: string;
  institution: string;
  url?: string;
  degree: string;
  year: string;
}
```

## Notes

- ScrollSmoother requires GSAP Club membership - will use public CDN for demo
- SplitText also requires GSAP Club - will include via CDN
- MixItUp is free for personal use
- All styles Tailwind-first with minimal custom CSS
- TypeScript strict mode enabled
- Alpine.js for lightweight DOM interactions
