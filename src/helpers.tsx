import { URL_GET_ADDRESSES, URL_GET_METERS, METERS_BY_PAGE } from './config';
import { Address } from './models/AddressModel';
import { Meter } from './models/MeterModel';
import { RootStore } from './models/RootStore';

const getAddressPromises = (meters: Meter[], rootStore: RootStore) => {
  const promissesArray: Function[] = [];

  meters.forEach((meter: Meter) => {
    if (
      rootStore.addresses.find(
        (address: Address) => address.id === meter.area.id
      )
    )
      return;

    promissesArray.push(
      async () =>
        await fetch(`${URL_GET_ADDRESSES}${meter.area.id}`).catch((err) =>
          console.error(err.message)
        )
    );
  });
  return promissesArray;
};

export const getData = async (
  offset: number,
  setMetersCount: Function,
  rootStore: RootStore
) => {
  await fetch(`${URL_GET_METERS}limit=${METERS_BY_PAGE}&offset=${offset}`)
    .then((res) => res.json())
    .then((res) => {
      const meters = res.results;

      (async () => {
        try {
          const promiseAddresses = await Promise.all(
            getAddressPromises(meters, rootStore)
          );
          promiseAddresses.map(async (el, i) => {
            const res = await el();
            const data = await res.json();
            rootStore.addAddresses(data);
            if (i === promiseAddresses.length - 1) rootStore.addMeeters(meters);
          });
        } catch (error: any) {
          console.error(error.message);
        }
      })();
      rootStore.addMeeters(meters);
      setMetersCount(res.count);
    })
    .catch((err) => console.error(err.message));
};
