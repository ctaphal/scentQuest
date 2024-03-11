<template>
  <div
    class="flex flex-col p-8 relative"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
  <h2 class="text-2xl font-semibold mb-4">
  <span class="rounded inline bg-blue-300 px-3">ScentQUEST: PRINCIPLE ODOR MAP</span>
  </h2>
  <button @click="navigateToStructMap" class="flex justify-start mb-4">
  <span class="inline bg-gray-200 px-3 rounded text-lg italic text-gray-500">Go to Structural Map</span>
  </button>
  <!-- display only unique smiles strings in their appropriate relative positions -->
    <ul
      class="relative"
      :style="{
        transform: 'translate(-50%, -50%) scale(' + zoomLevel + ')',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 'fit-content'
      }"
    >
      <li
        v-for="(uniqueSmiles, index) in uniqueSmilesList"
        :key="index"
        @click="showSidebar(uniqueSmiles)"
        @mouseover="handleHover(index, true)"
        @mouseout="handleHover(index, false)"
        :style="{
          transform: 'translate(' + scale(uniqueSmiles.odor_x, 'x') + 'px, ' + scale(uniqueSmiles.odor_y, 'y') + 'px)',
          backgroundColor: index === itemHovered ? hoverColor : ''
        }"
        class="absolute cursor-pointer"
      >
        <span class="smiles-text">{{ uniqueSmiles.smiles }}</span>
      </li>
    </ul>
    <!-- Sidebar -->
    <Sidebar v-if="sidebarVisible" :item="selectedItem" @closeSidebar="closeSidebar" />
  </div>
</template>

<script setup>
import { processCsvData } from '../store/data'; // Import CSV processing function
import { ref, onMounted } from 'vue';
import Sidebar from '../components/Sidebar.vue'; // Import Sidebar component
import { useRouter } from 'vue-router';

const router = useRouter();

const csvData = ref(null); // Define reactive variable to hold CSV data
const uniqueSmilesList = ref([]); // Define reactive variable to hold unique smiles
const selectedItem = ref(null); // Define reactive variable to hold selected item
const sidebarVisible = ref(false); // Define reactive variable to toggle sidebar visibility
const itemHovered = ref(-1); // Define reactive variable to track the index of the item being hovered over
const hoverColor = '#72b7e9'; // Define the background color for hover
const zoomLevel = ref(1); // Define reactive variable for zoom level
let touchStartX = 0;
let touchStartY = 0;
let initialZoomLevel = 1;

// Fetch and process CSV data when component is mounted
onMounted(async () => {
  csvData.value = await processCsvData();
  extractUniqueSmiles();
});

function extractUniqueSmiles() {
  const uniqueSmilesSet = new Set();
  csvData.value.forEach(item => {
    uniqueSmilesSet.add(item.smiles);
  });
  uniqueSmilesList.value = Array.from(uniqueSmilesSet).map(smiles => {
    return csvData.value.find(item => item.smiles === smiles);
  });
}

const scale = (value, dimension) => {
  // Define min and max values for each dimension
  const minValues = { x: -3.6, y: -4.4 }; // Example minimum values
  const maxValues = { x: 14, y: 10.3 }; // Example maximum values
  
  // Determine the appropriate min and max values based on the dimension
  const minValue = minValues[dimension];
  const maxValue = maxValues[dimension];
  
  // Determine the viewport dimensions
  const initialViewportWidth = window.innerWidth;
  const initialViewportHeight = window.innerHeight;
  const currentViewportWidth = initialViewportWidth / initialZoomLevel * zoomLevel.value;
  const currentViewportHeight = initialViewportHeight / initialZoomLevel * zoomLevel.value;
  
  // Calculate the center of the viewport
  const initialCenterX = initialViewportWidth / 2;
  const initialCenterY = initialViewportHeight / 2;
  const currentCenterX = currentViewportWidth / 2;
  const currentCenterY = currentViewportHeight / 2;
  
  // Scale the value to fit within the page dimensions
  let scaledValue = (value - minValue) * (currentViewportWidth / (maxValue - minValue));
  
  // Adjust the scaled value to be centered at (0,0)
  if (dimension === 'x') {
    scaledValue -= currentCenterX - initialCenterX;
  } else {
    scaledValue -= currentCenterY - initialCenterY;
  }
  
  return scaledValue;
};

// Function to show sidebar and set selected item
const showSidebar = (item) => {
  selectedItem.value = item;
  sidebarVisible.value = true;
};

// Function to close sidebar
const closeSidebar = () => {
  sidebarVisible.value = false;
};

// Function to handle mouseover and mouseout events
const handleHover = (index, isHovered) => {
  itemHovered.value = isHovered ? index : -1;
};

const handleTouchStart = (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
  initialZoomLevel = zoomLevel.value;
};

const handleTouchMove = (event) => {
  event.preventDefault();
  const touchEndX = event.touches[0].clientX;
  const touchEndY = event.touches[0].clientY;
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  zoomLevel.value = Math.max(1, Math.min(initialZoomLevel + distance * 0.01, 3));
};

const handleTouchEnd = () => {
  // Add any final touch-up logic if needed
};

const navigateToStructMap = () => {
  router.push({ name: 'StructMap' });
};
</script>

<style scoped>
.smiles-text {
  font-size: 14px; /* Adjust the font size as needed */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #ffffff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
