document.addEventListener('DOMContentLoaded', function () {
  // 1. Fade in the header on initial page load
  const header = document.getElementById('main-header');
  if (header) {
    header.classList.add('visible');
  }

  // 2. Scroll Reveal Observer for Sections
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // 3. Navbar Smooth Scroll Active Link Highlight
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (current && link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});
