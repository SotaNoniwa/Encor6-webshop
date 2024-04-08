import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "encor6 Admin",
  description: "encor6 Admin Dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
