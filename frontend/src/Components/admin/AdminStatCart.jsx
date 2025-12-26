const AdminStatCart = ({ title, value, icon }) => {
  return (
    <div className="bg-background-card rounded-xl shadow-lg p-4 sm:p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
      <div className="text-4xl">{icon}</div>
      <div className="flex-1">
        <p className="text-text-secondary text-sm sm:text-base">{title}</p>
        <h2 className="text-xl sm:text-2xl font-bold mt-1 text-text-primary">
          {value}
        </h2>
      </div>
    </div>
  );
};
export default AdminStatCart;
