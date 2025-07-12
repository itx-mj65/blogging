export const Routeindex = "/";
export const RouteSignin = "/sign-in";
export const RouteSignup = "/sign-up";
export const RouteProfile = "/profile";
export const RouteCategorydetail = "/categories";
export const RouteAddcategory = "/category/add";
export const RouteEditcategory = (category_id) => {
    if (category_id) {
        return `/category/edit/${category_id}`
    } else {
        return `/category/edit/:category_id`
    }

}

export const RouteBlog = "/blog";
export const RouteBlogAdd = "/blog/add";
export const RouteEditblog = (blogid) => {
    if (blogid) {
        return `/blog/edit/${blogid}`
    } else {
        return `/blog/edit/:blogid`
    }

}


export const RouteBlogdetail = (category, blog) => {
    if (category && blog) {
        return `/blog/${category}/${blog}`
    } else {
        return `/blog/:category/:blog`
    }
}