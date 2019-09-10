// 不带children
const siglist = [{
        title: "我的产品",
        icon: "icon-Personal-product",
        href: "/email1-4",
    },
    {
        title: "产品分类",
        icon: "icon-chanpinfenlei-xuanzhong",
        href: "/index1-6",
    },
    {
        title: "优惠活动",
        icon: "icon-youhuihuodong",
        href: "/email1-1",
    },
    {
        title: "公司信息",
        icon: "icon-gongsixinxi",
        href: "/email1-2",
    },
    {
        title: "新闻资讯",
        icon: "icon-xiaoxi",
        href: "/email1-3",
    }
]

// 带有children
const list = [{
        title: "仪表盘",
        icon: "icon-yibiaopan",
        children: [{
                title: "仪表盘",
                href: "/index1-1",
                hidden: true
            }, {
                title: "仪表盘",
                href: "/index1-2",
                hidden: true
            },
            {
                title: "仪表盘",
                href: "/index1-3",
                hidden: true
            }
        ]
    },
    {
        title: "询盘记录",
        icon: "icon-jilu",
        children: [{
            title: "询盘",
            href: "/index1-4",
            hidden: true
        }, {
            title: "询盘",
            href: "/index1-5",
            hidden: true
        }],
    }
]


export {
    siglist,
    list
}