const AdminTopbar = () => {
  return (
    <header className="flex items-center justify-between bgDarkGray px-6 py-4 shadow-sm">
      <h1 className="text-xl text-primaryTextColor font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-primaryTextColor">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default AdminTopbar;
