//Problem: image gallery needs interactability when clicking on images
//Solution: use jQuery to increase size of images from 50% screen width to 100% screen width (on mobile) when clicked
$(document).ready(function() {
  //initialize some variables
  var $largeImage = $("#large_image");
  var $galleryContainingDiv = document.getElementById('image_list');
  var $imageList = $galleryContainingDiv.children;
  var imageArray = [];//Holds info for #large_image div
  var largeImagePlaceholder = document.getElementById('image_placeholder');
  var titlePlaceholder = document.getElementById('image_title');
  var descripPlaceholder = document.getElementById('image_description');
  var imageArrayPosition = '';//saves the position within imageArray for use by prev / next buttons

    // AJAX loading image data from JSON file

    var url = "../data/images.json";
      $.getJSON(url, function (response) {
        //for each object in JSON file...
        $.each(response, function (index, image) {

          var imgName = image.name;
          var imgDescrip = image.description;
          var imgThumb = image.thumbURL;
          var imgOrigin = image.enlargedURL;

          var largeImageInfo = {
            image : imgOrigin,
            title : imgName,
            description : imgDescrip
          }
          console.log(largeImageInfo);

          var targetLocation = $('#image_list');
          var containingDiv = document.createElement('div');
          var link = document.createElement('a');
          var img = document.createElement('img');

          //Create thumbnail image in gallery (#image_list div)
          $(containingDiv).addClass('image_sml');
          $(containingDiv).addClass('col-xs-6');
          $(containingDiv).addClass('col-sm-3');
          $(containingDiv).addClass('col-lg-2');
          $(link).attr('href', '#large_image');
          $(img).attr('src', imgThumb);
          $(img).attr('alt', imgName);

          targetLocation.append(containingDiv);
          containingDiv.appendChild(link);
          link.appendChild(img);

          //Populate imageArray with large images
          imageArray.push(largeImageInfo);

          //Bind click event to image
          bindClickEvent(link);

        });

      });



      // end AJAX loading image data from JSON file

  //when page loads and before anything is clicked

    //hide image with caption div
    $largeImage.hide();
  //When thumbnail version of image is clicked...
    var openLargeImage = function() {
      //create img element for large version of image
      var largeImageElement = document.createElement('img');
      var imageClicked = [].indexOf.call($imageList, this.parentNode) - 1;
      $(largeImageElement).attr('src', imageArray[imageClicked].image);
      imageArrayPosition = imageClicked;
      //clear, then append image element created above to image_placeholder div
      largeImagePlaceholder.innerHTML = '';
      largeImagePlaceholder.appendChild(largeImageElement);
      //clear, then fill h2 id image_title with image title text
      titlePlaceholder.innerText = '';
      titlePlaceholder.innerText = imageArray[imageClicked].title;
      //clear, then fill p id image_description with description text
      descripPlaceholder.innerText = '';
      descripPlaceholder.innerText = imageArray[imageClicked].description;
      //show large_image div
      $largeImage.show();

    }

    var refreshLargeImage = function() {
      //create img element for large version of image
      var largeImageElement = document.createElement('img');
      $(largeImageElement).attr('src', imageArray[imageArrayPosition].image);
      //clear, then append image element created above to image_placeholder div
      largeImagePlaceholder.innerHTML = '';
      largeImagePlaceholder.appendChild(largeImageElement);
      //clear, then fill h2 id image_title with image title text
      titlePlaceholder.innerText = '';
      titlePlaceholder.innerText = imageArray[imageArrayPosition].title;
      //clear, then fill p id image_description with description text
      descripPlaceholder.innerText = '';
      descripPlaceholder.innerText = imageArray[imageArrayPosition].description;
      //show large_image div
      $largeImage.show();
    }

    //bind click event to thumbnail images

    var bindClickEvent = function(element) {
      element.onclick = openLargeImage;
    }

  // Large Image section controls

  var $closeImage = $(".close_image a");
  var $prevButton = $(".prev_button");
  var $nextButton = $(".next_button");

  // close image
  $closeImage.on("click", function(event) {
    event.preventDefault();
    console.log("close image...");
    $largeImage.hide();
  });

  //get #image_placeholder height and save it as a min-height to avoid blips when previous and next buttons are clicked

  var savePlaceholderHeight = function() {
    var currentHeight = $('#image_placeholder').height();
    $('#image_placeholder').css('min-height', currentHeight);
  }

  //reset #image_placeholder height on window resize
  $(window).resize(function(){
    $('#image_placeholder').css('min-height', 'initial');
  });

  // previous image
  $prevButton.on("click", function(event) {
    event.preventDefault();
    savePlaceholderHeight();
    var arrayLength = imageArray.length - 1;
    console.log("previous image...");
    console.log(imageArray.length);
    if (imageArrayPosition !== 0) {
      imageArrayPosition --;
    } else {
      imageArrayPosition = arrayLength;
    }
    refreshLargeImage();
  });

  // next image
  $nextButton.on("click", function(event) {
    event.preventDefault();
    savePlaceholderHeight();
    var arrayLength = imageArray.length - 1;
    console.log("next image...");
    console.log(imageArray.length);
    if (imageArrayPosition < arrayLength) {
      imageArrayPosition ++;
    } else {
      imageArrayPosition = 0;
    }
    refreshLargeImage();
  });

  // end Large Image section controls

//Future additions: limit initial load to 10-ish images and load more on document scroll with AJAX ($(window).scroll(function(){ code here });)
//Future additions: add google maps to photographs, possibly using image latitude and longitude metadata

}); /* end document.ready function */
