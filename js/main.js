// ====================================
// 				^GLOBALS
// ====================================

var $currentScreen='screen-splash',
	$globalFadeTime=400,
	$currentObject,
	$scanning=false,
	$foundBeacons=[],
	$startTime,
	$textTimer,
	$searchTime=600,
	$timeLeft=$searchTime,
	$searchTimer,
	$foundCount=0,
	$version='0.4';



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

function secondsToMS(d) {
    d = Number(d);

    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
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


// ====================================
// 				^END
// ====================================

function end(success){
	beaconFinder.stop();
	$foundCount=0;
	$scanning=false;

	changeScreen('screen-end',{
		before:	function(){
			clearTimeout($searchTimer);
			clearInterval($textTimer);
			$('.end-list').empty().append($('.items-found-list').clone());
			if(success){
				$('.end-state').text('Mission Complete!');
				$('.end-feedback').text('Congratulations! The items you collected have linked Khaled Hajar to IED making activities.  These were sent to the Forensics Lab for analysis. The stain on the shirt was identified as hydrochloric acid, a precursor of HME. The wire cutters were linked to the cut marks on the wire used to make the IED. Finally, Khaled Hajar’s DNA was collected from the tape. The tape was also positively identified as the same tape used to make the IED.');
			}
			else{
				$('.end-state').text('Time is up!');
				$('.end-feedback').text('You were not able to find all the evidence in the given time. Next time, try thinking like the enemy and use systematic search procedures.');
			}
		},
		after: function(){
			$('.search-alert,.search-found').hide();
			$('.search-searching').show();
			$('.items-found-count').text('0');

			$.each(beaconlist,function(){
				this.found=false;
			});
			$foundBeacons=[];
		}
	});
}


// ====================================
// 				^TIMER
// ====================================

//Timer functions
function startTimer(){
	//save current time
	$startTime=Date.now();
	$timeLeft=$searchTime;

	//interval countdown
	$('.timer-time').text(secondsToMS($timeLeft));
	$textTimer= setInterval(function(){
		$('.timer-time').text(secondsToMS($timeLeft-1));
		$timeLeft--;
	},1000);

	//after question time expires
	$searchTimer=setTimeout(function(){
		end(false);
	},$searchTime*1000);

}

// ====================================
// 				^EVENTS
// ====================================

//triggered from beaconlist object, when beacon found, stops scanninga nd populates found screen
function foundBeacon(foundID){
	beaconFinder.stop();
	$scanning=false;
	$('.found-options').empty();

	$.each(beaconlist,function(index){
		if(this.id==foundID){

			//add to found array
			$foundBeacons.push(this.major);

			//render found template
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
	var snd = new Audio('media/ding.mp3'); // buffers automatically when created
	snd.play();
}

$(document).ready(function(){

	//append version
	$('.screen-splash').append($('<div class="version">v'+$version+'</div>'));

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
		changeScreen('screen-search',{
			before:function(){
				startTimer();
			},
			after:function(){
			beaconFinder.initialize();		
		}});
	});

	//nav from splash to mission
	$('.screen-splash').click(function(){
		changeScreen('screen-how');
	})

	//opens hint panes
	$('.mission-hint').click(function(){
		$(this).toggleClass('open');
	});

	//trigger item find, go to alert, populate quiz template
	// $('.items-found-item').click(function(){
	// 	var foundID=$(this).attr('data-id');


	// 	$('.found-options').empty();

	// 	$.each(beaconlist,function(index){
	// 		if(this.id==foundID){
	// 			$.get('template-found.html',function(template){
	// 				//console.log(template);
	// 				var rendered=Mustache.render(template,beaconlist[index]);
	// 				$('.search-found').empty().html(rendered);
	// 				$('.found-options').randomize('.found-option');
	// 			});
	// 			return false;
	// 		}
	// 	});
	// 	fadeSwitch('.search-searching','.search-alert');
	// });

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

		//increase found count
		$foundCount++;
		$('.items-found-count').text($foundCount);

		$('.items-found-item').eq(foundIndex).addClass('found');
		
		if($('.items-found-item.found').length==beaconlist.length){
			end(true);
		}
		else{
			fadeSwitch('.search-found','.search-searching');
			setTimeout(function(){
				beaconFinder.initialize();
			},$globalFadeTime);
		}
	});

	//simulate ibeacon found with long press
	var pressTimer;
	$('.items-found-item').bind('touchend',function(){
		clearTimeout(pressTimer);
		console.log('aborted');
		// Clear timeout
		return false;
	}).bind('touchstart',function(){
		// Set timeout
		var el=$(this);
		console.log('touchstart')
		pressTimer = window.setTimeout(function() {
			console.log('hold complete');
			foundBeacon(el.attr('data-id'));
		},3000);

		return false; 
	});

	//restart game
	$('.btn-restart').click(function(){
		changeScreen('screen-splash',{before:function(){
			$('.items-found-item').removeClass('found');
		}});
	});

});
