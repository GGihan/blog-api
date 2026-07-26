import styles from "./FullPost.module.css";
import { format } from 'date-fns';
import { useWatch, useForm } from "react-hook-form";
import { apiClient } from "@/config/api";
import Button from "../Button/Button";
// import edit from "@/assets/images/edit.svg";
// import deleteIcon from "@/assets/images/delete.svg";
import useSWR from "swr";
import Comment from "../Comment/Comment";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

// Fetch helper function for useSWR, sets data to post object immediately
const fetcher = (url) => apiClient(url).then(res => res.post);

export default function FullPost() {
  const { postId } = useParams()
  const navigate = useNavigate();
  // useSWR handles data, error and loading state, automatically refetches data on 4 conditions
  const {
    data: post,
    error: postError,
    isLoading: isPostLoading,
    mutate: refetchPost
  } = useSWR(`/posts/${postId}`, fetcher, { revalidateOnFocus: false, }); // disable refetch on tab switching

  const { register, handleSubmit, setError, control, resetField, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      content: '',
    },
    reValidateMode: 'onSubmit',
  });

  const handleSubmitComment = async (commentData) => {
    try {
      await apiClient(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(commentData),
      });
      resetField('content');
      await refetchPost();
    } catch (error) {
      if (error.name === 'ApiError' && error.status === 400) {
        // Get key-value dictionary from error helper
        const fieldErrors = error.unwrapFieldErrors(); 
        // Pass them to React Hook Form
        Object.keys(fieldErrors).forEach((field) => {
          setError(field, { type: 'server', message: fieldErrors[field] });
        });
        return;
      }

      if (error.name === 'ApiError') {
        setError('root', {
          type: 'server',
          message: error.message,
        });
        return;
      };
    }
  }

  // Track individual errors so the errors get shown in the error container
  const activeErrorMessages = [
    errors.content?.message,
    errors.root?.message,
  ].filter(Boolean);

  // Watch content input for character count
  const contentValue = useWatch({
    control,
    name: 'content',
    defaultValue: '',
  });
  const maxContentLength = 500;

  // redirect after rendering component
  useEffect(() => {
    if (postError) {
      navigate('/', { replace: true });
    }
  }, [postError, navigate]);

  if (isPostLoading) return <div>Loading post...</div>;
  if (postError) return <div>{postError.message || "Failed to load post."}</div>;

  const formattedPostDate = format(new Date(post?.createdAt), 'MM.dd.yyyy h:mm a').toLowerCase();

  return (
    <div className={`${styles.postContainer} flex-column`}>
      {(post.imageUrl) && (
        <div className={styles.imageContainer}>
          <img
            className={styles.postImage}
            src={post.imageUrl} 
            alt=""
          />
        </div>
      )}
      <div className={`${styles.articleContainer} flex-column`}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <div className={styles.contentContainer}>
          <p>{post.content}</p>
        </div>
        <div >
          <div className={`${styles.infoContainer} flex-column`}>
            <p className={styles.postAuthor}>Created by {post.user?.username}</p>
            <p className={styles.postDate}>On {formattedPostDate}</p>
          </div>
        </div>
      </div>
      <div className={`${styles.addCommentContainer} flex-column`}>
        {activeErrorMessages.length > 0 && (
          <div className={styles.errorContainer}>
            <ul className={`${styles.errorList} flex-column`}>
              {activeErrorMessages.map((message, index) => (
                <li key={index} className={`${styles.errorItem} error-message`}>
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit(handleSubmitComment)} className={`${styles.commentForm} flex-column`}>
          <div className={styles.formGroup}>
            <label htmlFor="content">Add comment</label>
            <textarea
              id='content'
              className={styles.textarea}
              {...register('content')}
              placeholder="Some comment for the post..."
              maxLength={maxContentLength}
              disabled={isSubmitting}
            />
            <div className={styles.characterCount}>
              {contentValue.length} / {maxContentLength}
            </div>
          </div>

          <Button className={styles.commentButton} type='submit' disabled={isSubmitting}>
            Comment
          </Button>
        </form>
      </div>
      <h2>Comments:</h2>

      <div className={`${styles.allCommentsContainer} flex-column`}>
        {post.comments?.length > 0 ? (
          post.comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              refetchPost={refetchPost}
            />
          )) 
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};