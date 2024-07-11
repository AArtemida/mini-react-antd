import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import StatisticCard from './components/StatisticCard'
import ProduceList from './components/ProduceList'
import PendingBox from './components/PendingBox'
import BarChart from '@/components/Chart/BarChart'
import LineChart from '@/components/Chart/LineChart'
import { getUserFeed, getWeekStat } from '@/api/board'
import './index.less'

const Board: Reacr.FC = () => {
  return (
    <div className="content">
      <StatisticCard></StatisticCard>
      <section className="center flex justify-Between mb20">
        <div className="center-child mr20">
          <PendingBox></PendingBox>
          <TodayUserChart></TodayUserChart>
        </div>

        <ProduceList></ProduceList>
      </section>
      <Card className="bottom" title="近7日售量统计">
        <WeekStatChart></WeekStatChart>
      </Card>
    </div>
  )
}

const TodayUserChart: Reacr.FC = () => {
  const [chartData, setChartDatas] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    getUserFeed().then(res => {
      setLoading(false)
      setChartDatas(res.data || [])
    })
  }, [])

  return (
    <Card title="今日用户响应">
      <BarChart
        chartData={chartData}
        style={{
          height: '140px',
        }}
      ></BarChart>
    </Card>
  )
}

const WeekStatChart: Reacr.FC = () => {
  const [chartData, setChartDatas] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    getWeekStat().then(res => {
      setLoading(false)
      setChartDatas(res.data || [])
    })
  }, [])
  return (
    <LineChart
      chartData={chartData}
      style={{
        height: '160px',
      }}
    ></LineChart>
  )
}

export default Board
