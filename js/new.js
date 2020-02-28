$(document).ready(function(){	
	
	$('.new-car_img_list_item_thumb').filter(':first').addClass('active');
	
  $('.new-car_img_list_item_thumb').click(function(){	
      $('.new-car_img_list_item_thumb').not(this).removeClass('active');
		  $(this).addClass('active');
      $('.new-car_img').attr("src", $(this).attr('data-img'));      
   });

   $('.new-one-used-car_img_list_item_thumb').filter(':first').addClass('active');
	
  $('.new-one-used-car_img_list_item_thumb').click(function(){	  
      $('.new-one-used-car_img_list_item_thumb').not(this).removeClass('active');
		  $(this).addClass('active');
      $('.new-one-used-car_img').attr("src", $(this).attr('data-img'));      
   });
	
	$('.tabs-nav-new').children('li').filter(':first').addClass('active');
	$('.tabs-box-new').children('div').filter(':first').addClass('active');

	$('.tabs-nav-new1').children('li').filter(':first').addClass('active');
	$('.tabs-box-new1').children('div').filter(':first').addClass('active');

	/* 28.02.20 */

	$('.tabs-nav-new li').click(function(e) {
		var a = $(this),
				parent = a.parents('.tabs-new1'),
				nav = parent.children('.tabs-nav-new').children('li'),
				box = parent.children('.tabs-box-new').children('div');

		if (!a.hasClass('active')) {
			a.addClass('active')
				.siblings().removeClass('active');

			box.eq(a.index()).addClass('active')
				.siblings().removeClass('active');
		}

		e.preventDefault();
	}); 

	$('.tabs-nav-new1 li').click(function(e) {
		var a = $(this),
				parent = a.parents('.tabs-new1'),
				nav = parent.children('.tabs-nav-new1').children('li'),
				box = parent.children('.tabs-box-new1').children('div');

		if (!a.hasClass('active')) {
			a.addClass('active')
				.siblings().removeClass('active');

			box.eq(a.index()).addClass('active')
				.siblings().removeClass('active');
		}

		e.preventDefault();
	}); 

	/* 28.02.20 */
	
	
	$('.new-car_list_item_content').hide();
  $('.new-car_list_item_title').on('click', function() {
    $('.new-car_list_item_content').not($(this).next('.new-car_list_item_content')).slideUp();
    $(this).next('.new-car_list_item_content').slideToggle();
    $('.new-car_list_item_title').not(this).removeClass('active');
    $(this).toggleClass('active');
	}); 
	
})
