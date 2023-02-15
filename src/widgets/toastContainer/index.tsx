import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './toast';

import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransition = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    },
  );

  return (
    <div>
      {messagesWithTransition.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </div>
  );
};

export default ToastContainer;