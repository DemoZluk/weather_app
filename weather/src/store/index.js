import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import db from './indexedDB';
import Dexie from 'dexie'
import Cookie from 'js-cookie'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: true,
    currentCity: '',
    currentUnits: '',
    weatherData: {
      main: {},
      weather: [{}],
      wind: {},
    }
  },

  mutations: {
    updateWeather(state, weatherData) {
      state.weatherData = weatherData;
    },

    updateCurrentCity(state, city_name) {
      state.currentCity = city_name
    },

    updateCurrentUnits(state, units) {
      state.currentUnits = units
    },
  },

  actions: {
    fetchWeatherData(context, { city=Cookie.get('currentCity'), units=Cookie.get('currentUnits') } = {}) {
      let url = '/api/v1/get_weather?format=json';

      context.state.loading = true;

      if (city !== undefined) {
        url += '&city_name=' + city
      }

      if (units !== undefined) {
        url += '&units=' + units
      }

      axios.get(url)
        .then(response => {
          if (response.data.cod === 200) {
            context.dispatch('setCurrentCity', response.data.name);

            if (units !== undefined) {
              context.dispatch('setCurrentUnits', units)
            }

            context.commit('updateWeather', response.data)
          } else {
            console.error(response.data.cod, response.data.message);
          }
        })
        .catch(e => console.error(e))
        .finally(() => context.state.loading = false);
    },

    setCurrentCity(context, cityName) {
      context.commit('updateCurrentCity', cityName);
      Cookie.set('currentCity', cityName, {expires: 365, path: '/'})
    },

    setCurrentUnits(context, units = 'metric') {
      context.commit('updateCurrentUnits', units);
      Cookie.set('currentUnits', units, {expires: 365, path: '/'});
    },

    // setUpProfile(context) {
    //   Dexie.spawn(function* () {
    //     const profile = yield db.profile.put({id: 1, currentCity: 'Moscow', currentUnits: 'metric'});
    //     console.log(profile);
    //   })
    // }
  },
});

export default store
