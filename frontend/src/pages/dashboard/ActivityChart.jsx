export default function ActivityChart() {
    const data = [3, 5, 4, 6, 5, 7, 4, 8, 6, 9, 7, 11];
    const labels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    const max = Math.max(...data);
    return (
        <div className="w-full">
            <svg viewBox="0 0 600 180" className="w-full h-44">
                <defs>
                    <linearGradient id="bargrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7B61FF" />
                        <stop offset="100%" stopColor="#5B8CFF" />
                    </linearGradient>
                </defs>
                {data.map((v, i) => {
                    const h = (v / max) * 140;
                    const x = i * 48 + 16;
                    return (
                        <g key={i}>
                            <rect
                                x={x}
                                y={160 - h}
                                width={28}
                                height={h}
                                rx={8}
                                fill="url(#bargrad)"
                                opacity={0.9}
                            >
                                <animate attributeName="height" from="0" to={h} dur="0.9s" fill="freeze" begin={`${i * 0.04}s`} />
                                <animate attributeName="y" from="160" to={160 - h} dur="0.9s" fill="freeze" begin={`${i * 0.04}s`} />
                            </rect>
                            <text x={x + 14} y={176} textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">{labels[i]}</text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
