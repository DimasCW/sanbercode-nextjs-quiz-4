import Layout from "@/layout";
import React, { useEffect, useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const Auth = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://service.pace-unv.cloud/api/login', {email, password})

            if(response.data.success){
              Cookies.set("user_token", response.data.data.token, {
                expires: new Date(response.data.expires_at),
                path: "/",
              })
              router.push("/")
            }
        } catch (error) {
            setMsg(error.response.data.message)
        }
    }

  return (
    <Layout>
        <h2 className="w-full text-blue-700 font-semibold text-2xl text-center mb-4">LOGIN</h2>
        <p className="text-blue-500 text-center mb-2">{msg && <p>{msg}</p>}</p>
      <form onSubmit={Auth} className="flex max-w-md flex-col gap-4">
        <div>
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
          <TextInput id="password1" placeholder="Password ..." required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
      </form>
      <p>Do you have account? <Link href="/registerpage" className="font-bold">Register Now</Link></p>
    </Layout>
  );
};

export default Login;
