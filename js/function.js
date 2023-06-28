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

const isEnoughTime = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartSplited = workStart.split(':');
  const workEndSplited = workEnd.split(':');
  const meetingStartSplited = meetingStart.split(':');

  const workStartMinutes = parseInt(workStartSplited[0], 10) * 60 + parseInt(workStartSplited[1], 10);
  const workEndMinutes = parseInt(workEndSplited[0], 10) * 60 + parseInt(workEndSplited[1], 10);
  const meetingStartMinutes = parseInt(meetingStartSplited[0], 10) * 60 + parseInt(meetingStartSplited[1], 10);
  const meetingEnd = meetingStartMinutes + meetingDuration;

  return (meetingStartMinutes >= workStartMinutes && meetingEnd <= workEndMinutes);
};

isEnoughTime('08:00', '17:00', '14:00', 90);
