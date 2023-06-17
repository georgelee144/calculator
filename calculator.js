function evaluate_calulation(inputs) {
  if (inputs.length == 1) {
    return inputs[0];
  } else if (mathOperations.includes(inputs[-1])) {
    currentDisplay.textContent = operationError;
    return null;
  } else {
    inputs[0] = Number(inputs[0].replace(/\D/g, ""));
    inputs[2] = Number(inputs[2].replace(/\D/g, ""));
  }

  if (inputs[1] === "+") {
    return inputs[0] + inputs[2];
  } else if (inputs[1] === "−") {
    return inputs[0] - inputs[2];
  } else if (inputs[1] === "×") {
    return inputs[0] * inputs[2];
  } else if (inputs[1] === "÷") {
    return inputs[0] / inputs[2];
  } else {
    return null;
  }
}

function cleanDisplay(displayStr) {
  displayStr = String(displayStr);

  if (displayStr[0] === "0") {
    displayStr = displayStr.slice(1);
  }

  if (displayStr.length > 3) {
    displayStr = Number(displayStr.replace(/\D/g, "")).toLocaleString("en-US");
  }
  return displayStr;
}

function calulateFunc(event) {
  console.log(event);

  if (event.target.className.includes("number")) {
    if (currentDisplay.textContent === operationError) {
      currentDisplay.textContent = event.target.innerText;
    }
    currentDisplay.textContent = currentDisplay.textContent.concat(
      event.target.innerText
    );
    currentDisplay.textContent = cleanDisplay(currentDisplay.textContent);
  } else if (event.target.id === "clear") {
    currentDisplay.textContent = "0";
    clearCounter += 1;
    if (clearCounter === 2) {
      clearCounter = 0;
      inputs = [];
    }
  } else if (event.target.id === "backspace") {
    if (currentDisplay.textContent.length === 1) {
      currentDisplay.textContent = "0";
    } else {
      currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
    }
  } else if (event.target.id === "equals") {
    inputs.push(currentDisplay.textContent);
    if (inputs.length === 3) {
      lastOperation = inputs.slice(-2);
    }
    if (inputs.length === 1 && lastOperation.length === 2) {
      inputs = inputs.concat(lastOperation);
    }
    currentDisplay.textContent = cleanDisplay(evaluate_calulation(inputs));
    inputs = [];
  } else if (event.target.className.includes("math-operation")) {
    if (mathOperations.includes(inputs[-1])) {
      inputs[-1] = event.target.innerText;
    } else {
      inputs.push(currentDisplay.textContent);
      inputs.push(event.target.innerText);
      currentDisplay.textContent = "0";
    }
  }
}

let currentDisplay = document.querySelector(".display");
const mathOperations = ["+", "−", "×", "÷"];
let inputs = [];
let lastOperation = [];
let buttonPress = document.querySelector("#click-buttons-grid");
let clearCounter = 0;
const operationError = "Last input was an operation";

buttonPress.addEventListener("click", calulateFunc);

// const numberButton = document.querySelectorAll(".number");
// const mathoperationButton = document.querySelectorAll(".math-operation");

// var inputs = document.querySelectorAll("button")

// for (const input of inputs) {
//     input.addEventListener('click', calulateFunc(buttonPress) )
//   }
