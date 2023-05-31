import React, { useEffect } from 'react';
import './toast.component.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetToast, selectToast } from '../../app/slices/notification.slice';

const Toast: React.FC<{}> = () => {
  const state = useAppSelector(selectToast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (state.isVisible) {
      timeout = setTimeout(() => {
        dispatch(resetToast());
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <AnimatePresence>
      {state.isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="toast">{state.message ? state.message : ''}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
