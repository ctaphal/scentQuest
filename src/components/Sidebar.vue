<template>
    <div class="sidebar">
      <div class="sidebar-content">
        <h3>{{ item.smiles }}</h3>
        <p>--------------------------------</p>
        <p>NAME: {{ item.principal_name }}</p>
        <p>--------------------------------</p>
        <p>SCENT COMPOSITION: </p>
        <p>Primary: {{ item.primary_descriptor }}</p>
        <p>Second: {{ item.second_descriptor }}</p>
        <p>Third: {{ item.third_descriptor }}</p>
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
  