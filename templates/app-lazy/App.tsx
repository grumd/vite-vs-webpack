import { useState, Suspense, lazy } from 'react';

import "./styles.css";

const Entry = lazy(() => import('./components/Entry'))

export default function App() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button onClick={() => setVisible(true)}>Show components</button>
      <Suspense fallback={<div>Loading...</div>}>
        {visible && <Entry />}
      </Suspense>
    </>
  );
}
