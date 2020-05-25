<script>
  import IconArrowForward from "../assets/@icons/ArrowForward.svelte";

  import { getContext } from "svelte";

  let view = getContext("thisView");
  let viewYear = getContext("viewYear");
  let viewMonth = getContext("viewMonth");
  let theme = getContext("theme");
  let i18n = getContext("i18n");
  const OPERAT_NAME = {
    EN: "Next",
    ZH: "下一页"
  };

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
  .next_light,
  .next_dark {
    width: 20%;
    line-height: 48px;
    text-align: center;
    fill: #b1b1b3;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
  }
  .next_light:hover,
  .next_dark:hover {
    fill: #0060df;
  }
  .next_light:active,
  .next_dark:active {
    fill: #0a84ff;
  }
  .next_light .topButton,
  .next_dark .topButton {
    width: 20px;
    margin: 0 auto;
  }

  .next_dark {
    fill: #4a4a4f;
  }
  .next_dark:hover {
    fill: #0060df;
  }
  .next_dark:active {
    fill: #0a84ff;
  }
</style>

<div class={'next_' + theme} on:click={nextClick} title={OPERAT_NAME[i18n]}>
  <div class=" topButton">
    <IconArrowForward />
  </div>
</div>
