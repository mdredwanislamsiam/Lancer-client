import React, {  useEffect, useState } from 'react';
import authAPIClient from '../../../services/auth-api-client';
import { useLocation, useNavigate, useParams } from 'react-router';
import SuccessAlert from '../../alerts/SuccessAlert';

const ServiceImages = () => {
    const [previewImages, setPreviewImages] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false); 
    const { serviceId } = useParams(); 
	const navigate = useNavigate(); 
	const [ msg, setMsg ] = useState(''); 

	const location = useLocation(); 

	useEffect(() => {
		if (location.state?.sMsg) {
			setMsg(location.state?.sMsg); 
			const timer = setTimeout(() => {
				setMsg(null);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [location.state]);

    const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setImages(files);
		setPreviewImages(files.map((file) => URL.createObjectURL(file)));
	}; 


    
	const handleImageUpload = async () => {
		setLoading(true);
		if (!images.length) return alert("No image was selected!");
		try {
			for (const image of images) {
				const formData = new FormData();
				formData.append("images", image);
				const res = await authAPIClient.post(`/services/${serviceId}/images/`, formData);
				if (res.status === 201) {
					navigate('/dashboard'); 
				}
				console.log(res); 
			}
			alert("Images uploaded successfully!");
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

    return (
		<div>
			{msg && <SuccessAlert err={msg} />}
			<h3 className=" text-md lg:text-lg font-medium mb-2">Upload Product Images</h3>
			<input
				type="file"
				multiple
				accept="image/*"
				className="file-input file-input-bordered text-xs lg:text-sm outline-none  w-full"
				onChange={handleImageChange}
			/>
			{previewImages.length > 0 && (
				<div className="flex gap-2 mt-2">
					{previewImages.map((src, index) => (
						<img key={index} src={src} alt="Preview" className="w-20 h-20 my-2" />
					))}
				</div>
			)}
			<button onClick={handleImageUpload} disabled={loading} className="btn  btn-xs lg:btn-md btn-primary w-full mt-2">
				{loading ? "Uploading images..." : "Upload Images"}
			</button>
		</div>
	);
};

export default ServiceImages;