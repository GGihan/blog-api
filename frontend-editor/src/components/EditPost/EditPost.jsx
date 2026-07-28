import { apiClient } from "@/config/api";
import { useForm, useWatch } from "react-hook-form";
import Button from "../Button/Button";
import styles from "./EditPost.module.css";
import { useNavigate, useParams } from "react-router";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url) => apiClient(url).then(res => res.post);

export default function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null)

  const {
    data: post,
    error: postError,
    isLoading: isPostLoading,
  } = useSWR(`/posts/${postId}`,
    fetcher,
    { revalidateOnFocus: false, } // disable refetch on tab switching
  );

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting } 
  } = useForm({
    reValidateMode: 'onSubmit',
    values: {
      title: post?.title || "",
      content: post?.content || "",
      published: post?.published || false,
    },
  });

  const contentValue = useWatch({
    control,
    name: 'content',
    defaultValue: '',
  });
  const maxContentLength = 1000;

  const onSubmit = async (data) => {
    try {
      // Create formData manually because of type file image
      const formData = new FormData();
      // Append text fields
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('published', data.published);
      // <input type="file"> stores files inside an array-like FileList (data.file[0])
      if (data.file && data.file[0]) {
        formData.append('file', data.file[0]); 
      }

      await apiClient(`/posts/${post.id}`, {
        method: 'PATCH',
        body: formData,
      });
      navigate(`/posts/${post.id}`, { replace: true });
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
    errors.title?.message,
    errors.content?.message,
    errors.file?.message,
    errors.root?.message,
  ].filter(Boolean);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const imageToShow = previewUrl || post?.imageUrl;

  if (isPostLoading) return <div>Loading post...</div>;
  if (postError) return <div>{postError.message || "Failed to load post."}</div>;

  return (
    <div className={`${styles.postContainer} flex-column`}>
      <h1 className={styles.pageTitle}>Edit post</h1>
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

      <form onSubmit={handleSubmit(onSubmit)} className={`${styles.postForm} flex-column`}>
        <div className={`${styles.formGroup} ${styles.titleGroup}`}>
          <label htmlFor="title">Title</label>
          <input
            id='title'
            type='text'
            {...register('title')}
            placeholder="Title"
            maxLength={50}
          />
        </div>

        <div className={`${styles.formGroup} ${styles.contentGroup}`}>
          <label htmlFor="content">Content</label>
          <textarea
            id='content'
            className={styles.textarea}
            {...register('content')}
            placeholder="Some content for the post..."
            maxLength={maxContentLength}
          />
          <div className={styles.characterCount}>
            {contentValue.length} / {maxContentLength}
          </div>
        </div>

        <div className={`${styles.formGroup} ${styles.fileGroup}`}>
          <label htmlFor="file">Post image</label>
          <input
            id='file'
            type='file'
            {...register('file', {
              validate: {
                lessThan10MB: (files) =>
                  !files?.[0] ||
                  files[0].size <= 10 * 1024 * 1024 ||
                  'Image must be smaller than 10MB',
              },
              onChange: (e) => {
                handleFileChange(e);
              },
            })}
          />
        </div>

        {(imageToShow) && (
          <div className={styles.imageContainer}>
            <img
              className={styles.postImage}
              src={imageToShow} 
              alt=""
            />
          </div>
        )}

        <div className={styles.formGroupCheckbox}>
          <label htmlFor="published">Publish</label>
          <input
            id="published"
            className={styles.checkbox}
            type="checkbox"
            {...register('published')}
          />
        </div>

        <Button className={styles.postButton} type='submit' disabled={isSubmitting}>
          Confirm
        </Button>
      </form>
    </div>
  );
};