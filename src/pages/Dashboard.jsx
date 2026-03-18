import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { FiPackage, FiShoppingCart } from "react-icons/fi";
import { MdOutlinePendingActions, MdPaid } from "react-icons/md";
import { GrTime } from "react-icons/gr";
import { GiCancel } from "react-icons/gi";
import IncomeChart from "../components/dashboard/IncomeChart";
import IncomeBoard from "../components/dashboard/IncomeBoard";
import useAuthContext from "../hooks/useAuthContext";
import useOtherInfoContext from "../hooks/useOtherInfoContext";

/* ─── skeleton stat card ────────────────────────────────────────── */
const SkeletonStat = () => (
	<div className="bg-white border border-[#e8e8e8] p-5 animate-pulse">
		<div className="flex items-center justify-between mb-4">
			<div className="w-10 h-10 rounded-lg bg-[#f0f0f0]" />
			<div className="h-3 w-16 bg-[#f0f0f0] rounded" />
		</div>
		<div className="h-7 w-20 bg-[#ebebeb] rounded mb-1" />
		<div className="h-2.5 w-24 bg-[#f2f2f2] rounded" />
	</div>
);

/* ─── stat card ─────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, title, value, to, teal = false }) => (
	<Link to={to ?? ""} className="block group">
		<div className="relative bg-white border border-[#e8e8e8] p-5 overflow-hidden transition-all duration-250 hover:border-[#306073] hover:shadow-[0_4px_20px_rgba(48,96,115,0.10)]">
			{/* animated teal top bar */}
			<div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#306073] scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />

			<div className="flex items-start justify-between mb-4">
				{/* icon */}
				<div
					className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-250"
					style={{
						background: teal ? "rgba(48,96,115,0.1)" : "#f5f5f5",
					}}>
					<Icon
						size={18}
						className="transition-colors duration-250"
						style={{ color: teal ? "#306073" : "#555" }}
					/>
				</div>

				{/* arrow — appears on hover */}
				<svg
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					className="w-3.5 h-3.5 text-[#ccc] opacity-0 group-hover:opacity-100 group-hover:text-[#306073] transition-all duration-250">
					<path d="M3 8h10M9 4l4 4-4 4" />
				</svg>
			</div>

			{/* value */}
			<p className="text-2xl font-extrabold text-[#0d0d0d] tracking-tight leading-none mb-1">{value ?? 0}</p>

			{/* title */}
			<p className="text-xs text-[#888] font-medium tracking-wide">{title}</p>
		</div>
	</Link>
);

/* ─── section label ─────────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
	<div className="flex items-center gap-2.5 mb-5">
		<span className="w-px h-5 bg-[#306073]" />
		<span className="text-xs font-bold tracking-widest uppercase text-[#306073]">{children}</span>
	</div>
);

/* ─── main dashboard ────────────────────────────────────────────── */
const Dashboard = () => {
	const { paidOrders, allOrders, numOrder, loading, deliveredOrders, activeOrders, canceledOrders, unpaidOrders } =
		useOtherInfoContext();
	const { user } = useAuthContext();

	const [isLg, setIsLg] = useState(window.innerWidth >= 1024);
	useEffect(() => {
		const onResize = () => setIsLg(window.innerWidth >= 1024);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	/* stat definitions */
	const primaryStats = [
		{ icon: MdPaid, title: "Paid Orders", value: paidOrders?.length, to: "paidOrders", teal: true },
		{
			icon: FiShoppingCart,
			title: "Total Orders",
			value: user?.is_staff ? numOrder : allOrders?.length,
			to: "",
			teal: false,
		},
		{
			icon: FiPackage,
			title: "Delivered Orders",
			value: deliveredOrders?.length,
			to: "deliveredOrders",
			teal: false,
		},
		{ icon: GrTime, title: "Active Orders", value: activeOrders?.length, to: "activeOrders", teal: false },
	];

	const secondaryStats = [
		{ icon: MdOutlinePendingActions, title: "Unpaid Orders", value: unpaidOrders?.length, to: "unpaidOrders" },
		{ icon: GiCancel, title: "Canceled Orders", value: canceledOrders?.length, to: "canceledOrders" },
	];

	return (
		<div className="min-h-screen bg-white px-5 sm:px-8 lg:px-15 py-10 mx-auto">
			{/* ── page header ── */}
			<div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3"> 
				<div>
					<div className="flex items-center gap-2.5 mb-1">
						<span className="w-px h-6 bg-[#306073]" />
						<h1 className="text-xl sm:text-2xl font-extrabold text-[#0d0d0d] tracking-tight">Dashboard</h1>
					</div>
					<p className="text-xs text-[#888] pl-5">Welcome back{user?.username ? `, ${user.username}` : ""}</p>
				</div>

				{/* live dot */}
				<div className="flex items-center gap-2 text-xs text-[#888] font-medium">
					<span className="w-2 h-2 rounded-full bg-[#306073] animate-pulse" />
					Live data
				</div>
			</div>

			{/* ── loading skeletons ── */}
			{loading && (
				<div className="space-y-6">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
						{[...Array(4)].map((_, i) => (
							<SkeletonStat key={i} />
						))}
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-2">
						<div className="lg:col-span-3 h-72 bg-[#f5f5f5] animate-pulse" />
						<div className="h-72 bg-[#f5f5f5] animate-pulse" />
					</div>
				</div>
			)}

			{/* ── content ── */}
			{!loading && (
				<div className="space-y-8">
					{/* primary stat grid */}
					<div>
						<SectionLabel>Overview</SectionLabel>
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
							{primaryStats.map((s) => (
								<StatCard key={s.title} {...s} />
							))}
						</div>
					</div>

					{/* secondary stats — always visible, 2 cols */}
					<div className="grid grid-cols-2 gap-4 lg:hidden">
						{secondaryStats.map((s) => (
							<StatCard key={s.title} {...s} />
						))}
					</div>

					{/* divider */}
					<div className="border-t border-[#f0f0f0]" />

					{/* chart + sidebar */}
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
						{/* chart (3/4 width on lg) */}
						<div className="lg:col-span-3 space-y-6">
							<SectionLabel>Income Analytics</SectionLabel>
							<div className="">
								<IncomeChart />
							</div>
							{/* nested route outlet */}
							<Outlet />
						</div>

						{/* income board sidebar (1/4 width on lg, full on mobile) */}
						<div className="order-first lg:order-last">
							<SectionLabel>Summary</SectionLabel>
							<div className="border border-[#e8e8e8] bg-white">
								<IncomeBoard displayLg={isLg} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
