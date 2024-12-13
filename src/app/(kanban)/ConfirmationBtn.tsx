import { Button, ButtonProps } from '@/components/ui/button';
import { ReactNode, useState } from 'react';

type Props = {
  defaultText: string | ReactNode;
  confirmationText: string | ReactNode;
  variant: ButtonProps['variant'];
  onConfirm: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
};

export const ConfirmationBtn = ({
  defaultText,
  confirmationText,
  onConfirm,
  variant,
}: Props) => {
  const [clickCount, setClickCount] = useState(0);

  return (
    <Button
      variant={variant}
      type="button"
      onClick={(e) => {
        if (onConfirm && clickCount > 0) {
          onConfirm(e);
          return;
        }
        setClickCount((c) => c + 1);
      }}
    >
      {clickCount > 0 ? confirmationText : defaultText}
    </Button>
  );
};
