import { useState } from "react";
import { db } from "../../firebaseConfig";
import { doc, updateDoc, increment } from "firebase/firestore";

interface LikeButtonProps {
    postId: string;
}

export const LikeButton = ({ postId }: LikeButtonProps) => {
    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        if (!liked) {
            const postRef = doc(db, "blogPosts", postId);
            await updateDoc(postRef, {
                likes: increment(1)
            });
            setLiked(true);
        }
    };

    return (
        <button onClick={handleLike} disabled={liked}>
            {liked ? "Liked" : "Like"}
        </button>
    );
};