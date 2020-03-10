//Is there a sixth week of the month
let thisMonthHasSixthWeek = false;

//Solar month
const SOLAR_MONTH = [1, 3, 5, 7, 8, 10, 12];

let thisDate;
let thisMonthDays;
let lastMonthOfYear;
let lastMonth;
let lastMonthDays;
let monthFirstDayDay;
let monthLastDayDay;
let nextMonthOfYear;
let nextMonth;

let theFirstWeek;
let theSecondWeek;
let theThirdWeek;
let theFourthWeek;
let fifthWeek;
let sixthWeek;

let thisYear;
let thisDay;
let thisMonth;

export const obtainWeeks = function (y, m, d) {
    thisDay = d;
    thisYear = y;
    thisMonth = m;
    //当前日期
    thisDate = dayIsIt(thisDay);
    //当前月天数
    thisMonthDays = computeMonthDays(thisYear, thisMonth);
    //上月所在年份
    lastMonthOfYear = computeLastMonth(thisYear, thisMonth)[0];
    //上月所在月份
    lastMonth = computeLastMonth(thisYear, thisMonth)[1]
    //下个月所在年份
    nextMonthOfYear = computeNextMonth(thisYear, thisMonth)[0];
    //下个所在月份
    nextMonth = computeNextMonth(thisYear, thisMonth)[1]

    //上月有几天
    lastMonthDays = computeMonthDays(lastMonthOfYear, lastMonth);
    //当月第一天是周几
    monthFirstDayDay = dayIsIt(1);
    //当月最后一天是周几
    monthLastDayDay = dayIsIt(thisMonthDays);

    //第一周
    theFirstWeek = computeFirstWeek();

    //第二周
    theSecondWeek = computeMidWeek(theFirstWeek[6].day + 1);

    //第三周
    theThirdWeek = computeMidWeek(theSecondWeek[6].day + 1);

    //第四周
    theFourthWeek = computeMidWeek(theThirdWeek[6].day + 1);

    //第五周
    switch (true) {
        case (thisMonthDays - theFourthWeek[6].day) === 7:
            fifthWeek = computeLastWeek(theFourthWeek[6].day + 1);
            thisMonthHasSixthWeek = true;
            break;
        case (thisMonthDays - theFourthWeek[6].day) > 7:
            fifthWeek = computeMidWeek(theFourthWeek[6].day + 1);
            thisMonthHasSixthWeek = true;
            break;
        default:
            fifthWeek = computeLastWeek(theFourthWeek[6].day + 1)
            thisMonthHasSixthWeek = false;
            break;
    }

    //第六周
    sixthWeek = thisMonthHasSixthWeek
        ? computeLastWeek(fifthWeek[6].day + 1)
        : computeMidWeek(fifthWeek[6].day + 1, true);
    return {
        theFirstWeek,
        theSecondWeek,
        theThirdWeek,
        theFourthWeek,
        fifthWeek,
        sixthWeek
    }

}

//判断大月
const isSolarMonth = function (m) { return !!~SOLAR_MONTH.indexOf(m) }

//判断闰年
const isLeapYear = function (y) { return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0 }

//计算是周几
const dayIsIt = function (n) {
    let _date = thisYear + '-' + thisMonth + '-' + n;
    let d = new Date(Date.parse(_date.replace(/\-/g, "/"))).getDay();
    return d === 0 ? 7 : d;
}

//判断某个月有几天
const computeMonthDays = function(y, m) {
    let d = NaN;
    if (isLeapYear(y) && m === 2) { d = 29; }
    else if (m === 2) { d = 28; }
    else if (isSolarMonth(m)) { d = 31; }
    else { d = 30; }
    return d;
}

//计算上个月和上个月所在的年份
const computeLastMonth = function(y, m) {
    let ly = NaN;
    let lm = NaN;
    if (m !== 1) { lm = m - 1; ly = y }
    else { lm = 12; ly = y - 1 }
    return [ly, lm]
}

//计算下个月和下个月所在的年份
const computeNextMonth = function(y, m) {
    let ny = NaN;
    let nm = NaN;
    if (m !== 12) { nm = m + 1; ny = y }
    else { nm = 1; ny = y + 1 }
    return [ny, nm]
}

//计算当月首周
const computeFirstWeek = function() {
    let array = [];
    array.length = 7;
    let i = 8 - monthFirstDayDay
    let times = monthFirstDayDay - 2
    for (let index = 0; index < array.length; index++) {
        array[index] = {
            "year": lastMonthOfYear == thisYear ? thisYear : thisYear - 1,
            "month": thisMonth == 1 ? 12 : thisMonth - 1,
            "day": lastMonthDays - times
        };
        times--
    }
    for (let index = 0; index < i; index++) {
        array[(7 - i) + index] = {
            "year": thisYear,
            "month": thisMonth,
            "day": index + 1
        };
    }

    return array
}

//计算其他周
const computeMidWeek = function(d, s) {
    let array = [];
    array.length = 7;
    if(s && thisMonth==12){
        for (let index = 0; index < array.length; index++) {
            array[index] = {
                "year": thisYear+1,
                "month": 1,
                "day": d + index
            };
        }
    }else{
        for (let index = 0; index < array.length; index++) {
            array[index] = {
                "year": thisYear,
                "month": thisMonthHasSixthWeek === false && s  ? thisMonth + 1 : thisMonth,
                "day": d + index
            };
        }
    }
    
    return array
}

//计算当月最后一周
const computeLastWeek = function(d) {
    let array = [];
    let times = thisMonthDays - d + 1
    for (let index = 0; index < times; index++) {
        array[index] = {
            "year": thisYear,
            "month": thisMonth,
            "day": d + index
        }
    }
    for (let index = 0; index < 7 - times; index++) {
        array[times + index] = {
            "year": nextMonthOfYear == thisYear ? thisYear : thisYear + 1,
            "month": nextMonth == 1 ? 1 : thisMonth + 1,
            "day": index + 1
        };
    }
    array.length = 7;
    return array
}
