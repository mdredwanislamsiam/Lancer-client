import { useEffect, useState, useRef } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { Link, useLocation } from "react-router";
import HoverNotificationList from "../components/notification/HoverNotificationList";
import defImg from "../assets/images/DefaultImage.jpg";
import useNotificationContext from "../hooks/useNotificationContext";

/* ─── nav links config ───────────────────────────────────────────── */
const NAV_LINKS = [
	{ to: "services", label: "Services" },
	{ to: "dashboard", label: "Dashboard" },
	{ to: "about", label: "About" },
	{ to: "contact", label: "Contact" },
];

/* ─── animated underline nav link ───────────────────────────────── */
const NavLink = ({ to, label, onClick }) => {
	const { pathname } = useLocation();
	const active = pathname.includes(to);
	return (
		<Link
			to={to}
			onClick={onClick}
			className="relative group flex flex-col items-center gap-0.5 text-sm font-semibold tracking-wide text-[#bcb7b7] hover:text-[#43849d] transition-colors duration-200">
			{label}
			<span
				className="h-[2px] bg-[#306073] transition-all duration-300 rounded-full"
				style={{ width: active ? "100%" : "0%", opacity: active ? 1 : 0 }}
				aria-hidden="true"
			/>
			<span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#306073] group-hover:w-full transition-all duration-300 rounded-full" />
		</Link>
	);
};

/* ─── mobile nav link (full-width row) ──────────────────────────── */
const MobileNavLink = ({ to, label, onClick }) => {
	const { pathname } = useLocation();
	const active = pathname.includes(to);
	return (
		<Link
			to={to}
			onClick={onClick}
			className={`flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg transition-colors duration-150
				${active ? "bg-[#eef4f6] text-[#306073]" : "text-[#1a1a1a] hover:bg-[#f5f9fa] hover:text-[#306073]"}`}>
			<span className="flex items-center gap-2">
				{active && <span className="w-1.5 h-1.5 rounded-full bg-[#306073] flex-shrink-0" />}
				{label}
			</span>
			<svg
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				className="w-3.5 h-3.5 text-[#ccc] flex-shrink-0">
				<path d="M5 8h6M8 5l3 3-3 3" />
			</svg>
		</Link>
	);
};

