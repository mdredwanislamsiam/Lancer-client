import React from 'react';
import useOtherInfo from '../../hooks/useOtherInfo';
import defImg from "../../assets/images/DefaultImage.jpg"
import { Link } from 'react-router';

const Clients = () => {
    const { clients, loading } = useOtherInfo();
    

	// spinner
	if (loading)
		return (
			<div className="flex justify-center items-center my-20">
				<span className="loading loading-spinner loading-xl  text-secondary"></span>
			</div>
		);

	return (
		<div className="mt-6 card bg-linear-to-b from-[#d4e4f7] shadow-sm">
			<div className="card-body">
				<h3 className="card-title text-2xl">My Clients</h3>
				<div className="overflow-x-auto">
					<table className="table ">
						<thead className='sticky top-0'>
							<tr>
								<th>Username</th>
								<th>Name</th>
								<th>Phone Number</th>
								<th>Address</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{clients?.map((client) => (
								<tr key={client.id}>
									<td>
										<Link
											to={`/infoPage/${client?.id}`}
											className="flex gap-1 items-center">
											<img
												src={client?.image || defImg}
												alt=""
												className="w-8 h-8 rounded-full object-cover"
											/>
											<span>{client?.username}</span>
										</Link>
									</td>
									<td className="">{client?.first_name} {client?.last_name}</td>
									<td className="">{client?.phone_number}</td>
									<td className="">{client?.address}</td>
									<td className="">{client?.email}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};;

export default Clients;