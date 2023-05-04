"use-strict";

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear");

class App {
  currentValue;
  newValue = "0";
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
    if (!isNaN(inputValue) && this.newValue === "0") {
      this.newValue = inputValue;
      this.update();
      return;
    }
    if (!isNaN(inputValue) && this.newValue.length < 10) {
      this.newValue += inputValue;
      this.update();
      return;
    }
    switch (inputValue) {
      case "clear":
        this.clearCurrentNumber();
        break;
      case "sign":
        this.changeNumberSign();
        break;
      case ".":
        this.addDecimalDot();
        break;
    }
  }

  update() {
    display.innerText = this.newValue;
    this.newValue !== "0" ? this.changeButtonACtoC() : this.changeButtonCtoAC();
  }

  clearCurrentNumber() {
    this.newValue = "0";
    this.update();
  }

  changeNumberSign() {
    this.newValue = `${parseInt(this.newValue) * -1}`;
    this.update();
  }

  addDecimalDot() {
    if (!this.newValue.split("").includes(".")) {
      this.newValue += ".";
      this.update();
    }
  }

  changeButtonACtoC() {
    clearBtn.innerText = "C";
  }

  changeButtonCtoAC() {
    clearBtn.innerText = "AC";
  }
}

const app = new App();
