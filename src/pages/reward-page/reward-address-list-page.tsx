import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import BigLogo from '../../assets/icons/Big-logo.svg';
import RewardAddressCard from '../../components/RewardPage/RewardAddressCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import FailInfo from '../../components/common/FailInfo';
import Modal from '../../components/common/Modal';
import {
  deleteRewardAddress,
  getRewardAddressList,
} from '../../apis/reward';

export default function RewardAddressListPage() {
  const navigate = useNavigate();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [deleteAddressId, setDeleteAddressId] = useState<number | null>(null);
  const {
    data: addressList,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['rewardAddressList'],
    queryFn: getRewardAddressList,
  });

  const shippingAddresses = addressList ?? [];
  const effectiveSelectedAddressId =
    selectedAddressId ??
    shippingAddresses.find(({ isDefault }) => isDefault)?.shippingAddressId ??
    shippingAddresses[0]?.shippingAddressId ??
    null;
  const hasShippingAddresses = shippingAddresses.length > 0;

  const queryClient = useQueryClient();
  const deleteAddressMutation = useMutation({
    mutationFn: deleteRewardAddress,
    onSuccess: (_, deletedAddressId) => {
      setSelectedAddressId((currentAddressId) =>
        currentAddressId === deletedAddressId ? null : currentAddressId,
      );
      queryClient.invalidateQueries({ queryKey: ['rewardAddressList'] });
    },
    onError: () => {
      alert('배송지 삭제에 실패했습니다.');
    },
  });
  const handleDeleteConfirm = () => {
    if (deleteAddressId === null) return;

    deleteAddressMutation.mutate(deleteAddressId);
    setDeleteAddressId(null);
  };

  if (isPending) {
    return (
      <div className='flex flex-1 items-center justify-center bg-[#F9FBFB]'>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !addressList) {
    return (
      <div className='flex flex-1 flex-col bg-[#F9FBFB] px-4 pb-8 font-pretendard'>
        <FailInfo
          title='배송지 목록을 불러오지 못했어요.'
          content='잠시 후 다시 시도해 주세요.'
        />
      </div>
    );
  }

  return (
    <div className='flex flex-1 flex-col bg-[#F9FBFB] px-4 pb-8 font-pretendard'>
      <button type='button' onClick={() => navigate('/reward/address-search')} className='mx-4 mt-4 flex h-16 w-[calc(100%-2rem)] items-center justify-center gap-3 rounded-[22px] border border-dashed border-main-green1 bg-bg-green2 font-pretendard text-base font-bold text-main-green1'>
        <span aria-hidden='true' className='text-[30px] font-light leading-none'>
          +
        </span>
        <span>배송지 신규 등록</span>
      </button>

      {hasShippingAddresses ? (
        <section aria-label='등록된 배송지' className='mt-4 flex flex-col gap-3'>
          {shippingAddresses.map((shippingAddress) => (
            <RewardAddressCard
              key={shippingAddress.shippingAddressId}
              shippingAddressListResponse={shippingAddress}
              isSelected={effectiveSelectedAddressId === shippingAddress.shippingAddressId}
              onSelect={() => setSelectedAddressId(shippingAddress.shippingAddressId)}
              onEdit={() => navigate(`/reward/address-detail/${shippingAddress.shippingAddressId}/edit`)}
              onDelete={() => setDeleteAddressId(shippingAddress.shippingAddressId)}
            />
          ))}
        </section>
      ) : (
        <div className='flex flex-1 flex-col items-center justify-center pb-32 text-center'>
          <img src={BigLogo} alt='' className='h-auto w-20' />
          <p className='mt-5 text-base font-bold leading-[1.45] text-text'>
            아직 저장된
            <br />
            배송지 목록이 없어요!
          </p>
        </div>
      )}

      <Modal
        isOpen={deleteAddressId !== null}
        title={'배송지를 삭제하시겠습니까?'}
        buttonText='삭제하기'
        buttonColor='red'
        onClose={() => setDeleteAddressId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
