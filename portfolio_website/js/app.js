//Problem: image gallery needs interactability when clicking on images
//Solution: use jQuery to increase size of images from 50% screen width to 100% screen width (on mobile) when clicked
$(document).ready(function() {
  //when page loads and before anything is clicked
    //hide image with caption div

  //When image is clicked
    //remove active class from all sibling divs
    //hide thumbnail image
    //add active class to clicked image
    //show image with caption div




  // Top navigation menu toggle

  var $menu = $(".menu_expanded");
  var $menuToggle = $(".menu_button");
  $menu.hide();
  $menuToggle.on("click", function(event) {
    event.preventDefault();
    $menu.toggle();
  });
}); /* end document.ready function */
