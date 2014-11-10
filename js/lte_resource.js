window.addEventListener('load', eventWindowLoaded, false) ;

var bgColor = "#000000" ;//"#817c7c"; //"#1d1f21" ;
var boardColor = "#424242" ;
var crsColor = "#cc6666" ;
var dtxColor = "#616161" ; //"#1d1f21" ;
var eptColor = "#dddddd" ;

var pdcchColor = "#81a2be" ;
var pcfichColor = "#f0c674" ;
var pssColor = "#b5bd68" ;
var sssColor = "#99cc99" ;
var pbchColor = "#cc99cc" ;
var phichColor = "#f99157" ;
var textColor = "#ffffff" ;

var ept = 0 ;
var pss = 1 ;
var sss = 2 ;
var pcfich = 3 ;
var phich = 4 ;
var pbch = 5 ;

// #1d1f21 Background
// #282a2e Current Line
// #373b41 Selection
// #c5c8c6 Foreground
// #969896 Comment
// #cc6666 Red
// #de935f Orange
// #f0c674 Yellow
// #b5bd68 Green
// #8abeb7 Aqua
// #81a2be Blue
// #b294bb Purple

var pid = 0 ;
var pss_gid = 0 ;
var sss_gid = 0 ;
var ant_port = 0 ;
var ant_num = 1 ;
var rb_num = 6 ;
var cp_length = 0 ;
var symb_num = 7 ;
var symb_pdcch = 2 ;
var phich_ng = 1/6 ;
var phich_dura = 0 ;
var pcfich_reg = new Array([0, 0, 0, 0]) ;

var re_width = 15 ;
var re_height = 12 ;
var canvas_width = re_width*14*10 ;
var canvas_height = re_height*rb_num*12 ;
var start_x = 2 ;
var start_y = 2 ;

function cnvs_getCoordinates(e, sleft, stop)
{
    x = e.clientX;
    y = e.clientY;
    x -= document.getElementById("main.RE").offsetLeft + start_x ;
    x += sleft ;
    y -= document.getElementById("main.RE").offsetTop + start_y ;
    y += stop ; 
    // get the sf idx
    x /= re_width ;
    x = Math.floor(x) ;
    y /= re_height ;
    y = rb_num * 12 - Math.ceil(y) ;
    document.getElementById("re_note").innerHTML="Subframe: #" + Math.floor(x/symb_num) + ", OFDM: #" + x%symb_num +
	", RB: #" + Math.floor(y/12) + ", Subcarrier: #" + y;
}
 
function cnvs_clearCoordinates()
{
    document.getElementById("re_note").innerHTML="";
}


function setPid(thepid)
{
    if (thepid.value < 0 || thepid.value > 503) {
    	alert("PID is within the range from 0 to 503!") ;
	thepid.value = 0 ;
    }

    var thepssgid = document.getElementById("pss-gid") ;
    var thesssgid = document.getElementById("sss-gid") ;
    
    pid = parseInt(thepid.value) ;
    pss_gid = pid % 3 ;
    sss_gid = Math.floor(pid/3) ;
    thepssgid.innerHTML= pss_gid ;
    thesssgid.innerHTML= sss_gid ;
    
    drawScreen() ;
}

function eventWindowLoaded() {
    // var formElement = document.getElementById("createImageData") ;
    // formElement.addEventListener('click', createImageDataPressed, false) ;
    // drawTop() ;
    // drawLeft() ;
    drawScreen() ;
}

