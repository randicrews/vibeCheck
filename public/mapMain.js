
function initMap() {
    // set up basic features of our map
    var options = {
      zoom: 13.5,
      center: { lat: 42.3601, lng: -71.0589 },
      clickableIcons: false,
      clickable: false,
      mapTypeControl: false,
      streetViewControl: false
    };
    var map = new google.maps.Map(document.getElementById('map'), options);

    // define what grayscale looks like
    const grayscaleStyle = [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#555555",
          },
        ],
      },
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#000000",
          },
        ],
      },
      {
        featureType: "administrative.country",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#000000",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          {
            saturation: -100,
            lightness: 0,
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "labels.icon",
        stylers: [
          {
            saturation: -100,
            lightness: 40,
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
          {
            saturation: -100,
            lightness: 0,
          },
        ],
      },
      {
        featureType: 'transit.station.train',
        elementType: 'labels.icon',
        stylers: [
          { saturation: -100 },
          { lightness: 0 }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [
          { saturation: -100 },
          { lightness: 0 }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            saturation: -100,
            lightness: 0,
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
          {
            saturation: -100,
            lightness: 0,
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          {
            saturation: -100,
            lightness: 0,
          },
        ],
      },
    ];
    // assign that style to a map type
    const grayscaleMap = new google.maps.StyledMapType(grayscaleStyle, {
      name: "Grayscale",
    });
    // apply that map type to our map
    map.mapTypes.set("grayscale", grayscaleMap);
    map.setMapTypeId("grayscale");
    var infoWindow = new google.maps.InfoWindow();

    fetch('/getdata', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      if (response.ok) return response.json();
    })
    .then(data => {
      var places = data.places;
      for (var i = 0; i < places.length; i++) {
        createMarker(map, infoWindow, places[i]);
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
  }

  function createMarker(map, infoWindow, place) {
    var center = { lat: Number(place.lat), lng: Number(place.long) };
    var circle = new google.maps.Circle({
      strokeOpacity: 0,
      strokeWeight: 2,
      fillColor: `rgb(${place.reports < 1 ? 120 : place.reports < 5 ? 255 : place.reports < 10 ? 255 - (place.reports - 5) * 20 : 255}, ${place.reports < 1 ? 80 : place.reports < 5 ? 150 : place.reports < 10 ? 100 : 0}, 0)`,
      fillOpacity: 0.5,
      map: map,
      center: center,
      radius: Math.sqrt(place.reports) * 100,
    });

    circle.addListener('mouseover', function () {
      var contentString =
      '<div class="info" id="info">' +
      `<h1 class="info" id="infoHeading">${place.name}</h1>` +
      '<div class="info" id="infoBody">' +
      `<h2 class="info"> reports: ${place.reports} </h2> <br>` +
      `<h3 class="info"> ${place.reportType} </h3>` +
      "</div>" +
      "</div>";
      var content = contentString
      infoWindow.setContent(content);
      infoWindow.setPosition(center);
      infoWindow.setOptions({ 
      pixelOffset: new google.maps.Size(0, -30), 
      className: 'infoWindow' 
    });
      infoWindow.open(map);
    });
    circle.addListener('mouseout', function() {
    infoWindow.close();
});
  }
  
$.get('/getdata')
  .done(function(response) {
    const placeNamesTemp = response.placesOnFile;
    const placeIDsTemp = response.placeIDs;

    // Remove duplicates from placeNamesTemp and placeIDsTemp
    const placeNames = [...new Set(placeNamesTemp)];
    const placeIDs = [...new Set(placeIDsTemp)];

    // Create an object mapping location names to IDs
    const placeData = {};
    for (let i = 0; i < placeNames.length; i++) {
      placeData[placeNames[i]] = placeIDs[i];
    }

    console.log(placeData); // Check if placeData is populated correctly

    // Initialize autocomplete with placeNames as the data source
    $('#autocomplete-input').autocomplete({
      source: placeNames,
      select: function(event, search) {
        // Retrieve the selected location ID based on the selected location name
        var selectedID = placeData[search.item.value];
        console.log("selected location ID:", selectedID);

        // Set the value of the hidden input field to the selected location ID
        $('#selected-location-id').val(selectedID);
      }
    });
  })
  .fail(function(textStatus, errorThrown) {
    console.error("error:", textStatus, errorThrown);
  });