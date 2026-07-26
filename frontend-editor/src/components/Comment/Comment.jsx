import { useAuth } from "@/hooks/useAuth";
import styles from "./Comment.module.css";
import { format } from "date-fns";
import Button from "../Button/Button";
import editIcon from "@/assets/images/edit.svg";
import deleteIcon from "@/assets/images/delete.svg";
import saveIcon from "@/assets/images/save.svg";
import cancelIcon from "@/assets/images/cancel.svg";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { apiClient } from "@/config/api";

export default function Comment({ comment, refetchPost }) {
  const { user } = useAuth();
  const isCommentOwner = user?.id === comment.userId;
  const isAuthor = user?.role === 'AUTHOR';
  const formattedCommentDate = format(new Date(comment?.createdAt), 'MM.dd.yyyy h:mm a').toLowerCase();

  const [ isEditing, setIsEditing ] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      content: comment.content,
    },
    reValidateMode: 'onSubmit',
  });

  const handleSubmitEdit = async (commentData) => {
    try {
      await apiClient(`/comments/${comment.id}`, {
        method: 'PATCH',
        body: JSON.stringify(commentData),
      });
      
      setIsEditing(false);
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

  const handleCancel = () => {
    reset({ content: comment.content });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await apiClient(`/comments/${comment.id}`, {
        method: 'DELETE',
      });
      await refetchPost();
    } catch (error) {
      console.error("Failed to delete comment:", error.message);
    } finally {
      setIsDeleting(false);
    }
  }
  
  const activeErrorMessages = [
    errors.content?.message,
    errors.root?.message,
  ].filter(Boolean);

  const contentValue = useWatch({
    control,
    name: 'content',
    defaultValue: comment.content || '',
  });
  const maxContentLength = 500;

  if (isEditing) {
    return (
      <div className={`${styles.commentContainer} ${styles.editing} flex-column`}>
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

        <form onSubmit={handleSubmit(handleSubmitEdit)} className={`${styles.commentForm} flex-column`}>
          <textarea
            id='content'
            className={styles.textarea}
            {...register('content')}
            maxLength={maxContentLength}
            disabled={isSubmitting}
          />

          <div className={styles.characterCount}>
            {contentValue.length} / {maxContentLength}
          </div>

          <div className={`${styles.controls} flex-row`}>
            <Button
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              <img
                className={styles.icon}
                src={cancelIcon}
                alt=""
                width="24"
                height="24"
                aria-hidden="true"
              />
              Cancel
            </Button>
            <Button
              className={styles.saveButton}
              type='submit'
              disabled={isSubmitting}
            >
              <img
                className={styles.icon}
                src={saveIcon}
                alt=""
                width="24"
                height="24"
                aria-hidden="true"
              />
              Save
            </Button>
          </div>
        </form>  
      </div>
    );
  }

  return (
    <div className={`${styles.commentContainer} flex-column`}>
      <p className={styles.author}>{comment.user.username}</p>  
      <p className={styles.content}>{comment.content}</p>
      <div className={`${styles.controls} flex-row`}>
        {isCommentOwner && (
          <Button
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            <img
              className={styles.icon}
              src={editIcon}
              alt=""
              width="24"
              height="24"
              aria-hidden="true"
            />
            Edit
          </Button>
        )}
        {(isCommentOwner || isAuthor) && (
          <Button
            className={styles.deleteButton}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <img
              className={styles.icon}
              src={deleteIcon}
              alt=""
              width="24"
              height="24"
              aria-hidden="true"
            />
            Delete
          </Button>
        )}
      </div>
      <p className={styles.postDate}>{formattedCommentDate}</p>
    </div>
  );
};