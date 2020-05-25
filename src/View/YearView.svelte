<script>
  import { getContext } from "svelte";
  import { scale } from "svelte/transition";
  import { quintOut } from "svelte/easing";
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
  let thisView = getContext("thisView");
  let theme = getContext("theme");

  function changeMonth(e) {
    $viewMonth = +e.target.id;
    $thisView = "m";
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
    font-size: 14px;
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
      <td id={MONTH_NAME[i18n][0].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][0].name}
      </td>
      <td id={MONTH_NAME[i18n][1].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][1].name}
      </td>
      <td id={MONTH_NAME[i18n][2].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][2].name}
      </td>
    </tr>
    <tr class={'YearView_' + theme}>
      <td id={MONTH_NAME[i18n][3].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][3].name}
      </td>
      <td id={MONTH_NAME[i18n][4].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][4].name}
      </td>
      <td id={MONTH_NAME[i18n][5].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][5].name}
      </td>
    </tr>
    <tr class={'YearView_' + theme}>
      <td id={MONTH_NAME[i18n][6].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][6].name}
      </td>
      <td id={MONTH_NAME[i18n][7].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][7].name}
      </td>
      <td id={MONTH_NAME[i18n][8].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][8].name}
      </td>
    </tr>
    <tr class={'YearView_' + theme}>
      <td id={MONTH_NAME[i18n][9].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][9].name}
      </td>
      <td id={MONTH_NAME[i18n][10].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][10].name}
      </td>
      <td id={MONTH_NAME[i18n][11].id} on:click={changeMonth}>
        {MONTH_NAME[i18n][11].name}
      </td>
    </tr>
  </tbody>
</table>
