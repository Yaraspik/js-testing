export default function validator(number) {
  let sum = 0;
  let result;
  for (let i = number.length - 1; i > 0; i -= 1) {
    if ((number.length - i) % 2) {
      result = Number(number[i - 1]) * 2;
      if (result > 9) {
        result -= 9;
      }
    } else {
      result = Number(number[i - 1]);
    }
    sum += result;
  }

  if ((sum % 10) + Number(number[number.length - 1]) === 10) {
    return true;
  }
  return false;
}
