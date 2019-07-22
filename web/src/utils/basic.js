import utils from '@/utils/util'

/**
 * 常用方法，页面自动导入方式
 */
let basic = {};
/**
 * 格式化金钱,自动补充逗号
 * @param value
 * @param precision 位数
 * @returns {*}
 */
basic.toThousands = function (value, precision = 2) {
  if (!isNaN(value) && typeof value === 'number') {
    value = String(value)
  }
  if (isNaN(value) || value == null) value = '0.00'
  if (!isNaN(value) && utils.trimAll(value)) {
    let str = ''
    value = basic.toMoney(value, precision)
    const sum = value.split('.')
    sum[0] = new Number(sum[0]).toLocaleString()
    return sum.join('.')
  } else {
    return '0.00'
  }
};
/**
 * 对金钱补零
 * @param value
 * @param precision 位数
 * @returns {*}
 */
basic.toMoney = function (value, precision = 2) {
  const _value = Number(value).toFixed(precision)
  return isNaN(_value) ? (0).toFixed(precision) : _value
};

basic.moeryCard = function (value) {
  if (typeof(value) == 'number') return value
  if (!value) return value
  value = value.replace(/ /g, '')
  return value.replace(/([\d\D]{4})/g, '$1 ')
};

/**
 *  通过listId获得当前行
 * @param getData array
 * @param currentRow row
 */
basic.getCurrentRowByListId = function (getData, currentRow, callback) {
  if (utils.isEmpty(getData)) return;
  if (utils.isEmpty(currentRow)) return;
  if (typeof (callback) != "function") return;
  for (let row of getData) {
    if (row.listId && row.listId == currentRow.listId) {
      const flag = callback(row);
      if (flag == true) break;
    }
  }
};
/**
 * 根据关键字进行搜索过滤
 * @param dataTable
 * @param modelSearchFilter
 */
basic.searchFilterByFuzzyKeys = function (dataTable, modelSearchFilter) {
  if (!(dataTable && dataTable.length > 0)) {
    return [];
  }
  if (!(modelSearchFilter && modelSearchFilter.fuzzy && modelSearchFilter.fuzzyKeys)) {
    return dataTable;
  }
  return dataTable.filter(row => {
    return utils.searchFilterByFuzzyKeysRow(row, modelSearchFilter);
  });
}
/**
 * 搜索数据
 * @param row
 * @param modelSearchFilter
 * @returns {boolean}
 */
basic.searchFilterByFuzzyKeysRow = function (row, modelSearchFilter) {
  let isTrue = false;
  for (const value of modelSearchFilter.fuzzyKeys.split(',').values()) {
    if (row[value] && typeof row[value] == 'string' && row[value].toLowerCase().includes(modelSearchFilter.fuzzy.toLowerCase())) {
      isTrue = true;
      break;
    }
  }
  return isTrue;
};
/**
 * 获得日期
 * @param date
 */
basic.getDate = function (date) {
  return utils.date.format(date, 'YYYY-MM-DD hh:mm:ss');
}
/**
 * 验证文本
 * @param self
 * @param array
 * @returns {boolean}
 */
basic.valideFocus = function (self, array = []) {
  let isValided = true;
  if (!self.$refs) {
    isValided = false;
  } else {
    for (let value of array) {
      if (self.$refs[value] && !self.$refs[value].value) {
        self.$refs[value].focus();
        isValided = false;
        break;
      }
    }
  }
  return isValided;
};
basic.valideUrlParamsId=function (route) {
  if(route.params && route.params.id && route.params.id != '0'){
    return true;
  }else{
    return false;
  }
};
basic.loadAddAndDetailData = function (currentObj, callbackAdd, callbackDetail) {
  const cacheId = currentObj.app.cacheId;
  const id = currentObj.$route.params.id;
  if (currentObj.$route.params && currentObj.$route.params.id && currentObj.$route.params.id != '0') {
    if (typeof (callbackDetail) != "function") return;
    if (cacheId == '0') {
      callbackDetail(id);
    }
  } else if(currentObj.$route.params.detail) {
    if(currentObj.$route.params.detail != 'detail') {
      if (typeof (callbackDetail) != "function") return;
      if (cacheId == '0') {
        callbackDetail(id);
      }
    } else {
      if (typeof (callbackAdd) != "function") return;
      if (cacheId == '0') {
        callbackAdd();
      }
    }
  } else {
    if (typeof (callbackAdd) != "function") return;
    if (cacheId == '0') {
      callbackAdd();
    }
  }
};
/**
 * 父亲节点为禁用时，子级不能操作
 * @param row
 * @returns {boolean}
 */
