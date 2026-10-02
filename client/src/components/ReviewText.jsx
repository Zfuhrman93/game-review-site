import { useState, useRef, useLayoutEffect } from 'react';

// Shows a review clamped to a few lines, with a toggle only when it overflows.
const ReviewText = ({ text }) => {
  const ref = useRef(null);
  const [ expanded, setExpanded ] = useState(false);
  const [ overflows, setOverflows ] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if(el && !expanded) setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, [text, expanded]);

  return(
    <>
      <p ref={ref} className={expanded ? 'review-text' : 'review-text clamped'}>{text}</p>
      {overflows ? <button className="see-more" onClick={() => setExpanded(!expanded)}>
        {expanded ? 'See less' : 'See more'}
      </button> : null}
    </>
  )
}

export default ReviewText;
