import React from 'react';

const PricePart = ({register,errors, defValue}) => {
    return (
		<div className="w-full">
			<input
				type="text"
				defaultValue={defValue}
				{...register("price", {
					required: "This Field is required",
					validate: (value) => {
						const parsedValue = parseFloat(value);
						return !isNaN(parsedValue) || "Please enter a valid number!";
					},
				})}
				className="input input-bordered w-full text-xs lg:text-sm outline-none"
				placeholder="Price"
			/>
			{errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
		</div>
	);
};

export default PricePart;