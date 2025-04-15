
export interface AuthProvider<UserType = unknown> {
    login: (email: string, password: string) => Promise<UserType>
    register: (email: string, password: string) => Promise<UserType>
    logout: () => Promise<void>
  }