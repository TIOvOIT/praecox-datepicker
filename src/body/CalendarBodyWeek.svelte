<script>
  import { getContext } from "svelte";
  import CalendarBodyDay from "./CalendarBodyDay.svelte";

  export let week = [];

  let praecoxCalendar = getContext("praecoxCalendarData");

  function filterDate(arr, day) {
    if (!arr) {
      return;
    }
    let thisDate = new Date(day).getTime();
    if (typeof arr[0] === "object") {
      for (let index = 0; index < arr.length; index++) {
        let arrItem = arr[index];
        if (
          arrItem.length === 2 &&
          new Date(arrItem[0]).getTime() < new Date(arrItem[1]).getTime()
        ) {
          if (
            thisDate >= new Date(arrItem[0]).getTime() &&
            thisDate <= new Date(arrItem[1]).getTime()
          ) {
            return true;
          }
        } else if (arrItem instanceof Date && arrItem.getTime() == thisDate) {
          return true;
        } else {
          for (let i = 0; i < arrItem.length; i++) {
            if (new Date(arrItem[i]).getTime() == thisDate) {
              return true;
            }
          }
        }
      }
    } else {
      if (
        arr.length === 2 &&
        new Date(arr[0]).getTime() < new Date(arr[1]).getTime()
      ) {
        if (
          thisDate >= new Date(arr[0]).getTime() &&
          thisDate <= new Date(arr[1]).getTime()
        ) {
          return true;
        }
      }
      for (let index = 0; index < arr.length; index++) {
        if (new Date(arr[index]).getTime() == thisDate) {
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
    let narr = [];

    for (let index = 0; index < arr.length; index++) {
      narr[index] = new Date(arr[index]).getTime();
    }
    return narr;
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
