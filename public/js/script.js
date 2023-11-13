const initialCoords = {
  lat: 40.453185622901735,
  lng: -3.688312245789563
}
let myMaps

function init() {
  renderMap()
  getFieldFromApi()
}

function renderMap() {
  myMaps = new google.maps.Map(
    document.querySelector('#map'),
    {
      zoom: 16,
      center: initialCoords
    }
  )
}

function getFieldFromApi() {

  axios
    .get('/api/campos')
    .then(response => printFieldMarkers(response.data))
    .catch(err => console.log(err))
}


function printFieldMarkers(fields) {
  fields.forEach(elm => {
    const position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }
    const marker = new google.maps.Marker(
      {
        map: myMaps,
        position,
        title: elm.name
      }
    )
    marker.addListener('click', () => {
      setTimeout(() => location.href = `http://localhost:5005/campos/detalles/${elm._id}`, 200)
    })
  })
}