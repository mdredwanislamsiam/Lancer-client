import React from 'react';

const NamePart = ({register, errors, defValue}) => {
    return (
		<div className="w-full">
			<input
				type="text"
				defaultValue={defValue}
				{...register("name", { required: true })}
				className="input input-bordered w-full outline-none"
				placeholder="Categoy Name"
			/>
			{errors.name && <p className="text-red-500 text-xs">This field is required</p>}
		</div>
	);
};

export default NamePart;