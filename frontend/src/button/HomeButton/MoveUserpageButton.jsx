import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { PersonVcardFill } from "react-bootstrap-icons";

function MoveUserpageButton() {
  const navigate = useNavigate();

  const moveButton = () => {
    navigate("/User"); // URLの文字列を正しく設定
  };

  const renderTooltip = (props) => (
    <Tooltip {...props}>プロフィール編集</Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip}>
      <button onClick={moveButton} class="btn btn-primary">
        <PersonVcardFill />
      </button>
    </OverlayTrigger>
  );
}

export default MoveUserpageButton;
