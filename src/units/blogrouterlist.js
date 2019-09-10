export var bloglist = [{
    path: '/index/:type',
    name: '首页',
    component: () =>
        import ('../views/MagIndex/blogindex.vue'),
    icon: "icon-manage_icon_home",
    icon2: "icon-manage_icon_home_select",
    meta: {
        title: '首页',
        path: '/index',
    }
}, {
    path: "/blog",
    name: '博文',
    component: () =>
        import ('../components/menuAside/router.vue'),
    icon: "icon-manage_icon_product",
    icon2: "icon-page_icon_products",
    children: [{
            path: 'myBlog',
            name: '我的博文',
            component: () =>
                import ('../views/BlogList/bloglist.vue')
        },
        {
            path: 'BlogCategories',
            name: '博文分类',
            component: () =>
                import ('../views/BlogClass/blogclss')
        }
    ]
}, {
    path: '/BlogInformation',
    name: '个人资料',
    component: () =>
        import ('../views/BlogInfo/bloginfo'),
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
    name: "网站编辑",
    icon: "icon-manage_icon_web",
    icon2: "icon-edit_icon_web1",
    path: "/WebsiteEditor",
    component: () =>
        import ('../views/WebsiteEditor/index.vue'),

}];