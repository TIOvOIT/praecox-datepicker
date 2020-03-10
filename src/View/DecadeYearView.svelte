<script>
  import { getContext } from "svelte";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let viewYear = getContext("viewYear");
  let thisView = getContext("thisView");
  let theme = getContext("theme");

  function updateYear(e) {
    $viewYear = +e.target.innerText;
    $thisView = "y";
  }
</script>

<table
  transition:scale={{ duration: 100, delay: 100, opacity: 0.1, start: 0.5, easing: quintOut }}>
  <tbody>
    <tr class={'YearView_' + theme}>
      <td on:click={updateYear}>{$viewYear}</td>
      <td on:click={updateYear}>{$viewYear + 1}</td>
      <td on:click={updateYear}>{$viewYear + 2}</td>
    </tr>
    <tr class={'YearView_' + theme}>
      <td on:click={updateYear}>{$viewYear + 3}</td>
      <td on:click={updateYear}>{$viewYear + 4}</td>
      <td on:click={updateYear}>{$viewYear + 5}</td>
    </tr>
    <tr class={'YearView_' + theme}>
      <td on:click={updateYear}>{$viewYear + 6}</td>
      <td on:click={updateYear}>{$viewYear + 7}</td>
      <td on:click={updateYear}>{$viewYear + 8}</td>
    </tr>
    <tr class={'YearView_' + theme}>
      <td on:click={updateYear}>{$viewYear + 9}</td>
      <td on:click={updateYear}>{$viewYear + 10}</td>
      <td on:click={updateYear}>{$viewYear + 11}</td>
    </tr>
  </tbody>
</table>

<style >

table {
  padding: 0;
  border-collapse: collapse;
  position: absolute;
  width: 301px;
}


tbody {
  padding: 0;
  width: 301px;
}

tr {
  padding: 0;
}

td, .YearView_light td, .YearView_dark td, .YearView_light .th_light, .YearView_light .th_dark, .th_dark, .th_light {
  display: inline-flex;
  padding: 0;
  height: 30px;
  width: 42.8px;
  line-height: 30px;
  justify-content: center;
  color: #b1b1b3;
  cursor: pointer;
  user-select: none;
}
td:hover{
  background-color: rgba(10, 132, 255, 0.1);
  color: #0c0c0d;
  border-radius: 3px;
}

.dark{
  color: #737373;
}
.dark:hover{
  background-color: #003eaa;
  color: #f9f9fa;
  border-radius: 3px;
}
.YearView_light, .YearView_dark {
  width: 100%;
  padding: 0;
  text-align: center;
}
.YearView_light td,  .YearView_dark td, .YearView_dark .endChosen_dark, .YearView_dark .endChosen_light, .YearView_dark .startChosen_dark, .YearView_dark .startChosen_light, .YearView_dark .selected_dark, .YearView_dark .selected_light, .YearView_dark .isFreeChosen_dark, .YearView_dark .isFreeChosen_light, .YearView_dark .isChosen_dark, .YearView_dark .isChosen_light, .YearView_light .th_light, .YearView_dark .th_light, .YearView_light .th_dark, .YearView_dark .th_dark {
  color: #0c0c0d;
  width: 32%;
  height: 52.5px;
  line-height: 52.5px;
}

.YearView_dark td, .YearView_dark .endChosen_dark, .YearView_dark .endChosen_light, .YearView_dark .startChosen_dark, .YearView_dark .startChosen_light, .YearView_dark .selected_dark, .YearView_dark .selected_light, .YearView_dark .isFreeChosen_dark, .YearView_dark .isFreeChosen_light, .YearView_dark .isChosen_dark, .YearView_dark .isChosen_light, .YearView_dark .th_light, .YearView_dark .th_dark {
  color: #ededf0;
}
.YearView_dark td:hover, .YearView_dark .endChosen_dark:hover, .YearView_dark .endChosen_light:hover, .YearView_dark .startChosen_dark:hover, .YearView_dark .startChosen_light:hover, .YearView_dark .selected_dark:hover, .YearView_dark .selected_light:hover, .YearView_dark .isFreeChosen_dark:hover, .YearView_dark .isFreeChosen_light:hover, .YearView_dark .isChosen_dark:hover, .YearView_dark .isChosen_light:hover, .YearView_dark .th_light:hover, .YearView_dark .th_dark:hover {
  background-color: #003eaa;
}
</style>