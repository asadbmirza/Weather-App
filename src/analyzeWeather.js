
class analyzeWeather {
    #weatherData;
    #currentDay;

    constructor(weatherData, currentDay) {
        this.#weatherData = weatherData;
        this.#currentDay = this.#weatherData.days[currentDay];
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
        return this.#weatherData.currentConditions.temp;
    }

    getFeelsLike() {
        return this.#weatherData.currentConditions.feelslike;
    }

    getHumidity() {
        return this.#weatherData.currentConditions.humidity;
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
        return this.#currentDay.temp;
    }

    getDaysPrecipitation(index) {
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
        return this.#currentDay.hours[index].temp;
    }

    getHoursIcon(index) {
        return this.#currentDay.hours[index].icon;
    }

    getHoursFeelsLike(index) {
        return this.#currentDay.hours[index].feelslike;
    }

    getHoursPrecipitation(index) {
        return this.#currentDay.hours[index].precip;
    }


}

export default analyzeWeather;

