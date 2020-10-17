## 简介

使用 Svelte 编写的日期选择器，简单灵活，支持单选、多选、禁用、标记等功能。

## Demo

[速览](https://svelte.dev/repl/f153bee994974251b59041832a099427?version=3.29.0)
[多重禁用](https://svelte.dev/repl/7fb09d23d741461b8e2c435c4c0d5ef1?version=3.29.0)
[自定义样式](https://svelte.dev/repl/1ddc67726a734df7a47421959e48e38a?version=3.29.0)

## 预览

<img alt='theme' src="https://github.com/Runningzs/praecox-datepicker/blob/master/img/1.jpg" width="100%">

## 安装

```bash

npm install --save praecox-datepicker

```

## 基本使用

```javascript
import Datepicker from "praecox-datepicker";
```

```html
<Datepicker />
```

## Props

| Props         | 类型                                                            | 参数               | 说明                                                                                                                                                |
| ------------- | --------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| nowDate       | Date                                                            | new Date\(\)       | 当前日期                                                                                                                                            |
| lang          | "en" \| "zh"                                                    | "en"               | 语言                                                                                                                                                |
| viewDate      | Date                                                            | nowDate            | 当前视图日期                                                                                                                                        |
| pickerRule    | "single" \| "range" \| "free"                                   | "single"           | 选取模式                                                                                                                                            |
| disabled      | Date Array                                                      | \[\]               | 禁用日期。当值类型不为数组时，长度不为 2，采取单个禁用模式，如果为 2 且第一个值比第二个值小，则为范围禁用模式；当 `Array[0]` 值为数组时，可多次禁用 |
| selected      | string ｜ Array                                                 | \[\]               | 已选择日期，支持双向绑定，可用以绑定外部结果 [Issues](https://github.com/TIOvOIT/praecox-datepicker/issues/4)                                       |
| marked        | Date Array                                                      | \[\]               | 已被标记日期                                                                                                                                        |
| weekNameMode  | "weekShortAbbreviation" \| "weekAbbreviation" \| "weekFullName" | "weekAbbreviation" |                                                                                                                                                     |
| monthNameMode | "monthAbbreviation" \| "monthFullName"                          | "monthFullName"    |                                                                                                                                                     |
| theme         | "light" \| "dark"                                               | "light"            |                                                                                                                                                     |
| reSelected    | boolean                                                         | false              | 范围选择时，值可以重置 [Issues](https://github.com/TIOvOIT/praecox-datepicker/issues/3)                                                             |
| pickerDone    | boolean                                                         | false              | 和`完成`按钮绑定，用以增加 UE，方便控制显示                                                                                                         |

## 内置函数

```javascript
formatDatetamp;
getNextYearAndMonth;
getPrevYearAndMonth;
getThisMonthData;
testDaysInTheMouth;
testLeapYear;
testSolarMonthOf31Days;
thisMonthHasManyWeek;
theDayOfTheWeek;
```

## 自定义样式

自定义样式变量名列表

```css
--praecox-calendar-custom-width: 330px;
--praecox-calendar-custom-height: 310px;
--praecox-calendar-custom-inner-width: 310px;
--praecox-calendar-custom-inner-height: 220px;
--praecox-calendar-custom-head-height: 48px;
--praecox-calendar-custom-icon-size: 20px;
--praecox-calendar-custom-border-radius: 3px;
--praecox-calendar-custom-font-family: sans-serif;
--praecox-calendar-custom-number-font-family: "Open Sans", sans-serif;

--praecox-calendar-custom-main-color: #0060df;
--praecox-calendar-custom-main-color-hover: #0a84ff;
--praecox-calendar-custom-main-color-active: #0060df;
--praecox-calendar-custom-focused-color: #12bc00;
--praecox-calendar-custom-adjunctive-color: rgba(0, 96, 223, 0.1);
--praecox-calendar-custom-secondary-color: rgba(0, 96, 223, 0.2);
--praecox-calendar-custom-selected-color: #002275;

--praecox-calendar-custom-weekend-color: #f9f9fa;
--praecox-calendar-custom-outsidemonth-color: #b1b1b3;
--praecox-calendar-custom-overbackground-color: #f5f8ff;

--praecox-calendar-custom-font-main-color: #181818;
--praecox-calendar-custom-font-disabled-color: #d7d7db;
--praecox-calendar-custom-font-secondary-color: #b1b1b3;

--praecox-calendar-custom-background: #ffffff;
--praecox-calendar-custom-background-hover: #f5f8ff;
--praecox-calendar-custom-border: 1px solid #ededf0;
--praecox-calendar-custom-boxshadow: 0px 1px solid #ededf0;
```

## License

[MIT](https://github.com/Runningzs/praecox-datepicker/blob/master/LICENSE)
