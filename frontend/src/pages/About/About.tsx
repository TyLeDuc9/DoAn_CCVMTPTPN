import about from '../../assets/about.jpg'

export const About = () => {
  return (
    <div className="w-[80%] mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Về Organic Food</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Ảnh minh họa */}
        <div className="md:w-1/2">
          <img
            src={about}
            alt="Thực phẩm hữu cơ"
            className="w-full h-full object-cotaim rounded-md shadow"
          />
        </div>

        {/* Nội dung giới thiệu */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <p className="text-gray-700">
            Chào mừng bạn đến với <strong>Organic Food</strong> – nơi mang đến những thực phẩm sạch,
            an toàn và giàu dinh dưỡng cho gia đình bạn. Chúng tôi cam kết lựa chọn những sản phẩm
            hữu cơ chất lượng cao, được trồng và sản xuất theo tiêu chuẩn sinh thái, không hóa chất,
            không chất bảo quản.
          </p>
          <p className="text-gray-700">
            Tại Organic Food, chúng tôi tin rằng sức khỏe bắt nguồn từ thực phẩm. Mỗi sản phẩm đều
            được kiểm định nghiêm ngặt, đảm bảo giữ trọn hương vị tự nhiên và dưỡng chất quý giá.
            Hãy cùng chúng tôi xây dựng lối sống lành mạnh, bền vững và an toàn cho cả gia đình.
          </p>
          <p className="text-gray-700">
            Khám phá ngay bộ sưu tập thực phẩm hữu cơ đa dạng từ rau củ, trái cây, thịt, sữa đến các
            sản phẩm đóng gói tiện lợi. Organic Food – lựa chọn thông minh cho cuộc sống khỏe mạnh!
          </p>
        </div>
      </div>
    </div>
  );
};