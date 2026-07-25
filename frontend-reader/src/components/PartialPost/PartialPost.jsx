import styles from "./PartialPost.module.css";
import { format } from "date-fns";
import commentIcon from "@/assets/images/comment.svg";
import { Link } from "react-router";

export default function PartialPost({ post }) {
  
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