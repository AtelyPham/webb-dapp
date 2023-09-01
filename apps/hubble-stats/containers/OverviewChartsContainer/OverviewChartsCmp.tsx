'use client';

import { FC, useState } from 'react';
import { ChartContainer } from '@webb-tools/webb-ui-components';

import { AreaChart, VolumeChart } from '../../components';
import { OverviewChartsDataType } from '../../data';

const OverviewChartsCmp: FC<OverviewChartsDataType> = ({
  currentTvl,
  volume24h,
  tvlData,
  volumeData,
}) => {
  const [tvlValue, setTvlValue] = useState<number | null>(null);
  const [tvlDate, setTVLDate] = useState<Date | null>(null);
  const [volumeValue, setVolumeValue] = useState<number | null>(null);
  const [volumeDate, setVolumeDate] = useState<Date | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* TVL Chart Container */}
      <ChartContainer
        heading="TVL"
        currentValue={currentTvl}
        value={tvlValue}
        date={tvlDate}
        valueSuffix=" tTNT"
        className="bg-glass dark:bg-glass_dark"
      >
        <AreaChart
          data={tvlData}
          setDate={setTVLDate}
          setValue={setTvlValue}
          tooltipLabel="TVL"
          tooltipValuePrefix="$"
        />
      </ChartContainer>

      {/* 24 Hour Volume Chart Container */}
      <ChartContainer
        heading="Volume 24H"
        currentValue={volume24h}
        value={volumeValue}
        date={volumeDate}
        valueSuffix=" tTNT"
        className="bg-glass dark:bg-glass_dark"
      >
        <VolumeChart
          data={volumeData}
          setDate={setVolumeDate}
          setValue={setVolumeValue}
        />
      </ChartContainer>
    </div>
  );
};

export default OverviewChartsCmp;