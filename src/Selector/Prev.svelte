<script>
  import IconArrowBack from "../@icons/ArrowBack.svelte";
  import { getPrevYearAndMonth } from "../calendar";
  import noun from "../i18n";
  import { onMount, getContext } from "svelte";
  let praecoxCalendar = getContext("praecoxCalendarData");
  function prev() {
    let nd = new Date($praecoxCalendar.viewDate);
    let ty = nd.getFullYear();
    let tm = nd.getMonth() + 1;
    let td = nd.getDate();
    let [py, pm] = getPrevYearAndMonth(ty, tm);
    switch ($praecoxCalendar.view) {
      case "month":
        $praecoxCalendar.viewDate = `${py}-${pm}-${td}`;
        $praecoxCalendar.reloadDisabled();
        break;
      case "year":
        $praecoxCalendar.viewDate = `${ty - 1}-${tm}-${td}`;
        break;
      case "multi-years":
        $praecoxCalendar.viewDate = `${ty - 9}-${tm}-${td}`;
        break;
    }

    $praecoxCalendar.action = "prev";
    $praecoxCalendar.flag = !$praecoxCalendar.flag;
  }
</script>

<style>
  .prev-button {
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
  .prev-button:hover {
    fill: var(
      --praecox-calendar-custom-main-color,
      var(--praecox-calendar-main-color)
    );
  }
  .prev-button:active {
    fill: var(
      --praecox-calendar-custom-main-color-active,
      var(--praecox-calendar-main-color-active)
    );
  }
  .prev-button,
  .topButton {
    width: var(
      --praecox-calendar-custom-icon-size,
      var(--praecox-calendar-icon-size)
    );
    margin: 0 auto;
  }
</style>

<div
  class={'prev-button'}
  on:click={prev}
  title={noun[$praecoxCalendar.lang].prevName}>
  <div class="topButton">
    <IconArrowBack />
  </div>
</div>
