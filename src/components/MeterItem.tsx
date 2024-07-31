import { useStore } from '../models/RootStore';

import IconButton from './UI/IconButton';
import styles from './MeterItem.module.css';
import TrashIcon from './icons/TrashIcon';
import ColdWaterIcon from './icons/ColdWaterIcon';
import HotWaterIcon from './icons/HotWaterIcon';

type Props = {
  id: string;
  index: number;
  offset: number;
  value: number;
  type: string;
  installDate: string;
  isAutomatic: boolean | null;
  areaId: string;
  description: string | null;
  deleteMeter: Function;
};

const MeterItem = ({
  id,
  index,
  offset,
  value,
  type,
  installDate,
  isAutomatic,
  areaId,
  description,
  deleteMeter,
}: Props) => {
  const rootStore = useStore();
  const address = rootStore.addresses.find((el) => el.id === areaId)!;
  let meterTypeIcon = null;

  if (type === 'ColdWaterAreaMeter') meterTypeIcon = <ColdWaterIcon />;
  if (type === 'HotWaterAreaMeter') meterTypeIcon = <HotWaterIcon />;

  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableData}>{index + 1 + offset * 20}</td>
      <td className={styles.tableData}>{meterTypeIcon}</td>
      <td className={styles.tableData}>
        {installDate.split('T')[0].split('-').reverse().join('.')}
      </td>
      <td className={styles.tableData}>
        {isAutomatic === null
          ? 'Нет данных'
          : isAutomatic === true
          ? 'да'
          : 'нет'}
      </td>
      <td className={styles.tableData}>{value}</td>
      <td className={styles.tableData}>
        {address && `${address?.house?.address} ${address?.str_number_full}`}
      </td>
      <td className={`${styles.tableData} ${styles.textDescription}`}>
        {description}
      </td>
      <td className={styles.buttonColumn}>
        <IconButton
          onClick={() => {
            deleteMeter(id);
          }}
          icon={<TrashIcon />}
        />
      </td>
    </tr>
  );
};

export default MeterItem;
