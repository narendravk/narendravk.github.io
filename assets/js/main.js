document.getElementById('contactForm').addEventListener('submit', submitForm);
function submitForm(e) {
  e.preventDefault();
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const msg     = document.getElementById('fmessage').value.trim();
  if (!name || !email || !msg) { alert('Please fill in the required fields.'); return; }

  const btn = document.querySelector('.form-submit');
  btn.disabled = true;
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2.5" stroke-linecap="round"
         style="animation: spin .7s linear infinite; flex-shrink:0">
      <path d="M12 2a10 10 0 0 1 10 10"/>
    </svg>
    Sending…
  `;

  const form     = document.getElementById('contactForm');
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
  .then(() => {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    form.reset();
  })
  .catch(() => {
    btn.disabled = false;
    btn.innerHTML = 'Send Message ✦';
    alert('Something went wrong. Please try again.');
  });
}


 /* ── TYPEWRITER ── */
  const phrases = [
    "Civil Engineer → Full Stack Dev",
    "Python by heart.",
    "Building construction-tech.",
    "Automating the site office.",
  ];
  let pi = 0, ci = 0, deleting = false;
  const tw = document.getElementById('typewriter');
  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      tw.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      tw.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 40 : 65);
  }
  type();

  /* ── SCROLL BAR ── */
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    document.getElementById('scrollBar').style.width = pct + '%';
  });

  /* ── FADE UP OBSERVER ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  /* ── SKILL BARS ── */
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.pct + '%';
        });
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skills-grid').forEach(el => skillObs.observe(el));


  /* ── HAMBURGER ── */
  document.getElementById('hamburger').addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '60px'; links.style.left = 0; links.style.right = 0;
    links.style.background = 'var(--navy-mid)'; links.style.padding = '1.5rem 2rem';
    links.style.borderBottom = '1px solid var(--navy-border)';
  });