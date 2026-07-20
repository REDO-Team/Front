import type { ShippingAddress } from '../../types/reward';

interface RewardAddressCardProps {
  shippingAddressListResponse: ShippingAddress;
  isSelected: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const addressTypeLabels: Record<string, string> = {
  HOME: '집',
  COMPANY: '회사',
};

export default function RewardAddressCard({
  shippingAddressListResponse,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: RewardAddressCardProps) {
  const {
    addressType,
    receiverName,
    phone,
    address1,
    address2,
    postalCode,
    isDefault,
  } = shippingAddressListResponse;
  const addressTypeLabel = addressTypeLabels[addressType] ?? addressType;

  return (
    <article
      onClick={onSelect}
      className={`rounded-[22px] border-2 bg-white px-5 py-[18px] font-pretendard shadow-[0_6px_16px_rgba(0,0,0,0.04)] ${
        isSelected ? 'border-main-green1' : 'border-transparent'
      } ${onSelect ? 'cursor-pointer' : ''}`}
    >
      <div className='flex items-center gap-3'>
        <h2 className='min-w-0 truncate text-[17px] font-bold text-text'>
          {receiverName} ({addressTypeLabel})
        </h2>

        {isDefault && (
          <span className='shrink-0 rounded-full bg-main-green1 px-3 py-1 text-[11px] font-bold leading-none text-white'>
            기본 배송지
          </span>
        )}

        {isSelected && (
          <span className='ml-auto shrink-0 text-sm font-bold text-main-green1'>
            선택됨
          </span>
        )}
      </div>

      <p className='mt-2 text-sm font-medium leading-none text-gray-600'>
        {phone}
      </p>
      <p className='mt-2 text-sm font-medium leading-[1.4] text-text'>
        {address1}
        <br />
        {address2} ({postalCode})
      </p>

      <div className='mt-5 grid grid-cols-2 gap-3'>
        <button
          type='button'
          onClick={(event) => {
            event.stopPropagation();
            onEdit?.();
          }}
          className='h-11 rounded-full border border-gray-300 bg-white text-sm font-bold text-gray-600'
        >
          수정
        </button>
        <button
          type='button'
          onClick={(event) => {
            event.stopPropagation();
            onDelete?.();
          }}
          className='h-11 rounded-full border border-gray-300 bg-white text-sm font-bold text-gray-600'
        >
          삭제
        </button>
      </div>
    </article>
  );
}
