import styles from "./Comment.module.css";
import { format } from "date-fns";

export default function Comment({ comment }) {
  const formattedCommentDate = format(new Date(comment?.createdAt), 'MM.dd.yyyy h:mm a').toLowerCase();

  return (
    <div className={`${styles.commentContainer} flex-column`}>
      <p className={styles.author}>{comment.user.username}</p>  
      <p className={styles.content}>{comment.content}</p>
      <p className={styles.postDate}>{formattedCommentDate}</p>
    </div>
  );
};