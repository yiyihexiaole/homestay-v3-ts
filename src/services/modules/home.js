import hyRequest from "../request/index"
export function getHomeHotSuggests() {
    return hyRequest.get({
        url:"/home/hotSuggests"
    })
}

export function getHomeCategories(){
    return hyRequest.get({
        url:'/home/categories'
    })
}

export function getHomeHouseList(currentPage){
    return hyRequest.get({
        url:'/home/houseList',
        params:{
            page:currentPage
        }
    })
}