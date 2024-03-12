<template>
    <div class="sidebar" v-if="imagePath">
      <div class="sidebar-content">
        <!-- Display the image -->
        <img :src="imagePath" alt="Molecular">
      </div>
      <button @click="closeSidebar" class="close-button">Close</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      imagePath: {
        type: String,
        required: true
      }
    },
    methods: {
      closeSidebar() {
        this.$emit('closeSidebar');
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    background-color: #72b7e9;
    box-shadow: -2px 0 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .sidebar-content {
    margin-bottom: 20px;
  }
  
  .close-button {
    position: absolute;
    bottom: 20px;
    left: 20px;
    background-color: #ffffff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  