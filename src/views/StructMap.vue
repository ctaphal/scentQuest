<template>
    <div class="flex flex-col p-8">
        <h2 class="text-lg font-semibold mb-4">STRUCTURAL MAP</h2>
        <!-- display only unique smiles strings in their appropriate relative positions -->
        <ul class="relative" style="transform: translate(-50%, -50%); position: absolute; top: 50%; left: 50%;">
            <li v-for="(uniqueSmiles, index) in uniqueSmilesList" :key="index" :style="{ transform: 'translate(' + scale(uniqueSmiles.structure_x, 'x') + 'px, ' + scale(uniqueSmiles.structure_y, 'y') + 'px)' }" class="absolute">
                {{ uniqueSmiles.smiles }}
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { processCsvData } from '../store/data'; // Import CSV processing function
    import { ref, onMounted } from 'vue';

    const csvData = ref(null); // Define reactive variable to hold CSV data
    const uniqueSmilesList = ref([]); // Define reactive variable to hold unique smiles

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
    const scale = (value, dimension) => {
        // Define min and max values for each dimension
        const minValues = { x: -6.5, y: -6 }; // Example minimum values
        const maxValues = { x: 14, y: 14.9 }; // Example maximum values
        
        const halfViewportWidth = window.innerWidth / 2;
        const halfViewportHeight = window.innerHeight / 2;

        const minPageX = -halfViewportWidth;
        const maxPageX = halfViewportWidth;
        const minPageY = -halfViewportHeight;
        const maxPageY = halfViewportHeight;


        // Determine the appropriate min and max values based on the dimension
        const minValue = minValues[dimension];
        const maxValue = maxValues[dimension];
        const minPage = dimension === 'x' ? minPageX : minPageY;
        const maxPage = dimension === 'x' ? maxPageX : maxPageY;

        // Scale the value to fit within the page dimensions
        return (value - minValue) * (maxPage - minPage) / (maxValue - minValue) + minPage;
    };
</script>

<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        background-color: #ffffff; /* Set background color */
        padding: 0.5rem;
        border-radius: 0.25rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add shadow */
    }
</style>
