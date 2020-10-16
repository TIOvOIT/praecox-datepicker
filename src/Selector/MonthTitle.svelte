<script>
  import { getContext } from "svelte";
  import { fly } from "svelte/transition";
  import noun from "../i18n";

  let praecoxCalendar = getContext("praecoxCalendarData");

  function switchView() {
    if ($praecoxCalendar.view === "month") {
      $praecoxCalendar.view = "year";
    } else if ($praecoxCalendar.view === "year") {
      $praecoxCalendar.view = "multi-years";
    } else if ($praecoxCalendar.view === "multi-years") {
      $praecoxCalendar.view = "month";
    }
  }
</script>

<style>
  .titleBox {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
  }

  .month-title {
    width: 100%;
    position: absolute;
  }

  .month-title-wrap {
    width: 60%;
    line-height: var(
      --praecox-calendar-custom-head-height,
      var(--praecox-calendar-head-height)
    );
    text-align: center;
    color: var(
      --praecox-calendar-custom-font-main-color,
      var(--praecox-calendar-font-main-color)
    );
    user-select: none;
    cursor: pointer;
    font-weight: bolder;
    font-family: var(
      --praecox-calendar-custom-font-family,
      var(--praecox-calendar-font-family)
    );
    transition: background-color 0.2s ease-in-out 0s;
  }
  .month-title-wrap:hover {
    background: var(
      --praecox-calendar-custom-background-hover,
      var(--praecox-calendar-background-hover)
    );
    color: var(
      --praecox-calendar-custom-main-color-hover,
      var(--praecox-calendar-main-color-hover)
    );
    border-radius: var(
      --praecox-calendar-custom-border-radius,
      var(--praecox-calendar-border-radius)
    );
  }
  .month-title-wrap:active {
    background: var(
      --praecox-calendar-custom-background-active,
      var(--praecox-calendar-background-active)
    );
    color: var(
      --praecox-calendar-custom-main-color-active,
      var(--praecox-calendar-main-color-active)
    );
  }
</style>

{#if $praecoxCalendar.flag}
  <div class="month-title-wrap" on:click={switchView}>
    <div class="titleBox">
      <div
        class="month-title"
        in:fly|local={{ x: `${$praecoxCalendar.action == 'prev' ? -50 : 50}`, duration: 300 }}>
        {#if $praecoxCalendar.view === 'month'}
          {noun[$praecoxCalendar.lang][$praecoxCalendar.monthName][new Date($praecoxCalendar.viewDate).getMonth()] + '  ' + new Date($praecoxCalendar.viewDate).getFullYear()}
        {:else if $praecoxCalendar.view === 'year'}
          {new Date($praecoxCalendar.viewDate).getFullYear()}
        {:else if $praecoxCalendar.view === 'multi-years'}
          {`${new Date($praecoxCalendar.viewDate).getFullYear()} - ${+new Date($praecoxCalendar.viewDate).getFullYear() + 11}`}
        {/if}
      </div>
    </div>
  </div>
{:else}
  <div class="month-title-wrap" on:click={switchView}>
    <div class="titleBox">
      <div
        class="month-title"
        in:fly|local={{ x: `${$praecoxCalendar.action == 'prev' ? -50 : 50}`, duration: 300 }}>
        {#if $praecoxCalendar.view === 'month'}
          {noun[$praecoxCalendar.lang][$praecoxCalendar.monthName][new Date($praecoxCalendar.viewDate).getMonth()] + '  ' + new Date($praecoxCalendar.viewDate).getFullYear()}
        {:else if $praecoxCalendar.view === 'year'}
          {new Date($praecoxCalendar.viewDate).getFullYear()}
        {:else if $praecoxCalendar.view === 'multi-years'}
          {`${new Date($praecoxCalendar.viewDate).getFullYear()} - ${+new Date($praecoxCalendar.viewDate).getFullYear() + 11}`}
        {/if}
      </div>
    </div>
  </div>
{/if}
