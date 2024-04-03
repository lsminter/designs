import { createContext, useState, useEffect, useContext, useRef } from "react";
import { useSupabaseClient, useUser, useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Context = createContext();

const Provider = ({ children }) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const supabaseUser = useUser();
  const [user, setUser] = useState(supabaseUser);

  useEffect(() => {
    const getUserProfile = async () => {
      if (supabaseUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", supabaseUser.id)
          .single();

        setUser({
          ...supabaseUser,
          ...profile,
        });
      }
    }

    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      setUser(supabaseUser)
    });
  }, [supabase, supabaseUser]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/profile");
  };

  const exposed = {
    user,
    supabase,
    logout
  };

  return (
    <Context.Provider value={exposed}>
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);

export default Provider;