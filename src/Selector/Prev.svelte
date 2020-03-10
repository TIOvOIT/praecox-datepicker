<script>
import {getContext} from 'svelte'

  let viewYear = getContext('viewYear')
  let viewMonth = getContext('viewMonth')

let view = getContext('thisView')
let theme = getContext('theme')
function prevClick(){
  if($view==='m'){
      if($viewMonth===1){
        $viewMonth=12
        $viewYear=$viewYear-1
      }else{
        $viewMonth= $viewMonth-1
      }
  }else if($view === 'y'){
    $viewYear = $viewYear-1
  }else if($view === 'd'){
     $viewYear = $viewYear-11
  }

}
</script>

<div
class="{'prev_'+theme}"
on:click={prevClick}>
 <svg xmlns='http://www.w3.org/2000/svg' width='20' height='30' viewBox='0 0 512 512'><polyline points='328 112 184 256 328 400' style='fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px'/></svg>
</div>

<style >
.prev_light, .prev_dark{
  width: 20%;
  line-height: 30px;
  text-align: center;
  stroke: #b1b1b3;
  cursor: pointer;
}
.prev_light:hover, .prev_dark:hover {
  background-color: rgba(10, 132, 255, 0.1);
  stroke: #0c0c0d;
  border-radius: 3px;
}
.prev_dark{
  stroke: #4a4a4f;
}
.prev_dark:hover {
  background-color: #003eaa;
   stroke: #f9f9fa;
}
</style>