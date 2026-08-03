interface RecycleCategoryCardProps {
  padding: number;
  gap: number;
  radius: number;
  imgSize: number;
  categorySize: number;
  nameSize: number;
  category?: string;
  name?: string;
  content?: string;
  image?: string;
}

export default function RecycleCategoryCard({ padding, gap, radius, imgSize, categorySize, nameSize, content, category = '플라스틱', name = '투명 페트병', image }: RecycleCategoryCardProps) {
  return (
    <div className={`${name.includes('쓰레기') ? 'flex bg-gray-400' : 'flex bg-linear-to-r from-main-green1 to-main-sky rounded-xl shadow-md shadow-main-green1/15'}`} style={{ padding, gap, borderRadius: radius }}>
      {image ? <img src={image} className='object-fill' style={{ width: imgSize, height: imgSize, borderRadius: radius }} /> : <div className={`opacity-45 bg-white`} style={{ width: imgSize, height: imgSize, borderRadius: radius }}></div>}
      <div className='flex flex-col'>
        <span className={`font-pretendard font-semibold px-2.5 py-0.75 rounded-full inline-fit ${name.includes('쓰레기') ? 'text-text bg-white' : 'text-white bg-bg-green3/50'}`} style={{ fontSize: categorySize }}>
          {category}
        </span>
        <span className={`font-pretendard font-bold text-white`} style={{ fontSize: nameSize }}>
          {name}
        </span>
        {content && <p className='font-pretendard font-semibold text-sm text-white'>{content}</p>}
      </div>
    </div>
  );
}
