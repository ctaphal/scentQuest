<template>
    <div class="flex flex-col p-8 relative">
      <h2 class="text-lg font-semibold mb-4">STRUCTURAL MAP</h2>
      <!-- display only unique smiles strings in their appropriate relative positions -->
      <ul
        class="relative"
        style="transform: translate(-50%, -50%); position: absolute; top: 50%; left: 50%;"
      >
        <li
          v-for="(uniqueSmiles, index) in uniqueSmilesList"
          :key="index"
          @click="showSidebar(uniqueSmiles)"
          @mouseover="handleHover(index, true)"
          @mouseout="handleHover(index, false)"
          :style="{
            transform: 'translate(' + scale(uniqueSmiles.structure_x, 'x') + 'px, ' + scale(uniqueSmiles.structure_y, 'y') + 'px)',
            backgroundColor: getBackgroundColor(index)
          }"
          class="absolute cursor-pointer"
        >
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
  const itemHovered = ref(-1); // Define reactive variable to track the index of the item being hovered over
  const hoverColor = '#72b7e9'; // Define the background color for hover
  const selectedColor = '#72b7e9'; // Define the background color for selected item
  
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
    const minValues = { x: -6.5, y: -6 }; // Example minimum values
    const maxValues = { x: 14, y: 14.9 }; // Example maximum values
    
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
  
  // Function to handle mouseover and mouseout events
  const handleHover = (index, isHovered) => {
    itemHovered.value = isHovered ? index : -1;
  };
  
  // Function to get the background color based on hover and selection
  const getBackgroundColor = (index) => {
    if (sidebarVisible.value && selectedItem.value && index === uniqueSmilesList.value.indexOf(selectedItem.value)) {
      return selectedColor;
    } else if (itemHovered.value === index) {
      return hoverColor;
    } else {
      return '';
    }
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
  