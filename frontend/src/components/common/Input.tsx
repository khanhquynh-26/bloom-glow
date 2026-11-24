import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      type = 'text',
      showPasswordToggle = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || props.name;

    const inputType =
      showPasswordToggle && type === 'password'
        ? showPassword
          ? 'text'
          : 'password'
        : type;

    return (
      <div className="common-input-group">
        {label && (
          <label htmlFor={inputId} className="common-input-label">
            {label}
          </label>
        )}

        <div className="common-input-wrapper">
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={`common-input ${error ? 'input-error' : ''} ${className}`}
            {...props}
          />

          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              className="input-password-toggle"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {error && <span className="input-error-message">{error}</span>}
        {!error && hint && <span className="input-hint">{hint}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;