//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    //加载状态
    loadingHidden: false,
    //当前温度
    currentTemperature: '',
    //夜间温度
    nightAirTemperature: '',
    //白天温度
    dayAirTemperature: '',
    //当前天气
    weather: '',
    //污染指数
    aqi: '',
    //污染程度
    quality: '',
    //风力
    windPower: '',
    //风向
    windDirection: '',
    //因为数据返回不是数组所以要自己封装一个数组
    list: [],
    height: 663,
    //城市
    cityInfo: '',
    sd:'',
    //时间
    temperature_time:'',
    wash_car:'',
    pm2_5:'',

  },

  onLoad: function () {
    console.log('onLoad')
    var that = this

    wx.showShareMenu({
      withShareTicket: true
    })

    //100%好像不好使 可以获取设备高度
    wx.getSystemInfo({
      success: function (res) {
        that.data.height = res.windowHeight;
      }
    })

    wx.getLocation({
      success: function (res) {
        //通过经纬度请求数据
        wx.request({
          
          url: 'https://route.showapi.com/9-5',

          data: {
            showapi_appid: '59243',
            showapi_sign: '0d76a05255854678aae33dffbc2bf8bc',
            //
            from: '5',
            lng: res.longitude,
            lat: res.latitude,
            //获取一周情况 0是不获取
            needMoreDay: '1',
            needIndex: '1',
            needHourData: '1',
            need3HourForcast:'1',
          },
          success: function (res) {
            console.log(res)
            console.log(res.data.showapi_res_body.now.api)
            that.setData({
              //改变加载状态
              loadingHidden: true,

              currentTemperature: res.data.showapi_res_body.now.temperature,
              nightAirTemperature: res.data.showapi_res_body.f1.night_air_temperature,
              dayAirTemperature: res.data.showapi_res_body.f1.day_air_temperature,
              sun_begin_end: res.data.showapi_res_body.f1.sun_begin_end,
              weather: res.data.showapi_res_body.now.weather,
              aqi: res.data.showapi_res_body.now.aqi,
              pm2_5:res.data.showapi_res_body.now.aqiDetail.pm2_5,
              num: res.data.showapi_res_body.now.aqiDetail.num,
              quality: res.data.showapi_res_body.now.aqiDetail.quality,
              windPower: res.data.showapi_res_body.now.wind_power,
              windDirection: res.data.showapi_res_body.now.wind_direction,
              cityInfo: res.data.showapi_res_body.cityInfo.c3,
              c15: res.data.showapi_res_body.cityInfo.c15,
              temperature_time: res.data.showapi_res_body.now.temperature_time,
              sd: res.data.showapi_res_body.now.sd,
              wash_car: res.data.showapi_res_body.f1.index.wash_car,
              clothes: res.data.showapi_res_body.f1.index.clothes,
              cold: res.data.showapi_res_body.f1.index.cold,
              sports: res.data.showapi_res_body.f1.index.sports,
              travel: res.data.showapi_res_body.f1.index.travel,
              //hourDataList: res.data.showapi_res_body.hourDataList,
              need3HourForcast: res.data.showapi_res_body.f1["3hourForcast"],
              jiangshui:res.data.showapi_res_body.f1.jiangshui,
              air_press: res.data.showapi_res_body.f1.air_press,
            })
          }
        })

      }
    })

  }
})
