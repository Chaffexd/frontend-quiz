type HeaderProps = {
    category: string;
    image: string | undefined;
}

const Header = ({ category, image }: HeaderProps) => {
  return (
    <nav className="flex justify-between px-24 pt-16 pb-16">
      <div className="flex items-center">
        <img src={image} alt={`The category is ${category}`} className="mr-8" />
        <h1 className="font-bold">{category}</h1>
      </div>
    </nav>
  );
};

export default Header;
