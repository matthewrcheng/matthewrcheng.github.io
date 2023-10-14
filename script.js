$(document).ready(function() {
  // Function to handle showing/hiding content regions and menu highlighting
  function handleContent() {
      $('.content-region').hide();
      $('.main-menu a').removeClass('active');
      const region = location.hash.toString() || $('.main-menu a:first').attr('href');
      $(region).show();
      $('.main-menu a[href="'+ region +'"]').addClass('active'); 
  }

  // Event listener for hashchange
  $(window).on('load hashchange', function() {
      handleContent();
  });

  // Event listener for dropdown button click
  $('.show-button').click(function() {
      const buttonId = this.id;
      const contentId = buttonId.replace('_show', '_content');
      const menu = document.getElementById(contentId);

      if (menu.style.display === "none") {
          menu.style.display = "inline";
          this.innerHTML = "&#9650;";
      } else {
          menu.style.display = "none";
          this.innerHTML = "&#9660;";
      }
  });
});