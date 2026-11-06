# Taste of Africa 🍲

A multi-page website celebrating Africa's culinary traditions, built with semantic HTML5, CSS and vanilla JavaScript.

## Pages
| Page | File |
|------|------|
| Home (hero + video, featured dishes, regions, food trends) | `index.html` |
| Recipes (filter + search + favourites) | `recipes.html` |
| Recipe pages | `jollof-rice.html`, `tagine.html`, `injera.html`, `bunny-chow.html`, `isombe.html` |
| Culinary regions | `regions.html`, `west-africa.html`, `north-africa.html`, `east-africa.html` |
| About Us (mission, history, map) | `about.html` |
| Contact (validated form) | `contact.html` |

## Folder structure
```
taste_of_africa_website_project/
├── index.html            # Home page (kept at the root for GitHub Pages)
├── recipes.html, regions.html, about.html, contact.html
├── jollof-rice.html, tagine.html, injera.html, bunny-chow.html, isombe.html
├── west-africa.html, north-africa.html, east-africa.html
├── css/
│   └── styles.css        # All site styles
├── js/
│   └── script.js         # Filter, favourites, scaler, form validation, etc.
├── images/               # Food photos (credited on the About page)
└── README.md
```

## Features
- **Design:** dark "midnight & saffron" palette with a light-mode toggle, Google Fonts (Fraunces + Inter), responsive layouts with relative units.
- **Recipe filter:** region buttons use `addEventListener`, `data-region` attributes and a loop that toggles a `.hidden` class. Includes live search.
- **Favourites:** the ❤ Favorite button stores recipe IDs in `localStorage` and restores them on page load. A header badge shows the count.
- **Ingredient scaler:** +/− servings recalculates every quantity on recipe pages.
- **Contact form validation:** `event.preventDefault()`, message length > 20 characters, then a personalised "Thank you, [Name]!" message.
- **Extras:** newsletter signup, scroll-reveal animations, mobile menu, back-to-top button, accessible labels, alt text and skip link.

## Run locally
Open with VS Code **Live Server**, or run `python -m http.server` and visit `http://localhost:8000`.
(YouTube embeds may not play when opening the HTML file directly from disk.)

## Credits
Food photos by real photographers on Wikimedia Commons and Flickr, used under Creative Commons licences (CC BY, CC BY-SA, CC0). The full list with photographer names is on the About page (`about.html#credits`). Videos © their respective YouTube creators.
