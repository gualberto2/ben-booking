interface HeadingProps {
  title: String;
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col ">
      <h1 className="font-semibold text-3xl">{title}</h1>
      <div className="text-gray-500 flex items-center gap-2 text-sm dark:text-gray-400">
        <p>{description}</p>
      </div>
    </div>
  );
};
export default Heading;
