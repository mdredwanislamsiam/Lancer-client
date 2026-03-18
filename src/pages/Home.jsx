import Hero from "../components/home/Hero";
import CategoryCards from "../components/home/CategoryCards";
import PopularServices from "../components/home/PopularServices";
import Milestones from "../components/home/Milestones";
import MoneyBack from "../components/home/MoneyBack";
import ReviewsOfClients from "../components/home/ReviewsOfClients";

const SectionLabel = ({ children }) => (
	<div className="flex items-center gap-4 justify-center mb-4">
		<span className="block h-px w-12 bg-[#306073]" />
		<span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#306073]">{children}</span>
		<span className="block h-px w-12 bg-[#306073]" />
	</div>
);

const SectionHeading = ({ label, title }) => (
	<div className="text-center mb-14 mt-24 lg:mt-36">
		<SectionLabel>{label}</SectionLabel>
		<h2 className="text-3xl lg:text-6xl font-bold text-[#0d0d0d] tracking-tight leading-tight">{title}</h2>
	</div>
);

const Home = () => {
	return (
		<div className="bg-white text-[#0d0d0d] font-sans overflow-x-hidden">
			{/* Hero */}
			<Hero />

			{/* Trending Categories */}
			<section className="max-w-7xl mx-auto px-6">
				<SectionHeading label="Explore" title="Trending Categories" />
				<CategoryCards />
			</section>

			{/* Divider */}
			<div className="my-20 border-t border-[#e8e8e8] max-w-7xl mx-auto" />

			{/* Popular Services */}
			<section className="max-w-7xl mx-auto px-6">
				<SectionHeading label="Top Picks" title="Popular Services" />
				<PopularServices />
			</section>

			{/* Dark accent band */}
			<div className="max-w-7xl mx-auto px-6">
				<SectionHeading label="Why Us" title={<span>Our Promises</span>} />
				<Milestones />
			</div>

			{/* Money Back */}
			<section className="max-w-7xl mx-auto px-6">
				<MoneyBack />
			</section>

			{/* Reviews */}
			<div className="bg-[#f5f9fa] border-t border-[#dde9ec]">
				<section className="max-w-7xl mx-auto px-6">
					<SectionHeading label="Testimonials" title="Client Reviews" />
					<ReviewsOfClients />
				</section>
			</div>
		</div>
	);
};

export default Home;
