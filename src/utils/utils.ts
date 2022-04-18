import { PySortProps } from "@/framework/types/common";
import _ from "lodash";

export const getCurrencyCode = () => {
  return "￥";
};

export const formatMoney = (price: number) => {
  return getCurrencyCode() + price.toFixed(2);
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month =
    date.getMonth() <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth();
  const day = date.getDate();
  return year + "-" + month + "-" + day;
};

export const dealDatasForApi = (feData, apiKeies, feKies) => {
  //字段sort需要保持一致(只能处理简单对象字段)
  let apiData = {} as any;
  apiKeies.forEach((key, idx) => {
    apiData[key] = feData[feKies[idx]];
  });
  return apiData;
};

export const pickForUpdate = (data, primaryData) => {
  //data:传入的数据,primaryData：修改前接口获取的数据
  let updatedObj = _.pickBy(data, function (value, key) {
    console.info(value !== primaryData[key], value, primaryData[key]);
    return value !== primaryData[key];
  });
  updatedObj.id = primaryData.id; //id需要一直存在
  return updatedObj;
};

export const pySegSort = (arr) => {
  if (!String.prototype.localeCompare) return [];
  let letters = "abcdefghjklmnopqrstwxyz".split("");
  let zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split("");
  let segs: PySortProps[] = [];
  letters.map((item, i) => {
    let cur: PySortProps = { letter: item, data: [] };
    arr.map((el) => {
      let item = el.value;
      if (item.localeCompare(zh[i]) >= 0 && item.localeCompare(zh[i + 1]) < 0) {
        cur.data.push(el);
      }
    });
    if (cur.data.length) {
      cur.data.sort(function (a, b) {
        return a.value.localeCompare(b.value, "zh");
      });
      segs.push(cur);
    }
  });

  return segs;
};
