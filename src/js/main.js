"use-strict";

const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear");
const divideBtn = document.getElementById("divide");
const multiplyBtn = document.getElementById("multiply");
const subtractBtn = document.getElementById("subtract");
const addBtn = document.getElementById("add");

class App {
  newValue = "0";
  nextAction = "none";
  currentValue = "0";
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
    console.log(inputValue);
    if (!isNaN(inputValue) && this.newValue === "0") {
      this.newValue = inputValue;
      this.consoleLogMemory();
      this.changeButtonACtoC();
      this.updateDisplay();
      return;
    }
    if (!isNaN(inputValue) && this.newValue.length < 10) {
      this.newValue += inputValue;
      this.consoleLogMemory();
      this.changeButtonACtoC();
      this.updateDisplay();
      return;
    }
    switch (inputValue) {
      case "clear":
        this.handleClearClick();
        break;
      case "sign":
        this.handleChangeSignClick();
        break;
      case ".":
        this.handleDecimalClick();
        break;
      case "%":
        this.handlePercentageClick();
        break;
      case "/":
        this.handleDivideClick();
        break;
      case "*":
        this.handleMultiplyClick();
        break;
      case "-":
        this.handleSubtractClick();
        break;
      case "+":
        this.handleAddClick();
        break;
      case "=":
        this.handleResultClick();
    }
  }

  // UI
  updateDisplay() {
    display.innerText = this.newValue.slice(0, 10);
  }

  updateNextActionButtonBorder() {
    this.resetNextActionButtonBorder();
    switch (this.nextAction) {
      case "/":
        divideBtn.classList.add("selected");
        break;
      case "*":
        multiplyBtn.classList.add("selected");
        break;
      case "-":
        subtractBtn.classList.add("selected");
        break;
      case "+":
        addBtn.classList.add("selected");
        break;
      case "=":
        this.resetNextActionButtonBorder();
        break;
    }
  }

  resetNextActionButtonBorder() {
    divideBtn.classList.remove("selected");
    multiplyBtn.classList.remove("selected");
    subtractBtn.classList.remove("selected");
    addBtn.classList.remove("selected");
  }

  changeButtonACtoC() {
    clearBtn.innerText = "C";
  }

  changeButtonCtoAC() {
    clearBtn.innerText = "AC";
  }

  // Memory
  setNewValueAsCurrentValue() {
    this.currentValue = this.newValue;
  }

  clearNewValue() {
    this.newValue = "0";
    this.updateDisplay();
  }

  // Click handlers
  handleClearClick() {
    this.changeButtonCtoAC();
    if (this.newValue !== "0") {
      this.newValue = "0";
      this.consoleLogMemory();
      this.updateDisplay();
      return;
    }
    if (this.nextAction !== "none") {
      this.nextAction = "none";
      this.currentValue = "0";
      this.consoleLogMemory();
      this.updateNextActionButtonBorder();
      this.updateDisplay();
      return;
    }
  }

  handleChangeSignClick() {
    this.newValue = `${parseFloat(this.newValue) * -1}`;
    this.consoleLogMemory();
    this.updateDisplay();
  }

  handlePercentageClick() {
    this.newValue = `${parseFloat(this.newValue) / 100}`;
    this.consoleLogMemory();
    this.updateDisplay();
  }

  handleDecimalClick() {
    if (!this.newValue.split("").includes(".")) {
      this.newValue += ".";
      this.consoleLogMemory();
      this.updateDisplay();
    }
  }

  handleDivideClick() {
    if (this.nextAction === "none") {
      this.setNewValueAsCurrentValue();
      this.newValue = "0";
    }
    this.nextAction = "/";
    this.updateNextActionButtonBorder();
    this.consoleLogMemory();
  }

  handleMultiplyClick() {
    if (this.nextAction === "none") {
      this.setNewValueAsCurrentValue();
      this.newValue = "0";
    }
    this.nextAction = "*";
    this.updateNextActionButtonBorder();
    this.consoleLogMemory();
  }

  handleSubtractClick() {
    if (this.nextAction === "none") {
      this.setNewValueAsCurrentValue();
      this.newValue = "0";
    }
    this.nextAction = "-";
    this.updateNextActionButtonBorder();
    this.consoleLogMemory();
  }

  handleAddClick() {
    if (this.nextAction === "none") {
      this.setNewValueAsCurrentValue();
      this.newValue = "0";
    }
    this.nextAction = "+";
    this.updateNextActionButtonBorder();
    this.consoleLogMemory();
  }

  handleResultClick() {
    this.nextAction = "none";
    this.updateNextActionButtonBorder();
  }

  // Helpers
  consoleLogMemory() {
    console.log(
      `newValue: ${this.newValue}, currentValue: ${this.currentValue}`
    );
  }
}

const app = new App();
