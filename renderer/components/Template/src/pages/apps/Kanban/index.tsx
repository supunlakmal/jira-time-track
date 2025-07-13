import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd'

// components
import { CustomDatepicker, FormInput, PageBreadcrumb } from '../../../components'
import { ModalLayout } from '../../../components/HeadlessUI';

// dummy data
import { TaskTypes, assignees, tasks } from './data';

import TaskItem from './TaskItem';

interface StateType {
  newTasks: TaskTypes[];
  unassignedTasks: TaskTypes[];
  todoTasks: TaskTypes[];
  inprogressTasks: TaskTypes[];
  reviewTasks: TaskTypes[];
  doneTasks: TaskTypes[];
}

const KanbanApp = () => {

  const [state, setState] = useState<StateType>({
    newTasks: tasks.filter((t) => t.status === 'New'),
    unassignedTasks: tasks.filter((t) => t.status === 'Unassigned'),
    todoTasks: tasks.filter((t) => t.status === 'Todo'),
    inprogressTasks: tasks.filter((t) => t.status === 'Inprogress'),
    reviewTasks: tasks.filter((t) => t.status === 'Review'),
    doneTasks: tasks.filter((t) => t.status === 'Done'),
  });

  const [totalTasks, setTotalTasks] = useState<number>(tasks.length);
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  const [newTaskDetails, setNewTaskDetails] = useState<any>(null);

  /*
   * Form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup.string().required(),
      category: yup.string().required(),
      comments: yup.number().required(),
      attachments: yup.number().required(),
      priority: yup.string().required(),
      assignTo: yup.string().required(),
    })
  );

  /*
   * Form methods
   */
  const methods = useForm({ resolver: schemaResolver });
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = methods;

  /**
   * Toggles the new task modal
   */
  function toggleNewTaskModal() {
    setNewTaskModal((prevState) => !prevState);
  }

  /**
   * Creates new empty task with given status
   * @param status
   * @param queue
   */
  const newTask = (status: string, queue: string) => {
    setNewTaskDetails({
      dueDate: new Date(),
      status: status,
      queue: queue,
    });
    setNewTaskModal(true);
  };

  /**
   * When date changes
   * @param {} date
   */
  const handleDateChange = (date: Date) => {
    if (newTaskDetails) {
      // setState({
      //     ...state,
      //     newTask: { ...state.newTask, dueDate: date },
      // });
      setNewTaskDetails({ ...newTaskDetails, dueDate: date });
    }
  };

  // a little function to help us with reordering the result
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (
    source: Iterable<unknown> | ArrayLike<unknown>,
    destination: Iterable<unknown> | ArrayLike<unknown>,
    droppableSource: { index: number; droppableId: string | number },
    droppableDestination: { index: number; droppableId: string | number }
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  /**
   * Gets the list
   */
  const getList = (id: string) => {
    const modifiedState: any = { ...state };
    const stateTasks: any = modifiedState[id] && modifiedState[id];
    return stateTasks;
  };

  /**
   * On drag end
   */
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      const localState: any = { ...state };
      localState[source.droppableId] = items;
      setState(localState);
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      const localState = { ...state, ...result };
      setState(localState);
    }
  };

  /**
   * Handles the new task form submission
   */
  const handleNewTask = (values: any) => {
    const formData = {
      title: values.title,
      category: values.category,
      comments: values.comments,
      attachments: values.attachments,
      variant: values.priority,
      userAvatar: JSON.parse(values.assignTo).image,
    };
    const newTask = {
      ...newTaskDetails,
      ...formData,
      id: totalTasks + 1,
      dueDate: newTaskDetails.dueDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };
    const modifiedState: any = { ...state };
    const tasks = [...getList(newTaskDetails.queue), newTask];
    modifiedState[newTaskDetails.queue] = [...tasks];
    setState(modifiedState);
    setNewTaskModal(false);
    setTotalTasks(totalTasks + 1);

    // reset the form after submission
    reset();
  };

  return (
    <>
      <PageBreadcrumb title='Kanban' name='Kanban' breadCrumbItems={["Konrix", "Apps", "Kanban"]}>
        <button
          className="btn btn-sm bg-primary text-white"
          onClick={() => {
            toggleNewTaskModal();
            newTask('New', 'newTasks')
          }}
          type="button"
        > Add Task </button>
      </PageBreadcrumb>

      <div className="grid h-full w-full">
        <div className="overflow-hidden text-gray-700 dark:text-slate-400">
          <div className="flex overflow-x-auto custom-scroll gap-6 pb-4">

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='newTasks'>
                {(provided: any, snapshot: any) => (
                  <div ref={provided.innerRef} className="flex flex-col flex-shrink-0 w-72 border rounded-md overflow-hidden border-gray-200 dark:border-gray-700">
                    <div className="flex items-center flex-shrink-0 h-10 p-4 bg-white dark:bg-slate-800">
                      <span className="block text-sm font-semibold uppercase">New ({state.newTasks.length})</span>
                    </div>
                    <div className="flex flex-col gap-4 overflow-auto p-4 h-[calc(100vh-300px)] kanban-board custom-scroll">
                      {(state.newTasks || []).map((item, idx) => (
                        <Draggable
                          draggableId={item.id + ''}
                          index={idx}
                          key={item.id}
                        >
                          {(provided: any, snapshot: any) => (
                            <div
                              className="card p-4 cursor-pointer"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskItem task={item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Droppable droppableId='unassignedTasks'>
                {(provided: any, snapshot: any) => (
                  <div ref={provided.innerRef} className="flex flex-col flex-shrink-0 w-72 border rounded-md overflow-hidden border-gray-200 dark:border-gray-700">
                    <div className="flex items-center flex-shrink-0 h-10 p-4 bg-white dark:bg-slate-800">
                      <span className="block text-sm font-semibold uppercase">Unassigned ({state.unassignedTasks.length})</span>
                    </div>
                    <div className="flex flex-col gap-4 overflow-auto p-4 h-[calc(100vh-300px)] kanban-board custom-scroll">
                      {(state.unassignedTasks || []).map((item, idx) => (
                        <Draggable
                          draggableId={item.id + ''}
                          index={idx}
                          key={item.id}
                        >
                          {(provided: any, snapshot: any) => (
                            <div
                              className="card p-4 cursor-pointer"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskItem task={item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Droppable droppableId='todoTasks'>
                {(provided: any, snapshot: any) => (
                  <div ref={provided.innerRef} className="flex flex-col flex-shrink-0 w-72 border rounded-md overflow-hidden border-gray-200 dark:border-gray-700">
                    <div className="flex items-center flex-shrink-0 h-10 p-4 bg-white dark:bg-slate-800">
                      <span className="block text-sm font-semibold uppercase">Todo ({state.todoTasks.length})</span>
                    </div>
                    <div className="flex flex-col gap-4 overflow-auto p-4 h-[calc(100vh-300px)] kanban-board custom-scroll">
                      {(state.todoTasks || []).map((item, idx) => (
                        <Draggable
                          draggableId={item.id + ''}
                          index={idx}
                          key={item.id}
                        >
                          {(provided: any, snapshot: any) => (
                            <div
                              className="card p-4 cursor-pointer"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskItem task={item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Droppable droppableId='inprogressTasks'>
                {(provided: any, snapshot: any) => (
                  <div ref={provided.innerRef} className="flex flex-col flex-shrink-0 w-72 border rounded-md overflow-hidden border-gray-200 dark:border-gray-700">
                    <div className="flex items-center flex-shrink-0 h-10 p-4 bg-white dark:bg-slate-800">
                      <span className="block text-sm font-semibold uppercase">In progress ({state.inprogressTasks.length})</span>
                    </div>
                    <div className="flex flex-col gap-4 overflow-auto p-4 h-[calc(100vh-300px)] kanban-board custom-scroll">
                      {(state.inprogressTasks || []).map((item, idx) => (
                        <Draggable
                          draggableId={item.id + ''}
                          index={idx}
                          key={item.id}
                        >
                          {(provided: any, snapshot: any) => (
                            <div
                              className="card p-4 cursor-pointer"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskItem task={item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Droppable droppableId='reviewTasks'>
                {(provided: any, snapshot: any) => (
                  <div ref={provided.innerRef} className="flex flex-col flex-shrink-0 w-72 border rounded-md overflow-hidden border-gray-200 dark:border-gray-700">
                    <div className="flex items-center flex-shrink-0 h-10 p-4 bg-white dark:bg-slate-800">
                      <span className="block text-sm font-semibold uppercase">Review ({state.reviewTasks.length})</span>
                    </div>
                    <div className="flex flex-col gap-4 overflow-auto p-4 h-[calc(100vh-300px)] kanban-board custom-scroll">
                      {(state.reviewTasks || []).map((item, idx) => (
                        <Draggable
                          draggableId={item.id + ''}
                          index={idx}
                          key={item.id}
                        >
                          {(provided: any, snapshot: any) => (
                            <div
                              className="card p-4 cursor-pointer"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskItem task={item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Droppable droppableId='doneTasks'>
                {(provided: any, snapshot: any) => (
                  <div ref={provided.innerRef} className="flex flex-col flex-shrink-0 w-72 border rounded-md overflow-hidden border-gray-200 dark:border-gray-700">
                    <div className="flex items-center flex-shrink-0 h-10 p-4 bg-white dark:bg-slate-800">
                      <span className="block text-sm font-semibold uppercase">Done ({state.doneTasks.length})</span>
                    </div>
                    <div className="flex flex-col gap-4 overflow-auto p-4 h-[calc(100vh-300px)] kanban-board custom-scroll">
                      {(state.doneTasks || []).map((item, idx) => (
                        <Draggable
                          draggableId={item.id + ''}
                          index={idx}
                          key={item.id}
                        >
                          {(provided: any, snapshot: any) => (
                            <div
                              className="card p-4 cursor-pointer"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskItem task={item} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            </DragDropContext>

          </div>
        </div>
      </div>

      <ModalLayout
        showModal={newTaskModal}
        toggleModal={toggleNewTaskModal}
        panelClassName='min-w-[800px] card !overflow-visible'
      >
        <div className="flex justify-between items-center py-3 px-6 border-b dark:border-gray-700">
          <h3 className="font-medium text-gray-600 dark:text-white text-base">
            Create New Task
          </h3>
          <button
            className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200"
            type="button"
            onClick={toggleNewTaskModal}
          >
            <i className="mgc_close_line text-lg"></i>
          </button>
        </div>
        <div className="py-3 px-6 overflow-y-auto">
          <form onSubmit={handleSubmit(handleNewTask)}>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">

              <FormInput
                name='title'
                label='Title'
                placeholder='Enter Title'
                type='text'
                containerClass='space-y-1.5 mb-6 w-full'
                labelClassName='font-semibold text-gray-500'
                className='form-input'
                key='title'
                register={register}
                errors={errors}
                control={control}
              />

              <FormInput
                name='category'
                label='Categories'
                type='select'
                containerClass='space-y-1.5 mb-6 w-full'
                labelClassName='font-semibold text-gray-500'
                className='form-select'
                key='category'
                register={register}
                errors={errors}
                control={control}
                required
              >
                <option>Design</option>
                <option>Web</option>
                <option>Backend</option>
                <option>Product</option>
                <option>Checking</option>
                <option>Shopify</option>
                <option>Wordpress</option>
                <option>App</option>
                <option>Testing</option>
                <option>Q&A</option>
              </FormInput>

            </div>

            <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">

              <FormInput
                name='comments'
                label='Comments'
                placeholder='0'
                type='number'
                containerClass='space-y-1.5 mb-6 w-full'
                labelClassName='font-semibold text-gray-500'
                className='form-input'
                key='comments'
                register={register}
                errors={errors}
                control={control}
                required
              />

              <FormInput
                name='attachments'
                label='Attachments'
                placeholder='0'
                type='number'
                containerClass='space-y-1.5 mb-6 w-full'
                labelClassName='font-semibold text-gray-500'
                className='form-input'
                key='attachments'
                register={register}
                errors={errors}
                control={control}
                required
              />

              <FormInput
                name='priority'
                label='Priority'
                type='select'
                containerClass='space-y-1.5 mb-6 w-full'
                labelClassName='font-semibold text-gray-500'
                className='form-select'
                key='priority'
                register={register}
                errors={errors}
                control={control}
              >
                <option value='text-success bg-success/25'>Low</option>
                <option value="text-amber-500 bg-amber-500/25">Medium</option>
                <option value='text-danger bg-danger/25'>High</option>
              </FormInput>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">

              <FormInput
                name='assignTo'
                label='Assign To'
                type='select'
                containerClass='space-y-1.5 mb-6 w-full'
                labelClassName='font-semibold text-gray-500'
                className='form-select'
                key='assignTo'
                register={register}
                errors={errors}
                control={control}
              >
                {(assignees || []).map((assignee, idx) => (
                  <option key={idx} value={JSON.stringify(assignee)}>{assignee.title}</option>
                ))}
              </FormInput>

              <div className="space-y-1.5 mb-6 w-full">
                <label htmlFor="task-priority" className="form-label block">Due Date</label>
                <CustomDatepicker
                  hideAddon
                  dateFormat='yyyy-MM-dd'
                  value={newTaskDetails?.dueDate}
                  inputClass='form-input'
                  onChange={(date) => {
                    handleDateChange(date);
                  }}
                />
              </div>

            </div>
            <div className="flex justify-end items-center gap-2 p-2 border-t dark:border-slate-700">
              <button
                className="btn bg-light text-gray-800 transition-all"
                onClick={toggleNewTaskModal}
                type="button"
              >
                Close
              </button>
              <button
                type='submit'
                className="btn bg-primary text-white"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </ModalLayout >
    </>
  )
};

export default KanbanApp
