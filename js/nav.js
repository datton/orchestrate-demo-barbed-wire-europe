// nav behaviour: ui/ux. Marks the current page and adds a phone menu button.
(function () {
  var root = document.documentElement;
  var nav = document.querySelector('.site-header nav');
  if (!nav) return;
  root.classList.add('js');

  var here = location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
  nav.querySelectorAll('a').forEach(function (a) {
    var p = a.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
    if (p === here) a.setAttribute('aria-current', 'page');
  });

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nav-toggle';
  btn.textContent = 'Menu';
  nav.id = nav.id || 'site-nav';
  btn.setAttribute('aria-controls', nav.id);
  btn.setAttribute('aria-expanded', 'false');
  nav.parentNode.insertBefore(btn, nav);
  nav.setAttribute('data-collapsed', 'true');

  function set(open) {
    btn.setAttribute('aria-expanded', String(open));
    nav.setAttribute('data-collapsed', String(!open));
  }
  btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); }
  });
})();
