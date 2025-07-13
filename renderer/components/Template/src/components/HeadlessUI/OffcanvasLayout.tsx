import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

interface OffcanvasLayoutProps {
  open: boolean;
  toggleOffcanvas: () => void;
  children: ReactNode;
  placement?: 'end' | 'start' | 'top' | 'bottom';
  sizeClassName?: string;
}

const OffcanvasLayout = ({ open, toggleOffcanvas, children, placement, sizeClassName }: OffcanvasLayoutProps) => {
  let enterFrom = 'translate-x-full rtl:-translate-x-full';
  let enterTo = 'translate-x-0';

  if (placement == 'bottom') {
    enterFrom = 'translate-y-full'
    enterTo = 'translate-y-0'
  } else if (placement == 'top') {
    enterFrom = '-translate-y-full'
    enterTo = 'translate-y-0'
  } else if (placement == 'start') {
    enterFrom = '-translate-x-full rtl:translate-x-full'
    enterTo = 'translate-x-0'
  }

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as='div' className='relative' onClose={toggleOffcanvas}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-40 z-40' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enterFrom={enterFrom}
            enterTo={enterTo}
            leaveFrom={enterTo}
            leaveTo={enterFrom}
          >
            <div className={`fixed duration-300 overflow-y-auto z-50 transform overflow-hidden card rounded-none shadow-xl transition-all ${sizeClassName ?? ''} ${placement ?? 'end'}-0 ${(placement == 'top' || placement == 'bottom') ? 'min-w-full w-full inset-x-0' : 'min-h-full h-full inset-y-0'}`}>
              <Dialog.Panel>
                {children}
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export default OffcanvasLayout