function drawTop() {
    var canvas = document.getElementById("canvasTop") ;
    var context = canvas.getContext('2d');

    context.fillStyle = pdcchColor ;
    context.fillRect(start_x, 10, 20*7*15, 50) ;   

    context.lineCap="round";

    context.beginPath() ;
    context.strokeStyle = bgColor ;
    context.lineWidth = 3 ;
    x = start_x ;
    for (var i = 0; i <= 20 ; i++) {	
	if (i%2 == 0) {
    	    context.moveTo(x, 10) ;
	}
	else {
	    context.moveTo(x, 35) ;
	}
    	context.lineTo(x, 60) ;
    	x += 7*15 ;
    }
    context.moveTo(start_x, 10) ;
    context.lineTo(start_x+ 20*7*15, 10) ;

    context.moveTo(start_x, 35) ;
    context.lineTo(start_x+ 20*7*15, 35) ;

    context.moveTo(start_x, 60) ;
    context.lineTo(start_x+ 20*7*15, 60) ;

    context.stroke() ;
    context.closePath() ;
    
    context.font = "10pt bold Helvetica" ;
    context.textAlign = "center" ;
    context.textBaseline = "middle" ;

    context.fillStyle = bgColor ;
    
    x = start_x + 7*15 ;
    for (var i = 0; i < 10; i++) {
	context.fillText("Subframe #"+ i, x, 10+25/2) ; 
	x += 7*15*2 ;
    }

    x = start_x + 7*15/2 ;
    for (var i = 0; i < 20; i++) {
	context.fillText("Slot #"+ i%2, x, 35+25/2) ; 
	x += 7*15 ;
    }

    // y = start_y ;
    // for (var i = 0; i <= ; i++) {	
    // 	context.moveTo(start_x, y) ;
    // 	context.lineTo(x, y) ;
    // 	y += 12*re_height ;
    // }
    // context.stroke() ;
    // context.closePath() ;

    // context.drawStroke

}

function drawLeft() {
    drawLeftRB() ;
    // drawLeftSC() ;
}

function drawLeftSC() {
    var canvas = document.getElementById("canvasLeft") ;
    var context = canvas.getContext('2d');

    context.lineCap="round";

    context.beginPath() ;
    context.strokeStyle = boardColor ;
    context.lineWidth = 2 ;

    y1 = start_y+re_height ;
    y2 = start_y+re_height*11 ;
    for (var i = 0; i < rb_num ; i++) {	
    	context.moveTo(5, y1) ;
    	context.lineTo(55, y1) ;

    	context.moveTo(5, y2) ;
    	context.lineTo(55, y2) ;
    
    	y1 += re_height*12 ;
    	y2 += re_height*12 ;
    }
    context.stroke() ;
    context.closePath() ;

    context.font="light 8pt Helvetica";

    y1 = start_y + re_height*.5 ;
    y2 = start_y + re_height*11.5 ;
    for (var i = 0; i < rb_num; i++) {
    	context.fillText("sc " + (rb_num*12-11-12*i), 30, y2) ; 
    	context.fillText("sc " + (rb_num*12-12*i), 30, y1) ;
    	y1 += re_height*12 ;
    	y2 += re_height*12 ;
    }
}

function drawLeftRB() {
    var canvas = document.getElementById("canvasLeft") ;
    var context = canvas.getContext('2d');

    context.fillStyle = pdcchColor ;
    context.fillRect(5, start_y, 50, re_height*rb_num*12) ;
    context.lineCap="round";

    context.beginPath() ;
    context.strokeStyle = bgColor ;
    context.lineWidth = 3 ;
    
    y1 = start_y ;
    for (var i = 0; i <= rb_num ; i++) {	
	context.moveTo(5, y1) ;
    	context.lineTo(55, y1) ;
    
    	y1 += re_height*12 ;
    }

    context.moveTo(5, start_y) ;
    context.lineTo(5, start_y+re_height*rb_num*12) ;

    context.moveTo(55, start_y) ;
    context.lineTo(55, start_y+re_height*rb_num*12) ;

    context.stroke() ;
    context.closePath() ;

    context.font = "10pt bold Helvetica" ;
    context.textAlign = "center" ;
    context.textBaseline = "middle" ;

    context.fillStyle = bgColor ;
    
    y1 = start_y + re_height*5.5 ;
    y2 = start_y + re_height*6.5 ;
    for (var i = 0; i < rb_num; i++) {
    	context.fillText("PRB", 30, y1) ; 
	context.fillText("# " + (rb_num-1-i), 30, y2) ;
    	y1 += re_height*12 ;
    	y2 += re_height*12 ;
    }
}

function setAntOpt(antnum) {
    var antopt = document.getElementById("ant-opt") ;
    var tmpantlen = antopt.options.length ;

    for (var i = 0; i < tmpantlen; i++) {
    	antopt.options.remove(0) ;
    }

    for (var i = 0; i < antnum; i++) {
	var theOpt = document.createElement("Option") ;
	theOpt.innerHTML = i ;
	theOpt.value = i ;
	antopt.appendChild(theOpt) ;
    }

    ant_num = antnum ;
    ant_port = antopt.selectedIndex ;
    drawScreen() ;
}

