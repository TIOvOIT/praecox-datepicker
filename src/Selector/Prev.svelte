<script>
  import IconArrowBack from "../assets/@icons/ArrowBack.svelte";

  import { getContext } from "svelte";

  let viewYear = getContext("viewYear");
  let viewMonth = getContext("viewMonth");

  let view = getContext("thisView");
  let theme = getContext("theme");
  let i18n = getContext("i18n");
  const OPERAT_NAME = {
    EN: "Prev",
    ZH: "上一页"
  };

  function prevClick() {
    if ($view === "m") {
      if ($viewMonth === 1) {
        $viewMonth = 12;
        $viewYear = $viewYear - 1;
      } else {
        $viewMonth = $viewMonth - 1;
      }
    } else if ($view === "y") {
      $viewYear = $viewYear - 1;
    } else if ($view === "d") {
      $viewYear = $viewYear - 11;
    }
  }
</script>

<style>
  .prev_light,
  .prev_dark {
    width: 20%;
    line-height: 48px;
    text-align: center;
    fill: #b1b1b3;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
  }
  .prev_light:hover,
  .prev_dark:hover {
    fill: #0060df;
  }
  .prev_light:active,
  .prev_dark:active {
    fill: #0a84ff;
  }
  .prev_light .topButton,
  .prev_dark .topButton {
    width: 20px;
    margin: 0 auto;
  }

  .prev_dark {
    fill: #4a4a4f;
  }
  .prev_dark:hover {
    fill: #0060df;
  }
  .prev_dark:active {
    fill: #0a84ff;
  }
</style>

<div class={'prev_' + theme} on:click={prevClick} title={OPERAT_NAME[i18n]}>
  <div class=" topButton">
    <IconArrowBack />
  </div>
</div>
