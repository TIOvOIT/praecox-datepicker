<script context="module">
  import {
    formatDatestamp,
    getNextYearAndMonth,
    getPrevYearAndMonth,
    getThisMonthData,
    testDaysInTheMonth,
    testLeapYear,
    testSolarMonthOf31Days,
    thisMonthHasManyWeek,
    theDayOfTheWeek
  } from "./calendar.js";
  export {
    formatDatestamp,
    getNextYearAndMonth,
    getPrevYearAndMonth,
    getThisMonthData,
    testDaysInTheMonth,
    testLeapYear,
    testSolarMonthOf31Days,
    thisMonthHasManyWeek,
    theDayOfTheWeek
  };
</script>

<script>
  import { setContext, getContext, beforeUpdate } from "svelte";
  import { writable } from "svelte/store";
  import CalendarHeader from "./Selector/Selector.svelte";
  import CalendarBody from "./body/CalendarBody.svelte";
  import "./fix-date.js";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let changed = 0;

  /**
   * Set base date
   * @type { Date | dateString }[nowDate = new Date()]
   */
  export let nowDate = new Date();

  /**
   * internationalization
   * @type { "en"|"zh" }[lang = "en"]
   */
  export let lang = "en";

  /**
   * Set view date
   * @type { Date | dateString }[viewDate = nowDate]
   */
  export let viewDate = nowDate;

  /**
   * Date selection mode
   * @type { "single" | "range" | "free" }[pickerMode = "single"]
   */
  export let pickerRule = "single";

  /**
   * List of dates that need to be disabled
   * @type { Array }[disabled = []]
   */
  export let disabled = [];

  /**
   * Selected date
   * @type { string ｜ Array }[selected = []]
   */
  export let selected = [];

  /**
   * Marked date
   * @type {  Array }[marked = []]
   */
  export let marked = [];

  /**
   * Week name adopts pattern
   * @type { "weekShortAbbreviation" | "weekAbbreviation" | "weekFullName"}[weekNameMode = "weekShortAbbreviation"]
   */
  export let weekNameMode = "weekAbbreviation";

  /**
   * Month name adopts pattern
   * @type { "monthAbbreviation" | "monthFullName" }[monthNameMode = "monthFullName"]
   */
  export let monthNameMode = "monthFullName";

  /**
   * Set the theme mode of the calendar
   * @type { "light" | "dark" }[theme = "light"]
   */
  export let theme = "light";

  /**
   * When selecting the range, whether to reselect
   * @type { boolean }[reSelected = false]
   */
  export let reSelected = false;

  /**
   * Used to bind to the Done button
   * @type { boolean }[pickerDone = false]
   */
  export let pickerDone = false;

  /**
   * Used to show/hide to the FinishBtn button
   * @type { boolean }[finishBtn = true]
   */
  export let finishBtn = true;

  const praecoxCalendarData = writable({
    nowDate: [],
    viewDate: viewDate,
    action: "next",
    flag: false,
    view: "month",
    monthName: monthNameMode,
    weekName: weekNameMode,
    lang: lang,
    theme: theme,
    pickerMode: pickerRule,
    reselected: reSelected,
    disabled: disabled,
    selected: selected,
    focused: marked,
    pickerDone: pickerDone,
    changed: changed,
    finishBtn: finishBtn
  });

  setContext("praecoxCalendarData", praecoxCalendarData);
  let praecoxCalendarConfig = getContext("praecoxCalendarData");

  beforeUpdate(() => {
    $praecoxCalendarConfig.nowDate = nowDate;
    selected = $praecoxCalendarConfig.selected;
    pickerDone = $praecoxCalendarConfig.pickerDone;
  });

  $: if( $praecoxCalendarData.changed > changed ) {
    changed = $praecoxCalendarData.changed;
    dispatch('change', $praecoxCalendarData.selected);
  }
</script>

<style>
  .calendar {
    --praecox-calendar-width: 330px;
    --praecox-calendar-height: 310px;
    --praecox-calendar-inner-width: 310px;
    --praecox-calendar-inner-height: 220px;
    --praecox-calendar-head-height: 48px;
    --praecox-calendar-icon-size: 20px;
    --praecox-calendar-border-radius: 3px;
    --praecox-calendar-font-family: sans-serif;
    --praecox-calendar-number-font-family: "Open Sans", sans-serif;

    position: relative;
    width: var(--praecox-calendar-custom-width, var(--praecox-calendar-width));
    height: var(
      --praecox-calendar-custom-height,
      var(--praecox-calendar-height)
    );
    border-radius: var(
      --praecox-calendar-custom-border-radius,
      var(--praecox-calendar-border-radius)
    );
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .calendar-light {
    --praecox-calendar-main-color: #0060df;
    --praecox-calendar-main-color-hover: #0a84ff;
    --praecox-calendar-main-color-active: #0060df;
    --praecox-calendar-focused-color: #12bc00;
    --praecox-calendar-adjunctive-color: rgba(0, 96, 223, 0.1);
    --praecox-calendar-secondary-color: rgba(0, 96, 223, 0.2);
    --praecox-calendar-selected-color: #002275;

    --praecox-calendar-weekend-color: #f9f9fa;
    --praecox-calendar-outsidemonth-color: #b1b1b3;
    --praecox-calendar-overbackground-color: #f5f8ff;

    --praecox-calendar-font-main-color: #181818;
    --praecox-calendar-font-disabled-color: #d7d7db;
    --praecox-calendar-font-secondary-color: #b1b1b3;

    --praecox-calendar-background: #ffffff;
    --praecox-calendar-background-hover: #f5f8ff;
    --praecox-calendar-border: 1px solid #ededf0;
    --praecox-calendar-boxshadow: 0px 1px solid #ededf0;

    background: var(
      --praecox-calendar-custom-background,
      var(--praecox-calendar-background)
    );
    border: var(
      --praecox-calendar-custom-border,
      var(--praecox-calendar-border)
    );
    box-shadow: var(
      --praecox-calendar-custom-boxshadow,
      var(--praecox-calendar-boxshadow)
    );
  }

  .calendar-dark {
    --praecox-calendar-main-color: #0066ff;
    --praecox-calendar-main-color-hover: #71a5ff;
    --praecox-calendar-main-color-active: #0060df;
    --praecox-calendar-focused-color: #1aff00;
    --praecox-calendar-adjunctive-color: rgba(85, 158, 255, 0.2);
    --praecox-calendar-secondary-color: rgba(86, 154, 243, 0.2);
    --praecox-calendar-selected-color: #0e46d4;

    --praecox-calendar-weekend-color: #0c0c0d;
    --praecox-calendar-outsidemonth-color: #5d5d63;

    --praecox-calendar-overbackground-color: #f5f8ff;
    --praecox-calendar-font-main-color: #d3d7df;
    --praecox-calendar-font-disabled-color: #414144;
    --praecox-calendar-font-secondary-color: #6c6c72;

    --praecox-calendar-background: #141416;
    --praecox-calendar-background-hover: #131f3a;
    --praecox-calendar-border: 1px solid #3b3b3b;
    --praecox-calendar-boxshadow: 0px 1px solid #a9a9ad;

    background: var(
      --praecox-calendar-custom-background,
      var(--praecox-calendar-background)
    );
    border: var(
      --praecox-calendar-custom-border,
      var(--praecox-calendar-border)
    );
    box-shadow: var(
      --praecox-calendar-custom-boxshadow,
      var(--praecox-calendar-boxshadow)
    );
  }
</style>

<div class="calendar calendar-{theme}">
  <div class="calendar-wrap">
    <CalendarHeader />
    <CalendarBody />
  </div>

</div>
