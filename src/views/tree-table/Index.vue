<template>
  <tree-table :headers="headers" :list="list" @edit="edit"></tree-table>
</template>

<script>
import list from './data'
import TreeTable from '@/components/tree-table'
console.log(list)
export default {
  name: 'tree-demo',
  components: {
    'tree-table': TreeTable
  },
  data () {
    return {
      list: list,
      headers: [
        { type: 'checkbox', title: '' },
        { key: 'ObjectName', title: '职位' },
        { key: 'CreateTime', title: '时间' },
        { key: 'ResponsibleName', title: '名称' },
        { type: 'operate',
          operates: [
            { name: '编辑', emitKey: 'edit' },
            { name: '删除', emitKey: 'delete' }
          ] }
      ]
    }
  },
  methods: {
    edit (data) {
      console.log(data)
    }
  }
}
</script>

<style>

</style>
