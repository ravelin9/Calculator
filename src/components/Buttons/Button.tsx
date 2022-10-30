import React, { useContext, KeyboardEvent, useEffect } from 'react';
import { ApiContext } from '../../contexts/ApiContextProvider';
import { ApiContextType, IButtons } from '../../@types/api';

declare global {
  interface WindowEventMap {
    keydown: KeyboardEvent<HTMLInputElement>
  }
}

const Button: React.FC<IButtons> = ({ symbol, inputRef }) => {
  const {
    text,
    setText,
    setResult,
  } = useContext(ApiContext) as ApiContextType;

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    if (target.textContent === '=') {
      return;
    }
    setText(text + target.textContent);
    inputRef.current?.focus();
  };

  const handleCancel = () => {
    setText('');
    setResult('');
    inputRef.current?.focus();
  };

  if (symbol === '=') {
    return (
      <button value={symbol} type="submit" className="equals">
        {symbol}
      </button>
    );
  }

  const handleUserKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key === 'Escape') {
      setText('');
      setResult('');
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  });
  return (
    <button onClick={symbol === 'C' ? handleCancel : handleClick} className="calculatorButtons" type="button">
      {symbol}
    </button>
  );
};

export default Button;
