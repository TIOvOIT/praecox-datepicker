<script>
import {setContext,getContext} from 'svelte';
import { writable } from 'svelte/store'; 

import MonthView from "./View/MonthView.svelte";
import YearView from './View/YearView.svelte';
import DecadeYearView from'./View/DecadeYearView.svelte';
import Selector from "./Selector/Selector.svelte";

import {obtainWeeks} from './main.js'

export let nowDate = new Date();
export let i18n = 'EN';

export let markDate = [];

export let disableDate = [];

export let disableDateRule = 'piecemeal'

export let pickerResult = [];
export let pickerRule = 'singleChoice';

//主题
export let theme = 'light';

if(theme!=='light'&&theme!=='dark'){
 throw new RangeError(`Unexpected value.[ErrorPlace]:Datepicker.porps.theme.`);
}
if(i18n!=='EN'&&i18n!=='ZH'){
 throw new RangeError(`Unexpected value.[ErrorPlace]:Datepicker.porps.i18n.`);
}
if(disableDateRule!=='piecemeal'&&disableDateRule!=='range'){
 throw new RangeError(`Unexpected value.[ErrorPlace]:Datepicker.porps.disableDateRule.`);
}
if(pickerRule!=='singleChoice'&&pickerRule!=='freeChoice'&&pickerRule!=='rangeChoice'){
 throw new RangeError(`Unexpected value.[ErrorPlace]:Datepicker.porps.pickerRule.`);
}
//Initialize to the store
const viewDate = writable(1);
const viewMonth = writable(1);
const viewYear = writable(1920);
const  thisView=  writable('m');//This month:'m' ，this year:'y',ten years:'d'

//Bind to context
setContext('theme',theme)
setContext('nowDate',nowDate)
setContext('i18n',i18n)
setContext('viewMonth',nowDate.getMonth()+1)
setContext('thisView',thisView)
setContext('viewYear',viewYear)
setContext('viewMonth',viewMonth)
setContext('viewDate',viewDate)
setContext('markDate',markDate)
setContext('disableDate',disableDate)
setContext('disableDateRule',disableDateRule)
setContext('pickerRule',pickerRule)

//Reacquire
let view = getContext('thisView')
let _year = getContext('viewYear')
let _month = getContext('viewMonth')
let _date = getContext('viewDate')

//Reassign
$_year = nowDate.getFullYear();
$_month = nowDate.getMonth()+1;
$_date = nowDate.getDate();

//Obtain weeks
 $:theFirstWeek= obtainWeeks($_year, $_month,$_date).theFirstWeek;
 $:theSecondWeek = obtainWeeks($_year, $_month,$_date).theSecondWeek;
 $:theThirdWeek = obtainWeeks($_year, $_month,$_date).theThirdWeek;
 $:theFourthWeek = obtainWeeks($_year, $_month,$_date).theFourthWeek;
 $:fifthWeek = obtainWeeks($_year, $_month,$_date).fifthWeek;
 $:sixthWeek = obtainWeeks($_year, $_month,$_date).sixthWeek;
 
</script>

<div class="{'calendar_'+theme}">
    <Selector />
    {#if $view==='y'}
    <YearView />
    {:else if $view==='m'}
    <MonthView
        {theFirstWeek}
        {theSecondWeek}
        {theThirdWeek}
        {theFourthWeek}
        {fifthWeek}
        {sixthWeek}
        bind:result={pickerResult}
    />
    {:else if $view==='d'}
    <DecadeYearView />
    {/if}
</div>
<style>
 .calendar_light, .calendar_dark {
  background-color: #ffffff;
  width: 301px;
  height: 256px;
  padding: 8px 6px 8px 6px;
  border: 1px solid #ededf0;
  border-radius: 2px;
  box-shadow: 0px 1px #ededf0;
  position: relative;
}

.calendar_dark {
  background-color: #141416;
  border: 1px solid #0f1126;
  box-shadow: 0px 1px #0f1126;
}
</style>