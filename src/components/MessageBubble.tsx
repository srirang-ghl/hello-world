interface MessageBubbleProps {
  message: string;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="message-bubble chat-bubble animate-bob"
      style={{
        position: 'relative',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '16px 20px',
        maxWidth: '320px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        animation: 'pop-in 0.3s ease-out forwards, bob 4s ease-in-out 0.3s infinite',
      }}
    >
      <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.5', color: '#333' }}>{message}</p>
      {/* Chat bubble tail pointing left */}
      <div
        style={{
          position: 'absolute',
          left: '-10px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderRight: '10px solid white',
        }}
      />
    </div>
  );
}