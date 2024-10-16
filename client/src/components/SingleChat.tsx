import React from "react";

interface Message {
  id: string; // or number, depending on your id type
  user: string;
  text: string;
}

interface SingleChatProps {
  message: Message;
}
const user:any = JSON.parse(localStorage.getItem("profile") || '{}');
const SingleChat: React.FC<SingleChatProps> = (props) => {
  return (
<div
  key={props.message.id}
  className="singlemsg"
  style={{
    alignItems: props.message.user === user.name ? 'flex-end' : 'flex-start',
  }}
>
  {/* <p className="username" style={{ display: "inline-block" }}>
    {props.message.user}
  </p> */}
  <br />
  <p className="content" style={{ display: "inline-block" }}>
    {props.message.text}
  </p>
</div>
  );
};

export default SingleChat;
