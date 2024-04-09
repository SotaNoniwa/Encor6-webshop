import getProducts from "@/actions/getProducts";
import Summary from "./Summary";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";

const Admin = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="アクセスが制限されています" />;
  }

  const products = await getProducts({ category: null });
  const users = await getUsers();

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} users={users} />
      </Container>
    </div>
  );
};

export default Admin;
