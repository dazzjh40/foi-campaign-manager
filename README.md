# FOI Campaign Manager — landing site

Static marketing/landing site for the FOI Campaign Manager product. Plain HTML and
CSS, no build step. Intended to be published on GitHub Pages under its own domain,
kept separate from the Optima Consulting site (per the product's keep-separate
decision).

## Files
- `index.html` — single-page landing (hero, features, who it is for, pricing, register interest)
- `privacy.html`, `terms.html`, `accessibility.html` — draft legal/accessibility stubs
- `css/style.css` — styles (accessibility-minded: contrast, focus, relative units, responsive)
- `robots.txt`

## Before publishing
1. Decide the product name and domain (still open). Replace the "working title" wording.
2. Set the register-interest form: replace the Formspree `action` in `index.html`
   (`https://formspree.io/f/REPLACE_ME`) with a real endpoint, or swap for a Zoho/Google form.
3. Complete the privacy, terms, and accessibility pages.
4. Add a `CNAME` file containing the chosen domain when ready for the custom domain.

## Preview locally
Open `index.html` in a browser, or run `python -m http.server` in this folder and
visit http://localhost:8000.

## Publish to GitHub Pages
Create a new empty GitHub repo (for example `foi-campaign-manager`), then from this
folder:

    git init
    git add .
    git commit -m "Initial landing site"
    git branch -M main
    git remote add origin https://github.com/<you>/<repo>.git
    git push -u origin main

Then enable Pages in the repo settings (deploy from `main`, root).
