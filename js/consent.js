/**
 * consent.js: minimal cookie-consent gate for Google Analytics (GA4).
 *
 * SETUP REQUIRED:
 * 1. Create a GA4 property at analytics.google.com and copy its Measurement ID
 *    (looks like "G-XXXXXXXXXX", this is not secret, it's visible in every page's
 *    source once live, so it's fine to paste directly here).
 * 2. Replace GA_MEASUREMENT_ID below with that real ID.
 *
 * Behaviour: analytics does NOT load at all until the visitor clicks "Accept."
 * Their choice is remembered in localStorage so the banner only shows once.
 * "Cookie settings" in the footer clears that choice so they can change their mind.
 */
(function () {
  var GA_MEASUREMENT_ID = "G-Z7M8NS01E5";
  var CONSENT_KEY = "foid_analytics_consent";

  function loadAnalytics() {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf("XXXX") !== -1) {
      console.warn("GA_MEASUREMENT_ID not set in js/consent.js, analytics will not load.");
      return;
    }
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function hideBanner() {
    var el = document.getElementById("cookie-banner");
    if (el) el.remove();
  }

  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
    hideBanner();
    if (value === "accepted") loadAnalytics();
  }

  function showBanner() {
    if (document.getElementById("cookie-banner")) return;
    var banner = document.createElement("div");
    banner.id = "cookie-banner";
    banner.className = "cookie-banner";
    banner.innerHTML =
      '<p>We use Google Analytics to understand site traffic. It only runs if you accept, and no data is sold or shared beyond that. See our <a href="data-handling.html">data handling page</a>.</p>' +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="btn btn-ghost" id="cookie-decline">Decline</button>' +
      '<button type="button" class="btn" id="cookie-accept">Accept</button>' +
      "</div>";
    document.body.appendChild(banner);
    document.getElementById("cookie-accept").addEventListener("click", function () { setConsent("accepted"); });
    document.getElementById("cookie-decline").addEventListener("click", function () { setConsent("declined"); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") { loadAnalytics(); }
    else if (stored !== "declined") { showBanner(); }

    // "Cookie settings" link in the footer re-opens the banner, regardless of
    // whatever choice (if any) was made previously.
    var settingsLink = document.getElementById("cookie-settings");
    if (settingsLink) {
      settingsLink.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem(CONSENT_KEY);
        showBanner();
      });
    }
  });
})();
