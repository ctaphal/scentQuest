<template>
    <div class="flex flex-col p-8">
        <div class="flex justify-center gap-1">
            <router-link :to="{name: 'selectPage', params: {page}}" v-for="page of pages" :key="page"> 
                {{ page }}
            </router-link>
        </div>
    </div>
</template>


<script setup>

//next 2 lines can be removed?
import {computed} from 'vue';
import store from '../store';

const pages = ['Principle Odor Map', 'Structural Map'];

</script>