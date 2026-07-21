import BigLogo from '/src/assets/icons/Big-logo.svg';
import ImageSearch from '/src/assets/icons/image-search.svg';
import ProblemSearch from '/src/assets/icons/problem-search.svg';
import InfoCategoryCard from '../../components/DisposalInfoPage/InfoCategoryCard';

export default function DisposalInfoPage() {
  return (
    <div className='h-full pt-5'>
      <div className='flex flex-col h-full px-5'>
        <div className='flex flex-col items-center gap-7.5'>
          <img src={BigLogo} alt='logo' className='w-30 h-30' />
          <div className='flex flex-col gap-2.5'>
            <p className='font-pretendard font-bold text-[22px] text-text text-center'>
              어떻게 버려야 할지 <br /> 고민되나요?
            </p>
            <p className='font-pretendard font-semibold text-base text-gray-500 text-center'>
              ReDO!가 올바른 분리배출 방법을 <br />
              똑똑하게 알려드릴게요!
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-3.5 mt-10.5'>
          <InfoCategoryCard img={ImageSearch} color={['#0EC966', '#33D685']} shadow='#06C65F80' title='이미지 검색' content='사진을 찍으면 AI가 바로 분류해요' to='/disposal-info/image-search' />
          <InfoCategoryCard img={ProblemSearch} color={['#66E1FF', '#42C0EC']} shadow='#66E1FF' title='이미지 검색' content='사진을 찍으면 AI가 바로 분류해요' to='/disposal-info/problem-search' />
        </div>
      </div>
    </div>
  );
}
