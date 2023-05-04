"use-strict";

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear");

class App {
  currentValue = 0;
  newValue;
  constructor() {
    this._listenButtons();
  }

  _listenButtons() {
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const inputValue = e.target.dataset.value;
        if (!isNaN(inputValue) && !this.currentValue) {
          this.currentValue = inputValue;
          this.update();
          return;
        }
        if (!isNaN(inputValue) && this.currentValue.length < 10) {
          this.currentValue += inputValue;
          this.update();
          return;
        }
        if (inputValue === "clear") {
          this.clearCurrentNumber();
        }
      });
    });
  }

  update() {
    display.innerText = this.currentValue;

    if (this.currentValue !== 0) {
      this.changeButtonACtoC();
    } else {
      this.changeButtonCtoAC();
    }
  }

  clearCurrentNumber() {
    this.currentValue = 0;
    this.update();
  }

  changeButtonACtoC() {
    clearBtn.innerText = "C";
  }

  changeButtonCtoAC() {
    clearBtn.innerText = "AC";
  }
}

const app = new App();
