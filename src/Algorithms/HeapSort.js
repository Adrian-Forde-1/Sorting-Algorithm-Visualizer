export function getHeapSortAnimations(array) {
  const animations = [];
  heapSort(array, animations);
  let end = array.length - 1;
  while (end > 0) {
    let temp = array[end];
    array[end] = array[0];
    array[0] = temp;
    animations.push([0, end]);
    animations.push([0, end]);
    animations.push([0, array[0]]);
    animations.push([0, end]);
    animations.push([0, end]);
    animations.push([end, array[end]]);
    end--;
  }
  return animations;
}

function heapSort(array, animations) {
  array = makeFirstMaxHeap(array, animations);
  let size = array.length;
  let temp;
  for (let i = array.length - 1; i > 0; i--) {
    temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    size--;
    makeMaxHeap(array, 0, size, animations);
  }
  return array;
}

function makeFirstMaxHeap(array, animations) {
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    makeMaxHeap(array, i, array.length, animations);
  }
  return array;
}

function makeMaxHeap(array, index, heapSize, animations) {
  const left = 2 * index + 1;
  const right = 2 * index + 2;

  let largestNum = index;
  if (heapSize > left && array[largestNum] < array[left]) {
    animations.push([left, largestNum]);
    animations.push([left, largestNum]);
    largestNum = left;
    animations.push([largestNum, array[left]]);
  }

  if (heapSize > right && array[largestNum] < array[right]) {
    animations.push([right, largestNum]);
    animations.push([right, largestNum]);
    largestNum = right;
    animations.push([right, array[right]]);
  }

  if (largestNum !== index) {
    const temp = array[index];
    array[index] = array[largestNum];
    array[largestNum] = temp;
    animations.push([index, largestNum]);
    animations.push([index, largestNum]);
    animations.push([largestNum, array[largestNum]]);
    animations.push([index, largestNum]);
    animations.push([index, largestNum]);
    animations.push([index, array[index]]);
    makeMaxHeap(array, largestNum, heapSize, animations);
  }
}
