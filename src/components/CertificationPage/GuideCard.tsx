import Check from '/src/assets/icons/check.svg?react';

interface GuideCardProps {
  content: string;
}

export default function GuideCard({ content }: GuideCardProps) {
  return (
    <div className='flex gap-1.5 items-center rounded-[20px] px-3 py-2.5 bg-white/30'>
      <Check className='text-white w-4 h-4' />
      <p className='font-pretendard font-bold text-sm text-white break-keep'>{content}</p>
    </div>
  );
}
