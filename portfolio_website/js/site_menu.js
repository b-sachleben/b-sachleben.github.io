$(document).ready(function() {

  // Top navigation menu toggle

  var $menu = $(".menu_expanded");
  var $menuToggle = $(".menu_button");
  $menu.hide();
  $menuToggle.on("click", function(event) {
    event.preventDefault();
    $menu.toggle();
  });

}); /* end document.ready function */
