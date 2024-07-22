import queryBuilder from "./formatter.js";

async function getWeatherData(formattedDate) {
  try {
    const rawData = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${formattedDate.getLocation()}?unitGroup=${formattedDate.getUnit()}&include=current%2Chours&key=85JQ9W43EYAKPE9PZ9QNUBT8M&contentType=json`,
      { mode: "cors" }
    );
      // Check if the response status is 429 (Too Many Requests)
    if (rawData.status === 429) {
      throw new Error('Too Many Requests: You have exceeded your rate limit.');
    }

    // Check if the response is not ok (status code not in the range 200-299)
    if (!rawData.ok) {
      throw new Error('We could not find the city you entered or there was a network error, please try again');
    }

    const weatherData = await rawData.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    alert(error);
    return false;
  }
}

export default getWeatherData;


