import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

interface ModalLayoutProps {
  showModal: boolean;
  toggleModal: () => void;
  panelClassName?: string;
  children: ReactNode;
  placement?: string;
  isStatic?: boolean;
}

const ModalLayout = ({ showModal, toggleModal, panelClassName, children, placement, isStatic }: ModalLayoutProps) => {
  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog
        static={isStatic ?? false}
        as="div"
        className="relative"
        onClose={isStatic ? () => null : toggleModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className={`flex min-h-full ${placement ?? 'justify-center items-center'}`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="transition-all">
                <Dialog.Panel className={`text-left align-middle transition-all min-h-full duration-300 overflow-y-auto transform overflow-hidden rounded-lg ${panelClassName}`}>
                  {children}
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition >
  )
}

export default ModalLayout