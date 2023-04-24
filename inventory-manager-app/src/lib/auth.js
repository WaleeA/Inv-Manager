import pb from "./pocketbase.js";

export async function signUp(username, password) {
  try {
    await pb.auth.signUp(username, password);

    // Create a new user record in the users collection
    const userData = {
      username,
      password,
    };
    await pb.collection("users").create(userData);
  } catch (error) {
    throw error;
  }
}

export async function login(username, password) {
  try {
    await pb.auth.login(username, password);
    // Handle successful login (e.g., fetch sneakers or show a success message)
  } catch (error) {
    // Handle login error (e.g., show an error message)
  }
}
