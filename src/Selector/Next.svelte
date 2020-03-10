<script>
  import { getContext } from "svelte";

  let view = getContext("thisView");
  let viewYear = getContext("viewYear");
  let viewMonth = getContext("viewMonth");
  let theme = getContext("theme");

  function nextClick() {
    switch ($view) {
      case "m":
        if ($viewMonth === 12) {
          $viewMonth = 1;
          $viewYear = $viewYear + 1;
        } else {
          $viewMonth = $viewMonth + 1;
        }
        break;
      case "y":
        $viewYear = $viewYear + 1;
        break;
      case "d":
        $viewYear = $viewYear + 11;
        break;
      default:
        break;
    }
  }
</script>

<style>
.next_light, .next_dark {
  width: 20%;
  line-height: 30px;
  text-align: center;
  stroke: #b1b1b3;
  cursor: pointer;
}
.next_light:hover{
  background-color: rgba(10, 132, 255, 0.1);
  stroke: #0c0c0d;
  border-radius: 3px;
}
.next_dark {
  stroke: #4a4a4f;
}
.next_dark:hover {
  background-color: #003eaa;
  stroke: #f9f9fa;
  border-radius: 3px;
}
</style>

<div class={'next_' + theme} on:click={nextClick}>
 <svg xmlns='http://www.w3.org/2000/svg' width='20' height='30' viewBox='0 0 512 512'><polyline points='184 112 328 256 184 400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/></svg>
</div>
