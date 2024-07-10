import {defineStore} from "pinia";

export const useGlobalSettings = defineStore('', {
    state:()=>({
        timerList:[
            {id:0, datestart:"30-06-2024", dateend:"31-08-2024", duration:"12:29:59"},
            {id:1, datestart:"30-06-2024", dateend:"22-08-2024", duration:"01:29:59"},
            {id:1, datestart:"30-06-2024", dateend:"15-08-2024", duration:"05:59:59"},
            {id:2, datestart:"25-06-2024", dateend:"31-08-2024", duration:"12:30:59"},
            {id:3, datestart:"20-06-2024", dateend:"31-08-2024", duration:"12:30:59"},
        ]
    }),
    actions:{
    }
})