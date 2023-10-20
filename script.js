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

  // Event listener for form submission
  $('#message-form').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get form data
    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();

    var service, template, key;

    try {
      if (process.env.SERVICE_ID && process.env.TEMPLATE_ID && process.env.PUBLIC_KEY) {
        service = process.env.SERVICE_ID;
        template = process.env.TEMPLATE_ID;
        key = process.env.PUBLIC_KEY;
      } else {
        throw new Error("Environment variables are not set.");
      }
    } catch (error) {
      // Handle the error, fallback to using secret.js
      console.error("Error accessing environment variables:", error.message);
      service = window.secret.SERVICE_ID;
      template = window.secret.TEMPLATE_ID;
      key = window.secret.PUBLIC_KEY;
    }
    
    emailjs.init(key)

    // Use EmailJS to send the email
    emailjs.send(service, template, {
      from_name: name,
      from_email: email,
      message: message,
    }).then(function(response) {
      console.log("Email sent successfully:", response);
      // You can add code here to show a success message to the user
    }, function(error) {
      console.error("Email sending failed:", error);
      // You can add code here to show an error message to the user
    });

    // Clear the form fields
    $('#name').val('');
    $('#email').val('');
    $('#message').val('');
  });
});