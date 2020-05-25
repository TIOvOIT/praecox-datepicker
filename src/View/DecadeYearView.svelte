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

<style>
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

  td {
    display: inline-flex;
    padding: 0;
    height: 30px;
    width: 42.8px;
    line-height: 30px;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  }

  .YearView_light,
  .YearView_dark {
    width: 100%;
    padding: 0;
    text-align: center;
  }
  .YearView_light td,
  .YearView_dark td {
    color: #737373;
    width: 32%;
    height: 57px;
    line-height: 57px;
    font-size: 13px;
    transition: all 0.2s ease-in-out 0s;
  }
  .YearView_light td:hover,
  .YearView_dark td:hover {
    background-color: #f5f8ff;
    color: #0a84ff;
    border-radius: 3px;
  }
  .YearView_light td:active,
  .YearView_dark td:active {
    background-color: #0060df;
    color: #ffffff;
  }

  .YearView_dark td:hover {
    background-color: #38383d;
    color: #f9f9fa;
    border-radius: 3px;
  }
  .YearView_dark td:active {
    background-color: #0a84ff;
    color: #ffffff;
  }
</style>

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
