<template>
    <div class="flex flex-col p-8">
      <h2 class="text-6xl font-semibold text-center mb-4">ScentQUEST</h2>
  
      <!-- route the map option buttons on the home page to the appropriate .vue files -->
      <div class="flex justify-center gap-1">
        <template v-for="(page, index) in pages">
          <router-link
            v-if="index === 0"
            :key="page"
            :to="{ name: 'POMap', params: { page: page }}"
            class="rounded p-2 bg-blue-300 hover:bg-blue-400 hover:shadow-md transition duration-100"
          >
            {{ page }}
          </router-link>
          <router-link
            v-else
            :key="StructMap"
            :to="{ name: 'StructMap', params: { page: page }}"
            class="rounded p-2 bg-blue-300 hover:bg-blue-400 hover:shadow-md transition duration-100"
          >
            {{ page }}
          </router-link>
        </template>
      </div>
  
      <!-- Adding the image -->
      <div class="mt-8 flex justify-center">
        <img src="./demo.png" alt="Demo Image" style="width: 1200px; height: auto;"/>
      </div>
    </div>
  </template>


<script setup>

//define the 2 pages of the site:
const pages = ['Explore the Principal Odor Map', 'Explore the Structural Map'];

</script>