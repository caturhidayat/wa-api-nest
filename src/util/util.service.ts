import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UtilService {
  constructor(private prismaService: PrismaService) {}

  async compareDate() {
    const users = await this.prismaService.user.findMany({});
    const currentDate = new Date();

    const userDate = await users.map((user) => {
      // const monthUser = user.birthDate.getMonth();
      // const dayUser = user.birthDate.getDate();
      // console.log(`User: ${user.firstName}, Date: ${monthUser}-${dayUser}`);
      // monthUser === currentDate.getMonth() && dayUser === currentDate.getDate();
      return user;
    });

    function compare(data) {
      const bulan = data.birthDate.getMonth() + 1;
      const tanggal = data.birthDate.getDate();
      if (
        bulan === currentDate.getMonth() + 1 &&
        tanggal === currentDate.getDate()
      ) {
        // console.log('match');
        // console.log(
        //   `${data.birthDate.getMonth() + 1}-${data.birthDate.getDate()}`,
        // );
        // return {
        //   name: data.firstName,
        //   birth: `${currentDate.getFullYear()}-${
        //     data.birthDate.getMonth() + 1
        //   }-${data.birthDate.getDate()}`,
        // };
        console.table(data);
        return data;
      }
    }

    const userBirthday = userDate.filter(compare);

    // if(userDate.getMonth()+1 === currentDate.getMonth() && )

    // const monthUser = userDate.toString();
    //   const dayUser = user.birthDate.getDate();
    //   if (
    //     monthUser === currentDate.getMonth() &&
    //     dayUser === currentDate.getDate()
    //   ) {
    //     console.log(`User: ${user.firstName}, Date: ${monthUser}-${dayUser}`);
    //     return `${monthUser}-${dayUser}`;
    //   } else {
    //     console.log(dayUser);
    //     return `Month & Day not the same`;
    //   }
    // console.log(users);
    // console.log(userDate[2]);
    // console.log(currentDate.getMonth());
    // return userDate[2];
    // return userDate.toString();
    return userBirthday;
  }
}
