import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllContributions } from '../apis/contribution';
import logo from '../assets/icons/logo.svg';
import LoadingSpinner from '../components/common/LoadingSpinner';
import type { ContributionFeed } from '../types/contribution';

const FEED_PAGE_SIZE = 10;

interface UserCountBannerProps {
  userCount: number;
  summaryMessage: string;
}

function HighlightedText({
  message,
  highlightText,
}: {
  message: string;
  highlightText: string;
}) {
  const highlightIndex = highlightText
    ? message.indexOf(highlightText)
    : -1;

  if (highlightIndex < 0) {
    return <>{message}</>;
  }

  return (
    <>
      {message.slice(0, highlightIndex)}
      <strong className='font-bold text-main-green2'>
        {highlightText}
      </strong>
      {message.slice(highlightIndex + highlightText.length)}
    </>
  );
}

function UserCountBanner({
  userCount,
  summaryMessage,
}: UserCountBannerProps) {
  const formattedCount = userCount.toLocaleString('ko-KR');
  const countText = summaryMessage.includes(`${formattedCount}명`)
    ? `${formattedCount}명`
    : formattedCount;

  return (
    <section className='flex min-h-28 items-center justify-between gap-4 rounded-[22px] bg-linear-to-br from-main-green1 to-main-sky px-5 py-5 text-white shadow-lg shadow-main-green1/10' aria-label='전체 사용자 수'>
      <p className='min-w-0 flex-1 whitespace-pre-line text-lg font-medium leading-[1.45] [&_strong]:text-[22px] [&_strong]:text-white'>
        <HighlightedText
          message={summaryMessage}
          highlightText={countText}
        />
      </p>
      <img src={logo} alt='' aria-hidden='true' className='h-auto w-[65px] shrink-0 brightness-0 invert' />
    </section>
  );
}

function ContributionFeedCard({ feed }: { feed: ContributionFeed }) {
  return (
    <article className='flex min-h-24 items-center gap-5 rounded-[20px] bg-white px-4 py-4 shadow-lg shadow-black/5'>
      <div className='flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-green3'>
        <img
          src={feed.profileImageUrl || logo}
          alt={`${feed.nickname}님의 프로필`}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='min-w-0 flex-1 break-words text-base font-medium leading-[1.5] text-text [overflow-wrap:anywhere]'>
        <p>
          <HighlightedText
            message={feed.message}
            highlightText={feed.highlightText}
          />
        </p>
      </div>
    </article>
  );
}

export default function AllContributionPage() {
  const {
    data,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['allContributions', { size: FEED_PAGE_SIZE }],
    queryFn: ({ pageParam }) =>
      getAllContributions({
        cursor: pageParam,
        size: FEED_PAGE_SIZE,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });

  if (isPending) {
    return (
      <div className='flex min-h-[calc(100dvh-56px)] items-center justify-center bg-bg-green1'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex min-h-[calc(100dvh-56px)] flex-col items-center justify-center gap-4 bg-bg-green1 px-5 text-center'>
        <p className='text-base font-semibold text-text'>
          전체 기여도를 불러오지 못했어요.
        </p>
        <button
          type='button'
          onClick={() => refetch()}
          className='rounded-full bg-main-green1 px-6 py-3 text-sm font-bold text-white'
        >
          다시 시도
        </button>
      </div>
    );
  }

  const firstPage = data.pages[0];
  const feeds = data.pages.flatMap((page) => page.feeds);

  return (
    <div className='min-h-[calc(100dvh-56px)] bg-bg-green1'>
      <div className='px-5 py-6'>
        <UserCountBanner
          userCount={firstPage.totalParticipantCount}
          summaryMessage={firstPage.summaryMessage}
        />

        <ul className='mt-7 space-y-3' aria-label='전체 기여 활동'>
          {feeds.map((feed) => (
            <li key={feed.feedId}>
              <ContributionFeedCard feed={feed} />
            </li>
          ))}
        </ul>

        {feeds.length === 0 && (
          <p className='py-16 text-center text-sm font-medium text-gray-500'>
            아직 기여 활동이 없어요.
          </p>
        )}

        {hasNextPage && (
          <button
            type='button'
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='mt-5 flex h-12 w-full items-center justify-center rounded-full bg-white text-sm font-bold text-main-green2 shadow-lg shadow-black/5 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
          </button>
        )}
      </div>
    </div>
  );
}
