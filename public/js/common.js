$(document).ready(function() {
    // Obtenemos por url el path y añadimos la clase active al navbar
    var pathname = window.location.pathname;
    $('.nav > li > a[href="' + pathname + '"]').parent().addClass('active');
})