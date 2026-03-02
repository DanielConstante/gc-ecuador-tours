# 🌎 ECUADOR TOURS & TRANSPORT WEBSITE

AI BUILD SPECIFICATION DOCUMENT

------------------------------------------------------------------------

## 📌 PROJECT SUMMARY

Build a modern, bilingual (Spanish default / English secondary), 100%
responsive tourism website for a Sangolquí-based Ecuador tour and
transport service.

The website must:

-   Display tours dynamically from local JSON
-   Be SEO optimized
-   Be mobile-first responsive
-   Allow downloadable PDF per tour
-   Use a professional blue color palette
-   Be scalable for future admin/dashboard integration
-   Be production-ready

------------------------------------------------------------------------

# 🏗 TECH STACK REQUIREMENTS

## Framework

-   Next.js 14 (App Router)
-   TypeScript
-   TailwindCSS

## Additional Libraries

-   i18next or next-intl for translations
-   jsPDF for PDF generation
-   Lucide icons
-   Framer Motion (optional)

## Deployment Target

-   Vercel (preferred)
-   Static export compatible

------------------------------------------------------------------------

# 🎨 DESIGN SYSTEM

## Color Palette (Blue Travel Theme)

-   Primary Blue: #0A3D62
-   Ocean Blue: #1B6CA8
-   Sky Blue: #74B9FF
-   Light Background: #F4F9FF
-   Accent Gold: #F5A623
-   Dark Text: #1E272E

Typography: - Headings: Poppins - Body: Inter

------------------------------------------------------------------------

# 📁 PROJECT STRUCTURE

/app /\[locale\] /page.tsx (Home) /tours/page.tsx
/tours/\[slug\]/page.tsx /components Navbar.tsx Footer.tsx TourCard.tsx
LanguageSwitcher.tsx PDFButton.tsx /data tours.json /locales es.json
en.json /public /images /pdf

------------------------------------------------------------------------

# 📦 LOCAL JSON DATA MODEL (Example)

\[ { "id": 1, "slug": "quito-city-tour", "name": { "es": "Tour Histórico
Quito", "en": "Quito Historical Tour" }, "city": "Quito", "duration": {
"es": "8 horas", "en": "8 hours" }, "price": 85, "currency": "USD",
"category": "Cultural", "includes": { "es": \["Transporte privado",
"Guía bilingüe", "Entradas"\], "en": \["Private transport", "Bilingual
guide", "Tickets"\] }, "description": { "es": "Explora el centro
histórico de Quito...", "en": "Explore the historic center of Quito..."
}, "image": "/images/quito.jpg", "featured": true }\]

------------------------------------------------------------------------

# 🖥 REQUIRED PAGES

## HOME

-   Hero section
-   Featured tours (dynamic)
-   Services overview
-   Why choose us
-   Contact section

## TOURS PAGE

-   Dynamic JSON loading
-   Filters (City, Price, Category)
-   Responsive grid (1/2/3 columns)

## TOUR DETAILS

-   Title
-   Description
-   Price
-   Includes
-   WhatsApp button
-   Download PDF button

------------------------------------------------------------------------

# 📄 PDF GENERATION

Each tour must generate a downloadable PDF including:

-   Tour name
-   Description
-   Price
-   Includes
-   Contact info

Use jsPDF for implementation.

------------------------------------------------------------------------

# 📱 RESPONSIVE RULES

Mobile-first design.

Breakpoints: - md: 768px - lg: 1024px

Grid: - 1 column mobile - 2 tablet - 3 desktop

------------------------------------------------------------------------

# 🔎 SEO REQUIREMENTS

Each tour page must include: - Dynamic metadata - OpenGraph tags -
Structured data (Tour schema)

------------------------------------------------------------------------

# 🎯 AI AGENT OBJECTIVE

The AI agent must:

1.  Generate full working Next.js project
2.  Follow folder structure exactly
3.  Implement bilingual system
4.  Use local JSON
5.  Implement PDF download
6.  Apply blue palette
7.  Ensure 100% responsiveness
8.  Keep code scalable and clean

------------------------------------------------------------------------

# 🏁 EXPECTED RESULT

A modern, professional, scalable tourism website ready for production
deployment.
