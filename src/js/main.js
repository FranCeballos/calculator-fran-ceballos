"use-strict";

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

class App {
  currentValue = 0;
  newValue;
  constructor() {
    this._listenForButtonInput();
  }

  _listenForButtonInput() {
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
      });
    });
  }

  update() {
    display.innerText = this.currentValue;
  }
}

const app = new App();
