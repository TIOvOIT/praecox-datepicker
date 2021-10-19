<script>
  import { beforeUpdate, getContext } from "svelte";
  import { formatDatestamp, theDayOfTheWeek } from "../calendar.js";
  import noun from "../i18n";

  export let day = 1;

  export let isSelected = false;

  export let isFocused = false;

  export let disabled = false;

  export let isFreeSelected = false;
  let isRangeSelection = false;

  let isSelectionStart = false;

  let isSelectionEnd = false;

  let praecoxCalendar = getContext("praecoxCalendarData");

  $: dayLabel = new Date(day).getDate();
  $: isWeekend = theDayOfTheWeek(day) === 6 || theDayOfTheWeek(day) === 7;
  $: isOutsideMonth =
    new Date($praecoxCalendar.viewDate).getMonth() != new Date(day).getMonth();

  $: isToday =
    new Date($praecoxCalendar.nowDate).getDate() == new Date(day).getDate() &&
    new Date($praecoxCalendar.nowDate).getMonth() == new Date(day).getMonth() &&
    new Date($praecoxCalendar.nowDate).getFullYear() ==
      new Date(day).getFullYear();

  beforeUpdate(() => {
    if ($praecoxCalendar.pickerMode == "single") {
      isSelected =
        new Date(day).getTime() ==
        new Date($praecoxCalendar.selected).getTime();
    }
    if ($praecoxCalendar.pickerMode == "range") {
      [isRangeSelection, isSelectionStart, isSelectionEnd] = testSelectedRange(
        day
      );
      isSelected = isRangeSelection;
    }
  });

  function formatWeekName(n) {
    let dotw = theDayOfTheWeek(n);
    return noun[$praecoxCalendar.lang][`weekFullName`][dotw - 1];
  }

  function pick() {
    if ($praecoxCalendar.pickerMode == "single") {
      $praecoxCalendar.selected = new Date(day).getTime();
    }
    if ($praecoxCalendar.pickerMode == "range") {
      if (
        $praecoxCalendar.reselected &&
        $praecoxCalendar.selected[0] &&
        $praecoxCalendar.selected[1] &&
        $praecoxCalendar.selected[0] !== $praecoxCalendar.selected[1]
      ) {
        $praecoxCalendar.selected = [];
      } else {
        $praecoxCalendar.selected = rangePicker($praecoxCalendar.selected);
      }
    }
    if ($praecoxCalendar.pickerMode == "free") {
      freePicker(day);
    }

    $praecoxCalendar.changed += 1;
  }

  function testSelectedRange(n) {
    let i = new Date(n).getTime();
    let startDate = new Date($praecoxCalendar.selected[0]).getTime();
    let endDate = new Date($praecoxCalendar.selected[1]).getTime();
    return [i >= startDate && i <= endDate, i == startDate, i == endDate];
  }

  function rangePicker(arr) {
    let thisDate = new Date(day).getTime();
    let startDate = new Date(arr[0]).getTime();
    let endDate = new Date(arr[1]).getTime();

    if (!endDate || !startDate || startDate == thisDate) {
      startDate = thisDate;
      endDate = thisDate;
    } else {
      if (thisDate > endDate) {
        endDate = thisDate;
      } else if (thisDate < startDate || thisDate > startDate) {
        startDate = thisDate;
      } else if (thisDate == endDate) {
        startDate = thisDate;
      }
    }

    return [startDate, endDate];
  }

  function freePicker(n) {
    let _date = new Date(n).getTime();
    let r = new Set($praecoxCalendar.selected);

    if (r.has(_date)) {
      r.delete(_date);
      $praecoxCalendar.selected = [...new Set(r)];
    } else {
      $praecoxCalendar.selected = [...$praecoxCalendar.selected, _date];
      $praecoxCalendar.selected = $praecoxCalendar.selected.sort();
    }
  }
</script>

