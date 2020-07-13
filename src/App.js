import React from "react";
import "./App.css";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Titles from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "b45195ed727049f6a693823d71ef4545";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined,
    };
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`
    );
    const response = await api_call.json();
    console.log('tag', response);
    if (city && country) {
      console.log("data", response);

      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: "",
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please Enter the value",
      });
    }
  };
  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-md-6 title-container">
                  <Titles />
                </div>
                <div className="col-md-6 form-container">
                    <Form getWeather={this.getWeather} />
                    <Weather
                      temperature={this.state.temperature}
                      humidity={this.state.humidity}
                      city={this.state.city}
                      country={this.state.country}
                      description={this.state.description}
                      error={this.state.error}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
