import defImg from "../../assets/images/DefaultImage.jpg"
import { Link } from 'react-router';
import LoadingSpinner from '../common/LoadingSpinner';
import useOtherInfoContext from '../../hooks/useOtherInfoContext';

const Clients = () => {
    const { clients, loading } = useOtherInfoContext();
    

	// spinner
	if (loading)
		return (
			<LoadingSpinner /> 
		);

	return (
		<div className="mt-6 card bg-gradient-to-b to-[rgba(111,175,247,0.76)]  shadow-sm">
			<div className="card-body">
				<h3 className="card-title text-lg lg:text-2xl">My Clients</h3>
				{clients?.length === 0 ?
					<div className=" text-xl  mx-auto w-fit my-20">No Clients</div>
				:	<div className="overflow-x-auto">
						<table className="table text-xs lg:text-sm">
							<thead className="sticky top-0">
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
											<Link to={`/infoPage/${client?.id}`} className="flex gap-1 items-center">
												<img
													src={client?.image || defImg}
													alt=""
													className="w-8 h-8 rounded-full object-cover"
												/>
												<span>{client?.username}</span>
											</Link>
										</td>
										<td className="">
											{client?.first_name} {client?.last_name}
										</td>
										<td className="">{client?.phone_number}</td>
										<td className="">{client?.address}</td>
										<td className="">{client?.email}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				}
			</div>
		</div>
	);
};;

export default Clients;