basic.parentDisable = function (row) {
  if (row && row.id && row.id != '-1') {
    if (row.tree_parent && row.tree_parent.enable == '2') {
      return true
    }
  }
  return false
};
basic.computeSummaryData = function (array, keys = []) {
  let result = {};
  if (!utils.length(array)) return result;
  if (!utils.length(keys)) return result;
  if (utils.length(keys) >4) return result;
  if (keys.length > 0) result[keys[0]] = 0;
  if (keys.length > 1) result[keys[1]] = 0;
  if (keys.length > 2) result[keys[2]] = 0;
  if (keys.length > 3) result[keys[3]] = 0;
  for (let row of array) {
    if (keys.length > 0) result[keys[0]] += Number(row[keys[0]]);
    if (keys.length > 1) result[keys[1]] += Number(row[keys[1]]);
    if (keys.length > 2) result[keys[2]] += Number(row[keys[2]]);
    if (keys.length > 3) result[keys[3]] += Number(row[keys[3]]);
  }
  if (!result[keys[0]]) result[keys[0]] = "0.00";
  if (!result[keys[1]]) result[keys[1]] = "0.00";
  if (!result[keys[2]]) result[keys[2]] = "0.00";
  if (!result[keys[3]]) result[keys[3]] = "0.00";
  return result;
};
/**
 * 获得浏览器数据
 */
basic.getBrowser = function () {
  var userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.match(/msie ([\d.]+)/) != null) {
    uaMatch = userAgent.match(/msie ([\d.]+)/);
    return 'IE' + parseInt(uaMatch[1]);
  }
  else if (userAgent.match(/(trident)\/([\w.]+)/)) {
    uaMatch = userAgent.match(/(trident)\/([\w.]+)/);
    switch (uaMatch[1]) {
      case '4.0':
        return 'IE8';
        break;
      case '5.0':
        return 'IE9';
        break;
      case '6.0':
        return 'IE10';
        break;
      case '7.0':
        return 'IE11';
        break;
      default:
        return 'undefined';
    }
  } else if (userAgent.indexOf('firefox') > -1) {
    return 'firefox';
  } else if (userAgent.indexOf('chrome/30.0') > -1) {
    return 'chrome30';
  } else if (userAgent.indexOf('chrome') > -1) {
    return 'chrome';
  }
  return 'undefined';
};
/**
 *  判定是否是IE浏览器
 *  version: IE的版本
 */
basic.isIe = function (version) {
  var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
  if (!version) {
    return /msie/i.test(userAgent) || "ActiveXObject" in window;
  }
  if (version >= 11) {
    return "ActiveXObject" in window;
  }
  return new RegExp('msie ' + version).test(userAgent);
};
/**
 * 数字千分位格式化
 * @param num
 * @returns {string}
 */
basic.formatNumber = function (num) {
  // 对数字进行千分位格式化.
  return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
};

/**
 * 字节容量格式化
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
basic.formatByte = function (value, row, index) {
  //各字节容量大小
  var byte_1k = 1024;
  var byte_1M = byte_1k * byte_1k;
  var byte_1G = byte_1M * byte_1k;
  var byte_1T = byte_1G * byte_1k;
  if (value < byte_1k) {
    return basic.formatNumber(value) + "字节";
  } else if (value < byte_1M) {
    return basic.formatNumber((value / byte_1k).toFixed(2)) + "K";
  } else if (value < byte_1G) {
    return basic.formatNumber((value / byte_1M).toFixed(2)) + "M";
  } else if (value < byte_1T) {
    return basic.formatNumber((value / byte_1G).toFixed(2)) + "G";
  } else {
    return basic.formatNumber((value / byte_1T).toFixed(2)) + "T";
  }
};
/**
 *  将数值四舍五入后格式化.
 *  num 数值(Number或者String)
 *  isThousand 是否需要千分位 (boolean);
 *  cent 要保留的小数位(Number)
 *  return 格式的字符串,如'1,234,567.45'
 */
basic.formatNumber = function (num1, isThousand1, cent1) {
  var num = num1.toString().replace(/\$|\,/g, '');
  var isThousand = isThousand1 === false ? false : true;
  var cent = cent1 || 0;
  // 检查传入数值为数值类型
  if (isNaN(num))
    num = "0";

  // 获取符号(正/负数)
  sign = (num == (num = Math.abs(num)));

  num = Math.floor(num * Math.pow(10, cent) + 0.50000000001); // 把指定的小数位先转换成整数.多余的小数位四舍五入
  cents = num % Math.pow(10, cent); // 求出小数位数值
  num = Math.floor(num / Math.pow(10, cent)).toString(); // 求出整数位数值
  cents = cents.toString(); // 把小数位转换成字符串,以便求小数位长度

  // 补足小数位到指定的位数
  while (cents.length < cent)
    cents = "0" + cents;

  if (isThousand) {
    // 对整数部分进行千分位格式化.
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
  }

  if (cent > 0)
    return (((sign) ? '' : '-') + num + '.' + cents);
  else
    return (((sign) ? '' : '-') + num);
};
export default basic;
