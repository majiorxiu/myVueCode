// 常量表
import date from '../date-format';
const DATE_TODAY = date.getChangeDate();
const DATE_WITHIN_ONE_WEEK = date.getChangeDate({$d: -7});
const DATE_WITHIN_ONE_MONTH = date.getChangeDate({$m: -1});
const DATE_WITHIN_THREE_MONTH = date.getChangeDate({$m: -3});
const DATE_NEXT_ONE_WEEK = date.getChangeDate({$d: 7});
const DATE_NEXT_ONE_MONTH = date.getChangeDate({$m: 1});
const DATE_NEXT_THREE_MONTH = date.getChangeDate({$m: 3});
const TIME_STATR = ' 00:00:00'
const TIME_END = ' 23:59:59'
const ORIGINAL_THEME = '#409EFF'

export default {
  DATE_TODAY,
  DATE_WITHIN_ONE_WEEK,
  DATE_WITHIN_ONE_MONTH,
  DATE_WITHIN_THREE_MONTH,
  DATE_NEXT_ONE_WEEK,
  DATE_NEXT_ONE_MONTH,
  DATE_NEXT_THREE_MONTH,
  TIME_STATR,
  TIME_END,
  ORIGINAL_THEME
}