<script>
  import { getContext } from "svelte";
  //i18N
  let i18n = getContext("i18n");
  let theme = getContext("theme");

  const WEEK_NAME = {
    EN: [
      { id: 1, name: "Mon" },
      { id: 2, name: "Tue" },
      { id: 3, name: "Wed" },
      { id: 4, name: "Thu" },
      { id: 5, name: "Fri" },
      { id: 6, name: "Sat" },
      { id: 7, name: "Sun" }
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
  th {
    font-weight: 500;
    display: inline-flex;
    padding: 0;
    height: 30px;
    margin-bottom: 14px;
    width: 42.8px;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-size: 12px;
  }

  .th_light {
    color: #b1b1b3;
  }

  .th_dark {
    color: #4a4a4f;
  }
</style>

<thead>
  <tr>
    {#each WEEK_NAME[i18n] as item}
      <th class={'th_' + theme}>{item.name}</th>
    {/each}
  </tr>
</thead>
