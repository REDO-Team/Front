import Alarm from '/src/assets/icons/alarm.svg';

export default function NotiCard() {
  return (
    <div className='w-full flex items-center gap-2.5 px-6 py-4 bg-white rounded-[20px] shadow-lg shadow-black/5'>
      <img src={Alarm} alt='알림' className='w-9.5 h-9.5' />
      <p className='font-pretendard font-medium text-sm text-gray-600'>
        검수는 평균 1~3분 정도 소요돼요. <br />
        검수 완료시 알림으로 알려드릴게요.
      </p>
    </div>
  );
}
