import { useState } from "react"
import { getData,capitalizeWords } from "../../utils.js"
import "./Chart.css"

import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Legend,
} from "recharts"

function Chart({
  title,
  data,
  dataKey,
  grid,
  parent,
  child,
  subtitle,
  defaultValue,
}) {
  let a = getData(data, parent, child)

  const [view, setView] = useState(defaultValue[parent])

  function OnchangeSetView(e) {
    setView(e.target.value)
  }

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <div className="chartSelect">
        <h5>
          {capitalizeWords(parent)} {subtitle}
        </h5>
        <select onChange={OnchangeSetView}>
          {Object.keys(a).map((e) => {
            return <option key={e} value={e}>{e}</option>
          })}
        </select>
      </div>
      <ResponsiveContainer width="100%" height="100%" aspect={2/1}>
        <BarChart
          width={700}
          height={300}
          data={a[view]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={child} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#60AC4A" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
