//ログアウトするボタン

import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";

function MoveLoginPage() {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/"); // URLの文字列を正しく設定
  };

  const renderTooltip = (props) => <Tooltip {...props}>ログアウト</Tooltip>;

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip}>
      <button onClick={logout} class="btn btn-primary">
        <BoxArrowRight />
      </button>
    </OverlayTrigger>
  );
}

export default MoveLoginPage;
