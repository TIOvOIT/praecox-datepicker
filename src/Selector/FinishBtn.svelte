<script>
  import IconCheckmark from "../@icons/Checkmark.svelte";

  import { getContext, onMount } from "svelte";
  import noun from "../i18n";

  let praecoxCalendarData = getContext("praecoxCalendarData");
  function handleClick() {
    $praecoxCalendarData.pickerDone = true;
  }
  onMount(() => {
    $praecoxCalendarData.pickerDone = false;
  });
</script>

<style>
  .finish-button {
    width: 20%;
    line-height: var(
      --praecox-calendar-custom-head-height,
      var(--praecox-calendar-head-height)
    );
    text-align: center;
    fill: var(
      --praecox-calendar-custom-font-secondary-color,
      var(--praecox-calendar-font-secondary-color)
    );
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
  }
  .finish-button:hover {
    fill: var(
      --praecox-calendar-custom-main-color,
      var(--praecox-calendar-main-color)
    );
  }
  .finish-button:active {
    fill: var(
      --praecox-calendar-custom-main-color-active,
      var(--praecox-calendar-main-color-active)
    );
  }
  .finish-button,
  .topButton {
    width: var(
      --praecox-calendar-custom-icon-size,
      var(--praecox-calendar-icon-size)
    );
    margin: 0 auto;
  }
</style>

<div
  class={'finish-button'}
  on:click={handleClick}
  title={noun[$praecoxCalendarData.lang].doneName}>
  <div class=" topButton">
    <IconCheckmark />
  </div>
</div>
