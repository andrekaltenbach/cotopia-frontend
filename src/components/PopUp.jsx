import { Popover } from 'flowbite-react';

export function PopUp({ children }) {
  const content = (
    <div className="w-52 text-sm text-gray-500 dark:text-gray-400">
      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">Missing Data!</h3>
      </div>
      <div className="px-3 py-2">
        <p>Fill in all required fields</p>
      </div>
    </div>
  );

  return (
    <Popover content={content} trigger="hover" placement="top">
      {children}
    </Popover>
  );
}
