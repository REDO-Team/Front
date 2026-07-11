import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/common/TopBar';
import Close from '/src/assets/icons/close.svg';
import Error from '/src/assets/icons/error.svg';
import Check from '/src/assets/icons/check.svg?react';

const mock = {
  content: '아직 내용물 또는 이물질이 남아 있는 것으로 보여요. 아래 사항을 확인한 후 다시 촬영해주세요.',
  checkList: ['내용물을 비우기', '이물질 세척 후 촬영', '분리배출 완료 후 촬영'],
};

export default function FailPage() {
  const navigate = useNavigate();
  const filteredContent = mock.content
    .split('.')
    .map((text) => text.trim())
    .filter(Boolean);

  return (
    <div className='h-full'>
      <div className='mb-10'>
        <TopBar title='인증하기' leftIcon rightIcon={Close} onClick={() => navigate('/')} />
      </div>

      <div className='flex flex-col h-full px-5'>
        <div className='flex flex-col gap-7.5 justify-center items-center text-center flex-1'>
          <img src={Error} alt='실패' className='w-20 h-20 drop-shadow-[0_0_10px_#EA433580]' />
          <div className='flex flex-col gap-2.5'>
            <p className='font-pretendard font-bold text-[22px] text-text break-keep'>물품을 인식하지 못했어요!</p>
            <p className='font-pretendard font-semibold text-base text-gray-500 break-keep'>다시 시도해주세요</p>
          </div>
        </div>

        <div className='flex flex-col gap-6 mt-auto'>
          <div className='flex flex-col gap-5 px-5 py-6 bg-error-bg rounded-[20px]'>
            <span className='font-pretendard font-bold text-lg text-error-text'>실패 사유</span>
            <div>
              {filteredContent.map((c, idx) => {
                return (
                  <p key={idx} className='font-pretendard font-semibold text-base text-gray-800 break-keep'>
                    {c}.
                  </p>
                );
              })}
            </div>
            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-3'>
                <Check className='text-error-text' />
                <p className='font-pretendard font-medium text-sm text-error-text break-keep'>{mock.checkList[0]}</p>
              </div>
              <div className='flex items-center gap-3'>
                <Check className='text-error-text' />
                <p className='font-pretendard font-medium text-sm text-error-text break-keep'>{mock.checkList[1]}</p>
              </div>
              <div className='flex items-center gap-3'>
                <Check className='text-error-text' />
                <p className='font-pretendard font-medium text-sm text-error-text break-keep'>{mock.checkList[2]}</p>
              </div>
            </div>
          </div>

          <button type='button' className='font-pretendard font-bold text-lg text-white rounded-4xl bg-main-green1 py-3.5 w-full text-center' onClick={() => navigate('/camera')}>
            다시 촬영하기
          </button>
        </div>
      </div>
    </div>
  );
}
