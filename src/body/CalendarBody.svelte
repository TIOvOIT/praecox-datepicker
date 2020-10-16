<script>
  import CalendarBodyHead from "./CalendarBodyHead.svelte";
  import CalendarBodyWeek from "./CalendarBodyWeek.svelte";
  import CalendarBodyYear from "./CalendarBodyYear.svelte";
  import CalendarBodyMultiYears from "./CalendarBodyMultiYears.svelte";
  import { getThisMonthData } from "../calendar.js";
  import { getContext } from "svelte";
  import { fly } from "svelte/transition";

  let praecoxCalendarData = getContext("praecoxCalendarData");

  $: monthData = getThisMonthData($praecoxCalendarData.viewDate);
</script>

<style>
  .calendar-body {
    margin: 0 auto;
    padding: 0;
    position: relative;
    overflow: hidden;
    width: var(
      --praecox-calendar-custom-inner-width,
      var(--praecox-calendar-inner-width)
    );
    height: var(
      --praecox-calendar-custom-inner-height,
      var(--praecox-calendar-inner-height)
    );
  }
  .praecox-calendar-body {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    border-spacing: 0;
    width: var(
      --praecox-calendar-custom-inner-width,
      var(--praecox-calendar-inner-width)
    );
    height: var(
      --praecox-calendar-custom-inner-height,
      var(--praecox-calendar-inner-height)
    );
  }
  .calendar-body,
  .praecox-calendar-body:focus {
    outline: none;
  }
  tbody {
    margin: 0 auto;
    width: var(
      --praecox-calendar-custom-inner-width,
      var(--praecox-calendar-inner-width)
    );
    height: var(
      --praecox-calendar-custom-inner-height,
      var(--praecox-calendar-inner-height)
    );
  }
</style>

<div
  class="calendar-body"
  role="grid"
  tabindex="0"
  aria-readonly="true"
  aria-disabled="false">
  {#if $praecoxCalendarData.view == 'month'}
    {#if $praecoxCalendarData.flag}
      <table
        role="presentation"
        class=" praecox-calendar-body"
        in:fly|local={{ x: `${$praecoxCalendarData.action == 'prev' ? -200 : 200}`, duration: 300 }}>
        <CalendarBodyHead />
        <tbody role="presentation">
          {#each monthData as item, i}
            <CalendarBodyWeek week={item} />
          {/each}
        </tbody>
      </table>
    {:else}
      <table
        role="presentation"
        class=" praecox-calendar-body"
        in:fly|local={{ x: `${$praecoxCalendarData.action == 'prev' ? -200 : 200}`, duration: 300 }}>
        <CalendarBodyHead />
        <tbody role="presentation">
          {#each monthData as item, i}
            <CalendarBodyWeek week={item} />
          {/each}
        </tbody>
      </table>
    {/if}
  {:else if $praecoxCalendarData.view == 'year'}
    {#if $praecoxCalendarData.flag}
      <table
        role="presentation"
        class=" praecox-calendar-body"
        in:fly|local={{ x: `${$praecoxCalendarData.action == 'prev' ? -200 : 200}`, duration: 300 }}>
        <tbody role="presentation">
          <CalendarBodyYear dateDate={$praecoxCalendarData.viewDate} />
        </tbody>
      </table>
    {:else}
      <table
        role="presentation"
        class=" praecox-calendar-body"
        in:fly|local={{ x: `${$praecoxCalendarData.action == 'prev' ? -200 : 200}`, duration: 300 }}>
        <tbody role="presentation">
          <CalendarBodyYear dateDate={$praecoxCalendarData.viewDate} />
        </tbody>
      </table>
    {/if}
  {:else if $praecoxCalendarData.view == 'multi-years'}
    {#if $praecoxCalendarData.flag}
      <table
        role="presentation"
        class=" praecox-calendar-body"
        in:fly|local={{ x: `${$praecoxCalendarData.action == 'prev' ? -200 : 200}`, duration: 300 }}>
        <tbody role="presentation">
          <CalendarBodyMultiYears />
        </tbody>
      </table>
    {:else}
      <table
        role="presentation"
        class=" praecox-calendar-body"
        in:fly|local={{ x: `${$praecoxCalendarData.action == 'prev' ? -200 : 200}`, duration: 300 }}>
        <tbody role="presentation">
          <CalendarBodyMultiYears />
        </tbody>
      </table>
    {/if}
  {/if}
</div>
