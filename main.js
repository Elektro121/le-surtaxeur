var requestForm = document.getElementById('request_form');
var responseForm = document.getElementById('response_form');

window.onload = function() {
	
	// if javascript is enabled, the page hasn't to be refreshed	
	form.action = "#";
}

requestForm.onsubmit = function() {
	
	// We get the elements from the form
	var code = document.getElementById('code').value.toUpperCase();
	var number = parseInt(document.getElementById('number').value);
	
	// We check there is no problem with the code and the number
	if(!/\d+/.test(number) || code == null)
	{
		code = 'ERROR';
		number = 10101;
	}
	
	var xhr = new XMLHttpRequest();
	
	// We request the API to get a response
	var url = 'api/index.php?method=getsms&code=' + code + '&number=' + number;
	xhr.open('GET', url);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var data = JSON.parse(xhr.responseText);
			setResponse(data);
		}
		else if(xhr.readyState == 4 && xhr.status != 200) {
			setResponse(false);
		}
		else {
			setResponse(false, true);
		}
	}
	
	xhr.send(null);
	
	// waiting function
}

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

function setResponse(data, waiting = false) {
	if(data && !waiting) {
		requestForm.style.display = 'none';
		
		responseForm.style.display = '';
		
		var metadata = document.getElementById('metadata');
		var response = document.getElementById('response');
		
		var date = new Date();
		var formattedDate = date.getHours().padLeft() + ':' + date.getMinutes().padLeft() + ':' + date.getSeconds().padLeft();
		
		if(data.err) {
			metadata.innerHTML = 'ERROR - ' + formattedDate + ' :';
			response.innerHTML = data.err;
			return;
		}
		
		metadata.innerHTML = data.number + ' - ' + formattedDate + ' :';
		response.innerHTML = data.response;
	}
	else if(waiting) {
		// TO DO : animation
	}
	else {
		setResponse({'err' : 'Le serveur de SMS n\'est pas joignable, d&eacute;sol&eacute; !'});
	}
}

function reset() {
	responseForm.style.display = 'none';
	requestForm.reset();
	requestForm.style.display = '';
}
responseForm.onsubmit = reset;