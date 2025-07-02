import { useState } from 'react';

import Tabs from '../../components/tabs/Tabs.tsx';

import ChatTab from './_components/chat-tab/ChatTab.tsx';
import Header from './_components/header/Header.tsx';
import ProfileTab from './_components/profile-tab/ProfileTab.tsx';

type TabId = 'chat' | 'profile';

const tabs = [
  { id: 'chat' as const, label: 'Chat' },
  { id: 'profile' as const, label: 'Profile' },
] as const;

const Chat = () => {
  const [activeTab, setActiveTab] = useState<TabId>('chat');

  return (
    <div className='flex h-full w-full flex-col overflow-hidden'>
      <Header />
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className='flex flex-1 flex-col'>
        {activeTab === 'chat' && <ChatTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </div>
    </div>
  );
};

export default Chat;
