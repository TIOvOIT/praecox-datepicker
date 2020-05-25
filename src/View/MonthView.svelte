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

  let result = [];
  export let formatResult;

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
    EN: "Today",
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
  let thisView = getContext("thisView");

  $: nowMonth = getDate.getMonth() + 1;
  $: nowYear = getDate.getFullYear();
  $: nowDay = getDate.getDate();

  function handleClick(date) {
    let _date = date.year + "-" + date.month + "-" + date.day;
    switch (pickerRule) {
      case "freeChoice":
        let r = new Set(result);
        if (r.has(_date)) {
          r.delete(_date);
          result = [...new Set(r)];

          formatResult = formatResult.filter(() => {
            +parseDate(_date);
          });
          formatResult = formatResult.sort();
        } else {
          result = [...result, _date];
          formatResult = [...formatResult, +parseDate(_date)];
          formatResult = formatResult.sort();
        }

        break;
      case "rangeChoice":
        if (result.length === 0) {
          result = [{ start: 0 }, { end: 0 }];
          result[0].start = +parseDate(_date);
          result[1].end = +parseDate(_date);
        } else if (+parseDate(_date) > result[1].end) {
          result[1].end = +parseDate(_date);
        } else if (+parseDate(_date) === result[0].start) {
          result[1].end = +parseDate(_date);
        } else if (+parseDate(_date) < result[1].end) {
          result[0].start = +parseDate(_date);
        }
        formatResult = result;
        break;
      default:
        if (result !== _date) {
          result = _date;
          formatResult = +parseDate(result);
        } else if (result === _date) {
          result = [];
          formatResult = [];
        }
    }
    array = array;
  }
  function formatDate(e) {
    var d = e.split("-");
    return new Date(d[0], d[1] - 1, d[2]);
  }

  function isChosen(arr) {
    let _date = arr.year + "-" + arr.month + "-" + arr.day;

    if (pickerRule === "rangeChoice") {
      if (result.length === 0) {
        return;
      }
      let dateNum = datediff(
        new Date(result[0].start),
        new Date(result[1].end)
      );
      let startDateNum = datediff(parseDate(_date), new Date(result[0].start));
      let endDateNum = datediff(parseDate(_date), new Date(result[1].end));

      if (startDateNum > 0 || endDateNum < 0 || result[0].start === 0) {
        return false;
      } else {
        return true;
      }
    }
  }
</script>

<style>
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

  td,
  .selected_dark,
  .selected_light {
    display: inline-flex;
    padding: 0;
    height: 30px;
    width: 42.8px;
    line-height: 30px;
    justify-content: center;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease-in-out 0s;
  }

  .light {
    color: #b1b1b3;
  }
  .light:hover {
    background-color: #f5f8ff;
    color: #0a84ff;
    border-radius: 3px;
  }

  .dark {
    color: #4a4a4f;
  }
  .dark:hover {
    background-color: #38383d;
    color: #45a1ff;
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
  .thisMonth_light:hover {
    background-color: rgba(10, 132, 255, 0.1);
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

  .markDate_light,
  .markDate_dark {
    position: relative;
  }
  .markDate_light::before,
  .markDate_dark::before {
    content: "";
    position: absolute;
    top: 3.2px;
    left: 10%;
    width: 3px;
    height: 3px;
    border-radius: 1.5px;
    background-color: #12bc00;
  }

  .markDate_dark::before {
    background-color: #30e60b;
  }

  .selected_light {
    background-color: rgba(10, 132, 255, 0.1);
    color: #0c0c0d;
  }
  .selected_light:hover {
    background-color: rgba(10, 132, 255, 0.3);
    color: #0c0c0d;
    border-radius: 0px;
  }

  .selected_dark {
    background-color: rgba(69, 161, 255, 0.2);
    color: #f9f9fa;
  }
  .selected_dark:hover {
    background-color: rgba(10, 132, 255, 0.3);
    color: #f9f9fa;
    border-radius: 0px;
  }
</style>

<table
  transition:scale={{ duration: 100, delay: 100, opacity: 0.1, start: 0.5, easing: quintOut }}>
  <WeekTitle />
  <tbody>
    {#each array as Weeks}
      <tr>
        {#each Weeks as item, i}
          <td
            title={item.day == nowDay && item.month == nowMonth && item.year == nowYear ? TODAY_NAME[i18n] : ''}
            class="{theme}
            {(item.month === $viewMonth ? 'thisMonth_' : '') + theme}
            {(isSatOrSun(item) ? 'isSatOrSun_' : '') + theme}
            {(isMark(item) ? 'markDate_' : '') + theme}
            {(isDisableDate(item) ? 'disableDate_' : '') + theme}
            {isChosen(item) ? 'selected_' + theme : ''}
            "
            on:click={handleClick(item)}>
            <Day
              {item}
              {result}
              isChosen={isChosen(item) ? 'selected_' + theme : ''} />
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
