import { getCurrentUser } from '@features/authentication/lib/session';
import { Link } from '@lib/navigation';
import classNames from 'classnames/bind';
import NavList from './NavList';
import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

export default async function NavBar() {
  const currentUser = await getCurrentUser();

  return (
    <nav className={cx('root')}>
      <div className={cx('container')}>
        <Link className={cx('logo')} href='/'></Link>
        <NavList currentUser={currentUser} />
      </div>
    </nav>
  );
}
