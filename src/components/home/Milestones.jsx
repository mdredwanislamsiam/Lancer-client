import React from 'react';
import { AiOutlineSafetyCertificate, AiOutlineThunderbolt } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io';
import { PiMaskHappyFill } from 'react-icons/pi';

const Milestones = () => {
    return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
			<div className="flex flex-col rounded-xl p-5 h-full">
				<div className="mx-auto lg:mx-0">
					<IoIosPeople size={60} />
				</div>
				<div className="">
					<p className="text-xs lg:text-lg text-center lg:text-left">
						Access a pool of top talent across 700 categories
					</p>
				</div>
			</div>
			<div className="flex flex-col rounded-xl p-5 h-full">
				<div className="mx-auto lg:mx-0">
					<PiMaskHappyFill size={50} />
				</div>
				<div className="">
					<p className="text-xs lg:text-lg text-center lg:text-left">Seller happy and buyer happy</p>
				</div>
			</div>
			<div className="flex flex-col rounded-xl p-5 h-full">
				<div className="mx-auto lg:mx-0">
					<AiOutlineThunderbolt size={60} />
				</div>
				<div className="">
					<p className="text-xs lg:text-lg text-center lg:text-left">Fast and efficient Lancers</p>
				</div>
			</div>
			<div className="flex flex-col rounded-xl p-5 h-full">
				<div className="mx-auto lg:mx-0">
					<AiOutlineSafetyCertificate size={60} />
				</div>
				<div className="">
					<p className="text-xs lg:text-lg text-center lg:text-left">Full money security</p>
				</div>
			</div>
		</div>
	);
};

export default Milestones;