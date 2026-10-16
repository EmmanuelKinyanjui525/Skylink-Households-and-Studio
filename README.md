# Skylink website (Households + Skylink Studios)

A plain HTML/CSS/JS multi-page site. No build step, no installs.

## Where things are
- `index.html` — Home
- `households/` — Households Home, Kitchen Appliances, Kitchenware & Dining, Home Essentials, Product Gallery, Chama, Households Contact
- `studio/` — Studio Home, Portfolio, Photography Services, About the Studio, Studio Contact
- `about.html`, `contact.html`
- `assets/css/style.css` — all styling
- `assets/img/` — photos and the QR code
- `assets/js/config.js` — **phone numbers, WhatsApp numbers, email, map link (change them once, every page updates)**
- `assets/js/products.js` — **the product list (add a product by copying one block)**
- `assets/js/site.js` — the shared menu, footer and WhatsApp button (edit the menu lists at the top to add/rename pages)

## Add a product
Open `assets/js/products.js`, copy one `{ ... }` block, paste it after the last one, add a comma, and change the details.
To show a real photo, put the file in `assets/img/` and add `img: "assets/img/your-photo.jpg"`.

## Publish on GitHub Pages
1. Create a NEW repository (here: `Skylink-Households-and-Studio`) — don't use `skylinkstudios`, it would overwrite your portfolio.
2. Upload everything in this folder (keep the folders as they are).
3. Settings > Pages > Deploy from a branch > `main` / root > Save.
4. The site will be at https://YOUR-USERNAME.github.io/Skylink-Households-and-Studio/

The QR code (`assets/img/qr-skylink.png`, also `skylink_qr_code.png`) points to https://emmanuelkinyanjui525.github.io/Skylink-Households-and-Studio/ — it only works once the site is published at exactly that address.

## Photos
- **Household products:** put the photo in `assets/img/products/` and add the product to `assets/js/products.js` with `img: "assets/img/products/your-photo.jpg"`. It then appears in the catalogue, the category page, the Product Gallery and the "View Product" pop-up.
- **Studio portfolio:** put the photo in `assets/img/portfolio/` and add one line to `assets/js/portfolio.js` (see the note at the top of that file).
