export const Footer = () => {
  return (
    <footer className="bg-green-500 text-white mt-4">
      {/* 1. grid-cols-1: Mặc định 1 cột (Mobile)
          2. md:grid-cols-3: Từ Tablet/Laptop chia 3 cột
          3. w-[90%]: Tăng độ rộng trên Mobile để không bị quá hẹp
      */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[90%] lg:w-[88%] mx-auto py-12">
        
        {/* Thông tin thương hiệu */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-2xl font-bold mb-4">Organic Food</h2>
          <p className="text-sm text-green-50 max-w-xs">
            Cung cấp thực phẩm sạch, an toàn và chất lượng cao đến từng gia đình.
          </p>
        </div>

        {/* Hỗ trợ */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
          <ul className="space-y-3 text-sm">
            <li className="cursor-pointer hover:text-green-200">Chính sách giao hàng</li>
            <li className="cursor-pointer hover:text-green-200">Đổi trả</li>
            <li className="cursor-pointer hover:text-green-200">Thanh toán</li>
            <li className="cursor-pointer hover:text-green-200">Liên hệ</li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
          <ul className="space-y-3 text-sm">
            <li>Địa chỉ: TP.HCM, Việt Nam</li>
            <li>
              Hotline: <a href="tel:0123456789" className="hover:underline">0123 456 789</a>
            </li>
            <li>
              Email: <a href="mailto:support@freshfood.vn" className="hover:underline">support@freshfood.vn</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};