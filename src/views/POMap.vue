<template>
    <div class="flex flex-col p-8">
        <h2 class="text-lg font-semibold mb-4">PRINCIPLE ODOR MAP</h2>
        <ul class="relative" style="transform: translate(-50%, -50%); position: absolute; top: 50%; left: 50%;">
            <li v-for="(item, index) in csvData" :key="index" :style="{ transform: 'translate(' + scale(item.odor_x, 'x') + 'px, ' + scale(item.odor_y, 'y') + 'px)' }" class="absolute">
                {{ item.smiles }}
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { processCsvData } from '../store/data'; // Import CSV processing function
    import { ref, onMounted } from 'vue';

    const csvData = ref(null); // Define reactive variable to hold CSV data

    // Fetch and process CSV data when component is mounted
    onMounted(async () => {
        csvData.value = await processCsvData();
    });

    // Function to scale the coordinates
    const scale = (value, dimension) => {
        // Define min and max values for each dimension
        const minValues = { x: -3.6, y: -4.4 }; // Example minimum values
        const maxValues = { x: 14, y: 10.3 }; // Example maximum values
        
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
