import getWeatherData from "./getWeather";
import queryBuilder from "./formatter.js";
import analyzeWeather from "./analyzeWeather.js";
import images from "./images.js";
import "./style.css";
import viewDropDown from "./dropDown.js";
import {format} from "date-fns";

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
    #currentLocation;
    #time;

    #forecastContainer;
    #days;
    #hours;
    #currentDaily;

    #searchButton;
    #searchForm;
    #searchBar;
    #settings;
    #dailyHourly;

    constructor(currentDegrees, currentLocation, currentDaily) {
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
        this.#currentLocation = currentLocation;
        this.#time = document.querySelector(".time");

        this.#searchButton = document.querySelector('.search > button');
        this.#searchForm = document.querySelector('form');
        this.#searchBar = document.querySelector('input[type="search"]');
        this.#settings = document.querySelector('.unit');
        this.#dailyHourly = document.querySelector('.dateTime');
        

        this.#forecastContainer = document.querySelector(".forecastContainer");
        this.#days = document.querySelector(".days");
        this.#hours = document.querySelector(".hours");
        this.#currentDaily = currentDaily;

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
        this.#time.textContent = "Last Updated Time: " + format(analysis.getDateTime(), "HH:mm");
    } 

    createDays(analysis) {
        for (let i = 1; i < 7; i++) {
            let day = document.createElement("div");
            day.classList.add("day");

            let date = document.createElement("div");
            date.classList.add("date");
            
            analysis.setCurrentDay(i);
            date.textContent = format(analysis.getDaysDate(), "PPpp");

            let condition = document.createElement("h3");
            condition.classList.add("condition");
            condition.textContent = analysis.getDaysCondition();
            
            let temp = document.createElement("h2");
            temp.classList.add("temp");
            temp.textContent = analysis.getDaysTemp();

            let icon = document.createElement("img");
            icon.src = images[analysis.getDaysIcon() + ".svg"];

            let precip = document.createElement("h3");
            precip.classList.add("precip");
            precip.textContent = analysis.getDaysPrecipitation();
            
            day.appendChild(icon);
            day.appendChild(temp);
            day.appendChild(date);
            day.appendChild(condition);
            day.appendChild(precip);
            this.#days.appendChild(day);
        }
    }

    renderDays() {
        console.log("rendering days");
        this.#forecastContainer.removeChild(this.#hours);
        this.#forecastContainer.appendChild(this.#days);
    }

    createHours(analysis) { 
        for (let i = 0; i < 24; i++) {
            let hour = document.createElement("div");
            hour.classList.add("hour");

            let time = document.createElement("div");
            time.classList.add("hoursTime");
            time.textContent = format(analysis.getHoursHour(i), "PPpp");

            let condition = document.createElement("h3");
            condition.classList.add("hoursCondition");
            condition.textContent = analysis.getHoursCondition(i);
            
            let temp = document.createElement("h2");
            temp.classList.add("hoursTemp");
            temp.textContent = analysis.getHoursTemp(i);

            let icon = document.createElement("img");
            icon.src = images[analysis.getHoursIcon(i) + ".svg"];

            let precip = document.createElement("h3");
            precip.classList.add("hoursPrecip");
            precip.textContent = analysis.getHoursPrecipitation(i);
            
            let feelsLike = document.createElement("h3");
            feelsLike.classList.add("hoursFeelsLike");
            feelsLike.textContent = analysis.getHoursFeelsLike(i);

            hour.appendChild(icon);
            hour.appendChild(temp);
            hour.appendChild(time);
            hour.appendChild(condition);
            hour.appendChild(feelsLike);
            hour.appendChild(precip);
            this.#hours.appendChild;
        }
    }

    renderHours() {
        this.#forecastContainer.removeChild(this.#days);
        this.#forecastContainer.appendChild(this.#hours);
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
            this.#searchBar.value = "";
        }   
        else {
            this.#searchBar.classList.add('error');
        }
    }

    handleSettingsClick(event) {
        
    
        if (event.target.classList.contains('celsius')) {
            if (this.#currentDegrees != "metric") {
                this.#currentDegrees = "metric";
                this.buildNewQuery(false, this.#currentDegrees, this.#currentLocation);
            }
        } else if (event.target.classList.contains('fahrenheit')) {
            if (this.#currentDegrees != "us") {
                this.#currentDegrees = "us";
                this.buildNewQuery(false, this.#currentDegrees, this.#currentLocation);
            }
        }
    }

    handleDailyHourlyChange(event) {
        if (event.target.classList.contains('daily')) {
            if (this.#currentDaily != "include=days") {
                this.#currentDaily = "include=days";
                this.renderDays();
            }
        } else if (event.target.classList.contains('hourly')) {
            if (this.#currentDaily != "include=hours") {
                this.#currentDaily = "include=hours";
                this.renderHours();
            }
        }
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
            this.#currentLocation = location;
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
        let analysis = new analyzeWeather(data, 0);
        const dom = new DOMAdditions(query.getUnit(), query.getLocation(), query.getDaily());
        dom.renderCurrentWeather(analysis);
        dom.renderLocation(analysis);
        dom.createDays(analysis);
        console.log("rendering days");
        dom.renderDays();
        dom.createHours(analysis);
    });
    
}


