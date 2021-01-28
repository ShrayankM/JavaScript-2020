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

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);

    constructor(distance, duration, coords) {
        this.distance = distance;
        this.duration = duration;
        this.coords = coords;
    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // console.log(this.type);
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
}

class Running extends Workout {
    type = 'running';
    constructor(distance, duration, coords, cadence) {
        super(distance, duration, coords);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        this.pace = Math.trunc(this.duration / this.distance);
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(distance, duration, coords, elevationGain) {
        super(distance, duration, coords);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        this.speed = Math.trunc(this.distance / (this.duration / 60));
        return this.speed;
    }
}

class App {

    //! private fields
    #map;
    #mapEvent;
    #workouts = [];
    constructor() {
        this._getPosition();

        // this._getLocalStorage();
        inputType.addEventListener('change', this._toggleElevationField);
        form.addEventListener('submit', this._newWorkout.bind(this));
        containerWorkouts.addEventListener('click', this._movePopupTo.bind(this));
    }

    _getPosition() {
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
            alert('No Internet or Position Problem!!!');
        });
    }

    _loadMap(position) {
        const { latitude, longitude } = position.coords;
        const coords = [latitude, longitude];

        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);


        this.#map.on('click', this._showForm.bind(this));
        this._getLocalStorage();
    }

    _hideForm() {

        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }

    _showForm(mapEvent) {
        this.#mapEvent = mapEvent;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField() {
        inputCadence.parentElement.classList.toggle('form__row--hidden');
        inputElevation.parentElement.classList.toggle('form__row--hidden');
    }

    _newWorkout(event) {
        event.preventDefault();
        //**** Get Workout Coords ****//

        const { lat, lng } = this.#mapEvent.latlng;
        const coords = [lat, lng];

        //**** ***************** ****//
        //**** Form validation helper functions *****//

        const numberInputs = function (...inputs) {
            return inputs.every(i => Number.isFinite(i));
        }

        const positiveInputs = function (...inputs) {
            return inputs.every(i => i > 0);
        }

        //**** ******************************** *****//
        //**** Get Data from Form ****//

        const type = inputType.value;

        const distance = Number(inputDistance.value);
        const duration = Number(inputDuration.value);
        let workout;
        // let cadence = 0; let elevationGain = 0;

        if (type === 'running') {
            const cadence = Number(inputCadence.value);

            if (!numberInputs(distance, duration, cadence) || !positiveInputs(distance, duration, cadence))
                return alert('Please enter only positive numbers!!!');

            workout = new Running(distance, duration, coords, cadence);
        }
        else {
            const elevationGain = Number(inputElevation.value);

            //! elevationGain might be negative
            if (!numberInputs(distance, duration, elevationGain) || !positiveInputs(distance, duration))
                return alert('Please enter only positive numbers!!!');

            workout = new Cycling(distance, duration, coords, elevationGain);
        }
        this.#workouts.push(workout);

        this._setLocalStorage();

        //**** ****************** ****//
        //**** Render Workout Marker and Workout ****//

        this._renderWorkoutMarker(workout);
        this._renderWorkout(workout);

        //**** ******************** ****//

        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = "";

        this._hideForm();
    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxwidth: 250,
                minwidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`,
            }).setContent(`${workout.type == 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`))
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">
            ${workout.type == 'running' ? '🏃‍♂️' : '🚴‍♀️'}
            </span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
        `

        if (workout.type == 'running') {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            </li>`;
        }
        else {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
            </div>
            </li>`;
        }

        form.insertAdjacentHTML('afterend', html);
    }

    _movePopupTo(event) {
        const workoutEl = event.target.closest('.workout');
        if (!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);

        console.log(workout);

        this.#map.setView(workout.coords, 13, {
            animate: true,
            pan: {
                duration: 1
            }
        });
    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts));
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));

        if (!data) return;
        data.forEach(workout => {
            this.#workouts.push(workout);
            this._renderWorkout(workout);
            this._renderWorkoutMarker(workout);
        });
    }

    reset() {
        localStorage.removeItem('workouts');
        location.reload();
    }
}

const app = new App();
