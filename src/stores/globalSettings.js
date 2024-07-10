import {defineStore} from "pinia";

export const useGlobalSettings = defineStore('', {
    state:()=>({
        timeout:0,
        timerList:[
            {timerid:112, datestart:"30-06-2024", dateend:"31-08-2024", duration:"12:29:59"},
            {timerid:2215, datestart:"30-06-2024", dateend:"22-08-2024", duration:"01:29:59"},
            {timerid:333, datestart:"30-06-2024", dateend:"15-08-2024", duration:"05:59:59"},
            {timerid:4545, datestart:"25-06-2024", dateend:"31-08-2024", duration:"12:30:59"},
            {timerid:588, datestart:"30-06-2024", dateend:"22-08-2024", duration:"01:29:59"},
            {timerid:966, datestart:"20-06-2024", dateend:"31-08-2024", duration:"12:30:59"},
            {timerid:313, datestart:"20-06-2024", dateend:"31-08-2024", duration:"01:01:03"},
            {timerid:314, datestart:"20-06-2024", dateend:"31-08-2024", duration:"02:00:03"},
            {timerid:215, datestart:"20-06-2024", dateend:"31-08-2024", duration:"01:00:05"},
            {timerid:889, datestart:"30-06-2024", dateend:"31-08-2024", duration:"12:29:59"},
        ]
    }),
    actions:{
    }
})