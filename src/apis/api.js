import {
    postRequest,
    getRequest,
    uploadFileRequest,
    putRequest,
    getdataRequest
} from "../units/request"

let $ = '/a'
if (process.env.NODE_ENV === 'development') {
    $ = '/a'
        // 编译环境
} else {
    // 测试环境
    if (process.env.type === 'test') {
        $ = ''
            // 正式环境
    } else {
        $ = ''
    }
}
//登陆http://www.site.maoyt.com/api/login/login
export function Login(data) {
    return postRequest($ + '/login/login', data)
}
export function LoginOut() {
    return postRequest($ + '/login/logout')
}
//登陆信息login/log
export function Logininfo() {
    return getRequest($ + '/login/log')
}

// 公司信息添加获取
export function CompanyInfo() {
    return getRequest($ + '/b2bcompany/addcompany')
}
// 获取城市列表
export function CityList(data) {
    return getRequest($ + '/b2bcompany/getcity&province_id=' + data)
}
//保存公司信息
export function SaveCompanyInfo(data) {
    return postRequest($ + '/b2bcompany/savecompany', data)
}
// 222222222222222222222222222222222222222222222222222222222222222222222222222222、产品
//获取产品列表
export function ProductList() {
    return getRequest($ + '/b2bproduct/listproduct')
}
// 查询
export function SearchProductList(data) {
    return postRequest($ + '/b2bproduct/listproduct', data)
}
//添加产品信息
export function AddProductInfo() {
    return getRequest($ + '/b2bproduct/addproduct')
}
//修改产品信息
export function ModifyProductInfo(id) {
    return getRequest($ + '/b2bproduct/addproduct&id=' + id)
}

//保存产品信息
export function SaveAddProductInfo(data) {
    return postRequest($ + '/b2bproduct/saveproduct', data)
}
export function SaveModifyProductInfo(data, id) {
    return postRequest($ + '/b2bproduct/saveproduct&id=' + id, data)
}
//产品删除
export function DelProductInfo(data) {
    return postRequest($ + '/b2bproduct/delproduct', data)
}

//产品上下架
export function UpProductInfo(data) {
    return postRequest($ + '/b2bproduct/onproduct', data)
}
export function downProductInfo(data) {
    return postRequest($ + '/b2bproduct/offproduct', data)
}

// 3333333333333333333333333333333333333333333333333333333333333333333333333333333、产品分类/
export function ProductListproDuctterm() {
    return getRequest($ + '/b2bproduct/listproductterm')
}
//add产品分类信息
export function AddProductListproDuctterm() {
    return getRequest($ + '/b2bproduct/addproductterm')
}
//修改产品分类信息
export function IdAddProductListproDuctterm(id) {
    return getRequest($ + '/b2bproduct/addproductterm&id=' + id)
}
//add产品分类信息保存
export function SaveAddProductListproDuctterm(data) {
    return postRequest($ + '/b2bproduct/saveproductterm', data)
}
export function SaveIdAddProductListproDuctterm(data, id) {
    return postRequest($ + '/b2bproduct/saveproductterm&id=' + id, data)
}
// 删除
export function DelProductTerm(data) {
    return postRequest($ + '/b2bproduct/delproductterm', data)
}
// 查询
export function SearchProductListDuctterm(data) {
    return postRequest($ + '/b2bproduct/listproductterm', data)
}
// 4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444、资讯
//获取
export function NewList() {
    return getRequest($ + '/b2bnews/listnews')
}
// 查询
export function SearchNewList(data) {
    return postRequest($ + '/b2bnews/listnews', data)
}
//添加
export function AddNews(data) {
    return getRequest($ + '/b2bnews/addnews', data)
}
//修改添加
export function AddModifyNews(id) {
    return getRequest($ + '/b2bnews/addnews&id=' + id)
}
//保存添加
export function SaveAddNews(data) {
    return postRequest($ + '/b2bnews/savenews', data)
}
//保存添加
export function SaveAddModifyNews(data, id) {
    return postRequest($ + '/b2bnews/savenews&id=' + id, data)
}
//删除
export function DelyNewsArr(data) {
    return postRequest($ + '/b2bnews/delnews', data)
}
//5 5555555555555555555555555555555555555555555555555555555555555555555555555资讯分类
export function ListNewsTerm() {
    return getRequest($ + '/b2bnews/listnewsterm')
}
// 查询
export function SearchNewListTerm(data) {
    return postRequest($ + '/b2bnews/listnewsterm', data)
}
//添加
export function AddNewsTerm(data) {
    return getRequest($ + '/b2bnews/addnewsterm', data)
}
//修改添加
export function AddModifyNewsTerm(id) {
    return getRequest($ + '/b2bnews/addnewsterm&id=' + id)
}
//保存添加
export function SaveAddNewsTerm(data) {
    return postRequest($ + '/b2bnews/savenewsterm', data)
}
//保存添加
export function SaveAddModifyNewsTerm(data, id) {
    return postRequest($ + '/b2bnews/savenewsterm&id=' + id, data)
}
//删除
export function DelyNewsArrTerm(data) {
    return postRequest($ + '/b2bnews/delnewsterm', data)
}
//媒体库
export function ListMediaFolder(data) {
    return getRequest($ + '/globalmedia/listmediafolder', data)
}
export function ListMedia(id) {
    return getRequest($ + '/globalmedia/listmedia&id=' + id)
}
//模板列表http://www.site.maoyt.com/api/global-site/theme-list
export function ThemeList(data) {
    return getRequest($ + '/global-site/theme-list', data)
}
//http://www.site.maoyt.com/api/global-site/theme-type
export function ThemeTypeList() {
    return getRequest($ + '/global-site/theme-type')
}
//http://www.site.maoyt.com/api/global-site/theme-industry
export function ThemeIndustryList() {
    return getRequest($ + '/global-site/theme-industry')
}



