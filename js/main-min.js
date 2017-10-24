// ====================================
// 				^GLOBALS
// ====================================

var $currentScreen='screen-splash',
	$globalFadeTime=400,
	$currentObject,
	$scanning=false;



// ====================================
// 				^DATA
// ====================================


// ====================================
// 				^UTILITIES
// ====================================

//array shuffle function
function shuffle(a) {
  var j, x, i;

	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
	console.log(a);
  a.sort(function(a,b){
    if(a.complete&&b.complete){
      return 0;
    }
    else if(a.complete){
      return 1;
    }
    else{
      return -1
    }
  })
  
  
}

//randomize jquery object children
$.fn.randomize = function(selector){
    (selector ? this.find(selector) : this).parent().each(function(){
        $(this).children(selector).sort(function(){
            return Math.random() - 0.5;
        }).detach().appendTo(this);
    });

    return this;
};

//convert number to number with commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//converts spaces to dashes
function toDashes(text){
	return text.replace(' ','-');
}

//converts spaces to spaces
function toSpaces(text){
	return text.replace('-',' ');
}


// ====================================
// 				^SCREEN CONTROL
// ====================================



//changes to targeted screen
//callback object: {before:<callback before fadein begins>, after: <callback after faded in>}
function changeScreen(screenClass, callbackObj){
	
	//manage current and last screen variables
	$lastScreen=$currentScreen;
	$currentScreen=screenClass;

	var elementsToFade=$('.screen:not(.'+screenClass+')');
	var fadeCount=elementsToFade.length;

	elementsToFade.fadeOut($globalFadeTime, function(){
		if(--fadeCount>0) return;

		if(callbackObj&&callbackObj.before){
			callbackObj.before();
		}
		
		$('.'+screenClass).fadeIn($globalFadeTime,function(){
			if(callbackObj&&callbackObj.after){
				callbackObj.after();
			}
		});
	});
}

function fadeSwitch(current,to){
	$(current).fadeOut($globalFadeTime, function(){
		$(to).fadeIn($globalFadeTime);
	});
}


// ====================================
// 				^BEACONS
// ====================================

function evalTriggers(){
	$('.btn-trigger').each(function(){
		if($objects[$(this).attr('data-id')].found){
			$(this).css('background','red').addClass('found');
		}
	});

	if($('.btn-trigger.found').length==3){
		alert('game over!');
	}
}


// ====================================
// 				^END
// ====================================

function end(success){
	$('.end-list').empty().append($('.items-found-list').clone());
	if(success){
		$('.end-state').text('Mission Complete!');
		$('.end-feedback').text('You did it!');
	}
	else{
		$('.end-state').text('Time\'s Up!');
		$('.end-feedback').text('Go faster next time!');
	}
}

// ====================================
// 				^EVENTS
// ====================================

function foundBeacon(foundID){
	beaconFinder.stop();
	$scanning=false;
	$('.found-options').empty();

	$.each(beaconlist,function(index){
		if(this.id==foundID){
			beaconFinder.foundBeacons.push(this.major);
			$.get('template-found.html',function(template){
				//console.log(template);
				var rendered=Mustache.render(template,beaconlist[index]);
				$('.search-found').empty().html(rendered);
				$('.found-options').randomize('.found-option');
			});
			return false;
		}
	});
	fadeSwitch('.search-searching','.search-alert');
}

$(document).ready(function(){

	//Preload images
	var images = new Array()
	
	function preload() {
		for (i = 0; i < preload.arguments.length; i++) {
			images[i] = new Image()
			images[i].src = preload.arguments[i]
		}
	}
	
	preload(
		"img/soldier1-thumb-highlight.png",
		"img/soldier2-thumb-highlight.png",
		"img/soldier1.png",
		"img/soldier2.png"
	);

	//implement fastclick
	FastClick.attach(document.body);

	//generic link type to change between screens
	$('.nav-link').on('click',function(){
		changeScreen($(this).attr('data-to'));
		return false;
	});

	//from objective to search
	$('.btn-toSearch').click(function(){
		changeScreen('screen-search',{after:function(){
			beaconFinder.initialize();
		}});
	});

	//stop/start scan
	$('.debutton1').click(function(){
		if(!$scanning){
			$('.debutton1').text('STOP');
			beaconFinder.initialize();
		}
		else{
			$('.debutton1').text('START');
			beaconFinder.stop();
		}
		$scanning=!$scanning;
	});

	//nav from splash to mission
	$('.screen-splash').click(function(){
		changeScreen('screen-mission');
	})

	//opens hint panes
	$('.mission-hint').click(function(){
		$(this).toggleClass('open');
	});

	//trigger item find, go to alert, populate quiz template
	$('.items-found-item').click(function(){
		var foundID=$(this).attr('data-id');


		$('.found-options').empty();

		$.each(beaconlist,function(index){
			if(this.id==foundID){
				$.get('template-found.html',function(template){
					//console.log(template);
					var rendered=Mustache.render(template,beaconlist[index]);
					$('.search-found').empty().html(rendered);
					$('.found-options').randomize('.found-option');
				});
				return false;
			}
		});
		fadeSwitch('.search-searching','.search-alert');
	});

	//from alert to found quiz
	$('.search-alert .btn').click(function(){
		fadeSwitch('.search-alert','.search-found');
	});

	//answer found quiz
	$('body').on('click','.found-option a',function(){
		var el=$(this);
		$('.found-options').addClass('selected');

		var fadeCount=$('.found-options a').length;

		$('.found-options a').off('click').fadeOut($globalFadeTime,function(){
			if(--fadeCount>0) return;
			$('.btn-continue').fadeIn($globalFadeTime);
		});

		$('.found-before').fadeOut($globalFadeTime,function(){
			if(el.closest('.found-option').hasClass('correct')){
				$('.found-correct').text('Correct');
			}
			else{
				$('.found-correct').text('Incorrect');
			}
			$('.found-response').text(beaconlist[el.attr('data-index')].response);
			$('.found-after').fadeIn($globalFadeTime);
		});
		
	});

	//continue to search or end
	$('body').on('click','.btn-continue',function(){
		var foundIndex=$(this).attr('data-index');

		$('.items-found-item').eq(foundIndex).addClass('found');
		fadeSwitch('.search-found','.search-searching');
		setTimeout(function(){
			beaconFinder.initialize();
		},$globalFadeTime);

		if($('.items-found-item.found').length==beaconlist.length){
			end(true);
			changeScreen('screen-end');
		}
	});

	//restart game
	$('.btn-restart').click(function(){
		changeScreen('screen-splash',{before:function(){
			$('.items-found-item').removeClass('found');
			$.each(beaconlist,function(){
				this.found=false;
			});
			beaconFinder.foundBeacons=[];
		}});
	});

});


