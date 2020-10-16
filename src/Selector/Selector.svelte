<script>
  import MonthTitle from "./MonthTitle.svelte";
  import Prev from "./Prev.svelte";
  import Next from "./Next.svelte";
  import FinishBtn from "./FinishBtn.svelte";
</script>

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

<div class="header">
  <MonthTitle />
  <Prev />
  <Next />

  <FinishBtn />

</div>
