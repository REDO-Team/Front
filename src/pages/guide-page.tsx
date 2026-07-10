import GuideCard from '../components/GuidePage/GuideCard';
import Logo from '/src/assets/icons/logo.svg';
import Search from '/src/assets/icons/search.svg?react';
import Analysis from '/src/assets/icons/analysis.svg?react';
import Checklist from '/src/assets/icons/checklist.svg?react';
import Recycle from '/src/assets/icons/recycle.svg?react';
import Camera from '/src/assets/icons/camera.svg?react';
import Coins from '/src/assets/icons/coins.svg?react';
import ChartBar from '/src/assets/icons/chart-bar.svg?react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/common/TopBar';
import Home from '/src/assets/icons/home.svg';

const GuideLine = [
  {
    icon: Search,
    stepNum: 1,
    text: '검색하기',
  },
  {
    icon: Analysis,
    stepNum: 2,
    text: 'AI 분석',
  },
  {
    icon: Checklist,
    stepNum: 3,
    text: '결과 확인',
  },
  {
    icon: Recycle,
    stepNum: 4,
    text: '분리배출하기',
  },
  {
    icon: Camera,
    stepNum: 5,
    text: '배출 인증하기',
  },
  {
    icon: Coins,
    stepNum: 6,
    text: '리워드 적립하기',
  },
  {
    icon: ChartBar,
    stepNum: 7,
    text: '기여도 확인하기',
  },
];

export default function GuidePage() {
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState<number>(0);

  const handleClickCard = (stepNum: number) => {
    setOpenCard((prev) => (prev === stepNum ? 0 : stepNum));
  };

  return (
    <div className='h-full '>
      <div className='mb-2.5'>
        <TopBar title='촬영하기' leftIcon rightIcon={Home} onClick={() => navigate('/')} bgColor='bg-green1' />
      </div>

      <div className='h-full px-5 pb-25'>
        <div className='flex justify-between mb-7'>
          <div className='max-w-64 flex-col gap-1.5'>
            <h1 className='font-pretendard font-bold text-[22px] text-text'>ReDO 이용 가이드</h1>
            <p className='font-pretendard font-semibold text-base text-gray-600 break-keep'>검색부터 인증, 리워드와 기여도 확인까지 ReDO에서 모두 경험해보세요!</p>
          </div>
          <img src={Logo} alt='Redo' />
        </div>

        <div className='flex flex-col gap-3.5'>
          {GuideLine.map((g) => {
            return <GuideCard key={g.stepNum} Icon={g.icon} stepNum={g.stepNum} text={g.text} onClick={() => handleClickCard(g.stepNum)} isOpen={openCard === g.stepNum} />;
          })}
        </div>
      </div>
    </div>
  );
}
