import { apiClient } from "@/config/api";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import styles from "./NewPost.module.css";

export default function NewPost() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
      reValidateMode: 'onSubmit',
    });

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

      const responseData = await apiClient('/posts', {
        method: 'POST',
        body: formData,
      });
      // navigate to home page
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

  return (
    <div className={styles.postContainer}>
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
        <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id='title'
            type='text'
            {...register('title')}
            placeholder="Title"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id='content'
            {...register('content')}
            placeholder="Some content for the post..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="file">Post image</label>
          <input
            id='file'
            type='file'
            {...register('file', {
              validate: {
                lessThan10MB: (files) =>
                  !files[0] ||
                  files[0].size <= 10 * 1024 * 1024 ||
                  'Image must be smaller than 10MB',
              },
            })}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="published">Publish post</label>
          <input
            id="published"
            type="checkbox"
            {...register('published')}
          />
        </div>

        <Button className={styles.postButton} type='submit'>
          Post
        </Button>
      </form>
    </div>
  );
};