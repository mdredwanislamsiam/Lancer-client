import React from 'react';

const SuccessAlert = ({err}) => {
    return (
		<div>
			<div role="alert" className="alert text-white bg-linear-to-t from-[#27602c] to-[#164c13] my-5 w-fit px-20 mx-auto border-0">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-3 h-3 lg:h-6 lg:w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span className="text-xs lg:text-sm">{err}</span>
			</div>
		</div>
	);
};

export default SuccessAlert;