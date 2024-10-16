import { useLocation } from "react-router-dom";
import Chat from "../components/Chat";

function ChatPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") || "";
  const username = queryParams.get("user") || "";

  return (
    <div>
      <Chat room={email} username={username} />
    </div>
  );
}

export default ChatPage;
