/*
	Geral
*/
$(document).ready(function () {
  $("#footer").load("/app/footer.html");
  $("#menu").load("/app/menu.html");

  window.setTimeout(function () {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems, {});

    elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems, {});

    elems = document.querySelectorAll(".modal");
    M.Modal.init(elems, {});
  }, 1000);
});
