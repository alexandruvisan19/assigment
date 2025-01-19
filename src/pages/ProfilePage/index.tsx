import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useUser } from "../../context/UserContext";

const ProfilePage = () => {
	const { user, setUser } = useUser();
	const [formData, setFormData] = useState(user);
	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			alert("Please enter a valid email address.");
			return;
		}

		setUser(formData);
		setSuccessMessage("Profile updated successfully!");
		setTimeout(() => setSuccessMessage(""), 3000);
	};

	const getInitials = () => `${formData.firstName[0]?.toUpperCase() || ""}${formData.lastName[0]?.toUpperCase() || ""}`;

	return (
		<Box sx={{ width: { xs: "-webkit-fill-available", md: '600px' }, maxWidth: 600, mx: "auto", p: 3 }}>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom sx={{ color: "#232323" }}>
					User Profile
				</Typography>
				<Avatar sx={{ bgcolor: "primary.main", width: 80, height: 80, fontSize: "2rem" }}>{getInitials()}</Avatar>
			</Box>

			<Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<TextField
					label="First Name"
					name="firstName"
					value={formData.firstName}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>
				<TextField
					label="Last Name"
					name="lastName"
					value={formData.lastName}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>
				<TextField
					label="Email"
					name="email"
					type="email"
					value={formData.email}
					onChange={handleChange}
					variant="outlined"
					fullWidth
				/>
				<TextField
					label="Date of Birth"
					name="dob"
					type="date"
					value={formData.dob}
					onChange={handleChange}
					slotProps={{ inputLabel: { shrink: true } }}
					variant="outlined"
					fullWidth
				/>
				<Button type="submit" variant="contained" color="primary" size="large" fullWidth>
					Save Profile
				</Button>
			</Box>

			{successMessage && (
				<Typography variant="body1" color="success.main" sx={{ mt: 2, fontWeight: "bold" }}>
					{successMessage}
				</Typography>
			)}
		</Box>
	);
};

export default ProfilePage;
