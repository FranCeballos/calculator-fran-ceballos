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
  tempValue = "0";
  signChanged = false;
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
    if (!isNaN(inputValue) && this.newValue !== "0") {
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
        this.handleMathOperationClick(inputValue);
        break;
      case "*":
        this.handleMathOperationClick(inputValue);
        break;
      case "-":
        this.handleMathOperationClick(inputValue);
        break;
      case "+":
        this.handleMathOperationClick(inputValue);
        break;
      case "=":
        this.handleResultClick();
    }
  }

  // UI
  updateDisplay() {
    const parsedFloatNewValue = parseFloat(this.newValue);

    this.countDecimals(Math.abs(parsedFloatNewValue)) < 8 &&
    parsedFloatNewValue < 100000000 &&
    parsedFloatNewValue > -100000000
      ? (display.innerText = this.newValue)
      : (display.innerText = parsedFloatNewValue.toExponential(4));
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

  rearrangeMemoryValuesAfterResult(result) {
    this.tempValue = this.newValue;
    this.currentValue = result;
    this.newValue = result;
    this.updateDisplay();
    this.newValue = this.tempValue;
  }

  // Math calculations
  divide() {
    const result = `${
      parseFloat(this.currentValue) / parseFloat(this.newValue)
    }`;
    this.rearrangeMemoryValuesAfterResult(result);
  }

  multiply() {
    const result = `${
      parseFloat(this.currentValue) * parseFloat(this.newValue)
    }`;
    this.rearrangeMemoryValuesAfterResult(result);
  }

  subtract() {
    const result = `${
      parseFloat(this.currentValue) - parseFloat(this.newValue)
    }`;
    this.rearrangeMemoryValuesAfterResult(result);
  }

  add() {
    const result = `${
      parseFloat(this.currentValue) + parseFloat(this.newValue)
    }`;
    this.rearrangeMemoryValuesAfterResult(result);
  }

  // Click handlers
  handleClearClick() {
    this.changeButtonCtoAC();
    if (this.nextAction === "percentage") {
      this.newValue = this.currentValue;
      this.currentValue = "0";
      this.nextAction = "none";
      return;
    }
    if (this.newValue !== "0") {
      this.newValue = "0";
      if (this.tempValue !== "0") {
        this.currentValue = "0";
        this.nextAction = "none";
        this.tempValue = "0";
      }
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
    const valueToChangeSign =
      this.tempValue !== "0" ? this.currentValue : this.newValue;
    this.newValue = `${parseFloat(valueToChangeSign) * -1}`;
    this.signChanged = true;
    this.consoleLogMemory();
    this.updateDisplay();
  }

  handlePercentageClick() {
    if (this.signChanged) {
      this.currentValue = this.newValue;
    }
    this.currentValue !== "0"
      ? (this.newValue = `${parseFloat(this.currentValue) / 100}`)
      : (this.newValue = `${parseFloat(this.newValue) / 100}`);
    this.currentValue = this.newValue;
    this.nextAction = "percentage";
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

  handleMathOperationClick(nextOperation) {
    if (this.nextAction === "none") {
      this.setNewValueAsCurrentValue();
    }
    if (this.signChanged) {
      this.currentValue = this.newValue;
      this.signChanged = false;
    }
    this.newValue = "0";
    this.tempValue = "0";
    this.nextAction = nextOperation;
    this.updateNextActionButtonBorder();
    this.consoleLogMemory();
  }

  handleResultClick() {
    switch (this.nextAction) {
      case "/":
        this.divide();
        break;
      case "*":
        this.multiply();
        break;
      case "-":
        this.subtract();
        break;
      case "+":
        this.add();
        break;
    }
    this.signChanged = false;
    this.resetNextActionButtonBorder();
    this.consoleLogMemory();
  }

  // Helpers
  consoleLogMemory() {
    console.log(
      `newValue: ${this.newValue}, currentValue: ${this.currentValue}, tempValue: ${this.tempValue}, nextAction: ${this.nextAction}`
    );
  }

  countDecimals = function (number) {
    if (Math.floor(number) === number) return 0;

    const str = number.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
      return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
      return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
  };
}

const app = new App();
