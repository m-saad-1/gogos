### Refined Prompt

Implement the following **mobile-focused improvements** while preserving existing functionality and maintaining a polished, professional restaurant website. Also apply the explicitly mentioned page-wide changes consistently.

### Mobile

1. **Bottom Navigation**

   * Detach the bottom navigation bar slightly from the bottom and side edges.
   * Give the left and right sides rounded/circular corners.
   * Keep it centered and visually polished.

2. **Header**

   * Move the notification icon closer to the Cart icon so the spacing feels natural and compact.

3. **Search Bar**

   * Make the Menu page search bar **exactly match the Homepage search bar** in design, dimensions, position, spacing, and behavior.
   * Keep its position consistent when switching between pages.
   * Remove the different internal color that appears when the search field is focused/clicked.
   * Make the search bar fully functional.

4. **Contact Section**

   * Make the Phone and Email icons square.
   * Place the icons properly inside their respective cards.
   * Make the contact cards use the full available width, reaching close to the right edge with only a small margin.

5. **Hero Carousel**

   * Make the three hero images cycle **infinitely in the same direction** without reversing.
   * Allow users to change images by clicking/tapping.
   * Keep automatic transitions smooth and responsive.

6. **Google Reviews**

   * Add a professional **Google Reviews** section to the Homepage.
   * Display review cards in a single horizontal row.
   * Make the cards horizontally scrollable/swipeable on mobile.
   * Include appropriate rating, reviewer name, review content, and Google branding where applicable.

7. **Homepage Menu Categories**

   * Use the same category-navigation concept as `web_development/PontoBR_Restaurant`.
   * On mobile scrolling:

     * Make the category bar sticky directly against the header with **no gap**.
     * Once it becomes sticky, hide the category circle images and keep only the category names/buttons.
   * Ensure the transition is smooth and does not cause layout jumps.

8. **AI Chatbot**

   * Redesign the chatbot to match the functionality and interaction style of `web_development/Manjares_burger`.
   * Preserve the current restaurant's branding, content, and functionality.
   * Ensure it works correctly on mobile and desktop.

### About Page

9. **Complete About Page**

   * Redesign the About page into a complete, professional restaurant page.
   * Add relevant sections and features such as:

     * Restaurant story
     * Why choose us
     * Delivery information
     * Takeaway information and estimated times
     * Restaurant/contact information
     * Social media
     * Location/opening hours
     * Any other useful restaurant information
   * Keep the content relevant to the current restaurant and remove irrelevant/old information.

### Header Contact

10. **Contact Icon**

* Add a dedicated Contact icon to the header.
* Clicking it should open a professional contact modal containing:

  * Phone
  * Email
  * WhatsApp
  * Direct call action
  * Direct email action
* Ensure the modal is responsive and easy to use on mobile.

### Menu & Search

11. **Functional Search**

* Make the search bar fully functional.
* Search should filter menu items accurately and update results instantly.

12. **Menu Item Modal**

* Clicking a menu item should open a complete, professionally designed modal.
* Include:

  * Large item image
  * Item name
  * Full description
  * Price
  * Category
  * Available options/add-ons where applicable
  * Quantity selector
  * Add to Cart button
* Ensure the modal works properly on mobile.

### Contact & FAQ

13. **Contact Content**

* Update all Contact Us information to accurately represent the current restaurant.
* Translate any remaining Portuguese text into **English** across the Contact section and website.
* Ensure there is no Portuguese text left anywhere in the UI.

14. **FAQ**

* Redesign and organize the FAQ section professionally.
* Ensure questions and answers are clear, relevant, and properly structured.

### Cart & Pricing

15. **View Cart Box**

* Fix the View Cart floating/summary box.
* Ensure the item count, individual prices, quantities, subtotal, and total are calculated correctly.
* Only actual cart items should contribute to the displayed total.

### Profile & Orders

16. **Consistent Chatbot & Cart**

* Make the chatbot and View Cart box behave consistently on the **Profile** and **Orders** pages.
* Keep their positioning, visibility, and interactions consistent with the rest of the website.
* On the About page, replace the current **About** icon in the bottom navigation with a **Profile** icon.

17. **Cart Page**

* Use `web_development/amoreo` as a **styling and UX reference** for the Cart page.
* Do not copy its branding/theme.
* Keep the current restaurant's design language.
* Implement a complete but simple checkout flow:

  * Cart review
  * Quantity updates
  * Remove item
  * Subtotal
  * Delivery/service charges where applicable
  * Final total
  * Customer details
  * Order confirmation
* Ensure all calculations and checkout logic are correct.

18. **Orders Page**

* Keep the existing demo orders.
* Improve the order cards, structure, typography, and mobile responsiveness.
* Correct all displayed prices, quantities, subtotals, and totals.
* Ensure the order information is internally consistent.

### Profile Page

19. **Profile Page**

* Use `web_development/amoreo` as the **styling/UX reference only**.
* Do not copy its theme or branding.
* Improve the Profile page structure, cards, spacing, typography, and mobile experience while maintaining the current restaurant branding.

### Homepage Contact

20. **Contact Form & Map**

* Make the Homepage Contact form **exactly match the Contact page form** in structure, styling, fields, and behavior.
* Move the Google Map directly below the **Location** card.
* Ensure the map, cards, and form are properly aligned and responsive.

### Global Spacing

21. **Section Spacing**

* Reduce excessive vertical gaps throughout the entire website.
* Use a consistent, compact spacing system between sections.
* Keep enough breathing room for readability without leaving large empty spaces.
* Check all pages on both mobile and desktop and remove unnecessary spacing.

### Final Requirement

After implementation, perform a **complete functional and responsive audit**. Check navigation, search, menu filtering, menu modals, cart calculations, checkout, orders, profile, contact modal, chatbot, sticky category navigation, hero carousel, forms, reviews, and all page layouts.

Do not leave partially implemented features, incorrect calculations, broken interactions, inconsistent styling, or untranslated text.
