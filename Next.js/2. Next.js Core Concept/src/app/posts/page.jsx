// SSR - Server Side Rendering
import React from "react";
import { Roboto } from "next/font/google";
import PostSearchInput from "./components/PostSearchInput";

const roboto = Roboto({
  weight: ["400"],
  subsets: ["latin"],
});

const fetchSinglePost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return null; // if post not found return null
  const data = await res.json();
  return data; 
};

// Dynamic Metadata
export async function generateMetadata({ searchParams }) {
  const { id } = await searchParams;

  if (!id) {
    return {
      title: "All Posts",
      description: "List of all posts from JSONPlaceholder API",
    };
  }

  const post = await fetchSinglePost(id);

  return post ? 
  {
    title: post.title,
    description: post.body,
  } : {
    title: "Post not found",
    description: `No post exists with ID ${id}`,
  };
}

export default async function PostsPage({ searchParams }) {
  const { id } = await searchParams;

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const allPosts = await res.json();

  const posts = id ? allPosts.filter((post) => post.id === Number(id)) : allPosts;

  return (
    <section className={`${roboto.className}`}>
      <div className="flex justify-center mb-6">
        <PostSearchInput />
      </div>

      {posts.length === 0 ? (
        <p className="text-red-500 font-medium">No posts found for ID: {id}</p>
      ) : (
        posts.map((post) => (
          <article key={post.id} className="mb-4 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-bold mb-2">#{post.id} — {post.title}</h2>
            <p>{post.body}</p>
          </article>
        ))
      )}
    </section>
  );
}