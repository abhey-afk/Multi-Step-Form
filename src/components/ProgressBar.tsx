import { FC } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full h-4 bg-[#E5E5E5] rounded-full overflow-hidden">
      <div
        className="h-full bg-[#58CC02] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
