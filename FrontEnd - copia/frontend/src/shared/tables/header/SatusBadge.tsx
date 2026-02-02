import { IStausBadge } from '../../../shared/tables/header/IStatusBadge';

const StatusBadge: React.FC<IStausBadge> = ({ text, color, bgcolor }) => {
  return (
    <span
      className="px-3 py-1 rounded-full text-sm font-medium"
      style={{ color: color, backgroundColor: bgcolor }}
    >
      {text}
    </span>
  );
};

export default StatusBadge;
