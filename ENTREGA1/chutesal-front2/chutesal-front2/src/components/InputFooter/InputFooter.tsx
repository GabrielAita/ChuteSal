interface ILabelProps {
   label: string;
}

export default ({label} : ILabelProps) => {
  return(
    <span className="w-full text-gray-400 text-xxs text-right">{label}</span>
  );
}