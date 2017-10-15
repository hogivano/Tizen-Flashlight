var turn = false;
var h = false;
var count = 0;
var setI;
//var _old_alert;

$(document).ready(function(){	
	// $('#turnOn').on('click', function(){
	// 	if (turn == false){
	// 		if (count == 0){
	// 			hidup();
	// 		} else {
	// 			loop(count);
	// 		}
	// 	}
	// });

	// $('#turnOff').on('click', function(){
	// 	if (turn == true){
	// 		window.clearInterval(setI);
	//     	mati();
	// 	}
	// });
	$('.circle').on('click', function(){
		if (h == false) {
			if (count == 0){
				hidup();
				h = true;
				$('.circle').css('background', '#29C157');
			} else {
				loop(count);
				h = true;
				$('.circle').css('background', '#29C157');
			}
		} else {
			window.clearInterval(setI);
			mati();
			h = false;
			$('.circle').css('background', '#F94A4A');
		}
	});
	
	$('#cahayaUp').on('click', function(){
		var number = $('#number').text();
		number = parseInt(number);
		if (number < 5){
			number++;
			count = number;
			$('#number').text(number);
			
			if (h == true){
				mati();
				window.clearInterval(setI);
				loop(number);
			}
		}
	});
	
	$('#cahayaDown').on('click', function(){
    	var number = $('#number').text();
		number = parseInt(number);
		if (number > 0){
			number--;
			count = number;
			$('#number').text(number);
			
			if (h == true){
				mati();
				window.clearInterval(setI);
				loop(number);
			}
		}
	});	
	
	$('.menu').on('click', function(){
		$('#modalAbout').addClass('is-active');
	});
	
	$('.modal').on('click', function(){
        $('.modal').removeClass('is-active');
    });
});

function loop(l){
	var lo = true;
	switch (l) {
		case 0:
			lo = false;
			break;
		case 1:
			l = 1000;
			break;
		case 2:
			l = 800;
			break;
		case 3:
			l = 600;
			break;
		case 4:
			l = 400;
			break;
		case 5:
			l = 200;
			break;
	}
	if (lo == true){
		setI = setInterval(function(){
			if (turn == true){
				mati();
			} else {
				hidup();
			}
		}, l);
	} else {
		hidup();
	}
}

function hidup(){
	tizen.systeminfo.getPropertyValue("CAMERA_FLASH",
		    function (flash) {
		        try {
		            flash.setBrightness(1.0);
					turn = true;
//					_old_alert = window.alert;
//					_old_alert.close();
		        } catch (error) {
					alert("Setting flash brightness failed: " + error.message);
		            console.log("Setting flash brightness failed: " + error.message);
		        }
		    },
		    function (error) {
				alert("Error, name: " + error.name + ", message: " + error.message);
		        console.log("Error, name: " + error.name + ", message: " + error.message);
		    }
	);
}

function mati(){
	tizen.systeminfo.getPropertyValue("CAMERA_FLASH",
		    function (flash) {
		        try {
		            flash.setBrightness(0);
					turn = false;
		        } catch (error) {
					alert("Setting flash brightness failed: " + error.message);
		            console.log("Setting flash brightness failed: " + error.message);
		        }
		    },
		    function (error) {
				alert("Error, name: " + error.name + ", message: " + error.message);
		        console.log("Error, name: " + error.name + ", message: " + error.message);
		    }
	);
}

window.onload = function() {
    // TODO:: Do your initialization job
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
            	if ($('#modalAbout').hasClass('is-active')){
            		$('#modalAbout').removeClass('is-active');
            	} else {
            		window.clearInterval(setI);
                	mati();
                    tizen.application.getCurrentApplication().exit();
            	}
            } catch (ignore) {

			}
        }
	});
};