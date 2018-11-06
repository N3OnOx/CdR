//////////////////////////////////////////////////////
// Recursos de la familia
//////////////////////////////////////////////////////

actualizar();
constructionsModal();

function actualizar() {
    $(document).ready(function() {
        var socket = io();
        socket.emit('resources', { id: id });
        socket.on('resources', function(data) {
            let food = data[0];
            let wine = data[1];
            let wood = data[2];
            let iron = data[3];
            let stone = data[4];
            document.getElementById("food").innerHTML = food;
            document.getElementById("wine").innerHTML = wine;
            document.getElementById("wood").innerHTML = wood;
            document.getElementById("iron").innerHTML = iron;
            document.getElementById("stone").innerHTML = stone;
        });
    });
}
// Si queremos actualizar el recurso en tiempo real en nuestro cliente descomentar la siguiente linea. Si no, se actualizaran los recursos al recargar la página
setInterval(actualizar, 1000);

function constructionsModal() {
    var socket = io();
    socket.emit('constructionsModal', { id: id });
    socket.on('constructionsModal', function(data) {
        let fechaHoy = new Date();
        for (var i = 0; i < data.length; i++) {
            let fechaEnd = new Date(data[i].dateEnd);
            if (fechaEnd < fechaHoy) {
                socket.emit('constructionsModalEnd', { id: id, construction: data[i].construction });
                socket.on('constructionsModalEnd', function(data) {
                    console.log(data);
                });
                location.reload();
            } else {
                countDown(data[i]);
            }
        }
    });
}

function countDown(date) {

    // Set the date we're counting down to
    var countDownDate = new Date(date.dateEnd).getTime();
    var nameConstruction = date.construction;
    var node = document.createElement("DIV");
    node.id = date.construction + "Name";
    var textnode = document.createTextNode(nameConstruction);
    node.appendChild(textnode);
    document.getElementById("constructionsModalName").appendChild(node);

    var node2 = document.createElement("DIV");
    node2.id = date.construction + "Time" + date.level;
    var textnode2 = document.createTextNode("00:00:00");
    node2.appendChild(textnode2);
    document.getElementById("constructionsModalTime").appendChild(node2);

    // Update the count down every 1 second
    var i = setInterval(function() {
        // Get todays date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (days < 10) { days = "0" + days; }
        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        // Output the result in an element with id="demo"                   

        document.getElementById(node2.id).innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(i);
            document.getElementById(node2.id).innerHTML = "Finalizado";
            socket.emit('constructionsModalEnd', { id: id, construction: date.construction });
            socket.on('constructionsModalEnd', function(data) {
                console.log(data);
            });
            location.reload();

        };
    }, 1000);

}

//////////////////////////////////////////////////////
// Construcciones de la familia
//////////////////////////////////////////////////////


let divConstructions = $('#constructions');
let html = '';
var socket = io();
socket.emit('constructions', { id: id });
socket.on('constructions', function(data) {
    for (var i = 0; i < data.length; i++) {
        let value;
        if (data[i][2] < data[i][5]) {
            value = data[i][4].split(';');
        }
        html += '   <li class="list-group-item">';
        html += '       <p>Description of ' + data[i][0] + '</p>';
        if (data[i][2] < data[i][5]) {
            html += '   <p>Valor: ' + value[0] + ' ||| Beneficio: ' + data[i][3] + '</p>';
            html += '   <button class=\"btn updateConstructionButton\" id=\"' + data[i][0] + '\" onclick=\"updateConstruction(\'' + data[i][0] + '\')\" >Subir a nivel ' + (data[i][2] + 1) + ' <span id="time' + data[i][0] + '"></span></button>';
        }
        html += '   </li>';

    }
    divConstructions.html(html);
});


function updateConstruction(construction) {
    socket.emit('message', { id: id, construction: construction });
    socket.on('time', function(time) {
        console.log('El server te envia tiempo: ' + time + ' milisegundos');
        console.log("Bloqueando boton");
        location.reload();
    });

}