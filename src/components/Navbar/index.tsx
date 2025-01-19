import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
	const { user } = useUser();

	const getInitials = () => `${user.firstName[0]?.toUpperCase() || ""}${user.lastName[0]?.toUpperCase() || ""}`;

	const isUserEmpty = !user.firstName && !user.lastName && !user.email;

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Bookstore
				</Typography>

				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Button color="inherit" component={Link} to="/">
						Books
					</Button>
					{!isUserEmpty ? (
						<Avatar
							component={Link}
							to="/profile"
							sx={{ bgcolor: "primary.main", width: 32, height: 32, marginRight: 1 }}
						>
							{getInitials()}
						</Avatar>
					) : (
						<Button color="inherit" component={Link} to="/profile">
							<span>Profile</span>
						</Button>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
