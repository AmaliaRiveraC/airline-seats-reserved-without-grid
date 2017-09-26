//declaramos un arreglo que representara los asientos del avion
//declaramos cada lugar con false que significara que los asientos inicialmente estan vacios
//un asiento ocupado = true

var airlineSeats = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
];

//contador que servira para rastrear el numero de asientos ocupados en el vuelo
var busySeats = 0;

//declaramos una funcion que pinte los asientos en nuestro html
var paintSeats = function(array) {
  //notar que nuestro selector esta fuera del for. Cuantas veces necesitamos seleccionar al contenedor?
  var containerSeats = document.getElementById('seats');
  for(var i = 0; i < array.length; i++) {
    //el array que llega como parametro a nuestra funcion se utiliza para pintar el DOM
    var seat = document.createElement('div');
    seat.className = 'seats';

    //los primero 4 asientos los pintamos de un color que hara referencia a nuestra Primera Clase (morado)
    
    if(i < 4) {
      seat.style.background = 'purple';
    } else {
      //los ultimos 6 los pintamos de otro color que representara a nuestra clase Economica (amarillo)
      seat.style.background = 'yellow';
    }

    //appendChild agrega los divs correpondientes a cada asiento a nuestro contenedor en nuestro HTML
    containerSeats.appendChild(seat);
  }
};

var reserve = function() {
  var btn = document.getElementById('btn');
  btn.addEventListener('click', chooseZone);
};

var chooseZone = function() {
  var choice = prompt(
    'En que zona quieres reservar tu asientos \n 1. Primera Clase \n 2.Economica \n \n Por favor ingresa el numero'
  );
  if(choice == 1) {
    checkFirstClassZone();
  } else if(choice == 2) {
    checkEconomicZone();
  } else {
    alert('Ingresa un numero valido');
  }
};

var checkFirstClassZone = function() {
  var zone = 'Primera Clase';
  //con este ciclo for recorremos los asientos del 1 al 4
  for(var index = 0; index < 4; index++) {
    if(airlineSeats[index] == false) {
      airlineSeats[index] = true;

      //esta funcion indicara graficamente nuestros asientos reservados
      reserveSeat(index);
      //la funcion de paintTicket se encarga de pintar los tickets en nuestro DOm
      paintTicket(index, zone);
      //incrementamos en uno nuestro reastreador de asientos ocupados
      busySeats++;
      //al reservar un asiento no es necesario seguir recorriendo el arreglo por lo que salimos del for con un break
      break;
    } else if(index == 3 && airlineSeats[index] == true) {
      reasignEconomicZone(zone);
    }
  }
};

var checkEconomicZone = function() {
  var zone = 'Clase Economica';
  //con este for recorremos los asientos de clase economica del 5 al 10
  for(var index = 4; index < 10; index++) {
    if(airlineSeats[index] == false) {
      airlineSeats[index] = true;
      //esta funcion indicara graficamente nuestros asientos reservados
      reserveSeat(index);
      //la funcion que sigue se encarga de pintar los tickets de nuestros asientos reservados en nuestro DOM
      paintTicket(index, zone);
      //incrementamos en uno nuestro rastreador de asientos ocupados cada vez que se reserca un asiento
      busySeats++;
      //al reservar un asiento no es necesario seguir recorriendo el arreglo por lo que salimos del for utilizando break
      break;
    } else if(index == 9 && airlineSeats[index] == true) {
      reasignFirstClassZone(zone);
    }
  }
};

var reserveSeat = function(indexToPaint) {
  var seat = document.getElementsByClassName('seats');
  seat[indexToPaint].textContent = 'Ocupado';
};

var reasignEconomicZone = function(zone) {
  //si nuestro contador de rastreo de asientos ocupados es igual a 10 indicarle al usuario que no hay vuelos disponibles
  if(busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm(
      'Ya no quedan asientos diponibles en zona ' +
      zone +
      ' :( \n Quieres reservar en clase Economica'
    );
    if(reasign == true) {
      checkEconomicZone();
    } else {
      nextFlight();
    }
  }
};

var reasignFirstClassZone = function(zone) {
  //si nuestro contador de rastreo de asientos ocupados es igual a 10 indicarle al usuario que no hay vuelos disponibles
  if(busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm(
      'Ya no quedan asientos disponibles en zona ' +
      zone +
      ' :( \n Quieres reservar en Primera Clase'
    );
    if(reasign == true) {
      checkEconomicZone();
    } else {
      nextFlight();
    }
  }
};

var paintTicket = function(index, zone) {
  //para imprimir el pase de abordar necesitamos crear nuevos divs dinamicamente
  var containerTickets = document. getElementById('tickets');
  var ticket = document.createElement('div');
  ticket.className = 'tickets';
  var title = document.createElement('p');
  var reservedSeating = document.createElement('p');
  var zoneClass = document.createElement('p');
  title.textContent = 'Pase de abordar';
  reservedSeating.textContent = 'No. de asiento ' + (index + 1);
  zoneClass.textContent = 'Clase ' + zone;
  ticket.appendChild(title);
  ticket.appendChild(reservedSeating);
  ticket.appendChild(zoneClass);
  containerTickets.appendChild(ticket);
};

var noSeats = function() {
  alert('Lo sentimos ya no hay asientos disponibles :(');
};
var nextFlight = function() {
  alert('Nuestro proximo vuelo sale en 3 horas!');
};
paintSeats(airlineSeats);
reserve();