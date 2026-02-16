import React from 'react';

const TitlePart = ({register,errors, defValue}) => {
    return (
		<div className='w-full'>
            <input
                type='text'
                defaultValue={defValue}
				{...register("title", { required: true })}
				className="input input-bordered w-full outline-none"
				placeholder="Service Title"
			/>
			{errors.title && <p className="text-red-500 text-xs">This field is required</p>}
		</div>
	);
};

export default TitlePart;