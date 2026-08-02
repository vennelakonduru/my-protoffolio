document.addEventListener('DOMContentLoaded', function () {
  // Fade in header on load
  const header = document.getElementById('main-header');
  if (header) {
    header.classList.add('visible');
  }

  // Scroll Reveal Observer for Sections
  const sections = document.querySelectorAll('section');
  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Active Link Highlight on Scroll
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 120) {
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

  // Handle Contact Form AJAX Submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          formStatus.style.display = 'block';
          formStatus.className = 'form-status success';
          formStatus.innerText = '✨ Message sent successfully! I will get back to you soon.';
          contactForm.reset();
        } else {
          formStatus.style.display = 'block';
          formStatus.className = 'form-status error';
          formStatus.innerText = json.message || 'Something went wrong. Please try again.';
        }
      })
      .catch(error => {
        formStatus.style.display = 'block';
        formStatus.className = 'form-status error';
        formStatus.innerText = 'Something went wrong. Please try again.';
      })
      .then(() => {
        submitBtn.innerText = 'Send Message';
        submitBtn.disabled = false;
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      });
    });
  }
});
