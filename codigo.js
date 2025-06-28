document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');

  const show = id => {
    sections.forEach(s =>
      s.classList.toggle('active', s.id === id)
    );
    links.forEach(l =>
      l.classList.toggle('active', l.dataset.section === id)
    );
    history.replaceState(null, null, `#${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // clique nos links
  links.forEach(link =>
    link.addEventListener('click', e => {
      e.preventDefault();
      show(link.dataset.section);
    })
  );

  // quando muda o hash (back/forward)
  window.addEventListener('hashchange', () =>
    show(location.hash.slice(1) || 'sobre')
  );

  // inicia na seção certa
  show(location.hash.slice(1) || 'sobre');

  // navegação por teclado
  document.addEventListener('keydown', e => {
    const arrows = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
    if (!arrows.includes(e.key)) return;
    e.preventDefault();
    const active = [...sections].find(s => s.classList.contains('active'));
    if (!active) return;
    let idx = [...sections].indexOf(active);
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
    idx = (idx + dir + sections.length) % sections.length;
    show(sections[idx].id);
  });
});
