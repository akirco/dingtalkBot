create database dingTalkBot;
use dingTalkBot;
create table if not exists t_sender(
    id int auto_increment primary key ,
    secret mediumtext not null ,
    webhook mediumtext not null
)engine = InnoDB DEFAULT  CHARSET = utf8;

create table if not exists t_data(
    id int auto_increment primary key ,
    img1 mediumtext not null ,
    img2 mediumtext not null ,
    img3 mediumtext ,
    txt mediumtext not null
)engine = InnoDB DEFAULT  CHARSET = utf8;

insert into t_sender (id, secret, webhook)
values (1,
        "xxxxx",
        "xxxxx")

insert into t_data (id, img1, img2, img3, txt)
values (1,
        "https://s1.328888.xyz/2022/07/03/Ovfp.png",
        "https://s1.328888.xyz/2022/07/03/jN4F.png",
        "",
        "测试数据"
)