/* ─── main Navbar ────────────────────────────────────────────────── */
const Navbar = () => {
	const { user, logoutUser } = useAuthContext();
	const { notifications, fetchNotifications } = useNotificationContext();

	const [openNoti, setOpenNoti] = useState(false);
	const [openProfile, setOpenProfile] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const notiRef = useRef(null);
	const profileRef = useRef(null);

	/* scroll shadow */
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	/* fetch notifications when panel opens */
	useEffect(() => {
		if (openNoti) fetchNotifications(1);
	}, [openNoti]);

	/* close dropdowns on outside click */
	useEffect(() => {
		const handler = (e) => {
			if (notiRef.current && !notiRef.current.contains(e.target)) setOpenNoti(false);
			if (profileRef.current && !profileRef.current.contains(e.target)) setOpenProfile(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, []);

	/* close mobile drawer on resize to desktop */
	useEffect(() => {
		const onResize = () => {
			if (window.innerWidth >= 1024) setMobileOpen(false);
		};
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	/* lock body scroll when mobile drawer open */
	useEffect(() => {
		document.body.style.overflow = mobileOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	const unreadCount = notifications.filter((n) => !n.is_read).length;

	const closeAll = () => {
		setOpenNoti(false);
		setOpenProfile(false);
		setMobileOpen(false);
	};

	return (
		<>
			<style>{`
				/* Notification panel: full-width on small screens */
				@media (max-width: 480px) {
					.noti-panel {
						position: fixed !important;
						left: 8px !important;
						right: 8px !important;
						top: 68px !important;
						width: auto !important;
					}
				}
			`}</style>

			{/* ── Mobile overlay ── */}
			{mobileOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
					onClick={() => setMobileOpen(false)}
				/>
			)}

			{/* ── Navbar bar ── */}
			<nav
				className="fixed top-0 left-0 right-0 z-50 bg-[#1c2025] transition-shadow duration-300"
				style={{
					boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.18)" : "0 1px 0 rgba(255,255,255,0.06)",
				}}>
				<div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
					{/* ── Logo ── */}
					<Link to="/" className="flex items-center gap-2 group flex-shrink-0" onClick={closeAll}>
						<span className="w-7 h-7 rounded-md bg-[#306073] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1d4a59] transition-colors duration-200">
							<svg viewBox="0 0 18 18" fill="none" className="w-4 h-4">
								<path d="M3 14L9 4l6 10H3z" fill="white" opacity="0.9" />
								<path d="M6 14l3-5 3 5" fill="white" opacity="0.4" />
							</svg>
						</span>
						<span
							className="text-base sm:text-lg font-extrabold tracking-tight text-[#cdced0] group-hover:text-[#306073] transition-colors duration-200"
							style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.02em" }}>
							Lancer
						</span>
					</Link>

					{/* ── Desktop nav links ── */}
					<ul className="hidden lg:flex items-center gap-8 xl:gap-10">
						{NAV_LINKS.map((l) => {
							if (l.label === "Dashboard" && !user) return null;
							return (
								<li key={l.to}>
									<NavLink to={l.to} label={l.label} />
								</li>
							);
						})}
					</ul>

					{/* ── Right side ── */}
					<div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
						{user ?
							<>
								{/* ── Notification bell ── */}
								<div ref={notiRef} className="relative">
									<button
										onClick={() => {
											setOpenNoti((v) => !v);
											setOpenProfile(false);
										}}
										className="relative w-9 h-9 rounded-full flex items-center justify-center border border-[#898989] hover:border-[#306073] hover:bg-[#f5f9fa]/10 transition-all duration-200"
										aria-label="Notifications">
										{/* Bell SVG — no react-icons dep */}
										<svg
											width="18"
											height="18"
											viewBox="0 0 24 24"
											fill="none"
											stroke="#ffffff"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round">
											<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
											<path d="M13.73 21a2 2 0 0 1-3.46 0" />
										</svg>
										{unreadCount > 0 && (
											<span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-[#306073] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
												{unreadCount > 9 ? "9+" : unreadCount}
											</span>
										)}
									</button>

									{/* Notification panel */}
									<div
										className="noti-panel absolute right-0 top-[calc(100%+10px)] transition-all duration-250 origin-top-right z-50"
										style={{
											opacity: openNoti ? 1 : 0,
											transform:
												openNoti ? "scale(1) translateY(0)" : "scale(0.95) translateY(-6px)",
											pointerEvents: openNoti ? "auto" : "none",
										}}>
										<HoverNotificationList openNoti={openNoti} />
									</div>
								</div>

								{/* ── Profile dropdown ── */}
								<div ref={profileRef} className="relative">
									<button
										onClick={() => {
											setOpenProfile((v) => !v);
											setOpenNoti(false);
										}}
										className="flex items-center gap-1.5 sm:gap-2 pl-1 pr-2 sm:pr-3 py-1 rounded-full border border-[#b6b5b5] hover:border-[#306073] transition-all duration-200 group"
										aria-label="Profile menu">
										<img
											src={user?.image || defImg}
											alt="profile"
											className="w-7 h-7 rounded-full object-cover border border-[#e4e4e4] flex-shrink-0"
										/>
										{/* username hidden on xs, shown from sm */}
										<span className="text-xs font-semibold text-[#9f9f9f] hidden sm:block max-w-[70px] lg:max-w-[90px] truncate">
											{user?.username || "Account"}
										</span>
										<svg
											viewBox="0 0 12 12"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											className="w-3 h-3 text-[#888] transition-transform duration-200 flex-shrink-0"
											style={{ transform: openProfile ? "rotate(180deg)" : "rotate(0deg)" }}>
											<path d="M2 4l4 4 4-4" />
										</svg>
									</button>

									{/* Dropdown */}
									<div
										className="absolute right-0 top-[calc(100%+8px)] w-52 bg-[#1c2025] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.22)] overflow-hidden transition-all duration-200 origin-top-right z-50"
										style={{
											opacity: openProfile ? 1 : 0,
											transform:
												openProfile ? "scale(1) translateY(0)" : "scale(0.95) translateY(-6px)",
											pointerEvents: openProfile ? "auto" : "none",
										}}>
										{/* User info */}
										<div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
											<img
												src={user?.image || defImg}
												alt="profile"
												className="w-9 h-9 rounded-full object-cover flex-shrink-0"
											/>
											<div className="min-w-0">
												<p className="text-xs font-bold text-[#cecece] truncate">
													{user?.username}
												</p>
												<p className="text-[10px] text-[#b4b4b4] truncate">{user?.email}</p>
											</div>
										</div>

										{[
											{
												to: "dashboard/profile",
												label: "Profile",
												icon: (
													<svg
														viewBox="0 0 16 16"
														fill="none"
														stroke="currentColor"
														strokeWidth="1.8"
														className="w-3.5 h-3.5">
														<circle cx="8" cy="5" r="3" />
														<path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" />
													</svg>
												),
											},
											{
												to: "dashboard",
												label: "Dashboard",
												icon: (
													<svg
														viewBox="0 0 16 16"
														fill="none"
														stroke="currentColor"
														strokeWidth="1.8"
														className="w-3.5 h-3.5">
														<rect x="2" y="2" width="5" height="5" rx="1" />
														<rect x="9" y="2" width="5" height="5" rx="1" />
														<rect x="2" y="9" width="5" height="5" rx="1" />
														<rect x="9" y="9" width="5" height="5" rx="1" />
													</svg>
												),
											},
										].map((item) => (
											<Link
												key={item.to}
												to={item.to}
												onClick={() => setOpenProfile(false)}
												className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#bababa] hover:bg-white/5 hover:text-[#306073] transition-colors duration-150">
												<span className="text-[#306073]">{item.icon}</span>
												{item.label}
											</Link>
										))}

										<div className="border-t border-white/10 mt-1">
											<button
												onClick={() => {
													logoutUser();
													setOpenProfile(false);
												}}
												className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#cc3333] hover:bg-red-500/10 transition-colors duration-150">
												<svg
													viewBox="0 0 16 16"
													fill="none"
													stroke="currentColor"
													strokeWidth="1.8"
													className="w-3.5 h-3.5">
													<path d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M10 11l3-3-3-3M13 8H6" />
												</svg>
												Logout
											</button>
										</div>
									</div>
								</div>
							</>
						:	/* ── Auth buttons (logged out) ── */
							<div className="hidden sm:flex items-center gap-2">
								<Link to="/login">
									<button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold tracking-wide text-[#c5c5c5] border border-[#d0d0d0]/40 hover:border-[#306073] hover:text-[#306073] transition-all duration-200 rounded">
										Log in
									</button>
								</Link>
								<Link to="/register">
									<button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold tracking-wide bg-[#306073] hover:bg-[#1d4a59] text-white transition-colors duration-200 rounded">
										Get Started
									</button>
								</Link>
							</div>
						}

						{/* ── Hamburger (mobile) ── */}
						<button
							className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-md border border-[#ffffff]/20 hover:border-[#306073] transition-colors duration-200 ml-1 flex-shrink-0"
							onClick={() => setMobileOpen((v) => !v)}
							aria-label={mobileOpen ? "Close menu" : "Open menu"}
							aria-expanded={mobileOpen}>
							<span
								className="block w-4 h-px bg-[#aaa] transition-all duration-300 origin-center"
								style={{ transform: mobileOpen ? "rotate(45deg) translate(3px, 5px)" : "none" }}
							/>
							<span
								className="block h-px bg-[#aaa] transition-all duration-300"
								style={{ width: mobileOpen ? "0" : "16px", opacity: mobileOpen ? 0 : 1 }}
							/>
							<span
								className="block w-4 h-px bg-[#aaa] transition-all duration-300 origin-center"
								style={{ transform: mobileOpen ? "rotate(-45deg) translate(3px, -5px)" : "none" }}
							/>
						</button>
					</div>
				</div>

				{/* ── Mobile drawer ── */}
				<div
					className="lg:hidden overflow-hidden transition-all duration-300"
					style={{
						maxHeight: mobileOpen ? "500px" : "0px",
						opacity: mobileOpen ? 1 : 0,
					}}>
					<div className="border-t border-white/10 bg-white px-4 py-3 flex flex-col gap-1">
						{/* Nav links */}
						{NAV_LINKS.map((l) => {
							if (l.label === "Dashboard" && !user) return null;
							return (
								<MobileNavLink
									key={l.to}
									to={l.to}
									label={l.label}
									onClick={() => setMobileOpen(false)}
								/>
							);
						})}

						{/* Auth buttons inside drawer when logged out */}
						{!user && (
							<div className="flex gap-2 mt-2 pt-3 border-t border-gray-100">
								<Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
									<button className="w-full py-2.5 text-sm font-semibold text-[#306073] border border-[#306073] rounded-lg transition-colors hover:bg-[#eef4f6]">
										Log in
									</button>
								</Link>
								<Link to="/register" className="flex-1" onClick={() => setMobileOpen(false)}>
									<button className="w-full py-2.5 text-sm font-semibold bg-[#306073] text-white rounded-lg transition-colors hover:bg-[#1d4a59]">
										Get Started
									</button>
								</Link>
							</div>
						)}

						{/* User info strip when logged in */}
						{user && (
							<div className="mt-2 pt-3 border-t border-gray-100">
								<div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-gray-50">
									<img
										src={user?.image || defImg}
										alt="profile"
										className="w-9 h-9 rounded-full object-cover border-2 border-[#306073]/30 flex-shrink-0"
									/>
									<div className="min-w-0 flex-1">
										<p className="text-xs font-bold text-[#1a1a1a] truncate">{user?.username}</p>
										<p className="text-[10px] text-[#888] truncate">{user?.email}</p>
									</div>
									<button
										onClick={() => {
											logoutUser();
											setMobileOpen(false);
										}}
										className="flex-shrink-0 text-[10px] font-semibold text-[#cc3333] border border-[#cc3333]/30 px-2.5 py-1 rounded-md hover:bg-red-50 transition-colors">
										Logout
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</nav>

			{/* spacer */}
			<div className="h-14 sm:h-16" />
		</>
	);
};

export default Navbar;
