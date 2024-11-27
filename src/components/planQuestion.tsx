// react tempalte

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from './ui/card';
const PlanQuestion: React.FC = () => {
  return (
    <div className="text-main mt-16 flex w-full flex-col justify-center">
      <div className="text-center text-3xl">常见问题</div>
      <Card className="mx-auto my-8 mb-16  flex   min-w-[50%]   space-y-2  shadow ">
        <CardHeader className="space-y-3">
          <CardTitle className="text-main">
            已有使用中的套餐，还能购买新套餐嘛？
          </CardTitle>
          <CardDescription className="mt-8">
            可以，购买新套餐后：
            <br />
            1. 流量余额 = 新套餐流量 +旧套餐流量余额
            <br />
            2. 过期日期 = 新套餐过期日期
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

      {/* <div className="my-8 mb-16 flex    w-full   justify-center">
        <div className="flex w-1/2 flex-col justify-center">
          <div className="text-xl">
            1.、 已有使用中的套餐，还能购买新套餐嘛？
          </div>
          <div className="mt-4">
            可以，购买新套餐后，流量余额 = 新套餐流量 +
            旧套餐流量余额，日期更新为新套餐日期
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default PlanQuestion;
