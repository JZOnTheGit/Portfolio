let clickCount = 0;
let clickTimeout;

function handleHrClick() {
    clickCount++;
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        clickCount = 0;
    }, 1000); // Reset count if not clicked within 1 second

    if (clickCount === 5) {
        window.location.href = 'testing.html'; 
    }
}

//scroll to Bubble Sort
function scrollToBubbleSort() {
    const bubbleSortSection = document.getElementById("bubble_sort");
    bubbleSortSection.scrollIntoView({ behavior: "smooth" });
}

//scroll to merge sort
function scrollToMergeSort() {
    const mergeSortSection = document.getElementById("merge_sort");
    mergeSortSection.scrollIntoView({ behavior: "smooth" });
}

//scroll to insertion sort
function scrollToInsertionSort() {
    const insertionSortSection = document.getElementById("insertion_sort");
    insertionSortSection.scrollIntoView({ behavior: "smooth" });
}

//scroll to selection sort
function scrollToSelectionSort() {
    const selectionSortSection = document.getElementById("selection_sort");
    selectionSortSection.scrollIntoView({ behavior: "smooth" });
}

//scroll to quick sort
function scrollToQuickSort() {
    const quickSortSection = document.getElementById("quick_sort");
    quickSortSection.scrollIntoView({ behavior: "smooth" });
}

//scroll to heap sort
function scrollToHeapSort() {
    const heapSortSection = document.getElementById("heap_sort");
    heapSortSection.scrollIntoView({ behavior: "smooth" });
}
