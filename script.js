// Global array
let arr = [];

// Generate random array
function generateArray() {
  arr = [];
  let container = document.getElementById("array");
  container.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    let value = Math.floor(Math.random() * 100) + 5;
    arr.push(value);

    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value * 3 + "px";
    container.appendChild(bar);
  }
}

// Run algorithm
async function runAlgo() {
  let algo = document.getElementById("algo").value;
  if (algo === "bubble") {
    await bubbleSort();
  } else if (algo === "quick") {
    await quickSortWrapper();
  } else if (algo === "binary") {
    binarySearchPrompt();
  }
}

// Bubble Sort Visualization
async function bubbleSort() {
  let bars = document.getElementsByClassName("bar");
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      await sleep(200);

      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        bars[j].style.height = arr[j] * 3 + "px";
        bars[j + 1].style.height = arr[j + 1] * 3 + "px";
      }

      bars[j].style.backgroundColor = "teal";
      bars[j + 1].style.backgroundColor = "teal";
    }
  }
}

// Quick Sort Visualization
async function quickSortWrapper() {
  await quickSort(0, arr.length - 1);
}

async function quickSort(low, high) {
  if (low < high) {
    let pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function partition(low, high) {
  let bars = document.getElementsByClassName("bar");
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = "red";
    await sleep(200);

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      bars[i].style.height = arr[i] * 3 + "px";
      bars[j].style.height = arr[j] * 3 + "px";
    }

    bars[j].style.backgroundColor = "teal";
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  bars[i + 1].style.height = arr[i + 1] * 3 + "px";
  bars[high].style.height = arr[high] * 3 + "px";

  return i + 1;
}

// Binary Search
function binarySearchPrompt() {
  let target = prompt("Enter number to search:");
  if (target !== null) {
    let index = binarySearch(arr, parseInt(target));
    let resultDiv = document.getElementById("result");
    if (index !== -1) {
      resultDiv.innerHTML = `✅ Found at index ${index}`;
    } else {
      resultDiv.innerHTML = "❌ Not Found";
    }
  }
}

function binarySearch(array, target) {
  let left = 0,
    right = array.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (array[mid] === target) return mid;
    else if (array[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// Helper function (delay)
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
