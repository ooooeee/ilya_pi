/**
 * Cases Module
 * - Renders case cards on homepage (limited to CASES_LIMIT)
 * - Renders all cases on cases.html with category filter
 * - Categories are auto-generated from data
 */

const Cases = (() => {
  const CASES_LIMIT = 6; // Number of cases shown on homepage

  // Category display names (add new categories here)
  const CATEGORY_LABELS = {
    all: 'Все',
    design: 'Дизайн',
    marketing: 'Маркетинг',
    web: 'Сайты',
    digital: 'Digital',
    layout: 'Верстка',
    cms: 'CMS системы'
  };

  /**
   * Render case cards into a container
   */
  function renderCases(cases, container) {
    if (!container) return;
    container.innerHTML = cases.map(c => createCardHTML(c)).join('');
  }

  /**
   * Create HTML for a single case card
   */
  function createCardHTML(caseItem) {
    const tagsHTML = caseItem.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');

    const imageHTML = caseItem.image
      ? `<img src="${caseItem.image}" alt="${caseItem.title}" loading="lazy">`
      : `<div class="case-card__placeholder">${caseItem.title.substring(0, 2)}</div>`;

    return `
      <a href="case-detail.html?id=${caseItem.id}" class="case-card">
        <div class="case-card__image">
          ${imageHTML}
        </div>
        <div class="case-card__body">
          <div class="case-card__tags">${tagsHTML}</div>
          <h3 class="case-card__title">${caseItem.title}</h3>
          <p class="case-card__description">${caseItem.description}</p>
        </div>
      </a>
    `;
  }

  /**
   * Initialize cases on the homepage (limited number)
   */
  function initHomepage() {
    const grid = document.getElementById('casesGrid');
    if (!grid) return;

    const limitedCases = CASES_DATA.slice(0, CASES_LIMIT);
    renderCases(limitedCases, grid);
  }

  /**
   * Initialize cases page with filter
   */
  function initCasesPage() {
    const grid = document.getElementById('casesPageGrid');
    const filterContainer = document.getElementById('casesFilter');
    if (!grid) return;

    // Extract unique categories from data
    const categories = ['all', ...new Set(CASES_DATA.map(c => c.category))];

    // Render filter buttons
    if (filterContainer) {
      filterContainer.innerHTML = categories
        .map((cat, index) => {
          const label = CATEGORY_LABELS[cat] || cat;
          const activeClass = index === 0 ? ' cases-filter__btn--active' : '';
          return `<button class="cases-filter__btn${activeClass}" data-category="${cat}">${label}</button>`;
        })
        .join('');

      // Filter click handler
      filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.cases-filter__btn');
        if (!btn) return;

        // Update active state
        filterContainer.querySelectorAll('.cases-filter__btn').forEach(b => {
          b.classList.remove('cases-filter__btn--active');
        });
        btn.classList.add('cases-filter__btn--active');

        // Filter cases
        const category = btn.dataset.category;
        const filtered = category === 'all'
          ? CASES_DATA
          : CASES_DATA.filter(c => c.category === category);

        renderCases(filtered, grid);
      });
    }

    // Initial render — all cases
    renderCases(CASES_DATA, grid);
  }

  return { initHomepage, initCasesPage };
})();
