"use-strict";

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear");

class App {
  currentValue;
  newValue = 0;
  constructor() {
    this._listenButtons();
  }

  _listenButtons() {
    buttons.forEach((button) => {
      button.addEventListener("click", this.handleButtonClick.bind(this));
    });
  }

  handleButtonClick(e) {
    const inputValue = e.target.dataset.value;
    if (!isNaN(inputValue) && !this.newValue) {
      this.newValue = inputValue;
      this.update();
      return;
    }
    if (!isNaN(inputValue) && this.newValue.length < 10) {
      this.newValue += inputValue;
      this.update();
      return;
    }
    if (inputValue === "clear") {
      this.clearCurrentNumber();
    }
    if (inputValue === "sign") {
      this.changeNumberSign();
    }
  }

  update() {
    display.innerText = this.newValue;

    if (this.newValue !== 0) {
      this.changeButtonACtoC();
    } else {
      this.changeButtonCtoAC();
    }
  }

  clearCurrentNumber() {
    this.newValue = 0;
    this.update();
  }

  changeNumberSign() {
    this.newValue = `${parseInt(this.newValue) * -1}`;
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
