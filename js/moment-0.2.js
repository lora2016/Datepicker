;(function(global, factory) {
    
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory
    
})(this, function() {
    
    //基础方法
    var date,
        dateJson = {};
    
    var _ = {
        split: function(str, symbol) {
            return str.split(symbol);
        },
        join: function(arr, symbol) {
            return arr.join(symbol);
        },
        addZero: function(n) {
            return n < 10? '0' + n : n;
        },
        getDate: function() {
            var arg = arguments;
       
            if (arg[0]) {
                
                if (Array.isArray(arg[0])) {
                    arg = arg[0]
                }
                //没有找到其他方式 
                for (var i = 0; i < 6; i++) {
                    arg[i]? arg[i] : arg[i] = 0
                }
                
                //arg[2] == 0? arg[2] = 1 : arg[2]; 
                
                var dateTime = arg[1] + ' ' + arg[2] + ',' + arg[0] + ' ' + arg[3] + ':' + arg[4] + ':' + arg[5];
                
                
                return new Date(dateTime)
            };
            return new Date();
        },
        getTime: function(date) {
            return date.getTime();
        },
        getFirstArg: function(arg) {
            return Array.prototype.shift.call(arg)
        },
        each: function(arr, cb) {
            for(var i = 0, len = arr.length; i < len; i++) {
                cb.call(cb, arr[i], i)
            }
        }
    };
    
    //获取分析传入值
    var _analysis = function() {
        //eg  2016-08-01 , 08-01 , 2016-08-01 , 22:10:10 , 08-01 22:10:10
        var day,
            arr,
            arr2,
            newArr,
            n = _.getFirstArg(arguments);
    
        if (!n) return _.getTime(_.getDate());
        
        day = _.split(n, ' ');
        
        arr = _.split(day[0], '-');
        
        if (/:/.test(arr[0])) {
            throw 'year is muset'
        }
        
        if (arr.length < 3) {
            for(var i = 0; i < 3; i++) {
                arr[i]? arr[i] : arr[i] = 0;
            }
        }
        
        day[1]? arr2 = _.split(day[1], ':') : arr2 = [];
        
        newArr = arr.concat(arr2);

        _.each(newArr, function(key, i) {
            newArr[i] = parseInt(key)
        });
  
        return _.getTime(_.getDate(newArr)); 

    };
    
    //全局参数 arguments or date
    var globalArg = _.getFirstArg(arguments);
    
    if (globalArg) {
        
        if (typeof globalArg === 'string') {
            
            throw 'this arguments must be number'
            return false;
            
        } else if (typeof globalArg === 'number') {
            
            date = new Date(globalArg);

        };
    } else {
        date = _.getDate();
    };
    
    //获取时间 
    
    var TimeArr = ['getTime',
                   'getFullYear',
                   'getMonth',
                   'getDate',
                   'getDay',
                   'getHours', 
                   'getMinutes', 
                   'getSeconds'];
    
    _.each(TimeArr, function(key, i) {
        dateJson[key] = date[key]();
    });
    
    
    //获取单月总天数
    var _getDay = (function() {

        return new Date(dateJson.getFullYear, dateJson.getMonth + 1, 0).getDate()
    })();
    
    
    //输出差值
    var _subtract = function() {
        var arg = arguments;
        return _analysis(arg[0]) - _analysis(arg[1])
    };
    
    //输出对比 返回bl
    
    var _contrast = function() {
        var arg = arguments;
        return _subtract(arg[0], arg[1]) > 0
    };
    
    //时间格式化
    var _formate = function() {
        //eg: YYYY-MM YYYY-MM-DD YYYY-MM-DD hh:mm:ss
        var arg = _.getFirstArg(arguments);
        
        var date = dateJson;
        var dataRg = {
            'M+': date.getMonth + 1,
            'D+': date.getDate,
            'h+': date.getHours,
            'm+': date.getMinutes,
            's+': date.getSeconds
        }
        
        if (/(Y+)/.test(arg)) {
            arg = arg.replace(RegExp.$1, (date.getFullYear + '').substr(4 - RegExp.$1.length) )
        }
            
        for (var i in  dataRg) {
            if (new RegExp('('+ i +')').test(arg)) {
                arg = arg.replace(RegExp.$1, (RegExp.$1.length === 1)? (dataRg[i]) : (('' +_.addZero(dataRg[i])).substr(('' + dataRg[i].length))));
            }
        }    

        return arg;
    }
    
    // 输出方法
    var methods = {
        formate: _formate, 
        contrast: _contrast,
        subtract: _subtract,           
        analysis: _analysis,
        getDay: _getDay, 
        getTime: dateJson.getTime,
        week: dateJson.getDay,
        year: dateJson.getFullYear,
        month: dateJson.getMonth + 1,
        day: dateJson.getDate,
        hour: dateJson.getHours,
        minute: dateJson.getMinutes,
        second: dateJson.getSeconds,
    };

    return methods;
    
});
