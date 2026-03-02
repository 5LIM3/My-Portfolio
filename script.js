// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ──
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = +e.target.dataset.count;
      const suffix = e.target.dataset.suffix || '';
      let count = 0;
      const step = target / 60;
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          e.target.textContent = target + suffix;
          clearInterval(interval);
        } else {
          e.target.textContent = Math.floor(count) + suffix;
        }
      }, 20);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--red)' : '';
  });
});

// ── FORM SUBMIT ──
async function handleSubmit(btn) {
  const data = {
    name: document.getElementById('contact-name').value,
    email: document.getElementById('contact-email').value,
    subject: document.getElementById('contact-subject').value,
    budget: document.getElementById('contact-budget').value,
    message: document.getElementById('contact-message').value
  };

  if (!data.name || !data.email || !data.message) {
    alert('Please fill in Name, Email and Message');
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch('https://fivelim3stackdevs-backend.onrender.com/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#00aa44';
      btn.style.boxShadow = '0 0 20px rgba(0,170,68,0.4)';
    } else {
      btn.textContent = 'Failed. Try Again';
      btn.style.background = '#aa0000';
    }
  } catch (err) {
    btn.textContent = 'Error. Try Again';
    btn.style.background = '#aa0000';
  }

  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.style.boxShadow = '';
    btn.disabled = false;
  }, 3000);
}

// ── NAVBAR SCROLL STYLE ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(3,0,0,0.98)';
    nav.style.boxShadow = '0 2px 20px rgba(255,26,26,0.1)';
  } else {
    nav.style.background = 'rgba(3,0,0,0.9)';
    nav.style.boxShadow = '';
  }
});
