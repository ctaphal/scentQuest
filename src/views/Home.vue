<template>
    <pre>{{ meals }}</pre>
</template>


<script setup>
import {computed} from 'vue';
import store from '../store';

const meals = computed(() => store.state.meals)

</script>