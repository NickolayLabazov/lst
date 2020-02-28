(function($){$(document).ready(function(){
		
		if($('div').is('#slider-container')){
		
			var elem = document.getElementById('slider-container');

			if (elem.addEventListener) {
			  if ('onwheel' in document) {
				// IE9+, FF17+
				elem.addEventListener ("wheel", onWheel, false);
			  } else if ('onmousewheel' in document) {
				// СѓСЃС‚Р°СЂРµРІС€РёР№ РІР°СЂРёР°РЅС‚ СЃРѕР±С‹С‚РёСЏ
				elem.addEventListener ("mousewheel", onWheel, false);
			  } else {
				// 3.5 <= Firefox < 17, Р±РѕР»РµРµ СЃС‚Р°СЂРѕРµ СЃРѕР±С‹С‚РёРµ DOMMouseScroll РїСЂРѕРїСѓСЃС‚РёРј
				elem.addEventListener ("MozMousePixelScroll", onWheel, false);
			  }
			} else { // IE<9
			  elem.attachEvent ("onmousewheel", onWheel);
			}

		}	
		
		var sync = {
			active: false,
			id: 0,
			action: function(){
				clearTimeout( this.id );
				sync.push();
			},
			push: function (){
				clearTimeout( this.id );
				this.active = false;
			},
			delay: function(delay){
				this.id = setTimeout( this.action, delay );
			},
			pop: function (){
			  if ( this.active == false ){
				 this.active = true;
				 return true;
			  }
			  return false;
			}
		};
		
		
		function onWheel(e) {
		  e = e || window.event;

		  // deltaY, detail СЃРѕРґРµСЂР¶Р°С‚ РїРёРєСЃРµР»Рё
		  // wheelDelta РЅРµ РґР°РµС‚ РІРѕР·РјРѕР¶РЅРѕСЃС‚СЊ СѓР·РЅР°С‚СЊ РєРѕР»РёС‡РµСЃС‚РІРѕ РїРёРєСЃРµР»РµР№
		  // onwheel || MozMousePixelScroll || onmousewheel
		  delta = e.deltaY || e.detail || e.wheelDelta;
		  //console.log(sync);
		
		 if ( sync.pop() ){
			if(delta>0)
				$('#next', $('.header-slider')).click();
			else
				$('#prev', $('.header-slider')).click();
			sync.delay(300);
		 }
			e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		}

		var news = function(){
			
			$.post('/jx/',{action:'news'},
            function(data){
				$('.show-news').html(data);
            }).fail(function() {$('.show-news').html('error_internet_connect');});
		}
	
		var show_cities = function(id){
			$.post('/jx/',{action:'cities',id: id},
            function(data){
				$('.cities_aj').html(data);
            }).fail(function() {$('.cities_aj').html('error_internet_connect');});
		}


		var show_regions = function(id){
					
			var region_id = $('.tab-content').attr('data-id');
			
			$.post('/jx/',{action:'regions',id: id, region_id: region_id},
            function(data){
				$('.tab-pane').html(data);
            }).fail(function() {$('.tab-pane').html('error_internet_connect');});

			
		}
		
		var message = function(text){
			/*
			$('#bg_layer').show();
			$('.popup-info span').html(text);
			$('.popup-info').show();
			
			$('.popup_close').click(function(){
				$('.popup-info').hide();
				$('#bg_layer').hide();
			});
			*/
			$('.popup .popup-content').html(text);
			$('.popup').show();
		}
		
		
		$('.nav-tabs li').click(function(){
			//alert('test');
			var id = $(this).attr('data-id');
			$('.nav-tabs li').removeClass('active');
			$(this).addClass('active');
			
			show_regions(id);
			//$('.tab-pane').html('РќР°С…РѕРґРёС‚СЃСЏ РЅР° СЃС‚Р°РґРёРё СЂР°Р·СЂР°Р±РѕС‚РєРё:' + id);
		});
		
		$('.header-filter').on('change', '.marka', function(){
	
			id = $('.header-filter').attr('data-category');
			value = $(this).val();
			
			if(value){
				$('.model').attr('disabled', false);
				$.post('/jx/',{action: 'model', id:id, mark_id:value},
					function(data){
						$('.model').parent().html(data);
						$($('.model').parent().find('select')).ulSelect();
					}
				);
			}
			else
			{
				$('.model').attr('disabled', 'disabled');
			}

			return false;
		})
		
		/*СЃРѕСЂС‚РёСЂРѕРІРєР° РѕР±СЉСЏРІР»РЅРёР№*/
		$('.ads-content').on('click', '.price-desc, .price-asc, .year-desc, .year-asc', function(){
		
			if($(this).hasClass("active"))
				return false;
			
			id = $('.ads-content').attr('data-category');
			action = $(this).attr('class');
			$('.form-search input[name="sort"]').val(action);
			
			$('.form-search').submit();
			/*
			$.post('#',{action: action, id:id},
					function(data){
						$('.ads-content').html(data);
					}
				).fail(function() {$('.ads-content').html('error_internet_connect');});
			*/
		})
		
		$('.form-search').submit(function(){
			$('.ads-content').html('<div align="center"><img src="/img/loading.gif" /></div>');
			$model = $('.ads-content').attr('data-model');
			$mark = $('.ads-content').attr('data-mark');
			
			modelVal = $('.model').val();
			if(modelVal == '')
				modelVal = 'all';
			//console.log(modelVal);
			
			if($('.marka').val()!=$mark || modelVal!=$model){
				str = $(this).serialize().replace('search','upd');
				$.post('#', str,
					function(data){
						location.href = data;
					}
				).fail(function() {$('.ads-content').html('error_internet_connect');});
				return false;
			}
			
			$.post('#',$(this).serialize(),
					function(data){
						$('.ads-content').html(data);
					}
				).fail(function() {$('.ads-content').html('error_internet_connect');});
			return false;
		})
		/*
		$('.ads-content').on('click', '.page-buttons button, .pagination a, .ads-click', function(){
			$this = $('.ads-content');
			//$this.html('<div align="center"><img src="/supr.admin/images/loader.gif"></div>');
			page = $(this).attr('data-page');
			$.post('#', {action: 'page', page: page, search: $this.find('.ads-content-list').attr('data-search')},
				function(data){
					$this.html(data);
				}).fail(function() {$this.html('РќРµ СѓРґР°Р»РѕСЃСЊ СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ СЃРµСЂРІРµСЂРѕРј');});
			return false;
		})
		*/
		$('.messageForm').submit(function(){
			message('loading ...')
			$.post('#', $(this).serialize(), function(data){
				if(data.show) {
					$('#textarea').val('');
					$('.messages').append(data.show);
					$('.popup').hide();
				}else{
					$('.popup .popup-content').html(data.error);
				}
			}, 'json').fail(function() {$('.popup .popup-content').html('РќРµ СѓРґР°Р»РѕСЃСЊ СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ СЃРµСЂРІРµСЂРѕРј');});
			return false;
		});
		
        
        $('.module-grey').submit(function(){
			message('loading ...')
			$.post('#', $(this).serialize(), function(data){
				if(data.show) {
					$('#textarea').val('');
					$('.messages2').append(data.show);
					$('.popup').hide();
				}else{
					$('.popup .popup-content').html(data.error);
				}
			}, 'json').fail(function() {$('.popup .popup-content').html('РќРµ СѓРґР°Р»РѕСЃСЊ СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ СЃРµСЂРІРµСЂРѕРј');});
			return false;
		});
        
        
		//С„СѓРЅРєС†РёРё Р·Р°РїСѓСЃРєР°РµРјС‹Рµ РїСЂРё Р·Р°РіСЂСѓР·РєРµ
		var str = location.pathname;
		str_arr = str.split("/") 
		if(str_arr[1]=='') news();
		//links();
		show_regions($('.nav-tabs li.active').attr('data-id'));
		show_cities($('.tab-content').attr('data-id'));
		
})
})(jQuery);