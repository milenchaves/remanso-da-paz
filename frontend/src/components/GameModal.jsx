import "./GameModal.css";

export default function GameModal({ title, subtitle, buttons }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-subtitle">{subtitle}</p>
        <div className="modal-buttons">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.action}
              className={`modal-btn ${btn.primary ? "primary" : "secondary"}`}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}