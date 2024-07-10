<script setup>
import {useGlobalSettings} from "../stores/globalSettings.js";
import {reactive} from "vue";
const global=useGlobalSettings()
const timerGrouppedByDate=reactive([])
</script>
<template>
  <div>

    <div class="timer-list">
      <div class="timer-head">

      </div>
      <div class="timer-item" v-for="timer in timerGrouppedByDate" :key="timer.id">

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>