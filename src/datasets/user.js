let users = JSON.parse(localStorage.getItem("users")) || [
    {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        userType: "owner",
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        password: "securepass",
        userType: "renter",
    },
];

// Function to validate user login
export function validateUser(email, password) {
    const user = users.find(
        (user) => user.email === email && user.password === password
    );
    return user || null; // Return the user object if found, otherwise return null
}

// Other functions
export function saveUserData(userData) {
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("User data saved:", userData);
}

export function getUserData() {
    return users;
}

export function clearUserData() {
    users = [];
    localStorage.removeItem("users");
    console.log("All user data cleared.");
}
