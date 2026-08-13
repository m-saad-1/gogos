/* ==========================================================================
   Banging Burgers - Centralized Site Configuration
   One source of truth for all images, links, and site data.
   ========================================================================== */

const BB_CONFIG = {

  /* ── Brand Info ─────────────────────────────────────────── */
  brand: {
    name: 'Banging Burgers',
    tagline: 'Flame-Grilled Authentic Flavors',
    instagram: 'https://www.instagram.com/bangingburgerscafe',
    phone: '+923001234567',
    phonePretty: '+92 300 123 4567',
    whatsapp: 'https://wa.me/923001234567',
    email: 'info@bangingburgerscafe.com',
    copyright: '© 2026 Banging Burgers. All rights reserved.',
  },

  /* ── Images (all relative to project root) ──────────────── */
  images: {
    logo:   'assets/images/logo.avif',
    hero:   'assets/images/hero.avif',
    offer:  'assets/images/offer.avif',

    /* Burgers */
    burger1: 'assets/images/burger (1).avif',
    burger2: 'assets/images/burger (2).avif',
    burger3: 'assets/images/burger (3).avif',
    burger4: 'assets/images/burger (4).avif',
    burgerPng: 'assets/images/burger.avif',

    /* Pizzas */
    pizza1: 'assets/images/pizza (1).avif',
    pizza2: 'assets/images/pizza (2).avif',
    pizza3: 'assets/images/pizza (3).avif',
    pizza4: 'assets/images/pizza (4).avif',

    /* Deals */
    deal1: 'assets/images/deal (1).avif',
    deal2: 'assets/images/deal (2).avif',
    deal4: 'assets/images/deal (4).avif',

    /* Chicken & Fries */
    chicken:  'assets/images/Chicken.avif',
    chicken2: 'assets/images/Chicken2.avif',
    chicken3: 'assets/images/Chicken3.avif',
    fries:    'assets/images/fries.avif',

    /* Drinks */
    drink1:    'assets/images/Drink (1).avif',
    drinkCola: 'assets/images/grocerapp-pepsi-drink--5f1815cc6dd00.avif',
    fanta:     'assets/images/fanta.avif',
    dew:       'assets/images/dew.avif',
    lemonade:  'assets/images/drink_lemonade_1786227586036.avif',

    /* Desserts */
    dessert1: 'assets/images/Dessert (1).avif',
    dessert2: 'assets/images/Dessert (2).avif',
    dessert4: 'assets/images/Dessert (4).avif',
    dessert:  'assets/images/Dessert.avif',

    /* Sauce */
    sauce:  'assets/images/sauce.avif',
    sauce1: 'assets/images/sauce1.avif',

    /* About Video */
    aboutVideo: 'assets/images/about.mp4',
  },

  /* ── Gallery ─────────────────────────────────────────────── */
  gallery: {
    images: [1,2,3,4,5,6,7].map(n => `assets/gallery/gallery (${n}).avif`),
    videos: [1,2,3].map(n => `assets/gallery/gallery (${n}).mp4`),
  },

  /* ── Opening Hours ───────────────────────────────────────── */
  hours: [
    { label: 'Lunch',        value: '11am to 4pm' },
    { label: 'Dinner',       value: '6:30pm to 12am' },
    { label: 'Special Deal', value: 'Fridays from 11am to 4pm' },
  ],

};

/* Make config globally accessible */
window.BB_CONFIG = BB_CONFIG;
