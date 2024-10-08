'use client';

import { isEmpty, isUndefined } from '@lib/object';
import { format as formatter, toDate } from 'date-fns';
import { useState } from 'react';

import { DATE_FORMAT } from '~/constants/date-format';
import useInterval from './useInterval';

type Props = {
  refreshCycle?: number;
  format?: string;
  displayDate?: boolean;
};

export default function useTime({ refreshCycle = 100, format = DATE_FORMAT.EN, displayDate }: Props) {
  if (!isUndefined(format) && !isEmpty(format) && displayDate) {
    throw new TypeError(
      "'format' and 'displayDate' props can not be defined concurrently."
    );
  }

  const [now, setNow] = useState<Date>(toDate(new Date()));

  useInterval(() => setNow(toDate(new Date())), refreshCycle);

  return !isUndefined(format) && !isEmpty(format)
    ? formatter(now, format)
    : displayDate
    ? `${now.toLocaleDateString()}-${now.toLocaleTimeString()}`
    : now.toLocaleTimeString();
}
