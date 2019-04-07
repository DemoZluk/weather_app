<template>
  <div class="theme--clear content">
    <header class="home-header">
      <div uk-grid class="city uk-child-width-1-2">
        <span class="city-name">
          {{ weatherData.name }}
        </span>
        <div class="temperature-unit-switch uk-flex uk-flex-right">
          <div>[C | F]</div>
        </div>
      </div>
      <div class="city-select uk-flex">
        <div uk-form-custom="target: true" class="change-city">
          <select>
            <option value="">Сменить город</option>
            <option value="1">Option 01</option>
            <option value="2">Option 02</option>
            <option value="3">Option 03</option>
            <option value="4">Option 04</option>
          </select>
          <span class="w-label">Change city</span>
        </div>
        <div class="my-location">
          <span class="w-label">
            My location
          </span>
        </div>
      </div>
    </header>
    <section class="home-main">
      <div class="temperature">
        <div class="temperature-icon"><i class="wi" :class="conditionIcons[weatherData.weather[0].main]"></i></div>
        <div class="temperature-text">{{ Math.round(weatherData.main.temp) }}&deg;</div>
      </div>
      <div class="weather-condition">{{ weatherData.weather[0].description }}</div>
    </section>
    <footer class="home-footer">
      <div uk-grid class="weather-data uk-child-width-1-2 uk-child-width-1-4@s">
        <div class="wind">
          <span class="w-label">
            Ветер
          </span>
          <div class="value">
            <span class="wind-speed">
              {{ weatherData.wind.speed }} м/с,
            </span>
            <span class="wind-direction">
              <i class="wi wi-wind-direction" :style="`transform: rotate(${weatherData.wind.deg}deg);`"></i>
            </span>
          </div>
        </div>
        <div class="pressure">
          <span class="w-label">
            Давление
          </span>
          <div class="value">
            {{ Math.round(weatherData.main.pressure * 0.750062) }} мм рт. ст.
          </div>
        </div>
        <div class="humidity">
          <span class="w-label">
            Влажность
          </span>
          <div class="value">
            {{ weatherData.main.humidity }}%
          </div>
        </div>
        <div class="precipitation">
          <!-- Данные по вероятности дождя openweathermap больше не предосталяет
          https://openweathermap.desk.com/customer/portal/questions/17457140-forecast-precipitation
           -->
          <span class="w-label">
            Видимость
          </span>
          <div class="value">
            {{ Math.round(weatherData.visibility / 100) / 10 }} км.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        conditionIcons: {
          Clear: 'wi-day-sunny',

        }
      }
    },
    computed: {
      weatherData() {
        return this.$store.state.weatherData
      }
    },
    methods: {
      showData() {
        console.log(this.$store.state.weatherData.weather);
      }
    },
    mounted() {
      this.$store.dispatch('fetchWeatherData')
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    height: 100vh;
    min-width: 100%;
    padding: 3rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: default;

    .home-header {
      .city-name {
        font-size: 2.5rem;
      }

      .city-select {
        .my-location {
          margin-left: 2rem;
        }
      }
    }

    .home-main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .temperature {
        display: flex;
        flex-direction: row;
      }

      .temperature-icon {
        font-size: 5rem;
        margin-right: 2rem;
      }

      .temperature-text {
        font-size: 5rem;
      }

      .weather-condition {
        text-transform: capitalize;
      }
    }

    .home-footer {
      margin-bottom: 2rem;

      .weather-data {
        .value {
          margin-top: 0.2rem;
        }
      }

      .wind-direction > i {
        font-size: 1.2rem;
        line-height: 1rem;
        vertical-align: middle;
      }
    }
  }

  .w-label {
    font-size: 0.8rem;
    opacity: 0.6;
  }
  
  .theme--clear.content {
    background-color: #498CEC;
    color: #FFF;

    .temperature-icon {
      color: #FFF9AE;
    }
  }
</style>