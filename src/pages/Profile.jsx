import React, { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../components/alerts/ErrorAlert';
import ProfileForm from '../components/dashboard/Profile/ProfileForm';
import PasswordChangeForm from '../components/dashboard/Profile/PasswordChangeForm';
import ProfileButton from '../components/dashboard/Profile/ProfileButton';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false); 
    const { user, updateUserProfile, errorMsg, changePassword } = useAuthContext(); 
    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm(); 
    useEffect(() => {
        if (!user) return; 
        Object.keys(user).forEach((key) => setValue(key, user[key])); 
    }, [user, setValue]); 
    
    const onSubmit = async (data) => {
        try {
            const profilePayload = {
				first_name: data.first_name,
				last_name: data.last_name,
				email: data.email,
				address: data.address,
                phone_number: data.phone_number,
                bio: data.bio,
			};
            await updateUserProfile(profilePayload);
            
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
				<h2 className="card-title text-2xl mb-4">Profile Information</h2>
				{errorMsg && <ErrorAlert err={errorMsg} />}
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