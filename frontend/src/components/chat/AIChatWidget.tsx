
import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { aiAssistantService } from '../../services/ai-assistant.service';
import type { ChatMessage } from '../../types/ai.types';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Xin chào! Mình là trợ lý AI của Bloom & Glow. Bạn đang tìm món quà nào?',
    },
  ]);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const content = message.trim();

    if (!content || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user', content },
    ]);

    setMessage('');
    setLoading(true);

    try {
      const result = await aiAssistantService.sendMessage({
        message: content,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: result.reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Hiện tại chưa thể kết nối trợ lý AI. Vui lòng thử lại.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-chat-container">
      {/* Nút mở chatbot */}
      <button
        className="ai-chat-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Đóng chatbot' : 'Mở chatbot'}
      >
        {isOpen ? <X size={25} /> : <MessageCircle size={25} />}
      </button>

      {/* Cửa sổ chatbot */}
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-chat-header-info">
              <span className="ai-chat-avatar">
                <Sparkles size={20} />
              </span>

              <div>
                <h3>Bloom & Glow AI</h3>
                <p>Trợ lý tư vấn quà tặng</p>
              </div>
            </div>

            <button
              className="ai-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng chatbot"
            >
              <X size={20} />
            </button>
          </div>

          <div className="ai-chat-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`chat-message ${item.role}`}
              >
                {item.content}
              </div>
            ))}

            {loading && (
              <div className="chat-message assistant">
                AI đang trả lời...
              </div>
            )}
          </div>

          <form
            className="ai-chat-form"
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage();
            }}
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Bạn muốn tìm món quà nào?"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !message.trim()}
              aria-label="Gửi tin nhắn"
            >
              <Send size={19} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
