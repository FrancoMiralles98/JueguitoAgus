export const Modal = ({ closeModal, children }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close-btn" onClick={closeModal}>&times;</span>
          {children} 
        </div>
      </div>
    );
  };