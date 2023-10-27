/*
	Geral
*/

$(document).ready(function () {
  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems, {});

  elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems, {});
});
