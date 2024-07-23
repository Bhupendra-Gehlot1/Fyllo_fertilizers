import React, { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function TopFertilizers({ data }) {
  const topRequired = useMemo(() => {
    const summed = data.reduce((acc, curr) => {
      acc[curr.product] = (acc[curr.product] || 0) + parseFloat(curr.requirement_in_mt_)
      return acc
    }, {})
    const total = Object.values(summed).reduce((sum, value) => sum + value, 0)
    return Object.entries(summed)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({
        name,
        value,
        percentage: ((value / total) * 100).toFixed(2)
      }))
  }, [data])

  const leastAvailable = useMemo(() => {
    const summed = data.reduce((acc, curr) => {
      acc[curr.product] = (acc[curr.product] || 0) + parseFloat(curr.availability_in_mt_)
      return acc
    }, {})
    const total = Object.values(summed).reduce((sum, value) => sum + value, 0)
    return Object.entries(summed)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 5)
      .map(([name, value]) => ({
        name,
        value,
        percentage: ((value / total) * 100).toFixed(2)
      }))
  }, [data])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
          <p className="label">{`${label} : ${payload[0].value.toFixed(2)}`}</p>
          <p className="intro">{`Percentage : ${payload[0].payload.percentage}%`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="topFertilizers">
      <div className="chart">
        <h3>Top 5 Required Fertilizers</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topRequired}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Requirement (MT)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart">
        <h3>Top 5 Least Available Fertilizers</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={leastAvailable}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" name="Availability (MT)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TopFertilizers