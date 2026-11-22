# Mohamed Elsayed | Flutter Developer Portfolio

A responsive personal portfolio presenting Mohamed Elsayed's Flutter projects, skills, education, and downloadable CV.

![HTML5](https://img.shields.io/badge/HTML5-172033?style=flat-square) ![CSS3](https://img.shields.io/badge/CSS3-172033?style=flat-square) ![JavaScript](https://img.shields.io/badge/JavaScript-172033?style=flat-square) ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-172033?style=flat-square)

[View the live portfolio](https://mo123elsayed.github.io/my-portofolio/)

## Features

- Six Flutter project cards with source-code links and concise project summaries.
- Real app screenshot galleries for Travel Guide, Movie Browser, ToDo, and Weather Now.
- A neon cyan/purple theme, animated Flutter mark, and typed hero introduction.
- Scroll-reveal effects with reduced-motion support.
- Responsive layouts and horizontally scrollable screenshot galleries on smaller screens.
- About, skills, education, and contact sections, plus a downloadable PDF CV.
- Page metadata, a canonical URL, and structured person data.

## Preview

![Live portfolio desktop preview](https://github.com/user-attachments/assets/ccef98ea-50ab-4bfc-887a-f1eed0f13384)

## Tech stack

Plain HTML, CSS, and JavaScript. The page is static: no framework, package manager, build step, backend, or API key is required. Styles and scripts are contained in `index.html`.

## Run locally

Requirements: Git and Python 3, or another local static-file server.

```bash
git clone https://github.com/Mo123elsayed/my-portofolio.git
cd my-portofolio
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. This is a website repository, so Flutter commands are not needed here.

## Project structure

```text
index.html                                  # Page markup, styles, scripts, embedded images
Mohamed_Elsayed_Flutter_Developer_CV.pdf      # Downloadable CV
README.md                                   # Project documentation
```

The app gallery images are embedded WebP data images inside `index.html`, not files in a separate image directory. The favicon is also embedded.

## Update and deploy

1. Edit `index.html` to update content, styles, links, or galleries.
2. Keep the CV filename in sync with both download links if replacing it.
3. Preview the page locally at desktop and mobile widths. Check image loading, gallery scrolling, project links, contact links, and the CV download.
4. Commit with a message describing the change, such as `docs: update project setup instructions` or `style: refine mobile gallery spacing`.
5. Push to the branch configured in GitHub Pages, then verify the published website. The current source branch is `main`.

The live site is served by GitHub Pages at the link above.
