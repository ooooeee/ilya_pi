/**
 * App initialization
 * Detects current page and initializes relevant modules
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize header / burger menu on all pages
  Header.init();

  // Initialize animations (if module exists on this page)
  if (typeof Animations !== 'undefined') {
    Animations.init();
  }

  // Initialize services module on homepage
  if (typeof Services !== 'undefined') {
    Services.init();
  }

  // Detect page and initialize relevant modules
  const path = window.location.pathname;

  if (path.includes('case-detail')) {
    // Case detail page
    CaseDetail.init();
  } else if (path.includes('cases')) {
    // Cases listing page
    Cases.initCasesPage();
  } else {
    // Homepage (index or root)
    Cases.initHomepage();
  }
});
