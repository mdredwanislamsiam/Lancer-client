import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

const milestones = [
	{
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				width="32"
				height="32">
				<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
				<circle cx="9" cy="7" r="4" />
				<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
				<path d="M16 3.13a4 4 0 0 1 0 7.75" />
			</svg>
		),
		number: "700+",
		label: "Categories",
		description: "Access a pool of top talent across hundreds of specialized fields",
	},
	{
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				width="32"
				height="32">
				<circle cx="12" cy="12" r="10" />
				<path d="M8 14s1.5 2 4 2 4-2 4-2" />
				<line x1="9" y1="9" x2="9.01" y2="9" />
				<line x1="15" y1="9" x2="15.01" y2="9" />
			</svg>
		),
		number: "98%",
		label: "Satisfaction",
		description: "Sellers thrive, buyers succeed — mutual wins on every transaction",
	},
	{
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				width="32"
				height="32">
				<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
			</svg>
		),
		number: "24h",
		label: "Turnaround",
		description: "Fast, efficient lancers who deliver results at the speed of ambition",
	},
	{
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				width="32"
				height="32">
				<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
				<polyline points="9 12 11 14 15 10" />
			</svg>
		),
		number: "100%",
		label: "Secure",
		description: "Full money-back protection on every project, every time",
	},
];

const Card = ({ item, index }) => {
	const [visible, setVisible] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setVisible(true);
			},
			{ threshold: 0.2 },
		);
		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			style={{
				opacity: visible ? 1 : 0,
				transform: visible ? "translateY(0)" : "translateY(32px)",
				transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
			}}
			className="milestone-card">
			<div className="card-inner">
				{/* Top accent line */}
				<div className="card-accent" />

				{/* Icon bubble */}
				<div className="icon-wrap">{item.icon}</div>

				{/* Stat */}
				<div className="stat-number">{item.number}</div>
				<div className="stat-label">{item.label}</div>

				{/* Divider */}
				<div className="divider" />

				{/* Description */}
				<p className="description">{item.description}</p>
			</div>
		</div>
	);
};

const Milestones = () => {
	return (
		<>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;800&family=DM+Sans:wght@300;400;500&display=swap');

        .milestones-section {
          background: #ffffff;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .milestones-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .milestones-eyebrow {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #306073;
          background: rgba(48, 96, 115, 0.08);
          border: 1px solid rgba(48, 96, 115, 0.2);
          padding: 6px 16px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .milestones-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 800;
          color: #0e1a20;
          line-height: 1.1;
          margin: 0 0 14px;
          letter-spacing: -0.02em;
        }

        .milestones-title span {
          color: #306073;
        }

        .milestones-subtitle {
          font-size: 15px;
          color: #6b7c85;
          font-weight: 300;
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .milestones-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .milestones-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .milestones-grid { grid-template-columns: 1fr; }
        }

        .milestone-card {
          position: relative;
        }

        .card-inner {
          background: #ffffff;
          border: 1px solid #e8eef1;
          border-radius: 16px;
          padding: 32px 24px 28px;
          height: 100%;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }

        .card-inner:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(48, 96, 115, 0.12);
          border-color: #306073;
        }

        .card-inner:hover .card-accent {
          width: 100%;
        }

        .card-inner:hover .icon-wrap {
          background: #306073;
          color: #ffffff;
        }

        .card-accent {
          position: absolute;
          top: 0; left: 0;
          height: 3px;
          width: 40px;
          background: #306073;
          border-radius: 0 0 4px 0;
          transition: width 0.4s ease;
        }

        .icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background: rgba(48, 96, 115, 0.08);
          color: #306073;
          margin-bottom: 20px;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .stat-number {
          font-family: 'Syne', sans-serif;
          font-size: 36px;
          font-weight: 800;
          color: #0e1a20;
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #306073;
          margin-bottom: 18px;
        }

        .divider {
          width: 32px;
          height: 1px;
          background: #dde5e9;
          margin-bottom: 14px;
        }

        .description {
          font-size: 13.5px;
          color: #556470;
          line-height: 1.65;
          font-weight: 400;
          margin: 0;
        }

        /* Bottom bar */
        .milestones-bar {
          max-width: 1100px;
          margin: 48px auto 0;
          background: #0e1a20;
          border-radius: 14px;
          padding: 22px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .bar-text {
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          font-weight: 300;
        }

        .bar-text strong {
          color: #ffffff;
          font-weight: 500;
        }

        .bar-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #306073;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 10px 22px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.02em;
          white-space: nowrap;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .bar-cta:hover {
          background: #3d7a91;
          transform: scale(1.03);
        }

        .bar-cta svg {
          transition: transform 0.2s ease;
        }

        .bar-cta:hover svg {
          transform: translateX(3px);
        }
      `}</style>

			<section className="milestones-section">
				<div className="milestones-header">
					<h2 className="milestones-title">
						Built for <span>results</span>,<br />
						trusted by thousands
					</h2>
					<p className="milestones-subtitle">
						Everything you need to hire confidently and deliver exceptional work — backed by our platform
						guarantee.
					</p>
				</div>

				<div className="milestones-grid">
					{milestones.map((item, i) => (
						<Card key={i} item={item} index={i} />
					))}
				</div>

				<div className="milestones-bar">
					<p className="bar-text">
						Join over <strong>2 million professionals</strong> already growing with our platform.
					</p>
					<Link to={"/register"} className="bar-cta">
						Get started free
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round">
							<line x1="5" y1="12" x2="19" y2="12" />
							<polyline points="12 5 19 12 12 19" />
						</svg>
					</Link>
				</div>
			</section>
		</>
	);
};

export default Milestones;
