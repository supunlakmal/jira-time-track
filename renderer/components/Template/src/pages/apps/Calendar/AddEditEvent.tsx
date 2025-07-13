import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventInput } from "@fullcalendar/core";

// components
import { FormInput } from "../../../components";
import { ModalLayout } from "../../../components/HeadlessUI";

interface FormValues {
  title: string;
  className: string;
}

interface AddEditEventProps {
  isOpen: boolean;
  onClose?: any;
  isEditable?: boolean;
  eventData: EventInput;
  onRemoveEvent?: () => void;
  onUpdateEvent: (value: any) => void;
  onAddEvent: (value: any) => void;
}

const AddEditEvent = ({
  isOpen,
  onClose,
  isEditable,
  eventData,
  onRemoveEvent,
  onUpdateEvent,
  onAddEvent,
}: AddEditEventProps) => {
  // event state
  const [event] = useState<EventInput>(eventData!);

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup.string().required("Please enter event name"),
      className: yup.string().required("Please select category"),
    })
  );

  /*
   * form methods
   */
  const methods = useForm<FormValues>({
    defaultValues: {
      title: event.title,
      className: event.className ? String(event.className) : "bg-danger",
    },
    resolver: schemaResolver,
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  /*
   * handle form submission
   */
  const onSubmitEvent = (data: { title: string; className: string }) => {
    isEditable ? onUpdateEvent(data) : onAddEvent(data);
  };

  return (
    <>
      <ModalLayout showModal={isOpen} toggleModal={onClose} panelClassName="min-w-[500px] card">
        <div className="flex justify-between items-center py-3 px-6 border-b dark:border-gray-700">
          <h3 className="font-medium text-gray-500 dark:text-white text-base">
            Add New Event
          </h3>
          <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200" onClick={onClose} type="button">
            <i className="mgc_close_line text-lg"></i>
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmitEvent)}
        >
          <div className="py-3 px-6 overflow-y-auto">
            <div className="flex-col">
              <div className="w-full">

                <FormInput
                  type="text"
                  label="Event Name"
                  name="title"
                  className="form-input"
                  placeholder="Insert Event Name"
                  containerClass="space-y-1.5 mb-6"
                  register={register}
                  key='title'
                  errors={errors}
                  control={control}
                  required
                />
              </div>
              <div className="w-full">
                <FormInput
                  type="select"
                  label="Category"
                  name="className"
                  className="form-select"
                  containerClass="space-y-1.5 mb-6"
                  key='className'
                  register={register}
                  errors={errors}
                  control={control}
                >
                  <option className="dark:bg-gray-700" value="bg-danger" defaultChecked >Danger</option>
                  <option className="dark:bg-gray-700" value="bg-success">Success</option>
                  <option className="dark:bg-gray-700" value="bg-primary">Primary</option>
                  <option className="dark:bg-gray-700" value="bg-info">Info</option>
                  <option className="dark:bg-gray-700" value="bg-dark">Dark</option>
                  <option className="dark:bg-gray-700" value="bg-warning">Warning</option>
                </FormInput>

              </div>
            </div>
          </div>
          <div className="flex justify-end items-center gap-2 py-3 px-6 border-t dark:border-slate-700">
            <button className="btn bg-light text-gray-800 transition-all dark:bg-gray-700 dark:text-gray-100" type="button" onClick={onClose}>Close</button>
            <button className="btn bg-primary text-white" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </ModalLayout>
    </>
  );
};

export default AddEditEvent;
