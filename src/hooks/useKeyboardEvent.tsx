import useKeywordStore from '@/stores/keywordStore';
import useRecentKeywordStore from '@/stores/recentKeywordStore';
import { useCallback, useEffect } from 'react';

export const useKeyboardEvent = (onEnter: () => void) => {
  const { selectedId, setSelectedId, maxId } = useKeywordStore(state => state);

  const { addKeyword } = useRecentKeywordStore(state => state);

  const keyDownHandler = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (event.isComposing) return;

      const { key } = event;

      if (key === 'ArrowUp') {
        event.preventDefault();
        setSelectedId(Math.max(selectedId - 1, -1));
      } else if (key === 'ArrowDown') {
        event.preventDefault();
        setSelectedId(Math.min(selectedId + 1, maxId));
      } else if (key === 'Enter') {
        event.preventDefault();
        onEnter();
      }
    },
    [maxId, selectedId, setSelectedId],
  );

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyDownHandler]);

  return;
};
