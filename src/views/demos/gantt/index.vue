<template>
  <box-content>
    <div class="search">
      Gantt
    </div>
    <gantt-elastic :tasks="tasks" :options="options"></gantt-elastic>    
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
// import Header from "gantt-elastic-header"

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
    type: 'task'
  },
  {
    id: 2,
    label: 'Task Name',
    start: getDate(-24 * 4),
    duration: 4 * 24 * 60 * 60 * 1000,
    progress: 50,
    type: 'task'
    /* style: {
      base: {
        fill: '#1EBC61',
        stroke: '#0EAC51'
      },
      'tree-row-bar': {
        fill: '#1EBC61',
        stroke: '#0EAC51'
      },
      'tree-row-bar-polygon': {
        stroke: '#0EAC51'
      }
    } */
  },
  {
    id: 3,
    label: 'Courage',
    start: getDate(-24 * 3),
    duration: 2 * 24 * 60 * 60 * 1000,
    progress: 100,
    type: 'task'
  },
  {
    id: 4,
    label: 'Put that toy AWAY!',
    start: getDate(-24 * 2),
    duration: 2 * 24 * 60 * 60 * 1000,
    progress: 50,
    type: 'task'
  },
  {
    id: 5,
    label: 'One billion',
    start: getDate(0),
    duration: 2 * 24 * 60 * 60 * 1000,
    progress: 10,
    type: 'task'
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
console.log(tasks)
const options = {
  title: {
    label: 'Your project title as html (link or whatever...)',
    html: false
  },
  taskList: {
    columns: [
      {
        id: 1,
        label: 'ID',
        value: 'id',
        width: 40
      },
      {
        id: 2,
        label: 'Description',
        value: 'label',
        width: 200,
        expander: true
      },
      // {
      //   id: 3,
      //   label: 'Assigned to',
      //   value: 'user',
      //   width: 130,
      //   html: true
      // },
      {
        id: 3,
        label: 'Start',
        value: task => task.start,
        width: 78
      },
      {
        id: 4,
        label: 'Type',
        value: 'type',
        width: 68
      },
      {
        id: 5,
        label: '%',
        value: 'progress',
        width: 35,
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
      dynamicStyle: {},
      loading: false,
      type: ''
    }
  },
  methods: {
    load () {

    }
  },
  created() {
    this.load()
  }
}
</script>

