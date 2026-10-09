document.documentElement.classList.add('js');

// ── Les yeux : ils clignent, et les iris suivent le pointeur ──
const eyes = document.querySelector('svg.eyes');
if (eyes) {
  // Clignement : de temps en temps, et au clic.
  let nextBlink;
  function blink(scheduleNext) {
    clearTimeout(nextBlink);
    eyes.classList.remove('blink');
    void eyes.getBoundingClientRect(); // relance l'animation si elle vient de jouer
    eyes.classList.add('blink');
    if (scheduleNext) nextBlink = setTimeout(() => blink(true), 5000 + Math.random() * 5000);
  }
  setTimeout(() => blink(true), 1600);
  eyes.addEventListener('click', () => blink(true));

  // Regard : chaque iris se déplace vers le pointeur, dans les unités du dessin (viewBox 800 × 300).
  // L'œil droit est le gauche en miroir, donc son déplacement horizontal est inversé.
  const pupils = [
    { el: eyes.querySelector('#eye-l .pupil'), cx: 178, mirror: 1 },
    { el: eyes.querySelector('#eye-r .pupil'), cx: 622, mirror: -1 },
  ];
  const REACH = 42;      // déplacement maximal de l'iris
  const MAX_UP = -16;    // vers le haut, l'iris reste en partie sous la paupière
  const FULL_AT = 320;   // distance du pointeur (px écran) à laquelle le regard est au maximum

  document.addEventListener('pointermove', (e) => {
    const box = eyes.getBoundingClientRect();
    if (!box.width) return;
    const scale = box.width / 800;
    pupils.forEach((p) => {
      const dx = e.clientX - (box.left + p.cx * scale);
      const dy = e.clientY - (box.top + 140 * scale);
      const dist = Math.hypot(dx, dy) || 1;
      const amount = Math.min(1, dist / FULL_AT) * REACH;
      const x = (dx / dist) * amount * p.mirror;
      const y = Math.max(MAX_UP, (dy / dist) * amount);
      p.el.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    });
  });
}

// ── Apparition au défilement ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
}, { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ── Carrousels numérotés « 01 // 04 » ──
const pad = (n) => String(n).padStart(2, '0');
document.querySelectorAll('.carousel').forEach((root) => {
  const slides = [...root.querySelectorAll('.slide')];
  const counter = root.querySelector('.counter');
  let i = 0;
  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('on', k === i));
    counter.innerHTML = `<b>${pad(i + 1)}</b> // ${pad(slides.length)}`;
  }
  root.querySelector('.prev').addEventListener('click', () => show(i - 1));
  root.querySelector('.next').addEventListener('click', () => show(i + 1));
  show(0);
});

// ── Ouverture : les lettres du titre tombent une à une ──
const mark = document.querySelector('.hero .wordmark');
if (mark) {
  mark.innerHTML = mark.textContent.split(' ').map((word, w) =>
    [...word].map((ch, k) => `<span style="animation-delay:${0.15 + (w * 5 + k) * 0.06}s">${ch}</span>`).join('')
  ).join(' ');
}
