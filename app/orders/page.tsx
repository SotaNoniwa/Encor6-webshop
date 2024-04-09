import Container from "../components/Container";
import Heading from "../components/Heading";

const Orders = () => {
  return (
    <div className="pt-8">
      <Container>
        <Heading title="Your Orders" />
        <p>
          User can check their orders here. Actual order and payment transaction
          are out of range of my thesis. But I want to implemet this as well in
          the future...
        </p>
      </Container>
    </div>
  );
};

export default Orders;
