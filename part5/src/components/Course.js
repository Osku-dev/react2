const Header = ({ name }) => {
  return (
    <div>
      <h1> {name} </h1>
    </div>
  );
};
const Content = ({ content }) => {
  const total = content.reduce((sum, p) => (sum += p.exercises), 0);
  return (
    <div>
      {content.map((part) => (
        <Part key={part.id} part={part} />
      ))}{" "}
      <br /> Total: {total}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {" "}
        {part.name} {part.exercises}{" "}
      </p>
    </div>
  );
};

const Course = ({ courses }) => {
  return courses.map((course) => (
    <div key={course.id}>
      <Header name={course.name} />
      <Content content={course.parts} />
    </div>
  ));
};

export default Course;
