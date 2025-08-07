import Container from "./components/Container";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
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
          <button className="bg-my-primary flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2">
            <img src="/plus-circle.png" alt="Plus" />
            New Task
          </button>
        </section>
      </Container>
    </div>
  );
};

export default App;
