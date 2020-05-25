<script>
  import IconCheckmark from "../assets/@icons/Checkmark.svelte";

  import { getContext, onMount } from "svelte";
  let theme = getContext("theme");

  export let pickerDone = false;

  const FINISH_NAME = {
    EN: "Done",
    ZH: "完成"
  };

  let i18n = getContext("i18n");
  function handleClick() {
    pickerDone = true;
  }
  onMount(() => {
    pickerDone = false;
  });
</script>

<style>
  .finish_light,
  .finish_dark {
    width: 20%;
    line-height: 48px;
    text-align: center;
    fill: #b1b1b3;
    cursor: pointer;
    transition: all 0.2s ease-in-out 0s;
  }
  .finish_light:hover,
  .finish_dark:hover {
    fill: #0060df;
  }
  .finish_light:active,
  .finish_dark:active {
    fill: #0a84ff;
  }
  .finish_light .topButton,
  .finish_dark .topButton {
    width: 20px;
    margin: 0 auto;
  }

  .finish_dark {
    fill: #4a4a4f;
  }
  .finish_dark:hover {
    fill: #0060df;
  }
  .finish_dark:active {
    fill: #0a84ff;
  }
</style>

<div class={'finish_' + theme} on:click={handleClick} title={FINISH_NAME[i18n]}>
  <div class=" topButton">
    <IconCheckmark />
  </div>
</div>
