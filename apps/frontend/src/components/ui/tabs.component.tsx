type Tab<T extends string> = {
  id: T;
  label: string;
};

interface Props<T extends string> {
  activeTab: T;
  onTabChange: (tabId: T) => void;
  tabs: readonly Tab<T>[];
}

export const Tabs = <T extends string>({
  activeTab,
  onTabChange,
  tabs,
}: Props<T>) => (
  <ul className='flex shadow-[0_10px_10px_rgba(0,0,0,0.05)]'>
    {tabs.map((tab) => (
      <li
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`flex-1 cursor-pointer border-b-2 border-transparent py-1 text-center font-semibold transition-all duration-200 ease-in-out ${
          activeTab === tab.id ? 'border-[#e8506e] text-[#e8506e]' : ''
        }`}
      >
        {tab.label}
      </li>
    ))}
  </ul>
);
