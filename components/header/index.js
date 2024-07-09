import React, { useEffect, useState } from "react";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const router = useRouter();

  const logOut = async () => {
    document.cookie =
      "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    try {
      await axios.get("https://service.pace-unv.cloud/api/logout");
    } catch (error) {
      console.log(error);
    }
    router.push("/loginpage");
  };

  return (
    <Navbar className="shadow-lg mb-2 rounded-2xl" fluid>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Sanber Daily
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <Link href={'/profilepage'}>
            <Dropdown.Item>My Profile</Dropdown.Item>
          </Link>
          <Dropdown.Item>Notification</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logOut}>Sign out</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
};

export default Header;
