import { useEffect, useRef } from 'react';

const useChatScrollToButton = (prop) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current?.scrollHeight - scrollRef.current?.clientHeight;
    }
  }, [prop]);

  return scrollRef;
};
export default useChatScrollToButton;
