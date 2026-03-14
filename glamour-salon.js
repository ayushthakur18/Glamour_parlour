// ── Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ── Offer tabs
document.querySelectorAll('.offer-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.offer-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

// ── Modal system
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}
function closeOnOverlay(e, id) {
  if (e.target === document.getElementById(id)) closeModal(id);
}

// ── Toast
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Countdown Timer
function updateTimer() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 0);
  let diff = Math.max(0, Math.floor((end - now) / 1000));
  const h = Math.floor(diff / 3600).toString().padStart(2, '0');
  const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
  const s = (diff % 60).toString().padStart(2, '0');
  document.getElementById('t-h').textContent = h;
  document.getElementById('t-m').textContent = m;
  document.getElementById('t-s').textContent = s;
}
updateTimer();
setInterval(updateTimer, 1000);

// ── Before & After Slider
function setupBA(index) {
  const wrap = document.querySelector(`[data-ba="${index}"]`);
  const before = wrap.querySelector('.ba-before');
  const divider = document.getElementById(`baDivider${index}`);
  let dragging = false;

  function setPos(pct) {
    pct = Math.max(5, Math.min(95, pct));
    before.style.clipPath = `inset(0 ${100-pct}% 0 0)`;
    divider.style.left = pct + '%';
  }

  divider.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
  divider.addEventListener('touchstart', e => { dragging = true; e.preventDefault(); }, { passive: false });

  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const rect = wrap.getBoundingClientRect();
    setPos(((e.clientX - rect.left) / rect.width) * 100);
  });
  document.addEventListener('touchmove', e => {
    if (!dragging) return;
    const rect = wrap.getBoundingClientRect();
    setPos(((e.touches[0].clientX - rect.left) / rect.width) * 100);
  }, { passive: true });
  document.addEventListener('mouseup', () => { dragging = false; });
  document.addEventListener('touchend', () => { dragging = false; });
}
[0, 1, 2].forEach(setupBA);

// ── Instagram follow button
document.querySelector('.ig-follow-big').addEventListener('click', function() {
  this.textContent = this.textContent === 'Follow' ? '✓ Following' : 'Follow';
  this.style.background = this.textContent === '✓ Following' ? '#eee' : '#0095f6';
  this.style.color = this.textContent === '✓ Following' ? '#333' : 'white';
});

// ── Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .offer-card, .ba-card, .team-card, .testi-card, .social-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});