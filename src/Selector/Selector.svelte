<script>
  import { getContext } from "svelte";

  import MonthTitle from "./MonthTitle.svelte";
  import Prev from "./Prev.svelte";
  import Next from "./Next.svelte";
  import FinishBtn from "./FinishBtn.svelte";

  let praecoxCalendarData = getContext("praecoxCalendarData");
</script>

<div class="header">
  <MonthTitle />
  <Prev />
  <Next />

  {#if $praecoxCalendarData.finishBtn}
    <FinishBtn />
  {/if}
</div>

<style>
  .header {
    display: flex;
    width: var(
      --praecox-calendar-custom-inner-width,
      var(--praecox-calendar-inner-width)
    );
    height: var(
      --praecox-calendar-custom-head-height,
      var(--praecox-calendar-head-height)
    );
  }
</style>
