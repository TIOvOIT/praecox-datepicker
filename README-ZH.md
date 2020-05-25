## 简介

使用 Svelte 编写的日期选择器，简单灵活，支持单选、多选、禁用、标记等功能。

## Demo

[Demo](https://svelte.dev/repl/e010922893964594a8a888aae1ec4fd5?version=3.19.2)

## 预览

<img alt='theme' src="https://github.com/Runningzs/praecox-datepicker/blob/master/img/1.jpg" width="100%">

## 安装

```bash

npm install --save praecox-datepicker

```

## 使用

```javascript
import Datepicker from "praecox-datepicker";
```

```html
<Datepicker />
```

## Props

|      Props      | 类型         | 参数                                                                  | 描述                                                                                                                                                   |
| :-------------: | ------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     nowDate     | DateObject   | new Date()                                                            | 当前日期                                                                                                                                               |
|      i18n       | String       | 'EN'、'ZH'                                                            | 多语言                                                                                                                                                 |
|      theme      | String       | 'light'、'dark'                                                       | 主题                                                                                                                                                   |
|    markDate     | Array        | ['2020-3-1','2020-3-2','2020-3-3'...]                                 | 标记的日期集合                                                                                                                                         |
| disableDateRule | String       | 'piecemeal'、'range'                                                  | 禁用规则。'piecemeal'表示零碎的，不连续的；'range'表示为一个范围。                                                                                     |
|   disableDate   | Array/Object | ['2020-3-1','2020-3-2'...] 或 [{start:"2019-3-27"},{end:"2020-3-27"}] | 当`disableDateRule`为`piecemeal`时，格式为`['2020-3-1','2020-3-2'...]` 当`disableDateRule`为`range`时，格式为`[{start:"2019-3-27"},{end:"2020-3-27"}]` |
|   pickerRule    | String       | 'singleChoice'、'freeChoice'、'rangeChoice'                           | 选取规则：singleChoice（单选）、freeChoice（自由选择）、rangeChoice(范围选择)                                                                          |
|  pickerResult   | Array        |                                                                       | 选取结果，请与外部变量绑定来获取结果值,结果值格式受选取规则影响                                                                                        |
|   pickerDone    | Boolean      |                                                                       | 用于与`完成`按钮绑定                                                                                                                                   |

## License

[MIT](https://github.com/Runningzs/praecox-datepicker/blob/master/LICENSE)
