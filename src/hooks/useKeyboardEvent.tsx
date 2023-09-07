import { useCallback, useEffect, useState } from 'react';

export const useKeyboardEvent = (maxId: number) => {
  const [selectedId, setSelectedId] = useState<number>(-1);

  const keyDownHandler = useCallback(
    ({ key }) => {
      if (key === 'ArrowUp') {
        console.log('up');
        setSelectedId(prev => Math.max(prev - 1, -1));
      } else if (key === 'ArrowDown') {
        console.log('down');
        setSelectedId(prev => Math.min(prev + 1, maxId));
      }
    },
    [maxId],
  );

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);

  return { selectedId };
};
