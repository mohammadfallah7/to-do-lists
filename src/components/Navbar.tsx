import avatar from "../assets/avatar.png";
import Container from "./Container";

const Navbar = () => {
  return (
    <header className="bg-header-bg py-4">
      <Container className="flex items-center justify-between">
        <a href="/" className="font-bodoni text-2xl font-bold">
          To Do List
        </a>
        <img src={avatar} alt="Avatar" />
      </Container>
    </header>
  );
};

export default Navbar;
