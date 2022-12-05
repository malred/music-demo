import request from '@/utils/request'
export const hotSearch=params=>request({
    url: '/search/hot',
    params
})
export const searchResultList=params=>request({
    url: '/cloudsearch',
    params
})