function setAntPort(antport) {
    ant_port = antport ;
    drawScreen() ;
}

function setCPlength(theCp) {
    cp_length = theCp.selectedIndex ;
    if (cp_length == 0) {
	symb_num = 7 ;
	re_width = 15 ;
    }
    else {
	symb_num = 6 ;
	re_width = 17.5 ;
    }
    drawScreen() ;
}
function setBandWidth() {
    setPCFICH() ;
    setPHICH() ;

    var thebw = document.getElementById("dl-bw") ;
    var thecanvas = document.getElementById("canvasOne") ;
    rb_num = thebw.options[thebw.selectedIndex].value ;

    canvas_height = re_height * rb_num * 12 ;
    thecanvas.height = canvas_height + 30 ;
    // var theleft = document.getElementById("canvasLeft") ;
    // theleft.height = thecanvas.height ;
    // var thefake = document.getElementById("canvasFakeRight") ;
    // thefake.height = thecanvas.height ;
    drawScreen() ;
}

function setPCFICH() {
    var thebw = document.getElementById("dl-bw") ;
    var thesymb1 = document.getElementById("symb-pdcch") ;
    var thesymb2 = document.getElementById("symb-pdcch-real") ;

    if (thebw.selectedIndex == "0") {
	symb_pdcch = thesymb1.selectedIndex + 2 ;
    }
    else{
    	symb_pdcch = thesymb1.selectedIndex + 1 ;    
    }
    thesymb2.innerHTML = symb_pdcch ;
    drawScreen() ;
}

function setPHICH() {
    var thengdura = document.getElementById("ng-dura") ;
    var thengfactor = document.getElementById("ng-factor") ;
    var thebw = document.getElementById("dl-bw") ;
    var thesymb = document.getElementById("symb-pdcch") ;

    if (thengdura.selectedIndex == 1) {
	if (symb_pdcch < 3) {
	    thesymb.selectedIndex = 2 ;
	}
	setPCFICH() ;

	thesymb.options[0].disabled = true ;
	if (thebw.selectedIndex != 0) {
	    thesymb.options[1].disabled = true ;
	}
	else {
	    thesymb.options[1].disabled = false ;
	}
    }
    else {
	thesymb.options[0].disabled = false ;
	thesymb.options[1].disabled = false ;
    }
    
    phich_ng = parseFloat(thengfactor.options[thengfactor.selectedIndex].value) ;
    phich_dura = thengdura.selectedIndex ;
    drawScreen() ;
}

function drawScreen() {
    // drawLeft() ;
    var canvas = document.getElementById("canvasOne") ;
    var context = canvas.getContext('2d');

    context.font = "10px Helvectica" ;
    context.textAlign = "center" ;
    context.textBaseline = "middle" ;

    context.fillStyle = eptColor ;    
    context.fillRect(start_x, start_y, canvas_width, canvas_height) ;

    // draw pdcch
    drawPDCCH(context) ;
    // draw PCFICH
    drawPCFICH(context) ;
    // draw PHICH
    drawPHICH(context) ;    
    // draw PSS & SSS
    drawSS(context) ;
    // draw PBCH
    drawPBCH(context) ;
    // draw CRS
    drawCRS(context) ;
    // draw Stroke
    drawStroke(context) ;
}

