import React, { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../components/alerts/ErrorAlert';
import ProfileForm from '../components/dashboard/Profile/ProfileForm';
import PasswordChangeForm from '../components/dashboard/Profile/PasswordChangeForm';
import ProfileButton from '../components/dashboard/Profile/ProfileButton';
import SuccessAlert from '../components/alerts/SuccessAlert';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false); 
    const { user, updateUserProfile, errorMsg, changePassword } = useAuthContext(); 
	const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm(); 
	const [successMsg, setSuccessMsg] = useState(""); 

	useEffect(() => {
		if (successMsg) {
			const timer = setTimeout(() => {
				setSuccessMsg(null);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [successMsg]);
	

    useEffect(() => {
        if (!user) return; 
        // console.log(user); 
		Object.keys(user).forEach((key) => {
			if (key !== "image") { setValue(key, user[key]) }; 
		}); 
    }, [user, setValue]); 
    
    const onSubmit = async (data) => {
        const formData = new FormData();
		formData.append("first_name", data.first_name);
		formData.append("last_name", data.last_name);
		formData.append("email", data.email);
		formData.append("address", data.address);
		formData.append("phone_number", data.phone_number);
		formData.append("bio", data.bio);
		if (data.image && data.image[0]) {
			formData.append("image", data.image[0]);
		}
		// console.log([...formData.entries()]);

        // console.log(formData);
        try {
            const res = await updateUserProfile(formData);
			setSuccessMsg(res.message); 
            if (data.current_password && data.new_password) {
                const passChangeData = {
					current_password: data.current_password,
					new_password: data.new_password,
				};
				await changePassword(passChangeData); 
            }
        }
        catch (error) {
            console.log(error); 
        }
    }


    return (
		<div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
			<div className="card-body">
				<h2 className="card-title text-xl lg:text-2xl mb-4">Profile Information</h2>
				{errorMsg && <ErrorAlert err={errorMsg} />}
				{successMsg && <SuccessAlert err={successMsg} /> }
				<form onSubmit={handleSubmit(onSubmit)}>
					<ProfileForm register={register} errors={errors} isEditing={isEditing} />
					<PasswordChangeForm errors={errors} register={register} isEditing={isEditing} watch={watch} />
					<ProfileButton isEditing={isEditing} setIsEditing={setIsEditing} isSubmitting={isSubmitting} />
				</form>
			</div>
		</div>
	);
};

export default Profile;