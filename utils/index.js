const sortByDate = (a, b) => {
  return new Date(b).getTime() - new Date(a).getTime();
};

function handleLength(value, maxLength) {
  if (value.length > maxLength) {
    return value.slice(0, 11);
  }
}

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

export const utils = { sortByDate, handleLength, numberWithCommas };
