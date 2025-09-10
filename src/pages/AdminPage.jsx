import AdminComments from '../components/AdminComments';
import AdminEvents from '../components/AdminEvents';
import AdminUsers from '../components/AdminUsers';

export default function AdminPage() {
  return (
    <>
      <h1 className="text-center my-5">Admin Dashboard</h1>
      <div className="sm:w-11/12">
        <AdminEvents />
      </div>
      <div className="mt-10 sm:w-11/12">
        <AdminComments />
      </div>
      <div className="mt-10 sm:w-11/12">
        <AdminUsers />
      </div>
    </>
  );
}
