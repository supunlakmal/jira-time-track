import React, { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: (value: any) => void;
  size?: string;
  animation?: string;
  centered?: boolean;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, size, animation, centered, children }: ModalProps) => {
  console.log(isOpen);
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  if (!isOpen) return null;

  // if (isOpen) {
  //   const modalEle = document.createElement('div');
  //   modalEle.classList.add('transition-all fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80')
  //   // document.createElement('div').classList.add('transition-all fixed inset-0 z-40 bg-gray-900 bg-opacity-50 dark:bg-opacity-80');
  // }



  const getModalSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case '2xl':
        return 'max-w-2xl';
      case '3xl':
        return 'max-w-3xl';
      case '4xl':
        return 'max-w-4xl';
      case '5xl':
        return 'max-w-5xl';
      case '6xl':
        return 'max-w-6xl';
      case '7xl':
        return 'max-w-7xl';
      default:
        return 'max-w-md';
    }
  };

  const getModalAnimationClass = () => {
    switch (animation) {
      case 'scaling':
        return 'scale-0';
      case 'slide-down':
        return 'translate-y-[-100%]';
      default:
        return 'scale-0';
    }
  };

  children

  return (
    <>


      {/* <div className="modal-overlay fixed inset-0 bg-gray-900 opacity-50"></div>
      <div
        className={`modal-container bg-white rounded-lg shadow-lg overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${getModalSizeClass()} ${getModalAnimationClass()}`}
      >
        {children}
      </div> */}
    </>
  )

  // return ReactDOM.createPortal(
  //   <div className="fixed inset-0 flex items-center justify-center z-50">
  //     <div className={`modal-overlay absolute inset-0 bg-gray-900 opacity-50`} onClick={onClose}></div>
  //     <div
  //       className={`modal-container bg-white rounded-lg shadow-lg overflow-hidden ${centered ? 'flex items-center' : ''} ${getModalSizeClass()} ${getModalAnimationClass()}`}
  //     >
  //       {children}
  //     </div>
  //   </div>,
  //   document.getElementById('modal-root')!
  // );

};

export default Modal;
