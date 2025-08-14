import type { AxiosResponse } from "axios";
import { LucideCheck, LucideLoader2, LucideTrash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import { axiosInstance } from "./lib/utils";
import type { TaskModel, TaskPayload } from "./types/task.model";

const App = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  // Mount, Unmount
  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    axiosInstance
      .get<TaskModel[]>("/todo-lists", { signal: controller.signal })
      .then((res) => {
        setTasks(res.data);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const createTask = () => {
    if (task) {
      setIsCreatingTask(true);

      axiosInstance
        .post<TaskPayload, AxiosResponse<TaskModel>>(
          "/todo-lists",
          { task },
          { headers: { "Content-Type": "application/json" } },
        )
        .then((res) => {
          setTasks([res.data, ...tasks]);
          setTask("");
          toggleModal();
          setIsCreatingTask(false);
          toast.success("Task created successfully!");
        })
        .catch((error) => {
          console.error(error);
          setIsCreatingTask(false);
          toast.error("Oops, something went wrong!");
        });
    }
  };

  const completeTask = (id: number) => {
    const initialState = [...tasks];

    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, isDone: true } : task)),
    );

    axiosInstance
      .patch(
        `/todo-lists/${id}`,
        { isDone: true },
        { headers: { "Content-Type": "application/json" } },
      )
      .then((res) => {
        setTasks(tasks.map((task) => (task.id === id ? res.data : task)));
      })
      .catch((error) => {
        setTasks(initialState);
        toast.error("Oops, something went wrong!");
        console.log(error);
      });
  };

  const deleteTask = (id: number) => {
    const initialState = [...tasks];

    setTasks(tasks.filter((task) => task.id !== id));

    axiosInstance.delete(`/todo-lists/${id}`).catch((error) => {
      setTasks(initialState);
      toast.error("Oops, something went wrong!");
      console.error(error);
    });
  };

  return (
    <div className="bg-background text-foreground relative min-h-screen">
      <Navbar />
      <Container>
        <section className="mt-8 mb-5 flex items-center justify-between">
          <div className="flex gap-3">
            <div className="bg-my-primary cursor-pointer rounded-lg px-3 py-1">
              All
            </div>
            <div className="cursor-pointer rounded-lg px-3 py-1">Today</div>
            <div className="cursor-pointer rounded-lg px-3 py-1">Completed</div>
          </div>
          <button
            onClick={toggleModal}
            className="btn btn-primary flex cursor-pointer items-center gap-2"
          >
            <img src="/plus-circle.png" alt="Plus" />
            New Task
          </button>
        </section>
        <section className="space-y-5">
          {isLoading && (
            <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center gap-5">
              <LucideLoader2 className="animate-spin" />
              <p className="">Tasks are loading...</p>
            </div>
          )}
          {tasks.map((task) => (
            <div
              className="bg-overlay border-muted flex items-center justify-between gap-2 rounded-lg border p-3"
              key={task.id}
            >
              <div className="flex items-center gap-5">
                <div
                  className={`flex size-4 items-center justify-center rounded ${task.isDone ? "bg-my-primary" : "border-muted border-2"}`}
                  onClick={() => completeTask(task.id)}
                >
                  {task.isDone && <LucideCheck className="size-3" />}
                </div>
                <p className={`${task.isDone && "line-through"}`}>
                  {task.task}
                </p>
              </div>
              <LucideTrash2
                onClick={() => deleteTask(task.id)}
                className="size-5"
              />
            </div>
          ))}
        </section>
      </Container>
      {showModal && (
        <div
          onClick={toggleModal}
          className="absolute inset-0 z-50 justify-center bg-[#26262636]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="border-muted bg-background absolute top-[20%] left-1/2 flex w-full max-w-md -translate-x-1/2 flex-col gap-4 rounded-lg border p-5 md:max-w-lg lg:max-w-xl"
          >
            <h2 className="text-lg font-bold">New Task</h2>
            <textarea
              placeholder="Write your task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="bg-overlay border-muted w-full resize-none rounded-lg border px-2 py-1 focus:outline-0"
            ></textarea>
            <div className="flex items-center gap-3 self-end">
              <button className="btn btn-outline" onClick={toggleModal}>
                Cancel
              </button>
              <button
                disabled={isCreatingTask}
                onClick={createTask}
                className="btn btn-primary disabled:bg-[#16a08469]"
              >
                {isCreatingTask ? (
                  <LucideLoader2 className="size-5 animate-spin" />
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
