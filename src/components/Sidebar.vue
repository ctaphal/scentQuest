<template>
    <div class="sidebar">
      <div class="sidebar-content">
        <h3>{{ item.smiles }}</h3>
        <p>{{ item.primary_description }}</p>
      </div>
      <button @click="closeSidebar" class="close-button">Close</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
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
    background-color: #fff;
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
    background-color: #ddd;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  