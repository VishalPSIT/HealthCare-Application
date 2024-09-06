const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// Utility functions to generate random characters
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

// Shuffle the generated password
function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array.join('');
}

// Password generation logic for length 8
function generate() {
    let generatedPassword = "";
    let funcArr = [generateUpperCase, generateLowerCase, generateRandomNumber, generateSymbol];

    // Generate a password with 8 characters
    for (let i = 0; i < 8; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        generatedPassword += funcArr[randIndex]();
    }

    // Shuffle the password for randomness
    return shufflePassword(Array.from(generatedPassword));
}

// Generate the password
exports.generatePassword = () => {
    return generate();
}

