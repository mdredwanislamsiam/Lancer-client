import defImg from "../../../assets/images/DefaultImage.jpg";
import { Link } from "react-router";

/* ─── status config ─────────────────────────────────────────────── */
const STATUS_STYLES = {
	"Not paid": { dot: "bg-[#888]", text: "text-[#555]", bg: "bg-[#f5f5f5]", border: "border-[#ddd]" },
	Paid: { dot: "bg-[#306073]", text: "text-[#306073]", bg: "bg-[#f0f6f8]", border: "border-[#c8dce2]" },
	Active: { dot: "bg-[#2a6496]", text: "text-[#2a5f80]", bg: "bg-[#edf4f8]", border: "border-[#b8d4e2]" },
	Canceled: { dot: "bg-[#b84040]", text: "text-[#b84040]", bg: "bg-[#fdf3f3]", border: "border-[#f0c8c8]" },
	Delivered: { dot: "bg-[#2e7d52]", text: "text-[#2e7d52]", bg: "bg-[#f0f8f4]", border: "border-[#b8dfc8]" },
};

const StatusBadge = ({ status }) => {
	const s = STATUS_STYLES[status] ?? STATUS_STYLES["Not paid"];
	return (
		<span
			className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 border ${s.bg} ${s.border} ${s.text}`}>
			<span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
			{status}
		</span>
	);
};

/* ─── user cell ─────────────────────────────────────────────────── */
const UserCell = ({ to, image, username }) => (
	<Link to={to} className="flex items-center gap-2 group w-fit">
		<img
			src={image || defImg}
			alt={username}
			className="w-7 h-7 rounded-full object-cover border border-[#e4e4e4] flex-shrink-0"
		/>
		<span className="text-xs font-medium text-[#333] group-hover:text-[#306073] transition-colors duration-150 truncate max-w-[90px]">
			{username}
		</span>
	</Link>
);

/* ─── skeleton rows ─────────────────────────────────────────────── */
const SkeletonRows = () => (
	<>
		{[...Array(5)].map((_, i) => (
			<tr key={i} className="border-b border-[#f5f5f5] animate-pulse">
				<td className="px-4 py-3">
					<div className="h-3 w-10 bg-[#f0f0f0] rounded" />
				</td>
				<td className="px-4 py-3">
					<div className="flex items-center gap-2">
						<div className="w-7 h-7 rounded-full bg-[#ebebeb]" />
						<div className="h-3 w-20 bg-[#ebebeb] rounded" />
					</div>
				</td>
				<td className="px-4 py-3">
					<div className="flex items-center gap-2">
						<div className="w-7 h-7 rounded-full bg-[#ebebeb]" />
						<div className="h-3 w-20 bg-[#ebebeb] rounded" />
					</div>
				</td>
				<td className="px-4 py-3">
					<div className="h-5 w-16 bg-[#f0f0f0] rounded" />
				</td>
				<td className="px-4 py-3">
					<div className="h-3 w-20 bg-[#f0f0f0] rounded" />
				</td>
				<td className="px-4 py-3">
					<div className="h-3 w-12 bg-[#f0f0f0] rounded" />
				</td>
			</tr>
		))}
	</>
);

/* ─── empty state ───────────────────────────────────────────────── */
const EmptyState = ({ title }) => (
	<tr>
		<td colSpan={6}>
			<div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
				<div className="w-12 h-12 rounded-full border-2 border-dashed border-[#c8d8dc] flex items-center justify-center">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="#306073"
						strokeWidth="1.5"
						className="w-5 h-5 opacity-60">
						<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
					</svg>
				</div>
				<div>
					<p className="text-sm font-bold text-[#0d0d0d]">No {title}</p>
					<p className="text-xs text-[#888] mt-0.5">Orders will appear here once placed</p>
				</div>
			</div>
		</td>
	</tr>
);

/* ─── main component ────────────────────────────────────────────── */
const OrderComponent = ({ orders, loading, getTime, title }) => {
	const COLS = ["Order ID", "Seller", "Buyer", "Status", "Date", "Amount"];

	return (
		<div className="mt-6">
			{/* card */}
			<div className="bg-white border border-[#e8e8e8]">
				{/* header */}
				<div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f0f0] bg-[#fafafa]">
					<div className="flex items-center gap-2.5">
						<span className="w-px h-5 bg-[#306073]" />
						<h3 className="text-sm font-bold text-[#0d0d0d] tracking-tight">{title}</h3>
					</div>

					{!loading && orders?.length > 0 && (
						<span className="text-[11px] font-semibold text-[#306073] bg-[#f0f6f8] border border-[#c8dce2] px-2.5 py-1 rounded-full">
							{orders.length} order{orders.length !== 1 ? "s" : ""}
						</span>
					)}
				</div>

				{/* table wrapper — scrollable */}
				<div className="overflow-x-auto overflow-y-auto max-h-[420px]">
					<table className="w-full min-w-[640px] text-left border-collapse">
						{/* sticky head */}
						<thead className="sticky top-0 z-10 bg-white border-b border-[#ebebeb]">
							<tr>
								{COLS.map((col) => (
									<th
										key={col}
										className="px-4 py-3 text-[10px] font-bold tracking-widest uppercase text-[#888]">
										{col}
									</th>
								))}
							</tr>
						</thead>

						<tbody>
							{loading ?
								<SkeletonRows />
							: !orders?.length ?
								<EmptyState title={title} />
							:	orders.map((order, idx) => (
									<tr
										key={order.id}
										className="border-b border-[#f5f5f5] hover:bg-[#fafcfc] transition-colors duration-150 group">
										{/* order id */}
										<td className="px-4 py-3">
											<span className="text-xs font-mono font-semibold text-[#306073]">
												#{order.id}
											</span>
										</td>

										{/* seller */}
										<td className="px-4 py-3">
											<UserCell
												to={`/infoPage/${order.service?.seller?.id}`}
												image={order.service?.seller?.image}
												username={order.service?.seller?.username}
											/>
										</td>

										{/* buyer */}
										<td className="px-4 py-3">
											<UserCell
												to={`/infoPage/${order.buyer?.id}`}
												image={order.buyer?.image}
												username={order.buyer?.username}
											/>
										</td>

										{/* status */}
										<td className="px-4 py-3">
											<StatusBadge status={order.status} />
										</td>

										{/* date */}
										<td className="px-4 py-3 text-xs text-[#666] whitespace-nowrap">
											{getTime(order?.created_at)}
										</td>

										{/* amount */}
										<td className="px-4 py-3">
											<span className="text-sm font-bold text-[#0d0d0d]">
												${order.total_price}
											</span>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default OrderComponent;
