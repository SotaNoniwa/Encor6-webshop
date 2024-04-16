import Container from "../components/Container";
import Heading from "../components/Heading";
import PaymentDetails from "./PaymentDetails";

const Orders = () => {
  return (
    <div className="pt-8">
      <Container>
        <Heading title="Payment" />
        <PaymentDetails />
      </Container>
    </div>
  );
};

export default Orders;
