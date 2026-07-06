import type { ReactNode } from 'react';
import CloseIcon from '../../assets/icons/CloseIcon';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children?: ReactNode;
  buttonText: string;
  onClose: () => void;
  onConfirm: () => void;
  buttonColor?: 'green' | 'red';
  titleLineHeight?: '100%' | '130%';
}

const Modal = ({
  isOpen,
  title,
  children,
  buttonText,
  onClose,
  onConfirm,
  buttonColor = 'green',
  titleLineHeight = '130%',
}: ModalProps) => {
  if (!isOpen) return null;

  const buttonColorClass =
    buttonColor === 'red'
      ? 'bg-delete'
      : 'bg-main-green1';

  const titleLineHeightClass =
    titleLineHeight === '100%'
      ? 'leading-[20px]'
      : 'leading-[130%]';

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='w-[311px] rounded-[12px] bg-white px-6 pt-5 pb-[30px]'>
        <div className='relative flex w-full flex-col gap-[10px]'>
          {/* 닫기 버튼 */}
          <button
            type='button'
            onClick={onClose}
            className='self-end'
            aria-label='모달 닫기'
          >
            <CloseIcon className='h-[14px] w-[14px] text-text' />
          </button>

          {/* 제목 + 내용 + 버튼 */}
          <div className='flex w-full flex-col gap-5'>
            <h2
              className={`w-full whitespace-pre-line text-center text-[17px] font-semibold text-text ${titleLineHeightClass}`}
            >
              {title}
            </h2>

            {children && <div className='w-full'>{children}</div>}

            <button
              type='button'
              onClick={onConfirm}
              className={`h-[40px] w-full rounded-[30px] ${buttonColorClass} text-[14px] font-bold text-white`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
