(function($){
	
	$.fn.ulSelect = function(options){
	 
		options = $.extend({
			render : function(option){
				
				$class = '';
				if(option.attr('data-class'))
					$class = option.attr('data-class');
				
 				return $('<li>',{
 					html : option.text(),
					class : $class
 				});
 			},
			 className : ''
		},options);
		
		return this.each(function(){
 
      
 			// РєР»СЋС‡РµРІРѕРµ СЃР»РѕРІРѕ  "this" СЌС‚Рѕ С‚РµРєСѓС‰РёР№ СЌР»РµРјРµРЅС‚ select
      
 
 			var select = $(this);
		
    		// selectBoxContainer - Р±Р»РѕРє РѕР±РµСЂС‚РєР° РґР»СЏ ul
    
			var selectBoxContainer = $('<div>',{
				//width		: select.outerWidth(),
				//className	: 'tzSelect',
				class		: 'select',
				html		: '<span class="selected">'+select.find(':selected').text()+'<i></i></span>'
			});
		
    
    		// dropDown - РІС‹РїР°РґР°СЋС‰РµРµ РјРµРЅСЋ
			//var dropDown = $('<ul>',{className:'dropDown'});
			var dropDown = $('<ul>');
			//var selectBox = selectBoxContainer.find('.selectBox');
			var selectBox = selectBoxContainer.find('.selected');
			
			// Р¦РёРєР» РїРѕ С‚РµРіР°Рј option РѕСЂРёРіРёРЅР°Р»СЊРЅРѕРіРѕ С‚РµРіР° select
			//console.log(select.find(':selected').text());
			
 			if(options.className){
 				dropDown.addClass(options.className);
			}
 
			select.find('option').each(function(i){
				var option = $(this);
		
				if(i==select.attr('selectedIndex')){
					selectBox.html(option.text());
				}
 	

				if(option.data('skip')){
					return true;
				}
 	
 				var li = options.render(option);
				
				$class = '';
				if(option.attr('data-class'))
					$class = option.attr('data-class');
				
				if($class != 'title'){
					li.click(function(){
			
						selectBox.html(option.text()+'<i></i>');
						dropDown.trigger('hide');
						
						if(selectBox.parent().parent().find('label.error')){
							if(option.val()){
								selectBox.parent().parent().find('label.error').hide();
							}
							else{
								selectBox.parent().parent().find('label.error').show();
							}
						}
						// РџСЂРё РєР»РёРєРµ РѕС‚СЂР°Р¶Р°РµРј РёР·РјРµРЅРµРЅРёСЏ РЅР° РѕСЂРёРіРёРЅР°Р»СЊРЅРѕРµ 
						// СЌР»РµРјРµРЅС‚Рµ select
						  
						  
						select.val(option.val());
						select.change();//Р·Р°РїСѓСЃРєР°РµРј С„СѓРЅРєС†РёСЋ change
						
						return false;
					});
				}
			
				dropDown.append(li);
			});
	 
			//selectBoxContainer.append(dropDown.hide());
			//select.hide().after(selectBoxContainer);
			selectBoxContainer.append(dropDown);
			//select.hide().after(selectBoxContainer);
			select.hide().before(selectBoxContainer);
	 
			// РЎРІСЏР·С‹РІР°РµРј СЃРѕР±С‹С‚РёСЏ show Рё hide 
			// СЃ РІС‹РїР°РґР°СЋС‰РёРј РјРµРЅСЋ dropDown:
	 
			dropDown.bind('show',function(){
		
				if(dropDown.is(':animated')){
						return false;
				}
		
				selectBox.addClass('expanded');
				dropDown.slideDown();
		
			 }).bind('hide',function(){
		
				if(dropDown.is(':animated')){
					return false;
				}
		
				selectBox.removeClass('expanded');
				dropDown.slideUp();
		
			}).bind('toggle',function(){
				if(selectBox.hasClass('expanded')){
					dropDown.trigger('hide');
				}
				else dropDown.trigger('show');
			});
	 
			selectBox.click(function(){
				$('ul', $('.select')).slideUp('fast');
				dropDown.trigger('show');
				/*console.log('click');*/
				return false;
			});
			
			if(select.attr('data-class')){
				select.parent().find('.select').addClass(select.attr('data-class'));
			}
			
			// Р•СЃР»Рё РїСЂРѕРёР·РѕС€РµР» РєР»РёРє РіРґРµ-РЅРёР±СѓРґСЊ РЅР° СЃС‚СЂР°РЅРёС†Рµ РїСЂРё
			// РѕС‚РєСЂС‹С‚РѕРј РІС‹РїР°РґР°СЋС‰РµРј СЃРїРёСЃРєРµ, С‚Рѕ СЃРєСЂС‹РІР°РµРј РµРіРѕ:
	 
			$(document).click(function(){
				dropDown.trigger('hide');
			});
			
		});
	}
	
})(jQuery);