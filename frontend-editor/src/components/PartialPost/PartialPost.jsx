import styles from "./PartialPost.module.css";
import { format } from "date-fns";
import commentIcon from "@/assets/images/comment.svg";
import editIcon from "@/assets/images/edit.svg";
import publishIcon from "@/assets/images/publish.svg";
import deleteIcon from "@/assets/images/delete.svg";
import unpublishIcon from "@/assets/images/unpublish.svg";
import checkIcon from "@/assets/images/check-circle.svg";
import xIcon from "@/assets/images/x-circle.svg";
import { Link } from "react-router";
import Button from "../Button/Button";
import { apiClient } from "@/config/api";
import { useState } from "react";


export default function PartialPost({ post, refetchPosts }) {
  const [isUpdatingPublish, setIsUpdatingPublish] = useState(false);

  const handleTogglePublish = async () => {
    setIsUpdatingPublish(true);
    try {
      await apiClient(`/posts/${post.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ published: !post.published }),
      });
      await refetchPosts();
    } catch (error) {
      console.error(error.message || 'Could not publish post.')
    } finally {
      setIsUpdatingPublish(false);
    }
  };

  const formattedPostDate = format(new Date(post?.createdAt), 'MM.dd.yyyy h:mm a').toLowerCase();
  return (
    <div className={`${styles.postContainer} flex-column`}>
      <div className={styles.topDivider}>
        {/* Divider for top side of post */}
      </div>
      <div className={`${styles.clickableArea} flex-column`}>
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
          <h1 className={styles.postTitle}>
            <Link to={`/posts/${post.id}`} className={styles.postTitleLink}>
              {post.title}
            </Link>
          </h1>
          <div className={styles.contentContainer}>
            <p>{post.content}</p>
          </div>
          <div>
            <div className={`${styles.infoContainer} flex-column`}>
              <p className={styles.postAuthor}>Created by {post.user?.username}</p>
              <p className={styles.postDate}>On {formattedPostDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${post.published ? styles.published : styles.unpublished} flex-row`}>
        <img
          className={styles.publishStatusImage}
          src={post.published ? checkIcon : xIcon}
          alt=""
          width='30'
          height='30'
          aria-hidden="true"
        />
        {post.published ? 'Published' : 'Draft'}
      </div>
      <div className={`${styles.controlsContainer} flex-row`}>
        <Button
          className={post.published ? styles.unpublishButton : styles.publishButton}
          onClick={handleTogglePublish}
          disabled={isUpdatingPublish}
        >
          <img
            className={styles.publishButtonImage}
            src={post.published ? unpublishIcon : publishIcon}
            alt=""
            width='20'
            height='20'
            aria-hidden="true"
          />
          {isUpdatingPublish ? 'Updating...' : post.published ? 'Unpublish' : 'Publish'}
        </Button>

        <Link to={`/posts/${post.id}/edit`}  className={`${styles.linkGroup} ${styles.editButton}`}>
          <img
            className={styles.editImage}
            src={editIcon}
            alt=""
            width='20'
            height='20'
            aria-hidden="true"
          />
          <p className={styles.linkText}>Edit</p>
        </Link>
        <Button
          className={styles.deleteButton}
          // onClick={handleDeletePost}
        >
          <img
            className={styles.deleteImage}
            src={deleteIcon}
            alt=""
            width='20'
            height='20'
            aria-hidden="true"
          />
          Delete
        </Button>
      </div>
      <div className={`${styles.commentContainer} flex-row`}>
        <p className={styles.commentCount}>{post._count.comments}</p>
        <div className={styles.commentImageContainer}>
          <img
            className={styles.commentImage}
            src={commentIcon} 
            alt="Comments"
            height="24"
            width="24"
          />
        </div>
      </div>
      <div className={styles.bottomDivider}>
        {/* Divider for bottom side of post */}
      </div>
    </div>
  );
};