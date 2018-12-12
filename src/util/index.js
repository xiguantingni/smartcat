/**
 * Created by RCC on 2018/6/28.
 * 常用方法
 */
// 'use strict';
export const findInArray = (arr, item) => {
    for (let i = 0; i < arr.length; i ++) {
        if (item === arr[i]) {
            return i;
        }
    }
    return -1;
};

export const getBrowser = () => {
    let Sys = {};
    const ua = navigator.userAgent.toLowerCase();
    let s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] : (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] : (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (Sys.ie) return ('IE:' + Sys.ie);
    if (Sys.edge) return ('EDGE:' + Sys.edge);
    if (Sys.firefox) return ('Firefox:' + Sys.firefox);
    if (Sys.chrome) return ('Chrome:' + Sys.chrome);
    if (Sys.opera) return ('Opera:' + Sys.opera);
    if (Sys.safari) return ('Safari:' + Sys.safari);
    return '';
};

// 常用正则
export const regex = {
    isName: /^[\u4E00-\u9FA5A-Za-z0-9_]{2,20}$/, // 2~20字符，支持英文大小写、数字、中文以及下划线
    isPassword: /^[\S]{6,20}$/, // 6-20字符，必须包含英文大小写、数字；另外支持符号
    isTel: /^(?:(?:0\d{2,3}[- ]?[1-9]\d{6,7})|(?:[48]00[- ]?[1-9]\d{6}))$/,
    isMobile: /^1[3-9]\d{9}$/,
    isEmail: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    isIdentifyCode: /^\d{6}$/,
    isPositiveInteger: /^\+?[1-9][0-9]*$/,
    isNumber: /^\d+$/,
    isIP: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/,
    isPort: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
    isCidr: /^((0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])\.){3}(0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])\/(\d|[12][0-9]|3[0-2])$/, // 0.0.0.0/32
    isCidr2: /^((0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])\.){3}(0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])\/(\d|[12][0-9])$/, // 0.0.0.0/29 子网掩码最大29
    isMask: /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/,
    isWeight: /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|[1-9])$/, // 1~255,
    isUrl: /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig
};

//浅复制
export const  assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};
const  has = Object.prototype.hasOwnProperty;

//数组转对象
export const  arrayToObject = function arrayToObject(source) {
    const obj = Object.create(null);
    for (let i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }
    return obj;
};

//深复制
export const merge = function merge(target, source) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (!has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    let mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = arrayToObject(target);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = merge(target[i], item);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        let value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

// 判断变量类型
export const judgeType = (obj) => {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
};

// 深拷贝2
export const deepClone = (data) => {
    const type = this.judgeType(data);
    let obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        return data;
    }
    if (type === 'array') {
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === 'object') {
        for (const key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
};

//获取路径参数
export const parseUrlParams =  (query  = window.location.search)  => {
    let vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
            vars[key] = value;
        });
    return vars;
};

/*
    * method 生成传参路径
    * object 传入对象 可以是 数组 对象 多层嵌套对象
    * opts 配置对象
    *   addQueryPrefix boolean 是否带？
    *   delimiter: &
    *   skipNulls 是否跳过null值
    *   示例
    *       stringify({
                id: 1,
                pa: 'jkhgf',
                he: null,
                tArr: [1,3,4,5],
                ob: {
                    hell: 13,
                    lf: '324',
                    arr: ['xxx','dfsf'],
                    test: {
                        hehh: 1324,
                        wo: '林'
                    }
                }
            }, {
                addQueryPrefix: true,
            }))
     * 输出 ?id=1&pa=jkhgf&he=&tArr=1,3,4,5&hell=13&lf=324&arr=xxx,dfsf&hehh=1324&wo=林
 */
