const initialCoords = {
  lat: 40.453185622901735,
  lng: -3.688312245789563
}
let map

function init() {
  renderMap()
  googleMapsService.getFieldFromApi()
  googleMapsService.getUserLocation()
}

function renderMap() {
  map = new google.maps.Map(
    document.querySelector('#map'),
    {
      zoom: 16,
      center: initialCoords
    }
  )
}