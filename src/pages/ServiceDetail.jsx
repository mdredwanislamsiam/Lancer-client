import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import authAPIClient from "../services/auth-api-client";
import ServiceImages from "../components/servicesComponents/serviceDetails/ServiceImages";
import { FaArrowLeft } from "react-icons/fa6";
import HireService from "../components/servicesComponents/serviceDetails/HireService";
import ReviewSection from "../components/reviews/ReviewSection";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { BiUser } from "react-icons/bi";
import defaultImg from "../assets/images/DefaultImage.jpg";
import useAuthContext from "../hooks/useAuthContext";

const ServiceDetail = () => {
	const [service, setService] = useState(null);
	const [loading, setLoading] = useState(false);
	const [mounted, setMounted] = useState(false);
	const { id } = useParams();
	const { user } = useAuthContext();

	const fetchService = async () => {
		setLoading(true);
		try {
			const res = await authAPIClient.get(`/services/${id}/`);
			setService(res.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			setTimeout(() => setMounted(true), 60);
		}
	};

	useEffect(() => {
		fetchService();
	}, [id]);

	if (loading) return <LoadingSpinner />;
	if (!service) return null;

	return (
		<>
			<style>{`
				@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Figtree:wght@300;400;500;600&display=swap');

				.sd-root {
					font-family: 'Figtree', sans-serif;
					background: #f8f8f8;
					min-height: 100vh;
					padding: 0 0 80px;
				}

				/* ── hero bar ── */
				.sd-hero {
					background: #0d0d0d;
					padding: 0 clamp(24px, 6vw, 80px);
					position: relative;
					overflow: hidden;
				}
				.sd-hero::before {
					content: '';
					position: absolute;
					top: -60px; right: -60px;
					width: 280px; height: 280px;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(48,96,115,0.18) 0%, transparent 70%);
					pointer-events: none;
				}
				.sd-hero-inner {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20px 0 18px;
					border-bottom: 1px solid rgba(255,255,255,0.05);
				}
				.sd-back-link {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					font-size: 12px;
					font-weight: 500;
					letter-spacing: 0.1em;
					text-transform: uppercase;
					color: rgba(255,255,255,0.4);
					text-decoration: none;
					transition: color 0.2s ease, gap 0.2s ease;
					cursor: pointer;
				}
				.sd-back-link:hover { color: #fff; gap: 12px; }
				.sd-back-icon {
					width: 28px; height: 28px;
					border-radius: 8px;
					border: 1px solid rgba(255,255,255,0.1);
					display: flex; align-items: center; justify-content: center;
					transition: border-color 0.2s, background 0.2s;
				}
				.sd-back-link:hover .sd-back-icon {
					border-color: rgba(48,96,115,0.5);
					background: rgba(48,96,115,0.12);
				}
				.sd-breadcrumb {
					font-size: 11px;
					color: rgba(255,255,255,0.2);
					letter-spacing: 0.08em;
				}
				.sd-breadcrumb span { color: rgba(48,96,115,0.8); }

				/* ── main content ── */
				.sd-content {
					max-width: 1200px;
					margin: 0 auto;
					padding: 0 clamp(20px, 5vw, 64px);
				}

				/* ── top grid ── */
				.sd-top-grid {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: clamp(24px, 4vw, 56px);
					padding-top: 48px;
					opacity: 0;
					transform: translateY(20px);
					transition: opacity 0.5s ease, transform 0.5s ease;
				}
				.sd-top-grid.sd-mounted {
					opacity: 1;
					transform: translateY(0);
				}

				/* ── right panel ── */
				.sd-right {
					display: flex;
					flex-direction: column;
					gap: 0;
				}

				/* category pill */
				.sd-category {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					font-size: 10px;
					font-weight: 600;
					letter-spacing: 0.18em;
					text-transform: uppercase;
					color: #306073;
					border: 1px solid rgba(48,96,115,0.25);
					border-radius: 100px;
					padding: 5px 12px;
					background: rgba(48,96,115,0.05);
					width: fit-content;
					margin-bottom: 20px;
				}
				.sd-category-dot {
					width: 5px; height: 5px;
					border-radius: 50%;
					background: #306073;
				}

				/* title */
				.sd-title {
					font-family: 'Syne', sans-serif;
					font-size: clamp(22px, 3vw, 38px);
					font-weight: 800;
					line-height: 1.1;
					letter-spacing: -0.03em;
					color: #0d0d0d;
					margin-bottom: 28px;
				}

				/* seller card */
				.sd-seller-row {
					display: flex;
					align-items: center;
					gap: 10px;
					margin-bottom: 20px;
				}
				.sd-seller-label {
					font-size: 11px;
					font-weight: 600;
					letter-spacing: 0.12em;
					text-transform: uppercase;
					color: #aaa;
				}
				.sd-seller-card {
					display: inline-flex;
					align-items: center;
					gap: 10px;
					background: #ffffff;
					border: 1px solid rgba(0,0,0,0.07);
					border-radius: 100px;
					padding: 6px 14px 6px 6px;
					text-decoration: none;
					transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s;
					cursor: pointer;
				}
				.sd-seller-card:hover {
					transform: translateY(-2px);
					box-shadow: 0 6px 20px rgba(0,0,0,0.09);
					border-color: rgba(48,96,115,0.25);
				}
				.sd-seller-avatar {
					width: 28px; height: 28px;
					border-radius: 50%;
					object-fit: cover;
					border: 2px solid rgba(48,96,115,0.2);
				}
				.sd-seller-name {
					font-size: 13px;
					font-weight: 600;
					color: #0d0d0d;
				}

				/* delivery */
				.sd-delivery {
					display: inline-flex;
					align-items: center;
					gap: 8px;
					font-size: 13px;
					color: #666;
					font-weight: 400;
					margin-bottom: 28px;
					padding: 8px 14px;
					background: #f2f2f2;
					border-radius: 10px;
					width: fit-content;
				}
				.sd-delivery-icon { color: #306073; font-size: 14px; }

				/* price block */
				.sd-price-block {
					display: flex;
					align-items: baseline;
					gap: 4px;
					margin-bottom: 32px;
					padding: 20px 24px;
					background: #0d0d0d;
					border-radius: 18px;
					position: relative;
					overflow: hidden;
				}
				.sd-price-block::before {
					content: '';
					position: absolute;
					top: -30px; right: -30px;
					width: 120px; height: 120px;
					border-radius: 50%;
					background: radial-gradient(circle, rgba(48,96,115,0.2) 0%, transparent 70%);
				}
				.sd-price-symbol {
					font-family: 'Syne', sans-serif;
					font-size: 20px;
					font-weight: 700;
					color: rgba(255,255,255,0.5);
					padding-top: 4px;
				}
				.sd-price-value {
					font-family: 'Syne', sans-serif;
					font-size: 42px;
					font-weight: 800;
					letter-spacing: -0.04em;
					color: #ffffff;
					line-height: 1;
				}
				.sd-price-label {
					font-size: 11px;
					color: rgba(255,255,255,0.3);
					margin-left: 8px;
					letter-spacing: 0.08em;
					text-transform: uppercase;
					align-self: flex-end;
					padding-bottom: 6px;
				}
				.sd-price-teal-bar {
					position: absolute;
					bottom: 0; left: 0;
					height: 3px;
					width: 40%;
					background: linear-gradient(90deg, #306073, transparent);
				}

				/* hire section */
				.sd-hire { margin-top: auto; }

				/* ── info sections ── */
				.sd-sections {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 20px;
					margin-top: 48px;
					opacity: 0;
					transform: translateY(16px);
					transition: opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s;
				}
				.sd-sections.sd-mounted {
					opacity: 1;
					transform: translateY(0);
				}

				.sd-section-card {
					background: #ffffff;
					border-radius: 20px;
					border: 1px solid rgba(0,0,0,0.06);
					overflow: hidden;
					box-shadow: 0 2px 12px rgba(0,0,0,0.04);
					transition: box-shadow 0.25s ease, transform 0.25s ease;
				}
				.sd-section-card:hover {
					box-shadow: 0 8px 32px rgba(0,0,0,0.08);
					transform: translateY(-2px);
				}

				.sd-section-head {
					display: flex;
					align-items: center;
					gap: 10px;
					padding: 20px 24px 16px;
					border-bottom: 1px solid rgba(0,0,0,0.05);
				}
				.sd-section-icon {
					width: 32px; height: 32px;
					background: #0d0d0d;
					border-radius: 9px;
					display: flex; align-items: center; justify-content: center;
					flex-shrink: 0;
				}
				.sd-section-title {
					font-family: 'Syne', sans-serif;
					font-size: 14px;
					font-weight: 700;
					letter-spacing: -0.01em;
					color: #0d0d0d;
				}
				.sd-section-body {
					padding: 20px 24px;
					font-size: 14px;
					line-height: 1.8;
					color: #555;
					font-weight: 300;
				}

				/* ── reviews ── */
				.sd-reviews {
					margin-top: 48px;
					opacity: 0;
					transform: translateY(16px);
					transition: opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s;
				}
				.sd-reviews.sd-mounted {
					opacity: 1;
					transform: translateY(0);
				}
				.sd-reviews-head {
					display: flex;
					align-items: center;
					gap: 12px;
					margin-bottom: 20px;
				}
				.sd-reviews-title {
					font-family: 'Syne', sans-serif;
					font-size: 20px;
					font-weight: 800;
					letter-spacing: -0.03em;
					color: #0d0d0d;
				}
				.sd-reviews-line {
					flex: 1;
					height: 1px;
					background: linear-gradient(90deg, rgba(0,0,0,0.1), transparent);
				}

				/* ── responsive ── */
				@media (max-width: 900px) {
					.sd-top-grid { grid-template-columns: 1fr; }
					.sd-sections { grid-template-columns: 1fr; }
				}
				@media (max-width: 600px) {
					.sd-hero-inner { flex-direction: column; align-items: flex-start; gap: 8px; }
					.sd-price-value { font-size: 32px; }
				}
			`}</style>

			<div className="sd-root">
				{/* ── HERO BAR ── */}
				<div className="sd-hero">
					<div className="sd-hero-inner">
						<Link to="/services" className="sd-back-link">
							<span className="sd-back-icon">
								<FaArrowLeft size={11} />
							</span>
							Back to Services
						</Link>
						<span className="sd-breadcrumb">
							Services / <span>{service.category_detail?.name || "General"}</span>
						</span>
					</div>
				</div>

				{/* ── MAIN ── */}
				<div className="sd-content">
					{/* Top grid */}
					<div className={`sd-top-grid${mounted ? " sd-mounted" : ""}`}>
						{/* Images */}
						<ServiceImages images={service.images} serviceName={service.title} />

						{/* Right info panel */}
						<div className="sd-right">
							{/* Category */}
							<div className="sd-category">
								<span className="sd-category-dot" />
								{service.category_detail?.name || "General"}
							</div>

							{/* Title */}
							<h1 className="sd-title">{service.title}</h1>

							{/* Seller */}
							<div className="sd-seller-row">
								<span className="sd-seller-label">Seller</span>
								<Link
									to={user ? `/infoPage/${service.seller.id}` : `/login`}
									className="sd-seller-card">
									<img
										src={service.seller.image || defaultImg}
										alt={service.seller.username}
										className="sd-seller-avatar"
									/>
									<span className="sd-seller-name">{service.seller.username}</span>
								</Link>
							</div>

							{/* Delivery time */}
							<div className="sd-delivery">
								<svg
									width="14"
									height="14"
									viewBox="0 0 14 14"
									fill="none"
									className="sd-delivery-icon">
									<circle cx="7" cy="7" r="5.5" stroke="#306073" strokeWidth="1.4" />
									<path
										d="M7 4.5V7l1.5 1.5"
										stroke="#306073"
										strokeWidth="1.4"
										strokeLinecap="round"
									/>
								</svg>
								{service.delivery_time}
							</div>

							{/* Price */}
							<div className="sd-price-block">
								<span className="sd-price-symbol">$</span>
								<span className="sd-price-value">{service.price}</span>
								<span className="sd-price-label">fixed price</span>
								<div className="sd-price-teal-bar" />
							</div>

							{/* Hire CTA */}
							<div className="sd-hire">
								<HireService service={service} />
							</div>
						</div>
					</div>

					{/* Description + Requirements */}
					<div className={`sd-sections${mounted ? " sd-mounted" : ""}`}>
						<div className="sd-section-card">
							<div className="sd-section-head">
								<div className="sd-section-icon">
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
										<path
											d="M3 4h10M3 7h10M3 10h6"
											stroke="white"
											strokeWidth="1.4"
											strokeLinecap="round"
										/>
									</svg>
								</div>
								<span className="sd-section-title">Service Description</span>
							</div>
							<p className="sd-section-body">{service.description}</p>
						</div>

						<div className="sd-section-card">
							<div className="sd-section-head">
								<div className="sd-section-icon">
									<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
										<path
											d="M5 8l2 2 4-4"
											stroke="white"
											strokeWidth="1.4"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<rect
											x="2"
											y="2"
											width="12"
											height="12"
											rx="3"
											stroke="white"
											strokeWidth="1.4"
										/>
									</svg>
								</div>
								<span className="sd-section-title">Requirements</span>
							</div>
							<p className="sd-section-body">{service.service_requirements}</p>
						</div>
					</div>

					{/* Reviews */}
					<div className={`sd-reviews${mounted ? " sd-mounted" : ""}`}>
						<div className="sd-reviews-head">
							<h3 className="sd-reviews-title">Reviews</h3>
							<div className="sd-reviews-line" />
						</div>
						<ReviewSection />
					</div>
				</div>
			</div>
		</>
	);
};

export default ServiceDetail;
