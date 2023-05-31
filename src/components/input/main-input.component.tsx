import React, { useEffect, useRef, useState } from 'react';
import './main-input.component.css';

interface MainInputOptions {
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  validationHandler?: (value: string) => boolean;
  errorMessage?: string;
  shouldFocus?: boolean;
}

const MainIpunt: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options?: MainInputOptions;
}> = ({ value, onChange, options }) => {
  const [showError, setShowError] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (options && options.shouldFocus) {
      inputRef.current?.focus();
    }
  }, []);

  const _onBlur = () => {
    const handler = options?.validationHandler;

    if (!handler) return;

    const isValid = handler(value);
    setShowError(!isValid);
  };

  return (
    <div className="main-input">
      {options?.label && (
        <label
          className={`main-input__label ${
            showError && 'main-input__label-error'
          }`}
        >
          {options.label}
        </label>
      )}
      <input
        className={`main-input__input ${
          showError && 'main-input__input-error'
        }`}
        type={options?.type}
        placeholder={options?.placeholder}
        ref={inputRef}
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
        onBlur={_onBlur}
      />
      <div className="main-input__message">
        {options?.errorMessage && showError ? options.errorMessage : ''}
      </div>
    </div>
  );
};

export default MainIpunt;
