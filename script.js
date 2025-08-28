
function luhnCheck(cardNumber) {
  let sum = 0;
  let shouldDouble = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

function generateRandomNumber(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

function generateCard(bin, month, year, ccv, quantity) {
  const cards = [];
  for (let i = 0; i < quantity; i++) {
    let cardNumber = bin;
    while (cardNumber.length < 15) {
      cardNumber += Math.floor(Math.random() * 10).toString();
    }

    for (let checkDigit = 0; checkDigit < 10; checkDigit++) {
      const testCard = cardNumber + checkDigit;
      if (luhnCheck(testCard)) {
        cardNumber = testCard;
        break;
      }
    }

    const mm = month === 'Random'? String(Math.floor(Math.random() * 12) + 1).padStart(2, '0') : month;

    const yy = year === 'Random'? String(new Date().getFullYear() + Math.floor(Math.random() * 4)) : year;

    const isAmex = cardNumber.startsWith('34') || cardNumber.startsWith('37');
    const cvvLength = isAmex ? 4 : 3;
    const finalCvv = ccv === '' ? generateRandomNumber(cvvLength) : ccv;

    cards.push(`${cardNumber}|${mm}|${yyyy}|${finalCvv}`);
  }
  return cards;
}

document.querySelector(".btn").addEventListener("click", () => {
  const bin = document.getElementById("bin").value.trim();
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;
  const cvv = document.getElementById("cvv").value;
  const qty = parseInt(document.getElementById("qty").value) || 1;

  if (!bin || bin.length < 6 || isNaN(bin)) {
    alert("Please enter a valid numeric BIN (min 6 digits).");
    return;
  }

  const cards = generateCard(bin, month, year, cvv, qty);
  document.getElementById("result").value = cards.join("\n");
});

document.querySelectorAll(".btn")[1].addEventListener("click", () => {
  const resultBox = document.getElementById("result");
  resultBox.select();
  document.execCommand("copy");
  alert("Cards copied to clipboard!");
});
