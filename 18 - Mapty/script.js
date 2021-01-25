'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

var myIcon = L.icon({
    iconUrl: 'map-pin-fill.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position.coords);

        const {latitude, longitude} = position.coords;
        const coords = [latitude, longitude];

        let map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // L.marker(coords).addTo(map)
        //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        //     .openPopup();
        
        map.on('click', function(event) {
            // console.log(event);

            const {lat:latitude, lng:longitude} = event.latlng;
            // console.log(latitude, longitude);

            L.marker([latitude, longitude]).addTo(map)
            .bindPopup(L.popup({
                maxwidth: 250,
                minwidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup',
                
            }).setContent('Running Workout'))
            .openPopup();

            // L.marker([latitude, longitude], {icon: myIcon}).addTo(map);
        });

    }, function () {
        alert('Current Location not found!!! Check INternet?');
    })
}
