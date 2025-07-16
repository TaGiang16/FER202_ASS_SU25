import React, { useState, useEffect } from "react";
import axios from "axios";
import TopMenu from "../../components/TopMenu";
import MainHeader from "../../components/MainHeader";
import SubMenu from "../../components/SubMenu";
import Footer from "../../components/Footer";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userId = currentUser?.id;

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:9999/user/${userId}`)
      .then((res) => {
        setUser({
          ...res.data,
          birthday: res.data.birthday || { day: "", month: "", year: "" },
        });
        setAvatar(res.data.avatar || "");
      })
      .catch(() => setUser(null));
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý lưu thông tin
    alert("Profile saved!");
  };

  if (!user) {
    return (
      <div>
        <TopMenu />
        <MainHeader />
        <SubMenu />
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 mt-8 flex justify-center items-center">
          Đang tải thông tin hồ sơ...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <TopMenu />
      <MainHeader />
      <SubMenu />
      <div className="min-w-[1050px] max-w-[1300px] mx-auto my-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 border-r pr-6 mb-6 md:mb-0">
            <div className="flex flex-col items-center">
              <img
                src={avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <label className="mb-2 text-sm font-medium text-gray-700">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <span className="cursor-pointer px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                  Chọn Ảnh
                </span>
              </label>
              <div className="font-semibold mt-2">{user.fullname}</div>
              <div className="text-gray-500 text-sm">@{user.fullname}</div>
            </div>
            <ul className="mt-8 space-y-2 text-sm">
              <li className="font-semibold text-blue-600">Hồ Sơ</li>
              <li className="text-gray-600">Đơn Mua</li>
              <li className="text-gray-600">Địa Chỉ</li>
              <li className="text-gray-600">Đổi Mật Khẩu</li>
            </ul>
          </div>
          {/* Main content */}
          <form className="flex-1" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Hồ Sơ Của Tôi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  name="username"
                  value={user.fullname}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tên</label>
                <input
                  type="text"
                  name="name"
                  value={user.fullname}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  disabled
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Lưu
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}