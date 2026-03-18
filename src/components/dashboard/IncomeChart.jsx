import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useAuthContext from "../../hooks/useAuthContext";
import useOtherInfoContext from "../../hooks/useOtherInfoContext";

/* ── Custom Tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div
				style={{
					background: "#0d0d0d",
					border: "1px solid rgba(48,96,115,0.35)",
					borderRadius: "14px",
					padding: "12px 18px",
					boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
					fontFamily: "'Figtree', sans-serif",
				}}>
				<p
					style={{
						fontSize: "10px",
						fontWeight: 600,
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						color: "rgba(255,255,255,0.35)",
						marginBottom: "6px",
					}}>
					{label}
				</p>
				<p
					style={{
						fontSize: "20px",
						fontWeight: 800,
						fontFamily: "'Syne', sans-serif",
						color: "#ffffff",
						letterSpacing: "-0.03em",
						lineHeight: 1,
					}}>
					${payload[0].value.toLocaleString()}
				</p>
				<div
					style={{
						width: "28px",
						height: "2px",
						background: "#306073",
						borderRadius: "99px",
						marginTop: "8px",
					}}
				/>
			</div>
		);
	}
	return null;
};

/* ── Stat Pill ── */
const StatPill = ({ label, value, accent }) => (
	<div
		style={{
			background: accent ? "#0d0d0d" : "#f7f7f7",
			border: `1px solid ${accent ? "rgba(48,96,115,0.3)" : "rgba(0,0,0,0.06)"}`,
			borderRadius: "14px",
			padding: "14px 20px",
			minWidth: "110px",
			position: "relative",
			overflow: "hidden",
		}}>
		{accent && (
			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					height: "3px",
					width: "50%",
					background: "linear-gradient(90deg, #306073, transparent)",
					borderRadius: "0 99px 99px 0",
				}}
			/>
		)}
		<div
			style={{
				fontSize: "10px",
				fontWeight: 600,
				letterSpacing: "0.14em",
				textTransform: "uppercase",
				color: accent ? "rgba(255,255,255,0.35)" : "#aaa",
				marginBottom: "6px",
			}}>
			{label}
		</div>
		<div
			style={{
				fontSize: "18px",
				fontWeight: 800,
				fontFamily: "'Syne', sans-serif",
				letterSpacing: "-0.03em",
				color: accent ? "#fff" : "#0d0d0d",
				lineHeight: 1,
			}}>
			{value}
		</div>
	</div>
);

