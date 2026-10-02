import { useState, useEffect } from 'react';
import axios from 'axios';

// Render's free tier sleeps when idle and takes up to a minute to cold start.
// Anything slower than this is almost certainly that, not a normal request.
const SLOW_REQUEST_MS = 2500;

const WakeBanner = () => {
  const [ show, setShow ] = useState(false);

  useEffect(() => {
    let pending = 0;
    let timer;

    const start = (config) => {
      if(pending++ === 0){
        timer = setTimeout(() => setShow(true), SLOW_REQUEST_MS);
      }
      return config;
    };
    const finish = () => {
      if(--pending === 0){
        clearTimeout(timer);
        setShow(false);
      }
    };

    const reqId = axios.interceptors.request.use(start);
    const resId = axios.interceptors.response.use(
      (res) => { finish(); return res; },
      (err) => { finish(); return Promise.reject(err); }
    );

    return () => {
      clearTimeout(timer);
      axios.interceptors.request.eject(reqId);
      axios.interceptors.response.eject(resId);
    };
  }, [])

  if(!show) return null;

  return (
    <div className="wake-banner" role="status">
      <span className="wake-banner-dot" aria-hidden="true" />
      Waking up the server&hellip; it naps when nobody's around, so the first load can take up to a minute.
    </div>
  );
}

export default WakeBanner;
