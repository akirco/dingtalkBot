create database dingTalkBot;
use dingTalkBot;

create table if not exists user
(
    uid   int          not null auto_increment primary key comment 'uid',
    uname varchar(255) not null unique comment '用户名，唯一',
    pwd   varchar(255) not null comment '密码',
    isAdmin int not null default 0 comment '是否为管理员:【0】不是【1】是'
) engine = InnoDB
  DEFAULT CHARSET = utf8;

insert into user(uname, pwd,isAdmin)
VALUES ('admin','admin','1');

insert into user(uname, pwd,isAdmin)
VALUES ('aki','aki','0');


create table if not exists bot
(
    botId       int          not null auto_increment primary key comment '机器人ID',
    uid         int          not null comment '用户ID',
    baseUrl     varchar(255) not null default 'https://oapi.dingtalk.com/robot/send' comment 'webhook baseUrl',
    accessToken varchar(255) not null comment 'webhook accessToken',
    secret      varchar(255) not null comment '机器人密钥'
) engine = InnoDB
  DEFAULT CHARSET = utf8;

insert into bot(uid,accessToken, secret)
values (1, 'd49fd2eb77d0a96520a3ec6261b514f02cee6e61b06d9a49723338696683777e','SECeb8f227ee9c919d68d171cf2a3cb1949b26a971616dcbd4e687ca56317e96066');



insert into bot(uid,accessToken, secret)
values (2, '96795b7d4da817831fecacbb3cb9b41ca4135501342bf5e3abf68558f5fabc1f','SEC08b40c1a4cffded730e594eabd5ef513c79a07fad104301c0ca7e1fc9a5961e3');



create table if not exists jobs
(
    id       int          not null auto_increment primary key comment 'job id',
    uid      int          not null comment '用户id',
    botId    int          comment '机器人id',
    remark   varchar(255) not null comment '备注',
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

insert into jobs(uid, remark,img1, img2, img3, txt1, txt2)
values (1,'测试群1',
        'image-1659081780631.png',
        'image-1659081780633.png',
        '',
        '测试数据1', '测试数据2');
insert into jobs(botId, img1, img2, img3, txt1, txt2)

values (2,
        'https://s1.328888.xyz/2022/07/03/Ovfp.png',
        'https://s1.328888.xyz/2022/07/03/jN4F.png',
        '',
        '测试数据1', '测试数据2');

update jobs set complete=1 where complete=0;

select * from jobs where uid=? and complete=0;

update jobs set botId=? where jobs.id = 1;

###################################《数据操作》#########################################
# 级联查询
select * from bot,jobs where bot.botId=jobs.botId ;
select * from bot,jobs,user where bot.botId=jobs.botId and user.uid=bot.uid;

# bot
select botId,baseUrl,accessToken,secret from bot where uid = 1;

insert into bot (uid, accessToken, secret)
values (1,'','');

update bot set secret='dasdsdasdad', accessToken='d49fd2eb77d0a96520a3ec6261b514f02cee6e61b06d9a49723338696683777e' where botId=6;

delete from bot where bot.botId=9;

# user
select * from user where uid = 1;
insert into user(uname, pwd) values ( ?, ?);
update user set uname=?, pwd=? WHERE uid=1;
delete from user where uid=1;
select uid,pwd from user where uname = 'admin';

#jobs
select * from jobs where botId = 1;

insert into jobs(botId, img1, img2, img3, txt1, txt2)
values (?,?,?,?,?,?);
update jobs set img1=?, img2=?,img3=?,txt1=?,txt2=? WHERE botId=1;
delete from jobs where botId=1;

select * from bot,jobs where bot.botId=jobs.botId and jobs.complete=0;