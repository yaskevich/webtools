var maps  = [
{
"А" : "A",
"Б" : "B",
"В" : "V",
"Г" : "H",
"Ґ" : "G",
"Д" : "D",
"Е" : "E",
"Ё" : "Ë",
"Ж" : "Ž",
"З" : "Z",
"I" : "I",
"Й" : "J",
"К" : "K",
"Л" : "L",
"М" : "M",
"Н" : "N",
"О" : "O",
"П" : "P",
"Р" : "R",
"С" : "S",
"Т" : "T",
"У" : "U",
// "Ў" : "Ŭ(W)",
"Ў" : "Ŭ",
"Ф" : "F",
"Х" : "X",
"Ц" : "C",
"Ч" : "Č",
"Ш" : "Š",
"Ы" : "Y",
"Ь" : "ʹ",
"Э" : "È",
"Ю" : "Ju",
"Я" : "Ja",
"а" : "a",
"б" : "b",
"в" : "v",
"г" : "h",
"ґ" : "g",
"д" : "d",
"е" : "e",
"ё" : "ë",
"ж" : "ž",
"з" : "z",
"і" : "i",
"й" : "j",
"к" : "k",
"л" : "l",
"м" : "m",
"н" : "n",
"о" : "o",
"п" : "p",
"р" : "r",
"с" : "s",
"т" : "t",
"у" : "u",
// "ў" : "ŭ(w)",
"ў" : "ŭ",
"ф" : "f",
"х" : "x",
"ц" : "c",
"ч" : "č",
"ш" : "š",
"ы" : "y",
// "ь" : "ʹ",
"ь" : "’",
"э" : "è",
"ю" : "ju",
"я" : "ja"
},
{
"А" : "A",
"Б" : "B",
"В" : "V",
"Г" : "G",
"Д" : "D",
"Е" : "E",
"Ё" : "Ë",
"Ж" : "Ž",
"З" : "Z",
"И" : "I",
"Й" : "J",
"К" : "K",
"Л" : "L",
"М" : "M",
"Н" : "N",
"О" : "O",
"П" : "P",
"Р" : "R",
"С" : "S",
"Т" : "T",
"У" : "U",
"Ў" : "Ŭ",
"Ф" : "F",
"Х" : "X",
"Ц" : "C",
"Ч" : "Č",
"Ш" : "Š",
"Щ" : "Šč",
"Ы" : "Y",
"Ь" : "ʹ",
"Ъ" : "",
"Э" : "È",
"Ю" : "Ju",
"Я" : "Ja",
"а" : "a",
"б" : "b",
"в" : "v",
"г" : "g",
"д" : "d",
"е" : "e",
"ё" : "ë",
"ж" : "ž",
"з" : "z",
"и" : "i",
"й" : "j",
"к" : "k",
"л" : "l",
"м" : "m",
"н" : "n",
"о" : "o",
"п" : "p",
"р" : "r",
"с" : "s",
"т" : "t",
"у" : "u",
"ф" : "f",
"х" : "x",
"ц" : "c",
"ч" : "č",
"ш" : "š",
"щ" : "šč",
"ы" : "y",
// "ь" : "ʹ",
"ь" : "’",
"ъ" : "",
"э" : "è",
"ю" : "ju",
"я" : "ja"
}];



$(function() { 	
	$( ".tr" ).click(function() {
	  var content = $('textarea.txt').val();
	  var res = '';
	  var mapping  = maps[location.pathname === '/latru'|0];
	  for (var i = 0; i < content.length; i++) {
		var ch = content.charAt(i);  
		var trch = mapping.hasOwnProperty(ch)?mapping[ch]:ch;	
		res += trch;
		}
	  $(".result").html(res);	
	});
	
	
	$( ".char" ).click(function() {
	  var content = $('textarea.uni').val();
	  var res = '';
	  
		//  $( ".result" ).html( data );
		
		var letters = $('textarea.uni').val()
		
		var jqxhr = $.post( "api/uni", { txt: letters })
		  .done(function(x) {
			console.log( x.data);
			var res = '';
			
			
			$.each( x.data.mapping, function( key, value ) {
				
			  res +='<div class="row"><div class="col-sm-1"><div class="box-colored">'+value[0]+'</div></div><div class="col-sm-11"><div class="box-colored">'+x.data.content[value[1]]+'</div></div></div>';
			});
			$(".result").html(res);	
			// let kz  = x.data.content.map(function(d) {
			  // return d.codeval:d.charname;
			// });
			// console.log(kz);
		  })
		  .fail(function() {
			console.log( "error" );
		  })
		  .always(function() {
			console.log( "finished" );
		  });		
	  
	  // $(".result").html(res);	
	});	
});