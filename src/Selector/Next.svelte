<script>
  import IconArrowForward from "../@icons/ArrowForward.svelte";
  import { getNextYearAndMonth } from "../calendar";
  import noun from "../i18n";
  import { onMount, getContext } from "svelte";
  let praecoxCalendar = getContext("praecoxCalendarData");

  function next() {
    let nd = new Date($praecoxCalendar.viewDate);
    let ty = nd.getFullYear();
    let tm = nd.getMonth() + 1;
    let td = nd.getDate();
    let [ny, nm] = getNextYearAndMonth(ty, tm);
    switch ($praecoxCalendar.view) {
      case "month":
        $praecoxCalendar.viewDate = `${ny}-${nm}-${td}`;
        $praecoxCalendar.reloadDisabled();
        break;
      case "year":
        $praecoxCalendar.viewDate = `${ty + 1}-${tm}-${td}`;
        break;
      case "multi-years":
        $praecoxCalendar.viewDate = `${ty + 9}-${tm}-${td}`;
        break;
    }
    $praecoxCalendar.action = "next";
    $praecoxCalendar.flag = !$praecoxCalendar.flag;
  }
</script>

<style>
  .next-button {
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
  .next-button:hover {
    fill: var(
      --praecox-calendar-custom-main-color,
      var(--praecox-calendar-main-color)
    );
  }
  .next-button:active {
    fill: var(
      --praecox-calendar-custom-main-color-active,
      var(--praecox-calendar-main-color-active)
    );
  }
  .next-button,
  .topButton {
    width: var(
      --praecox-calendar-custom-icon-size,
      var(--praecox-calendar-icon-size)
    );
    margin: 0 auto;
  }
</style>

<div
  class={'next-button'}
  on:click={next}
  title={noun[$praecoxCalendar.lang].nextName}>
  <div class=" topButton">
    <IconArrowForward />
  </div>
</div>
