# Praecox-datepicker

A date picker built with Svelte.Simple and flexible, supporting functions such as single selection, multiple selection, disabling, and marking.

## Screenshot

Theme<br/>
<img alt='theme' src="https://github.com/Runningzs/praecox-datepicker/blob/master/img/1.jpg" width="100%">

## Demo

[Preview](https://svelte.dev/repl/f153bee994974251b59041832a099427?version=3.29.0)
[Multiple disabled](https://svelte.dev/repl/7fb09d23d741461b8e2c435c4c0d5ef1?version=3.29.0)
[Custom styles](https://svelte.dev/repl/1ddc67726a734df7a47421959e48e38a?version=3.29.0)

## Install

```bash

npm install --save praecox-datepicker

```

## Usage

```javascript
import Datepicker from "praecox-datepicker";
```

```html
<Datepicker />
```

## Props

| Props         | Type                                                            | Default            | Description                                                                                                                                                                                                                                                                                |
| ------------- | --------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| nowDate       | Date                                                            | new Date\(\)       | Current date                                                                                                                                                                                                                                                                               |
| lang          | "en" \| "zh" \| "ru" \|"es" \| "de" \| "it" \| "el"                                                    | "en"               | Language                                                                                                                                                                                                                                                                                   |
| viewDate      | Date                                                            | nowDate            | Current view date                                                                                                                                                                                                                                                                          |
| pickerRule    | "single" \| "range" \| "free"                                   | "single"           | Date picker mode                                                                                                                                                                                                                                                                           |
| disabled      | Date Array                                                      | \[\]               | Disable date. When the value type is not an array, the length is not `2`, and a single disabled mode is adopted. If it is `2` and the first value is smaller than the second value, it is a range disabled mode; when the value of `Array[0]` is an array , Can be disabled multiple times |
| selected      | string ｜ Array                                                 | \[\]               | Selected date, supports two-way binding, can be used to bind external results [Issues](https://github.com/TIOvOIT/praecox-datepicker/issues/4)                                                                                                                                             |
| marked        | Date Array                                                      | \[\]               | Date marked                                                                                                                                                                                                                                                                                |
| weekNameMode  | "weekShortAbbreviation" \| "weekAbbreviation" \| "weekFullName" | "weekAbbreviation" |                                                                                                                                                                                                                                                                                            |
| monthNameMode | "monthAbbreviation" \| "monthFullName"                          | "monthFullName"    |                                                                                                                                                                                                                                                                                            |
| theme         | "light" \| "dark"                                               | "light"            |                                                                                                                                                                                                                                                                                            |
| reSelected    | boolean                                                         | false              | When the range is selected, the value can be reset [Issues](https://github.com/TIOvOIT/praecox-datepicker/issues/3)   
| finishBtn    | boolean                                                         | true              | Used to control whether finishBtn is displayed
| reloadDisabled    | function                                                         | undefined              | External function that get used to reload the disabled array on Next/Prev action                                                                                                                                                                           |
| pickerDone    | boolean                                                         | false              | Binding with the `Finish` button to increase UE and facilitate control of the display, if finishBtn prop is false, do not use this prop.                                                                                                                                                                                                      |

## Built-in function

```javascript
import Datepicker, {
  formatDatestamp,
  getNextYearAndMonth,
  getPrevYearAndMonth,
  getThisMonthData,
  testDaysInTheMonth,
  testLeapYear,
  testSolarMonthOf31Days,
  thisMonthHasManyWeek,
  theDayOfTheWeek,
} from "praecox-datepicker";
```

## Custom styles

List of custom style variable names

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
