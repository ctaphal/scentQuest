<template>
    <div class="flex flex-col p-8 relative">
      <h2 class="text-lg font-semibold mb-4">PRINCIPLE ODOR MAP</h2>
      <!-- display only unique smiles strings in their appropriate relative positions -->
      <ul class="relative" style="transform: translate(-50%, -50%); position: absolute; top: 50%; left: 50%;">
        <li v-for="(uniqueSmiles, index) in uniqueSmilesList" :key="index"
            @click="showSidebar(uniqueSmiles)"
            :style="{ transform: 'translate(' + scale(uniqueSmiles.odor_x, 'x') + 'px, ' + scale(uniqueSmiles.odor_y, 'y') + 'px)' }"
            class="absolute cursor-pointer">
          {{ uniqueSmiles.smiles }}
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
  
  const csvData = ref(null); // Define reactive variable to hold CSV data
  const uniqueSmilesList = ref([]); // Define reactive variable to hold unique smiles
  const selectedItem = ref(null); // Define reactive variable to hold selected item
  const sidebarVisible = ref(false); // Define reactive variable to toggle sidebar visibility
  
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
  
  // Function to scale the coordinates
    // Function to scale the coordinates
    // Function to scale the coordinates
const scale = (value, dimension) => {
    // Define min and max values for each dimension
    const minValues = { x: -3.6, y: -4.4 }; // Example minimum values
    const maxValues = { x: 14, y: 10.3 }; // Example maximum values
    
    // Determine the appropriate min and max values based on the dimension
    const minValue = minValues[dimension];
    const maxValue = maxValues[dimension];
    
    // Determine the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate the center of the viewport
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    
    // Scale the value to fit within the page dimensions
    let scaledValue = (value - minValue) * (viewportWidth / (maxValue - minValue));
    
    // Adjust the scaled value to be centered at (0,0)
    if (dimension === 'x') {
        scaledValue -= centerX;
    } else {
        scaledValue -= centerY;
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
  </script>
  
  <style scoped>
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
  