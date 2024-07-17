/*
  Name: Ryley Green
  Page: script.js
  Assignment: Current Weather
  Date: 5/5/2022
*/

//Puts main content into component
Vue.component("weather", {
  template: `
  <div class="container">
    <label for="zip" class="form-label">Zip Code: </label>
    <input
      @input="$root.sendData()"
      type="number"
      class="form-control shorten center"
      id="zip"
      max="99999"
      name="ZipCode"
      required
    />
    <div class="mb-3">
      <div class="form-check-inline">
        <input
          @input="$root.sendData()"
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          value="Imperial"
          checked
        />
        <label class="form-check-label" for="flexRadioDefault1"> °F </label>
      </div>
      <div class="form-check-inline">
        <input
          @input="$root.sendData()"
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          value="Metric"
        />
        <label class="form-check-label" for="flexRadioDefault2"> °C </label>
      </div>
    </div>
    <div id="result">
      <p id="info">Please enter a five digit Zip Code and Measurement.</p>
    </div>
  </div>
  `,
});

//Creating weather app and storing some values
const app = new Vue({
  el: "#app",
  data: {
    weather: [],
    unit: "",
    zip: "",
    icon: document.createElement("img"),
  },
  methods: {
    //Changes info text to inform about an error for a five digit zip code
    errMsg() {
      document.getElementById("info").innerHTML =
        "Try a different (United States) Zip Code." + "<br>" + "Example: 65802";
      document.getElementById("info").setAttribute("class", "red");
    },
    //Targets selected radio button and saves zip code
    sendData() {
      radio = document.querySelectorAll('[type="radio"]:checked');
      list = Array.from(radio);
      this.unit = list[0].value;
      this.zip = document.getElementById("zip").value;
      //validates and sends the entered data to the get request
      if (this.zip.length == 5) {
        document.getElementById("info").setAttribute("class", "");
        axios
          .get(
            "http://api.openweathermap.org/data/2.5/weather?zip=" +
              this.zip +
              "&units=" +
              this.unit +
              "&appid=185d51e47477b29bb9280c4bebfb0336"
          )
          //Updates info section with response
          .then((response) => {
            this.weather = response.data;
            console.log(this.weather);
            document.getElementById("info").innerHTML =
              "<b>" + this.weather.name + ":" + "</b>" + "</br>";
            if (this.unit == "Imperial") {
              document.getElementById("info").innerHTML +=
                this.weather.main.temp + "°F";
              document.getElementById("info").setAttribute("class", "");
            } else {
              document.getElementById("info").innerHTML +=
                this.weather.main.temp + "°C";
              document.getElementById("info").setAttribute("class", "");
            }
            this.icon.src =
              "http://openweathermap.org/img/" +
              "wn/" +
              this.weather.weather[0].icon +
              "@2x.png";
            document.getElementById("info").innerHTML +=
              "</br>" + this.weather.weather[0].main + "</br>";
            info.appendChild(this.icon);
          })
          //Catches errors then throws error message function
          .catch(() => {
            this.errMsg();
          });
        //Changes info section to warn about zip code above five digits.
      } else if (this.zip.length > 5) {
        document.getElementById("info").setAttribute("class", "");
        document.getElementById("info").innerHTML =
          "Please enter a <b><u><i>FIVE</b></u></i> digit Zip Code and Measurement.";
        //Resets info box when changing from entered zip code.
      } else {
        document.getElementById("info").setAttribute("class", "");
        document.getElementById("info").innerHTML =
          "Please enter a five digit Zip Code and Measurement.";
      }
    },
  },
});
