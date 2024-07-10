<script setup>
import {useGlobalSettings} from "../stores/globalSettings.js";
import {computed, onMounted, reactive} from "vue";
const global=useGlobalSettings()
const timerGrouppedByDate=computed(()=>{
  let map = global.timerList.reduce((r, i) => {
    r[i.datestart] = r[i.datestart] || [];
    r[i.datestart].push(i);
    return r;
  }, {});
  let arr=[]
  for (var key in map) {
    for (var elem in map[key]) {
      arr.push(map[key][elem]);
    }
  }
  console.log(arr)
  return arr
})
function startTimer(){}
function stopTimer(){}
function pauseTimer(){}

onMounted(()=>{
  global.timeout=import.meta.env.VITE_BASE_TIME_OUT
})
</script>
<template>
  <div class="timer-wrapper">
    <div class="timer-list">
      <div class="timer-head">
        <div class="id-timer">
          №
        </div>
        <div class="timer-date-start">
          Дата начало
        </div>
        <div class="timer-date-end">
          Дата окончания
        </div>
        <div class="timer-duration">
          Длительность
        </div>
        <div class="custom-buttons">

        </div>
      </div>
      <div class="timer-body">
        <div class="timer-item" v-for="timer in timerGrouppedByDate" :key="timer.id">
          <div class="id-timer">
            {{timer.id + 1}}
          </div>
          <div class="timer-date-start">
            {{timer.datestart}}
          </div>
          <div class="timer-date-end">
            {{timer.dateend}}
          </div>
          <div class="timer-duration">
            {{timer.duration}}
          </div>
          <div class="custom-buttons">
            <el-button
                @click="startTimer"
                class="start"
                type="primary"
                plain
            >
              Старт
            </el-button>
            <el-button
                @click="stopTimer"
                class="start"
                type="danger"
                plain
            >
              Стоп
            </el-button>
            <el-button
                @click="pauseTimer"
                class="start"
                type="warning"
                plain
            >
              Пауза
            </el-button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.timer-list{
  max-width: 1200px;
  margin: auto;
  .timer-head{
    display: flex;
    align-items: center;
    &>div{
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      padding: 3px 8px;
    }
  }
  .timer-body{
   .timer-item{
     display: flex;
     align-items: center;
     &>div{
       height: 40px;
       display: flex;
       align-items: center;
       justify-content: center;
       border: 1px solid #dcdfe6;
       box-sizing: border-box;
       padding: 3px 8px;
     }
   }
  }
  .id-timer{
    width: 50px;
  }
  .timer-date-start{
    width: 200px;
  }
  .timer-date-end{
    width: 200px;
  }
  .timer-duration{
    width: 200px;
  }
  .custom-buttons{
    width: 250px;
  }
}
</style>