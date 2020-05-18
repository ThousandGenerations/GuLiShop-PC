<template>
  <div>
    <button>测试</button>
  </div>
</template>

<script>
export default {
  props: ['xxx'],

  beforeCreate() {
    console.log('---', this.$attrs, this.$listeners)
  }
}
</script>

<style>

</style>