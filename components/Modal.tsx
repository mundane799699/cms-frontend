interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content: string;
}
   
   export default function Modal({ isOpen, onClose, onConfirm, title, content }: ModalProps) {
    if (!isOpen) return null;
     return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-80">
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{content}</p>
          <div className="flex justify-end space-x-4">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              取消
            </button>
            <button 
              onClick={onConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    );
  }

