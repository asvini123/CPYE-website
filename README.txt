CENTRE FOR PEACE BUILDING AND YOUTH EMPOWERMENT — WEBSITE
============================================================

WHAT'S INSIDE
  index.html            Home page
  about.html             About Us (mission, vision, values, partners, team)
  projects.html           Our Projects (current ongoing project cards)
  get-involved.html        Volunteer / Partner / Sponsor / Corporate CSR
  contact.html            Contact (phone, email, one-tap WhatsApp — no form)

  css/base.css            Shared styling — header, nav, buttons, footer,
                          cards, fonts, colours. Used by every page.
  css/home.css            Styling only for index.html (hero, stats, etc.)
  css/about.css           Styling only for about.html
  css/projects.css         Styling only for projects.html
  css/get-involved.css      Styling only for get-involved.html
  css/contact.css          Styling only for contact.html

  js/script.js            Mobile menu, close button, scroll animations
  images/logo.jpeg         Your logo — used in header, footer, favicon

  Each HTML page loads TWO stylesheets: css/base.css (shared) +
  its own page CSS. If you ever want to change something on just
  one page, edit that page's own CSS file — it won't affect the rest
  of the site. If you want to change something everywhere (like the
  header or footer), edit css/base.css.

HOW TO VIEW IT
  Just double-click "index.html" — it opens in any browser.
  All 5 pages link to each other through the top menu.

HOW TO PUT IT ONLINE
  Upload this whole folder as-is to any web host (e.g. Hostinger,
  GitHub Pages, Netlify, cPanel/File Manager). No build step, no
  database — it's a plain HTML/CSS/JS site, so it works anywhere.
  Keep the folder structure exactly as it is (css/, js/, images/
  must stay next to the .html files).

MOBILE BEHAVIOUR (IMPORTANT)
  - On phones, the footer is hidden. Instead, a sticky bar stays
    fixed at the bottom of the screen with 4 quick-access buttons:
    Call, WhatsApp, Email, and Back to top.
  - Tapping the ☰ menu icon opens a full-screen menu with a clear
    ✕ close button at the top — tap it, tap outside, or press Esc
    to close.
  - Every page was tested from 320px (small phones) up to large
    desktop screens with zero horizontal scrolling issues.

WHATSAPP — AUTO-FILLED MESSAGES
  Every WhatsApp button on the site opens a chat with a message
  already typed in, matched to what the visitor clicked:
    - Volunteer button      -> volunteering enquiry
    - Become a Partner       -> partnership enquiry
    - Sponsor a Project      -> sponsorship enquiry
    - Corporate Partnerships  -> CSR enquiry
    - Contact page / footer / sticky bar -> general enquiry
  The number used everywhere is: +94 75 850 7463
  To change it, search for "94758507463" across all the .html
  files and replace it everywhere it appears.

EMAIL
  cpye.org.srilanka@gmail.com — used for the "Send an email" buttons.

EDITING TEXT / COLOURS
  - Wording: open any .html file in a text editor and edit the
    text between the tags.
  - Colours: open css/base.css and change the hex values at the
    very top under ":root" — every page updates automatically since
    they all share this file.
  - Page-specific layout tweaks: edit that page's own CSS file
    (e.g. css/about.css for About Us only).

Built with plain HTML, CSS and JavaScript — no frameworks, no
dependencies, easy to hand off to any future developer.
