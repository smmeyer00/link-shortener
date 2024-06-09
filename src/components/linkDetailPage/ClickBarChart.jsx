"use client";

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function ClickBarChart({ data, height, xAxisKey, barKey }) {

    return (
        <ResponsiveContainer height={height} width="100%">
            <BarChart margin={{left: 0, right: 5, top: 5, bottom: 5}} data={data}>
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey={barKey} fill={`hsl(var(--primary))`} />
            </BarChart>
        </ResponsiveContainer>
    );
}
