create database dingTalkBot;
use dingTalkBot;

create table if not exists users
(
    uid   int          not null auto_increment primary key,
    uname varchar(255) not null unique,
    pwd   varchar(255) not null
) engine = InnoDB
  DEFAULT CHARSET = utf8;

insert into users(uname, pwd)
VALUES ("aki", "aki");


create table if not exists bot
(
    botId       int          not null auto_increment primary key comment '机器人ID',
    uid         int          not null comment '用户ID',
    baseUrl     varchar(255) not null default 'https://oapi.dingtalk.com/robot/send',
    accessToken varchar(255) not null comment 'webhook地址',
    secret      varchar(255) not null comment '机器人密钥'
) engine = InnoDB
  DEFAULT CHARSET = utf8;



insert into bot(uid,accessToken, secret)
values (2, '"96795b7d4da817831fecacbb3cb9b41ca4135501342bf5e3abf68558f5fabc1f"','SEC08b40c1a4cffded730e594eabd5ef513c79a07fad104301c0ca7e1fc9a5961e3');

create table if not exists jobs
(
    id       int          not null auto_increment primary key comment 'job id',
    botId    int          not null comment '机器人id',
    img1     varchar(255) not null comment '图1',
    img2     varchar(255) not null comment '图2',
    img3     varchar(255) comment '图3',
    txt1     mediumtext   not null comment '文字1',
    txt2     mediumtext comment '文字2',
    created  datetime     not null DEFAULT current_timestamp comment '创建时间',
    updated  datetime     not null default current_timestamp on update current_timestamp comment '更新时间',
    complete int          not null default 0 comment '任务完成情况:【0】表示未完成，【1】表示已完成'
) engine = InnoDB
  DEFAULT CHARSET = utf8;

insert into jobs(botId, img1, img2, img3, txt1, txt2)
values (3,
        "https://s1.328888.xyz/2022/07/03/Ovfp.png",
        "https://s1.328888.xyz/2022/07/03/jN4F.png",
        "",
        "测试数据", "");

select uid
from users
where uname = 'aki';
select botId
from bot
where uid = 2;
# select * from jobs where botId = ()