export const stringify = ( object, opts ) => {
    const obj = object;
    const _default = {
        addQueryPrefix: false,
        delimiter: '&',
        skipNulls: false,
    };
    const tmpOpts = opts ? assign({}, opts): {};
    const _options = {
        ..._default,
        ...tmpOpts,
    };
    const { skipNulls, delimiter, addQueryPrefix } = _options;

    //处理数组的 自动加， 如有需求再加
    const generateArrayPrefix = (array = []) => {
        return array.length > 0?array.join(','):'';
    };

    //对象不存在返回''
    if (typeof obj !== 'object' || obj === null) {
        return '';
    };
    let objKeys;
    let keys = [];

    if(!objKeys) {
        objKeys = Object.keys(obj);//获取对象的keys
    }

    //递归函数
    const recursion = (object, prefix) => {
        let obj = object;
        if(obj === null) {
            obj = '';
        }

        let values = [];
        let objKeys;
        //如果是字符串或者数字 或者boolean类型
        if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
            return [prefix + '=' + String(obj)];
        }

        if(!objKeys) {
            objKeys = Object.keys(obj);//获取对象的keys
        }
        //循环获取参数
        for (let i = 0; i < objKeys.length; ++i) {
            const key = objKeys[i];
            if(skipNulls && obj[key]  === null) {
                continue;
            }
            if(Array.isArray(obj[key])) {
                values = values.concat(recursion(
                    generateArrayPrefix(obj[key]),
                    key
                ))
            } else {
                values = values.concat(recursion(
                    obj[key],
                    key
                ))
            }
        }
        return values;
    };

    //循环获取参数
    for (let i = 0; i < objKeys.length; ++i) {
        const key = objKeys[i];
        if(skipNulls && obj[key]  === null) {
               continue;
        }
        if(Array.isArray(obj[key])) {
            keys = keys.concat(recursion(
                generateArrayPrefix(obj[key]),
                key
            ))
        } else {
            keys = keys.concat(recursion(
                obj[key],
                key
            ))
        }
    }

    //根据keys生成字符串，判断是否需要加?
    const joined = keys.join(delimiter);
    const prefix = addQueryPrefix?'?':'';
    return joined.length > 0 ? prefix + joined : '';
};

/*
    * method 获取容量
    * unit 单位
    * decimal 小数点保留
 */
export const formatVolume = ( byte, unit = 'AUTO', decimal = 2 ) => {
    const ENUM = {
        B: 0,//字节
        KB: 1,//kb
        MB: 2,//
        GB: 3,
        TB: 4
    };
    const UNENUM = {
        0: `B`,
        1: 'KB',
        2: 'MB',
        3: 'GB',
        4: 'TB'
    };
    let total;
    let pow; //保存几次方
    //判断是否为正常数字
    if(!(Number.isNaN(byte) === false?total = Number(byte):0)) {
        return '0B';
    }
    //存在unit 获取指定单位 否 自动换算单位
    if( 'AUTO' !== unit) {
        pow = ENUM[unit];//获取指定单位要次方几次
        let tmp =  Math.pow(1024, pow);
        const result = total / tmp;
        //计算 0.0000000001这种情况 保证有效数字
        const compare = result * Math.pow(10, decimal);
        //如果是0.01这种 不需要处理
        if( Number(compare) > 0) {
            return `${result.toFixed(decimal)}${unit}`;
        } else {
            for(let i = decimal + 1;i<100;i++) {
                const compare = result * Math.pow(10, i);
                if(Number(compare) > 0) {
                    return `${compare.toFixed(decimal)}e+${i} ` + unit;
                }
            }
        }
    } else {
        let str;

        //自动生成单位模块
        const repeat = (total, i) => {
            const t = Math.pow(1024, i);
            //如果大于当前单位 继续递归
            if((total / t) >= 1024) {
                repeat(total, ++i);
            } else {
                str = (total / t).toFixed(decimal) + UNENUM[i];
            }
        };

        repeat(total, 0);
        return str?str: `${total} B`;
    }
};

//转换万
export const formatTenThousand = ( byte, decimal = 2 ) => {
    const ENUM = {
        B: 0,//字节
        KB: 1,//kb
        MB: 2,//
    };
    const UNENUM = {
        0: ``,
        1: '万',
        2: '亿',

    };
    let total;
    let pow; //保存几次方
    //判断是否为正常数字
    if(!(Number.isNaN(byte) === false?total = Number(byte):0)) {
        return '0';
    }
    let str;

    //自动生成单位模块
    const repeat = (total, i) => {
        const t = Math.pow(10000, i);
        //如果大于当前单位 继续递归
        if((total / t) >= 10000) {
            repeat(total, ++i);
        } else {
            str = (total / t).toFixed(decimal) + UNENUM[i];
        }
    };

    repeat(total, 0);
    return str?str: `${total}`;
};

/*
    * method 时间工具
    * params
    *   date 只支持时间戳
    * dist
    *   toFullDate  获取完整的时间-精确到秒 2018-8-3 11:02:45
    *   toHour      获取时间分钟            11:02
    *   toSimpleDay 获取简单的时间-精确到天 2018-8-3
 */
