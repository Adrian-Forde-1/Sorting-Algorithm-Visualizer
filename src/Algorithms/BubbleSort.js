export function getBubbleSortAnimations(array) {
  const animations = [];
  // bubbleSortHelper(array, animations);
  bubbleSort(array, animations);
  return animations;
}

// function bubbleSortHelper(array, animations) {
//   for (let i = 0; i < array.length; i++) {
//     for (let x = 0; x < array.length - 1; x++) {
//       animations.push([x, x + 1]);
//       animations.push([x, x + 1]);
//       if (array[x] > array[x + 1]) {
//         swap(array, x, x + 1);
//         animations.push([x + 1, array[x + 1]]);
//         animations.push([x, x + 1]);
//         animations.push([x, x + 1]);
//         animations.push([x, array[x]]);
//       } else {
//         animations.push([x + 1, array[x + 1]]);
//         animations.push([x + 1, x]);
//         animations.push([x + 1, x]);
//         animations.push([x, array[x]]);
//       }
//     }
//   }
// }

// function swap(array, a, b) {
//   let temp = array[a];
//   array[a] = array[b];
//   array[b] = temp;
// }

function bubbleSort(array, animations) {
  do {
    var changed = false;
    for (var i = 0; i < array.length - 1; i++) {
      animations.push([i, i + 1]);
      animations.push([i, i + 1]);
      if (array[i] > array[i + 1]) {
        var temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        animations.push([i + 1, array[i + 1]]);
        animations.push([i, i + 1]);
        animations.push([i, i + 1]);
        animations.push([i, array[i]]);
        changed = true;
      } else {
        animations.push([i + 1, array[i + 1]]);
        animations.push([i, i + 1]);
        animations.push([i, i + 1]);
        animations.push([i, array[i]]);
      }
    }
  } while (changed);
  return array;
}
