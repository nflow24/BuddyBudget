import { useMemo } from "react";
import "./SpendingPieChart.css";

const DEFAULT_DATA = [
  { label: "Groceries", value: 320, color: "#12c85a" },
  { label: "Entertainment", value: 85, color: "#3b82f6" },
  { label: "Transportation", value: 120, color: "#f59e0b" },
  { label: "Dining", value: 95, color: "#ec4899" },
  { label: "Other", value: 80, color: "#8b5cf6" },
];

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

export default function SpendingPieChart({ data = DEFAULT_DATA }) {
  const { segments, total } = useMemo(() => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let startAngle = 0;
    const segments = data.map(({ label, value, color }) => {
      const ratio = total > 0 ? value / total : 0;
      const angle = ratio * 360;
      const segment = { label, value, color, startAngle, angle };
      startAngle += angle;
      return segment;
    });
    return { segments, total };
  }, [data]);

  const radius = 100;
  const cx = 120;
  const cy = 120;

  const getPath = (startAngle, angle) => {
    const start = polarToCartesian(cx, cy, radius, startAngle);
    const end = polarToCartesian(cx, cy, radius, startAngle + angle);
    const largeArc = angle > 180 ? 1 : 0;
    return [
      "M", cx, cy,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArc, 1, end.x, end.y,
      "Z",
    ].join(" ");
  };

  return (
    <div className="pie-chart-container">
      <svg
        className="pie-chart-svg"
        viewBox="0 0 240 240"
        aria-label="Spending by category"
      >
        {segments.map((seg, i) => (
          <path
            key={i}
            d={getPath(seg.startAngle, seg.angle)}
            fill={seg.color}
            stroke="white"
            strokeWidth="2"
            aria-label={`${seg.label}: $${seg.value}`}
          />
        ))}
      </svg>
      <div className="pie-chart-legend">
        {segments.map((seg, i) => (
          <div key={i} className="pie-chart-legend-item">
            <span
              className="pie-chart-legend-dot"
              style={{ backgroundColor: seg.color }}
            />
            <span className="pie-chart-legend-label">{seg.label}</span>
            <span className="pie-chart-legend-value">${seg.value}</span>
          </div>
        ))}
      </div>
      <p className="pie-chart-total">Total: ${total}</p>
    </div>
  );
}
