import styles from "./PostList.module.css";
import { apiClient } from "@/config/api";
import PartialPost from "../PartialPost/PartialPost";
import useSWR from "swr";
import { useSearchParams } from "react-router";
import Pagination from "../Pagination/Pagination";

const fetcher = (url) => apiClient(url);

export default function PostList() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const {
    data,
    error: postsError,
    isLoading,
  } = useSWR(`/posts?page=${currentPage}&limit=10`, fetcher, { revalidateOnFocus: false, });

  const posts = data?.posts;
  const pagination = data?.pagination;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (isLoading) return <div>Loading posts... Server is starting up, this might take a while...</div>;
  if (postsError) return <div>{postsError?.message || "Failed to load posts."}</div>

  return (
    <div className={`${styles.allPostsContainer} flex-column`}>
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />

      {posts?.length > 0 ? (
        posts.map((post) => (
          <PartialPost key={post.id} post={post} />
        )) 
      ) : (
        <p>No posts yet.</p>
      )}

      
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};