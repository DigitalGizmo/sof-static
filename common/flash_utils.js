<!--
//=============================
// Flash Detection Script
// Revision 2002.03.17
// Second Story
//=============================

var isFlash4 = false;
var isFlash5 = false;
var isFlash6 = false;

var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;		// true if we're on ie
var isWin = (navigator.appVersion.indexOf("Windows") != -1) ? true : false; // true if we're on windows

// VBScript Detection on IE/Windows
if(isIE && isWin){ 
	document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
	document.write('on error resume next \n');
	document.write('isFlash4 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))) \n');
	document.write('isFlash5 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))) \n');	
	document.write('isFlash6 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.6"))) \n');	
	document.write('</SCR' + 'IPT\> \n');
}

// Netscape PlugIn Detection
function detectFlash(){	
	if (navigator.plugins){
		if (navigator.plugins["Shockwave Flash 2.0"]
		|| navigator.plugins["Shockwave Flash"]){

			var isVersion2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + isVersion2].description;
			var flashVersion = parseInt(flashDescription.charAt(flashDescription.indexOf(".") - 1));
			isFlash4 = flashVersion >= 4;
			isFlash5 = flashVersion >= 5;
		}
	}	
}
detectFlash();

if ( (navigator.userAgent.indexOf('MSIE 4.5') != -1) && (navigator.userAgent.indexOf('Mac') != -1)) {
	alert('This interactive feature requires Macromedia Flash player 5 and will not function properly with an earlier version of Flash.');
	isIE45=true; isFlash5=true;
}

if (isFlash6) isFlash5=true;
if (isFlash5) isFlash4=true;


// Returns HTML Code to Embed a SWF File
function flashEmbed(swf,width,height,bgcolor,qual) {
		if (!bgcolor) bgcolor="#000000";
		if (!qual) qual='HIGH';
		var code = '<OBJECT CLASSID="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
		+ 'WIDTH="'+width+'" HEIGHT="'+height+'"'
		+ 'CODEBASE="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">'
		+ '<PARAM NAME="MOVIE" VALUE="'+swf+'">'
		+ '<PARAM NAME="PLAY" VALUE="true">'
		+ '<PARAM NAME="LOOP" VALUE="false">'
		+ '<PARAM NAME="QUALITY" VALUE="'+qual+'">'
		+ '<PARAM NAME="MENU" VALUE="false">'
		+ '<PARAM NAME=salign VALUE=LT>'
		+ '<PARAM NAME=bgcolor VALUE="'+bgcolor+'"> '
		+ '<EMBED SRC="'+swf+'" '
		+ 'WIDTH="'+width+'" HEIGHT="'+height+'" '
		+ 'salign=LT '
		+ 'PLAY="true" '
		+ 'LOOP="false" '
		+ 'QUALITY="'+qual+'" '
		+ 'MENU="false" '
		+ 'BGCOLOR="'+bgcolor+'" '
		+ 'TYPE="application/x-shockwave-flash" '
		+ 'PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">'
		+ '</EMBED>'
		+ '</OBJECT>';
		return(code);
}
//-->