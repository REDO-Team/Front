import DownArrow from '/src/assets/icons/down-arrow.svg';
import UpArrow from '/src/assets/icons/up-arrow.svg';
import Check from '/src/assets/icons/check.svg';
import FullCheck from '/src/assets/icons/full-check.svg';
import ImageUpload from '/src/assets/icons/image-upload.svg';
import TextSearch from '/src/assets/icons/text-search.svg';

interface GuideCardProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  stepNum: number;
  text: string;
  onClick: () => void;
  isOpen: boolean;
}

export default function GuideCard({ Icon, stepNum, text, onClick, isOpen }: GuideCardProps) {
  return (
    <>
      <div className={`flex flex-col w-full px-5 py-6 bg-white rounded-[20px] ${isOpen && 'border-2 border-main-green1'}`} onClick={() => onClick()}>
        <div className={`flex justify-between items-center ${isOpen && 'pb-3.5 border-b border-gray-200'} select-none`}>
          <div className='flex gap-2.5'>
            <Icon className={`${isOpen ? 'text-main-green1' : 'text-gray-800'}`} />
            <div className={`font-pretendard font-bold text-lg whitespace-nowrap ${isOpen ? 'text-main-green1' : 'text-gray-800'}`}>
              <span>STEP {stepNum}.</span>
              <span>&nbsp;{text}</span>
            </div>
          </div>
          <button type='button'>
            <img src={isOpen ? UpArrow : DownArrow} alt='상세보기' />
          </button>
        </div>

        <div>
          {isOpen && stepNum === 1 && (
            <div className='flex flex-col gap-2.5'>
              <p className='pt-3.5 text-gray-800 font-pretendard font-medium text-[15px] break-keep'>사진 촬영, 이미지 업로드 또는 텍스트 검색 중 원하는 방법으로 분리배출 방식을 검색해주세요.</p>
              <div className='flex gap-2.5'>
                <figure className='flex flex-col gap-3 items-center bg-bg-green1 rounded-[20px] px-10 py-5'>
                  <img src={ImageUpload} alt='업로드한 이미지' className='w-6 h-6' />
                  <figcaption className='font-pretendard font-semibold text-xs text-text'>이미지 업로드</figcaption>
                </figure>
                <figure className='flex flex-col gap-3 items-center bg-skyblue-bg rounded-[20px] px-10 py-5'>
                  <img src={TextSearch} alt='업로드한 이미지' className='w-6 h-6' />
                  <figcaption className='font-pretendard font-semibold text-xs text-text'>텍스트 검색</figcaption>
                </figure>
              </div>
              <div className='flex flex-col gap-4.5 px-5.5 py-5 bg-bg-green1'>
                <span className='font-pretendard font-bold text-sm text-main-green2 break-keep'>이용 TIP!</span>
                <div className='flex items-center gap-2.5'>
                  <img src={Check} alt='확인하기' className='w-4 h-3' />
                  <p className='font-pretendard font-bold text-sm text-main-green2 break-keep'>물건 전체가 보이게 촬영해주세요.</p>
                </div>
                <div className='flex items-center gap-2.5'>
                  <img src={Check} alt='확인하기' className='w-4 h-3' />
                  <p className='font-pretendard font-bold text-sm text-main-green2 break-keep'>밝은 곳에서 촬영해 주세요.</p>
                </div>
                <div className='flex items-center gap-2.5'>
                  <img src={Check} alt='확인하기' className='w-4 h-3' />
                  <p className='font-pretendard font-bold text-sm text-main-green2 break-keep'>하나의 물건만 촬영해 주세요.</p>
                </div>
              </div>
            </div>
          )}
          {isOpen && stepNum === 2 && (
            <div className='pt-3.5 flex flex-col gap-2.5'>
              <p className='text-gray-800 font-pretendard font-medium text-[15px] break-keep'>보내주신 정보를 바탕으로 리도 AI가 올바른 배출 방식을 분석해요. 품목과 재질을 예측해 카테고리를 추천해드려요.</p>
              <div className='flex flex-col gap-4.5 px-5.5 py-5 bg-bg-green1'>
                <span className='font-pretendard font-bold text-sm text-main-green2 break-keep'>이용 TIP!</span>
                <div className='flex items-center gap-2.5'>
                  <img src={Check} alt='확인하기' className='w-4 h-3' />
                  <p className='font-pretendard font-bold text-sm text-main-green2 break-keep'>인식이 어려운 경우, 카테고리 선택 화면이 표시될 수 있어요.</p>
                </div>
                <div className='flex items-center gap-2.5'>
                  <img src={Check} alt='확인하기' className='w-4 h-3' />
                  <p className='font-pretendard font-bold text-sm text-main-green2 break-keep'>해당하는 카테고리를 직접 선택해주세요.</p>
                </div>
              </div>
            </div>
          )}
          {isOpen && stepNum === 3 && (
            <div className='flex flex-col gap-2.5'>
              <p className='pt-3.5 text-gray-800 font-pretendard font-medium text-[15px] break-keep'>AI 분석 결과로 올바른 분리배출 방법을 확인해요. 재활용 카테고리와 배출 방법, 추가 주의사항을 안내해드려요.</p>
              <div className='flex p-2.5 gap-2 bg-linear-to-r from-main-green1 to-main-sky rounded-xl'>
                <div className='w-10 h-10 opacity-45 bg-white rounded-[10px]'></div>
                <div className='flex flex-col'>
                  <span className='font-pretendard font-semibold text-[8px] text-white bg-bg-green3/50 px-2 py-0.5 rounded-full inline-fit'>플라스틱</span>
                  <span className='font-pretendard font-bold text-base text-white'>투명 페트병</span>
                </div>
              </div>
              <div className='flex flex-col gap-1 pt-1'>
                <div className='flex gap-3'>
                  <img src={FullCheck} alt='확인하기' />
                  <p className='text-gray-800 font-pretendard font-bold text-sm'>비닐 라벨을 뜯어 따로 분리해요</p>
                </div>
                <div className='flex gap-3'>
                  <img src={FullCheck} alt='확인하기' />
                  <p className='text-gray-800 font-pretendard font-bold text-sm'>내용물을 비우고 물로 헹궈요</p>
                </div>
              </div>
            </div>
          )}
          {isOpen && stepNum === 4 && (
            <div className='mt-3.5 flex flex-col gap-5 bg-bg-green1 px-6 py-5 rounded-[20px]'>
              <p className='text-gray-800 font-pretendard font-medium text-[15px] break-keep'>안내된 방법에 따라 올바르게 분리수거를 실천해요. 작은 습관이 큰 변화를 만들어요!</p>
              <div className='flex items-center gap-2.5'>
                <span className='font-pretendard font-bold text-lg text-main-green1 px-4 py-1.5 rounded-full bg-bg-green2'>1</span>
                <div className='flex flex-col'>
                  <span className='font-pretendard font-semibold text-base text-text'>라벨,스티커 제거하기</span>
                  <span className='font-pretendard font-semibold text-xs text-gray-500'>뜯어지는 라벨은 비닐로 분리</span>
                </div>
              </div>
              <div className='flex items-center gap-2.5'>
                <span className='font-pretendard font-bold text-lg text-main-green1 px-4 py-1.5 rounded-full bg-bg-green2'>2</span>
                <div className='flex flex-col'>
                  <span className='font-pretendard font-semibold text-base text-text'>재질별로 분리하기</span>
                  <span className='font-pretendard font-semibold text-xs text-gray-500'>뚜껑, 링은 따로 모으기</span>
                </div>
              </div>
              <div className='flex items-center gap-2.5'>
                <span className='font-pretendard font-bold text-lg text-main-green1 px-4 py-1.5 rounded-full bg-bg-green2'>3</span>
                <div className='flex flex-col'>
                  <span className='font-pretendard font-semibold text-base text-text'>내용물 비우기 헹구기</span>
                  <span className='font-pretendard font-semibold text-xs text-gray-500'>이물질 없이 깨끗하게</span>
                </div>
              </div>
              <div className='flex items-center gap-2.5'>
                <span className='font-pretendard font-bold text-lg text-main-green1 px-4 py-1.5 rounded-full bg-bg-green2'>4</span>
                <div className='flex flex-col'>
                  <span className='font-pretendard font-semibold text-base text-text'>부피 줄여 배출하기</span>
                  <span className='font-pretendard font-semibold text-xs text-gray-500'>찌그러뜨려 공간 절약</span>
                </div>
              </div>
            </div>
          )}
          {isOpen && stepNum === 5 && (
            <div className='pt-3.5 flex flex-col gap-2.5'>
              <p className='text-gray-800 font-pretendard font-medium text-[15px] break-keep'>분리배출 후 인증 사진을 업로드해주세요. AI가 사진을 확인하고 리워드를 지급해드려요.</p>
              <div className='flex flex-col gap-4.5 px-5.5 py-5 bg-bg-green1 rounded-[20px]'>
                <span className='font-pretendard font-bold text-sm text-main-green2 break-keep'>이용 TIP!</span>
                <div className='flex items-center gap-2.5'>
                  <img src={Check} alt='확인하기' className='w-4 h-3' />
                  <p className='font-pretendard font-bold text-sm text-main-green2 break-keep'>검색 없이도 인증할 수 있어요.</p>
                </div>
                <div className='flex items-center gap-2.5'>
                  <img src={Check} alt='확인하기' className='w-4 h-3' />
                  <p className='font-pretendard font-bold text-sm text-main-green2 break-keep'>검색 후 인증을 진행하면 2배의 리워드가 지급돼요.</p>
                </div>
                <div className='flex items-center gap-2.5'>
                  <img src={Check} alt='확인하기' className='w-4 h-3' />
                  <p className='font-pretendard font-bold text-sm text-main-green2 break-keep'>분리배출이 완료된 상태로 촬영해 주세요.</p>
                </div>
                <div className='flex items-center gap-2.5'>
                  <img src={Check} alt='확인하기' className='w-4 h-3' />
                  <p className='font-pretendard font-bold text-sm text-main-green2 break-keep'>분리배출이 완료된 상태로 촬영해 주세요.</p>
                </div>
              </div>
            </div>
          )}
          {isOpen && stepNum === 6 && (
            <div className='pt-3.5 flex flex-col gap-2.5'>
              <p className='text-gray-800 font-pretendard font-medium text-[15px] break-keep'>인증을 통해 리워드를 적립하고 리워드 상황에서 사용해보세요.</p>
              <div className='flex flex-col gap-4.5 px-5.5 py-5 bg-bg-green1 rounded-[20px]'>
                <span className='font-pretendard font-bold text-sm text-main-green2 break-keep'>이용 TIP!</span>
                <div className='flex items-center gap-2.5'>
                  <img src={Check} alt='확인하기' className='w-4 h-3' />
                  <p className='font-pretendard font-bold text-sm text-main-green2 break-keep'>지급된 리워드는 제휴 브랜드 제품 또는 기프티콘으로 교환 가능합니다.</p>
                </div>
              </div>
            </div>
          )}
          {isOpen && stepNum === 7 && (
            <div className='pt-3.5'>
              <p className='text-gray-800 font-pretendard font-medium text-[15px] break-keep'>분리배출 활동을 통해 쌓인 기여도를 확인하고, 다른 사용자들의 활동도 함께 확인해보세요.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
