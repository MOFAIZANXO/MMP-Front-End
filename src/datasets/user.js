let users = [];

export function saveUserData(userData) {
    users.push(userData);
    console.log("User data saved:", userData);
}

export function getUserData() {
    return users;
}

export function validateUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    return user ? true : false;
}
