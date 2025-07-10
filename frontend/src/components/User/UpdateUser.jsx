import React, { useContext, useEffect } from "react";

import UpdateUserButton from "../../button/UserPageButton/UpdateUserButton";
import { LoginIdContext } from "../../contexts/LoginIdContext";
import { useNavigate } from "react-router-dom";
import { Api } from "../../hooks/Api";
import DeleteButton from "../../button/HomeButton/DeleteButton";

const UpdateUser = ({ userDate }) => {
  const { fetchCurrentUser } = useContext(LoginIdContext);
  const navigate = useNavigate();

  const deleteUser = async () => {
    const id = userDate?.id;
    if (!id) {
      alert("ユーザーIDが取得できませんでした");
      return;
    }

    if (!window.confirm("本当に削除しますか？")) return;

    try {
      await Api(`/users/delete/${id}`, "PUT");

      console.log("削除成功！");
      navigate("/"); // 成功時はホームへリダイレクト
    } catch (error) {
      console.error("削除エラー:", error);
      alert("削除に失敗しました。もう一度お試しください。");
    }
  };

  if (!userDate) {
    return <p>ユーザーが見つかりません…</p>;
  }
  return (
    <div
      style={{
        width: "550px",
        height: "350px",
        backgroundColor: "#f8f9fa",
        border: "1px solid #ccc",
      }}
      key={userDate.id}
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
        <div
          class="card-text"
          style={{
            fontSize: "1.25rem", // ← 文字サイズを大きく
            textAlign: "center", // ← 中央揃え
            lineHeight: "1.6", // ← 行間も少し広げる
          }}
        >
          <p>名前: {userDate.username}</p>
          <p>メールアドレス: {userDate.mailadress}</p>
          <p>電話番号: {userDate.phoneNumber}</p>
          <p>パスワード: {"🪼".repeat(userDate.password.length)}</p>
        </div>
        <div
          style={{
            marginTop: "auto", // 下に押し下げる
            display: "flex", //中にある子要素の並び方や揃え方を細かく設定できるようになる
            justifyContent: "flex-end", //子要素を横方向に右寄せにする指定
            alignItems: "center", // ← 中央揃え
            gap: "12px", // ボタン間の余白
          }}
        >
          <DeleteButton onConfirm={deleteUser} id={userDate.id} />
          <UpdateUserButton userDate={userDate} />
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
