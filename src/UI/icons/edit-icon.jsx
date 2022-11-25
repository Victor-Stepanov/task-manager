const EditIcon = ({ onClick, className }) => {
  return (
    <svg
      width='11'
      height='11'
      viewBox='0 0 11 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}
      className={className}
      cursor='pointer'
    >
      <path
        d='M1.87122 10H1V9.12286L6.75797 3.36489L7.63479 4.2417L1.87122 10ZM9.70313 2.17402L8.82598 1.29687L8.96073 1.16213L9.83787 2.03927L9.70313 2.17402ZM10.3914 2.03927L10.8213 2.47005L10.391 2.03971L10.3908 2.03953L10.3905 2.03927L10.3899 2.03865L10.1142 1.76294C10.1144 1.7627 10.1147 1.76246 10.1149 1.76222L10.391 2.03883L10.3914 2.03927ZM9.23778 0.885073C9.23754 0.885315 9.2373 0.885557 9.23706 0.885799L9.23778 0.885073Z'
        fill='#DFDFDF'
        stroke='black'
        strokeWidth='2'
      />
    </svg>
  );
};

export default EditIcon;
