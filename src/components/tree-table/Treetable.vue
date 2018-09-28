<template>
  <div class="tree-table">
    <table class="table">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            <label v-if="column.type === 'selection'">
                <input type="checkbox" v-model="checks" @click="handleCheckAll">
            </label>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
export default {
  name: 'tree-table',
  props: {
    // 首先生成表头
    headers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return { }
  },
  methods: {
    // 选中全部
    handleCheckAll () { }
  }
}
</script>

<style>

</style>
