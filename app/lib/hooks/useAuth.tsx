import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/client";
/**
 *
 * @returns Auth information if someone is logged in/true and null if nobody is logged in
 */
function useAuth() {
  const [user, setLocalUser] = useState<any | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        console.log("There is a user currently signed in");
        setLocalUser(user);
      } else {
        console.log("There is no user currently logged in...");
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
}

export default useAuth;
