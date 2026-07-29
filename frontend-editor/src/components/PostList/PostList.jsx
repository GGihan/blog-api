import styles from "./PostList.module.css";
import { apiClient } from "@/config/api";
import PartialPost from "../PartialPost/PartialPost";
import useSWR from "swr";
import { Link, useSearchParams } from "react-router";
import Pagination from "../Pagination/Pagination";
import Button from "../Button/Button";

const fetcher = (url) => apiClient(url);

export default function PostList() {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const published = searchParams.get('published') || '';

  const {
    data,
    error: postsError,
    isLoading,
    mutate: refetchPosts,
  } = useSWR(`/posts?page=${currentPage}&limit=10${published ? `&published=${published}` : ''}`,
    fetcher,
    { revalidateOnFocus: false, }
  );

  const posts = data?.posts;
  const pagination = data?.pagination;

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage);
    setSearchParams(newParams);
  };

  const handleToggleFilter = () => {
    // Determine next filter status
    let nextFilter = 'true';
    if (published === 'true') nextFilter = 'false';
    else if (published === 'false') nextFilter = '';

    // Update URL query params (Resets page to 1 automatically)
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', '1');

    if (nextFilter) {
      newParams.set('published', nextFilter);
    } else {
      newParams.delete('published'); // Remove param if showing 'All'
    }

    setSearchParams(newParams);
  };

  if (isLoading) return <div>Loading posts... Server is starting up, this might take a while...</div>;
  if (postsError) return <div>{postsError?.message || "Failed to load posts."}</div>

  return (
    <div className={`${styles.allPostsContainer} flex-column`}>
      <Button
        className={styles.publishFilterButton}
        onClick={handleToggleFilter}
      >
        { 
          published === 'true' ? 'Showing: Published' :
          published === 'false' ? 'Showing: Drafts' : 'Showing: All'
        }
      </Button>
      
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />

      {posts?.length > 0 ? (
        posts.map((post) => (
          <PartialPost key={post.id} post={post} refetchPosts={refetchPosts} />
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