import React from 'react';
import { AiOutlineSafetyCertificate, AiOutlineThunderbolt } from 'react-icons/ai';
import { IoIosPeople } from 'react-icons/io';
import { PiMaskHappyFill } from 'react-icons/pi';

const Milestones = () => {
    return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
			<div className="flex flex-col rounded-xl p-5 h-full">
				<div>
					<IoIosPeople size={60} />
				</div>
				<div className="">
					<p>Access a pool of top talent across 700 categories</p>
				</div>
			</div>
			<div className="flex flex-col rounded-xl p-5 h-full">
				<div>
					<PiMaskHappyFill size={50} />
				</div>
				<div className="">
					<p>Seller happy and buyer happy</p>
				</div>
			</div>
			<div className="flex flex-col rounded-xl p-5 h-full">
				<div>
					<AiOutlineThunderbolt size={60} />
				</div>
				<div className="">
					<p>Fast and efficient Lancers</p>
				</div>
			</div>
			<div className="flex flex-col rounded-xl p-5 h-full">
				<div>
					<AiOutlineSafetyCertificate size={60} />
				</div>
				<div className="">
					<p>Full money security</p>
				</div>
			</div>
		</div>
	);
};

export default Milestones;