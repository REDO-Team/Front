import { useLocation, useNavigate } from 'react-router-dom';
import FullCheck from '/src/assets/icons/full-check.svg';
import Coins from '/src/assets/icons/coins.svg?react';

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const itemName = location?.state?.itemName;
  const date = location?.state?.date;
  const point = location?.state?.point;

  return (
    <div className='h-full pt-5'>
      <div className='flex flex-col h-full px-5'>
        <div className='flex flex-col gap-7.5 justify-center items-center text-center flex-1'>
          <img src={FullCheck} alt='성공' className='w-20 h-20 drop-shadow-[0_0_10px_#06C65F]' />
          <div className='flex flex-col gap-2.5'>
            <p className='font-pretendard font-bold text-[22px] text-text'>인증이 완료되었어요!</p>
            <p className='font-pretendard font-semibold text-base text-gray-500'>포인트가 적립되었어요</p>
          </div>
        </div>

        <div className='flex justify-between items-center bg-white rounded-[20px] px-6.5 py-4.5 shadow-lg shadow-black/5 mt-20'>
          <div className='flex flex-col gap-1.5'>
            <span className='font-pretendard font-bold text-sm text-text'>적립 포인트</span>
            <span className='font-pretendard font-bold text-[32px] text-main-green1'>
              + {point}
              <span className='text-[22px]'>p</span>
            </span>
          </div>
          <Coins className='text-main-green1 w-15 h-15' />
        </div>

        <div className='flex flex-col gap-3.5 bg-white rounded-[20px] px-6.5 py-6 shadow-lg shadow-black/5 mt-2.5 mb-5'>
          <div className='flex justify-between items-center'>
            <span className='font-pretendard font-medium text-sm text-text'>인증 항목</span>
            <span className='font-pretendard font-semibold text-sm text-text'>{itemName}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='font-pretendard font-medium text-sm text-text'>인증 일시</span>
            <span className='font-pretendard font-semibold text-sm text-text'>{date.toLocaleString()}</span>
          </div>
          <div className='flex justify-between items-center'>
            <span className='font-pretendard font-medium text-sm text-text'>적립 포인트</span>
            <span className='font-pretendard font-semibold text-sm text-text'>{point}P</span>
          </div>
        </div>

        <div className='w-full flex flex-col gap-2.5 mt-auto'>
          <button type='button' className='font-pretendard font-bold text-lg text-main-green2 rounded-4xl bg-white border border-main-green1 py-4 w-full flex items-center justify-center' onClick={() => navigate('/reward')}>
            누적 포인트 확인하기
          </button>
          <button type='button' className='font-pretendard font-bold text-lg text-white rounded-4xl bg-main-green1 px-5 py-4 w-full flex items-center justify-center' onClick={() => navigate('/reward/store')}>
            포인트 사용하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}
