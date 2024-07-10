import {defineStore} from "pinia";

export const useGlobalSettings = defineStore('', {
    state:()=>({
        timeout:0,
        timerList:[
            {timerid:1, datestart:"30-06-2024", dateend:"31-08-2024", duration:"12:29:59"},
            {timerid:2, datestart:"30-06-2024", dateend:"22-08-2024", duration:"01:29:59"},
            {timerid:3, datestart:"30-06-2024", dateend:"15-08-2024", duration:"05:59:59"},
            {timerid:4, datestart:"25-06-2024", dateend:"31-08-2024", duration:"12:30:59"},
            {timerid:5, datestart:"30-06-2024", dateend:"22-08-2024", duration:"01:29:59"},
            {timerid:6, datestart:"20-06-2024", dateend:"31-08-2024", duration:"12:30:59"},
            {timerid:7, datestart:"30-06-2024", dateend:"31-08-2024", duration:"12:29:59"},
        ]
    }),
    actions:{
    }
})