const isStringOverMaxLength = (string, maxLength) => string.length <= maxLength;

isStringOverMaxLength('проверяемая строка', 20);

const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return normalizedString === reversedString;
};

isPalindrome('Кекс');

const extractNumbers = (string) => {
  string = string.toString();
  let result = '';
  let number;
  for (let i = 0; i < string.length; i++) {
    number = parseInt(string[i], 10);
    if (!Number.isNaN(number)) {
      result += number;
    }
  }

  return Number(result) || NaN;
};

extractNumbers('2023 год');

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement};
