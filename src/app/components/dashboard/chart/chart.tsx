"use client";

import React from "react";
import styles from "./chart.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { RadialBarChart, RadialBar, Legend } from "recharts";

const data2 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const data = [
  { name: "กาแฟ", uv: 31.47, pv: 2400, fill: "#8884d8" },
  { name: "ชา", uv: 26.69, pv: 4567, fill: "#83a6ed" },
  { name: "นม", uv: 15.69, pv: 1398, fill: "#8dd1e1" },
  { name: "โซดา", uv: 8.22, pv: 9800, fill: "#82ca9d" },
  { name: "มะพร้าว", uv: 8.63, pv: 3908, fill: "#a4de6c" },
  { name: "50+", uv: 2.63, pv: 4800, fill: "#d0ed57" },
  { name: "unknown", uv: 6.67, pv: 4800, fill: "#ffc658" }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const legendStyle = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
  color: "#333",
};

export default function Chart() {
  return (
    <div className={styles.container}>
      <h2 className={styles.chartTitle}>Sales Distribution</h2>

      { }
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data2}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data2.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={10}
            data={data}
          >
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background
              //clockwise
              dataKey="uv"
              className={styles.radialBar}
            />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={legendStyle} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};