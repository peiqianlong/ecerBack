export var b2baddrouter = [{
        path: '/index/:type',
        name: '首页',
        component: () =>
            import ('../views/MagIndex/index.vue'),
        icon: "icon-manage_icon_home",
        icon2: "icon-manage_icon_home_select",
        meta: {
            title: '首页',
            path: '/index',
        }
    },
    {
        path: "/producr",
        name: '产品',
        component: () =>
            import ('../components/menuAside/router.vue'),
        icon: "icon-manage_icon_product",
        icon2: "icon-page_icon_products",
        children: [{
                path: 'myProduct',
                name: '我的产品',
                component: () =>
                    import ('../views/producr/myProduct.vue')
            },
            {
                path: 'productCategories',
                name: '产品分类',
                component: () =>
                    import ('../views/producr/productCategories.vue')
            }
        ]
    }, {
        path: '/CompanyInformation',
        name: '公司信息',
        component: () =>
            import ('../views/CompanyInformation/index.vue'),
        icon: "icon-manage_icon_company2",
        icon2: "icon-manage_icon_company_select1",
    }, {
        path: '/MediaLibrary',
        name: '媒体库',
        icon: "icon-manage_icon_media2",
        icon2: "icon-manage_icon_media_select2",
        component: () =>
            import ('../views/MediaLibrary/index.vue')
    }, {
        name: "资讯",
        icon: "icon-manage_icon_news4",
        icon2: "icon-manage_icon_news_select3",
        path: "/information",
        component: () =>
            import ('../components/menuAside/router.vue'),
        children: [{
                path: 'MyInformation',
                name: '我的资讯',
                component: () =>
                    import ('../views/information/MyInformation.vue')
            },
            {
                path: 'InformationClassification',
                name: '资讯分类',
                component: () =>
                    import ('../views/information/InformationClassification.vue')
            }
        ]
    }, {
        name: "网站编辑",
        icon: "icon-manage_icon_web",
        icon2: "icon-edit_icon_web1",
        path: "/WebsiteEditor",
        component: () =>
            import ('../views/WebsiteEditor/index.vue'),

    }
];