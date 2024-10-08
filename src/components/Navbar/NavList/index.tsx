'use client';

import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import SignOutButton from '@features/authentication/components/SignOutButton';
import { SessionUser } from '@features/authentication/model/user';
import { useIsMobile } from '@hooks/useMediaQuery';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import LanguageSwitch from '../LanguageSwitch';
import SearchBar from '../SearchBar';
import User from '../User';
import styles from './NavList.module.scss';

const cx = classNames.bind(styles);

type Props = {
  currentUser?: SessionUser;
};

export default function NavList({ currentUser }: Props) {
  const translate = useTranslations('components.navBar');
  const isMobile = useIsMobile();
  const mobileBtnRef = useRef<HTMLSpanElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const [activateMobileNav, setActivateMobileNav] = useState<boolean>(false);
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  const toggleMobileNavHandler = () => {
    setActivateMobileNav(true);
    setShowMobileNav((prevState) => !prevState);
  };

  const outboundOnClickHandler = (evt: MouseEvent) => {
    const target = evt.target as Node;
    if (!mobileBtnRef.current?.contains(target) && !navItemsRef.current?.contains(target)) {
      setActivateMobileNav(false);
      setShowMobileNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', outboundOnClickHandler);

    return () => {
      window.removeEventListener('click', outboundOnClickHandler);
    };
  }, []);

  return (
    <>
      {isMobile && <LanguageSwitch type='mobile' />}
      {isMobile && (
        <Icon
          ref={mobileBtnRef}
          className={cx('mobile-nav-btn', { active: activateMobileNav === true })}
          icon={FaBars}
          size={24}
          onClick={toggleMobileNavHandler}
        />
      )}
      <div
        ref={navItemsRef}
        className={cx('nav-items', {
          'mobile-nav': isMobile,
          expanded: activateMobileNav,
          collapsed: activateMobileNav && !showMobileNav,
        })}
      >
        {isMobile && !currentUser && (
          <Button
            fullSize
            className={cx('mobile-sign-in', 'py-[8px]')}
            paddingLess
            link={{ href: '/sign-in' }}
          >
            <Icon className='mr-[5px]' icon={FaCircleUser} size={32} />
            <span className='text-xl font-bold'>{translate('signInBtn')}</span>
          </Button>
        )}
        {isMobile && currentUser && <User user={currentUser} type='mobile' />}
        <SearchBar />
        {!isMobile && <LanguageSwitch type='desktop' />}
        {!isMobile && <User user={currentUser} type='desktop' />}
        {isMobile && currentUser && (
          <SignOutButton className={cx('mobile-sign-out')} type='mobile' />
        )}
      </div>
    </>
  );
}
