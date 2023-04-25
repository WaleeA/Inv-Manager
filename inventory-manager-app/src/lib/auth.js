import pb from "./pocketbase.js";

pb.autoCancellation(false);
export const isUserValid = pb.authStore.isValid;

export async function login(username, password) {
  await pb.collection("users").authWithPassword(username, password);
  window.location.reload();
}
export function signout() {
  pb.authStore.clear();
  window.location.reload();
}
export async function signup(username, password) {
  const passData = {
    username: username,
    password: password,
    passwordConfirm: password,
  };
  await pb.collection("users").create(passData);
}
