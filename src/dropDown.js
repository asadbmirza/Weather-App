class viewDropDown {
    #inputType;
    #body;
    #dropDownItems;
    #dropDownSelectors;

    constructor(inputType) {
        this.#inputType = inputType;
        this.#body = document.querySelector("body");
        this.#dropDownItems = document.querySelectorAll(".dropDownElements");
        this.#dropDownSelectors = document.querySelectorAll(".dropDown");
    }

    attachEventListeners() {
        for (let i = 0; i < this.#dropDownSelectors.length; i++) {
            this.#dropDownSelectors[i].addEventListener(this.#inputType, (e) =>  {
                
                this.#dropDownItems.forEach((element) => {
                    element.classList.remove("visible");
                });
                this.#dropDownItems[i].classList.add("visible");

                
                e.stopPropagation();

            });            


            this.#body.addEventListener("click", (e) => {

                this.#dropDownItems[i].classList.remove("visible")
                
            });

        }
    }

}

export default viewDropDown;