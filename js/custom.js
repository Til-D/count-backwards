$( document ).ready(function() {

	const DECREMENTS = [6, 7, 8, 9];
	const IMAGEFOLDER = 'images/'
	const FAILIMAGES = ['1.jpg', '2.jpg', '3.png', '4.png', '5.png', '6.png'];
	const SECOND = 1000; //ms
	const TIMEOUT = 2 * SECOND;
	const COUNTSTART = 3;
	const READYTEXT = "Get ready .";
	const SHOWFAILIMAGES = true;
	const STRESSINTERVAL_MIN = 5 * SECOND;
	const STRESSINTERVAL_MAX = 25 * SECOND;
	const STRESS_WINDOW_DURATION = 1 * SECOND;

	var startNumber,
		decrement,
		count,
		inProgress;
	

	$("#btnGo").click(function() {
		init();
	});

	$("#btnRestart").click(function() {
		init();
	});

	$(document).keypress(function(e) {
		if(inProgress) {
	  		console.log('key pressed: ' + e.which);
	  		fail();
	  	}
	});

	function init() {

		$("#instructions").hide();

		startNumber = Math.floor((Math.random() * 600) + 300);
		decrement = DECREMENTS[Math.floor(Math.random()*DECREMENTS.length)];		

		$("#startNumber").html(startNumber);
		$("#decrement").html(decrement);

		console.log("startNumber: " + startNumber);
		console.log("decrement: " + decrement);

		
		count = COUNTSTART;
		$("#readyText").html(READYTEXT);
		countdown();
	} 

	function countdown() {

		if(count>0) {
			$("#readyWindow").show();

			setTimeout(function() {
				
				$("#readyText").html($("#readyText").html() + '.');

				console.log(count);
				count--;
				countdown();
			}, SECOND);

		} else {
			$("#readyWindow").hide();
			$("#countWindow").show();

			schedule_stressor();

			setTimeout(function() {
				$("#countWindow").hide();
				inProgress = true;
			}, TIMEOUT);
		}

	}

	function fail() {
		if(SHOWFAILIMAGES) {
			$("#failImg").attr('src', IMAGEFOLDER + FAILIMAGES[Math.floor(Math.random()*FAILIMAGES.length)]);
			$("#failImg").show();
		} else {
			$("#failButton").show();
		}
		$("#failWindow").show();
		inProgress = false;
		setTimeout(function() {
			$("#failWindow").hide();
			// $("#instructions").show();			
			init();
		}, TIMEOUT);
	}

	function schedule_stressor() {
  		
  		var stressor_schedule = Math.floor( Math.random() * ( 1 + STRESSINTERVAL_MAX - STRESSINTERVAL_MIN ) ) + STRESSINTERVAL_MIN;

  		// show stressor window and hide after timeout
  		setTimeout(function() {
  			$("#stressWindow").show();
  			setTimeout(function() {
				hide_stressor();			
	  		}, STRESS_WINDOW_DURATION);
  		}, stressor_schedule);

  		console.log('stressor scheduled in: ' + stressor_schedule + ' ms.');
  	}

  	function hide_stressor() {
  		$("#stressWindow").hide();
  	}

});

