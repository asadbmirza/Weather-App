import getWeatherData from "./getWeather";
import queryBuilder from "./formatter.js";
import analyzeWeather from "./analyzeWeather.js";
import images from "./images.js";
import "./style.css";
import viewDropDown from "./dropDown.js";

class DOMAdditions {
    #weatherContainer;
    
    #factsContainer;
    #degrees;
    #currentDegrees;
    #feelsLike;
    #humidity;
    #precipitation;
    #currentIcon;

    #locationContainer;
    #description;
    #location;
    #time;

    #searchButton;
    #searchForm;
    #searchBar;
    #settings;
    #dailyHourly;

    constructor(currentDegrees) {
        this.#weatherContainer = document.querySelector(".weatherContainer");
        
        this.#factsContainer = document.querySelector(".factsContainer");
        this.#degrees = document.querySelector(".degrees");
        this.#currentDegrees = currentDegrees;
        this.#feelsLike = document.querySelector(".feelsLike");
        this.#humidity = document.querySelector(".humidity");
        this.#precipitation = document.querySelector(".precipitation");
        this.#currentIcon = document.querySelector(".currentIcon");

        this.#locationContainer = document.querySelector(".locationContainer");
        this.#description = document.querySelector(".description");
        this.#location = document.querySelector(".location");
        this.#time = document.querySelector(".time");

        this.#searchButton = document.querySelector('.search > button');
        this.#searchForm = document.querySelector('form');
        this.#searchBar = document.querySelector('input[type="search"]');
        this.#settings = document.querySelector('.unit');
        this.#dailyHourly = document.querySelector('.dateTime');

        this.attachEventListeners();
    }


    renderCurrentWeather(analysis) {
        this.#degrees.textContent = analysis.getTemp();
        this.#feelsLike.textContent = "Feels Like: " + analysis.getFeelsLike();
        this.#humidity.textContent = "Humidity: " + analysis.getHumidity();
        this.#precipitation.textContent = "Precipitation: " + analysis.getPrecip();
        this.#currentIcon.src = images[analysis.getIcon() + ".svg"];
    }

    renderLocation(analysis) {
        this.#description.textContent = analysis.getDescription();
        this.#location.textContent = analysis.getLocation();
        this.#time.textContent = analysis.getDateTime();
    }

    attachEventListeners() {
        this.#searchButton.addEventListener('click', this.handleSearchInput.bind(this));
        this.#settings.addEventListener('click', this.handleSettingsClick.bind(this));
        this.#dailyHourly.addEventListener('click', this.handleDailyHourlyChange.bind(this));
    }

    handleSearchInput(event) {
        event.preventDefault();
        if (this.#searchBar.value.trim() != "") {
            this.#searchBar.classList.remove('error');
            this.buildNewQuery(false, undefined, this.#searchBar.value);

        }   
        else {
            this.#searchBar.classList.add('error');
        }
    }

    handleSettingsClick(event) {
        console.log("Clicked element:", event.target);
        console.log("Current unit:", this.#currentDegrees);
    
        if (event.target.classList.contains('celsius')) {
            console.log("Attempting to switch to Celsius");
            if (this.#currentDegrees != "metric") {
                this.#currentDegrees = "metric";
                console.log("Switched to Celsius, new unit:", this.#currentDegrees);
                this.buildNewQuery(false, this.#currentDegrees, undefined);
            }
        } else if (event.target.classList.contains('fahrenheit')) {
            console.log("Attempting to switch to Fahrenheit");
            if (this.#currentDegrees != "us") {
                this.#currentDegrees = "us";
                console.log("Switched to Fahrenheit, new unit:", this.#currentDegrees);
                this.buildNewQuery(false, this.#currentDegrees, undefined);
            }
        }
    }

    handleDailyHourlyChange(event) {
        // Logic for handling daily/hourly toggle
    }

    buildNewQuery(changeDaily = false, changeUnit, location) {
        let query = new queryBuilder();
        if (changeDaily) {
            query.changeDaily();
        }
        if (changeUnit == "us") {
            query.changeUnit();
        }
        if (location != undefined) {
            query.setLocation(location)
        }
        let weatherData = getWeatherData(query);
        weatherData.then((data) => {
            let analysis = new analyzeWeather(data, 1);
            this.renderCurrentWeather(analysis);
            this.renderLocation(analysis);
        });
    }

}

window.onload = function() {
    const dropDown = new viewDropDown("click");
    dropDown.attachEventListeners();

    let query = new queryBuilder();
    let weatherData = getWeatherData(query);
    weatherData.then((data) => {
        let analysis = new analyzeWeather(data, 1);
        const dom = new DOMAdditions(query.getUnit());
        dom.renderCurrentWeather(analysis);
        dom.renderLocation(analysis);
    
    });
    
}


