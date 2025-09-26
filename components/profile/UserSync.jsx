"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const UserSync = () => {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      const alreadySynced = sessionStorage.getItem("userSynced");
      if (alreadySynced) return;

      try {
        const response = await axios.post("/api/users", {
          clerkUserId: user.id,
          name: user.fullName || "Anonymous",
          email: user.emailAddresses[0]?.emailAddress || null,
          phone: user.phoneNumbers[0]?.phoneNumber || null,
        });

        if (response.status === 200) {
          console.log("User synced to DB");
          sessionStorage.setItem("userSynced", "true");
        } else {
          console.error(" Sync failed with status:", response.status);
        }
      } catch (error) {
        console.error(" Sync error:", error);
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return null;
};

export default UserSync;
