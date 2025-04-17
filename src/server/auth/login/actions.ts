"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
  
    const supabase = await createClient()
  
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
  
    if (error) {
      // No se puede retornar directamente un error con redirect.
      // Deberías manejarlo con un estado externo si deseas mostrarlo.
      console.error("Error de login:", error.message)
      throw new Error(error.message)
    }
  
    revalidatePath("/", "layout")
    redirect("/dashboard")
  }

export const logout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/");
};

export async function signup(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
  
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({ email, password })
  
    if (error) throw new Error(error.message)
  
    revalidatePath("/", "layout")
    redirect("/login")
  }

export const getCurrentUser = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
return user
}

export const changeDisplayName = async (newName: string) => {
    const supabase = await createClient();

    await supabase.auth.updateUser({
        data: {
            display_name: newName,
            otracosa: "Otra cosa",
        },
    });

    revalidatePath("/dashboard/profile", "page");
};

export const resetPassword = async (host: string) => {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
        await supabase.auth.resetPasswordForEmail(user?.email, {
            redirectTo: `${host}/reset-password`,
        });
        return true;
    }

    return false;
};

export const setNewPassword = async (newPassword: string) => {
    const supabase = await createClient();
    const result = await supabase.auth.updateUser({
        password: newPassword,
    });

    console.log(result);

    await supabase.auth.signOut();
};