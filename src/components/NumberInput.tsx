import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { cx } from 'class-variance-authority';
import { Minus, PlusIcon } from 'lucide-react';
interface NumberInputProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
}

export function NumberInput({
  value,
  min = 1,
  max = 10,
  step = 1,
  className,
  onChange
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleDecrease = () => {
    const newValue = Math.max(min, internalValue - step);
    setInternalValue(newValue);
    onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(max, internalValue + step);
    setInternalValue(newValue);
    onChange(newValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);

    setInternalValue(newValue);
    onChange(newValue);
  };
  const handleBlur = () => {
    if (internalValue <= min || internalValue >= max) {
      const newV = internalValue <= min ? min : max;
      setInternalValue(newV);
      onChange(newV);
    }
  };
  const cls = cx(className, 'flex items-center space-x-2');
  return (
    <div className={cls}>
      <Button
        type="button"
        onClick={handleDecrease}
        className="rounded-md  border bg-white px-3 py-2 text-gray-500 hover:bg-gray-100"
      >
        <Minus className="h-3 w-3" />
      </Button>
      <Input
        type="number"
        value={internalValue}
        min={min}
        max={max}
        onChange={handleChange}
        className="text-center"
        onBlur={handleBlur}
      />
      <Button
        type="button"
        onClick={handleIncrease}
        className="rounded-md  border bg-white px-3 py-2 text-gray-500 hover:bg-gray-100"
      >
        <PlusIcon className="h-3 w-3" />
      </Button>
    </div>
  );
}