function drawCRS(context) {
    var tmpColor ;
    var tmpCol ;
    var tmpRow ;
    var initCol ; 
    
    initCol = 0 ;
    tmpRow = (pid) % 6 ;
    tmpRow1 = (pid+3) % 6 ;
    tmpCol = initCol ;
    crsColors = new Array(dtxColor, dtxColor, dtxColor, dtxColor) ;
    crsColors[ant_port] = crsColor ;

    for (var j=0; j < rb_num*2; j++) {   
	for (var k=0; k < 20; k++) {
	    if (k%2 == 0) {
		drawResourceElement(context, tmpRow, tmpCol, crsColors[0], -1) ;
		drawResourceElement(context, tmpRow1, tmpCol, crsColors[1], -1) ;
		drawResourceElement(context, tmpRow1, tmpCol + 4, crsColors[0], -1) ;
		drawResourceElement(context, tmpRow, tmpCol + 4, crsColors[1], -1) ;
	    }
	    else {
		drawResourceElement(context, tmpRow, tmpCol, crsColors[1], -1) ;
		drawResourceElement(context, tmpRow1, tmpCol, crsColors[0], -1) ;
		drawResourceElement(context, tmpRow1, tmpCol + 4, crsColors[1], -1) ;
		drawResourceElement(context, tmpRow, tmpCol + 4, crsColors[0], -1) ;
	    }
	    if (ant_num == 4) {
		drawResourceElement(context, tmpRow, tmpCol + 1, crsColors[2], -1) ;
		drawResourceElement(context, tmpRow1, tmpCol + 1, crsColors[3], -1) ;
	    }		
	    tmpCol += symb_num ;
	}
	tmpRow += 6 ;
	tmpRow1 += 6 ;
	tmpCol = initCol ;
    }

}


function drawSS(context) {
    for (var i=0; i<62; i++) {
	drawResourceElement(context, i-31+6*rb_num, symb_num-1, pssColor, -1) ;
	drawResourceElement(context, i-31+6*rb_num, symb_num-2, sssColor, -1) ;

	drawResourceElement(context, i-31+6*rb_num, symb_num*10+symb_num-1, pssColor, -1) ;
	drawResourceElement(context, i-31+6*rb_num, symb_num*10+symb_num-2, sssColor, -1) ;
    }

    for (var i=-5; i<0; i++) {
	drawResourceElement(context, i-31+6*rb_num, symb_num-1, dtxColor, -1) ;
	drawResourceElement(context, i-31+6*rb_num, symb_num-2, dtxColor, -1) ;

	drawResourceElement(context, i-31+6*rb_num, symb_num*10+symb_num-1, dtxColor, -1) ;
	drawResourceElement(context, i-31+6*rb_num, symb_num*10+symb_num-2, dtxColor, -1) ;
    }

    for (var i=62; i<67; i++) {
	drawResourceElement(context, i-31+6*rb_num, symb_num-1, dtxColor, -1) ;
	drawResourceElement(context, i-31+6*rb_num, symb_num-2, dtxColor, -1) ;

	drawResourceElement(context, i-31+6*rb_num, symb_num*10+symb_num-1, dtxColor, -1) ;
	drawResourceElement(context, i-31+6*rb_num, symb_num*10+symb_num-2, dtxColor, -1) ;
    }
}

function drawPBCH(context) {
   for (var i=0; i<72; i++) {
       for (var j=0; j<4; j++) {
	   drawResourceElement(context, i-36+6*rb_num, symb_num+j, pbchColor, -1) ;
       }
    }
}

function drawPDCCH(context) {
    context.fillStyle = pdcchColor ;    
    for (var i=0; i < 10; i++) {
	context.fillRect(start_x+i*symb_num*re_width*2, start_y, symb_pdcch*re_width, canvas_height) ; 
    }
}

function drawPCFICH(context) {
    drawResourceElementGroup(context, pid % (2*rb_num), 0, pcfichColor) ;
    pcfich_reg[0] = (pid%(2*rb_num)) ;
    drawResourceElementGroup(context, pid % (2*rb_num) + Math.floor(rb_num/2), 0, pcfichColor, -1) ;
    pcfich_reg[1] = pid%(2*rb_num) + Math.floor(rb_num/2) ;
    drawResourceElementGroup(context, pid % (2*rb_num) + Math.floor(2*rb_num/2), 0, pcfichColor, -1) ;
    pcfich_reg[2] = pid%(2*rb_num) + Math.floor(2*rb_num/2) ;
    drawResourceElementGroup(context, pid % (2*rb_num) + Math.floor(3*rb_num/2), 0, pcfichColor, -1) ;
    pcfich_reg[3] = pid%(2*rb_num) + Math.floor(3*rb_num/2) ;
}

