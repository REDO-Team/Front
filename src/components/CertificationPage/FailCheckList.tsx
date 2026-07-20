import Check from '/src/assets/icons/check.svg?react';

interface FailCheckListProps {
  content: string;
}

export default function FailCheckList({ content }: FailCheckListProps) {
  return (
    <div className='flex items-center gap-3'>
      <Check className='text-error-text' />
      <p className='font-pretendard font-medium text-sm text-error-text break-keep'>{content}</p>
    </div>
  );
}
