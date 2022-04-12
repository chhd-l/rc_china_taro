import { useEffect, useMemo, useState } from "react";
import { View, RichText } from "@tarojs/components";
import "./index.less";
import Mock from "mockjs";
import { ProductDetailProps, SkuItemProps } from "@/framework/types/products";
import { mockDetail } from "@/mock/product";
import ChooseSpec from "@/components/product/ChooseSpec";
import AddCart from "@/components/product/AddCart";
import Detail from "@/components/product/Detail";

const detailData = Mock.mock(mockDetail);
console.info("detailData", detailData);
const ProductDetail = () => {
  const [detailInfo, setDetailInfo] = useState<ProductDetailProps>(
    {} as ProductDetailProps
  );
  const [buyCount, setBuyCount] = useState<number>(1);
  const [showSpecs, setShowSpecs] = useState<boolean>(false);
  useEffect(() => {
    if (detailData?.skus?.length) {
      detailData.skus.forEach((sku) => {
        sku.img.push(...detailData.img);
      });
    }
    setDetailInfo(detailData);
  }, []);
  const choosedSku: SkuItemProps | ProductDetailProps = useMemo(() => {
    console.log("defaultChooseSku进行计算了", detailInfo);
    let data = detailInfo.skus?.length
      ? detailInfo.skus.find((sku) => sku.defaultChoose)
      : detailInfo; //如果没有sku,就存spu
    return data || ({} as SkuItemProps);
  }, [detailInfo]);
  console.info("choosedSku", choosedSku);
  const handleShowSpec = () => {
    setShowSpecs(true);
  };

  return (
    <>
      {detailInfo.id ? (
        <View className="product-detail">
          <Detail
            choosedSku={choosedSku}
            detailInfo={detailInfo}
            buyCount={buyCount}
            handleShowSpec={handleShowSpec}
          />
          <View>
            <RichText nodes={detailInfo.description} />
          </View>
          <ChooseSpec
            choosedSku={choosedSku}
            showSpecs={showSpecs}
            detailInfo={detailInfo}
            setShowSpecs={setShowSpecs}
            setBuyCount={setBuyCount}
            handleShowSpec={handleShowSpec}
            buyCount={buyCount}
            setDetailInfo={setDetailInfo}
          />
          <View className="h-12"></View>
          <AddCart handleShowSpec={handleShowSpec} />
        </View>
      ) : null}
    </>
  );
};

export default ProductDetail;