<style>
  .calendar-tableCell,
  .calendar-date {
    margin: 0;
    padding: 0;
    height: calc(
      var(
          --praecox-calendar-custom-inner-height,
          var(--praecox-calendar-inner-height)
        ) / 7
    );
    width: calc(
      var(
          --praecox-calendar-custom-inner-width,
          var(--praecox-calendar-inner-width)
        ) / 7
    );
    color: var(
      --praecox-calendar-custom-font-main-color,
      var(--praecox-calendar-font-main-color)
    );
    font-family: var(
      --praecox-calendar-custom-number-font-family,
      var(--praecox-calendar-number-font-family)
    );
  }
  .calendar-weekend {
    background: var(
      --praecox-calendar-custom-weekend-color,
      var(--praecox-calendar-weekend-color)
    );
  }

  .calendar-outsideMonth {
    color: var(
      --praecox-calendar-custom-outsidemonth-color,
      var(--praecox-calendar-outsidemonth-color)
    );
  }
  .calendar-outsideMonth-disabled {
    color: var(
      --praecox-calendar-custom-font-disabled-color,
      var(--praecox-calendar-font-disabled-color)
    );
  }

  span {
    display: inline-block;
    padding: 0;
    height: calc(
      var(
          --praecox-calendar-custom-inner-height,
          var(--praecox-calendar-inner-height)
        ) / 7
    );
    width: calc(
      var(
          --praecox-calendar-custom-inner-width,
          var(--praecox-calendar-inner-width)
        ) / 7
    );
    line-height: calc(
      var(
          --praecox-calendar-custom-inner-height,
          var(--praecox-calendar-inner-height)
        ) / 7
    );
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease-in-out 0s;
    text-align: center;
  }
  .calendar-date:hover {
    background: var(
      --praecox-calendar-custom-secondary-color,
      var(--praecox-calendar-secondary-color)
    );
    color: var(
      --praecox-calendar-custom-main-color-hover,
      var(--praecox-calendar-main-color-hover)
    );
  }
  .is-today {
    position: relative;
    background: var(
      --praecox-calendar-custom-adjunctive-color,
      var(--praecox-calendar-adjunctive-color)
    );
  }
  .is-today::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: calc(
      0.01 *
        var(--praecox-calendar-custom-height, var(--praecox-calendar-height))
    );
    width: calc(
      var(
          --praecox-calendar-custom-inner-width,
          var(--praecox-calendar-inner-width)
        ) / 7
    );
    border-bottom-left-radius: var(
      --praecox-calendar-custom-border-radius,
      var(--praecox-calendar-border-radius)
    );
    border-bottom-right-radius: var(
      --praecox-calendar-custom-border-radius,
      var(--praecox-calendar-border-radius)
    );
    background: var(
      --praecox-calendar-custom-main-color,
      var(--praecox-calendar-main-color)
    );
  }
  .is-today:hover {
    background: var(
      --praecox-calendar-custom-secondary-color,
      var(--praecox-calendar-secondary-color)
    );
  }

  .is-today-selected:hover {
    background: var(
      --praecox-calendar-custom-selected-color,
      var(--praecox-calendar-selected-color)
    );
    color: var(
      --praecox-calendar-custom-overbackground-color,
      var(--praecox-calendar-overbackground-color)
    );
  }
  .is-selected {
    background: var(
      --praecox-calendar-custom-selected-color,
      var(--praecox-calendar-selected-color)
    );
    color: var(
      --praecox-calendar-custom-background,
      var(--praecox-calendar-background)
    );
    border-radius: var(
      --praecox-calendar-custom-border-radius,
      var(--praecox-calendar-border-radius)
    );
  }
  .is-free-selected {
    background: var(
      --praecox-calendar-custom-selected-color,
      var(--praecox-calendar-selected-color)
    );
    color: var(
      --praecox-calendar-overbackground-color,
      var(--praecox-calendar-overbackground-color)
    );
  }
  .is-disabled {
    color: var(
      --praecox-calendar-custom-font-disabled-color,
      var(--praecox-calendar-font-disabled-color)
    );
    pointer-events: none;
  }
  .is-range-selection {
    background: var(
      --praecox-calendar-custom-adjunctive-color,
      var(--praecox-calendar-adjunctive-color)
    );
    color: var(
      --praecox-calendar-custom-font-main-color,
      var(--praecox-calendar-font-main-color)
    );
    border-radius: 0;
  }
  .is-selection-start {
    background: var(
      --praecox-calendar-custom-selected-color,
      var(--praecox-calendar-selected-color)
    );
    color: var(
      --praecox-calendar-overbackground-color,
      var(--praecox-calendar-overbackground-color)
    );
    border-top-left-radius: var(
      --praecox-calendar-custom-border-radius,
      var(--praecox-calendar-border-radius)
    );
    border-bottom-left-radius: var(
      --praecox-calendar-custom-border-radius,
      var(--praecox-calendar-border-radius)
    );
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .is-selection-end {
    background: var(
      --praecox-calendar-custom-selected-color,
      var(--praecox-calendar-selected-color)
    );
    color: var(
      --praecox-calendar-overbackground-color,
      var(--praecox-calendar-overbackground-color)
    );
    border-top-right-radius: var(
      --praecox-calendar-custom-border-radius,
      var(--praecox-calendar-border-radius)
    );
    border-bottom-right-radius: var(
      --praecox-calendar-custom-border-radius,
      var(--praecox-calendar-border-radius)
    );
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .is-focused {
    position: relative;
  }
  .is-focused::before {
    content: "";
    position: absolute;
    top: 15%;
    left: 10%;
    width: calc(
      0.01 *
        var(--praecox-calendar-custom-height, var(--praecox-calendar-height))
    );
    height: calc(
      0.01 *
        var(--praecox-calendar-custom-height, var(--praecox-calendar-height))
    );
    border-radius: calc(
      0.5 *
        (
          0.01 *
            var(
              --praecox-calendar-custom-height,
              var(--praecox-calendar-height)
            )
        )
    );
    background-color: var(
      --praecox-calendar-custom-focused-color,
      var(--praecox-calendar-focused-color)
    );
  }
</style>

<td
  role="gridcell"
  class="calendar-tableCell"
  class:calendar-weekend={isWeekend}
  aria-disabled={disabled}
  aria-selected={isSelected}
  title={isToday ? noun[$praecoxCalendar.lang].today + ' , ' + formatWeekName(day) + ' , ' + formatDatestamp(day, 'yyyy-mm-dd') : formatWeekName(day) + ' , ' + formatDatestamp(day, 'yyyy-mm-dd')}>
  <span
    role="presentation"
    on:click={pick}
    class="calendar-date"
    class:is-today={isToday}
    class:is-selected={isSelected}
    class:is-today-selected={isToday && (isSelected || isFreeSelected)}
    class:is-free-selected={isFreeSelected}
    class:is-focused={isFocused}
    class:is-disabled={disabled}
    class:is-range-selection={isRangeSelection}
    class:is-selection-start={isSelectionStart}
    class:is-selection-end={isSelectionEnd}
    class:calendar-outsideMonth={isOutsideMonth}
    class:calendar-outsideMonth-disabled={isOutsideMonth && disabled}
    class:is-outsideMonth={isOutsideMonth}>
    {dayLabel}
  </span>
</td>
