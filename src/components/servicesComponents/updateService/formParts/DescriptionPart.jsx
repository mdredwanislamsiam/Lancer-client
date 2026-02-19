import React from 'react';

const DescriptionPart = ({register,errors,defValue}) => {
    return (
		<div className="w-full">
			<textarea
				defaultValue={defValue}
				{...register("description", { required: true })}
				className="textarea textarea-bordered w-full text-xs lg:text-sm outline-none"
				placeholder="Description"></textarea>
			{errors.description && <p className="text-red-500 text-xs">This field is required</p>}
		</div>
	);
};

export default DescriptionPart;