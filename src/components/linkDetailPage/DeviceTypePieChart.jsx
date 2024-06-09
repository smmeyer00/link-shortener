"use client";

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";


export default function DeviceTypePieChart({ height, data, dataKey, nameKey }) {
    const colors = ["hsl(var(--primary))", "#40F99B", "#363635"];

    return (
        <ResponsiveContainer height={height} width="100%">
            <PieChart>
                <Legend layout="vertical" align="right" verticalAlign="top" />
                <Tooltip />
                <Pie
                    data={data}
                    dataKey={dataKey}
                    nameKey={nameKey}
                    startAngle={90}
                    endAngle={90 - 360}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
