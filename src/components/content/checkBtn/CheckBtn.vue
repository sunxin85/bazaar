<template>
  <div class="check-btn" :class="{check: isChecked}">
    <img src="~assets/img/common/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckBtn",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-btn img {
    width: 24px;
    height: 24px;
  }
  .check-btn {
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check {
    border-color: #ff8198;
    background: #ff8198;
  }
</style>