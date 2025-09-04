// Theme toggle
const htmlEl = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const saved = localStorage.getItem('theme');
if (saved) { htmlEl.setAttribute('data-theme', saved); }
else if (prefersDark) { htmlEl.setAttribute('data-theme', 'dark'); }
themeBtn?.addEventListener('click', () => {
  const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Reveal animation
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  })
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Copy link
function copyLink(ev) {
  ev.preventDefault();
  navigator.clipboard.writeText(window.location.href).then(() => {
    ev.target.textContent = 'Link copied!';
    setTimeout(() => ev.target.textContent = 'Copy Link', 1500)
  });
}
window.copyLink = copyLink;