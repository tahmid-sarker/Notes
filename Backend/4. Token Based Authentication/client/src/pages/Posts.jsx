import { useState } from "react";
import { useEffect } from "react";
import usePostAPI from "../api/usePostAPI";

const Posts = () => {
    const { getPosts } = usePostAPI();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then(data => setPosts(data));
    }, []);

    return (
        <div>
            <h1>Posts Data: {posts.length}</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id} className="my-2 p-2 border rounded">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;