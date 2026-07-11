interface RecycleCategoryCardProps {
  padding: number;
  gap: number;
  radius: number;
  imgSize: number;
  categorySize: number;
  nameSize: number;
  content?: string;
}

export default function RecycleCategoryCard({ padding, gap, radius, imgSize, categorySize, nameSize, content }: RecycleCategoryCardProps) {
  return (
    <div className={`flex bg-linear-to-r from-main-green1 to-main-sky rounded-xl`} style={{ padding, gap, borderRadius: radius }}>
      <div className={`opacity-45 bg-white`} style={{ width: imgSize, height: imgSize, borderRadius: radius }}></div>
      <div className='flex flex-col'>
        <span className={`font-pretendard font-semibold text-white bg-bg-green3/50 px-2.5 py-0.75 rounded-full inline-fit`} style={{ fontSize: categorySize }}>
          플라스틱
        </span>
        <span className={`font-pretendard font-bold text-white`} style={{ fontSize: nameSize }}>
          투명 페트병
        </span>
        {content && <p className='font-pretendard font-semibold text-sm text-white'>{content}</p>}
      </div>
    </div>
  );
}
