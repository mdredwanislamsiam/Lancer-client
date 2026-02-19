import React from 'react';

const ErrorAlert = ({err}) => {
    return (
		<div>
			<div role="alert" className="alert text-white bg-linear-to-t from-[#602727] to-[#4c1313] my-5 w-fit px-20 mx-auto border-0">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="w-3 h-3 lg:h-6 lg:w-6  shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span className='text-xs lg:text-sm'>{err}</span>
			</div>
		</div>
	);
};

export default ErrorAlert;