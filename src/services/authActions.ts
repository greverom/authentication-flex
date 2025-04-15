import authProvider from "./authProvider"

export async function loginUser(email: string, password: string) {
  const user = await authProvider.login(email, password)
  console.log("usuario autenticado:", user) 
  return user
}

export async function registerUser(email: string, password: string) {
  return authProvider.register(email, password)
}

export async function logoutUser() {
  return authProvider.logout()
}

export async function getCurrentUser() {
  if ("getCurrentUser" in authProvider && typeof authProvider.getCurrentUser === "function") {
    return authProvider.getCurrentUser()
  }

  return null 
}