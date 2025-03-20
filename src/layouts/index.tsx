// import bg from '@/assets/images/bg1.png';
import bg from '@/assets/bg.png';
import ScaleBox from 'react-scale-box';
import { Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <ScaleBox width={1920} height={1080}>
      <div className={styles.navs}>
        <Outlet />
        <img
          src={bg}
          width="1920px"
          height="1080px"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
        />
      </div>
    </ScaleBox>
  );
}
