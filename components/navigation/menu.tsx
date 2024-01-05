import React from 'react';
import TelegramLoginButton from 'react-telegram-login';
import { Avatar, Button, useTheme, Popover } from '@geist-ui/react';
import { Sun, Moon } from '@geist-ui/react-icons';
import UserSettings from '@/components/navigation/user-settings';
import { usePrefers } from '@/lib/use-prefers';
import Submenu from '@/components/navigation/submenu';

const Menu: React.FC = () => {
  const theme = useTheme();
  const prefers = usePrefers();
  const handleTelegramResponse = (response) => {
    prefers.setUserDetails(response);
  };

  return (
    <>
      <nav className="menu-nav">
        <h1 className="menu-nav__title">Stood Bot for Telegram</h1>
        <div>
          <Button
            aria-label="Toggle Dark mode"
            className="theme-button"
            auto
            type="abort"
            onClick={() =>
              prefers.switchTheme(theme.type === 'dark' ? 'light' : 'dark')
            }
          >
            {theme.type === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          {prefers?.userInfo && (
            <Popover
              placement="bottomEnd"
              portalClassName="user-settings__popover"
            >
              <button className="user-settings__button">
                <Avatar src={prefers?.userInfo?.photo_url} text="SB" />
              </button>
            </Popover>
          )}

          {!prefers?.userInfo && (
            <TelegramLoginButton
              dataOnauth={handleTelegramResponse}
              botName={process.env.NEXT_PUBLIC_BOT_NAME}
            />
          )}
        </div>
      </nav>
      <Submenu />
   
    </>
  );
};

export default Menu;
