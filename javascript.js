
const myLatLng = {
    lat: -5.79448,
    lng: -35.211
};

const mapOptions = {
  center: myLatLng,
  zoom: 13,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

const options = {
    types :'cities',
    radius :'100'
}

const from = document.getElementById("from");
const to = document.getElementById("to");

const map = new google.maps.Map(
    document.getElementById('googleMap'), 
    mapOptions
);

const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();


const autoCompleteFrom = new google.maps.places.Autocomplete(
    from, 
    options.types, 
    options.radius
);

const autoCompleteTo = new google.maps.places.Autocomplete(
    to, 
    options.types, 
    options.radius
);

directionsDisplay.setMap(map);

function calcRoute(){

    //CODIGO PARA PODE ESCOLHER O TIPO DE VIAGEM DRIVING WALKING, BYCYCLING, TRANSIT
    //const selectedMode = document.getElementById("mode").value;

    const request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.DRIVING, //[selectedMode], //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC //IMPERIAL
    }

    function respRoute(result,status){

        const response ={
            form: document.getElementById("from").value, //INPUT DO HTML
            to: document.getElementById("to").value,     //INPUT DO HTML 
            distanceText: result.routes[0].legs[0].distance.text,
            durationsText: result.routes[0].legs[0].duration.text
            //distanceValue: result.routes[0].legs[0].distance.value, DISTANCIA EM METROS
            //durationsValue: result.routes[0].legs[0].duration.value, TEMPO EM SEGUNDOS
        }

        if(status == "OK"){
            $("#output").html(
                "<div class='alert-info'>From: "+response.form+
                ".<br/>To: "+response.to+"<br/> Driving Distance: "+response.distanceText+
                ".<br/>Durations: "+response.durationsText+"</div>"
                ); 
                console.log(result);
            directionsDisplay.setDirections(result);
        }

        else{
            directionsDisplay.setDirections({routes:[]});
            map.setCenter(myLatLng);
            $("#output").html("<div class='alert-danger'>Could not retrive distance</div>");
        }  
    }
    directionsService.route(request, respRoute);   
}




