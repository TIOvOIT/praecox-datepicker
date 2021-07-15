<script>
  import { getContext } from "svelte";
  import noun from "../i18n";

  export let dateDate = [];

  let praecoxCalendar = getContext("praecoxCalendarData");
  $: monthList = noun[$praecoxCalendar.lang][$praecoxCalendar.monthName];
  $: currentYear =
    new Date(dateDate).getFullYear() ==
    new Date($praecoxCalendar.nowDate).getFullYear();
  $: currentMonth = new Date($praecoxCalendar.nowDate).getMonth();

  function pickMonth(i) {
    let d = new Date($praecoxCalendar.viewDate);

    let ty = d.getFullYear();
    let td = d.getDate();
    $praecoxCalendar.viewDate = `${ty}-${i + 1}-${td}`;
    $praecoxCalendar.reloadDisabled();
    $praecoxCalendar.view = "month";
  }
</script>

<tr role="row">
  {#each monthList as item, i}
    {#if i < 3}
      <td role="gridcell" on:click={() => pickMonth(i)}>
        <span
          role="presentation"
          class=" praecox-Calendar-month"
          class:current-month={currentMonth == i && currentYear}
        >
          {item}
        </span>
      </td>
    {/if}
  {/each}
</tr>

<tr role="row">
  {#each monthList as item, i}
    {#if i >= 3 && i < 6}
      <td role="gridcell" on:click={() => pickMonth(i)}>
        <span
          role="presentation"
          class=" praecox-Calendar-month"
          class:current-month={currentMonth == i && currentYear}
        >
          {item}
        </span>
      </td>
    {/if}
  {/each}
</tr>
<tr role="row">
  {#each monthList as item, i}
    {#if i >= 6 && i < 9}
      <td role="gridcell" on:click={() => pickMonth(i)}>
        <span
          role="presentation"
          class=" praecox-Calendar-month"
          class:current-month={currentMonth == i && currentYear}
        >
          {item}
        </span>
      </td>
    {/if}
  {/each}
</tr>
<tr role="row">
  {#each monthList as item, i}
    {#if i >= 9 && i < 12}
      <td role="gridcell" on:click={() => pickMonth(i)}>
        <span
          role="presentation"
          class=" praecox-Calendar-month"
          class:current-month={currentMonth == i && currentYear}
        >
          {item}
        </span>
      </td>
    {/if}
  {/each}
</tr>

<style>
  tr {
    display: inline-flex;
    justify-content: flex-start;
  }
  td,
  .praecox-Calendar-month {
    display: inline-flex;
    justify-content: center;
    line-height: calc(
      (
          var(
            --praecox-calendar-custom-inner-height,
            var(--praecox-calendar-inner-height)
          )
        ) / 4.2
    );
    height: calc(
      (
          var(
            --praecox-calendar-custom-inner-height,
            var(--praecox-calendar-inner-height)
          )
        ) / 4.2
    );
    width: calc(
      var(
          --praecox-calendar-custom-inner-width,
          var(--praecox-calendar-inner-width)
        ) / 3
    );
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
  .current-month {
    color: var(
      --praecox-calendar-custom-main-color,
      var(--praecox-calendar-main-color)
    );
  }
</style>
