import BottomBar from '../components/common/BottomBar';
import {
  HOME_COMMUNITY_PREVIEWS,
  HOME_POINT_SUMMARY,
  HOME_REWARD_PREVIEWS,
  HOME_SERVICE_MENU_ITEMS,
  HOME_USER,
} from '../mocks/home';

export default function HomePage() {
  const formattedPoint = HOME_POINT_SUMMARY.totalPoint.toLocaleString();

  return (
    <div className='min-h-screen bg-gray-50 pb-[120px] font-pretendard text-text'>
      {/* 홈 상단 영역입니다. 이후 로그아웃 모달 이슈에서 오른쪽 버튼에 기능을 연결하면 됩니다. */}
      <header className='flex items-start justify-between bg-white px-5 pb-6 pt-8'>
        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium text-gray-600'>
            안녕하세요, {HOME_USER.nickname}님
          </p>
          <h1 className='text-xl font-bold leading-[130%]'>
            오늘도 REDO! 해볼까요?
          </h1>
        </div>

        <button
          type='button'
          className='rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600'
        >
          {/* TODO: 별도 이슈에서 로그아웃 모달을 연결합니다. */}
          로그아웃
        </button>
      </header>

      <main className='flex flex-col gap-4 px-5 py-5'>
        {/* 사용자 누적 포인트 카드입니다. API 연동*/}
        <section className='rounded-xl bg-main-green1 p-5 text-white'>
          <p className='text-sm font-medium'>나의 포인트</p>
          <strong className='mt-2 block text-3xl font-bold'>
            {formattedPoint}P
          </strong>


          <button
            type='button'
            className='mt-5 h-11 w-full rounded-full bg-white text-sm font-bold text-main-green2'
          >
            {/* TODO: 별도 이슈에서 배출 인증 페이지 이동을 연결합니다. */}
            인증하러 가기
          </button>
        </section>

        {/* 홈 서비스 메뉴 영역입니다. 메뉴 클릭 이동은 라우트 확정 후 연결할 예정입니다. */}
        <section className='rounded-xl bg-white p-4'>
          <h2 className='text-base font-bold'>어떤 서비스를 찾으시나요?</h2>
          <div className='mt-4 grid grid-cols-2 gap-3'>
            {HOME_SERVICE_MENU_ITEMS.map((menu) => (
              <button
                key={menu.id}
                type='button'
                className='min-h-[72px] rounded-lg border border-gray-200 p-3 text-left'
              >
                
                <strong className='block text-sm font-bold'>{menu.title}</strong>
              </button>
            ))}
          </div>
        </section>

        {/* 오늘의 커뮤니티 미리보기 섹션입니다. 이후 커뮤니티 API 목록 일부를 보여주는 영역으로 바뀝니다. */}
        <section className='rounded-xl bg-white p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-base font-bold'>오늘의 커뮤니티</h2>
            <button type='button' className='text-xs font-semibold text-gray-500'>
              {/* TODO: 별도 이슈에서 커뮤니티 상세 또는 목록 이동을 연결합니다. */}
              더보기
            </button>
          </div>

          <div className='mt-4 flex flex-col gap-3'>
            {HOME_COMMUNITY_PREVIEWS.map((post) => (
              <article key={post.id} className='rounded-lg bg-gray-50 p-3'>
                <h3 className='text-sm font-semibold'>{post.title}</h3>
                <p className='mt-2 text-xs leading-[140%] text-gray-600'>
                  {post.content}
                </p>
                <p className='mt-3 text-xs font-medium text-main-green2'>
                  댓글 {post.commentCount}개
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 리워드 상점 미리보기 섹션입니다. 나중에 리워드 상품 API 데이터로 교체할 예정입니다. */}
        <section className='rounded-xl bg-white p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-base font-bold'>리워드 상점</h2>
            <button type='button' className='text-xs font-semibold text-gray-500'>
              {/* TODO: 별도 이슈에서 리워드 상점 이동을 연결합니다. */}
              더보기
            </button>
          </div>

          <ul className='mt-4 flex flex-col gap-3'>
            {HOME_REWARD_PREVIEWS.map((reward) => (
              <li
                key={reward.id}
                className='flex items-center justify-between rounded-lg border border-gray-200 p-3'
              >
                <div>
                  <p className='text-sm font-semibold'>{reward.name}</p>
                  <p className='mt-1 text-xs text-gray-500'>{reward.category}</p>
                </div>
                <strong className='text-sm font-bold text-main-green2'>
                  {reward.requiredPoint.toLocaleString()}P
                </strong>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <BottomBar />
    </div>
  );
}
