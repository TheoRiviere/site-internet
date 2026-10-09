document.documentElement.classList.add('js');

// ── Les yeux qui clignent (toutes les images .eyes de la page) ──
const FRAMES = [0, 1, 2].map((n) => `images/crime-night-eyes-${n}.png`);
const SEQUENCE = [0, 1, 2, 1, 0];
const TIMING = [0, 60, 80, 60, 90];
FRAMES.forEach((src) => { new Image().src = src; });

document.querySelectorAll('img.eyes').forEach((img) => {
  let blinking = false;
  let nextBlink;
  function playBlink(scheduleNext) {
    if (blinking) return;
    blinking = true;
    clearTimeout(nextBlink);
    let step = 0;
    (function tick() {
      if (step >= SEQUENCE.length) {
        blinking = false;
        if (scheduleNext) nextBlink = setTimeout(() => playBlink(true), 5000 + Math.random() * 5000);
        return;
      }
      img.src = FRAMES[SEQUENCE[step]];
      setTimeout(tick, TIMING[step]);
      step++;
    })();
  }
  setTimeout(() => playBlink(true), 1600);
  img.addEventListener('click', () => playBlink(false));
});

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