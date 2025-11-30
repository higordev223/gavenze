// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburgerMenu && mobileMenu) {
    hamburgerMenu.addEventListener('click', function() {
      hamburgerMenu.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link (but not language items)
    const mobileMenuLinks = mobileMenu.querySelectorAll('a.mobile-menu-link');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Initialize language selectors
  initLanguageSelector();
});

function initLanguageSelector() {
  const langSelectors = document.querySelectorAll('.lang-selector');

  langSelectors.forEach(selector => {
    const toggle = selector.querySelector('.lang-toggle');
    const dropdown = selector.querySelector('.lang-dropdown');
    const items = selector.querySelectorAll('.lang-item');

    if (!toggle || !dropdown) return;

    // Toggle dropdown on button click
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Close other dropdowns first
      document.querySelectorAll('.lang-selector.open').forEach(openSelector => {
        if (openSelector !== selector) {
          openSelector.classList.remove('open');
        }
      });

      // Toggle current dropdown
      selector.classList.toggle('open');
    });

    // Handle language selection
    items.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const lang = this.getAttribute('data-lang');
        const flagSrc = this.getAttribute('data-flag');
        const langText = this.querySelector('span').textContent;

        // Update all language selectors
        updateAllLanguageSelectors(lang, flagSrc, langText);

        // Close the dropdown
        selector.classList.remove('open');
      });
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.lang-selector')) {
      document.querySelectorAll('.lang-selector.open').forEach(selector => {
        selector.classList.remove('open');
      });
    }
  });

  // Close dropdown on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.lang-selector.open').forEach(selector => {
        selector.classList.remove('open');
      });
    }
  });
}

function updateAllLanguageSelectors(lang, flagSrc, langText) {
  document.querySelectorAll('.lang-selector').forEach(selector => {
    // Update toggle button display
    const toggle = selector.querySelector('.lang-toggle');
    const toggleFlag = toggle.querySelector('.flag-icon');
    const toggleText = toggle.querySelector('.lang-current');

    if (toggleFlag) toggleFlag.src = flagSrc;
    if (toggleText) toggleText.textContent = langText;

    // Update active state on items
    const items = selector.querySelectorAll('.lang-item');
    items.forEach(item => {
      if (item.getAttribute('data-lang') === lang) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });

  // Store selection in localStorage
  localStorage.setItem('selectedLanguage', lang);
}
