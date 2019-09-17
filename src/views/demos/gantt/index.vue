<template>
  <box-content>
    <div class="search">
      Gantt
      <el-button @click="toNow">Now</el-button>
    </div>
    <gantt-elastic ref="gantt" :tasks="tasks" :options="options"></gantt-elastic>    
  </box-content>
</template>

<script>
/*
 * @Author: etongfu
 * @Email: 13583254085
 * @Date: 2019-09-15 11:09:00
 * @Description: demos/甘特图
 */
import GanttElastic from "gantt-elastic"

function getDate(hours) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const timeStamp = new Date(`${currentYear}-${currentMonth}-${currentDay} 00:00:00`).getTime();
  return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
}
const tasks = [
  {
    id: 1,
    label: 'Make some noise',
    start: getDate(-24 * 5),
    duration: 5 * 24 * 60 * 60 * 1000,
    progress: 85,
    type: 'task', // project/task/milestone
    // processbar 颜色修改
    style: {
      base: {
        fill: '#1EBC61',
        stroke: '#0EAC51'
      }
    }
  },
  {
    id: 2,
    label: 'Task Name',
    start: getDate(-24 * 4),
    duration: 4 * 24 * 60 * 60 * 1000,
    progress: 50,
    type: 'task'
  },
  {
    id: 3,
    label: 'Courage',
    start: getDate(-24 * 3),
    duration: 2 * 24 * 60 * 60 * 1000,
    parentId: 2,
    progress: 100,
    type: 'task'
  },
  {
    id: 4,
    label: 'Put that toy AWAY!',
    start: getDate(-24 * 2),
    duration: 2 * 24 * 60 * 60 * 1000,
    progress: 50,
    parentId: 2,
    type: 'task'
  },
  {
    id: 5,
    label: 'One billion',
    start: getDate(0),
    duration: 2 * 24 * 60 * 60 * 1000,
    progress: 10,
    parentId: 1,
    type: 'task',
    dependentOn: [3]
  },
  {
    id: 6,
    label: 'Butch',
    start: getDate(24),
    duration: 1 * 24 * 60 * 60 * 1000,
    progress: 50,
    type: 'task'
  },
  {
    id: 7,
    label: 'Devon',
    start: getDate(24 * 2),
    duration: 4 * 60 * 60 * 1000,
    progress: 20,
    type: 'task'
  },
  {
    id: 8,
    label: 'Hey',
    // dependentOn: [7],
    start: getDate(24 * 3),
    duration: 1 * 24 * 60 * 60 * 1000,
    progress: 0,
    type: 'task'
  },
  {
    id: 9,
    label: 'This',
    start: getDate(24 * 4),
    duration: 4 * 60 * 60 * 1000,
    progress: 90,
    type: 'task',
    // style: {
    //   base: {
    //     fill: '#8E44AD',
    //     stroke: '#7E349D'
    //   }
    // }
  },
  {
    id: 10,
    label: 'current task',
    start: getDate(24 * 5),
    duration: 24 * 60 * 60 * 1000,
    progress: 0,
    type: 'task'
  }
];
const options = {
  // 日期不显示小时
  calendar: {
    hour: {
      display: false
    },
    day: {
      height: 35,
      format: {
        long(date) {
          return date.format('DD MMM');
        },
        medium(date) {
          return date.format('DD MM');
        },
        short(date) {
          return date.format('DD');
        }
      }
    },
    month: {
      display: false
    }
  },
  chart: {
    progress: {
      bar: false
    },
    expander: {
      display: true
    }
  },
  taskList: {
    expander: {
      straight: false
    },
    columns: [
      {
        id: 1,
        label: 'Task',
        value: 'id',
        width: 80,
        html: true,
        expander: true, // 是否作为展开项\
        style: {
          // 内容style
          'task-list-item-value-container': {
            'cursor': 'pointer'
          }
        },
        events: {
          click({ data, column }) {
            console.log(data)
            console.log(column)
          }
        }
      },
      {
        id: 2,
        label: 'Work Flow Template',
        value: 'label',
        width: 150
        // expander: true
      },
      // {
      //   id: 3,
      //   label: 'Assigned to',
      //   value: 'user',
      //   width: 130,
      //   html: true
      // },
      // {
      //   id: 3,
      //   label: 'Start',
      //   value: task => task.start,
      //   width: 78
      // },
      {
        id: 4,
        label: 'Status',
        value: 'type',
        width: 60
      },
      {
        id: 5,
        label: 'Step Progress',
        value: 'progress',
        width: 105,
        style: {
          'task-list-header-label': {
            'text-align': 'center',
            width: '100%'
          },
          'task-list-item-value-container': {
            'text-align': 'center'
          }
        }
      }
    ]
  },
  locale: {
    code: 'en',
    Now: 'Now',
    'X-Scale': 'Zoom-X',
    'Y-Scale': 'Zoom-Y',
    'Task list width': 'Task list',
    'Before/After': 'Expand',
    'Display task list': 'Task list'
  }
}
export default {
  name: 'gantt',
  components: {
    'gantt-elastic': GanttElastic
  },
  data() {
    return {
      tasks,
      options,
      dynamicStyle: {
        'task-list-header-label': {
          'font-weight': 'bold'
        }
      },
      loading: false,
      type: ''
    }
  },
  methods: {
    toNow () {
      // back to current position
      this.$refs.gantt.$emit("recenterPosition")
    },
    load () {

    }
  },
  created() {
    this.load()
  }
}
</script>
<style lang="less">
.gantt-elastic__calendar-row-rect-child--day{
  line-height: 35px;
}
.gantt-elastic__chart-calendar-container, .gantt-elastic__task-list-header{
  margin-bottom: 0 !important;
}
</style>