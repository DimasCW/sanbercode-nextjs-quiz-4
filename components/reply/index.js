import React, { useEffect, useState } from "react";
import { Button, Label, Textarea } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Reply = () => {
  const router = useRouter();
  const { id } = router.query;
  const [replies, setReplies] = useState("");
  const [description, setDescription] = useState("");

  const getReplies = async () => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `https://service.pace-unv.cloud/api/replies/post/${id}`,
        config
      );
      console.log('=>' ,response.data.data)
      setReplies(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getReplies();
  }, []);

  const addReply = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      await axios.post(`https://service.pace-unv.cloud/api/replies/post/${id}`, {description}, config)
      getReplies()
      setDescription("")
    } catch (error) {
      console.log(error)
    }
  };

  const handleDelete = async (deleteId) => {
    try {
      const token = Cookies.get("user_token")
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      // console.log(deleteId)
      await axios.delete(`https://service.pace-unv.cloud/api/replies/delete/${deleteId}`, config)
      getReplies()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={addReply} className="flex w-full flex-col gap-4">
        <div className="max-w-md" id="textarea">
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Replies Post" />
          </div>
          <Textarea
            id="comment"
            placeholder="reply post..."
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button type="submit" color="info">
          Reply
        </Button>
      </form>
      <div className="shadow-xl mt-3">
        {replies.length > 0 ? (
          replies.map((reply) => (
            <div className="bg-zinc-100 p-3 mb-4 rounded-lg">
              <h2 className="text-xl font-semibold">{reply.user.name}</h2>
              <p>{new Date(reply.created_at).toLocaleDateString("en-US")}</p>
              <p>{reply.description}</p>
              {reply.is_own_reply && <button type="button" value={reply.id} onClick={(e) => handleDelete(e.target.value)} className="bg-blue-600 rounded-lg py-2 px-4 text-slate-50 mt-2">Delete</button>}
            </div>
          ))
        ) : (
          <p className="mt-5">There is no Reply yet🥺...</p>
        )}
      </div>
    </div>
  );
};

export default Reply;
