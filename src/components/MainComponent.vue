<script setup>
import {useGlobalSettings} from "../stores/globalSettings.js";
import {ref, onMounted, reactive} from "vue";
const global=useGlobalSettings()
const startedindex = ref(0)
const timerGrouppedByDate=reactive([])
const timerListing=reactive([])
function startTimer(timer){
  startedindex.value=timer.timerid

}
function stopTimer(timer){
  const index=timerGrouppedByDate.indexOf(timer)
  console.log(timerGrouppedByDate.indexOf(timer), timer)
  timerGrouppedByDate.splice(index, 1)
  timerListing.push(timer)
  startedindex.value=0
}
function pauseTimer(timer){
  console.log(timer, this)
}
function grouppedTimer(){
  let map = global.timerList.reduce((r, i) => {
    r[i.datestart] = r[i.datestart] || [];
    r[i.datestart].push(i);
    return r;
  }, {});
  timerGrouppedByDate.splice(0)
  for (var key in map) {
    for (var elem in map[key]) {
      timerGrouppedByDate.push(map[key][elem]);
    }
  }
}
onMounted(async ()=>{
  global.timeout=import.meta.env.VITE_BASE_TIME_OUT
  await grouppedTimer()
})
</script>
<template>
  <div class="timer-wrapper">
    <div class="timer-listing" v-if="!!timerListing.length">
      <div class="title">
        Завершенные таймеры
      </div>
    </div>
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
            {{timer.timerid}}
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
                @click="startTimer(timer)"
                class="start"
                type="primary"
                plain
                :disabled="startedindex && timer.timerid!==startedindex"
            >
              Старт
            </el-button>
            <el-button
                @click="stopTimer(timer)"
                class="start"
                type="danger"
                plain
                :disabled="startedindex && timer.timerid!==startedindex"
            >
              Стоп
            </el-button>
            <el-button
                @click="pauseTimer(timer)"
                class="start"
                type="warning"
                plain
                :disabled="startedindex && timer.timerid!==startedindex"
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
.timer-wrapper{
  padding: 50px 0;
}
.timer-list{
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