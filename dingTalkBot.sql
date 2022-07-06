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
        "SECee8d7399f73e67a5049ef1ad3a910f69ffa2d60ab585b13177a53407cce7e361",
        "62a2dbc5777163e3685eb3c5b1374e88a517260f7543d162bb3712d4941b230f")

insert into t_data (id, img1, img2, img3, txt)
values (1,
        "https://s1.328888.xyz/2022/07/03/Ovfp.png",
        "https://s1.328888.xyz/2022/07/03/jN4F.png",
        "",
        "大家好，我们又见面了！❤️维生素C可以参与血压的调节，对心脏病、中风都有一定的预防作用，而且还能抗癌，如果缺乏维C会降低人的免疫力。想要补充足够多的维C，可以从蔬菜和水果中摄取。❤️维生素D，能够协同钙的利用，可以提高钙的利用率。其化学性质十分活跃，高温易分解，可以通过膳食补充剂和多晒太阳获取。❤️维生素E，不仅是抗氧化剂，能保护身体免受氧化损伤，还可以催生一种叫做生育酚的物质。生育酚是人生长发育，细胞分裂必需的营养物质，严重缺乏维生素E会导致不孕症。作为一种脂溶性维生素，它在植物中的含量较高，而油性比较大的植物，是获取维生素E的主要来源，所以我们可以通过葵花籽、芝麻、花生、核桃、橄榄油等物质来获取。"
)