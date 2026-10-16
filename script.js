(() => {
  const WA = '919787873480';
  const $ = (s) => document.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Typing effect
  const roles = ['Network Support Engineer', 'Cybersecurity Learner', 'Web Pentester', 'System Administrator'];
  const typed = $('#typed');
  let r = 0, c = 0, del = false;
  function tick() {
    const word = roles[r];
    typed.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 75);
  }
  if (reduce) typed.textContent = roles.join(' / '); else tick();

  // Mobile menu
  const burger = $('#burger'), menu = $('#menu');
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }
  });

  // Scroll progress + active link
  const bar = $('#progress');
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const sections = links.map((a) => $(a.getAttribute('href')));
  addEventListener('scroll', () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
    const y = scrollY + 120;
    links.forEach((a, i) => a.classList.toggle('active', sections[i] && sections[i].offsetTop <= y && sections[i].offsetTop + sections[i].offsetHeight > y));
  }, { passive: true });

  // Reveal on scroll (sections only)
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.sec').forEach((s) => { s.classList.add('reveal'); io.observe(s); });

  // Copy email
  const copyBtn = $('#copyMail');
  copyBtn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(copyBtn.dataset.copy); copyBtn.textContent = 'Email copied'; }
    catch { copyBtn.textContent = copyBtn.dataset.copy; }
    setTimeout(() => (copyBtn.textContent = 'Copy email'), 2200);
  });

  // Contact form -> WhatsApp
  $('#form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#fName').value.trim(), msg = $('#fMsg').value.trim();
    if (!name || !msg) { $('#err').textContent = 'Enter your name and a message to continue.'; return; }
    $('#err').textContent = '';
    const text = `Hi Prakalesh, I'm ${name}.\n\n${msg}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });

  $('#yr').textContent = new Date().getFullYear();
})();
