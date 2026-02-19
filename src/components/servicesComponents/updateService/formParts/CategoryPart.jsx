import React from 'react';

const CategoryPart = ({register,errors,categories, defValue}) => {
    return (
		<div className="w-full">
			<select
				{...register("category", { required: true })}
				className="select select-bordered w-full text-xs lg:text-sm outline-none">
				<option value={defValue.id}>{defValue.name}</option>
				{categories.map((cat) => (
					<option key={cat.id} value={cat.id}>
						{cat.name}
					</option>
				))}
			</select>
			{errors.category && <p className="text-red-500 text-xs">This field is required</p>}
		</div>
	);
};

export default CategoryPart;