import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useAuthContext from '../../hooks/useAuthContext';
import useOtherInfoContext from '../../hooks/useOtherInfoContext';

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-gray-100">
				<p className="text-gray-500 text-xs lg:text-sm font-medium mb-1">{label}</p>
				<p className="text-[#3c6a95] text-sm lg:text-xl font-bold">${payload[0].value.toLocaleString()}</p>
			</div>
		);
	}
	return null;
};

const IncomeChart = () => {
    const { fetchIncomeData, incomeLoading, incomeData } = useOtherInfoContext();
    const { user } = useAuthContext(); 

    const [Data, setData] = useState([]); 

    const transformData = (incomeData) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
        return incomeData.map((item) => {
            const date = new Date(item.month_and_year); 
            const month = monthNames[date.getMonth()]; 
            const year = date.getFullYear(); 
            return {
				id: item.id,
				amount: parseFloat(item.amount),
				month,
				year,
				monthYear: `${month} ${year}`,
			};
        })
    }
    useEffect(() => {
		fetchIncomeData();
    }, []);

	useEffect(() => {
        if (incomeData) {
            setData(transformData(incomeData)); 
        }
    }, [incomeData]);
    
    const testIncomeData = [
		{ monthYear: "Jan 2023", amount: 12000 },
		{ monthYear: "Feb 2023", amount: 15000 },
		{ monthYear: "Mar 2023", amount: 18000 },
		{ monthYear: "Apr 2023", amount: 21000 },
		{ monthYear: "May 2023", amount: 24000 },
		{ monthYear: "Jun 2023", amount: 26000 },
		{ monthYear: "Jul 2023", amount: 30000 },
		{ monthYear: "Aug 2023", amount: 32000 },
		{ monthYear: "Sep 2023", amount: 29000 },
		{ monthYear: "Oct 2023", amount: 35000 },
		{ monthYear: "Nov 2023", amount: 38000 },
		{ monthYear: "Dec 2023", amount: 42000 },
		{ monthYear: "Jan 2024", amount: 25000 },
		{ monthYear: "Feb 2024", amount: 27000 },
		{ monthYear: "Mar 2024", amount: 30000 },
		{ monthYear: "Apr 2024", amount: 34000 },
		{ monthYear: "May 2024", amount: 36000 },
		{ monthYear: "Jun 2024", amount: 39000 },
		{ monthYear: "Jul 2024", amount: 42000 },
		{ monthYear: "Aug 2024", amount: 45000 },
		{ monthYear: "Sep 2024", amount: 43000 },
		{ monthYear: "Oct 2024", amount: 47000 },
		{ monthYear: "Nov 2024", amount: 52000 },
		{ monthYear: "Dec 2024", amount: 60000 },
		{ monthYear: "Jan 2025", amount: 32000 },
		{ monthYear: "Feb 2025", amount: 35000 },
		{ monthYear: "Mar 2025", amount: 38000 },
		{ monthYear: "Apr 2025", amount: 42000 },
		{ monthYear: "May 2025", amount: 45000 },
		{ monthYear: "Jun 2025", amount: 48000 },
		{ monthYear: "Jul 2025", amount: 52000 },
		{ monthYear: "Aug 2025", amount: 56000 },
	];

	// spinner
	if (incomeLoading)
		return (
			<div className="flex justify-center items-center my-20 min-h-screen">
				<span className="loading loading-spinner loading-xl  text-secondary"></span>
			</div>
		);
	
	const fontSize =
		window.innerWidth < 640 ? 8
		: window.innerWidth < 1024 ? 12
		: 14;
	const marginY=
		window.innerWidth < 640 ? -40
		: window.innerWidth < 1024 ? -10
		: -5;

	return (
		<div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
			<div className="flex items-center justify-between mb-8">
				<div>
					<h2 className="text-lg lg:text-2xl font-bold text-gray-800 tracking-tight">
						{user?.role === "Seller" ? "Income" : "Cost"} Overview
					</h2>
					<p className="text-gray-400 text-xs lg:text-sm font-medium mt-1">Yearly performance metrics</p>
				</div>
			</div>

			<div className=" h-[180px] w-full overflow-x-auto">
				{Data?.length ? (<ResponsiveContainer width="100%" height={180}>
					<AreaChart data={Data} margin={{left:marginY}}>
						<defs>
							<linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
								<stop offset="45%" stopColor="#3c6a95" stopOpacity={0.3} />
								<stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
						<XAxis
							dataKey="monthYear"
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#9ca3af", fontSize: fontSize }}
							dy={5}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fill: "#9ca3af", fontSize: fontSize }}
							tickFormatter={(value) => `$${value / 1000}k`}
						/>
						<Tooltip
							content={<CustomTooltip />}
							cursor={{ stroke: "#3c6a95", strokeWidth: 1, strokeDasharray: "4 4" }}
						/>
						<Area
							type="monotone"
							dataKey="amount"
							stroke="#3c6a95"
							strokeWidth={3}
							fillOpacity={1}
							fill="url(#colorIncome)"
							activeDot={{ r: 6, strokeWidth: 0, fill: "#3c6a95" }}
							
						/>
					</AreaChart>
				</ResponsiveContainer>) : <div className='text-gray-500 text-center font-semibold mt-10'>
						No Data Yet
						</div>}
			</div>
		</div>
	);
};;

export default IncomeChart;