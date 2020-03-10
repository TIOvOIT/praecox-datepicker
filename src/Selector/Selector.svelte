
<script>
import MonthTitle from './MonthTitle.svelte';
import Prev from './Prev.svelte';
import Next from './Next.svelte';
</script>

<div class="header">
<Prev />
<MonthTitle />
<Next/>
</div>

<style >
.header {
  display: flex;
  width: 301px;
  height: 30px;
  padding-bottom: 4px;
}
</style>