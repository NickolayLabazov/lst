(function($){$(document).ready(function(){
	
	var message = function(text){
		$('#bg_layer').show();
		$('.popup-info span').html(text);
		$('.popup-info').show();	
	}
	
	var show_regions = function(id){
					
		var region_id = $('.tab-content').attr('data-id');
		
		$.post('/jx/',{action:'regions',id: id, region_id: region_id},
			function(data){
				$('.tab-pane').html(data);
            }).fail(function() {$('.tab-pane').html('error_internet_connect');});			
	}
						   
	$('.form-autorization').submit(function(){
		$('#bg_layer').show();
		$.post('#',$(this).serialize(),
            function(data){
				if(!data.error)
				{
					location.reload();
				}
				else{
					$('.popup-info span').html(data.error);
					$('.popup-info').show();	
				}
            },'json');
		
		return false;
	})
	
	$('.popup_close').click(function(){
		$('.popup-info').hide();
		$('#bg_layer').hide();
	});
	
	$('.main').on('change', '.country', function(){
		var $form = $(this).closest('form');
		var $this = $form.find('.region').parent();
		parent = $(this).closest('form').find('.country option:selected').val();
		$.post('#',{action: 'geo', name: 'region', id:0, parent:parent},
			function(data){
				$this.find('.region').html(data);
				$this.find('.select').remove();
				$($this.find('select')).ulSelect();
			}
        );
		
		//$('.city').attr('disabled','disabled');
		$form.find('.city').html('<option value="">Р’С‹Р±РµСЂРёС‚Рµ СЂРµРіРёРѕРЅ</option>');
		$form.find('.city').parent().find('.selected').html('Р’С‹Р±РµСЂРёС‚Рµ СЂРµРіРёРѕРЅ');
		$form.find('.city').parent().find('ul').remove();
	})
	
	$('.main').on('change', '.region', function(){
		var $form = $(this).closest('form');
		parent = $form.find('.region option:selected').val();
		if(parent)
			$form.find('.city').attr('disabled', false);
		
		var $this = $('.city').parent();
			
		$.post('#',{action: 'geo', name: 'city', id:0, parent:parent},
			function(data){
				$form.find('.city').html(data);
				$this.find('.select').remove();
				$($this.find('select')).ulSelect();
			}
        );
	})
	
	
	
	$('.main').on('change', '.category', function(){
		var $form = $(this).closest('form');
		value = $(this).val();
		
		$form.find('.block-model').html('');
		$form.find('.block-d-option').html('');
		
		if(value){
					
			$.post('#',{action: 'mark', id:value},
				function(data){
					$form.find('.block-marks').html(data.show);
					$form.find('.block-option').html(data.params);
					$($form.find('.block-marks, .block-option').find('select')).ulSelect();
				},
				'json'
			).fail(function() {message('РќРµ СѓРґР°Р»РѕСЃСЊ СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ СЃРµСЂРІРµСЂРѕРј');});
		}
		else{
			$form.find('.block-marks').html('');
			$form.find('.block-option').html('');
		}
		
		return false
		
	})
	
	
	$('.main').on('change', '.block-marks .marka', function(){
		
		var $form = $(this).closest('form');
		id = $form.find('.category').val();
		value = $(this).val();
		$form.find('.block-d-option').html('');
		
		if(value){
			$.post('#',{action: 'model', id:id, model:value},
				function(data){
					$form.find('.block-model').html(data);
					$($form.find('.block-model').find('select')).ulSelect();
				}
			).fail(function() {message('РќРµ СѓРґР°Р»РѕСЃСЊ СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ СЃРµСЂРІРµСЂРѕРј');});
		}
		else
		{
			$form.find('.block-model').html('');
		}

		return false;
	})
	/*
	$('.main').on('change', '.block-model .model', function(){
		
		var $form = $(this).closest('form');
		
		value = $(this).val();
		id = $form.find('.category').val();
		if(!value)
			$form.find('.block-d-option').html('');
		else{
			$.post('#',{action: 'model-params', id:id, model:value},
				function(data){
					$form.find('.block-d-option').html(data);
					$($form.find('.block-d-option').find('select')).ulSelect();
				}
			).fail(function() {message('РќРµ СѓРґР°Р»РѕСЃСЊ СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ СЃРµСЂРІРµСЂРѕРј');});
		}
		return false;
	});
	*/
	$('.form-search').submit(function(){
		
		error = '';
		
		category = $(this).find('.category').val();
		if(!category){
			$this = $(this).find('.category').parent().find('.selected');
			$this.effect("pulsate", { times:3 }, 300);
			error++;
		}
		
		/*
		marka = $(this).find('.marka').val();
		if(!marka){
			$this = $(this).find('.marka').parent().find('.selected');
			$this.effect("pulsate", { times:3 }, 300);
			error++;
		}
		*/
		/*
		model = $(this).find('.model').val();
		if(!model){
			$this = $(this).find('.model').parent().find('.selected');
			$this.effect("pulsate", { times:3 }, 300);
			error++;
		}
		*/
		
		if(error)
			return false;
			
		$('.ads-content').html('<div align="center"><img src="/img/loading.gif" /></div>')
		
		if($(".search-button").hasClass('active'))
			$('.active-param').val('1');
		else
			$('.active-param').val('0');
			
		$.post('#',$(this).serialize(),
			function(data){
				$('.ads-content').html(data);
			}).fail(function() {message('error_internet_connect');});
			
		return false;
	})
	
	$('.ads-content').on('click','.price-asc, .price-desc, .year-asc, .year-desc', function(){
		//message('Р’ СЂР°Р·СЂР°Р±РѕС‚РєРµ'+$(this).attr('class'));
		//return false;
		$.post('#', {cls:$(this).attr('class'), action:'cookie'},
			function(data){
				location.reload();
			}).fail(function() {message('error_internet_connect');});
	})
	
	$('.transport a').click(function(){
		
		var $form = $(this).closest('form');
		value = $(this).attr('data-id');
		
		$form.find('.block-model').html('');
		//$form.find('.block-d-option').html('');
		
		if(value){
			
			$('.category').val(value);
					
			$.post('#',{action: 'mark', id:value},
				function(data){
					$form.find('.block-marks').html(data.show);
					$form.find('.block-option').html(data.params);
					$($form.find('.block-marks, .block-option').find('select')).ulSelect();
				},
				'json'
			).fail(function() {message('РќРµ СѓРґР°Р»РѕСЃСЊ СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ СЃРµСЂРІРµСЂРѕРј');});
		}
		else{
			$form.find('.block-marks').html('');
			$form.find('.block-option').html('');
		}
		
		//message('РІ СЂР°Р·СЂР°Р±РѕС‚РєРµ');
	});
	
	
	$('.form-contact').submit(function(){
		
		error = '';
		
		if(!$('.city :selected', this).val())error = 'Р’С‹Р±РµСЂРёС‚Рµ РіРѕСЂРѕРґ';
		if(!$('.region :selected', this).val())error = 'Р’С‹Р±РµСЂРёС‚Рµ СЂРµРіРёРѕРЅ';
		
		if(error){
			message(error);
			return false;
		}
		
		$.post('#', $(this).serialize(),
			function(data){
				message(data);
			}
        ).fail(function() {message('РќРµ СѓРґР°Р»РѕСЃСЊ СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ СЃРµСЂРІРµСЂРѕРј');});
		return false;
	})
	
	$('.change-pass').submit(function(){
		error = '';
		old = $(this).find('[name="old-password"]').val();
		password =  $(this).find('[name="new-password"]').val();
		password_repeat =  $(this).find('[name="new-password-repeat"]').val();
		
		if(!old) error += 'РќРµ СѓРєР°Р·Р°РЅ С‚РµРєСѓС‰РёР№ РїР°СЂРѕР»СЊ<br>';
		if(!password) error += 'РќРµ СѓРєР°Р·Р°РЅ РЅРѕРІС‹Р№ РїР°СЂРѕР»СЊ<br>';
		if(password != password_repeat){
			error += 'РЈРєР°Р·Р°РЅРЅС‹Рµ РїР°СЂРѕР»Рё РЅРµ СЃРѕРІРїР°РґР°СЋС‚'
		}
		
		if(error){
			message(error);
			return false;
		}
		
		
		$.post('#',{action: 'change', old: old, password: password, password_repeat: password_repeat},
			function(data){
				message(data);
			}
        );
		return false;
	})
	
	$('.save_contacts').click(function(){
		
		error = '';
		user = $('.user_name').val(),
        country = $('.country option:selected').val();
		region = $('.region option:selected').val();
		city = $('.city option:selected').val();
		code_n = $('.kod_goroda').val();
		number = $('.number_mobile').val();
		email = $('.email').val();
		
		if(!region)error += 'Р’С‹Р±РµСЂРёС‚Рµ СЂРµРіРёРѕРЅ<br>';
		if(!city)error += 'Р’С‹Р±РµСЂРёС‚Рµ РіРѕСЂРѕРґ<br>';
		
		if(error){
			message(error);
			return false;
		}
		
		$.post('#',{action: 'save', user: user, country: country, region: region, city: city, code_n: code_n, number: number, email: email},
			function(data){
				message(data);
			}
        );
									   
	})
	
	$('.change_password').click(function(){
		error = '';
		old = $('.old_password').val();
		password = $('.new_password').val();
		password_repeat = $('.new_password_repeat').val();
		
		if(!old) error += 'РќРµ СѓРєР°Р·Р°РЅ С‚РµРєСѓС‰РёР№ РїР°СЂРѕР»СЊ<br>';
		if(!password) error += 'РќРµ СѓРєР°Р·Р°РЅ РЅРѕРІС‹Р№ РїР°СЂРѕР»СЊ<br>';
		if(password != password_repeat){
			error += 'РЈРєР°Р·Р°РЅРЅС‹Рµ РїР°СЂРѕР»Рё РЅРµ СЃРѕРІРїР°РґР°СЋС‚'
		}
		
		if(error){
			message(error);
			return false;
		}
		
		
		$.post('#',{action: 'change', old: old, password: password, password_repeat: password_repeat},
			function(data){
				message(data);
			}
        );
		
	})
	
	$('.top-menu a').click(function(){
		$.cookie('id_category', $(this).attr("data-id"), {expires: 7, path: '/'});
	})
	
	/*
	$('.moreoptions .watelse').click(function(){
		$(this).parent().find('.more').toggle();
		return false;
	});
	
	$('.more').mouseleave(function(){
		$('.more').hide();
	});
	
	
	$('.more1 a').click(function(){
		var $this = $(this).closest(".ads_min.searh");
		id = $this.attr('data-id');
		$.post('#',{action: 'active', id:id, value:1});
		$('.progressbar-info', $this).text('РћСЃС‚Р°Р»РѕСЃСЊ 30 РґРЅРµР№ РґРѕ РµРіРѕ РѕС‚РєР»СЋС‡РµРЅРёСЏ');
		$('.progressbar span', $this).css('width','100%');
		$('.more').hide();
		$('.more1', $this).hide();
		$('.more5', $this).show();
		return false;
	})
	
	$('.more2 a').click(function(){
		//$(this).closest(".title").after('<div class="edit" style="display:none"></div>');
		
		var $this = $(this).closest(".ads_min.searh").find('.edit');
		var id = $(this).closest(".ads_min.searh").attr('data-id');
		$('.edit').hide('slow');
				
		if(!$this.text()){
			$.post('#',{action: 'edit', id: id},
				function(datas){
					$this.html(datas);
					$('#file_upload'+id).uploadify({
						'formData'     : {
							'id' : id,
						},
						'swf'        : '/uploadify/uploadify.swf',
						'uploader'   : '/uploadify/uploadify.php',
						'buttonText' : 'Р”РћР‘РђР’РРўР¬ Р¤РћРўРћ',
						'fileTypeExts' : '*.jpg;*.gif;*.png',
						'fileTypeDesc' : 'Image Files (.JPG, .GIF, .PNG)',
												
						'onUploadSuccess' : function(file, data, response) {
							$("#small_photo_cointener", $this).append('<li><img src="/uploads/imgrek/small/'+data+'" alt="'+data+'"/><span>x</span></li>');
							//$('#ad_photos', $this).val($('#ad_photos', $this).val()+data+'||||');
						}
					});
				}
			);
			
			
		}
					
		$this.show('slow');
		return false;
	})
		
	$('.more3 a').click(function(){
		message(' :( Р¤СѓРЅРєС†РёСЏ РІ СЂР°Р·СЂР°Р±РѕС‚РєРµ');
	})
	
	$('.more4 a').click(function(){
		message(' :( Р¤СѓРЅРєС†РёСЏ РІ СЂР°Р·СЂР°Р±РѕС‚РєРµ');
	})
		
	$('.more5 a').click(function(){
		var $this = $(this).closest(".ads_min.searh");
		id = $this.attr('data-id');
		$.post('#',{action: 'active', id:id, value:0});
		$('.progressbar-info', $this).html('<font color="#AF0000">Р’Р°С€Рµ РѕР±СЉСЏРІР»РµРЅРёРµ РґРµР°РєС‚РёРІРёСЂРѕРІР°РЅРѕ!</font>');
		$('.progressbar span', $this).css('width','1%');
		$('.more').hide();
		$('.more5', $this).hide();
		$('.more1', $this).show();
		return false;
	})
	
	$('.more6 a').click(function(){
		message(' :( Р¤СѓРЅРєС†РёСЏ РІ СЂР°Р·СЂР°Р±РѕС‚РєРµ');
	})
	
	$('.more7 a').click(function(){
		message(' :( Р¤СѓРЅРєС†РёСЏ РІ СЂР°Р·СЂР°Р±РѕС‚РєРµ');
	})
	*/
	
	$('.content').on('change', '.category', function(){	
		value = $(this).val();
		
		if(value){
			$('.marka').attr('disabled', false);
			$.post('#',{action: 'mark', id:value},
				function(data){
					$('.marka').html(data.show);
					$('.valls').html(data.params);
				}, 
				'json'
			);
		}
		else
			$('.marka').attr('disabled', 'disabled');
			
		$('.model').attr('disabled', 'disabled');
		$('.model').html('<option value="">Р’С‹Р±РµСЂРёС‚Рµ РјРѕРґРµР»СЊ...</option>');

		return false;
	})
	
	$('.content').on('change', '.marka', function(){
	
		id = $('.category').val();
		value = $(this).val();
		
		if(value){
			$('.model').attr('disabled', false);
			$.post('#',{action: 'model', id:id, model:value},
				function(data){
					$('.model').html(data);
				}
			);
		}
		else
		{
			$('.model').attr('disabled', 'disabled');
		}

		return false;
	})
	
	$('.content').on('submit', '.form-edit', function(){
		
		var error = 0;
		var $this = $(this).closest(".ads_min.searh");
				
		$('select', this).each(function(){
			value = $('option:checked', this).val();
			if(!value)
			{
				$(this).effect("pulsate", { times:3 }, 500);
				error++;
			}
		});
		
		$('input', this).each(function(){
			value = $(this).val();
			if(!value)
			{
				$(this).effect("pulsate", { times:3 }, 500);
				error++;
			}
		});
		
		$('textarea', this).each(function(){
			value = $(this).val();
			if(!value)
			{
				$(this).effect("pulsate", { times:3 }, 500);
				error++;
			}
		});
		
		if(error)
			return false;
				
		$.post('#',$(this).serialize(),
            function(data){
				if(data.match('true')) {
					//message('РЎРѕС…СЂР°РЅРµРЅРѕ!');
					text = '<b class="orng">'+$('.ad_price', $this).val()+' </b>'+$('.ad_price_type option:selected', $this).text();
					$('.price-show', $this).html(text);
					text = $('.marka option:selected', $this).text()+' '+$('.model option:selected', $this).text()+', '+$('.ad_year', $this).val();
					$('p.blue', $this).html(text);
					$('.edit').hide('slow');
				}else{
					message(data);
				}
            });
		return false;
		
	})
	
	
	$('.content').on('click', '.thslide_nav_next', function(){
		var $this = $(this).closest(".thslide");
		var cntPage = $this.find('li').length;
		$dragConteiner = $this.find('ul');
		next = $dragConteiner.attr('data-next');
		next++;
		
		if(next>=cntPage)next=cntPage-1;
		else $dragConteiner.attr('data-next', next);
		
		$dragConteiner.animate({marginLeft:next*90*-1}, '1000');
	})
	
	$('.content').on('click', '.thslide_nav_previous', function(){
		var $this = $(this).closest(".thslide");
		var cntPage = $this.find('li').length;
		$dragConteiner = $this.find('ul');	
		next = $dragConteiner.attr('data-next');
		next--;
		
		if(next<0)next=0;
		else $dragConteiner.attr('data-next', next);
		
		$dragConteiner.animate({marginLeft:next*90*-1}, '1000');
	})
	
	$('.content').on('click', '#small_photo_cointener li span', function(){
																			  
		photo = $(this).parent().find('img').attr("alt");
		id = $(this).closest(".ads_min.searh").attr('data-id');
		
		$.post('#', { action: 'del-img', photo:photo, id:id });										
		
		$(this).parent().remove();
										
		return false;
																	  
		//message('РІ СЂР°Р·СЂР°Р±РѕС‚РєРµ');
	})
	
	$('.content').on('click', '.del_adv', function(){
		
		var $this = $(this).closest(".ads_min.searh");
		id = $this.attr('data-id');
		
		$.post('#', { action: 'del-adv', id:id });										
		
		$this.animate({opacity: 0}, 1000, function() {$this.remove()});
		return false;
	})
	
	console.log($.fn.jquery);
	
	/*
	if($('div').is('.select')){
		$('select').ulSelect();
	}
	*/
	$('.payment .pay').click(function(){
		
		idAds = $(".payment .id_ads").val();
		if(!idAds){
			$('.payment .id_ads').parent().find('.selected').effect("pulsate", { times:3 }, 300);
			return false;
		}
		
		$.post('#',{action: 'payment', idAds: idAds},
            function(data){
				if(data.match('true')) {
					message('РЈСЃР»СѓРіР° Р°РєС‚РёРІРёСЂРѕРІР°РЅР°');
				}else{
					message(data);
				}
            });
	})
	
	$('.payment-form').submit(function(){
		price = $(this).find('input[name=price]').val();
		if(!price){
			$(this).find('input[name=price]').effect("pulsate", { times:3 }, 300);
			return false;
		}
		
		$.post('#',{action: 'payment', price: price},
			function(data){
				if(!data.error) {
					location.href = data.url;
				}else{
					message(data.error);
				}
			},
			'json'
		).fail(function() {message('РќРµ СѓРґР°Р»РѕСЃСЊ СЃРІСЏР·Р°С‚СЊСЃСЏ СЃ СЃРµСЂРІРµСЂРѕРј');});
		return false;
	}) 
	
	$('.nav-tabs li').click(function(){
		//alert('test');
		var id = $(this).attr('data-id');
		$('.nav-tabs li').removeClass('active');
		$(this).addClass('active');
		
		show_regions(id);
		//$('.tab-pane').html('РќР°С…РѕРґРёС‚СЃСЏ РЅР° СЃС‚Р°РґРёРё СЂР°Р·СЂР°Р±РѕС‚РєРё:' + id);
	});
		
	show_regions($('.nav-tabs li.active').attr('data-id'));
})
})(jQuery);