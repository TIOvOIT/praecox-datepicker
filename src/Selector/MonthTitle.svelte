<script> 
import {getContext} from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

const MONTH_NAME = {
    EN:[{id:1,name:"January"},{id:2,name:"February"},{id:3,name:"March"},
        {id:4,name:"April"},{id:5,name:"May"},{id:6,name:"June"},
        {id:7,name:"July"},{id:8,name:"August"},{id:9,name:"September"},
        {id:10,name:"October"},{id:11,name:"November"},{id:12,name:"December"}],
    ZH:[{id:1,name:"一月"},{id:2,name:"二月"},{id:3,name:"三月"},
        {id:4,name:"四月"},{id:5,name:"五月"},{id:6,name:"六月"},
        {id:7,name:"七月"},{id:8,name:"八月"},{id:9,name:"九月"},
        {id:10,name:"十月"},{id:11,name:"十一月"},{id:12,name:"十二月"}]
}

let i18n = getContext('i18n');

let viewMonth = getContext('viewMonth')
let viewYear = getContext('viewYear')
let thisView = getContext('thisView')
let theme = getContext('theme')

$:monthName=i18n==='ZH'? $viewYear+"年 "+MONTH_NAME[i18n][$viewMonth-1].name: MONTH_NAME[i18n][$viewMonth-1].name+"  "+$viewYear;

//切换视图
function switchView (){
  if($thisView==='m'){
    $thisView='y'
  }else if($thisView==='y'){
    $thisView='d'
  }else if($thisView==='d'){
     $thisView='m'
  }
}

</script>
<div class="{'monthTitle_'+theme}" on:click={switchView} >
<div class="titleBox">
{#if $thisView==='m'}
<div class="monthTitle" transition:fly="{{ y: -20, opacity: 0.2,duration: 200 ,easing: quintOut }}">
      {monthName}
</div>
{:else if $thisView==='y'}
<div class="monthTitle" transition:fly="{{ y: 20, opacity: 0.2,duration: 200 ,easing: quintOut}}">
      {$viewYear}
</div>
{:else if $thisView==='d'}
<div class="monthTitle" transition:fly="{{ y: -20, opacity: 0.2,duration: 200 ,easing: quintOut}}">
      {$viewYear}-{$viewYear+11}
</div>
{/if}
</div>
</div>
<style>

.monthTitle_light, .monthTitle_dark {
  width: 60%;
  line-height: 30px;
  text-align: center;
  color: #0c0c0d;
  user-select: none;
  cursor: pointer;
  font-weight: 600;
}
.monthTitle_light:hover, .monthTitle_dark:hover {
  background-color: rgba(10, 132, 255, 0.1);
  color: #0c0c0d;
  border-radius: 3px;
}

.monthTitle_dark {
  color: #d7d7db;
}
.monthTitle_dark:hover {
  background-color: #003eaa;
  color: #f9f9fa;
  border-radius: 3px;
}

.titleBox {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
}

.monthTitle {
  width: 100%;
  position: absolute;
}
</style>