const IncomeChart = () => {
	const { fetchIncomeData, incomeLoading, incomeData } = useOtherInfoContext();
	const { user } = useAuthContext();
	const [Data, setData] = useState([]);

	const transformData = (incomeData) => {
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return incomeData.map((item) => {
			const date = new Date(item.month_and_year);
			return {
				id: item.id,
				amount: parseFloat(item.amount),
				month: monthNames[date.getMonth()],
				year: date.getFullYear(),
				monthYear: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
			};
		});
	};

	useEffect(() => {
		fetchIncomeData();
	}, []);
	useEffect(() => {
		if (incomeData) setData(transformData(incomeData));
	}, [incomeData]);

	if (incomeLoading) {
		return (
			<div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "320px" }}>
				<div
					style={{
						width: "36px",
						height: "36px",
						borderRadius: "50%",
						border: "2.5px solid rgba(48,96,115,0.2)",
						borderTopColor: "#306073",
						animation: "icSpin 0.8s linear infinite",
					}}
				/>
				<style>{`@keyframes icSpin { to { transform: rotate(360deg); } }`}</style>
			</div>
		);
	}

	const displayData = Data?.length ? Data : [];
	const totalIncome = displayData.reduce((s, d) => s + d.amount, 0);
	const maxMonth = displayData.length ? displayData.reduce((a, b) => (a.amount > b.amount ? a : b)) : null;
	const latestAmount = displayData.length ? displayData[displayData.length - 1].amount : 0;

	const isSm = typeof window !== "undefined" && window.innerWidth < 640;
	const isMd = typeof window !== "undefined" && window.innerWidth < 1024;
	const fontSize =
		isSm ? 9
		: isMd ? 11
		: 12;
	const marginLeft =
		isSm ? -36
		: isMd ? -10
		: -5;

	const isLabel = user?.role === "Seller" ? "Income" : "Cost";

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Figtree:wght@300;400;500;600&display=swap');

				.ic-card {
					font-family: 'Figtree', sans-serif;
					width: 100%;
					background: #ffffff;
					border-radius: 24px;
					border: 1px solid rgba(0,0,0,0.06);
					box-shadow: 0 2px 8px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06);
					overflow: hidden;
					transition: box-shadow 0.3s ease;
				}
				.ic-card:hover {
					box-shadow: 0 4px 12px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.09);
				}

				

				.ic-header {
					padding: 24px 28px 0;
					display: flex;
					align-items: flex-start;
					justify-content: space-between;
					gap: 16px;
					flex-wrap: wrap;
				}

				.ic-title {
					font-family: 'Syne', sans-serif;
					font-size: clamp(18px, 2.5vw, 26px);
					font-weight: 800;
					letter-spacing: -0.03em;
					color: #0d0d0d;
					line-height: 1.1;
					margin-bottom: 4px;
				}
				.ic-subtitle {
					font-size: 12px;
					font-weight: 400;
					color: #aaa;
					letter-spacing: 0.04em;
				}

				/* teal category badge */
				.ic-badge {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					font-size: 10px;
					font-weight: 600;
					letter-spacing: 0.16em;
					text-transform: uppercase;
					color: #306073;
					border: 1px solid rgba(48,96,115,0.25);
					border-radius: 100px;
					padding: 5px 12px;
					background: rgba(48,96,115,0.05);
					white-space: nowrap;
					align-self: flex-start;
					margin-top: 2px;
				}
				.ic-badge-dot {
					width: 5px; height: 5px;
					border-radius: 50%;
					background: #306073;
					animation: icPulse 2s infinite;
				}
				@keyframes icPulse {
					0%,100% { opacity:1; transform:scale(1); }
					50%      { opacity:0.4; transform:scale(0.7); }
				}

				/* stats row */
				.ic-stats {
					display: flex;
					gap: 10px;
					padding: 20px 28px 0;
					flex-wrap: wrap;
				}

				/* chart area */
				.ic-chart {
					padding: 20px 12px 16px 8px;
					height: 220px;
				}

				/* no data */
				.ic-empty {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 220px;
					gap: 10px;
				}
				.ic-empty-icon {
					width: 48px; height: 48px;
					background: #f2f2f2;
					border-radius: 14px;
					display: flex; align-items: center; justify-content: center;
				}
				.ic-empty-label {
					font-size: 13px;
					font-weight: 500;
					color: #bbb;
					letter-spacing: 0.04em;
				}

				/* footer */
				.ic-footer {
					padding: 12px 28px 20px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-top: 1px solid rgba(0,0,0,0.05);
					flex-wrap: wrap;
					gap: 8px;
				}
				.ic-footer-label {
					font-size: 11px;
					color: #ccc;
					letter-spacing: 0.06em;
				}
				.ic-footer-label strong {
					color: #888;
					font-weight: 500;
				}
				.ic-footer-ticks {
					display: flex;
					gap: 4px;
				}
				.ic-tick {
					width: 8px; height: 8px;
					border-radius: 2px;
					background: rgba(48,96,115,0.15);
					transition: background 0.2s;
				}
				.ic-tick:nth-child(3) { background: rgba(48,96,115,0.35); }
				.ic-tick:nth-child(4) { background: rgba(48,96,115,0.6); }
				.ic-tick:nth-child(5) { background: #306073; }

				@media (max-width: 480px) {
					.ic-header, .ic-stats, .ic-footer { padding-left: 18px; padding-right: 18px; }
					.ic-chart { padding: 16px 4px 12px 0; }
					.ic-stats { gap: 8px; }
				}
			`}</style>

			<div className="ic-card">
				{/* Header */}
				<div className="ic-header">
					<div>
						<h2 className="ic-title">{isLabel} Overview</h2>
						<p className="ic-subtitle">Monthly performance metrics</p>
					</div>
					<span className="ic-badge">
						<span className="ic-badge-dot" />
						Live data
					</span>
				</div>

				{/* Stat pills */}
				{displayData.length > 0 && (
					<div className="ic-stats">
						<StatPill label="Total" value={`$${(totalIncome / 1000).toFixed(0)}k`} accent />
						<StatPill label="Latest" value={`$${(latestAmount / 1000).toFixed(0)}k`} />
						{maxMonth && <StatPill label="Peak month" value={maxMonth.monthYear} />}
					</div>
				)}

				{/* Chart */}
				<div className="ic-chart">
					{displayData.length ?
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={displayData} margin={{ left: marginLeft, right: 8, top: 8, bottom: 0 }}>
								<defs>
									<linearGradient id="icGrad" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor="#306073" stopOpacity={0.22} />
										<stop offset="100%" stopColor="#306073" stopOpacity={0} />
									</linearGradient>
									<linearGradient id="icLine" x1="0" y1="0" x2="1" y2="0">
										<stop offset="0%" stopColor="#306073" />
										<stop offset="100%" stopColor="#4ab5cc" />
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
								<XAxis
									dataKey="monthYear"
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#ccc", fontSize, fontFamily: "Figtree" }}
									dy={6}
								/>
								<YAxis
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#ccc", fontSize, fontFamily: "Figtree" }}
									tickFormatter={(v) => `$${v / 1000}k`}
								/>
								<Tooltip
									content={<CustomTooltip />}
									cursor={{ stroke: "rgba(48,96,115,0.3)", strokeWidth: 1, strokeDasharray: "5 4" }}
								/>
								<Area
									type="monotone"
									dataKey="amount"
									stroke="url(#icLine)"
									strokeWidth={2.5}
									fillOpacity={1}
									fill="url(#icGrad)"
									activeDot={{ r: 5, fill: "#306073", strokeWidth: 2, stroke: "#fff" }}
								/>
							</AreaChart>
						</ResponsiveContainer>
					:	<div className="ic-empty">
							<div className="ic-empty-icon">
								<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
									<path
										d="M3 17l5-5 4 4 7-8"
										stroke="#ccc"
										strokeWidth="1.6"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<span className="ic-empty-label">No data available yet</span>
						</div>
					}
				</div>

				{/* Footer */}
				<div className="ic-footer">
					<span className="ic-footer-label">
						Showing <strong>{displayData.length} months</strong> of data
					</span>
					<div className="ic-footer-ticks">
						{[1, 2, 3, 4, 5].map((i) => (
							<span key={i} className="ic-tick" />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default IncomeChart;
