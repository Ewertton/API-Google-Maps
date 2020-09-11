const optionsMap = {
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
    optionsMap
);

const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();

const autoCompleteFrom = new google.maps.places.Autocomplete(
    from, 
    optionsMap.types, 
    optionsMap.radius
);

const autoCompleteTo = new google.maps.places.Autocomplete(
    to, 
    optionsMap.types, 
    optionsMap.radius
);

directionsDisplay.setMap(map);


function setInfoRoute(){
    //CODIGO PARA PODE ESCOLHER O TIPO DE VIAGEM DRIVING WALKING, BYCYCLING, TRANSIT
    //const selectedMode = document.getElementById("mode").value;
    const optionsRoute = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.DRIVING, //[selectedMode], //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC, //IMPERIAL
        
    }
    return optionsRoute
}

function getInfoMap(result){
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
     return response
 }

function calcRoute(){

    infoRoute = setInfoRoute()

    function displayResult(result,status){
        if(status === "OK"){
            infoMap =  getInfoMap(result)
            $("#output").html(
                "<div class='alert-info'>"+
                    "From: "+infoMap.form+
                    "<br/>To: "+infoMap.to+
                    "<br/>Driving Distance: "+infoMap.distanceText+
                    "<br/>Durations: "+infoMap.durationsText+
                "</div>"
                ); 
            directionsDisplay.setDirections(result);
        }
        else {
            $("#output").html(
                "<div class='alert-danger'>Could not retrive distance</div>"
                );
       }  
    }
    directionsService.route(infoRoute, displayResult);   
    
}