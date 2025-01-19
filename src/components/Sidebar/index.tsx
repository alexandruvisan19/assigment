import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context";

const Sidebar = () => {
	const { cart, removeFromCart, updateCartQuantity, submitCart } = useCart();
	const { user } = useUser();
	const [errorMessages, setErrorMessages] = useState<Record<number, string>>({});

	const handleUpdateQuantity = (id: number, newQuantity: number) => {
		const errorMessage = updateCartQuantity(id, newQuantity);
		setErrorMessages((prev) => ({
			...prev,
			[id]: errorMessage ?? "",
		}));
	};

	return (
		<Box
			sx={{
				width: { xs: "auto", md: 224 },
				backgroundColor: "#232323",
				p: 2,
				boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
				zIndex: 2,
				position: "sticky",
				top: 0,
			}}
		>
			<Typography variant="h6" gutterBottom>
				Shopping Cart
			</Typography>
			<Box sx={{ maxHeight: { xs: "170px", md: "fit-content" }, overflow: "auto" }}>
				{cart.length === 0 ? (
					<Typography variant="body2">{`Hello ${user.firstName || "user"}, your cart is empty.`}</Typography>
				) : (
					cart.map((item) => (
						<Box
							key={item.id}
							sx={{
								display: "flex",
								flexDirection: "column",
								backgroundColor: "#FFF",
								color: "#232323",
								borderRadius: 1,
								padding: 2,
								marginBottom: 2,
							}}
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Typography variant="body2">{item.title}</Typography>
								<IconButton size="small" onClick={() => removeFromCart(item.id)} color="error">
									<DeleteIcon />
								</IconButton>
							</Box>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									marginTop: 1,
								}}
							>
								<IconButton
									size="small"
									onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
									disabled={item.quantity <= 1}
								>
									<RemoveIcon />
								</IconButton>
								<Typography variant="body2">{item.quantity}</Typography>
								<IconButton size="small" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
									<AddIcon />
								</IconButton>
							</Box>
							{errorMessages[item.id] && (
								<Typography variant="caption" color="error" sx={{ marginTop: 1 }}>
									{errorMessages[item.id]}
								</Typography>
							)}
						</Box>
					))
				)}
			</Box>
			<Button
				disabled={cart.length === 0}
				variant="contained"
				color="primary"
				fullWidth
				onClick={submitCart}
				sx={{ mt: 2 }}
			>
				Submit Order
			</Button>
		</Box>
	);
};

export default Sidebar;
