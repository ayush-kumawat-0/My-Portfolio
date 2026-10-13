# Ayush Kumawat — Portfolio

Personal portfolio website for **Ayush Kumawat**, an MCA student and aspiring DevOps Engineer. The site presents my learning journey from web development toward Linux, system administration, shell scripting, Python, Git, and cloud-focused engineering.

## About the Website

This portfolio is designed as a minimal, interactive, and responsive one-page experience. It combines a clean editorial layout with subtle motion, an orange-and-black visual identity, and practical project showcases.

The website includes:

- Hero section with a short introduction, animated name reveal, terminal-style learning log, and social links
- About section covering my education, background, and transition toward DevOps
- Skills section grouped by DevOps foundation, web development, programming, and database knowledge
- Projects section featuring:
  - **QR Code Generator** — a Python and Flask web application with QR customisation, previews, downloads, copy support, and history
  - **Terminal File Manager** — a Bash-based Linux project for practising file-management operations from the terminal
- Contact section for internships, collaborations, technical discussions, and opportunities
- Responsive navigation with mobile menu support
- Light and dark theme switching
- Smooth scrolling, scroll progress tracking, and scroll-position restoration
- GSAP-powered entrance animations, scroll-triggered reveals, text scrambling, mouse-following effects, and a meteor-shower background
- Reduced-motion support for visitors who prefer fewer animations

## Built With

- [React](https://react.dev/) — component-based user interface
- [Vite](https://vite.dev/) — development server and production bundler
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [GSAP](https://gsap.com/) — animations and scroll interactions
- HTML, CSS, and modern JavaScript

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/ayush-kumawat-0/My-Portfolio.git
cd My-Portfolio
npm install
```

### Run Locally

Start the Vite development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

### Create a Production Build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
.
├── public/                 # Static assets such as the favicon
├── src/
│   ├── components/         # Portfolio sections and reusable UI components
│   ├── App.jsx             # Main page composition and theme/scroll behaviour
│   ├── index.css           # Tailwind setup and custom global styles
│   └── main.jsx            # React entry point
├── index.html              # HTML shell and metadata
├── package.json            # Scripts and dependencies
└── vite.config.js          # Vite configuration
```

## Contact

- Email: [ayushkumawat205@gmail.com](mailto:ayushkumawat205@gmail.com)
- GitHub: [ayush-kumawat-0](https://github.com/ayush-kumawat-0)
- LinkedIn: [Ayush Kumawat](https://www.linkedin.com/in/ayushhkumawat/)

## AI Assistance

AI tools were used as a support during the development of this website for brainstorming, implementation guidance, and refinement. The portfolio’s content, project direction, design choices, and final review were handled by me.

## License

This project is a personal portfolio. Please do not reuse its personal content, branding, or project information without permission.
