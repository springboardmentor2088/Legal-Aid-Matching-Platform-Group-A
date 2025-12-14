import React, { useEffect, useState } from "react";
import { getProfile } from "../api/auth.js";

export default function Profile() {
  // const [profile, setProfile] = useState(null);
    const [profile, setProfile] = useState({name:"ganesh",email:"gane@gmail.com",role:"admin"});


  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const res = await getProfile();
  //       setProfile(res.data);
  //     } catch {
  //       setProfile(null);
  //     }
  //   };
  //   fetch();
  // }, []);

  if (!profile) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="bg-white p-6 rounded shadow space-y-2">
        <p>
          <strong>Name:</strong> {profile.name || profile.username}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Role:</strong> {profile.role}
        </p>
      </div>
    </div>
  );
}
