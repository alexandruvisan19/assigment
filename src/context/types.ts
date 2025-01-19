export type CartItem = {
	id: number;
	title: string;
	price: number;
	stock: number;
	quantity: number;
};

export type CartContextProps = {
	cart: CartItem[];
	addToCart: (book: CartItem) => { success: boolean; message?: string };
	removeFromCart: (id: number) => void;
	updateCartQuantity: (id: number, newQuantity: number) => void;
	submitCart: () => void;
};

export type UserProfile = {
	firstName: string;
	lastName: string;
	email: string;
	dob: string;
};

export type UserContextProps = {
	user: UserProfile;
	setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
};
