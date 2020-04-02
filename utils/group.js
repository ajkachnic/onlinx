// Splits object into an array based on a property. Used for the methods in the routing

module.exports = function group(arr, prop) {
  let grouped = {};
  for (let i = 0; i < arr.length; i++) {
    if (!grouped[arr[i][prop]]) {
      grouped[arr[i][prop]] = [];
    }
    grouped[arr[i][prop]].push(arr[i]);
  }
  return grouped;
}