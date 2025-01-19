import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BooksPage from "./pages/BooksPage";
import ProfilePage from "./pages/ProfilePage";
import Sidebar from "./components/Sidebar";
import { Box } from "@mui/material";

const App = () => {
	return (
		<Router>
			<div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
				<Navbar />

				<Box sx={{ flex: 1, display: "flex", flexDirection: { xs: "column", md: "row" } }}>
					<Sidebar />
					<Routes>
						<Route path="/" element={<BooksPage />} />
						<Route path="/profile" element={<ProfilePage />} />
					</Routes>
				</Box>
			</div>
		</Router>
	);
};

export default App;
