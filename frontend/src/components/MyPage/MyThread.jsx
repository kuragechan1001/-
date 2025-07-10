//この場所はスレッドの一覧を表示するだけのコンポーネント。情報をAPIでとってくるのはhome!
//個々のスレッドを表示する。（表示する形は <li>の中身！

import React from "react";
import DeleteButton from "../../button/HomeButton/DeleteButton";
import MovePickupThreadButton from "../../button/HomeButton/MovePickupThreadButton";
import { useContext } from "react";
import { Api } from "../../hooks/Api";
import { MyThreadsContext } from "../../contexts/MyThreadsContext";
import UpdateMyThreadsButton from "../../button/LoginPageButton/UpdateMyThreadsButton";

const MyThread = ({ thread, userId }) => {
  console.log("スレッドのuserid確認:", userId);
  const { reloadMyThreads } = useContext(MyThreadsContext);

  //ここで日時の形を整形してる！
  const formatJapaneseDate = (isoString) => {
    const date = new Date(isoString);
    return (
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ` +
      `${date.getHours()}時${String(date.getMinutes()).padStart(2, "0")}分`
    );
  };

  // ここでデータの削除のAPI実行する関数
  const deletePost = async (id) => {
    if (!id) return; //id がない場合は処理しない
    if (!window.confirm("本当に削除しますか？")) return;

    try {
      await Api(`/threads/delete/${id}`, "PUT");
      // ここでデータを消したら一覧取得を再読み込みをしてる
      reloadMyThreads(userId);
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
      key={thread.id}
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
        <h3
          class="card-title"
          style={{
            textAlign: "center", // ← 中央揃え
          }}
        >
          {thread.title}
        </h3>
        <p
          class="card-text"
          style={{
            fontSize: "1.25rem", // ← 文字サイズを大きく
            textAlign: "center", // ← 中央揃え
            lineHeight: "1.6", // ← 行間も少し広げる
          }}
        >
          {thread.content}
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
            ユーザー: {thread.user.username}
            {/*userメソッドの中のnameを取るって意味になる。*/}
            投稿日: {formatJapaneseDate(thread.postedAt)}{" "}
          </small>
          <DeleteButton id={thread.id} onConfirm={deletePost} />
          <UpdateMyThreadsButton
            thread={thread}
            id={thread.id}
            userId={userId}
          />
          <MovePickupThreadButton id={thread.id} thread={thread} />
        </div>
      </div>
    </div>
  );
};
export default MyThread;
