
class analyzeWeather {
    #weatherData;
    #currentDay;
    #currentUnit;

    constructor(weatherData, currentDay, currentUnit) {
        this.#weatherData = weatherData;
        this.#currentDay = this.#weatherData.days[currentDay];
        this.#currentUnit = currentUnit;
    }

    getCurrentUnit() {
        return this.#currentUnit;
    }
    
    getLocation() {
        return this.#weatherData.resolvedAddress;
    }

    getDescription() {
        return this.#weatherData.description;
    }

    getTimezone() {
        return this.#weatherData.timezone;
    }

    getTemp() {
        return this.#weatherData.currentConditions.temp + this.#currentUnit;
    }

    getFeelsLike() {
        return this.#weatherData.currentConditions.feelslike + this.#currentUnit;
    }

    getHumidity() {
        return this.#weatherData.currentConditions.humidity + "%";
    }

    getPrecip() {
        return this.#weatherData.currentConditions.precip + "%";
    }

    getDateTime() {
        return this.#weatherData.currentConditions.datetime;
    }

    getIcon() {
        return this.#weatherData.currentConditions.icon;
    }

    setCurrentDay(index) {
        this.#currentDay = this.#weatherData.days[index];
    }

    getDaysDate() {
        return this.#currentDay.datetime;
    }

    getDaysCondition() {
        return this.#currentDay.conditions;
    }

    getDaysTemp() {
        return this.#currentDay.temp + this.#currentUnit;
    }

    getDaysPrecipitation() {
        return this.#currentDay.precip + "%";
    }

    getDaysIcon(index) {
        return this.#currentDay.icon;
    }

    getHoursHour(index) {
        return this.#currentDay.hours[index].datetime;
    }

    getHoursCondition(index) {
        return this.#currentDay.hours[index].conditions;
    }

    getHoursTemp(index) {
        return this.#currentDay.hours[index].temp + this.#currentUnit;
    }

    getHoursIcon(index) {
        return this.#currentDay.hours[index].icon;
    }

    getHoursFeelsLike(index) {
        return this.#currentDay.hours[index].feelslike + this.#currentUnit;
    }

    getHoursPrecipitation(index) {
        return this.#currentDay.hours[index].precip + "%";
    }


}

export default analyzeWeather;

