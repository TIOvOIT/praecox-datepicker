<script>
  import { getContext, beforeUpdate } from "svelte";

  export let date;
  export let result;
  export let isChosen;

  let chosen;
  let getDate = getContext("nowDate");
  let pickerRule = getContext("pickerRule");
  let theme = getContext("theme");

  $: nowMonth = getDate.getMonth() + 1;
  $: nowYear = getDate.getFullYear();
  $: nowDay = getDate.getDate();

  function hasChosen(date) {
    let _date = date.year + "-" + date.month + "-" + date.day;
    if (pickerRule === "singleChoice") {
      return result == _date ? (chosen = "isChosen_" + theme) : (chosen = "");
    } else if (pickerRule === "freeChoice") {
      let r = new Set(result);
      return r.has(_date) ? (chosen = "isFreeChosen_" + theme) : (chosen = "");
    } else if (pickerRule === "rangeChoice") {
      isStartOrEnd(_date);
    }
  }

  let start = "";
  let end = "";
  function isStartOrEnd(arr) {
    if (result.length === 0) {
      return;
    }
    switch (+parseDate(arr)) {
      case result[0].start:
        start = "startChosen_" + theme;
        break;
      case result[1].end:
        end = "endChosen_" + theme;
        break;
      default:
        start = "";
        end = "";
        break;
    }
  }
  function parseDate(str) {
    var mdy = str.split("-");
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
  }

  function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }
  beforeUpdate(() => {
    hasChosen(date);
  });
</script>



<div
  class="{date.day == nowDay && date.month == nowMonth && date.year == nowYear ? 'today' : ''}
  {chosen}
  {isChosen}
  {start}
  {end}
  ">
  {date.day}
</div>

<style>
td, .endChosen_dark, .endChosen_light,.startChosen_dark,  .startChosen_light,  .selected_dark,  .selected_light, .isFreeChosen_dark,.isFreeChosen_light, .isChosen_dark,  .isChosen_light,.th_dark, .th_light {
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
 .endChosen_dark:hover, .endChosen_light:hover, .startChosen_dark:hover, .startChosen_light:hover, .selected_dark:hover, .selected_light:hover, .isFreeChosen_dark:hover, .isFreeChosen_light:hover, .isChosen_dark:hover, .isChosen_light:hover, .th_dark:hover, .th_light:hover {
  background-color: rgba(10, 132, 255, 0.1);
  color: #0c0c0d;
  border-radius: 3px;
}

.dark{
  color: #737373;
}
.dark:hover{
  background-color: #003eaa;
  color: #f9f9fa;
  border-radius: 3px;
}
.today {
  text-align: center;
  height: 30px;
  width: 42.8px;
  position: relative;
}
.today::before {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 39px;
  border: 1.6px solid #0060df;
  border-radius: 0.8px;
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