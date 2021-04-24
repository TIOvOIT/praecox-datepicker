//Solar month of 31 days.
const SOLAR_MONTH_OF_31_DAYS = [1, 3, 5, 7, 8, 10, 12];

/**
 * The day of the week.
 * @param {Date} n
 * @returns {number}
 */
export function theDayOfTheWeek(n) {
  let d = new Date(n).getDay();

  return d === 0 ? 7 : d;
}

/**
 * Format date stamp.
 * @param {Date} n
 * @param {string} f
 * @returns {string}
 */
export function formatDatetamp(n, f) {
  let d = new Date(n);
  let ty = d.getFullYear();
  let tm = d.getMonth() + 1;
  let td = d.getDate();
  let th = d.getHours();
  let tmin = d.getMinutes();
  let tse = d.getSeconds();

  let r = `${ty}-${tm}-${td}`;
  if (isNaN(d)) {
    return ""
  }
  switch (f) {
    case "ISO8601":
      r = `${ty}-${tm}-${td}T${th}:${tmin}:${tse}Z`;
      break;
    case "mm-yyyy" || "MM-YYYY":
      r = `${tm}-${ty}`;
      break;
    case "dd/mm/yy" || "DD/MM/YY":
      r = `${td}/${tm}/${ty.toString().slice(-2)}`;
      break;
    case "yyyy-mm-dd" || "YYYY-MM-DD":
      r = `${ty}-${tm}-${td}`;
      break;
    case "dd.mm.yyyy" || "DD.MM.YYYY":
      r = `${td}.${tm}.${ty}`;
      break;
    case "dd/mm/yyyy" || "DD/MM/YYYY":
      r = `${td}/${tm}/${ty}`;
      break;
    case "yyyy-mm-dd" || "YYYY-MM-DD":
      r = `${ty}-${tm}-${td}`;
      break;
    case "dd-mm-yy" || "DD-MM-YY":
      r = `${td}-${tm}-${ty.toString().slice(-2)}`;
      break;
    case "mm-dd-yy" || "MM-DD-YY":
      r = `${tm}-${td}-${ty.toString().slice(-2)}`;
      break;
    default:
      r = `${ty}-${tm}-${td}`;
      break;
  }
  return r;
}

/**
 * Test solar month of 31 days.
 * @param {number} m
 * @returns {boolean}
 */
export function testSolarMonthOf31Days(m) {
  return !!~SOLAR_MONTH_OF_31_DAYS.indexOf(m);
}

/**
 * Test leap year.
 * @param {number} y
 * @returns {boolean}
 */
export function testLeapYear(y) {
  return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
}

/**
 * Determine the number of days in the month.
 * @param {number} y
 * @param {number} m
 * @returns {number}
 */
export function testDaysInTheMouth(y, m) {
  let d = NaN;
  if (testLeapYear(y) && m === 2) {
    d = 29;
  } else if (m === 2) {
    d = 28;
  } else if (testSolarMonthOf31Days(m)) {
    d = 31;
  } else {
    d = 30;
  }
  return d;
}

/**
 * Get the year and month of the prev month.
 * @param {number} y
 * @param {number} m
 * @returns { [py:number, pm:number] }
 */
export function getPrevYearAndMonth(y, m) {
  let py = NaN;
  let pm = NaN;
  if (m !== 1) {
    pm = m - 1;
    py = y;
  } else {
    pm = 12;
    py = y - 1;
  }
  return [py, pm];
}

/**
 * Get the year and month of the next month.
 * @param {number} y
 * @param {number} m
 * @returns { [ny:number, nm:number] }
 */
export function getNextYearAndMonth(y, m) {
  let ny = NaN;
  let nm = NaN;
  if (m !== 12) {
    nm = m + 1;
    ny = y;
  } else {
    nm = 1;
    ny = y + 1;
  }
  return [ny, nm];
}

/**
 * Calculate how many weeks there are in this month
 * @param {Date} n
 * @returns { number }
 */
export function thisMonthHasManyWeek(n) {
  let td = new Date(n);
  let ty = td.getFullYear();
  let tm = td.getMonth() + 1;
  let dotw = theDayOfTheWeek(`${ty}-${tm}-1`);
  let days = testDaysInTheMouth(ty, tm);
  let firstWeekDays = 8 - dotw;
  let weekNum = Math.ceil((days - firstWeekDays) / 7 + 1);
  return weekNum;
}

