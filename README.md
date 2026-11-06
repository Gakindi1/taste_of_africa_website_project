# Taste of Africa

Taste of Africa is a multi-page website about African food. It introduces dishes from West, North, East and Southern Africa, gives full step-by-step recipes, and explains the history and ingredients behind each region's cooking.

The site is built with plain HTML5, CSS and JavaScript. There are no frameworks, no build step and nothing to install.

---

## Contents

1. [Viewing the website](#viewing-the-website)
2. [Pages](#pages)
3. [How to use the website](#how-to-use-the-website)
4. [Folder structure](#folder-structure)
5. [Technologies used](#technologies-used)
6. [Accessibility](#accessibility)
7. [Browser support](#browser-support)
8. [Publishing with GitHub Pages](#publishing-with-github-pages)
9. [Known limitations](#known-limitations)
10. [Credits](#credits)

---

## Viewing the website

### Option 1: VS Code Live Server (recommended)
1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension if you do not have it.
3. Right-click `index.html` and choose **Open with Live Server**.
4. The site opens in your browser at an address like `http://127.0.0.1:5500`.

### Option 2: Python
If Python is installed, open a terminal in the project folder and run:

```
python -m http.server
```

Then visit `http://localhost:8000` in your browser.

### Option 3: Open the file directly
You can double-click `index.html` to open it in a browser. Most of the site works this way, but the embedded YouTube videos may not play. Use one of the options above for the full experience.

---

## Pages

| Page | File | What it contains |
|------|------|------------------|
| Home | `index.html` | Introduction, featured video, featured dishes, the three main regions and current food trends |
| Recipes | `recipes.html` | All 13 dishes with region filters, a search box and saved favourites |
| Jollof Rice | `jollof-rice.html` | Full recipe (Nigeria, West Africa) |
| Chicken Tagine | `tagine.html` | Full recipe (Morocco, North Africa) |
| Injera | `injera.html` | Full recipe (Ethiopia, East Africa) |
| Bunny Chow | `bunny-chow.html` | Full recipe (South Africa, Southern Africa) |
| Isombe | `isombe.html` | Full recipe (Rwanda, East Africa) |
| Regions | `regions.html` | Overview of Africa's culinary regions |
| West Africa | `west-africa.html` | Signature dishes, key ingredients, food culture and a video |
| North Africa | `north-africa.html` | Signature dishes, key ingredients, food culture and a video |
| East Africa | `east-africa.html` | Signature dishes, key ingredients, food culture and a video |
| About | `about.html` | Mission, values, a short history of African food, a map and photo credits |
| Contact | `contact.html` | Contact details and a contact form |

---

## How to use the website

### Navigating
- Use the menu at the top of every page to move between **Home**, **Recipes**, **Regions**, **About** and **Contact**.
- On phones and small screens, the menu collapses into a button. Tap it to open the menu, then tap a link (or the button again) to close it.
- After scrolling down a page, a **back to top** button appears in the bottom corner.
- Every page has a footer with quick links, a newsletter signup and the current year.

### Switching between dark and light mode
- Click the **sun / moon button** in the header to switch themes.
- Your choice is remembered, so the site opens in the same theme next time you visit (on the same browser).

### Finding a recipe
On the **Recipes** page:
- **Filter by region:** click **All**, **West Africa**, **North Africa**, **East Africa** or **Southern Africa** to show only dishes from that region.
- **Search:** type in the search box to find dishes by name, country or ingredient (for example `peanut`, `Morocco` or `rice`). Results update as you type.
- Filters and search work together. For example, choose **West Africa** and search `rice` to see only West African rice dishes.
- A line above the results shows how many dishes match (for example "Showing 4 of 13 dishes").
- If nothing matches, a message tells you so. Clear the search or choose **All** to see every dish again.

You can also open the Recipes page with a filter already applied by adding it to the address, for example:
- `recipes.html?filter=west-africa`
- `recipes.html?filter=favorites`

### Saving favourite dishes
- Click the **Favorite** button on any dish card or recipe page. The button changes to **Saved**.
- Click it again to remove the dish from your favourites.
- The number next to the favourites link in the header shows how many dishes you have saved. Click it to go straight to your favourites.
- On the Recipes page, click the **Favorites** filter to see only your saved dishes.
- Favourites are stored in your browser, so they are still there after you close the page. They are not shared between different browsers or devices.

### Cooking from a recipe page
Each recipe page (Jollof Rice, Chicken Tagine, Injera, Bunny Chow and Isombe) includes:
- A photo, a short description, the country and region, and the preparation and cooking time.
- **Ingredient scaler:** use the **+** and **−** buttons next to "Servings" to change the number of people (from 1 to 20). Every ingredient quantity updates automatically.
- **Step-by-step instructions:** click each step to expand or collapse it, so you can keep your place while cooking.
- Tips, background on the dish, and a video showing how it is made.
- The **Start cooking** button at the top jumps straight to the instructions.

### Exploring regions
- The **Regions** page gives an overview of each region. Click a region card to open its page.
- Each region page lists its signature dishes, key spices and ingredients, food traditions and a video.
- Links at the bottom of each region page take you to that region's recipes or to the other regions.

### Contacting us
On the **Contact** page, fill in the form:

| Field | Requirement |
|-------|-------------|
| Name | At least 2 characters |
| Email | A valid email address, for example `name@example.com` |
| Country | Choose one from the list |
| Message | More than 20 characters (a counter below the box shows your progress) |

- If something is missing or incorrect, a message appears under that field explaining what to fix.
- When everything is valid, the form is replaced by a personalised thank-you message ("Thank you, [your name]!").
- Click **Send another message** to show an empty form again.

### Newsletter signup
- Enter your email address in the newsletter box in the footer and click **Subscribe**.
- A message confirms the signup, or asks you to correct the email if it is not valid.

---

## Folder structure

```
taste_of_africa_website_project/
├── index.html            # Home page (kept at the root for GitHub Pages)
├── recipes.html, regions.html, about.html, contact.html
├── jollof-rice.html, tagine.html, injera.html, bunny-chow.html, isombe.html
├── west-africa.html, north-africa.html, east-africa.html
├── css/
│   └── styles.css        # All styles for every page, including dark and light themes
├── js/
│   └── script.js         # All interactive features
├── images/               # Food photos (credited on the About page)
├── .gitignore
└── README.md
```

All pages share the same stylesheet (`css/styles.css`) and script (`js/script.js`).

---

## Technologies used

- **HTML5:** semantic elements such as `header`, `nav`, `main`, `section`, `article`, `figure`, `details` and `footer`.
- **CSS3:** custom properties (variables) for colours and spacing, Flexbox and Grid layouts, media queries for responsive design, and transitions and animations.
- **JavaScript (ES6):** plain JavaScript with no libraries. Main features:
  - Theme toggle saved with `localStorage`
  - Mobile navigation menu
  - Region filter and live search on the Recipes page
  - Favourites saved with `localStorage`
  - Ingredient scaler on recipe pages
  - Contact form validation using `event.preventDefault()`
  - Newsletter email check
  - Scroll animations using `IntersectionObserver`
- **Google Fonts:** Fraunces for headings and Inter for body text.
- **Embedded media:** YouTube videos and a Google Map.

---

## Accessibility

- A **Skip to content** link appears when you press `Tab` on any page, so keyboard users can jump past the menu.
- All images have descriptive alt text.
- Every form field has a label, and error messages are announced to screen readers.
- Buttons such as Favorite and the filters report their on/off state to assistive technology.
- The whole site can be used with a keyboard alone. Focused items show a clear outline.
- Text and background colours are chosen for good contrast in both dark and light modes.

---

## Browser support

The site works in current versions of Chrome, Edge, Firefox and Safari, on desktop and mobile. Layouts adapt to phones, tablets and large screens.

---

## Publishing with GitHub Pages

To make the site available online:

1. Push the project to GitHub.
2. On the repository page, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the **main** branch and the **/(root)** folder, then click **Save**.
5. After a minute or two, the site will be live at:
   `https://gakindi1.github.io/taste_of_africa_website_project/`

---

## Known limitations

- The contact form and newsletter signup are front-end only. They check your input and show a confirmation, but no message or email is actually sent, because the site has no server.
- Favourites and the theme setting are saved only in the browser you are using. Clearing your browser data removes them.
- Videos, the map and the fonts load from the internet, so they need an internet connection.
- The email address shown on the Contact page is a placeholder.

---

## Credits

- **Photos:** from Wikimedia Commons and Flickr, used under Creative Commons licences (CC BY, CC BY-SA and CC0). The full list with each photographer's name and licence is on the About page (`about.html#credits`). Some photos are cropped or resized for the layout.
- **Videos:** embedded from YouTube. All videos belong to their creators.
- **Map:** Google Maps.
- **Fonts:** Fraunces and Inter from Google Fonts.
