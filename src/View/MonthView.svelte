<script>
  import { getContext } from "svelte";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import WeekTitle from "../Month/WeekTitle.svelte";
  import Day from "../Month/Day.svelte";

  export let theFirstWeek;
  export let theSecondWeek;
  export let theThirdWeek;
  export let theFourthWeek;
  export let fifthWeek;
  export let sixthWeek;
  export let result;

  let array = [];
  $: {
    array[0] = theFirstWeek;
    array[1] = theSecondWeek;
    array[2] = theThirdWeek;
    array[3] = theFourthWeek;
    array[4] = fifthWeek;
    array[5] = sixthWeek;
  }

  const TODAY_NAME = {
    EN: "today",
    ZH: "今天"
  };

  //判断周末
  function isSatOrSun(arr) {
    let _date = arr.year + "-" + arr.month + "-" + arr.day;
    let d = new Date(Date.parse(_date.replace(/\-/g, "/"))).getDay();
    return d === 6 || d === 0 ? true : false;
  }

  //是否被标记
  function isMark(arr) {
    let _date = arr.year + "-" + arr.month + "-" + arr.day;
    let markDate = new Set(primaevalMarkDate);
    return markDate.has(_date);
  }

  //是否被禁用
  function isDisableDate(arr) {
    if (disableDateRule === "piecemeal") {
      let _date = arr.year + "-" + arr.month + "-" + arr.day;
      let _disableDate = new Set(disableDate);
      return _disableDate.has(_date);
    } else if (disableDateRule === "range") {
      let _date = arr.year + "-" + arr.month + "-" + arr.day;
      let dateNum = datediff(
        parseDate(disableDate[0].start),
        parseDate(disableDate[1].end)
      );
      let startDateNum = datediff(
        parseDate(_date),
        parseDate(disableDate[0].start)
      );
      let endDateNum = datediff(
        parseDate(_date),
        parseDate(disableDate[1].end)
      );
      if (startDateNum > 0 || endDateNum < 0) {
        return false;
      } else {
        return true;
      }
    }
  }

  function parseDate(str) {
    var mdy = str.split("-");
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
  }

  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  let i18n = getContext("i18n");
  let theme = getContext("theme");
  let pickerRule = getContext("pickerRule");

  
  let viewMonth = getContext("viewMonth");
  let primaevalMarkDate = getContext("markDate");
  let disableDate = getContext("disableDate");
  let disableDateRule = getContext("disableDateRule");
  let getDate = getContext("nowDate");
  let thisView = getContext('thisView')
  
  $: nowMonth = getDate.getMonth() + 1;
  $: nowYear = getDate.getFullYear();
  $: nowDay = getDate.getDate();


  function handleClick(date) {
    let _date = date.year + "-" + date.month + "-" + date.day;
    switch(pickerRule){
      case 'freeChoice':
        let r = new Set(result);
        if(r.has( _date)){
          r.delete(_date)
          result = [...new Set(r)];
        }else{
        result = [...result, _date];
        }
        break;
      case 'rangeChoice':
        if(result.length === 0){
          result = [{start:0},{end:0}]
          result[0].start = +parseDate(_date)
          result[1].end = +parseDate(_date)
        }else if( +parseDate(_date) > result[1].end ){
           result[1].end = +parseDate(_date)
        }else if(+parseDate(_date) === result[0].start){
           result[1].end = +parseDate(_date)
        }else if(+parseDate(_date) < result[1].end){
           result[0].start = +parseDate(_date)
        }
        break;
      default:
        if ( result !== _date ) {
              result = _date;
        } else if ( result === _date) {
              result = [];
        }
    }
    array = array
  }

  function isChosen(arr){
    let _date = arr.year + "-" + arr.month + "-" + arr.day;
    if(pickerRule === 'rangeChoice'){
       if(result.length === 0){
      return
      }
      let dateNum = datediff(new Date(result[0].start),new Date(result[1].end));
      let startDateNum = datediff(parseDate(_date),new Date(result[0].start));
      let endDateNum = datediff(parseDate(_date),new Date(result[1].end));
      
      if (startDateNum > 0 || endDateNum < 0 ||result[0].start===0) {
        return false
      } else {
        return true
      }
    }
}

</script>