/**
 * Get date data for the first week of the month
 * @param {Date} n
 * @returns { Array }
 */
export function getFirstWeekOfTheMonth(n) {
  let td = new Date(n);
  let ty = td.getFullYear();
  let tm = td.getMonth() + 1;
  let dotw = theDayOfTheWeek(`${ty}-${tm}-1`);
  let [py, pm] = getPrevYearAndMonth(ty, tm);
  let pmd = testDaysInTheMouth(py, pm);
  let firstWeekList = [];
  firstWeekList.length = 7;
  let i = 8 - dotw;
  let times = dotw - 2;
  for (let index = 0; index < firstWeekList.length; index++) {
    firstWeekList[index] = new Date(`${py == ty ? ty : ty - 1}-${tm == 1 ? 12 : tm - 1}-${pmd - times}`);
    times--;
  }
  for (let j = 0; j < i; j++) {
    firstWeekList[7 - i + j] = new Date(`${ty}-${tm}-${j + 1}`);
  }
  return firstWeekList;
}

/**
 * Get date data for the mid week of the month
 * @param {Date} n
 * @param {boolean} s
 * @returns { Array }
 */
export function getMidWeekOfTheMonth(n, s) {
  let td = new Date(+n + 24 * 60 * 60 * 1000);
  let ty = td.getFullYear();
  let tm = td.getMonth();
  let d = td.getDate();
  let midWeekList = [];
  midWeekList.length = 7;
  for (let index = 0; index < midWeekList.length; index++) {
    if (s && tm == 11) {
      midWeekList[index] = new Date(ty + 1, 1, d + index);
    } else {
      midWeekList[index] = new Date(ty, tm, d + index);
    }
  }
  return midWeekList;
}

/**
 * Get date data for the last week of the month
 * @param {Date} n
 * @returns { Array }
 */
export function getLastWeekOfTheMonth(n) {
  let td = new Date(+n + 24 * 60 * 60 * 1000);
  let ty = td.getFullYear();
  let tm = td.getMonth() + 1;
  let d = td.getDate();
  let [ny, nm] = getNextYearAndMonth(ty, tm);
  let lastWeekList = [];
  let cmd = testDaysInTheMouth(ty, tm);
  let times = cmd - d + 1;
  for (let index = 0; index < times; index++) {
    lastWeekList[index] = new Date(`${ty}-${tm}-${d + index}`);
  }
  for (let index = 0; index < 7 - times; index++) {
    lastWeekList[+times + index] = new Date(`${ny == ty ? ty : ty + 1}-${nm == 1 ? 1 : tm + 1}-${index + 1}`);
  }
  lastWeekList.length = 7;
  return lastWeekList;
}

/**
 * Get weekly data for the month of the specified date.
 * @param {Date} n
 * @returns { Array }
 */
export function getThisMonthData(n) {
  let td = new Date(n);
  let ty = td.getFullYear();
  let tm = td.getMonth() + 1;
  let d = td.getDate();
  let [ny, nm] = getNextYearAndMonth(ty, tm);
  let cmd = testDaysInTheMouth(ty, tm);
  //The first week
  let theFirstWeek = getFirstWeekOfTheMonth(n);
  //The second week
  let theSecondWeek = getMidWeekOfTheMonth(theFirstWeek[6]);
  //The third week
  let theThirdWeek = getMidWeekOfTheMonth(theSecondWeek[6]);
  //The fourth week
  let theFourthWeek = getMidWeekOfTheMonth(theThirdWeek[6]);
  //The fifth week
  let fifthWeek;
  let hasSixthWeek;
  switch (true) {
    case cmd - new Date(theFourthWeek[6]).getDate() === 7:
      fifthWeek = getLastWeekOfTheMonth(theFourthWeek[6]);
      hasSixthWeek = true;
      break;
    case cmd - new Date(theFourthWeek[6]).getDate() > 7:
      fifthWeek = getMidWeekOfTheMonth(theFourthWeek[6]);
      hasSixthWeek = true;
      break;
    default:
      fifthWeek = getLastWeekOfTheMonth(theFourthWeek[6]);
      hasSixthWeek = false;
      break;
  }
  //The sixth week
  let sixthWeek = hasSixthWeek ? getLastWeekOfTheMonth(fifthWeek[6]) : getMidWeekOfTheMonth(fifthWeek[6], tm !== 11);
  return [theFirstWeek, theSecondWeek, theThirdWeek, theFourthWeek, fifthWeek, sixthWeek];
}