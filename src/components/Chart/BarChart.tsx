import React from 'react'
import { CommonChart } from './index'
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
        type: 'bar',
        barMinHeight: 1,
        barMaxWidth: 20,
        itemStyle: {
          barBorderRadius: [4, 4, 0, 0],
          color: function(params) {
            const index = params.dataIndex
            return index % 2 ? '#EEAC6C' : primaryColor
          }
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

const BarChart = ({ chartData, style, className }) => {
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

export default BarChart
