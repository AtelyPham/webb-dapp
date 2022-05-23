import { FormHelperText, InputBase } from '@material-ui/core';
import React from 'react';

type AmountInputProps = {
  value: string;
  onChange(next: string): void;
  error?: string;
};

export const AmountInput: React.FC<AmountInputProps> = ({ error, onChange, value }) => {
  return (
    <>
      <InputBase
        fullWidth
        endAdornment
        placeholder={`AMOUNT`}
        value={value}
        inputProps={{ style: { fontSize: 14 } }}
        onChange={(event) => {
          onChange?.(event.target.value as string);
        }}
      />
      <FormHelperText error={Boolean(error)}>{error}</FormHelperText>
    </>
  );
};
