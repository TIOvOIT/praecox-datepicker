*组件基于[component-template](https://github.com/sveltejs/component-template)构建*

---

# 简介

使用Svelte编写的日期选择器，简单灵活，支持单选、多选、禁用、标记等功能。



# 安装


```bash

npm install --save praecox-datepicker

```


# 使用


```javascript

import Datepicker from 'praecox-datepicker'

```

```html

<Datepicker/>

```


## API


|       API       	| 类型         	| 参数                                                                  	| 描述                                                                                                                                       	|
|:---------------:	|--------------	|-----------------------------------------------------------------------	|--------------------------------------------------------------------------------------------------------------------------------------------	|
| nowDate         	| DateObject   	|                                                                       	| 当前日期                                                                                                                                   	|
| i18n            	| String       	| 'EN'、'ZH'                                                            	| 多语言                                                                                                                                     	|
| theme           	| String       	| 'light'、'dark'                                                       	|                                                                                                                                            	|
| markDate        	| Array        	| ['2020-3-1','2020-3-2','2020-3-3'...]                                 	| 标记的日期集合                                                                                                                             	|
| disableDateRule 	| String       	| 'piecemeal'、'range'                                                  	| 禁用规则。'piecemeal'表示零碎的，不连续的；'range'表示为一个范围。                                                                         	|
| disableDate     	| Array/Object 	| ['2020-3-1','2020-3-2'...] or [{start:"2019-3-27"},{end:"2020-3-27"}] 	| 当disableDateRule为piecemeal时，格式为['2020-3-1','2020-3-2'...] 当disableDateRule为range时，格式为[{start:"2019-3-27"},{end:"2020-3-27"}] 	|
| pickerRule      	| String       	| 'singleChoice'、'freeChoice'、'rangeChoice'                           	| 选取规则：singleChoice（单选）、freeChoice（自由选择）、rangeChoice(范围选择)                                                              	|
| pickerResult    	|              	|                                                                       	| 选取结果，请与外部变量绑定来获取结果值                                                                                                     	|

## License


[MIT](https://github.com/Runningzs/praecox-datepicker/blob/master/LICENSE)# praecox-datepicker
