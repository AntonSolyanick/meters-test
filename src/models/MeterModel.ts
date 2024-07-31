import { t } from 'mobx-state-tree';

export interface Meter {
  id: string;
  _type: string[];
  area: {
    id: string;
  };
  is_automatic: null | boolean;
  communication: null | string;
  description: null | string;
  serial_number: null | string;
  installation_date: string;
  brand_name: null | string;
  model_name: null | string;
  initial_values: number[];
}

const Area = t.model('Area', {
  id: t.string,
});

export const MeterModel = t.model('MeterModel', {
  id: t.string,
  _type: t.array(t.string),
  area: Area,
  is_automatic: t.maybeNull(t.boolean),
  communication: t.maybeNull(t.string),
  description: t.maybeNull(t.string),
  serial_number: t.maybeNull(t.string),
  installation_date: t.string,
  brand_name: t.maybeNull(t.string),
  model_name: t.maybeNull(t.string),
  initial_values: t.array(t.number),
});
