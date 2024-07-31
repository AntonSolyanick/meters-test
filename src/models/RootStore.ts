import { Instance, t } from 'mobx-state-tree';
import { MeterModel } from './MeterModel';
import { AddressModel } from './AddressModel';

export const RootStore = t
  .model('RootStore', {
    meters: t.array(MeterModel),
    addresses: t.array(AddressModel),
  })
  .actions((store) => ({
    addMeeters(meters: []) {
      store.meters.splice(0, store.meters.length);
      store.meters.push(...meters);
    },

    addAddresses(address: any) {
      store.addresses.push(address);
    },

    deleteMeter(meterId: string) {
      const arr = store.meters.filter((meter) => {
        return meter.id !== meterId;
      });
      store.meters.splice(0, store.meters.length);
      store.meters.push(...arr);
    },
  }));

export type RootStore = Instance<typeof RootStore>;

let rootStore: RootStore;
export function useStore() {
  if (!rootStore) {
    rootStore = RootStore.create({
      meters: [],
      addresses: [],
    });
  }
  return rootStore;
}
