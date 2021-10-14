<script>
  import { getContext } from "svelte";
  import noun from "../i18n";

  let praecoxCalendar = getContext("praecoxCalendarData");
  $: weekNames = noun[$praecoxCalendar.lang][$praecoxCalendar.weekName];
</script>

<style>
  .calendar-week {
    width: var(
      --praecox-calendar-custom-inner-width,
      var(--praecox-calendar-inner-width)
    );
    display: inline-flex;
    justify-content: flex-start;
  }
  .calendar-tableCell {
    display: inline-flex;
    font-weight: 500;
    padding: 0;
    width: calc(
      var(
          --praecox-calendar-custom-inner-width,
          var(--praecox-calendar-inner-width)
        ) / 7
    );
    height: calc(
      var(
          --praecox-calendar-custom-inner-height,
          var(--praecox-calendar-inner-height)
        ) / 7
    );
    align-items: center;
    justify-content: center;
    user-select: none;
    font-size: 12px;
    color: var(
      --praecox-calendar-custom-font-secondary-color,
      var(--praecox-calendar-font-secondary-color)
    );
    font-family: var(
      --praecox-calendar-custom-font-family,
      var(--praecox-calendar-font-family)
    );
  }

  .calendar-dayOfWeek {
    text-decoration: none;
  }
</style>

<thead role="presentation">
  <tr role="row" class="calendar-week">
    {#each weekNames as item}
      <th role="columnheader" scope="col" class="calendar-tableCell">
        <abbr class="calendar-dayOfWeek" title={item}>{item}</abbr>
      </th>
    {/each}
  </tr>
</thead>