function drawPHICH(context) {
    var phich_gnum = Math.ceil(phich_ng*rb_num/8) ;    
    var n_bar = 0 ;
    var n_reg_l = 0 ;
    var n_reg_c = 0 ;

    var n_l = 0 ;

    if (ant_num == 4) {
	n_reg_c = rb_num * 12 / 6 ;
    }
    else {
	n_reg_c = rb_num * 12 / 4 ;
    }

    for (var m = 0; m < phich_gnum; m++) {
	for (var i = 0; i < 3; i++) {
	    if (phich_dura == 0) {
		n_l = 0 ;
	    }
	    else {
		n_l = i ;
	    }
	    
	    switch (n_l) {
		case 0 :
		n_reg_l = rb_num *2 - 4 ;
		break ;
		case 1 :
		n_reg_l = n_reg_c ;
		break ;
		case 2 :
		n_reg_l = rb_num * 12 / 4 ;
		break ;
	    }

	    n_bar = (Math.floor(pid * n_reg_l / n_reg_c) + m + Math.floor(i * n_reg_l / 3)) % n_reg_l ;
	    if (n_l == 0) {
		for (var j = 0; j < 4 ; j++) {
		    if (n_bar < pcfich_reg[j]) {
			break ;
		    }
		    else {
			n_bar ++ ;
		    }
		}
	    }
	    drawResourceElementGroup(context, n_bar, n_l, phichColor, m) ;
	}
    }
}

function drawStroke(context) {
    context.lineCap = 'square' ;

    var x = 15*14*10 + start_x ;
    var y = start_y ;
    // draw horizontal lines
    context.beginPath() ;
    // context.setLineDash([2, 4]);
    context.strokeStyle = boardColor ;
    context.lineWidth = 2 ;
    for (var i = 0; i < 12 * rb_num; i++) {	
    	context.moveTo(start_x, y) ;
	context.lineTo(x, y) ;
	y += re_height ;
    }
    context.stroke() ;
    context.closePath() ;
    // draw horizontal lines: between RBs
    context.setLineDash([0]);
    context.beginPath() ;
    context.strokeStyle = bgColor ;
    context.lineWidth = 3 ;
    y = start_y ;
    for (var i = 0; i <= rb_num; i++) {	
    	context.moveTo(start_x, y) ;
    	context.lineTo(x, y) ;
    	y += 12*re_height ;
    }
    context.stroke() ;
    context.closePath() ;
    // draw vertical lines
    // context.setLineDash([2, 4]);
    context.strokeStyle = boardColor ;
    context.beginPath() ;
    context.lineWidth = 2 ;

    x = start_x ;
    y = canvas_height + start_y ;
    for (var i = 0; i < symb_num * 2 * 10; i++) {	
    	context.moveTo(x, start_y) ;
	context.lineTo(x, y) ;
	x += re_width ;
    }
    context.stroke() ;
    context.closePath() ;
    // draw vertical lines between slots
    context.beginPath() ;
    context.strokeStyle = bgColor ;
    context.lineWidth = 3 ;
    x = start_x ;
    for (var i = 0; i <= 20 ; i++) {	
    	context.moveTo(x, start_y) ;
    	context.lineTo(x, y) ;
    	x += 7*15 ;
    }
    context.stroke() ;
    context.closePath() ;
}

function drawResourceElementGroup(context, nreg, ncol, color, text) {
    var nsc_reg = 6 ;
    if (ncol == 2 || (ncol == 1 && ant_num != 4)) {
	nsc_reg = 4 ;
    }
	
    var tmpRow = nsc_reg * nreg ;
    for (var i = 0; i < nsc_reg; i++) {
	var tmpCol = ncol ;
	for (var j=0; j < 10; j++) {
	    drawResourceElement(context, tmpRow+i, tmpCol, color, text) ;
	    tmpCol += 2*symb_num ;
	}
    }
}

function drawResourceElement(context, row, col, color, text) {
    row = row % (rb_num*12) ;
    var ptx = col * re_width + start_x;
    var pty = (12*rb_num - row - 1) * re_height + start_y;

    context.fillStyle = color ;
    context.fillRect(ptx, pty, re_width, re_height) ;   
    
    if (text > -1) {
	context.fillStyle = textColor ;
	context.fillText(text, ptx+re_width/2, pty+re_height/2) ; 
    }    
}    
