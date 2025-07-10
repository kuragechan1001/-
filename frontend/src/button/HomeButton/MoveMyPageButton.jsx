import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Twitter } from "react-bootstrap-icons"; // ペンのアイコン（FontAwesomeなど）

function MoveMyPpageButton() {
  const navigate = useNavigate();

  const moveButton = () => {
    navigate("/MyPage"); // URLの文字列を正しく設定
  };
  const renderTooltip = (props) => <Tooltip {...props}>マイページ</Tooltip>;

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip}>
      <button onClick={moveButton} className="btn btn-primary">
        <Twitter />
      </button>
    </OverlayTrigger>
  );
}

export default MoveMyPpageButton;
