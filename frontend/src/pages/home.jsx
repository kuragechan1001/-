//ThreadTable→ThreadListに来た
//APIでスレッド一覧を取得 (fetch でデータを取る)

import { useEffect, useState } from "react";
import MoveCreateThreas from "../button/HomeButton/MoveCreateThreadsBotton";
import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import kaisou from "../design/images/kaisou.png";
import ThreadsList from "../components/home/ThreadsList";
import MoveUserpageButton from "../button/HomeButton/MoveUserpageButton";
import MoveLoginPage from "../button/HomeButton/MoveLoginPage";
import { useContext } from "react";
import { ThreadsContext } from "../contexts/ThreadsContext";
import { LoginIdContext } from "../contexts/LoginIdContext";
import MoveMyPpageButton from "../button/HomeButton/MoveMyPageButton";

const Home = () => {
  // ここでデータの一覧のAPIを取得してる
  const { getthreads, fetchThreads } = useContext(ThreadsContext);
  const { getUserDate } = useContext(LoginIdContext);

  useEffect(() => {
    // スレッド一覧が既に取得済みなら再取得しない
    if (getthreads.length === 0) {
      console.log("ホームfetchThreads");
      fetchThreads();
    }
    console.log("Home - ユーザー情報:", getUserDate);
    // console.log("Home - トークン情報:", localStorage.getItem("jwtToken"));
  }, []);
  return (
    <div className={backgland.body}>
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
          width: "200px",
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
        <MoveUserpageButton />
        <MoveCreateThreas />
        <MoveMyPpageButton />
        <MoveLoginPage />
      </div>

      <div
        className={"block"}
        style={{
          position: "static",
          marginTop: "80px", // ← ヘッダーの高さ分だけ空ける
          padding: "24px",
          textAlign: "center",
        }}
      >
        {/*↓↓三項演算子とかいうやつとかいうやつ*/}
        {getthreads.length === 0 ? (
          <p>投稿がまだありません</p>
        ) : (
          <div
            className="threads-scroll-area"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start", // 縦方向はスクロールで動くので固定不要
              overflowY: "auto",
              padding: "24px",
              height: "calc(100vh - 80px)", //ヘッダーの高さを引く
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "600px", // 中央に固定される幅
                minWidth: "300px",
              }}
            >
              <ThreadsList />
            </div>
          </div>
        )}
      </div>
      <footer>
        <img className={backgland.img} src={kaisou} alt="サンプル画像" />
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
