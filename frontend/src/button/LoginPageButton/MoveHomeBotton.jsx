//ここのボタンを押したら、新規投稿のページ（Threadsページ）から、ホーム画面に飛ぶボタン

import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { HouseDoorFill } from "react-bootstrap-icons";

function MoveHomeBotton() {
  const navigate = useNavigate();

  const moveHome = () => {
    navigate("/home"); // URLの文字列を正しく設定
  };

  const renderTooltip = (props) => <Tooltip {...props}>ホームに行く</Tooltip>;

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip}>
      <button onClick={moveHome} class="btn btn-primary">
        <HouseDoorFill />
      </button>
    </OverlayTrigger>
  );
}

export default MoveHomeBotton;
