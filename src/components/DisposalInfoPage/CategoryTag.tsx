interface CategoryTagProps {
  tagName: string;
  onClick: () => void;
}

export default function CategoryTag({ tagName, onClick }: CategoryTagProps) {
  return (
    <button type='button' className='selelct-none w-fit px-6 py-3.5 font-pretendard font-semibold text-base text-text bg-gray-100 rounded-full mr-2.5 mb-2' onClick={() => onClick()}>
      {tagName}
    </button>
  );
}
