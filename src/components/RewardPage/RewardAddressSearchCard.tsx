import type { AddressCandidates } from '../../types/reward';

interface AddressSearchCardProps{
    address: AddressCandidates;
    onSelect: (address: AddressCandidates) => void;
}

export default function AddressSearchCard({ address, onSelect }: AddressSearchCardProps) {
    const { roadAddress, jibunAddress, postalCode, buildingName } = address;

    return (
          <article className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-bold leading-5">
          {roadAddress}
          {buildingName && ` (${buildingName})`}
        </p>

        <button
          type="button"
          onClick={() => onSelect(address)}
          className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-main-green1"
        >
          선택
        </button>
      </div>

      <div className="mt-3 flex items-start gap-2">
        <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs">
          지번
        </span>

        <p className="text-sm leading-5 text-gray-400">
          {jibunAddress}
          {buildingName && ` ${buildingName}`}
        </p>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs">
          우편번호
        </span>

        <p className="text-sm text-gray-400">
          {postalCode}
        </p>
      </div>
    </article>
    )
}


