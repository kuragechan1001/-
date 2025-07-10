//ここはユーザー情報の編集機能
import React, { useContext, useEffect } from "react";
import kaisou from "../design/images/kaisou.png";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import UpdateUser from "../components/User/UpdateUser";
import { LoginIdContext } from "../contexts/LoginIdContext";
import MoveHomeBotton from "../button/LoginPageButton/MoveHomeBotton";

export const User = () => {
  const { getUserDate, userDate, fetchCurrentUser } =
    useContext(LoginIdContext);
  console.error("getUserDateの中身：", getUserDate);
  useEffect(() => {
    if (getUserDate?.user?.id) {
      fetchCurrentUser(getUserDate.user.id);
    }
  }, [getUserDate?.user?.id]); // ← 初期化後やログイン後にだけ発火！
  console.error("userDateの中身：", userDate);
  // console.log(Array.isArray(userDate)); // true なら配列、false なら配列じゃない

  if (!userDate) {
    return <p>ユーザーが見つかりません…</p>; // 投稿が存在しない場合の処理
  }

  return (
    <div>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          textAlign: "center", // ← 中央揃え
          padding: "16px 0",
        }}
      >
        <Header />
      </header>

      <div
        style={{
          marginTop: "80px", // ← これで全体を下へ
          width: "300px",
          padding: "16px",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh", // 画面いっぱいにしたい場合
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          borderRight: "1px solid #ccc",
        }}
      >
        <MoveHomeBotton />
      </div>
      <div
        className={"block"}
        style={{
          marginTop: "80px", // ← ヘッダーの高さ分だけ空ける
          padding: "24px",
          textAlign: "center",
        }}
      >
        <h1>プロフィール編集のページ</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // ← 中央揃え
            padding: 0,
            margin: 0,
          }}
        >
          {/* commentsはコメントの一覧データ。それを.mapで展開してる。んで、展開した一つのデータをoneCommentと命名*/}

          {Array.isArray(userDate) && //ユーザー情報が配列の時、.mapで展開するけど、それ以外はしない
            userDate.map((userDate) => {
              console.log("展開されたユーザー情報", userDate);
              return <UpdateUser key={userDate.id} userDate={userDate} />;
            })}
        </div>
        <footer>
          <img className={backgland.img} src={kaisou} alt="サンプル画像" />
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default User;
