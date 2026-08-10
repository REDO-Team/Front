import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Location from '../../assets/icons/location.svg';
import type {
  RewardPurchaseRequest,
  RewardProductDetail,
  ShippingAddress,
} from '../../types/reward';
import RewardPlaceholder from '../../assets/icons/reward-reward.svg';
import {
  createRewardPurchase,
  getRewardAddressList,
  getRewardProductDetail,
  getRewardPoints,
} from '../../apis/reward';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import FailInfo from '../../components/common/FailInfo';
import Modal from '../../components/common/Modal';

interface PurchaseSectionProps {
  product: RewardProductDetail;
}

interface PartnerPurchaseSectionProps extends PurchaseSectionProps {
  shippingAddress: ShippingAddress | null;
  onManageAddress: () => void;
}

function PartnerPurchaseSection({ product, shippingAddress, onManageAddress }: PartnerPurchaseSectionProps) {
  void product;

  if (!shippingAddress) {
    return (
      <button type='button' onClick={onManageAddress} className='mt-3 flex min-h-17 w-full items-center rounded-[22px] bg-white px-5 py-4 text-left shadow-[0_6px_16px_rgba(0,0,0,0.04)]'>
        <img src={Location} alt='' className='h-7 w-6 shrink-0' />
        <span className='ml-3 text-sm font-bold text-text'>배송 정보 입력하기</span>
        <span aria-hidden='true' className='ml-auto text-[30px] font-light leading-none text-main-green1'>
          +
        </span>
      </button>
    );
  }

  return (
    <section className='mt-3 flex min-h-17 items-center rounded-[22px] bg-white px-5 py-4 shadow-[0_6px_16px_rgba(0,0,0,0.04)]'>
      <img src={Location} alt='' className='h-7 w-6 shrink-0' />
      <div className='ml-3 min-w-0 flex-1'>
        <h2 className='truncate text-sm font-bold text-text'>{shippingAddress.receiverName}</h2>
        <p className='mt-0.5 truncate text-xs text-gray-500'>{shippingAddress.address1} {shippingAddress.address2}</p>
      </div>
      <button type='button' onClick={onManageAddress} className='ml-3 shrink-0 text-xs font-semibold text-main-green1'>
        변경
      </button>
    </section>
  );
}

interface GifticonPurchaseSectionProps {
  receiverName: string;
  receiverPhone: string;
  setReceiverName: (name: string) => void;
  setReceiverPhone: (phone: string) => void;
}

function GifticonPurchaseSection({
  receiverName,
  receiverPhone,
  setReceiverName,
  setReceiverPhone }: GifticonPurchaseSectionProps) {
  return (
    <section className='mt-5'>
      <h2 className='text-lg font-bold text-text'>수신자</h2>
      <input
        type='text'
        placeholder='수신자 이름을 입력해주세요'
        className='mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-text placeholder:text-gray-400 focus:border-main-green1 focus:outline-none'
        value={receiverName}
        onChange={(e) => setReceiverName(e.target.value)}
      />
      <h2 className='mt-5 text-lg font-bold text-text'>핸드폰 번호</h2>
      <input
        type='text'
        placeholder='번호를 입력해주세요'
        className='mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-text placeholder:text-gray-400 focus:border-main-green1 focus:outline-none'
        value={receiverPhone}
        onChange={(e) => setReceiverPhone(e.target.value)}
      />
    </section>
  );
}

