const AdminStatCart = ({ title, value }) => {
  return (
    <div className="bgDarkGray rounded-xl shadow p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2 text-white">{value}</h2>
    </div>
  );
};

export default AdminStatCart;
