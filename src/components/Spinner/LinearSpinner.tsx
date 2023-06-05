import React, { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';


export default function LinearSpinner() {
  const [view, setView] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => { }, 0);

    timer = setTimeout(() => {
      setView(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [view]);

  return <>{ view && <LinearProgress /> }</>;
}
