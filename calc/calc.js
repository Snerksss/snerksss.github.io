let calc = ["0", "", ""];
let count = 0;
let setted = false;
let secondSite = false;


function second() {
    if (secondSite === false) {
        secondSite = true;
        document.getElementById("powerXY").innerHTML = "10<sup>x</sup>"
    } else {
        secondSite = false;
        document.getElementById("powerXY").innerHTML = "x<sup>y</sup>"

    }
}


function ce() {
    if (count === 2) {
        calc = [calc[0], calc[1], ""];
    } else if (count === 0) {
        calc = ["0", "", ""];
    }
    setted = false;
    update();
}

function c() {
    calc = ["0", "", ""];
    count = 0
    setted = false;
    update();
}

function backspace() {
    if (count === 0 && calc.length > 0) {
        calc[0] = calc[0].substring(0, calc[0].length - 1)
    } else if (count === 2 && (setted === false || (setted === true && calc[2].length === 0))) {
        setted = false
        calc[1] = ""
        count = 0
    } else if (count === 2 && setted === true && calc[2].length > 0) {
        calc[2] = calc[2].substring(0, calc[2].length - 1)
    }
    update()
}

function xPowerY() {
    if (secondSite === false) {
        calc[1] = "^";
    } else {
        calc[0] = "10";
        calc[1] = "^";
    }
    count = 2;
    update()
}

function xPower2() {
    calc[1] = "^"
    calc[2] = "2"
    setted = true
    calculate()
    update()
}

function sqrRoot() {
    if (setted === true) {
        calculate()
    }
    calc[0] = Math.sqrt(Number(calc[0])).toString()
    update()
}

function divide() {
    if (setted === true) {
        calculate()
    }
    calc[1] = "/"
    count = 2
    update()
}

function multiplication() {
    if (setted === true) {
        calculate()
    }
    calc[1] = "*"
    count = 2
    update()
}

function subtraction() {
    if (setted === true) {
        calculate()
    }
    calc[1] = "-"
    count = 2
    update()
}

function addition() {
    if (setted === true) {
        calculate()
    }
    calc[1] = "+"
    count = 2
    update()
}

function calculate() {
    if (setted === true) {
        let result = "0"
        if (calc[1] === "+") {
            result = (parseFloat(calc[0]) + parseFloat(calc[2])).toString()
        } else if (calc[1] === "-") {
            result = (parseFloat(calc[0]) - parseFloat(calc[2])).toString()
        } else if (calc[1] === "*") {
            result = (parseFloat(calc[0]) * parseFloat(calc[2])).toString()
        } else if (calc[1] === "/") {
            result = (parseFloat(calc[0]) / parseFloat(calc[2])).toString()
        } else if (calc[1] === "^") {
            result = Math.pow(parseFloat(calc[0]), parseFloat(calc[2])).toString()
        }
        c()
        calc[0] = result
        update()
    }
}

function point() {
    if (count === 0) {
        if (calc[0].length > 0) {
            calc[0] = calc[0] + "."
        } else {
            calc[0] = "0."
        }
    } else if (count === 2) {
        if (calc[2].length > 0) {
            setted = true
            calc[2] = calc[2] + "."
        } else {
            setted = true
            calc[2] = "0."
        }
    }
    update()
}

function changeMinusPlus() {
    if (calc[count].length > 0) {
        if (calc[count].substring(0, 1) !== "-") {
            calc[count] = "-" + calc[count]
        } else {
            calc[count] = calc[count].substring(1)
        }
    }
    update()
}

function zero() {
    if (count === 0) {
        if (calc[0] === "0" || calc[0] === "-0") {
            calc[0] = "0"
        } else {
            calc[0] = calc[0] + "0"
        }
    } else if (count === 2) {
        if (calc[2] === "0" || calc[2] === "-0") {
            calc[2] = "0"
        } else {
            calc[2] = calc[2] + "0"
        }
    }
    update()
}

function number(newNumber) {
    if (count === 0) {
        if (calc[0] === "0" || calc[0] === "-0") {
            calc[0] = newNumber
        } else {
            calc[0] = calc[0] + newNumber
        }
    } else if (count === 2) {
        if (calc[2].length < 1 || calc[2] === "0" || calc[2] === "-0") {
            calc[2] = newNumber
            setted = true
        } else {
            calc[2] = calc[2] + newNumber
        }
    }
    update()
}


function update() {
    document.getElementById("uinterface").innerHTML = calc[0] + " " + calc[1] + " " + calc[2];
}

update()