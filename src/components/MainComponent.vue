<script setup>
import {useGlobalSettings} from "../stores/globalSettings.js";
import {ref, onMounted, reactive, onUnmounted} from "vue";
const global=useGlobalSettings()
const startedindex = ref(0)
const timerGrouppedByDate=reactive([])
const timerListing=reactive([])
const thissetin=ref(null)
const isStarted=ref(false)
const currentTimer=ref(null)
function startTimer(timer){
  isStarted.value=true
  startedindex.value=timer.timerid
  let duration = timer.duration.split(":")
  let hour=Number(duration[0])
  let minutes=Number(duration[1])
  let seconds=Number(duration[2])
  thissetin.value = setInterval(()=>{
    const currenttimeout = hour*60*60 + minutes*60 + seconds
    console.log(currenttimeout, Number(global.timeout)*60)
    if(currenttimeout === global.timeout*60){
      stopTimer(timer)
    }else{
      if(seconds===0){
        if(minutes===0){
          if(hour===0){
            stopTimer(timer)
          }else {
            hour--
            minutes=59
          }
        }else{
          minutes--
          seconds=59
        }
      }else {
        seconds --
      }
    }
    timer.duration = `${hour}:${minutes.toString().length===1? '0'+minutes : minutes}:${seconds.toString().length===1? '0'+seconds : seconds}`
    localStorage.setItem('currentTimer', JSON.stringify(timer));
  }, 1000)
}
function stopTimer(timer){
  isStarted.value=false
  const index=timerGrouppedByDate.indexOf(timer)
  timerGrouppedByDate.splice(index, 1)
  timerListing.push(timer)
  startedindex.value=0
  clearInterval(thissetin.value)
  localStorage.clear();
}
function pauseTimer(timer){
  clearInterval(thissetin.value)
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
function getFromStorage(){
  currentTimer.value=JSON.parse(localStorage.getItem('currentTimer'));
  if(currentTimer.value){
    startedindex.value=currentTimer.value.timerid
    isStarted.value=true
    timerGrouppedByDate.forEach(elem=>{
      if(elem.timerid===currentTimer.value.timerid){
        elem.duration=currentTimer.value.duration
        startTimer(elem)
      }
    })
  }
}
onMounted(async ()=>{
  global.timeout=import.meta.env.VITE_BASE_TIME_OUT
  await grouppedTimer()
  await getFromStorage()
})
</script>
<template>
  <div class="timer-wrapper">
    <div class="title-timeout">
      Установленный таймаут {{global.timeout}} мин.
    </div>
    <div class="timer-closed">
      <div class="timer-list" v-if="!!timerListing.length">
        <div class="title">
          Завершенные таймеры
        </div>
        <div class="timer-head">
          <div class="id-timer">
            №
          </div>
          <div class="id-timer">
            ID
          </div>
          <div class="timer-duration">
            Время заверщения
          </div>
        </div>
        <div class="timer-body">
          <div class="timer-item" v-for="(timer, index) in timerListing" :key="timer.id">
            <div class="id-timer">
              {{ index + 1 }}
            </div>
            <div class="id-timer">
              {{timer.timerid}}
            </div>
            <div class="timer-duration">
              {{timer.duration}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="timer-actually">
      <div class="timer-list">
        <div class="title">
          Таймеры
        </div>
        <div class="timer-head">
          <div class="id-timer">
            №
          </div>
          <div class="id-timer">
            ID
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
          <div class="timer-item" v-for="(timer, index) in timerGrouppedByDate" :key="timer.id">
            <div class="id-timer">
              {{ index + 1 }}
            </div>
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
                  :disabled="!!startedindex && timer.timerid!==startedindex"
              >
                Старт
              </el-button>
              <el-button
                  @click="stopTimer(timer)"
                  class="start"
                  type="danger"
                  plain
                  :disabled="!!startedindex && timer.timerid!==startedindex || !isStarted"
              >
                Стоп
              </el-button>
              <el-button
                  @click="pauseTimer(timer)"
                  class="start"
                  type="warning"
                  plain
                  :disabled="!!startedindex && timer.timerid!==startedindex || !isStarted"
              >
                Пауза
              </el-button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.title-timeout{
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  width: 100%;
  text-align: center;
}
.timer-actually{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.timer-closed{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.timer-wrapper{
  padding: 50px 0;
}
.timer-list{
  margin-bottom: 20px;
  .title{
    font-size: 14px;
    text-align: center;
    margin-bottom: 5px;
  }
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
    width: 80px;
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