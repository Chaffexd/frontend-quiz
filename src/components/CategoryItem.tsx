type CategoryItemProps = {
  onClick: () => void;
  title: string;
  image: string;
};

const CategoryItem = ({ onClick, title, image }: CategoryItemProps) => {
  return (
    <>
      <button
        className="bg-white rounded-lg p-6 text-left mb-4 flex items-center font-bold hover:bg-slate-50"
        onClick={onClick}
      >
        <img src={image} className="mr-8" />
        {title}
      </button>
    </>
  );
};

export default CategoryItem;
