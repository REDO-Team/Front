import FilledCamera from '/src/assets/icons/filled-camera.svg';

export default function ShootCard() {
  const currentPath = window.location.pathname;
  const isCertification = currentPath.includes('/certification');

  return (
    <div className='flex flex-col justify-center items-center gap-4.5 w-full aspect-square bg-bg-green2 border-2 border-dashed border-main-green1 rounded-xl'>
      <img src={FilledCamera} alt='촬영' />
      <p className='font-pretendard font-semibold text-base text-main-green2 text-center'>
        {isCertification ? (
          <>
            인증할 쓰레기를
            <br />
            촬영해 주세요
          </>
        ) : (
          <>
            분리수거 방법을 알고 싶은 <br /> 품목을 촬영해 주세요
          </>
        )}
      </p>
    </div>
  );
}
