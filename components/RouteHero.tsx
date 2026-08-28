const waypoints = [
  { x: 60, y: 210, label: "Сайт и\u00A0карты", n: "01" },
  { x: 300, y: 90, label: "Реклама", n: "02" },
  { x: 560, y: 260, label: "Соцсети", n: "03" },
  { x: 830, y: 110, label: "SEO", n: "04" },
  { x: 1080, y: 200, label: "Постоянные\nклиенты", n: "05" },
];

const pathD = `M ${waypoints[0].x} ${waypoints[0].y} C 160 260, 200 90, ${waypoints[1].x} ${waypoints[1].y} S 480 320, ${waypoints[2].x} ${waypoints[2].y} S 760 40, ${waypoints[3].x} ${waypoints[3].y} S 1000 260, ${waypoints[4].x} ${waypoints[4].y}`;

export default function RouteHero() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-ink-900">
      <svg
        viewBox="0 0 1140 340"
        className="w-full h-auto"
        role="img"
        aria-label="Маршрут продвижения: от сайта и карт через рекламу и соцсети к постоянным клиентам"
      >
        <defs>
          <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="#2A3E60" />
          </pattern>
        </defs>
        <rect width="1140" height="340" fill="url(#dotgrid)" />

        <path
          d={pathD}
          fill="none"
          stroke="#0E7C7B"
          strokeWidth="3"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />

        {waypoints.map((w, i) => (
          <g key={w.n}>
            <circle
              cx={w.x}
              cy={w.y}
              r={i === waypoints.length - 1 ? 22 : 16}
              fill={i === waypoints.length - 1 ? "#F2A93B" : "#12213A"}
              stroke={i === waypoints.length - 1 ? "#F2A93B" : "#0E7C7B"}
              strokeWidth="2.5"
            />
            <text
              x={w.x}
              y={w.y + 5}
              textAnchor="middle"
              fontSize="11"
              fontFamily="var(--font-plex-mono)"
              fill={i === waypoints.length - 1 ? "#12213A" : "#F2A93B"}
            >
              {w.n}
            </text>
            {w.label.split("\n").map((line, li) => (
              <text
                key={li}
                x={w.x}
                y={w.y - 32 + li * 16 - (w.label.includes("\n") ? 8 : 0)}
                textAnchor="middle"
                fontSize="15"
                fontFamily="var(--font-manrope)"
                fontWeight="600"
                fill="#EEEAE0"
              >
                {line}
              </text>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
