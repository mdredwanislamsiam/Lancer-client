import React, {  useState } from 'react';
import authAPIClient from '../../../services/auth-api-client';
import { useParams } from 'react-router';

const ServiceImages = () => {
    const [previewImages, setPreviewImages] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false); 
    const { serviceId } = useParams(); 

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
				await authAPIClient.post(`/services/${serviceId}/images/`, formData);
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
			<h3 className="text-lg font-medium mb-2">Upload Product Images</h3>
			<input
				type="file"
				multiple
				accept="image/*"
				className="file-input file-input-bordered w-full"
				onChange={handleImageChange}
			/>
			{previewImages.length > 0 && (
				<div className="flex gap-2 mt-2">
					{previewImages.map((src, index) => (
						<img key={index} src={src} alt="Preview" className="w-20 h-20 my-2" />
					))}
				</div>
			)}
			<button onClick={handleImageUpload} disabled={loading} className="btn btn-primary w-full mt-2">
				{loading ? "Uploading images..." : "Upload Images"}
			</button>
		</div>
	);
};

export default ServiceImages;