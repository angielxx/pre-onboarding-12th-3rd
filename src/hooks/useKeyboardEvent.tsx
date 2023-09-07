import useKeywordStore from '@/stores/keywordStore';
import { useCallback, useEffect } from 'react';

export const useKeyboardEvent = (onEnter: () => void) => {
  const { selectedId, setSelectedId, maxId } = useKeywordStore(state => state);

  const keyDownHandler = useCallback(
    (event: globalThis.KeyboardEvent) => {
      const { key } = event;

      if (key === 'ArrowUp') {
        setSelectedId(Math.max(selectedId - 1, -1));
      } else if (key === 'ArrowDown') {
        console.log('down');
        setSelectedId(Math.min(selectedId + 1, maxId));
      } else if (key === 'Enter') {
        console.log('enter');
        event.preventDefault();
        onEnter();
      }
    },
    [maxId, onEnter],
  );

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);

  return;
};
