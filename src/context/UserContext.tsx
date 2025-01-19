import React, { createContext, useContext, useState } from "react";
import { UserContextProps, UserProfile } from "./types";

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserProfile>({
		firstName: "",
		lastName: "",
		email: "",
		dob: "",
	});

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
