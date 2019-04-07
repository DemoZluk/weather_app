import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: true,
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
  },

  actions: {
    fetchWeatherData(context, options={}) {
      let url = '/api/v1/get_weather?format=json';
      if (options.city !== undefined) {
        url += '&city_name=' + options.city
      }
      if (options.units !== undefined) {
        url += '&units=' + options.units
      }

      axios.get(url)
        .then(response => {
          if (response.data.cod === 200) {
            context.commit('updateWeather', response.data)
          } else {
            console.error(response.data.cod, response.data.message);
          }
        })
        .catch(e => console.error(e))
        .finally(() => context.state.loading = false);
    }
  }
});

export default store
