// Manufacturers page: filter by country and search by name
(function () {
  var list = document.getElementById('maker-list');
  if (!list) return;
  var select = document.getElementById('country-filter');
  var search = document.getElementById('name-search');
  var status = document.getElementById('filter-status');
  var none = document.getElementById('no-results');
  var items = Array.prototype.slice.call(list.querySelectorAll('.maker'));

  var countries = [];
  items.forEach(function (li) {
    var c = li.getAttribute('data-country');
    if (countries.indexOf(c) === -1) countries.push(c);
  });
  countries.sort().forEach(function (c) {
    var o = document.createElement('option');
    o.value = c;
    o.textContent = c;
    select.appendChild(o);
  });

  function apply() {
    var country = select.value;
    var q = search.value.trim().toLowerCase();
    var shown = 0;
    items.forEach(function (li) {
      var ok = (!country || li.getAttribute('data-country') === country) &&
               (!q || li.getAttribute('data-name').toLowerCase().indexOf(q) !== -1);
      li.hidden = !ok;
      if (ok) shown++;
    });
    none.hidden = shown !== 0;
    status.textContent = 'Showing ' + shown + ' of ' + items.length + ' manufacturers.';
  }
  select.addEventListener('change', apply);
  search.addEventListener('input', apply);
  apply();
})();
