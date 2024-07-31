import { useEffect, useState } from 'react';
import { useStore } from '../models/RootStore';
import { observer } from 'mobx-react-lite';

import MeterItem from './MeterItem';
import PaginationContainer from './PaginationContainer';
import { METERS_BY_PAGE, tableHeadings, URL_DELETE_METER } from '../config';
import styles from './MetersTable.module.css';
import { getData } from '../helpers';

const MetersTable = observer(() => {
  const rootStore = useStore();
  const [offset, setOffset] = useState(0);
  const [metersTotalCount, setMetersTotalCount] = useState(0);

  const deleteMeter = async (meterId: string) => {
    await fetch(`${URL_DELETE_METER}${meterId}/`, {
      method: 'DELETE',
    });
    getData(offset, setMetersTotalCount, rootStore);
  };

  useEffect(() => {
    getData(offset, setMetersTotalCount, rootStore);
  }, [offset, rootStore]);

  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr className={styles.headingRow}>
          {tableHeadings.map((heading: string) => (
            <th key={heading} className={styles.heading}>
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {rootStore.meters.map((meter, i) => (
          <MeterItem
            id={meter.id}
            key={meter.id}
            index={i}
            offset={offset}
            type={meter._type[0]}
            installDate={meter.installation_date}
            isAutomatic={meter.is_automatic}
            areaId={meter.area.id}
            description={meter.description}
            value={meter.initial_values[0]}
            deleteMeter={deleteMeter}
          ></MeterItem>
        ))}
      </tbody>
      <tfoot className={styles.tableFoot}>
        <tr>
          <td className={styles.pageNumbersContainer} colSpan={8}>
            <PaginationContainer
              setCurrentPage={setOffset}
              currentPage={offset + 1}
              totalPages={Math.ceil(metersTotalCount / METERS_BY_PAGE)}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
});

export default MetersTable;
