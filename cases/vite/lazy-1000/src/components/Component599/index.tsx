import { useEffect, useState } from 'react';
import type { FocusEvent } from 'react';

const toTotalSeconds = (mmss: string): number | null => {
  if (mmss === '') {
    return null;
  }

  const [str1, str2] = mmss.split(':');

  const val1 = parseInt(str1, 10);
  const val2 = parseInt(str2, 10);

  if (Number.isNaN(val1)) {
    return 0;
  }

  if (Number.isNaN(val2)) {
    return val1;
  }

  return val1 * 60 + val2;
};

const toMMSS = (totalSeconds: number | null) => {
  if (totalSeconds === null) {
    return '';
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return [minutes, seconds < 10 ? `0${seconds}` : seconds].join(':');
};

type Props = {
  seconds: number | null;
  onChange: (seconds: number | null) => void;
  placeholder?: string;
};

function TimeInput({ seconds, onChange, ...rest }: Props) {
  const [textValue, setTextValue] = useState(() => toMMSS(seconds));

  useEffect(() => {
    if (seconds !== toTotalSeconds(textValue)) {
      setTextValue(toMMSS(seconds));
    }
  }, [seconds, textValue]);

  const _onChange = (value: string) => {
    setTextValue(value);
    onChange(toTotalSeconds(value));
  };

  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const text = toMMSS(toTotalSeconds(value));
    setTextValue(text);
  };

  return <input type="text" onChange={_onChange} onBlur={onBlur} value={textValue} {...rest} />;
}

export default TimeInput;