//编辑开始 -----------------------------------------------------------------------------------------------------------------------
//模板获取   
export function PageEdit(page) {
    return getRequest($ + '/tpl-edit/page-edit?t=' + page)
}
//预览
export function PreView(page) {
    return getRequest($ + '/tpl-preview/page-preview?t=' + page)
}
//模块
export function SecPreView(id, data) {
    return getdataRequest($ + '/tpl-edit/section-preview?section_id=' + id, data)
}
//模块
export function gloabTep(id, data) {
    return getdataRequest($ + '/tpl-edit/css-preview?section_id=' + id, data)
}
//字体
export function getFontFamily(id) {
    return getRequest($ + '/tpl-edit/font-family?query=' + id)
}
///caidan  http://www.site.maoyt.com/api/tpl-edit/menus
export function getMenu() {
    return getRequest($ + '/tpl-edit/menus')
}
//保存http://www.site.maoyt.com/api/tpl-edit/page-save
export function Save(data) {
    return getdataRequest($ + '/tpl-edit/page-save', data)
}
//页面获取接口
export function editpage(data) {
    return getdataRequest($ + '/tpl-edit/pages', data)
}
// 博客列表 http://www.site.maoyt.com/api/blogpost/listpost
export function BlogList(data) {
    return postRequest($ + '/blogpost/listpost', data)
}
//博客列表删除http://www.site.maoyt.com/api/blogpost/delpost
export function DelBlogList(data) {
    return postRequest($ + '/blogpost/delpost', data)
}
//分类列表s_post_term_namehttp://www.site.maoyt.com/api/blogpost/listpostterm
export function BlogListTerm(data) {
    return postRequest($ + '/blogpost/listpostterm', data)
}

//博客分类添加http://www.site.maoyt.com/api/blogpost/addpostterm
export function AddBlogListTermModify(id) {
    return getRequest($ + '/blogpost/addpostterm&id=' + id)
}
//博客分类添加http://www.site.maoyt.com/api/blogpost/addpostterm
export function AddBlogListTerm() {
    return getRequest($ + '/blogpost/addpostterm')
}
//博客分类添加保存http://www.site.maoyt.com/api/blogpost/savepostterm
export function BlogListTermModify(id, data) {
    return postRequest($ + '/blogpost/savepostterm&id=' + id, data)
}
export function sigBlogListTermModify(data) {
    return postRequest($ + '/blogpost/savepostterm', data)
}
//博客分类删除http://www.site.maoyt.com/api/blogpost/delpostterm
export function DelpostBlogList(data) {
    return postRequest($ + '/blogpost/delpostterm', data)
}
//博客信息添加http://www.site.maoyt.com/api/blogblogger/addblogger
export function AddBlogInfo() {
    return getRequest($ + '/blogblogger/addblogger')
}
//保存信息http://www.site.maoyt.com/api/blogblogger/saveblogger
export function SaveAddBlogInfo(data) {
    return postRequest($ + '/blogblogger/saveblogger', data)
}
//获取列表修改http://www.site.maoyt.com/api/blogpost/addpost
export function GetIDAddBlogList(id) {
    return postRequest($ + '/blogpost/addpost&id=' + id)
}
export function GetAddBlogList() {
    return postRequest($ + '/blogpost/addpost')
}
//获取列表修改http://www.site.maoyt.com/api/blogpost/onpost
export function upBlogList(data) {
    return postRequest($ + '/blogpost/onpost', data)
}
//http://www.site.maoyt.com/api/blogpost/offpost
export function downBlogList(data) {
    return postRequest($ + '/blogpost/offpost', data)
}
//保存列表修改http://www.site.maoyt.com/api/blogpost/savepost
export function SaveAddBlogList(data) {
    return postRequest($ + '/blogpost/savepost', data)
}
export function SaveIdAddBlogList(id, data) {
    return postRequest($ + '/blogpost/savepost&id=' + id, data)
}