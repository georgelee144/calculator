function evaluate_calulation(inputs) {
  if (inputs.length == 1) {
    return inputs[0];
  } else if (mathOperations.includes(inputs[-1])) {
    currentDisplay.textContent = operationError;
    return null;
  } else {
    inputs[0] = Number(inputs[0]);
    inputs[2] = Number(inputs[2]);
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

function calulateFunc(event) {
  console.log(event);

  if (event.target.className.includes("number")) {
    if (currentDisplay.textContent === operationError) {
      currentDisplay.textContent = event.target.innerText;
    }
    currentDisplay.textContent = currentDisplay.textContent.concat(
      event.target.innerText
    );

    if (currentDisplay.textContent[0] === "0") {
      currentDisplay.textContent = currentDisplay.textContent.slice(1);
    }
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
    currentDisplay.textContent = evaluate_calulation(inputs);
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

  // if (mathOperations.includes(inputs[-2])) {
  //   answer = evaluate_calulation(inputs);
  //   if (answer === null && current_display.textContent != operationError) {
  //     current_display.textContent = "Something went wrong";
  //   }
  //   current_display.textContent = answer;
  //   inputs = [];
  //   inputs[0] = answer;
  // }
  // current_display.textContent = "0";
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
