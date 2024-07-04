// @/components/Chart/index.tsx
import React, { useRef, useEffect, CSSProperties } from 'react'
// 引入 Echarts 的类型声明
import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import type {
  BarSeriesOption,
  LineSeriesOption,
} from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import { useWindowResize } from '@/hooks/useWindowResize'

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

/**
 *
 * @param {Object} props - 组件属性
 * @param {EChartOption} props.option - Echarts 配置项
 * @param {Function} [props.onClick] - 点击事件处理函数
 * @param {boolean} [props.lazyUpdate=false] - 是否懒渲染
 * @param {CSSProperties} [props.style] - 组件样式
 * @param {string} [props.className] - 组件类名
 * @returns {JSX.Element} - React 组件
 */
type ChartProps = {
  option: ECOption
  onClick?: (param: echarts.CallbackDataParams) => void
  lazyUpdate?: boolean
  style?: CSSProperties
  className?: string
}
const CommonChart = (props: ChartProps) => {
  const {
    option,
    onClick,
    lazyUpdate = false,
    style,
    className = '',
  } = props
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<ECharts | null>(null)

  useEffect(() => {
    let chartInstance: ECharts | null = null
    if (chartRef.current) {
      // 初始化
      if (!chartInstanceRef.current) {
        const hasRenderInstance = echarts.getInstanceByDom(chartRef.current)
        if (hasRenderInstance) {
          hasRenderInstance.dispose()
        }
        chartInstanceRef.current = echarts.init(chartRef.current)
      }
      chartInstance = chartInstanceRef.current

      try {
        chartInstance.setOption(option, { lazyUpdate })
        if(onClick) chartInstance.on('click', onClick)
      } catch (error) {
        chartInstance && chartInstance.dispose()
      }
    }
  }, [option, lazyUpdate])

  useWindowResize(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current?.resize()
    }
  })
  return <div style={{ ...style }} className={className} ref={chartRef}></div>
}

export function getAreaStyle(color) {
  return new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: color,
      },
      {
        offset: 1,
        color: "rgba(255,255,255, 0.3)",
      },
    ],
    false
  )
}

export { CommonChart }
