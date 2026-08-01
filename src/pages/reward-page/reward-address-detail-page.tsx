import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Info from '../../assets/icons/info.svg?react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import type { AddressCandidates, ShippingAddress } from '../../types/reward';
import { createRewardAddress, getRewardAddressList } from '../../apis/reward';

interface AddressDetailLocationState {
  address?: AddressCandidates;
}

type AddressType = 'HOME' | 'COMPANY' | 'SCHOOL';

interface AddressDetailFormProps {
  selectedAddress: AddressCandidates;
  existingShippingAddress?: ShippingAddress;
  isEditMode: boolean;
  shippingAddressId?: string;
}

const addressTypes: { label: string; value: AddressType }[] = [
  { label: '집', value: 'HOME' },
  { label: '회사', value: 'COMPANY' },
  { label: '학교', value: 'SCHOOL' },
];

function RewardAddressDetailForm({
  selectedAddress,
  existingShippingAddress,
  isEditMode,
  shippingAddressId,
}: AddressDetailFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [addressType, setAddressType] = useState<AddressType>(
    existingShippingAddress?.addressType ?? 'HOME',
  );
  const [receiverName, setReceiverName] = useState(
    existingShippingAddress?.receiverName ?? '',
  );
  const [phone, setPhone] = useState(existingShippingAddress?.phone ?? '');
  const [detailAddress, setDetailAddress] = useState(
    existingShippingAddress?.address2 ?? '',
  );
  const [isDefault, setIsDefault] = useState(
    existingShippingAddress?.isDefault ?? true,
  );

  const {
    mutate: createAddress,
    isPending: isCreating,
    isError: isCreateError,
  } = useMutation({
    mutationFn: createRewardAddress,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['rewardAddressList'],
      });
      navigate('/reward/address-list');
    },
    onError: (error) => {
      console.error('배송지 생성에 실패했습니다.', error);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEditMode) {
      // TODO: 배송지 수정 API 연결
      return;
    }

    createAddress({
      addressType,
      receiverName: receiverName.trim(),
      phone: phone.trim(),
      postalCode: selectedAddress.postalCode,
      address1: selectedAddress.roadAddress,
      address2: detailAddress.trim(),
      isDefault,
    });
  };

  const inputClassName = 'mt-2 h-12 w-full rounded-[20px] border border-gray-200 bg-white px-6 text-[15px] font-medium text-text outline-none placeholder:text-gray-400 focus:border-main-green1';

  return (
    <div className='flex flex-1 flex-col bg-gray-50 px-5 pb-7 font-pretendard'>
      <form className='flex flex-1 flex-col pt-4' onSubmit={handleSubmit}>
        <h1 className='text-lg font-bold text-text'>상세정보를 입력해주세요</h1>

        <div className='mt-2 flex flex-col gap-3'>
          <div>
            <p className='text-[15px] font-bold text-text'>주소</p>
            <button
              type='button'
              onClick={() =>
                navigate('/reward/address-search', {
                  state: {
                    returnTo: isEditMode ? `/reward/address-detail/${shippingAddressId}/edit` : '/reward/address-detail',
                  },
                })
              }
              className='mt-2 w-full rounded-[20px] bg-bg-green2 px-5 py-3.5 text-left'
              aria-label='주소 다시 검색'
            >
              <span className='block text-[15px] font-bold leading-snug text-gray-800'>{selectedAddress.roadAddress}</span>
              <span className='mt-0.5 block text-[13px] font-medium text-gray-500'>({selectedAddress.postalCode})</span>
            </button>

            <input required value={detailAddress} onChange={(event) => setDetailAddress(event.target.value)} placeholder='상세 주소를 입력해주세요' className={inputClassName} />

            <p className='mt-2 flex items-center gap-1.5 text-xs font-medium text-gray-500'>
              <Info className='h-4 w-4 shrink-0' aria-hidden='true' />
              상세 주소는 도로명 주소에 맞게 입력해주세요.
            </p>
          </div>

          <label className='text-[15px] font-bold text-text'>
            받는 이
            <input required value={receiverName} onChange={(event) => setReceiverName(event.target.value)} placeholder='이름을 입력해주세요' className={inputClassName} />
          </label>

          <label className='text-[15px] font-bold text-text'>
            연락처
            <input required type='tel' inputMode='numeric' value={phone} onChange={(event) => setPhone(event.target.value)} placeholder='연락처를 입력해주세요' className={inputClassName} />
          </label>

          <div>
            <p className='text-[15px] font-bold text-text'>배송지 명</p>
            <div className='mt-2 flex gap-2' role='radiogroup' aria-label='배송지 명'>
              {addressTypes.map(({ label, value }) => {
                const isSelected = addressType === value;

                return (
                  <button key={value} type='button' role='radio' aria-checked={isSelected} onClick={() => setAddressType(value)} className={`h-8 rounded-full border px-4 text-sm font-semibold transition-colors ${isSelected ? 'border-main-green1 bg-main-green1 text-white' : 'border-gray-200 bg-white text-gray-500'}`}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <label className='flex cursor-pointer items-center gap-2 text-[15px] font-bold text-text'>
            <input type='checkbox' checked={isDefault} onChange={(event) => setIsDefault(event.target.checked)} className='peer sr-only' />
            <span className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${isDefault ? 'border-main-green1 bg-main-green1 text-white' : 'border-gray-300 bg-white text-transparent'}`} aria-hidden='true'>
              <svg viewBox='0 0 16 12' className='h-3 w-4' fill='none'>
                <path d='m1.5 6 4 4 9-9' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </span>
            기본 배송지로 설정
          </label>

          {isCreateError && (
            <p role='alert' className='text-center text-sm font-semibold text-red-500'>
              배송지를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.
            </p>
          )}
        </div>

        <button type='submit' disabled={isCreating} className='mt-auto h-12 w-full rounded-full bg-main-green1 text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-60'>
          {isCreating ? '저장 중...' : isEditMode ? '수정하기' : '저장하기'}
        </button>
      </form>
    </div>
  );
}

export default function RewardAddressDetailPage() {
  const { state } = useLocation();
  const { shippingAddressId } = useParams();
  const isEditMode = Boolean(shippingAddressId);
  const {
    data: addressList,
    isPending: isAddressListPending,
    isError: isAddressListError,
  } = useQuery({
    queryKey: ['rewardAddressList'],
    queryFn: getRewardAddressList,
    enabled: isEditMode,
  });
  const existingShippingAddress = addressList?.find(
    ({ shippingAddressId: id }) => id === Number(shippingAddressId),
  );
  const searchedAddress = (state as AddressDetailLocationState | null)?.address;
  const selectedAddress =
    searchedAddress ??
    (existingShippingAddress
      ? {
          roadAddress: existingShippingAddress.address1,
          jibunAddress: '',
          postalCode: existingShippingAddress.postalCode,
          buildingName: null,
        }
      : undefined);

  if (isEditMode && isAddressListPending) {
    return (
      <div className='flex flex-1 items-center justify-center bg-gray-50'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isEditMode && (isAddressListError || !existingShippingAddress)) {
    return <Navigate to='/reward/address-list' replace />;
  }

  if (!selectedAddress) {
    return <Navigate to={isEditMode ? '/reward/address-list' : '/reward/address-search'} replace />;
  }

  return (
    <RewardAddressDetailForm
      selectedAddress={selectedAddress}
      existingShippingAddress={existingShippingAddress}
      isEditMode={isEditMode}
      shippingAddressId={shippingAddressId}
    />
  );
}
