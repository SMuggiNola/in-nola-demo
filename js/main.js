document.addEventListener('DOMContentLoaded', () => {
  // 1. Fetch and inject the header
  fetch('/header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Could not fetch header.html');
      }
      return response.text();
    })
    .then(data => {
      const headerPlaceholder = document.getElementById('main-header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
        // After injecting the header, set the active link
        setActiveNavLink();
      }
    })
    .catch(error => {
      console.error('Error injecting header:', error);
    });

  // 2. Set the active navigation link
  function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname;

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      // Check if the link's path is a parent of the current page's path
      // This will highlight "Our Village" even on sub-pages
      if (currentPage.startsWith(linkPath) && linkPath !== '/') {
        link.classList.add('active');
      }
      // Handle the home page specifically
      else if (currentPage === '/' && linkPath === '/index.html') {
        link.classList.add('active');
      }
    });
  }
  
  // 3. Fade in main content
  const mainContent = document.getElementById('main-content');
  if (mainContent) {
    // The splash screen animation is 2.8s in the CSS on the home page.
    // For other pages, we can fade in faster.
    const isHomePage = document.body.id === 'landing';
    const fadeInDelay = isHomePage ? 2000 : 100; // 2s for home, 100ms for others

    setTimeout(() => {
      mainContent.classList.add('fade-in');
    }, fadeInDelay);
  }

  // 4. Event card toggle logic
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.classList.contains('more-btn')) return;
      
      // Toggle the 'open' class on the card itself
      card.classList.toggle('open');
      
      // Toggle the +/- symbol
      const symbol = card.querySelector('.event-header span:last-child');
      if (symbol) {
        symbol.textContent = card.classList.contains('open') ? '-' : '+';
      }
    });
  });
});

