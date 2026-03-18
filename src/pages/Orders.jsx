import { useEffect, useState } from "react";
import OrderCard from "../components/order/OrderCard";
import ServicePagination from "../components/servicesComponents/ServicePagination";
import useOrderContext from "../hooks/useOrderContext";

/* ─── skeleton card ─────────────────────────────────────────────── */
const SkeletonCard = () => (
	<div className="bg-white border border-[#e8e8e8] p-5 animate-pulse">
		<div className="flex items-start justify-between mb-4">
			<div className="space-y-2">
				<div className="h-3 w-16 bg-[#f0f0f0] rounded" />
				<div className="h-5 w-40 bg-[#ebebeb] rounded" />
			</div>
			<div className="h-6 w-20 bg-[#f0f6f8] rounded" />
		</div>
		<div className="flex items-center gap-3 mb-4">
			<div className="w-10 h-10 rounded-full bg-[#f0f0f0]" />
			<div className="space-y-1.5">
				<div className="h-3 w-24 bg-[#ebebeb] rounded" />
				<div className="h-2.5 w-16 bg-[#f2f2f2] rounded" />
			</div>
		</div>
		<div className="border-t border-[#f5f5f5] pt-4 flex justify-between items-center">
			<div className="h-3 w-20 bg-[#f0f0f0] rounded" />
			<div className="h-8 w-24 bg-[#e0eaee] rounded" />
		</div>
	</div>
);

/* ─── empty state ───────────────────────────────────────────────── */
const EmptyState = () => (
	<div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
		<div className="w-16 h-16 rounded-full border-2 border-dashed border-[#c8d8dc] flex items-center justify-center">
			<svg viewBox="0 0 24 24" fill="none" stroke="#306073" strokeWidth="1.5" className="w-7 h-7 opacity-60">
				<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
				<rect x="9" y="3" width="6" height="4" rx="1" />
				<path d="M9 12h6M9 16h4" />
			</svg>
		</div>
		<div>
			<p className="text-sm font-bold text-[#0d0d0d] tracking-tight">No orders yet</p>
			<p className="text-xs text-[#888] mt-1">Your placed and received orders will appear here</p>
		</div>
	</div>
);

/* ─── main page ─────────────────────────────────────────────────── */
const Orders = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { orders, loading, totalPages, fetchOrders } = useOrderContext();

	useEffect(() => {
		fetchOrders(currentPage);
	}, [currentPage]);

	return (
		<div className="min-h-screen bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				{/* ── page header ── */}
				<div className="flex items-center justify-between mb-8">
					<div className="flex items-center gap-3">
						<span className="w-px h-6 bg-[#306073]" />
						<div>
							<h1 className="text-xl font-extrabold text-[#0d0d0d] tracking-tight leading-none">
								My Orders
							</h1>
							{!loading && orders.length > 0 && (
								<p className="text-xs text-[#888] mt-0.5">
									{orders.length} order{orders.length !== 1 ? "s" : ""}
									{totalPages > 1 ? ` · Page ${currentPage} of ${totalPages}` : ""}
								</p>
							)}
						</div>
					</div>

					{/* live indicator */}
					<div className="flex items-center gap-2 text-xs text-[#888] font-medium">
						<span className="w-2 h-2 rounded-full bg-[#306073] animate-pulse" />
						Live
					</div>
				</div>

				{/* ── loading ── */}
				{loading && (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						{[...Array(4)].map((_, i) => (
							<SkeletonCard key={i} />
						))}
					</div>
				)}

				{/* ── empty ── */}
				{!loading && orders.length === 0 && <EmptyState />}

				{/* ── orders grid ── */}
				{!loading && orders.length > 0 && (
					<>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							{orders.map((order) => (
								<OrderCard key={order.id} order={order} />
							))}
						</div>

						{/* pagination */}
						{totalPages > 1 && (
							<div className="mt-10 pt-6 border-t border-[#f0f0f0] flex justify-center">
								<ServicePagination
									handlePageChange={(p) => {
										setCurrentPage(p);
										window.scrollTo({ top: 0, behavior: "smooth" });
									}}
									totalPages={totalPages}
									currentPage={currentPage}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Orders;
