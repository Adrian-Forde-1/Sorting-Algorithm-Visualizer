import React, { Component } from "react";
import "./SortingAlgorithms.css";
import { getMergeSortAnimations } from "../Algorithms/MergeSort";
import { getQuickSortAnimationsLomuto } from "../Algorithms/QuickSortLomuto";
import { getQuickSortAnimationsHoare } from "../Algorithms/QuickSortHoare";
import { getBubbleSortAnimations } from "../Algorithms/BubbleSort";
import { getHeapSortAnimations } from "../Algorithms/HeapSort";
import { getSelectionSortAnimations } from "../Algorithms/SelectionSort";
import { getInsertionSortAnimations } from "../Algorithms/InsertionSort";
import { getGnomeSortAnimations } from "../Algorithms/GnomeSort";

//Audio
// let audioCtx = new AudioContext();

// let oscillator = audioCtx.createOscillator();

// Change this value for the speed of the animations.
let SORT_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
// let NUMBER_OF_ARRAY_BARS = 300;

// This is the main color of the array bars.
const PRIMARY_COLOR = "#8bd8bd";
let SECONDARY_COLOR = "#eb2188";

const yellow = "#D6ED17FF";
const pink = "#eb2188";
// const purple = "#3c1a5b";
const cyan = "#8bd8bd";

let isRunning = false;

let canVisualize = true;

//Quick Sort Algorithm patterns
let currentPattern = "Lomuto Pattern";

// // This is the color of array bars that are being compared throughout the animations.
// const SECONDARY_COLOR = "#fff748";

let isPattern = false; //Checks to see if there are more than one pattern for an algorithm
let currentAlgo = "Merge Sort";

const heightShortener = 0.6;

let widthScaling = 0.5;

// Checks to see if the macro buttons are toggled. If they are on, it will disable the speed slider and lower its
// opacity, but if they are off it will enable the speed slider and set its opacity to 1
let isToggled = true;

// var ViewPortWidth = Math.max(
//   document.documentElement.clientWidth,
//   window.innerWidth || 0
// );

var windowWidth = window.innerWidth;

