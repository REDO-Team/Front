import { useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Search from '../../assets/icons/search.svg?react';
import { MOCK_ADDRESS_SEARCH_RESPONSE } from '../../mocks/reward';
import type { AddressCandidates } from '../../types/reward';

interface AddressSearchLocationState {
  returnTo?: string;
}

export default function RewardAddressSearchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const returnTo = (state as AddressSearchLocationState | null)?.returnTo;
  const [keyword, setKeyword] = useState('');
  const [addressCandidates, setAddressCandidates] = useState<AddressCandidates[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!keyword.trim()) {
      setAddressCandidates([]);
      setHasSearched(false);
      return;
    }

    setAddressCandidates(MOCK_ADDRESS_SEARCH_RESPONSE.result?.addressCandidates ?? []);
    setHasSearched(true);
  };

  return (
    <div className='flex flex-1 flex-col bg-bg-green1 px-4 pb-8 font-pretendard'>
      <h1 className='mt-4 text-xl font-semibold text-black'>주소를 검색해주세요</h1>

      <form className='mt-4 flex items-center gap-3' onSubmit={handleSearch}>
        <label className='flex h-16 min-w-0 flex-1 items-center rounded-[28px] bg-white px-5'>
          <Search className='h-7 w-7 shrink-0 text-gray-500' aria-hidden='true' />
          <input type='search' aria-label='주소 검색' placeholder='도로명, 지번, 건물명 검색' value={keyword} onChange={(event) => setKeyword(event.target.value)} className='ml-3 min-w-0 flex-1 bg-transparent text-base font-semibold text-text outline-none placeholder:text-gray-500' />
        </label>
        <button type='submit' className='h-16 w-[86px] shrink-0 rounded-[28px] bg-main-green1 text-lg font-bold text-white'>
          검색
        </button>
      </form>

      {hasSearched ? (
        <section className='mt-6' aria-live='polite'>
          <h2 className='px-1 text-lg font-bold text-text'>
            주소 검색 결과
            <span className='ml-2 text-main-green1'>{addressCandidates.length}</span>
          </h2>

          {addressCandidates.length > 0 ? (
            <ul className='mt-3 flex flex-col gap-3'>
              {addressCandidates.map((address) => (
                <li key={`${address.postalCode}-${address.roadAddress}`} className='rounded-[28px] bg-white px-5 py-6'>
                  <div className='flex items-start gap-3'>
                    <h3 className='min-w-0 flex-1 break-keep text-lg font-bold leading-[1.45] text-text'>
                      {address.roadAddress}
                      {address.buildingName && `(${address.buildingName})`}
                    </h3>
                    <button
                      type='button'
                      onClick={() =>
                        navigate(returnTo ?? '/reward/address-detail', {
                          state: { address },
                        })
                      }
                      className='flex h-12 w-[76px] shrink-0 items-center justify-center rounded-full bg-bg-green2 text-base font-bold text-main-green2'
                    >
                      선택
                    </button>
                  </div>

                  <div className='mt-5 flex items-start gap-3'>
                    <span className='flex h-10 w-[92px] shrink-0 items-center justify-center rounded-full bg-bg-green2 text-sm font-semibold text-gray-700'>지번</span>
                    <p className='min-w-0 pt-1 text-base font-semibold leading-[1.6] text-gray-500'>{address.jibunAddress}</p>
                  </div>

                  <div className='mt-4 flex items-center gap-3'>
                    <span className='flex h-10 w-[92px] shrink-0 items-center justify-center rounded-full bg-bg-green2 text-sm font-semibold text-gray-700'>우편번호</span>
                    <p className='text-base font-semibold text-gray-500'>{address.postalCode}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className='mt-3 rounded-[22px] bg-white px-5 py-10 text-center text-sm font-semibold text-gray-500'>검색 결과가 없습니다.</div>
          )}
        </section>
      ) : (
        <section className='mt-6 rounded-[28px] bg-bg-green2 px-6 py-7 text-gray-700'>
          <h2 className='text-lg font-bold leading-none'>이렇게 검색해보세요!</h2>

          <div className='mt-5'>
            <p className='flex items-center gap-2 text-base font-semibold leading-none'>
              <span className='h-2 w-2 shrink-0 rounded-full bg-main-green1' aria-hidden='true' />
              도로명 + 건물번호
            </p>
            <p className='mt-2 text-base font-semibold text-gray-500'>예) 정자일로 95, 불정로 6</p>
          </div>

          <div className='mt-5'>
            <p className='flex items-center gap-2 text-base font-semibold leading-none'>
              <span className='h-2 w-2 shrink-0 rounded-full bg-main-green1' aria-hidden='true' />
              동/읍/면/리 + 번지
            </p>
            <p className='mt-2 text-base font-semibold text-gray-500'>예) 정자동 178-4, 동면 만천리 1000</p>
          </div>
        </section>
      )}
    </div>
  );
}
