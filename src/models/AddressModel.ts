import { t } from 'mobx-state-tree';

export interface Address {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: {
    address: string;
    id: string;
    fias_addrobjs: string[];
  };
}

const House = t.model('House', {
  address: t.string,
  id: t.string,
  fias_addrobjs: t.array(t.string),
});

export const AddressModel = t.model('AddressModel', {
  id: t.string,
  number: t.number,
  str_number: t.string,
  str_number_full: t.string,
  house: House,
});
