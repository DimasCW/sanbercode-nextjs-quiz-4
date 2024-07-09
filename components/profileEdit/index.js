import Layout from "@/layout";
import React, { useEffect, useState } from "react";
import { Label, Textarea, Button } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const ProfileEdit = () => {
  const router = useRouter();
  const {id} = router.query;
  const [description, setDescription] = useState("");

  const getPostById = async () => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `https://service.pace-unv.cloud/api/post/${id}`,
        config
      );
      // console.log(response.data.data)
      setDescription(response.data.data.description);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostById();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = Cookies.get("user_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios.patch(`https://service.pace-unv.cloud/api/post/update/${id}`, {description}, config)
        router.push('/profilepage')
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <Layout>
      <h1 className="mt-5 p-3 text-2xl font-semibold">FORM EDIT</h1>
      <div className="shadow-xl p-3">
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="Your description" />
            </div>
            <Textarea
              id="comment"
              placeholder="Leave a comment..."
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button color="success" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default ProfileEdit;
