<script>
  import { getContext, onMount } from "svelte";
  import noun from "../i18n";

  let praecoxCalendar = getContext("praecoxCalendarData");

  let yearList = [];
  const showYearTotal = 9;
  let temporarilyArray = [];
  onMount(() => {
    let ty = new Date($praecoxCalendar.viewDate).getFullYear();
    temporarilyArray.length = showYearTotal / 3;
    for (let index = 0; index < showYearTotal; index++) {
      yearList[index] = ty + (-1 * ((showYearTotal - 1) / 2) + index);
    }
  });

  function pickYear(i) {
    let d = new Date($praecoxCalendar.viewDate);
    let tm = d.getMonth() + 1;
    let td = d.getDate();
    $praecoxCalendar.viewDate = `${i}-${tm}-${td}`;
    $praecoxCalendar.view = "year";
  }
</script>

<style>
  tr {
    display: inline-flex;
    justify-content: flex-start;
  }
  td,
  .praecox-Calendar-month {
    display: inline-flex;
    justify-content: center;
    line-height: calc(var(--praecox-calendar-inner-height) / 3.2);
    height: calc(var(--praecox-calendar-inner-height) / 3.2);
    width: calc(var(--praecox-calendar-inner-width) / 3);
    border-radius: var(
      --praecox-calendar-custom-border-radius,
      var(--praecox-calendar-border-radius)
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
  .praecox-Calendar-month:hover {
    cursor: pointer;
    background: var(
      --praecox-calendar-custom-background-hover,
      var(--praecox-calendar-background-hover)
    );
  }
  .current-year {
    color: var(
      --praecox-calendar-custom-main-color,
      var(--praecox-calendar-main-color)
    );
  }
</style>

<tr role="row">
  {#each yearList as item, _i}
    {#if _i < 3}
      <td role="gridcell" on:click={() => pickYear(item)}>
        <span
          role="presentation"
          class=" praecox-Calendar-month"
          class:current-year={new Date($praecoxCalendar.nowDate).getFullYear() === item}>
          {item}
        </span>
      </td>
    {/if}
  {/each}
</tr>
<tr role="row">
  {#each yearList as item, _i}
    {#if _i >= 3 && _i < 6}
      <td role="gridcell" on:click={() => pickYear(item)}>
        <span
          role="presentation"
          class=" praecox-Calendar-month"
          class:current-year={new Date($praecoxCalendar.nowDate).getFullYear() === item}>
          {item}
        </span>
      </td>
    {/if}
  {/each}
</tr>
<tr role="row">
  {#each yearList as item, _i}
    {#if _i >= 6 && _i < 9}
      <td role="gridcell" on:click={() => pickYear(item)}>
        <span
          role="presentation"
          class=" praecox-Calendar-month"
          class:current-year={new Date($praecoxCalendar.nowDate).getFullYear() === item}>
          {item}
        </span>
      </td>
    {/if}
  {/each}
</tr>
