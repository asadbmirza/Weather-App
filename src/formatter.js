class queryBuilder {
  #location;
  #dailyOrHourly;
  #dailyIndex;
  #unit;
  #unitIndex;

  constructor() {
    this.#location = "Ontario";
    this.#unit = ["metric", "us"];
    this.#unitIndex = 0;
    this.#dailyOrHourly = ["include=hours", "include=days"];
    this.#dailyIndex = 0;
  }

  getLocation() {
    return this.#location;
  }

  setLocation(location) {
    this.#location = location;
  }

  getDaily() {
    return this.#dailyOrHourly[this.#dailyIndex];
  }

  changeDaily() {
    if (this.#dailyIndex == 0) {
      this.#dailyIndex = 1;
    } else {
      this.#dailyIndex = 0;
    }

    return this.#dailyOrHourly[this.#dailyIndex];
  }

  getUnit() {
    return this.#unit[this.#unitIndex];
  }
  changeUnit() {
    if (this.#unitIndex == 0) {
      this.#unitIndex = 1;
    } else {
      this.#unitIndex = 0;
    }

    return this.#unit[this.#unitIndex];
  }
}

export default queryBuilder;
