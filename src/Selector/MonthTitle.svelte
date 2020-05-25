<script>
  import { getContext } from "svelte";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  const OPERAT_NAME = {
    EN: "Switch view",
    ZH: "切换视图"
  };
  const MONTH_NAME = {
    EN: [
      { id: 1, name: "January" },
      { id: 2, name: "February" },
      { id: 3, name: "March" },
      { id: 4, name: "April" },
      { id: 5, name: "May" },
      { id: 6, name: "June" },
      { id: 7, name: "July" },
      { id: 8, name: "August" },
      { id: 9, name: "September" },
      { id: 10, name: "October" },
      { id: 11, name: "November" },
      { id: 12, name: "December" }
    ],
    ZH: [
      { id: 1, name: "一月" },
      { id: 2, name: "二月" },
      { id: 3, name: "三月" },
      { id: 4, name: "四月" },
      { id: 5, name: "五月" },
      { id: 6, name: "六月" },
      { id: 7, name: "七月" },
      { id: 8, name: "八月" },
      { id: 9, name: "九月" },
      { id: 10, name: "十月" },
      { id: 11, name: "十一月" },
      { id: 12, name: "十二月" }
    ]
  };

  let i18n = getContext("i18n");

  let viewMonth = getContext("viewMonth");
  let viewYear = getContext("viewYear");
  let thisView = getContext("thisView");
  let theme = getContext("theme");

  $: monthName =
    i18n === "ZH"
      ? $viewYear + "年 " + MONTH_NAME[i18n][$viewMonth - 1].name
      : MONTH_NAME[i18n][$viewMonth - 1].name + "  " + $viewYear;

  //切换视图
  function switchView() {
    if ($thisView === "m") {
      $thisView = "y";
    } else if ($thisView === "y") {
      $thisView = "d";
    } else if ($thisView === "d") {
      $thisView = "m";
    }
  }
</script>

<style>
  .titleBox {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
  }

  .monthTitle {
    width: 100%;
    position: absolute;
  }

  .monthTitle_light,
  .monthTitle_dark {
    width: 60%;
    line-height: 42px;
    text-align: center;
    color: #0c0c0d;
    user-select: none;
    cursor: pointer;
    font-weight: bolder;
    font-family: sans-serif;
    transition: background-color 0.2s ease-in-out 0s;
  }
  .monthTitle_light:hover,
  .monthTitle_dark:hover {
    background-color: #f5f8ff;
    color: #0a84ff;
    border-radius: 3px;
  }
  .monthTitle_light:active,
  .monthTitle_dark:active {
    background-color: #0060df;
    color: #f9f9fa;
  }

  .monthTitle_dark {
    color: #d7d7db;
  }
  .monthTitle_dark:hover {
    background-color: #38383d;
    color: #f9f9fa;
    border-radius: 3px;
  }
  .monthTitle_dark:active {
    background-color: #4a4a4f;
  }
</style>

<div
  class={'monthTitle_' + theme}
  on:click={switchView}
  title={OPERAT_NAME[i18n]}>
  <div class="titleBox">
    <div
      class="monthTitle"
      transition:fly={{ y: 20, opacity: 0.2, duration: 200, easing: quintOut }}>
      {#if $thisView === 'm'}
        {monthName}
      {:else if $thisView === 'y'}
        {$viewYear}
      {:else if $thisView === 'd'}{$viewYear}-{$viewYear + 11}{/if}
    </div>
  </div>
</div>
