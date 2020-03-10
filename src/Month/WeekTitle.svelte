<script>
  import { getContext } from "svelte";
  //i18N
  let i18n = getContext("i18n");
  let theme = getContext("theme");

  const WEEK_NAME = {
    EN: [
      { id: 1, name: "MON" },
      { id: 2, name: "TUE" },
      { id: 3, name: "WED" },
      { id: 4, name: "THU" },
      { id: 5, name: "FRI" },
      { id: 6, name: "SAT" },
      { id: 7, name: "SUN" }
    ],
    ZH: [
      { id: 1, name: "一" },
      { id: 2, name: "二" },
      { id: 3, name: "三" },
      { id: 4, name: "四" },
      { id: 5, name: "五" },
      { id: 6, name: "六" },
      { id: 7, name: "日" }
    ]
  };
</script>

<style>
  thead {
    padding: 0;
    width: 301px;
  }
  tr {
    padding: 0;
  }
  .th_dark,
  .th_light {
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
  th {
    font-weight: 500;
  }

  .th_light:hover {
    background: none;
    color: #0c0c0d;
  }

  .th_dark {
    color: #4a4a4f;
  }
  .th_dark:hover {
    background: none;
    color: rgb(207, 207, 207);
    border-radius: 3px;
  }
</style>

<thead>
  <tr>
    {#each WEEK_NAME[i18n] as item}
      <th class={'th_' + theme}>{item.name}</th>
    {/each}
  </tr>
</thead>

