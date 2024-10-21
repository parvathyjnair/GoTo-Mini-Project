import React, { useState } from "react";
import TranslateIcon from '@mui/icons-material/Translate';
import { translateText } from "../utils/translate";

interface Message {
  id: string; // or number, depending on your id type
  user: string;
  text: string;
}

interface SingleChatProps {
  message: Message;
}

const SingleChat: React.FC<SingleChatProps> = ({ message }) => {
  const [text, setText] = useState(message.text);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);

  const handleClick = async () => {
    setIsTranslating(true);
    setTranslationError(null);
    try {
      const translatedText = await translateText(text, "malayalam");
      setText(translatedText);
    } catch (error) {
      setTranslationError("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div
      key={message.id}
      className="singlemsg"
      style={{
        alignItems: message.user === JSON.parse(localStorage.getItem("profile") || '{}').name ? 'flex-end' : 'flex-start',
      }}
    >
      <p className="content" style={{ display: "inline-block" }}>
        {text}
        <button className="translate-btn" onClick={handleClick} disabled={isTranslating}>
          <TranslateIcon className="translate-icon" />
        </button>
      </p>
      {translationError && <p className="error">{translationError}</p>}
    </div>
  );
};

export default SingleChat;
