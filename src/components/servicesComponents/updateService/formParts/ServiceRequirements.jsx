import React from 'react';

const ServiceRequirements = ({register,errors,defValue}) => {
    return (
		<div className='w-full'>
			<textarea
				defaultValue={defValue}
				{...register("service_requirements", { required: true })}
				className="textarea textarea-bordered w-full outline-none"
				placeholder="Service Requirments"></textarea>
			{errors.service_requirements && <p className="text-red-500 text-xs">This field is required</p>}
		</div>
	);
};

export default ServiceRequirements;