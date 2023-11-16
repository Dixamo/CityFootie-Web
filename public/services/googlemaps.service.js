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
      marker.addListener('click', () => location.href = `/campos/detalles/${elm._id}`)
    })
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(
        position => this.updateMapPosition(position),
        error => console.error('EL ERROR ES', error)
    )
  }

  updateMapPosition({ coords }) {

    const { latitude: lat, longitude: lng } = coords
    map.setCenter({ lat, lng })

    console.log(google.maps)

    new google.maps.Circle({
        position: { lat, lng },
        map: map
    })
  }
}

const googleMapsService = new GoogleMapsService()