// var ViewPortHeight = Math.max(
//   document.documentElement.clientHeight,
//   window.innerHeight || 0
// );

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    var initialArrayLength = 0;

    var currentWindowWidth = window.innerWidth;
    if (currentWindowWidth <= 400) initialArrayLength = 50;
    else if (currentWindowWidth <= 500) initialArrayLength = 100;
    else if (currentWindowWidth <= 600) initialArrayLength = 150;
    else if (currentWindowWidth <= 700) initialArrayLength = 200;
    else if (currentWindowWidth <= 800) initialArrayLength = 250;
    else if (currentWindowWidth <= 900) initialArrayLength = 275;
    else initialArrayLength = 300;
    this.state = {
      array: [],
      quickSortPattern: "Lomuto",
      minArrayBars: 5,
      maxArrayBars: initialArrayLength,
      NUMBER_OF_ARRAY_BARS: initialArrayLength
    };
  }

  componentDidMount() {
    this.resetArray();

    document.getElementById("Lomuto-btn").classList.toggle("current-pattern");

    if (isPattern) {
      document.querySelector("#change-pattern-btn").style.display =
        "inline-block";
    } else {
      document.querySelector("#change-pattern-btn").style.display = "none";
    }

    document.documentElement.style.setProperty(
      "--view-port-width",
      `${windowWidth / (this.state.NUMBER_OF_ARRAY_BARS * widthScaling)}px`
    );

    document.getElementById("current-algorithm").innerHTML = currentAlgo;

    document.querySelector(
      "#value"
    ).innerHTML = this.state.NUMBER_OF_ARRAY_BARS;
    document.querySelector("#value2").innerHTML = SORT_SPEED_MS;
  }

  resetArray() {
    canVisualize = true;
    document.querySelector(".vis-btn").style.opacity = 1;
    const array = [];
    for (let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }

    const arrayBars = document.querySelectorAll(".array-bar");
    for (let x = 0; x < arrayBars.length; x++) {
      arrayBars[x].style.backgroundColor = cyan;
    }
    this.setState({ array });

    if (this.state.NUMBER_OF_ARRAY_BARS < 200) widthScaling = 3;
    else widthScaling = 3;

    document.documentElement.style.setProperty(
      "--view-port-width",
      `${windowWidth / (this.state.NUMBER_OF_ARRAY_BARS * widthScaling)}px`
    );

    document.documentElement.style.setProperty(
      "--array-bar-color",
      PRIMARY_COLOR
    );
  }

  setIsRunning() {
    if (isRunning === true) {
      this.disable();
    } else if (isRunning === false) {
      this.enable();
    }
  }

  disable() {
    // Decrease the opacity of all the interactables
    isRunning = true;
    // const sliders = document.querySelectorAll(".slider");
    const buttons = document.querySelectorAll(".btn");
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    document.querySelector("#change-pattern-btn").style.opacity = 0.5;
    document.querySelector(".drop-down-container").style.opacity = 0.5;
    document.getElementById("array-num-slider").disabled = true;
    document.getElementById("speed-slider").disabled = true;
    document.getElementById("array-num-slider").style.opacity = 0.5;
    document.getElementById("speed-slider").style.opacity = 0.5;

    for (let i = 0; i < toggleButtons.length; i++)
      toggleButtons[i].style.opacity = 0.5;
    for (let i = 0; i < buttons.length; i++) buttons[i].style.opacity = 0.5;
    // for (let i = 0; i < sliders.length; i++) sliders[i].style.opacity = 0.5;
  }

  enable() {
    // Increase the opacity of all the interactables
    isRunning = false;

    // const sliders = document.querySelectorAll(".slider");
    const buttons = document.querySelectorAll(".btn");
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    document.querySelector("#change-pattern-btn").style.opacity = 1;
    document.querySelector(".drop-down-container").style.opacity = 1;
    document.getElementById("array-num-slider").disabled = false;
    document.getElementById("speed-slider").disabled = false;
    document.getElementById("array-num-slider").style.opacity = 1;
    document.getElementById("speed-slider").style.opacity = 1;

    for (let i = 0; i < buttons.length; i++) buttons[i].style.opacity = 1;
    for (let i = 0; i < toggleButtons.length; i++)
      toggleButtons[i].style.opacity = 1;
    // for (let i = 0; i < sliders.length; i++) sliders[i].style.opacity = 1;
  }

  started(didStart) {
    if (didStart === true) {
      isRunning = true;
      this.setIsRunning();
    } else if (didStart === false) {
      isRunning = false;
      this.setIsRunning();
    }
  }

  whichAlgorithm(algo) {
    if (algo === "Merge Sort") {
      this.mergeSort();
    } else if (algo === "Quick Sort") {
      this.quickSort();
    } else if (algo === "Heap Sort") {
      this.heapSort();
    } else if (algo === "Bubble Sort") {
      this.bubbleSort();
    } else if (algo === "Selection Sort") {
      this.selectionSort();
    } else if (algo === "Insertion Sort") {
      this.insertionSort();
    } else if (algo === "Gnome Sort") {
      this.gnomeSort();
    } else alert("That is not an avaiable algorithm");
  }

  mergeSort() {
    let timer = 0;
    this.started(true);
    const animations = getMergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        if (i % 2 === 0) {
          SECONDARY_COLOR = yellow;
        } else {
          SECONDARY_COLOR = pink;
        }
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SORT_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;

          barOneStyle.height = `${newHeight * heightShortener}px`;
        }, i * SORT_SPEED_MS);
      }
    }

    timer += animations.length * SORT_SPEED_MS;
    setTimeout(() => {
      for (let i = 0; i < arrayBars.length; i++) {
        if (arrayBars[i] === undefined) {
          return;
        } else {
          setTimeout(() => {
            const curArrayBar = arrayBars[i].style;
            curArrayBar.background = pink;
            if (i * 5 === arrayBars.length * 5 - 5) this.started(false);
          }, i * 5);
        }
      }
    }, timer);
  }

  quickSort() {
    let whichPattern;
    if (currentPattern === "Lomuto Pattern")
      whichPattern = getQuickSortAnimationsLomuto(this.state.array);
    else if (currentPattern === "Hoare Pattern")
      whichPattern = getQuickSortAnimationsHoare(this.state.array);
    let timer = 0;
    this.started(true);
    const animations = whichPattern;
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SORT_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight * heightShortener}px`;
        }, i * SORT_SPEED_MS);
      }
    }

    timer += animations.length * SORT_SPEED_MS;
    setTimeout(() => {
      for (let i = 0; i < arrayBars.length; i++) {
        if (arrayBars[i] === undefined) {
          return;
        } else {
          setTimeout(() => {
            const curArrayBar = arrayBars[i].style;
            curArrayBar.background = pink;
            if (i * 5 === arrayBars.length * 5 - 5) this.started(false);
          }, i * 5);
        }
      }
    }, timer);
  }

  heapSort() {
    let timer = 0;
    this.started(true);
    const animations = getHeapSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        if (i % 2 === 0) {
          SECONDARY_COLOR = yellow;
        } else {
          SECONDARY_COLOR = pink;
        }

        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SORT_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight * heightShortener}px`;
        }, i * SORT_SPEED_MS);
      }
    }

    timer += animations.length * SORT_SPEED_MS;
    setTimeout(() => {
      for (let i = 0; i < arrayBars.length; i++) {
        if (arrayBars[i] === undefined) {
          return;
        } else {
          setTimeout(() => {
            const curArrayBar = arrayBars[i].style;
            curArrayBar.background = pink;
            if (i * 5 === arrayBars.length * 5 - 5) this.started(false);
          }, i * 5);
        }
      }
    }, timer);
  }

  selectionSort() {
    let timer = 0;
    this.started(true);
    const animations = getSelectionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        if (i % 2 === 0) {
          SECONDARY_COLOR = yellow;
        } else {
          SECONDARY_COLOR = pink;
        }

        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SORT_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight * heightShortener}px`;
        }, i * SORT_SPEED_MS);
      }
    }

    timer += animations.length * SORT_SPEED_MS;
    setTimeout(() => {
      for (let i = 0; i < arrayBars.length; i++) {
        if (arrayBars[i] === undefined) {
          return;
        } else {
          setTimeout(() => {
            const curArrayBar = arrayBars[i].style;
            curArrayBar.background = pink;
            if (i * 5 === arrayBars.length * 5 - 5) this.started(false);
          }, i * 5);
        }
      }
    }, timer);
  }

  insertionSort() {
    let timer = 0;
    this.started(true);
    const animations = getInsertionSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        if (i % 2 === 0) {
          SECONDARY_COLOR = yellow;
        } else {
          SECONDARY_COLOR = pink;
        }

        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SORT_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight * heightShortener}px`;
        }, i * SORT_SPEED_MS);
      }
    }

    timer += animations.length * SORT_SPEED_MS;
    setTimeout(() => {
      for (let i = 0; i < arrayBars.length; i++) {
        if (arrayBars[i] === undefined) {
          return;
        } else {
          setTimeout(() => {
            const curArrayBar = arrayBars[i].style;
            curArrayBar.background = pink;
            if (i * 5 === arrayBars.length * 5 - 5) this.started(false);
          }, i * 5);
        }
      }
    }, timer);
  }

  bubbleSort() {
    let timer = 0;
    this.started(true);
    const animations = getBubbleSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SORT_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight * heightShortener}px`;
        }, i * SORT_SPEED_MS);
      }
    }

    timer += animations.length * SORT_SPEED_MS;
    setTimeout(() => {
      for (let i = 0; i < arrayBars.length; i++) {
        if (arrayBars[i] === undefined) {
          return;
        } else {
          setTimeout(() => {
            const curArrayBar = arrayBars[i].style;
            curArrayBar.background = pink;
            if (i * 5 === arrayBars.length * 5 - 5) this.started(false);
          }, i * 5);
        }
      }
    }, timer);
  }

  gnomeSort() {
    let timer = 0;
    this.started(true);
    const animations = getGnomeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SORT_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight * heightShortener}px`;
        }, i * SORT_SPEED_MS);
      }
    }
    timer += animations.length * SORT_SPEED_MS;
    setTimeout(() => {
      for (let i = 0; i < arrayBars.length; i++) {
        if (arrayBars[i] === undefined) {
          return;
        } else {
          setTimeout(() => {
            const curArrayBar = arrayBars[i].style;
            curArrayBar.background = pink;
            if (i * 5 === arrayBars.length * 5 - 5) this.started(false);
          }, i * 5);
        }
      }
    }, timer);
  }

  render() {
    const { array } = this.state;

    // window.addEventListener('resize', () => {
    //   // canReRenderBars = true;
    //   var currentWindowWidth = window.innerWidth;
    //   if (currentWindowWidth <= 400) {
    //     this.setState(prevState => ({
    //       maxArrayBars: (prevState.maxArrayBars = 50)
    //     }));

    //     this.setState(
    //       prevState => ({
    //         NUMBER_OF_ARRAY_BARS: prevState.maxArrayBars
    //       }),
    //       () => {
    //         console.log(this.state.NUMBER_OF_ARRAY_BARS);
    //         this.resetArray();
    //       }
    //     );
    //   } else if (currentWindowWidth <= 500) {
    //     this.setState(prevState => ({
    //       maxArrayBars: (prevState.maxArrayBars = 100)
    //     }));

    //     this.setState(
    //       prevState => ({
    //         NUMBER_OF_ARRAY_BARS: prevState.maxArrayBars
    //       }),
    //       () => {
    //         console.log(this.state.NUMBER_OF_ARRAY_BARS);
    //         this.resetArray();
    //       }
    //     );
    //   } else if (currentWindowWidth <= 600) {
    //     this.setState(prevState => ({
    //       maxArrayBars: (prevState.maxArrayBars = 150)
    //     }));

    //     this.setState(
    //       prevState => ({
    //         NUMBER_OF_ARRAY_BARS: prevState.maxArrayBars
    //       }),
    //       () => {
    //         console.log(this.state.NUMBER_OF_ARRAY_BARS);
    //         this.resetArray();
    //       }
    //     );
    //   } else if (currentWindowWidth <= 700) {
    //     this.setState(prevState => ({
    //       maxArrayBars: (prevState.maxArrayBars = 200)
    //     }));

    //     this.setState(
    //       prevState => ({
    //         NUMBER_OF_ARRAY_BARS: prevState.maxArrayBars
    //       }),
    //       () => {
    //         console.log(this.state.NUMBER_OF_ARRAY_BARS);
    //         this.resetArray();
    //       }
    //     );
    //   } else if (currentWindowWidth <= 800) {
    //     this.setState(prevState => ({
    //       maxArrayBars: (prevState.maxArrayBars = 250)
    //     }));

    //     this.setState(
    //       prevState => ({
    //         NUMBER_OF_ARRAY_BARS: prevState.maxArrayBars
    //       }),
    //       () => {
    //         console.log(this.state.NUMBER_OF_ARRAY_BARS);
    //         this.resetArray();
    //       }
    //     );
    //   } else if (currentWindowWidth <= 900) {
    //     this.setState(prevState => ({
    //       maxArrayBars: (prevState.maxArrayBars = 275)
    //     }));

    //     this.setState(
    //       prevState => ({
    //         NUMBER_OF_ARRAY_BARS: prevState.maxArrayBars
    //       }),
    //       () => {
    //         console.log(this.state.NUMBER_OF_ARRAY_BARS);
    //         this.resetArray();
    //       }
    //     );
    //   } else {
    //     this.setState(prevState => ({
    //       maxArrayBars: (prevState.maxArrayBars = 300)
    //     }));

    //     this.setState(
    //       prevState => ({
    //         NUMBER_OF_ARRAY_BARS: prevState.maxArrayBars
    //       }),
    //       () => {
    //         console.log(this.state.NUMBER_OF_ARRAY_BARS);
    //         this.resetArray();
    //       }
    //     );
    //   }
    // });

    return (
      <div className="array-container">
        <nav className="nav">
          <ul>
            {/* Generate New Array Button */}
            <li>
              <button
                className="btn"
                onClick={() => {
                  if (isRunning === false) {
                    this.resetArray();
                  } else {
                  }
                }}
              >
                Generate New Array
              </button>
            </li>
            {/* Generate New Array Button End */}

            {/* Drop-Down Box */}
            <li
              className="drop-down-container"
              onClick={() => {
                if (isRunning === false) {
                  const items = document.querySelector(".drop-down");
                  items.classList.toggle("active");
                }
              }}
            >
              <span id="current-algorithm"> </span>
              <i className="fas fa-caret-down"></i>
              <ul className="drop-down">
                <li
                  onClick={() => {
                    currentAlgo = "Merge Sort";
                    document.querySelector(
                      "#current-algorithm"
                    ).innerHTML = currentAlgo;
                    isPattern = false;
                    document.querySelector(
                      "#change-pattern-btn"
                    ).style.display = "none";
                  }}
                >
                  Merge Sort
                </li>
                <li
                  onClick={() => {
                    currentAlgo = "Quick Sort";
                    document.querySelector(
                      "#current-algorithm"
                    ).innerHTML = currentAlgo;
                    isPattern = true;
                    document.querySelector(
                      "#change-pattern-btn"
                    ).style.display = "inline-block";
                  }}
                >
                  Quick Sort
                </li>
                <li
                  onClick={() => {
                    currentAlgo = "Bubble Sort";

                    document.querySelector(
                      "#current-algorithm"
                    ).innerHTML = currentAlgo;

                    isPattern = false;

                    document.querySelector(
                      "#change-pattern-btn"
                    ).style.display = "none";
                  }}
                >
                  Bubble Sort
                </li>
                {/* <li
                  onClick={() => {
                    currentAlgo = "Heap Sort";

                    document.querySelector(
                      "#current-algorithm"
                    ).innerHTML = currentAlgo;

                    isPattern = false;

                    document.querySelector(
                      "#change-pattern-btn"
                    ).style.display = "none";
                  }}
                >
                  Heap Sort
                </li> */}
                <li
                  onClick={() => {
                    currentAlgo = "Gnome Sort";
                    document.querySelector(
                      "#current-algorithm"
                    ).innerHTML = currentAlgo;
                    isPattern = false;
                    document.querySelector(
                      "#change-pattern-btn"
                    ).style.display = "none";
                  }}
                >
                  Gnome Sort
                </li>
                <li
                  onClick={() => {
                    currentAlgo = "Selection Sort";
                    document.querySelector(
                      "#current-algorithm"
                    ).innerHTML = currentAlgo;
                    isPattern = false;
                    document.querySelector(
                      "#change-pattern-btn"
                    ).style.display = "none";
                  }}
                >
                  Selection Sort
                </li>
                <li
                  onClick={() => {
                    currentAlgo = "Insertion Sort";
                    document.querySelector(
                      "#current-algorithm"
                    ).innerHTML = currentAlgo;
                    isPattern = false;
                    document.querySelector(
                      "#change-pattern-btn"
                    ).style.display = "none";
                  }}
                >
                  Insertion Sort
                </li>
              </ul>
            </li>
            {/* Drop-Down Box */}

            <li>
              <button
                className="vis-btn"
                onClick={() => {
                  if (isRunning === false && canVisualize === true) {
                    document.querySelector(".vis-btn").style.opacity = 0.5;
                    canVisualize = false;
                    this.whichAlgorithm(currentAlgo);
                  } else if (isRunning === true) {
                  }
                }}
              >
                Visualize
              </button>
            </li>

            <li>
              <div className="slider-container">
                {/* Label for slider */}
                <p className="slider-label">Number of Bars</p>
                {/* Value label for slider */}
                <div className="slider-box">
                  <center>
                    <div id="value"></div>
                  </center>
                </div>
                {/* Slider that changes the number of array values */}
                <input
                  type="range"
                  min={this.state.minArrayBars}
                  max={this.state.maxArrayBars}
                  defaultValue={this.state.NUMBER_OF_ARRAY_BARS}
                  id="array-num-slider"
                  className="slider"
                  onChange={() => {
                    if (isRunning) {
                    } else {
                      const slider = document.querySelector(
                        "#array-num-slider"
                      );
                      const value = document.querySelector("#value");
                      var x = slider.value;
                      value.innerHTML = x;
                      const currentValue = document.querySelector("#value");
                      console.log(currentValue.innerHTML);

                      var color =
                        "linear-gradient(90deg, #fff748" +
                        x +
                        "%, rgb(214, 214, 214)" +
                        x +
                        "%)";
                      slider.style.background = color;
                      // this.state.NUMBER_OF_ARRAY_BARS = x;
                      // this.resetArray();
                      // this.setState(
                      //   {
                      //     NUMBER_OF_ARRAY_BARS:
                      //   },
                      //   this.resetArray()
                      // );

                      this.setState(
                        prevState => ({
                          NUMBER_OF_ARRAY_BARS: (prevState.NUMBER_OF_ARRAY_BARS = currentValue.innerHTML.toString())
                        }),
                        this.resetArray
                      );
                    }
                  }}
                  /* onMouseOver={() => {
                    const slider = document.querySelector("#value-slider");
                    var x = slider.value;

                    
                  }} */
                />
              </div>
            </li>
            <li>
              <div className="slider-container">
                {/* Label for slider */}
                <p className="slider-label">Speed in ms</p>
                {/* Value label for slider */}
                <div className="slider-box">
                  <center>
                    <div id="value2"></div>
                  </center>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="10"
                  defaultValue={Math.floor(SORT_SPEED_MS)}
                  id="speed-slider"
                  className="slider"
                  onChange={() => {
                    if (isRunning) {
                    } else {
                      const slider = document.querySelector("#speed-slider");
                      const value2 = document.querySelector("#value2");
                      var x = slider.value;
                      value2.innerHTML = x;
                      SORT_SPEED_MS = x;
                    }
                  }}
                />
              </div>
            </li>
            <li>
              <button
                className="toggle-btn"
                id="ultra-slow"
                onClick={() => {
                  const toggleButton = document.querySelector(".toggle-btn");
                  if (isRunning === false) {
                    if (isToggled) {
                      document.getElementById("speed-slider").disabled = true;
                      document.getElementById(
                        "speed-slider"
                      ).style.opacity = 0.5;
                      toggleButton.classList.toggle("toggleOn");
                      SORT_SPEED_MS = 1000;
                      isToggled = false;
                    } else {
                      document.getElementById("speed-slider").disabled = false;
                      document.getElementById("speed-slider").style.opacity = 1;
                      toggleButton.classList.toggle("toggleOn");
                      SORT_SPEED_MS = 1;
                      isToggled = true;
                    }
                  } else if (isRunning === true) {
                  }
                }}
              >
                Ultra Slow
              </button>
            </li>
            <li
              className="drop-down-container-2"
              id="change-pattern-btn"
              onClick={() => {
                if (isPattern === true && isRunning === false) {
                  const changePatternBtn = document.querySelector(
                    ".drop-down-2"
                  );
                  changePatternBtn.classList.toggle("active");
                } else {
                }
              }}
            >
              Patterns
              <i className="fas fa-caret-down"></i>
              <ul className="drop-down-2">
                <li
                  id="Lomuto-btn"
                  onClick={() => {
                    if (currentPattern !== "Lomuto Pattern") {
                      currentPattern = "Lomuto Pattern";

                      const Lomuto_btn = document.getElementById("Lomuto-btn");
                      const Hoare_btn = document.getElementById("Hoare-btn");
                      Hoare_btn.classList.toggle("current-pattern");
                      Lomuto_btn.classList.toggle("current-pattern");
                    } else {
                    }
                  }}
                >
                  Lomuto Pattern
                </li>
                <li
                  id="Hoare-btn"
                  onClick={() => {
                    if (currentPattern !== "Hoare Pattern") {
                      currentPattern = "Hoare Pattern";

                      const Hoare_btn = document.getElementById("Hoare-btn");
                      const Lomuto_btn = document.getElementById("Lomuto-btn");
                      Lomuto_btn.classList.toggle("current-pattern");
                      Hoare_btn.classList.toggle("current-pattern");
                    } else {
                    }
                  }}
                >
                  Hoare Pattern
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="visualization">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value * heightShortener}px` }}
            >
              {/* {value} */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
