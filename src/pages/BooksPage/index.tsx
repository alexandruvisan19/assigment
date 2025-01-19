import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useCart } from "../../context/CartContext";
import { mockData } from "../../mockData";

const BooksPage = () => {
	const { addToCart } = useCart();
	const [searchTerm, setSearchTerm] = useState("");
	const [books, setBooks] = useState(mockData);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const search = event.target.value.toLowerCase();
		setSearchTerm(search);
		setBooks(
			mockData.filter((book) => book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search))
		);
	};

	return (
		<Box sx={{ padding: 3, flex: 1 }}>
			<Box sx={{ marginBottom: 4 }}>
				<TextField
					fullWidth
					value={searchTerm}
					onChange={handleSearch}
					placeholder="Search by title or author..."
					variant="outlined"
				/>
			</Box>

			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: { xs: "none", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
					gap: 3,
				}}
			>
				{books.map((book) => (
					<Card
						key={book.id}
						sx={{
							display: "flex",
							flexDirection: "column",
							height: "100%",
						}}
					>
						<CardContent>
							<Typography variant="h6">{book.title}</Typography>
							<Typography variant="body2" color="text.secondary">
								Author: {book.author}
							</Typography>
							<Typography variant="body1" sx={{ fontWeight: "bold", marginTop: 1 }}>
								Price: ${book.price}
							</Typography>
							<Typography variant="body2" color={book.stock > 0 ? "text.primary" : "error"} sx={{ marginTop: 1 }}>
								Stock: {book.stock > 0 ? book.stock : "Out of stock"}
							</Typography>
						</CardContent>
						<CardActions sx={{ marginTop: "auto" }}>
							<Button
								variant="contained"
								color={book.stock > 0 ? "primary" : "inherit"}
								fullWidth
								disabled={book.stock === 0}
								onClick={() => {
									const result = addToCart({ ...book, quantity: 1 });
									if (!result.success) {
										alert(result.message);
									} else {
										console.log(`${book.title} added to cart successfully!`);
									}
								}}
							>
								{book.stock > 0 ? "Add to Cart" : "Out of Stock"}
							</Button>
						</CardActions>
					</Card>
				))}
			</Box>
		</Box>
	);
};

export default BooksPage;
