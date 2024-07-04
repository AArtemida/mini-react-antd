import React from 'react'
import { CommonChart, getAreaStyle } from './index'
import type { ECOption } from './index'
import getAxis from './common/handleAxis'

const useOption = (data: Array<any>, custom): ECOption => {
  const primaryColor = '#6DBEB5'
  let option = {
    color: primaryColor,
    grid: {
      left: '2%',
      right: '3%',
      top: 10,
      bottom: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    series: [
      {
        name: custom?.title || '',
        type: 'line',
        symbolSize: 4,
        smooth: true,
        areaStyle: {
          normal: {
            color: getAreaStyle(primaryColor)
          },
        },
        data,
      },
    ],
  }
  // 坐标轴
  let { xAxis, valueAxis } = getAxis(data, custom)
  if (custom?.axisVertical) {
    // 纵向图
    option.xAxis = valueAxis
    option.yAxis = xAxis
  } else {
    //横向图
    option.xAxis = xAxis
    //纵坐标
    option.yAxis = valueAxis
  }
  return option
}



const LineChart = ({ chartData, style, className }) => {
  const option = useOption(chartData)
  return (
    <CommonChart
      option={option}
      lazyUpdate
      className={className}
      style={style}
    ></CommonChart>
  )
}

export default LineChart
