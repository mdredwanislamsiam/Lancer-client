import React from 'react';

const TimePart = ({register, errors, defWeeks, defDays, defHours}) => {
    return (
		<div className="w-full">
			<div className="flex  gap-1 w-full justify-between">
				{/* Weeks */}
				<div className="w-full">
					<label htmlFor="" className="label text-xs lg:text-sm">
						Weeks
					</label>
					<input
						type="number"
						defaultValue={defWeeks}
						{...register("delivery_weeks", { required: true })}
						className="input input-bordered text-xs lg:text-sm w-full outline-none"
						placeholder="Weeks"
					/>
					{errors.delivery_weeks && <p className="text-red-500 text-xs">This field is required</p>}
				</div>
				{/* Days */}
				<div className="w-full">
					<label htmlFor="" className="label text-xs lg:text-sm">
						Days
					</label>
					<input
						type="number"
						defaultValue={defDays}
						{...register("delivery_days", { required: true })}
						className="input input-bordered w-full text-xs lg:text-sm outline-none"
						placeholder="Days"
					/>
					{errors.delivery_days && <p className="text-red-500 text-xs">This field is required</p>}
				</div>
				{/* Hours */}
				<div className="w-full">
					<label htmlFor="" className="label text-xs lg:text-sm">
						Hours
					</label>
					<input
						type="number"
						defaultValue={defHours}
						{...register("delivery_hours", { required: true })}
						className="input input-bordered w-full text-xs lg:text-sm outline-none"
						placeholder="Hours"
					/>
					{errors.delivery_hours && <p className="text-red-500 text-xs">This field is required</p>}
				</div>
			</div>
		</div>
	);
};

export default TimePart;