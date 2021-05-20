/* eslint-disable @typescript-eslint/indent */
import { MixerGroupItem } from '@webb-dapp/mixer';
import { InputLabel } from '@webb-dapp/ui-components/Inputs/InputLabel/InputLabel';
import { FontFamilies } from '@webb-dapp/ui-components/styling/fonts/font-families.enum';
import { Token } from '@webb-tools/sdk-core';
import React, { useEffect, useMemo, useCall } from 'react';
import styled, { css } from 'styled-components';

const MixerGroupSelectWrapper = styled.div`
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  flex-wrap: wrap;
  overflow: auto;
`;
type MixerGroupSelectProps = {
  items: MixerGroupItem[];
  value?: MixerGroupItem;
  onChange?(item: MixerGroupItem): void;
};
const AmountChipWrapper = styled.span<{ selected?: boolean }>`
  cursor: pointer;
  transition: all ease 0.3s;

  && {
    border: 1px solid #ebeefd;
    border-radius: 20px;
    ${({ selected }) => {
      return selected
        ? css`
            background: #ebedf2;
          `
        : '';
    }};
    font-family: ${FontFamilies.AvenirNext};
    color: ${({ theme }) => theme.primaryText};
    height: 31px;
    padding: 0 5px;
    flex: 1;
    margin: 5px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MixerGroupSelect: React.FC<MixerGroupSelectProps> = ({ items, onChange, value }) => {
  const checkedIndex = useMemo(() => {
    return items.findIndex((item) => item.id === value?.id);
  }, [value, items]);

  useEffect(() => {
    if (!value && onChange) {
      onChange(items[1]);
    }
  }, [onChange, value, items]);

  const mixerSizes = useMemo(() => {
    return items.map((item, index) => {
      const { amount, symbol } = item.token;

      return {
        amount: `${amount.toNumber() / 10 ** amount.getPrecision()} ${item.currency.symbol}`,
        id: `amount-${item.id}`,
        item,
        selected: index === checkedIndex,
      };
    });
  }, [checkedIndex, items]);

  return (
    <InputLabel label={'Select Amount'}>
      <MixerGroupSelectWrapper>
        {mixerSizes
          .sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount))
          .map(({ amount, id, item, selected }) => {
          return (
            <AmountChipWrapper
              key={id}
              selected={selected}
              onClick={() => {
                console.log('clicked');
                onChange?.(item);
              }}
            >
              {amount}
            </AmountChipWrapper>
          );
        })}
      </MixerGroupSelectWrapper>
    </InputLabel>
  );
};