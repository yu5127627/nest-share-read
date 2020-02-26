import { SendEmailDto } from './dto/send-email.dto';
import { createTransport } from 'nodemailer';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer/lib/smtp-connection';

@Injectable()
export class CommonService {
  sendEmail(sendEmailDto: SendEmailDto): Promise<SentMessageInfo> {
    const { email, content } = sendEmailDto;
    const transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.EMAIL_SECURE), //端口号为465时，值为true，其他为false
      auth: {
        user: '244115113@qq.com', //注册的163邮箱账号
        pass: process.env.EMAIL_PASSWORD //邮箱的授权码，不是注册时的密码,等你开启的stmp服务自然就会知道了
      }
    });

    let mailOptions = {
      from: process.env.EMAIL_USERNAME, // 发件人邮箱
      to: email, // 收件人地址，多个收件人可以使用逗号分隔
      subject: process.env.EMAIL_SUBJECT, // 邮件标题
      html: content // 邮件内容
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(
            new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                message: '发送失败，请稍后重试！'
              },
              400
            )
          );
        }
        resolve(info);
      });
    });
  }

  randomCode(): string {
    const CODELEN = 6;
    const randomArr = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ];
    var code = '';
    for (let i = 0; i < CODELEN; i++) {
      let index = Math.ceil(Math.random() * 35);
      code += randomArr[index];
    }
    return code;
  }
}
