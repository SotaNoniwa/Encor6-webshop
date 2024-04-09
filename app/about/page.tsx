import Container from "../components/Container";
import Heading from "../components/Heading";
import AboutContent from "./AboutContent";

const About = () => {
  return (
    <div className="pt-8">
      <Container>
        <Heading title="About Page" center />
        <AboutContent />
      </Container>
    </div>
  );
};

export default About;