export default function RewardCheckoutPage() {
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [isInsufficientPointModalOpen, setIsInsufficientPointModalOpen] =
    useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const idempotencyKey = useRef(crypto.randomUUID());
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = Number(productId);
  const isValidProductId =
    Number.isSafeInteger(numericProductId) && numericProductId > 0;
  const {
    data: productDetail,
    isPending: isProductPending,
    isError: isProductError,
  } = useQuery({
    queryKey: ['rewardProduct', numericProductId],
    queryFn: () => getRewardProductDetail(numericProductId),
    enabled: isValidProductId,
  });
  const {
    data: rewardPoints,
    isPending: isPointsPending,
    isError: isPointsError,
  } = useQuery({
    queryKey: ['rewardPoints'],
    queryFn: getRewardPoints,
  });
  const isPartnerProduct =
    productDetail?.rewardProductType === 'PARTNER_BRAND';
  const {
    data: addressList,
    isPending: isAddressPending,
    isError: isAddressError,
  } = useQuery({
    queryKey: ['rewardAddressList'],
    queryFn: getRewardAddressList,
    enabled: isPartnerProduct,
  });
  const selectedShippingAddress =
    addressList?.find(({ isDefault }) => isDefault) ?? addressList?.[0] ?? null;
  const {
    mutate: purchaseReward,
    isPending: isPurchasing,
    isError: isPurchaseError,
  } = useMutation({
    mutationFn: (request: RewardPurchaseRequest) =>
      createRewardPurchase(request, idempotencyKey.current),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['rewardPoints'] }),
        queryClient.invalidateQueries({ queryKey: ['rewardProducts'] }),
        queryClient.invalidateQueries({ queryKey: ['rewardProduct'] }),
        queryClient.invalidateQueries({ queryKey: ['rewardHistory'] }),
      ]);
      navigate(`/reward/use-complete/${numericProductId}`, {
        replace: true,
        state: { rewardProductType: productDetail?.rewardProductType },
      });
    },
    onError: (error) => {
      console.error('상품 구매에 실패했습니다.', error);
    },
  });

  const handlePurchase = () => {
    if (!productDetail || !rewardPoints) return;

    if (rewardPoints.totalPoint < productDetail.pricePoint) {
      setIsInsufficientPointModalOpen(true);
      return;
    }

    if (isPartnerProduct) {
      if (!selectedShippingAddress) return;

      purchaseReward({
        rewardProductId: productDetail.rewardProductId,
        shippingAddressId: selectedShippingAddress.shippingAddressId,
      });
      return;
    }

    const trimmedReceiverName = receiverName.trim();
    const trimmedReceiverPhone = receiverPhone.trim();

    if (!trimmedReceiverName || !trimmedReceiverPhone) return;

    purchaseReward({
      rewardProductId: productDetail.rewardProductId,
      receiverName: trimmedReceiverName,
      receiverPhone: trimmedReceiverPhone,
    });
  };

  if (
    !isValidProductId ||
    isProductError ||
    isPointsError ||
    (isPartnerProduct && isAddressError)
  ) {
    return (
      <div className='flex flex-1 flex-col bg-[#F9FBFB] px-5 pb-6 pt-4 font-pretendard'>
        <FailInfo
          title='제품을 불러오지 못했어요.'
          content='제품 번호를 확인한 후 다시 시도해 주세요.'
        />
      </div>
    );
  }

  if (
    isProductPending ||
    isPointsPending ||
    (isPartnerProduct && isAddressPending)
  ) {
    return (
      <div className='flex flex-1 items-center justify-center bg-[#F9FBFB]'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!productDetail || !rewardPoints) {
    return (
      <div className='flex flex-1 flex-col bg-[#F9FBFB] px-5 pb-6 pt-4 font-pretendard'>
        <FailInfo
          title='제품을 찾을 수 없어요.'
          content='잠시 후 다시 시도해 주세요.'
        />
      </div>
    );
  }

  const isPartner = productDetail.rewardProductType === 'PARTNER_BRAND';
  const remainingPoint = rewardPoints.totalPoint - productDetail.pricePoint;
  const hasGifticonRecipient =
    receiverName.trim().length > 0 && receiverPhone.trim().length > 0;
  const isPurchaseDisabled =
    isPurchasing ||
    productDetail.stockQuantity < 1 ||
    productDetail.status !== 'ACTIVE' ||
    (isPartner ? !selectedShippingAddress : !hasGifticonRecipient);

  return (
    <div className='flex flex-1 flex-col bg-[#F9FBFB] px-5 pb-6 pt-4 font-pretendard'>
      <h1 className='text-lg font-bold text-text'>제품 내역</h1>
      <div className='mt-3 flex min-h-27 items-center gap-4 rounded-[28px] bg-white px-5 py-[18px]'>
        <div className='flex h-[70px] w-[70px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100'>
          <img
            src={productDetail.imageUrl || RewardPlaceholder}
            alt={`${productDetail.name} 상품`}
            className='h-full w-full object-cover'
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = RewardPlaceholder;
              event.currentTarget.className = 'h-10 w-10 object-contain';
            }}
          />
        </div>

        <div className='min-w-0 flex-1'>
          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold leading-none ${isPartner ? 'bg-skyblue-bg text-skyblue-text' : 'bg-reward-bg text-reward-text'}`}>{isPartner ? '친환경 제품' : '기프티콘'}</span>

          <h2 className='mt-2 truncate text-base font-bold leading-tight text-text'>{productDetail.name}</h2>

          <div className='mt-2 flex items-center gap-1.5'>
            <span className='text-sm font-semibold text-gray-400'>사용 포인트</span>
            <span className='text-base font-semibold text-main-green1'>{productDetail.pricePoint.toLocaleString()}P</span>
          </div>
        </div>
      </div>

      {isPartner ? (
        <PartnerPurchaseSection
          product={productDetail}
          shippingAddress={selectedShippingAddress}
          onManageAddress={() => navigate('/reward/address-list')}
        />
      ) : (
        <GifticonPurchaseSection
          receiverName={receiverName}
          receiverPhone={receiverPhone}
          setReceiverName={setReceiverName}
          setReceiverPhone={setReceiverPhone}
        />
      )}

      <div>
        <p className='mt-2 flex text-black font-bold'>포인트 사용 내역</p>
        <div className='mt-3  min-h-27 items-center gap-4 rounded-[28px] bg-white px-5 py-[18px]'>
          <div className='flex w-full justify-between'>
            <span className='text-sm font-semibold text-gray-400'>보유 포인트</span>
            <span className='font-bold'>{rewardPoints.totalPoint.toLocaleString()}P</span>
          </div>
          <div className='flex w-full justify-between'>
            <span className='text-sm font-semibold text-gray-400'>사용예정 포인트</span>
            <span className='text-red-500 font-bold'>-{productDetail.pricePoint.toLocaleString()}P</span>
          </div>
          <div className='my-4 h-px w-full bg-gray-200' />

          <div className='flex w-full justify-between'>
            <span className='text-lg font-semibold text-black'>잔여 포인트</span>
            <span className={`text-lg font-bold ${remainingPoint < 0 ? 'text-red-500' : 'text-main-green1'}`}>{remainingPoint.toLocaleString()}P</span>
          </div>
        </div>
      </div>

      {isPurchaseError && (
        <p role='alert' className='mt-3 text-center text-sm font-semibold text-red-500'>
          상품 구매에 실패했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      <div className='mt-auto pt-8'>
        <button
          type='button'
          disabled={isPurchaseDisabled}
          onClick={handlePurchase}
          className='w-full rounded-full bg-main-green1 py-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-400'
        >
          {isPurchasing ? '처리 중...' : '포인트 사용하기'}
        </button>
      </div>

      <Modal
        isOpen={isInsufficientPointModalOpen}
        title='보유 포인트가 부족합니다'
        buttonText='돌아가기'
        buttonColor='red'
        onClose={() => setIsInsufficientPointModalOpen(false)}
        onConfirm={() => navigate('/reward/store')}
      />
    </div>
  );
}
