//ここのボタンを押したら、ホーム画面から、新規投稿のページ（Threadsページ）に飛ぶボタン

import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaPen } from "react-icons/fa"; // ペンのアイコン（FontAwesomeなど）

function MoveCreateThread() {
  const navigate = useNavigate();

  const moveButton = () => {
    navigate("/newThreads"); // URLの文字列を正しく設定
  };

  const renderTooltip = (props) => <Tooltip {...props}>投稿する</Tooltip>;

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip}>
      <button onClick={moveButton} className="btn btn-primary">
        <FaPen />
      </button>
    </OverlayTrigger>
  );
}
export default MoveCreateThread;
