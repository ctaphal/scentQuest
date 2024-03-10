\<template>
    <div class="flex flex-col p-8">
        <div class="flex justify-center gap-1">
            <router-link :to="{name: 'selectPage', params: {page}}" v-for="page of pages" :key="page"> 
                {{ page }}
            </router-link>
        </div>
        <ul>
            <li v-for="(item, index) in csvData" :key="index">
                {{ item.smiles }} - {{ item.principal_name }}
            </li>
        </ul>
    </div>
</template>


<script setup>

//define the 2 pages of the site:
const pages = ['Principle Odor Map', 'Structural Map'];

import { processCsvData } from '../store/data'; // Import CSV processing function
import { ref, onMounted } from 'vue';

const csvData = ref(null); // Define reactive variable to hold CSV data

// Fetch and process CSV data when component is mounted
onMounted(async () => {
  csvData.value = await processCsvData();
});

</script>