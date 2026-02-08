/* ===== Mobile nav toggle (button inserted so you don't edit HTML) ===== */
(function initMobileNav(){
  const nav = document.querySelector('.navbar');
  const links = document.querySelector('.nav-links');
  if(!nav || !links) return;

  const btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-label','Toggle navigation');
  btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  nav.insertBefore(btn, links);

  btn.addEventListener('click', ()=> links.classList.toggle('open'));

  // close on link click (mobile)
  links.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> links.classList.remove('open'));
  });
})();

/* ===== Scroll progress bar & Back-to-top ===== */
(function initScrollUI(){
  const bar = document.createElement('div');
  bar.className = 'progress';
  document.body.appendChild(bar);

  const toTop = document.createElement('div');
  toTop.className = 'to-top';
  toTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(toTop);
  toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  const onScroll = ()=>{
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
    if(window.scrollY > 300) toTop.classList.add('show'); else toTop.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();

/* ===== Reveal on scroll (IntersectionObserver) ===== */
(function initReveal(){
  const revealables = [];
  // Mark big sections & cards
  document.querySelectorAll(
    'section, .skill-card, .soft-skills, .skill-soft, .profile-img'
  ).forEach(el=>{
    el.classList.add('reveal');
    revealables.push(el);
  });

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        // Optionally unobserve after shown
        io.unobserve(entry.target);
      }
    });
  }, {threshold:.15});

  revealables.forEach(el=> io.observe(el));
})();

/* ===== Active nav link while scrolling ===== */
(function initActiveNav(){
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = document.querySelectorAll('.nav-links a');
  if(!sections.length || !navLinks.length) return;

  const map = new Map(sections.map(s => [s.id, s]));
  const highlight = ()=>{
    let current = sections[0].id;
    sections.forEach(sec=>{
      const top = sec.getBoundingClientRect().top;
      if(top <= 120) current = sec.id;
    });
    navLinks.forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', highlight, {passive:true});
  highlight();
})();

/* ===== Subtle parallax for hero image ===== */
(function initParallax(){
  const img = document.querySelector('.profile-img');
  if(!img) return;
  window.addEventListener('scroll', ()=>{
    const y = Math.min(20, window.scrollY / 30); // cap translate
    img.style.transform = `translateY(${y}px)`;
  }, {passive:true});
})();
