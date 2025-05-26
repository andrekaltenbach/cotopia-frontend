import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { CaretDownIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const solutions = [
  {
    name: 'Events',
    description: 'Browse Events',
    href: '/events?category=event',
  },
  {
    name: 'Help',
    description: 'Browse Help offers and requests',
    href: '/events?category=help',
  },
  {
    name: 'Real Estate',
    description: 'Browse Apartments or Houses offers and requests',
    href: '/events?category=real estate',
  },
  {
    name: 'Trade',
    description: 'Browse sell, buy or swap offers and requests',
    href: '/events?category=trade',
  },
  {
    name: 'Transportation',
    description: 'Browse transportation offers and requests',
    href: '/events?category=transportation',
  },
];

export default function FoldableEventsMenu() {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center">
        <span>Categories</span>
        <CaretDownIcon size={20} weight="duotone" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            {solutions.map((item) => (
              <div
                key={item.name}
                className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
              >
                {/* <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon
                    aria-hidden="true"
                    className="size-6 text-gray-600 group-hover:text-indigo-600"
                  />
                </div> */}
                <div>
                  <Link to={item.href} className="font-semibold text-teal-800">
                    {item.name}
                    <span className="absolute inset-0" />
                  </Link>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
