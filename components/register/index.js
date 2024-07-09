import React, { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://service.pace-unv.cloud/api/register`, {
        name,
        email,
        password,
      });
      router.push("/loginpage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={saveUser} className="flex max-w-md flex-col gap-4 shadow-lg">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          placeholder="Name ..."
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          placeholder="Email ..."
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button color="failure" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Register;
