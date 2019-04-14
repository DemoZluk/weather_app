<template>
  <div class="content" :class="'theme--' + weatherData.weather[0].main.toLowerCase()">
    <header class="home-header">
      <div uk-grid class="city">
        <span class="city-name uk-width-expand">
          <!--
          Сервис openweathermap не предоставляет русскоязычное название,
          а извлечение русскоязычного названия из онлайн-источника занимает много времени.
          Можно сделать свою базу на сервере для хранения всех доступных городов,
          но в данном проекте это будет лишнее поскольку размер базы будет очень большим.
          Поэтому ограничимся заранее ограниченным списком городов.
          -->
          {{ getLocalizedName(weatherData.name) }}
          <span uk-spinner v-if="loading"></span>
        </span>
        <div class="temperature-unit-switch uk-flex uk-flex-right uk-width-1-4 uk-width-1-6@m">
          <div class="switch">
            <span
                class="metric"
                :class="{selected: currentUnits === 'metric'}"
                @click="currentUnits = 'metric'"
            >&deg;C</span>
            <span
                class="imperial"
                :class="{selected: currentUnits === 'imperial'}"
                @click="currentUnits = 'imperial'"
            >&deg;F</span>
          </div>
        </div>
      </div>
      <div class="city-select uk-flex">
        <button class="w-label" type="button">Сменить город</button>
        <div uk-dropdown>
          <ul class="uk-nav uk-dropdown-nav">
            <li v-for="(value, key) in cityNames" :key="key" @click="currentCity = key"><a>{{ value }}</a></li>
          </ul>
        </div>
        <div class="my-location">
          <span class="w-label" style="cursor: pointer;" @click="resetWeather">
            Моё местоположение
          </span>
        </div>
      </div>
    </header>
    <section class="home-main">
      <div class="temperature">
        <div class="temperature-wrapper">
          <span class="temperature-icon"><i class="wi" :class="conditionIcons[weatherData.weather[0].main]"></i></span>
          <span class="temperature-text">{{ Math.round(weatherData.main.temp || 0) }}&deg;</span>
          <div class="weather-condition">{{ weatherData.weather[0].description }}</div>
        </div>
      </div>
      <footer class="home-footer">
        <div uk-grid class="weather-data uk-child-width-1-2 uk-child-width-1-4@s">
          <div class="wind">
          <span class="w-label">
            Ветер
          </span>
            <div class="value">
            <span class="wind-speed">
              {{ weatherData.wind.speed }},
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
              {{ weatherData.main.pressure }}
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
          <div class="visibility">
            <!-- Данные по вероятности дождя openweathermap больше не предосталяет
            https://openweathermap.desk.com/customer/portal/questions/17457140-forecast-precipitation
             -->
            <span class="w-label">
            Видимость
          </span>
            <div class="value">
              {{ weatherData.visibility }} км.
            </div>
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>

<script>
  import Cookie from 'js-cookie'

  export default {
    name: "Home",
    data() {
      return {
        conditionIcons: {
          Clear: 'wi-day-sunny',
          Rain: 'wi-rain',
          Clouds: 'wi-cloudy',
        },
        cityNames: {
          'Moscow': 'Москва',
          'Krasnodar': 'Краснодар',
          'Omsk': 'Омск',
        },
      }
    },
    computed: {
      weatherData() {
        return this.$store.state.weatherData
      },
      currentCity: {
        get() {
          return this.$store.state.currentCity || Cookie.get('currentCity') || 'Moscow'
        },
        set(value) {
          if (Cookie.get('currentCity') !== value) {
            this.$store.dispatch('fetchWeatherData', {city: value})
          }
        }
      },
      currentUnits: {
        get() {
          return this.$store.state.currentUnits || Cookie.get('currentUnits') || 'metric'
        },
        set(value) {
          if (Cookie.get('currentUnits') !== value) {
            this.$store.dispatch('fetchWeatherData', {units: value})
          }
        }
      },
      loading() {
        return this.$store.state.loading
      }
    },
    methods: {
      getLocalizedName(name) {
        return this.cityNames[name] || name
      },
      resetWeather() {
        Cookie.remove('currentCity');
        this.$store.dispatch('fetchWeatherData')
      },
    },
    created() {
      this.$store.dispatch('fetchWeatherData')
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/styles/home-themes.scss";

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
      flex-grow: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .temperature {
        flex-grow: 1;
        display: flex;
        align-items: center;
      }

      .temperature-wrapper {
        white-space: nowrap;
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
        text-align: center;
      }
    }

    .home-footer {
      margin-bottom: 2rem;
      width: 100%;

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

  .temperature-unit-switch .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.5rem;
    border-radius: 0.3rem;
    border: 0.05rem solid;
    overflow: hidden;
    
    & > span {
      width: 2.2rem;
      text-align: center;
      cursor: pointer;
    }
  }

  .w-label {
    font-size: 0.8rem;
    opacity: 0.6;
    background: none;
    border: none;
    color: inherit;
  }

  @media (max-width: 640px) and (orientation: landscape) {
    .content {
      padding: 1.5rem;

      .home-main {
        flex-direction: row;

        .temperature {
          margin-right: 2rem;
        }

        .temperature-icon {
          font-size: 4rem;
          margin-right: 1rem;
        }

        .temperature-text {
          font-size: 4rem;
        }
      }

      .home-footer {
        margin-bottom: 0;
        text-align: right;
      }
    }
  }
</style>