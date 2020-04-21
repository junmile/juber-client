import React from 'react';

interface IProps {
  submitFn: any;
  className?: string;
}

const Form: React.SFC<IProps> = ({ submitFn, className }) => (
  <form
    className={className}
    onSubmit={(e) => {
      e.preventDefault();
      submitFn();
    }}
  />
);

export default Form;
