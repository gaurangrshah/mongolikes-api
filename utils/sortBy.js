function sortBy(arrToSort = [], values = ["_id", "title"]) {
  let sorted;

  if (Array.isArray(values)) {
    arrToSort.sort(
      (a, b) =>
        a[values[0]] > b[values[0]] // compare each value individually
          ? 1 // return if true
          : (a[values[0]] === b[values[0]] // check if equal
              ? a[values[1]] > b[values[1]] // secondary sorting if equal
                ? 1 // return if secondary true
                : -1 // return if secondary false
              : -1) - 1 // return if
    );
  }

  sorted = arrToSort.sort((a, b) => (a[values[0]] < b[values[0]] ? 1 : -1));

  return sorted;
}

module.exports = sortBy;
