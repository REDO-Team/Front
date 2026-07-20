import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BigLogo from '../../assets/icons/Big-logo.svg';
import Home from '../../assets/icons/home.svg';
import RewardAddressCard from '../../components/RewardPage/RewardAddressCard';
import TopBar from '../../components/common/TopBar';
import { MOCK_SHIPPING_ADDRESS_RESPONSE } from '../../mocks/reward';

const initialShippingAddresses =
  MOCK_SHIPPING_ADDRESS_RESPONSE.result?.shippingAddresses ?? [];

export default function RewardAddressListPage() {
  const navigate = useNavigate();
  const [shippingAddresses, setShippingAddresses] = useState(
    initialShippingAddresses,
  );
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    () =>
      initialShippingAddresses.find(({ isDefault }) => isDefault)
        ?.shippingAddressId ??
      initialShippingAddresses[0]?.shippingAddressId ??
      null,
  );
  const hasShippingAddresses = shippingAddresses.length > 0;

  const handleDelete = (shippingAddressId: number) => {
    setShippingAddresses((currentAddresses) => {
      const nextAddresses = currentAddresses.filter(
        (address) => address.shippingAddressId !== shippingAddressId,
      );

      if (selectedAddressId === shippingAddressId) {
        setSelectedAddressId(
          nextAddresses.find(({ isDefault }) => isDefault)
            ?.shippingAddressId ??
            nextAddresses[0]?.shippingAddressId ??
            null,
        );
      }

      return nextAddresses;
    });
  };

  return (
    <div className='flex flex-1 flex-col bg-bg-green1 px-4 pb-8 font-pretendard'>
      <TopBar
        title='배송지 목록'
        leftIcon
        rightIcon={Home}
        onClick={() => navigate('/')}
        bgColor='bg-green1'
      />
      
      <button
        type='button'
        onClick={() => navigate('/reward/address-search')}
        className='mx-4 mt-4 flex h-16 w-[calc(100%-2rem)] items-center justify-center gap-3 rounded-[22px] border border-dashed border-main-green1 bg-bg-green2 font-pretendard text-base font-bold text-main-green1'
      >
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
              isSelected={
                selectedAddressId === shippingAddress.shippingAddressId
              }
              onSelect={() =>
                setSelectedAddressId(shippingAddress.shippingAddressId)
              }
              onEdit={() =>
                navigate(
                  `/reward/address-detail/${shippingAddress.shippingAddressId}/edit`,
                )
              }
              onDelete={() => handleDelete(shippingAddress.shippingAddressId)}
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
    </div>
  );
}
