import { useEffect, useState } from "react";
import { CiBellOn } from "react-icons/ci";
import useAuthContext from "../hooks/useAuthContext";
import { Link } from "react-router";
import useNotification from "../hooks/useNotification";
import HoverNotificationList from "../components/notification/HoverNotificationList";
import defImg from "../assets/images/DefaultImage.jpg";

const Navbar = () => {
	const { user, logoutUser } = useAuthContext();
	// console.log(user);
	const { notifications, fetchNotifications } = useNotification();
	const [openNoti, setOpenNoti] = useState(false);
	useEffect(() => {
		fetchNotifications(1);
	}, [openNoti]);

	const unreadCount = notifications.filter((n) => !n.is_read).length;
	// const unreadCount = 1
	// console.log(unreadCount);

	return (
		<div className="navbar bg-linear-to-br font-newfont1 from-[#83a4ce] shadow-sm z-10">
			<div className="navbar-start">
				<button className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="px-5 py-2 mr-5 hover:scale-105 duration-300 transition-all lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							{" "}
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>{" "}
						</svg>
					</div>
					<ul
						tabIndex="-1"
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow">
						<li className="hover:scale-105 transition-all duration-300">
							<Link to={"services"}>Service</Link>
						</li>
						<li className="hover:scale-105 transition-all duration-300">
							<Link to={"dashboard"}>Dashboard</Link>
						</li>
						<li className="hover:scale-105 transition-all duration-300">
							<Link to={"about"}>About</Link>
						</li>
					</ul>
				</button>
				<Link to={"/"}>
					<button className="font-extrabold cursor-pointer text-xl my-auto ml-0 lg:ml-10 mb-1 hover:scale-105 transition-all duration-300 uppercase font-newfont3  headTitle">
						Lancer
					</button>
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="flex gap-10 cursor-pointer font-semibold">
					<li className="hover:scale-105 transition-all duration-300">
						<Link to={"services"}>Service</Link>
					</li>
					<li className="hover:scale-105 transition-all duration-300">
						<Link to={"dashboard"}>Dashboard</Link>
					</li>
					<li className="hover:scale-105 transition-all duration-300">
						<Link to={"about"}>About</Link>
					</li>
				</ul>
			</div>
			<div className="navbar-end gap-3 mr-5">
				{user ?
					<div>
						{/* Notification Button */}

						<button className="btn btn-ghost btn-circle" onClick={() => setOpenNoti(!openNoti)}>
							<div className="indicator">
								<CiBellOn size={35} />
								{unreadCount > 0 && (
									<span
										className={`absolute -top-1 -right-1 ${unreadCount > 5 ? "w-6" : "w-4"} h-4 bg-error text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse`}>
										{unreadCount > 5 ? "5+" : unreadCount}
									</span>
								)}
							</div>
						</button>
						<div
							className={`absolute scale-70 lg:scale-100 -right-10 -top-15 lg:top-15 lg:right-20 ${openNoti ? "" : "hidden"}`}>
							<HoverNotificationList openNoti={openNoti} />
						</div>

						{/* Profile Avatar */}

						<div className="dropdown dropdown-end">
							<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full">
									<img alt="profile" src={user?.image || defImg} />
								</div>
							</div>
							<ul
								tabIndex="-1"
								className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-2 shadow">
								<li>
									<Link to={"dashboard/profile"} className="justify-between">
										Profile
										{/* <span className="badge">New</span> */}
									</Link>
								</li>
								<li>
									<Link to={"dashboard"} className="justify-between">
										Dashboard
										{/* <span className="badge">New</span> */}
									</Link>
								</li>
								<li>
									<button onClick={logoutUser}>Logout</button>
								</li>
							</ul>
						</div>
					</div>
				:	<div className="flex gap-3">
						<Link
							to="/login"
							className="btn btn-xs lg:btn-md border-0 shadow-xl bg-[#3282B8] hover:bg-[#226795] hover:scale-105 text-md w-fit">
							{" "}
							Login
						</Link>
						<Link
							to="/register"
							className="btn btn-xs lg:btn-md border-0 shadow-xl bg-[#3282B8] hover:bg-[#226795] hover:scale-105 text-md w-fit">
							{" "}
							Register
						</Link>
					</div>
				}
			</div>
		</div>
	);
};

export default Navbar;
