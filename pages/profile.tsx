import React from "react";

import ProfileHeader from "../components/ProfileHeader";

import Header from "../components/Header";
import ProfileTabs from "../components/ProfileTabs";

type ProfileProps = {};

const Profile = ({}: ProfileProps) => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center mt-20 space-x-8">
        <ProfileHeader />
      </div>
      <div className="flex mt-20">
        <ProfileTabs />
      </div>
    </>
  );
};

export default Profile;
