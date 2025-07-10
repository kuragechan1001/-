//この場所はスレッドの一覧を表示するだけのコンポーネント。情報をAPIでとってくるのはhome!
//個々のスレッドを表示する。（表示する形は <li>の中身！

import React from "react";
import { useContext } from "react";
import DeleteButton from "../../button/HomeButton/DeleteButton";
import { Api } from "../../hooks/Api";
import { MyCommentsContext } from "../../contexts/MyCommentsContext";
import UpdateMyCommentsButton from "../../button/MyPage/UpdateMyCommentsButton";

const MyComment = ({ myComment, userId }) => {
  console.log("コメントのuserid確認:", userId);
  const { reloadMyComments } = useContext(MyCommentsContext);

  //ここで日時の形を整形してる！
  const formatJapaneseDate = (isoString) => {
    const date = new Date(isoString);
    return (
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ` +
      `${date.getHours()}時${String(date.getMinutes()).padStart(2, "0")}分`
    );
  };

  //   ここでデータの削除のAPI実行する関数;
  const deleteMyComment = async (id) => {
    // ここでもらってるidはDELETEボタンで渡した{oneComment.id}。つまりコメントのId
    if (!id) return; //id がない場合は処理しない。
    if (!window.confirm("本当に削除しますか？")) return;

    try {
      await Api(`/comments/${id}`, "PUT"); //ここで渡されてるIdはコメントId
      // ここでデータを消したら一覧取得を再読み込みをしてる
      reloadMyComments(userId);
    } catch (error) {
      console.error("削除失敗：", error);
      alert("削除に失敗しました");
    }
  };

  return (
    <div
      style={{
        width: "550px",
        height: "350px",
        backgroundColor: "#f8f9fa",
        border: "1px solid #ccc",
      }}
      key={myComment.id}
    >
      <div
        class="card-body"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: "8px",
        }}
      >
        {/*情報をとってきて並べるときの書き方。 
    li key={thread.id}でthreadのidを紐づけしてる。ユニーク（他と被らない）の値じゃないとダメ*/}
        <p
          class="card-text"
          style={{
            fontSize: "1.25rem", // ← 文字サイズを大きく
            textAlign: "center", // ← 中央揃え
            lineHeight: "1.6", // ← 行間も少し広げる
          }}
        >
          {myComment.commentsContent}
        </p>
        <div
          style={{
            marginTop: "auto", // 下に押し下げる
            display: "flex", //中にある子要素の並び方や揃え方を細かく設定できるようになる
            justifyContent: "flex-end", //子要素を横方向に右寄せにする指定
            alignItems: "center", // ← 中央揃え
            gap: "12px", // ボタン間の余白
          }}
        >
          <small class="text-muted">
            ユーザー: {myComment.user.username}
            {/*userメソッドの中のnameを取るって意味になる。*/}
            投稿日: {formatJapaneseDate(myComment.commentPostedAt)}
          </small>
          <DeleteButton id={myComment.id} onConfirm={deleteMyComment} />
          <UpdateMyCommentsButton
            id={myComment.id}
            myComment={myComment}
            userId={userId}
          />
          {/* <MovePickupCommentButton={oneComment.id} oneComment={oneComment} /> */}
        </div>
      </div>
    </div>
  );
};
export default MyComment;
