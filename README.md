# Praecox-datepicker

A date picker built with Svelte.Simple and flexible, supporting functions such as single selection, multiple selection, disabling, and marking.

[中文](https://github.com/Runningzs/praecox-datepicker/blob/master/README-ZH.md)

## Screenshot

Theme<br/>
<img alt='theme' src="https://github.com/Runningzs/praecox-datepicker/blob/master/img/1.jpg" width="100%">

## Demo

[Demo](https://svelte.dev/repl/e010922893964594a8a888aae1ec4fd5?version=3.19.2)

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

|      name       | type         | value                                                                 | introduction                                                                                                                                                                                     |
| :-------------: | ------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     nowDate     | DateObject   | new Date()                                                            | Current date                                                                                                                                                                                     |
|      i18n       | String       | 'EN'、'ZH'                                                            | Internationalization                                                                                                                                                                             |
|      theme      | String       | 'light'、'dark'                                                       | Theme                                                                                                                                                                                            |
|    markDate     | Array        | ['2020-3-1','2020-3-2','2020-3-3'...]                                 | Marking date                                                                                                                                                                                     |
| disableDateRule | String       | 'piecemeal','range'                                                   | Disable date rule.`piecemeal` for nonsequence, `range` for sequence.                                                                                                                             |
|   disableDate   | Array/Object | ['2020-3-1','2020-3-2'...] or [{start:"2019-3-27"},{end:"2020-3-27"}] | When the `disableDateRule` is `piecemeal` ,The value format is `['2020-3-1','2020-3-2'...]`, When the `disableDateRule` is `range`,The value format is `[{start:"2019-3-27"},{end:"2020-3-27"}]` |
|   pickerRule    | String       | 'singleChoice','freeChoice','rangeChoice'                             | Pick rule                                                                                                                                                                                        |
|  pickerResult   | Array        |                                                                       | Pick result.Please bind with external variable to get the final result,Return value is time stamp.                                                                                               |
|   pickerDone    | Boolean      |                                                                       | Used to bind to the `Done` button.                                                                                                                                                               |

## License

[MIT](https://github.com/Runningzs/praecox-datepicker/blob/master/LICENSE)
