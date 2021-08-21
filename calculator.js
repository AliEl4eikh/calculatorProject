let buffer = "0";
let runningTotal = 0;
let previuosOperator = null;
let screen = document.querySelector(".screen");
let calculatorButtons = document.querySelector(".calc-buttons");

calculatorButtons.addEventListener("click", (event) => {
    let target = event.target;
    buttonClick(target.innerHTML);
})

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }

    rerender(value);
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            previuosOperator = null;
            runningTotal = 0;
        break;
        case "←":
            if (buffer === "0") {
                return;
            } else if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substr(0, buffer.length-1)
            }
        break;
        case "=":
            if (previousOperator === null) {
                  // need two numbers to do math
                  return;
            }
            flushOperator(parseInt(buffer));
                previousOperator = null;
                buffer = +runningTotal;
                runningTotal = 0;
        break;
        case "×":
        case "÷":
        case "-": 
        case "+": 
            handleMath(value);
        break;    
        }
    }

    function handleMath(value) {
        if (buffer === "0") {
            return;
        }
    
        const intBuffer = parseInt(buffer);
    
        if (runningTotal === 0) {
            runningTotal = intBuffer;
        } else {
            flushOperator(intBuffer)
        }
    
        previousOperator = value;
        buffer = "0";
    }

    function flushOperator(intBuffer) {
        if (previousOperator === "+") {
            runningTotal += intBuffer;
        } else if (previousOperator === "-") {
            runningTotal -= intBuffer;
        } else if (previousOperator === "÷") {
            runningTotal /= intBuffer;
        } else {
            runningTotal *= intBuffer;
        }
    }
    
function rerender(value) {
    screen.innerHTML = buffer;
}