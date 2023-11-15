class GoogleMapsService {
    constructor() {

    }

    getFieldFromApi() {
        return axios
            .get('/api/fields')
            .then(response => this.printFieldMarkers(response.data))
            .catch(err => console.log(err))
    }
    printFieldMarkers(fields) {
        fields.forEach(elm => {
          const position = { lat: elm.location.coordinates[0], lng: elm.location.coordinates[1] }
          const marker = new google.maps.Marker(
            {
              map: map,
              position,
              title: elm.name
            }
          )
          marker.addListener('click', () => {
            setTimeout(() => location.href = `http://localhost:5005/campos/detalles/${elm._id}`, 200)
          })
        })
    }
}

const googleMapsService = new GoogleMapsService()