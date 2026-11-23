document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  const hero = document.querySelector('.hero');
  if (!hero) return;
  // Full scene is the default. ?scene=simple previews tree + aurora without changing content.
  if (new URLSearchParams(location.search).get('scene') === 'simple') hero.classList.add('scene-simple');
  const scene = document.createElement('div');
  scene.className = 'bg-studio';
  scene.setAttribute('aria-hidden', 'true');
  scene.innerHTML = `<div class="bg-aurora"></div><div class="bg-depth">
    <div class="bg-particles"><svg viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid slice"><g><line x1="760" y1="85" x2="870" y2="130"/><line x1="870" y1="130" x2="965" y2="60"/><line x1="1120" y1="450" x2="1240" y2="510"/><line x1="1240" y1="510" x2="1320" y2="415"/><line x1="680" y1="570" x2="780" y2="510"/></g><g><circle cx="760" cy="85" r="2"/><circle cx="870" cy="130" r="2.2" style="--delay:-3s"/><circle cx="965" cy="60" r="1.6" style="--delay:-7s"/><circle cx="1120" cy="450" r="2"/><circle cx="1240" cy="510" r="2" style="--delay:-4s"/><circle cx="1320" cy="415" r="1.8"/><circle cx="680" cy="570" r="1.6"/><circle cx="780" cy="510" r="2" style="--delay:-6s"/><circle cx="1080" cy="270" r="1.5"/><circle cx="1360" cy="180" r="2" style="--delay:-9s"/></g></svg></div>
    <div class="bg-tree"><svg viewBox="0 0 360 205"><path d="M180 39V62H94V84M180 62H271V84M94 114V137H47V159M94 137H143V159M271 114V159"/><g class="tree-node"><rect x="129" y="10" width="102" height="29" rx="7"/><text x="180" y="25">Scaffold</text></g><g class="tree-node" style="--delay:-2s"><rect x="45" y="84" width="98" height="30" rx="7"/><text x="94" y="100">Column</text></g><g class="tree-node" style="--delay:-4s"><rect x="222" y="84" width="98" height="30" rx="7"/><text x="271" y="100">AppBar</text></g><g class="tree-node" style="--delay:-6s"><rect x="8" y="159" width="78" height="29" rx="7"/><text x="47" y="175">Text</text></g><g class="tree-node" style="--delay:-3s"><rect x="104" y="159" width="78" height="29" rx="7"/><text x="143" y="175">Row</text></g><g class="tree-node" style="--delay:-5s"><rect x="232" y="159" width="78" height="29" rx="7"/><text x="271" y="175">Icon</text></g></svg></div>
    <div class="bg-phone"></div><div class="bg-terminal"><div class="bg-terminal-label">FLUTTER / TERMINAL</div><div class="bg-terminal-line"><span class="bg-terminal-command">flutter run</span><i class="bg-terminal-caret"></i></div><div class="bg-terminal-status">Ready for hot reload.</div></div>
  </div><div class="bg-reload"></div>`;
  hero.prepend(scene);
  const frames = ['.gallery-weather img', '.gallery-travel img', '.gallery-todo img'].map(selector => document.querySelector(selector)).filter(Boolean);
  const phone = scene.querySelector('.bg-phone');
  frames.forEach((source, index) => {
    const img = document.createElement('img');
    img.src = source.src;
    img.alt = '';
    img.decoding = 'async';
    if (!index) img.className = 'active';
    phone.append(img);
  });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const command = scene.querySelector('.bg-terminal-command');
  const status = scene.querySelector('.bg-terminal-status');
  let visible = true, timer, frame = 0, step = 0, letter = 0, typing = false;
  const commands = ['flutter run', 'flutter build apk', 'flutter run --release'];
  function active() { return visible && !document.hidden && !reduced.matches && !hero.classList.contains('scene-simple'); }
  function queue(delay) { clearTimeout(timer); if (active()) timer = setTimeout(tick, delay); }
  function tick() {
    if (!active()) return;
    if (typing) {
      command.textContent = commands[step].slice(0, ++letter);
      if (letter < commands[step].length) { queue(80); return; }
      typing = false;
      status.textContent = step === 1 ? 'Build complete.' : 'Ready for hot reload.';
      queue(7500);
      return;
    }
    const imgs = phone.querySelectorAll('img');
    if (imgs.length) { imgs[frame].classList.remove('active'); frame = (frame + 1) % imgs.length; imgs[frame].classList.add('active'); }
    scene.classList.remove('reloading');
    requestAnimationFrame(() => { if (active()) scene.classList.add('reloading'); });
    step = (step + 1) % commands.length;
    letter = 0; typing = true;
    command.textContent = ''; status.textContent = 'Connecting to device...';
    queue(80);
  }
  function sync() {
    clearTimeout(timer);
    const paused = !visible || document.hidden || reduced.matches;
    hero.classList.toggle('scene-paused', paused);
    if (reduced.matches) {
      command.textContent = 'flutter run'; status.textContent = 'Ready for hot reload.';
      hero.style.removeProperty('--scene-x'); hero.style.removeProperty('--scene-y');
      phone.querySelectorAll('img').forEach((img, i) => img.classList.toggle('active', i === 0));
      frame = 0; typing = false;
    }
    queue(7500);
  }
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }).observe(hero);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  hero.addEventListener('pointermove', event => {
    if (!active() || !finePointer.matches) return;
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--scene-x', ((event.clientX - rect.left) / rect.width - .5) * 9 + 'px');
    hero.style.setProperty('--scene-y', ((event.clientY - rect.top) / rect.height - .5) * 7 + 'px');
  }, {passive: true});
  hero.addEventListener('pointerleave', () => { hero.style.removeProperty('--scene-x'); hero.style.removeProperty('--scene-y'); });
  sync();
});
