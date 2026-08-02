document.addEventListener('DOMContentLoaded', function () {
  // Animate Header on page load
  const header = id => document.getElementById(id);
  if (header('main-header')) {
    header('main-header').classList.add('visible');
  }

  // Scroll reveal animation for sections
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach(section => {
    observer.observe(section);
  });
});