<template>
  <div>
    <tr v-for="(item, index) in items" :key="index">
      <td>
        
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  name: 'tree-item',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>
