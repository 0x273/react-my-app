import React from "react";
import Comment from "./Comment";

const comments = [ //댓글 객체
    { name: "Ire", comment: "Hello" },
    { name: "season", comment: "Wave to earth" },
    { name: "daisy", comment: "Daisies" }
];

function CommentList(props) {
  return (
    <div>
        {comments.map((comment) => {
            return (
                <Comment name={comment.name} comment={comment.comment} />
            );
        })}
    </div>
  );
}

export default CommentList;