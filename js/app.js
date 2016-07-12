var data = {
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    date: {
        year: moment().year,
        month: moment().month,
        day: moment().day
    },
    slider: {
        year: false,
        month: false
    },
    months: _month(),
    years: _yearTem(),
    days: _day(),
}

function _yearTem() {
    var nowYear = moment().year;
    var arr = [];
    for (var i = (nowYear - 30); i < nowYear; i++) {
        arr.push(i)
    }
    for (var k = nowYear; k < (nowYear + 30); k++) {
        arr.push(i)
    }
    return arr;
}

function _month() {
    var arr = [];
    for (var i = 0; i < 12; i++) {
        arr.push((i + 1))
    }
    return arr;
}

function _day(time) {
    var time = time || +Date.now();
    var date = moment(time);
    var dayAll = date.getDay + 1;
    var day = date.day;

    var posTime = date.formate('YYYY-MM') + '-01';
    var pos = new Date(posTime).getDay();

    var arr = [];

    for (var i = 0; i < pos; i++) {
        arr.push('')
    }
    for (var i = 1; i < dayAll; i++) {
        arr.push(i)
    }
    return arr;
}

var uiDate = Vue.extend({
    template: '#tem-ui-date',

    data: function() {
        return data
    },

    //合并数值
    computed: {
        dateVale: function() {
            var date = this.date;
            return date.year + '-' + date.month + '-' + date.day
        }
    },

    methods: {

        //改变下拉状态
        active: function(state) {
            this.$data.slider[state] = !this.$data.slider[state];
        },

        //上下点击变换
        change: function(type) {

            var data = this.$data.date;
            if (type == '-') {
                data.month--;
                if (data.month < 1) {
                    data.month = 12;
                    data.year--
                }
            } else {
                data.month++;
                if (data.month > 12) {
                    data.month = 1;
                    data.year++
                }
            }

            //注入
            this.render(data.year + '-' + data.month + '-1');
        },

        //点击年月变换日期
        changeDay: function(year, month) {

            var year = year || this.date.year;
            var month = month || this.date.month;

            this.$data.date.year = year;
            this.$data.date.month = month;

            this.render(year + '-' + month + '-1');

            this.sliderUp();
        },

        //改变日程 传递消息给实例
        chengeOther: function(num) {
            this.$data.date.day = num;
            this.$dispatch('isShow', false, this.dateVale);
        },

        //下拉关闭
        sliderUp: function() {
            this.$data.slider.year = this.$data.slider.month = false;
        },

        //重新注入
        render: function(str) {
            this.$data.date.day = 1;
            var time = moment().analysis(str);
            this.$data.days = _day(time)
        }
    }
})