<table
  transition:scale={{ duration: 100, delay: 100, opacity: 0.1, start: 0.5, easing: quintOut }}>
  <WeekTitle />
  <tbody>
    {#each array as Weeks}
      <tr>
        {#each Weeks as item, i}
          <td
            title={(item.day == nowDay && item.month == nowMonth && item.year == nowYear) ? TODAY_NAME[i18n] : ''}
            class="{theme}
            {(item.month === $viewMonth ? 'thisMonth_' : '') + theme}
            {(isSatOrSun(item) ? 'isSatOrSun_' : '') + theme}
            {(isMark(item) ? 'markDate_' : '') + theme}
            {(isDisableDate(item) ? 'disableDate_' : '') + theme}
            {isChosen(item) ? 'selected_'+theme : ''}
            "
            on:click={handleClick(item)}>
              <Day date={item} {result} isChosen={isChosen(item) ? 'selected_'+theme : ''}/>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style >
table {
  padding: 0;
  border-collapse: collapse;
  position: absolute;
  width: 301px;
}
tbody {
  padding: 0;
  width: 301px;
}

tr {
  padding: 0;
}

td, .endChosen_dark, .YearView_light .endChosen_dark, .endChosen_light, .YearView_light .endChosen_light, .startChosen_dark, .YearView_light .startChosen_dark, .startChosen_light, .YearView_light .startChosen_light, .selected_dark, .YearView_light .selected_dark, .selected_light, .YearView_light .selected_light, .isFreeChosen_dark, .YearView_light .isFreeChosen_dark, .isFreeChosen_light, .YearView_light .isFreeChosen_light, .isChosen_dark, .YearView_light .isChosen_dark, .isChosen_light, .YearView_light .isChosen_light, .YearView_light td, .YearView_dark td, .YearView_light .th_light, .YearView_light .th_dark, .th_dark, .th_light {
  display: inline-flex;
  padding: 0;
  height: 30px;
  width: 42.8px;
  line-height: 30px;
  justify-content: center;
  color: #b1b1b3;
  cursor: pointer;
  user-select: none;
}
td:hover, .endChosen_dark:hover, .endChosen_light:hover, .startChosen_dark:hover, .startChosen_light:hover, .selected_dark:hover, .selected_light:hover, .isFreeChosen_dark:hover, .isFreeChosen_light:hover, .isChosen_dark:hover, .isChosen_light:hover, .th_dark:hover, .th_light:hover {
  background-color: rgba(10, 132, 255, 0.1);
  color: #0c0c0d;
  border-radius: 3px;
}

.dark, .th_dark {
  color: #737373;
}
.dark:hover, .th_dark:hover {
  background-color: #003eaa;
  color: #f9f9fa;
  border-radius: 3px;
}
.isSatOrSun_light {
  background-color: #f9f9fa;
}

.isSatOrSun_dark {
  background-color: #0c0c0d;
}

.thisMonth_light {
  color: #0c0c0d;
}

.thisMonth_dark {
  color: #d7d7db;
}

.disableDate_light {
  color: #d7d7db;
  pointer-events: none;
}

.disableDate_dark {
  color: #38383d;
  pointer-events: none;
}
.markDate_light, .markDate_dark {
  position: relative;
}
.markDate_light::before, .markDate_dark::before {
  content: "";
  position: absolute;
  top: 3.2px;
  left: 47%;
  width: 3px;
  height: 3px;
  border-radius: 1.5px;
  background-color: #0060df;
}

.markDate_dark::before {
  background-color: #45a1ff;
}

.isChosen_light {
  background-color: #002275;
  color: #f9f9fa;
  border-radius: 3px;
}
.isChosen_light:hover {
  background-color: #003eaa;
  color: #f9f9fa;
}

.isChosen_dark {
  background-color: #0060df;
  color: #f9f9fa;
  border-radius: 3px;
}
.isChosen_dark:hover {
  background-color: #003eaa;
  color: #f9f9fa;
}

.isFreeChosen_light {
  background-color: rgba(10, 132, 255, 0.3);
  color: #0c0c0d;
}
.isFreeChosen_light:hover {
  background-color: #45a1ff;
  color: #f9f9fa;
}

.isFreeChosen_dark {
  background-color: #0a84ff;
  color: #f9f9fa;
}
.isFreeChosen_dark:hover {
  background-color: #0060df;
  color: #f9f9fa;
}

.selected_light {
  background-color: rgba(10, 132, 255, 0.1);
  color: #0c0c0d;
}
.selected_light:hover {
  background-color: rgba(10, 132, 255, 0.3);
  color: #0c0c0d;
}

.selected_dark {
  background-color: rgba(10, 132, 255, 0.1);
  color: #f9f9fa;
}
.selected_dark:hover {
  background-color: rgba(10, 132, 255, 0.3);
  color: #f9f9fa;
}

.startChosen_light {
  background-color: #003eaa;
  color: #f9f9fa;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.startChosen_light:hover {
  background-color: #0060df;
  color: #f9f9fa;
}

.startChosen_dark {
  background-color: #0a84ff;
  color: #f9f9fa;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.startChosen_dark:hover {
  background-color: #0060df;
  color: #f9f9fa;
}

.endChosen_light {
  background-color: #003eaa;
  color: #f9f9fa;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.endChosen_light:hover {
  background-color: #0060df;
  color: #f9f9fa;
}

.endChosen_dark {
  background-color: #0a84ff;
  color: #f9f9fa;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.endChosen_dark:hover {
  background-color: #0060df;
  color: #f9f9fa;
}
</style>