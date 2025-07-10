import Footer from "../components/common/footer";
import Header from "../components/common/header";
import backgland from "../design/style/backgland.css";
import kaisou from "../design/images/kaisou.png";
import { useContext } from "react";
import { LoginIdContext } from "../contexts/LoginIdContext";
import MoveUserpageButton from "../button/HomeButton/MoveUserpageButton";
import MoveLoginPage from "../button/HomeButton/MoveLoginPage";
import MoveHomeBotton from "../button/LoginPageButton/MoveHomeBotton";
import MoveCreateThread from "../button/HomeButton/MoveCreateThreadsBotton";
import MyThreadsList from "../components/MyPage/MyThreadsList";
import MyCommentsList from "../components/MyPage/MyCommentsList";
import { MyCommentsProvider } from "../contexts/MyCommentsContext";
import { MyThreadsProvider } from "../contexts/MyThreadsContext";

const MyPage = () => {
  // ここでデータの一覧のAPIを取得してる
  // const { getthreads, fetchThreads } = useContext(ThreadsContext);
  const { getUserDate } = useContext(LoginIdContext);

  console.log("Mypage - ユーザーid確認用:", getUserDate.user.id); // getUserDateはPOSTで投げた際返ってきたユーザー情報
  // useEffect(() => {
  //   fetchThreads();

  // }, []);
  return (
    <div className={backgland.body}>
      <div style={{ display: "flex" }}>
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
          {/* <Header /> */}
        </header>

        <div
          className={"block"}
          style={{
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginTop: "80px", // ← ヘッダーの高さ分だけ空ける
              width: "200px",
              padding: "16px",
              position: "fixed",
              left: 0,
              height: "calc(100vh - 80px)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              borderRight: "1px solid #ccc",
              zIndex: 999, // 最前面に固定
            }}
          >
            <MoveUserpageButton />
            <MoveCreateThread />
            <MoveLoginPage />
            <MoveHomeBotton />
          </div>

          {/* ▼ 中央のメインコンテンツ */}
          <div
            style={{
              marginLeft: "150px", // ← 左ナビ分のスペース
              width: "calc(100% - 200px)", // ← 右側を使えるだけ使う

              padding: "24px",
              boxSizing: "border-box",
            }}
          >
            {/* 上に表示させたい見出し */}
            <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
              マイページ
            </h1>
            {/*↓↓三項演算子とかいうやつとかいうやつ*/}
            {getUserDate.length === 0 ? (
              <p>投稿がまだありません</p>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center", // ← 中央揃え！
                  gap: "40px", // ← 2つの間に余白を入れる
                }}
              >
                <div>
                  <h1>投稿一覧</h1>
                  <div
                    className="threads-scroll-area"
                    style={{
                      height: "calc(100vh - 80px)", // ヘッダーの高さを引く
                      overflowY: "auto",
                      padding: "16px",
                    }}
                  >
                    <MyThreadsProvider userId={getUserDate.user.id}>
                      <MyThreadsList userId={getUserDate.user.id} />
                    </MyThreadsProvider>
                  </div>
                </div>
                <div>
                  {/* ここでユーザー情報に紐ずいたコメントを一覧取得のAPIにユーザーIdを渡すを渡す */}
                  <h1>コメント一覧</h1>
                  <div
                    className="threads-scroll-area"
                    style={{
                      height: "calc(100vh - 80px)", // ヘッダーの高さを引く
                      overflowY: "auto",
                      padding: "16px",
                    }}
                  >
                    <MyCommentsProvider userId={getUserDate.user.id}>
                      <MyCommentsList userId={getUserDate.user.id} />
                    </MyCommentsProvider>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer>
        <img className={backgland.img} src={kaisou} alt="サンプル画像" />
        <Footer />
      </footer>
    </div>
  );
};

export default MyPage;
