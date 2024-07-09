import Layout from "@/layout";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Avatar, Button, Card } from "flowbite-react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [id, setId] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const router = useRouter();

  const getMe = async () => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        "https://service.pace-unv.cloud/api/user/me",
        config
      );
      setName(response.data.data.name);
      setEmail(response.data.data.email);
      setDob(response.data.data.dob);
      setId(response.data.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  const getMyPosts = async () => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `https://service.pace-unv.cloud/api/posts?type=all`,
        config
      );
      setMyPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  const deletePost = async (idData) => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `https://service.pace-unv.cloud/api/post/delete/${idData}`,
        config
      );
      getMyPosts();
      setShowDeleteModal(false); // Close modal after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (likeId) => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        `https://service.pace-unv.cloud/api/likes/post/${likeId}`,
        {},
        config
      );
      getMyPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (unlikeId) => {
    try {
      const token = Cookies.get("user_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        `https://service.pace-unv.cloud/api/unlikes/post/${unlikeId}`,
        {},
        config
      );
      getMyPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Card>
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <Avatar
            alt="Bonnie image"
            className="mb-3 rounded-full shadow-lg"
            height="96"
            src="/images/people/profile-picture-3.jpg"
            width="96"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {email}
          </span>
        </div>
        <div>
          <p>Email: {email}</p>
          <p>Date of Birth: {dob}</p>
        </div>
      </Card>

      <ul>
        <Card>
          <div className="flex flex-col items-center pb-10">
            {myPosts &&
              myPosts
                .filter((res) => {
                  return res.user.id === id;
                })
                .map((filteredPost, i) => (
                  <div key={i} className="w-full shadow-sm my-2">
                    <div className="flex gap-8 w-full mt-6">
                      <Avatar
                        alt="Bonnie image"
                        className="mb-3 rounded-full shadow-lg"
                        height="96"
                        src="/images/people/profile-picture-3.jpg"
                        width="96"
                      />
                      <div>
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          {filteredPost.user.name}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {filteredPost.user.email} - (
                          {new Date(filteredPost.created_at).toLocaleDateString(
                            "en-US"
                          )}
                          )
                        </span>
                      </div>
                    </div>
                    <p className="my-4 w-full">{filteredPost.description}</p>

                    <div className="flex space-x-3 lg:mt-6 mb-8">
                      {filteredPost.likes_count ? (
                        <button
                          type="button"
                          onClick={(e) => handleUnlike(e.target.value)}
                          value={filteredPost.id}
                          className="inline-flex items-center rounded-lg border-2 px-4 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        >
                          <svg
                            className="w-6 h-6 mr-3 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 18"
                          >
                            <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                          </svg>
                          {filteredPost.likes_count} Like
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => handleLike(e.target.value)}
                          value={filteredPost.id}
                          className="inline-flex items-center rounded-lg border-2 px-4 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        >
                          <svg
                            className="w-6 h-6 mr-3 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-2.794-.003 0 1.378-5.25 1.362-5.7-.005-.193.034-.386.114-.56L5.14 5.82 5.523 3.8c.332-1.257.83-2.75 2.47-3.555 1.07-.54 2.284-.727 3.528-.722 1.682.006 2.69.68 3.276 1.404 1.646 2.105 1.57 5.91 1.568 5.952-.01.28-.148.537-.38.697-.312.218-.7.331-1.14.331h-3.2Z"
                            />
                          </svg>
                          Like
                        </button>
                      )}

                      <Link
                        className="w-full bg-cyan-700 text-white rounded-md flex justify-center"
                        href={`/profilepage/${filteredPost.id}`}
                      >
                        <button>Detail</button>
                      </Link>

                      <Button
                        color="failure"
                        onClick={() => {
                          setPostIdToDelete(filteredPost.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
          </div>
        </Card>
      </ul>

      {/* Modal untuk konfirmasi penghapusan */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="w-6 h-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Edit
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this post? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => deletePost(postIdToDelete)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
