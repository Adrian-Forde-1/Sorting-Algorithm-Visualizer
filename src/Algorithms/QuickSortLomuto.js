// Lomuto partition scheme
export function getQuickSortAnimationsLomuto(array) {
  const animations = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}

function quickSort(array, start, end, animations) {
  if (start >= end) return;
  let index = partition(array, start, end, animations);
  quickSort(array, start, index - 1, animations);
  quickSort(array, index + 1, end, animations);
}

function partition(array, start, end, animations) {
  let pivotIndex = start;
  let pivotValue = array[end];
  for (let i = start; i < end; i++) {
    animations.push([i, end]);
    animations.push([i, end]);
    if (array[i] > pivotValue) {
      animations.push([pivotIndex, array[pivotIndex]]);
    } else {
      animations.push([pivotIndex, array[i]]);
      let temp = array[pivotIndex];
      swap(array, i, pivotIndex);

      animations.push([i, pivotIndex]);
      animations.push([i, pivotIndex]);
      animations.push([i, temp]);
      pivotIndex++;
    }
  }
  swap(array, pivotIndex, end);
  animations.push([pivotIndex, end]);
  animations.push([pivotIndex, end]);
  animations.push([end, array[end]]);
  animations.push([pivotIndex, end]);
  animations.push([pivotIndex, end]);
  animations.push([pivotIndex, array[pivotIndex]]);
  return pivotIndex;
}

function swap(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
