// Hoare partition scheme
export function getQuickSortAnimationsHoare(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, start, end, animations) {
  if (start >= end) return;
  let pivot = start;
  let left = start + 1;
  let right = end;

  while (right >= left) {
    if (array[left] > array[pivot] && array[right] < array[pivot]) {
      animations.push([left, right]);
      animations.push([left, right]);
      let temp = array[right];
      array[right] = array[left];
      array[left] = temp;
      animations.push([right, array[right]]);
    }
    if (array[right] >= array[pivot]) {
      animations.push([right, right]);
      animations.push([right, right]);
      animations.push([right, array[right]]);
      right--;
    }
    if (array[left] <= array[pivot]) {
      animations.push([left, left]);
      animations.push([left, left]);
      animations.push([left, array[left]]);
      left++;
    }
    // if (right >= left) toDispatch.push([left, right]);
  }
  if (pivot !== right) {
    animations.push([right, pivot]);
    animations.push([right, pivot]);
    let temp = array[right];
    array[right] = array[pivot];
    array[pivot] = temp;
    animations.push([pivot, array[pivot]]);

    animations.push([pivot, right]);
    animations.push([pivot, right]);
    animations.push([right, array[right]]);
  }

  quickSortHelper(array, start, right - 1, animations);
  quickSortHelper(array, right + 1, end, animations);
}
