import { type ReactNode } from 'react';
import { clsx } from 'clsx';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const variantConfig = {
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />,
  },
  success: {
    container: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    icon: <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />,
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 text-amber-800',
    icon: <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />,
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />,
  },
};

export function Alert({ variant = 'info', title, children, className }: AlertProps) {
  const config = variantConfig[variant];
  return (
    <div className={clsx('border rounded-lg p-3 flex gap-2.5', config.container, className)}>
      {config.icon}
      <div className="text-sm">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
