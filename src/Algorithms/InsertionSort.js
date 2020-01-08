export function getInsertionSortAnimations(array) {
  const animations = [];
  insertionSort(array, animations);
  return animations;
}

function insertionSort(array, animations) {
  var sortedArray = [...array];
  for (let i = 1; i < sortedArray.length; i++) {
    for (let j = 0; j < i; j++) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (sortedArray[i] < sortedArray[j]) {
        let spliced = sortedArray.splice(i, 1);
        sortedArray.splice(j, 0, spliced[0]);
        animations.push([i, sortedArray[i]]);
        animations.push([i, j]);
        animations.push([i, j]);
        animations.push([j, sortedArray[j]]);
      } else {
        animations.push([i, sortedArray[i]]);
        animations.push([i, j]);
        animations.push([i, j]);
        animations.push([j, sortedArray[j]]);
      }
    }
  }
  return sortedArray;
}
