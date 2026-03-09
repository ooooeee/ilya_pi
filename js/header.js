/**
 * Header behavior:
 * - Full header visible on hero section
 * - After scrolling past hero → header hides, burger button appears
 * - On pages without hero (cases.html, case-detail.html) → burger always visible
 * - Burger click → slide-in menu panel from right
 */

const Header = (() => {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuPanel = document.getElementById('menuPanel');
  const menuClose = document.getElementById('menuClose');
  const hero = document.getElementById('hero');

  let isMenuOpen = false;

  function init() {
    if (!burger || !menuPanel) return;

    // If no hero section (e.g. cases page), show burger immediately
    if (!hero) {
      showBurger();
      if (header) header.classList.add('header--hidden');
    } else {
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Burger click
    burger.addEventListener('click', openMenu);

    // Close menu
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    // Close on nav link click
    const menuLinks = menuPanel.querySelectorAll('.menu-panel__link');
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on CTA click
    const menuCta = menuPanel.querySelector('.menu-panel__cta');
    if (menuCta) menuCta.addEventListener('click', closeMenu);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) closeMenu();
    });
  }

  function handleScroll() {
    if (!hero || !header) return;

    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY > heroBottom - 100) {
      header.classList.add('header--hidden');
      showBurger();
    } else {
      header.classList.remove('header--hidden');
      hideBurger();
    }
  }

  function showBurger() {
    if (burger) burger.classList.add('burger--visible');
  }

  function hideBurger() {
    if (burger) burger.classList.remove('burger--visible');
  }

  function openMenu() {
    isMenuOpen = true;
    menuPanel.classList.add('menu-panel--active');
    if (menuOverlay) menuOverlay.classList.add('menu-overlay--active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    isMenuOpen = false;
    menuPanel.classList.remove('menu-panel--active');
    if (menuOverlay) menuOverlay.classList.remove('menu-overlay--active');
    document.body.style.overflow = '';
  }

  return { init };
})();
