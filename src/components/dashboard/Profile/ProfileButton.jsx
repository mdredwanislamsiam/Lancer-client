import React from "react";

const ProfileButton = ({ isEditing, setIsEditing, isSubmitting }) => {
	return (
		<div className="flex justify-center pt-10">
			{isEditing ?
				<div className="space-x-3">
					<button type="submit" className="btn btn-primary px-8" disabled={isSubmitting} >
						{isSubmitting ? "saving..." : "Save Changes"}
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}> Cancel</button>
				</div>
			:	<button type="button" className="btn btn-primary px-8" onClick={() => setIsEditing(true)}>
					Edit Profile
				</button>
			}
		</div>
	);
};

export default ProfileButton;
