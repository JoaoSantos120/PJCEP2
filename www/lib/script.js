window.onload = function (){
const buscar = document.querySelector("#buscar");
const cep = document.querySelector("#cep");
const opcoes = {
  method:'GET',
  mode:'cors',
  cache:'default'
}
buscar.addEventListener("click", function(){
 fetch(`https://viacep.com.br/ws/${ cep.value }/json/`,opcoes)
 .then(response => {response.json()
 .then(data => {
   document.querySelector("#estado").value = data['uf'];
   document.querySelector("#cidade").value = data['localidade'];
   document.querySelector("#bairro").value = data['bairro'];
   document.querySelector("#rua").value = data['logradouro'];
 })
 })
})

function mapa(lat, long){
    L.mapquest.key = 'VQitdAURRgsi46QRwiNIGcKgw08yreH0';

        var map = L.mapquest.map('map', {
          center: [lat, long],
          layers: L.mapquest.tileLayer('map'),
          zoom: 12
        });

        map.addControl(L.mapquest.control());
  }
  
  document.querySelector("#button").addEventListener("click", function(){

    var onSuccess = function(position) {
      mapa(position.coords.latitude,position.coords.longitude);
    }
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });
}