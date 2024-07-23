import React, { useState, useEffect } from "react";
import "./Bigchart.css";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Legend,
} from "recharts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Bigchart({ title, data }) {
  const [year, setYear] = useState("");
  const [statevalue, setStatevalue] = useState("");
  const [monthvalue, setMonthvalue] = useState("");
  const [chartData, setChartData] = useState([]);
  const [years, setYears] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const uniqueYears = Array.from(
        new Set(data.map((item) => item._year))
      ).sort();
      const uniqueStates = Array.from(
        new Set(data.map((item) => item.state))
      ).sort();
      setYears(uniqueYears);
      setStates(uniqueStates);
      setYear(uniqueYears[0]);
      setStatevalue(uniqueStates[0]);
      setMonthvalue(months[0]);
    }
  }, [data]);

  useEffect(() => {
    if (year && statevalue && monthvalue) {
      const filteredData = data.filter(
        (obj) =>
          obj.state === statevalue &&
          obj.month === monthvalue &&
          obj._year === year
      );

      const processedData = filteredData.map((element) => ({
        ...element,
        requirement_in_mt_: parseFloat(element.requirement_in_mt_),
        availability_in_mt_: parseFloat(element.availability_in_mt_),
      }));

      setChartData(processedData);
    }
  }, [year, statevalue, monthvalue, data]);

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bigchart">
      <h3 className="bigchartTitle">{title}</h3>

      <div className="bigchartSelect">
        <h5>Year</h5>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <h5>Month</h5>
        <select
          value={monthvalue}
          onChange={(e) => setMonthvalue(e.target.value)}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <h5>State</h5>
        <select
          value={statevalue}
          onChange={(e) => setStatevalue(e.target.value)}
        >
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {chartData.length === 0 ? (
        <h6 className="errordata">No data available to show</h6>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="requirement_in_mt_"
              fill="#60AC4A"
              name="Requirement (MT)"
            />
            <Bar
              dataKey="availability_in_mt_"
              fill="#FF6347"
              name="Availability (MT)"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Bigchart;
