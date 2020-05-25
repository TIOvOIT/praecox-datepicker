<script>
  import { getContext, afterUpdate } from "svelte";

  export let item;
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

  afterUpdate(() => {
    hasChosen(item);
  });
</script>

<style>
  .light {
    display: inline-flex;
    padding: 0;
    height: 30px;
    width: 42.8px;
    line-height: 30px;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease-in-out 0s;
  }

  .dark {
    display: inline-flex;
    padding: 0;
    height: 30px;
    width: 42.8px;
    line-height: 30px;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease-in-out 0s;
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
    background-color: #0060df;
    color: #f9f9fa;
  }
  .isFreeChosen_light:hover {
    background-color: #0a84ff;
    color: #f9f9fa;
    border-radius: 0px;
  }

  .isFreeChosen_dark {
    background-color: #003eaa;
    color: #f9f9fa;
  }
  .isFreeChosen_dark:hover {
    background-color: #0a84ff;
    color: #f9f9fa;
    border-radius: 0px;
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

  .today {
    position: relative;
    background-color: rgba(0, 96, 223, 0.1);
  }
  .today::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3.5px;
    width: 42.8px;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    background: #0060df;
  }
  .today:hover {
    background-color: rgba(0, 96, 223, 0.2);
  }
</style>

<div
  class="{item.day == nowDay && item.month == nowMonth && item.year == nowYear ? 'today' : ''}
  {chosen}
  {isChosen}
  {start}
  {end}
  {theme}
  ">
  {item.day}
</div>