function DateFormatFn(date) {
    if(!(this instanceof  DateFormat)) {
        return new DateFormat(date)
    }
    //自动补位函数
    const autoFill = num => {
      return num < 10 ? `0${num}`:num;
    };
    let datetime = date;
    if(!date) {
        datetime = (new Date()).valueOf();
    }
    //php时间戳可能为10位数 自动*100  parseInt 去除多余的小数点
    if(String(parseInt(datetime)).toString().length === 10)
        datetime *= 1000;

    const dist = new Date(datetime);
    this.datetime = datetime;
    this.year = dist.getFullYear();  // 获取完整的年份(4位,1970)
    this.month = autoFill(dist.getMonth() + 1);// 获取月份(0-11,0代表1月,用的时候记得加上1)
    this.day = autoFill(dist.getDate());//获取日(1-31)
    this.hour = autoFill(dist.getHours());  // 获取小时数(0-23)
    this.minutes = autoFill(dist.getMinutes());  // 获取分钟数(0-59)
    this.seconds = autoFill(dist.getSeconds());  // 获取秒数(0-59)
}
DateFormatFn.prototype = {
    constructor: DateFormat,
    toFullDate: function() {
        return this.year + '-' + this.month + '-' + this.day + ' ' + this.hour + ':' + this.minutes + ':' + this.seconds;
    },
    toHour: function() {
        return this.hour + ':' + this.minutes;
    },
    toSimpleDay: function() {
        return this.year + '-' + this.month + '-' + this.day;
    },
    toDayHour: function() {
        return this.month + '-' + this.day;
    },
    toDayHourMinute: function() {
        return this.month + '-' + this.day + " " + this.hour + ":" + this.minutes;
    },
    //根据类型计算开始时间戳 返回10位数秒级
    toTimeDifference: function (type = 'hour', num = 1) {
        const decimal = {
            'day': 1000 * 60 * 60 * 24,
            'hour': 1000 * 60 * 60,
            'minute': 1000 * 60,
        }[type];
        return {
            start:  String(this.datetime - decimal * num).substring(0, 10),//计算开始时间,
            end: String(this.datetime).substring(0, 10),
        };
    }
};
export const DateFormat = DateFormatFn;

//计算百分比  返回 10.00%
export const percent = ( dividend, divisor, decimal = 2 ) => {
    if(dividend === 0) {
        return '0%';
    }
    return `${( dividend / divisor * 100).toFixed(decimal)}%`;
};
//map转换成数组
export const mapIterator = (map, cb) => {
    const agg = [];
    for(let key in map) {
        agg.push(cb(map[key], key));
    }
    return agg;
};

//将current转换成page pageSize转换成limit
export const parsePagination = ( pagination ) => {
    const result = merge({}, pagination);
    if(result.hasOwnProperty('current')) {
        result.page = result.current;
        delete result.current;
    }
    if(result.hasOwnProperty('pageSize')) {
        result.limit = result.pageSize;
        delete result.pageSize;
    }
    if(result.hasOwnProperty('field')) {
        result.sort_key = result.filed;
        delete result.filed;
    }
    return  result;
};

//转换排序等字段
export const parseSort = ( sort ) => {
    const result = merge({}, sort);
    if(result.hasOwnProperty('field')) {
        result.sort_key = result.field;
        delete result.field;
    }
    if(result.hasOwnProperty('order')) {
        result.sort_value = result.order === 'descend'?'desc':'asc';
        delete result.order;
    }
    return  result;
};

//存储池转换排序等字段
export const parsePoolSort = ( sort ) => {
    const result = merge({}, sort);
    if(result.hasOwnProperty('field')) {
        result.sort_name = result.field;
        delete result.field;
    }
    if(result.hasOwnProperty('order')) {
        result.sort_direction = result.order === 'descend'?'down':'up';
        delete result.order;
    }
    return  result;
};

//处理可视化的图表数据
export const formatVisualizationData = (print = {}, time_type = 'hour,1') => {
    if(!print) {
        print = {};
    }
    let xData = [];
    let seriesData = [];
    let values = [];
    if(print.hasOwnProperty('values')){
        values = print.values ? print.values: [];
    }
    values.map(value => {
        // if(time_type.includes('hour')) {
        //         //     xData.push(DateFormat(value[0]).toHour());
        //         // } else {
        //         //     xData.push(DateFormat(value[0]).toDayHour());
        //         // }
        xData.push(value[0]);
        seriesData.push(value[1]);
    });
    return {
        xContext: xData,
       seriesData,
    };
};

//处理简易可视化数据
export const formatSimpleData = (print = []) => {
    if(!print) {
        print = [];
    }
    let xData = [];
    let seriesData = [];
    print.map(item => {
        xData.push(item[0]);
        seriesData.push([item[0], item[1] > 0?item[1]:0]);
    });
    return {
        xContext: xData,
        seriesData,
    };
};

//安全获取参数 指定返回参数
export const safeParse = (key, target = {}, def = {}) => {
    if(Array.isArray(target) && target[key]) {
        return target[key];
    } else if(target.hasOwnProperty(key)) {
        return target[key];
    } else {
        return def;
    }
};

// 文件下载
export const downloadFile = (url) => {
    var _frame = document.createElement("iframe");
    _frame.src = url;
    _frame.style.display = "none";
    document.body.appendChild(_frame);
};
