function getCustomShow(customVal) {
  return typeof customVal !== 'undefined' ? customVal : true
}
//获取坐标轴
function getAxis(chartData, custom = {}, axisData) {
  let xAxisData =
    axisData ||
    chartData.map(val => {
      return val.name
    })
  // 坐标轴文字颜色
  let xAxisColor = '#B2B6C3'
  let axisStyle = {
    minInterval: 1,
    nameGap: 6,
    min: 0,
    nameTextStyle: {
      color: xAxisColor,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: custom.axisLineColor || '#eef3f8',
      },
    },
    axisTick: {
      show: true,
    },
  }
  let axisLabel = {
    //坐标标签
    textStyle: {
      fontSize: 12,
      color: xAxisColor,
    },
    formatter: params => {
      let str = params
      if (typeof str === 'string' && str.length > 14) {
        str = str.substring(0, 14) + '...'
      }
      return str
    },
    // interval: 0
    // rotate: 30
  }
  let xAxis = Object.assign({}, axisStyle, {
    show: !custom.hideXaxis,
    type: 'category',
    data: xAxisData,
    name: custom.xAxisName || '',
    axisLabel: {
      ...axisLabel,
      // 是否显示类目坐标轴
      show: getCustomShow(custom.showCategoryAxisLabel),
      // interval: 0,
    },
  })

  let valueAxis = Object.assign({}, axisStyle, {
    show: !custom.hideYaxis,
    name: custom.yAxisName || '',
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: '#F6F7F9',
      },
    },
    //数值坐标轴位置
    position: custom.valueAxisPosition || '',
    axisLabel: {
      ...axisLabel,
      // 是否显示数值坐标轴
      show: getCustomShow(custom.showValueAxisLabel),
    },
  })
  return { xAxis, valueAxis }
}
export default getAxis
