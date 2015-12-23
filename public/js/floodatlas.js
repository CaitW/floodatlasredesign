$(window).on('load',function(){
	// if($('footer').position().top<($(window).height()-$('footer').outerHeight())){
	// 	$('footer').css('top', function(){
	// 		return ($(window).height()-$('footer').outerHeight())
	// 	})
	// 	$('footer').css('position', 'absolute')


	// }
	// $('.sidenav').css('width',function(){
	// 	return $(this).width()
	// })
})
var map = L.map('header-map', {
    center: [51.505, -0.09],
    zoom: 13,
    layers: [
    	L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {name: 'Stamen.Toner', attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'})
    ],
    attributionControl: false,
    zoomControl: false,
    dragging: false,
    touchZoom: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false
});
// var footerMap= L.map('footer-map', {
//     center: [43.06161389125079, -89.44038391113281],
//     zoom: 12,
//     layers: [
//     	L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {name: 'Stamen.Toner', attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'})
//     ],
//     zoomControl: false

// });
// ASFPM = L.marker([43.05551666666666, -89.51645555555555]).addTo(footerMap)


function viewMeta(x){
	console.log(x)
	$("#metaModal .modal-title").html(""+x.title+", "+x.subtitle+"")
	$("#metaModal #downloadBTN").attr("href", x.link)
	$("#metaModal .modal-body").html(function(){
		body = ""
		body += ""+x.description+"<hr>"
		body += "<dl class='dl-horizontal'>"
		body += "<dt>Author</dt><dd>"+x.author+"</dd>"
		body += "<dt>Format</dt><dd>"+x.format+"</dd>"
		body += "<dt>Geometry</dt><dd>"+x.geometry+"</dd>"
		body += "<dt>Tags</dt><dd>"+x.tags+"</dd>"
		body += "</dl>"
		return body
	})
	$("#metaModal").modal()
}
