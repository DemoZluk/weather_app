<template>
  <div class="theme--clear content">
    <header class="home-header">
      <div uk-grid class="city uk-child-width-1-2">
        <span class="city-name">
          Omsk
        </span>
        <div class="temperature-unit-switch uk-flex uk-flex-right">
          <div>[C | F]</div>
        </div>
      </div>
      <div class="city-select uk-flex">
        <div uk-form-custom="target: true" class="change-city">
          <select>
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
        <div class="temperature-icon"><i class="wi wi-day-sunny"></i></div>
        <div class="temperature-text">+19&deg;</div>
      </div>
      <div class="weather-condition">Clear</div>
    </section>
    <footer class="home-footer">
      <div uk-grid class="weather-data uk-child-width-1-2 uk-child-width-1-4@s">
        <div class="wind">
          <span class="w-label">
            Wind
          </span>
          <div class="value">
            Wind
          </div>
        </div>
        <div class="pressure">
          <span class="w-label">
            Pressure
          </span>
          <div class="value">
            Pressure
          </div>
        </div>
        <div class="humidity">
          <span class="w-label">
            Humidity
          </span>
          <div class="value">
            Humidity
          </div>
        </div>
        <div class="precipitation">
          <span class="w-label">
            Precipitation
          </span>
          <div class="value">
            Precipitation
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default {
    name: "Home",
    mounted() {
      console.log(this.$store.state.test);
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
    }

    .home-footer {
      margin-bottom: 2rem;

      .weather-data {
        .value {
          margin-top: 0.2rem;
        }
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