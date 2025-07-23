import useAxiosSecure from '../hooks/useAxiosSecure';

const usePostAPI = () => {
    const axiosSecure = useAxiosSecure();

    const getPosts = () => {
        return axiosSecure.get('/posts').then(response => response.data)
    }
    return { getPosts }
};

export default usePostAPI;