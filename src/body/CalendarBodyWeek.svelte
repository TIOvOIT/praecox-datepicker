<script>
  import { getContext } from "svelte";
  import CalendarBodyDay from "./CalendarBodyDay.svelte";

  export let week = [];

  let praecoxCalendar = getContext("praecoxCalendarData");

  function filterDate(arr, day) {
    if (!arr) {
      return;
    }
    let thisDate = setTimeToZero(new Date(day)).getTime();
    if (typeof arr[0] === "object") {
      for (let index = 0; index < arr.length; index++) {
        let arrItem = arr[index];
        if (
          arrItem.length === 2 &&
          setTimeToZero(new Date(arrItem[0])).getTime() < setTimeToZero(new Date(arrItem[1])).getTime()
        ) {
          if (
            thisDate >= setTimeToZero(new Date(arrItem[0])).getTime() &&
            thisDate <= setTimeToZero(new Date(arrItem[1])).getTime()
          ) {
            return true;
          }
        } else if (arrItem instanceof Date && setTimeToZero(arrItem).getTime() == thisDate) {
          return true;
        } else {
          for (let i = 0; i < arrItem.length; i++) {
            if (setTimeToZero(new Date(arrItem[i])).getTime() == thisDate) {
              return true;
            }
          }
        }
      }
    } else {
      if (
        arr.length === 2 &&
        setTimeToZero(new Date(arr[0])).getTime() < setTimeToZero(new Date(arr[1])).getTime()
      ) {
        if (
          thisDate >= setTimeToZero(new Date(arr[0])).getTime() &&
          thisDate <= setTimeToZero(new Date(arr[1])).getTime()
        ) {
          return true;
        }
      }
      for (let index = 0; index < arr.length; index++) {
        if (setTimeToZero(new Date(arr[index])).getTime() == thisDate) {
          return true;
        }
      }
    }
  }

  function testFreeSelected(i) {
    if ($praecoxCalendar.pickerMode == "free" && $praecoxCalendar.selected) {
      let f = new Set(formatDateArray($praecoxCalendar.selected));
      let td = new Date(i).getTime();
      if (f.has(td)) {
        return true;
      }
    }
  }

  function testMarked(i) {
    if ($praecoxCalendar.focused) {
      let f = new Set(formatDateArray($praecoxCalendar.focused));
      let td = new Date(i).getTime();
      if (f.has(td)) {
        return true;
      }
    }
  }

  function formatDateArray(arr) {
    return arr.map(date => setTimeToZero(date).getTime());
  }

  function setTimeToZero(date) {
    const d = new Date(date);
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
  }
</script>

<tr role="row">
  {#each week as item}
    <CalendarBodyDay
      day={item}
      isFreeSelected={testFreeSelected(item)}
      isFocused={testMarked(item)}
      disabled={filterDate($praecoxCalendar.disabled, item)}
    />
  {/each}
</tr>

<style>
  tr {
    margin: 0;
    padding: 0;
    display: inline-flex;
    justify-content: space-between;
    width: var(
      --praecox-calendar-custom-inner-width,
      var(--praecox-calendar-inner-width)
    );
  }
</style>
