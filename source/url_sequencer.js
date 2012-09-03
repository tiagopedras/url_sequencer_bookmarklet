javascript: (function () {

	var current_url = document.URL,//"http://www.closepics.com/media/galleries/metart_Augusta/Augusta_01.jpg",
		dot_index = current_url.lastIndexOf("."),
		url_part = current_url.substring(0, dot_index),
		extension_part = current_url.substring(dot_index),
		initial_number = "",
		number_length = 0,
		leading_zero = false;

	for (var i = dot_index; parseInt(current_url.substring(i-1, i)) == current_url.substring(i-1, i); i--) {
		initial_number = current_url.substring(i-1, i) + initial_number;
		number_length++;
	}
	if (initial_number.substring(0,1) == "0") leading_zero = true;
	last_valid_number = parseInt(initial_number);
	url_part = url_part.substring(0, url_part.length-number_length);


	//TEST URL EXISTANCE


	//CREATE NEW PAGE AND CONTENT
	var doc = open().document;
	doc.write("<html><head><style>body { margin: 20px; background-color: #222222; font-family: Helvetica, Arial; color: white; } a { color: white; } #status { float:left; } nav { float: right; text-align: right; margin-bottom: 20px; } #images { overflow: hidden; margin-top: 20px; list-style: none; padding: 0;} #images li { float: left; margin-bottom: 10px; }#images.grid6 li { width: 16.66%; height: 16.66%; }#images.grid4 li { width: 25%; height: 25%; }#images.grid2 li { width: 50%; height: 50%; }img { max-width: 100%; max-height: 100%; } ol { clear:both; } #urls { clear: both; margin-top:90px; color: #CCC; }</style>");
	doc.write('<script src="http://code.jquery.com/jquery.min.js"></script></head>');
	doc.write('<body><small id="status"></small><nav><a href="javascript:document.getElementById(\'images\').setAttribute(\'class\', \'grid6\');" id="grid6">Grid of 6</a> <a href="javascript:document.getElementById(\'images\').setAttribute(\'class\', \'grid4\');" id="grid4">Grid of 4</a> <a href="javascript:document.getElementById(\'images\').setAttribute(\'class\', \'grid2\');" id="grid2">Grid of 2</a></nav>');
	doc.write('<ol id="images" class="grid4">');
    doc.write("</ol>");
    doc.write('<small id="urls"><h3>URLs</h3><ol>');
    doc.write("</ol>");
	doc.write("<script>function zeroFill(number,length){var str=number.toString();while(str.length<length)str='0'+str;return str}");
	doc.write("function addImage(url_part,extension_part,initial_number,number_length,leading_zero){if(leading_zero){var src=url_part+zeroFill(initial_number,number_length)+extension_part}else{var src=url_part+initial_number+extension_part}$('#images').append($('<li>'));var li=$('#images li:last-of-type');$(li).append($('<a>'));var a=$('#images li:last-of-type a').attr('href',src);$(a).append($('<img>').attr('src',src).error(function(){$(this).parent().parent().hide()}).load(function(){addImage(url_part,extension_part,initial_number+1,number_length,leading_zero);$('#urls').append($('<li>').text(src))}))}");
	doc.write("addImage('"+url_part+"', '"+extension_part+"', "+initial_number+", "+number_length+", "+leading_zero+");");
	doc.write("</script></body></html>");
	doc.close();

})(); /* by @tiagopedras */