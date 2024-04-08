import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import ManageOrdersClient from "./ManageOrdersClient";

const ManageOrders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="アクセスが制限されています" />;
  }

  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient />
      </Container>
    </div>
  );
};

export default ManageOrders;
