<script>
  import MonthTitle from "./MonthTitle.svelte";
  import Prev from "./Prev.svelte";
  import Next from "./Next.svelte";
  import FinishBtn from "./FinishBtn.svelte";

  export let pickerDone = false;
</script>

<style>
  .header {
    display: flex;
    width: 301px;
    height: 50px;
    padding: 4px 0 4px 0;
  }
</style>

<div class="header">
  <MonthTitle />
  <Prev />
  <Next />

  <FinishBtn bind:pickerDone />

</div>
