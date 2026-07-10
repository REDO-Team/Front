import Alarm from '/src/assets/icons/alarm.svg';

export default function NotiCard() {
  const currentPath = window.location.pathname;
  const isShootingPage = currentPath.includes('/shooting');

  return (
    <div className='w-full flex items-center gap-2.5 px-6 py-4 bg-white rounded-[20px] shadow-lg shadow-black/5'>
      <img src={Alarm} alt='알림' className='w-9.5 h-9.5' />
      <p className='font-pretendard font-medium text-sm text-gray-600'>
        {isShootingPage ? (
          <>
            허용되지 않는 항목이 포함된 경우 <br /> 인증이 거절될 수 있어요
          </>
        ) : (
          <>
            검수는 평균 1~3분 정도 소요돼요. <br />
            검수 완료시 알림으로 알려드릴게요.
          </>
        )}
      </p>
    </div>
  );
}
