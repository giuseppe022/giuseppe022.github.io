//Change background nav on scroll
$(document).ready(function(){       
    var scroll_start = 0;
    var startchange = $('#startchange');
    var offset = startchange.offset();
     if (startchange.length){
    $(document).scroll(function() { 
       scroll_start = $(this).scrollTop();
       if(scroll_start > offset.top) {
           $(".navbar").css('background-color', '#000000bc');
        } else {
           $('.navbar').css('background-color', 'transparent');
        }
    });
     }
 }); 

// Aside Menu 
$(document).ready(function() {
	// jQuery code

	  $("[data-trigger]").on("click", function(e){
        e.preventDefault();
        e.stopPropagation();
        var offcanvas_id =  $(this).attr('data-trigger');
        $(offcanvas_id).toggleClass("show");
        $('body').toggleClass("offcanvas-active");
        $(".screen-overlay").toggleClass("show");

    }); 


   	// Close menu when pressing ESC
    $(document).on('keydown', function(event) {
        if(event.keyCode === 27) {
           $(".offcanvas").removeClass("show");
           $("body").removeClass("overlay-active");
        }
    });

    $(".btn-close, .screen-overlay").click(function(e){
    	$(".screen-overlay").removeClass("show");
        $(".offcanvas").removeClass("show");
        $("body").removeClass("offcanvas-active");


    }); 
	
}); 

//Search function 
$("#search-criteria").on("keyup", function() {
    var g = $(this).val().toLowerCase();
    $(".d-flex").each(function() {
        var s = $(this).text().toLowerCase();
        $(this).closest('.d-flex')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
    });
});