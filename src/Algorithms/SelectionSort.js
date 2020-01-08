export function getSelectionSortAnimations(array) {
  const animations = [];
  selectionSort(array, animations);
  //   sort(array, animations);
  return animations;
}

function selectionSort(array, animations) {
  let sortedArray = [...array];
  sortedArray.forEach((element, index) => {
    let currentMin = element;
    let currentIndex = index;
    for (let i = index; i < sortedArray.length; i++) {
      animations.push([i, currentIndex]);
      animations.push([i, currentIndex]);
      if (compare(sortedArray[i], currentMin) < 0) {
        currentMin = sortedArray[i];
        currentIndex = i;
        animations.push([currentIndex, currentMin]);
      } else {
        animations.push([currentIndex, currentMin]);
      }
    }
    sortedArray = swap(sortedArray, index, currentIndex);
    animations.push([currentIndex, index]);
    animations.push([currentIndex, index]);
    animations.push([currentIndex, sortedArray[currentIndex]]);
    animations.push([currentIndex, index]);
    animations.push([currentIndex, index]);
    animations.push([index, sortedArray[index]]);
  });
  return sortedArray;
}

function swap(arr, i1, i2) {
  let temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
  return arr;
}

function compare(a, b) {
  if (a < b) return -1;
  // a comes first
  else if (a > b) return 1; // b comes first
  return 0;
}

// function sort(array, animations) {
//   let sortedArray = [...array];
//   let minIndex = 0;
//   for (let i = 0; i < sortedArray.length; i++) {
//     animations.push([i, minIndex]);
//     animations.push([i, minIndex]);
//     if (sortedArray[i] > sortedArray[minIndex]) {
//       sortedArray[minIndex] = sortedArray[i];
//       animations.push([minIndex, sortedArray[minIndex]]);
//       animations.push([i, minIndex]);
//       animations.push([i, minIndex]);
//       animations.push([i, sortedArray[i]]);
//     } else {
//       animations.push([minIndex, sortedArray[minIndex]]);
//       animations.push([i, minIndex]);
//       animations.push([i, minIndex]);
//       animations.push([i, sortedArray[i]]);
//     }
//   }
//   return sortedArray;
// }
