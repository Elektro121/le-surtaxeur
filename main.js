var form = document.getElementById('request_form');
var responseForm = document.getElementById('response_form');

window.onload = function() {
	
	// if javascript is enabled, the page hasn't to be refreshed	
	form.action = "#";
}

form.onsubmit = function() {
	
	// We get the elements from the form
	var code = document.getElementById('code').value;
	var number = parseInt(document.getElementById('number').value);
	
	var xhr = new XMLHttpRequest();
	
	// We request the API to get a response
	xhr.open('GET', 'api/index.php?method=getsms&code=' + code + '&number=' + number);
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			var data = JSON.parse(xhr.responseText);
			setResponse(data);
		}
		else if(xhr.readyState == 4 && xhr.status != 200) {
			setResponse(false);
		}
	}
	
	xhr.send(null);
	
	// waiting function
}

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

function setResponse(data) {
	form.style.display = 'none';
	
	responseForm.style.display = '';
	
	if(!data) {
		// some error messages
		return;
	}
	
	var response = document.getElementById('response');
	var date = new Date();
	var formattedDate = date.getHours().padLeft() + ':' + date.getMinutes().padLeft() + ':' + date.getSeconds().padLeft();
	
	response.innerHTML = data.number + ' - ' + formattedDate + ' : <br/>' + data.response;
}

function reset() {
	responseForm.style.display = 'none';
	form.reset();
	form.style.display = '';
}
responseForm.onsubmit = reset;