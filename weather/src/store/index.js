import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    weatherData: {}
  },

  mutations: {
    updateWeather(state, weatherData) {
      state.weatherData = weatherData;
    },
  },

  actions: {
    fetchWeatherData(context) {
      axios.get('/api/v1/get_weather?format=json&city_name=Krasnodar')
        .then(response => {
          console.log(response.data);
          if (response.data.cod === 200) {
            context.commit('updateWeather', response.data)
          } else {
            console.error(response.data.cod, response.data.message);
          }
        })
        .catch(e => console.error(e));
    }
  }
});

export default store
