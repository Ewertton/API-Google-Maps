

const mapOptions = {
    center: {
        lat: -5.79448,
        lng: -35.211
    },
    zoom: 13,
    types :'cities',
    radius :'100'
    // mapTypeId: 'roadmap',//ALTERA MODO VISUALIZAÇÃO DO MAPA || roadmap, satellite, hybrid, terrain
};

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
    mapOptions.types, 
    mapOptions.radius
);

const autoCompleteTo = new google.maps.places.Autocomplete(
    to, 
    mapOptions.types, 
    mapOptions.radius
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
            durationsText: result.routes[0].legs[0].duration.text,
            lngFrom: result.routes[0].legs[0].start_location.lng(),//LONGITUDE ORIGEM
            latFrom: result.routes[0].legs[0].start_location.lat(),//LATITUDE ORIGEM
 
            lngTo: result.routes[0].legs[0].end_location.lng(),//LONGITUE DESTINO
            latTo: result.routes[0].legs[0].end_location.lat()//LATITUDE DESTINO

            //distanceValue: result.routes[0].legs[0].distance.value, DISTANCIA EM METROS
            //durationsValue: result.routes[0].legs[0].duration.value, TEMPO EM SEGUNDOS
        }

        if(status == "OK"){
            $("#output").html(
                "<div class='alert-info'>From: "+response.form+
                ".<br/>To: "+response.to+"<br/> Driving Distance: "+response.distanceText+
                ".<br/>Durations: "+response.durationsText+"</div>"
                ); 
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




