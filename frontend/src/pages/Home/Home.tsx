import { Banner } from "../../components/Banner/Banner";
import { FourProduct } from "../../components/Top/FourProduct";
import { Latest } from "../../components/Top/Latest";

export const Home = () => {
  return (
    <div>
      <Banner />
      <h1 className="my-8 text-2xl text-center text-green-500 font-medium">
        Sản phẩm mới nhất
      </h1>
      <Latest />
      <h1 className="my-8 text-2xl text-center text-green-500 font-medium">
        Rau củ
      </h1>
      <FourProduct categorySlug="rau-cu" />
      <h1 className="my-8 text-2xl text-center text-green-500 font-medium">
        Thịt
      </h1>
      <FourProduct categorySlug="thit" />
    </div>
  );
};
