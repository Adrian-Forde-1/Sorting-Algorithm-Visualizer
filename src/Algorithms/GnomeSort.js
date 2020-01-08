export function getGnomeSortAnimations(array) {
  const animations = [];
  gnomeSortHelper(array, animations);
  return animations;
}

function gnomeSortHelper(array, animations) {
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] > array[i]) moveBack(array, i, animations);
    else {
      animations.push([i, i - 1]);
      animations.push([i, i - 1]);
      animations.push([i, array[i]]);
    }
  }
  return array;
}

function moveBack(array, i, animations) {
  for (; i > 0 && array[i - 1] > array[i]; i--) {
    var t = array[i];
    array[i] = array[i - 1];
    array[i - 1] = t;
    animations.push([i, i - 1]);
    animations.push([i, i - 1]);
    animations.push([i, array[i]]);
    animations.push([i, i - 1]);
    animations.push([i, i - 1]);
    animations.push([i - 1, array[i - 1]]);
  }
}
