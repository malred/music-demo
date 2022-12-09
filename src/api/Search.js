import request from '@/utils/request'
// 热门搜索(搜索栏下的关键词)
export const hotSearch=params=>request({
    url: '/search/hot',
    params
})
// 查询歌曲(搜索)
export const searchResultList=params=>request({
    url: '/cloudsearch',
    params
})
// 根据id获取歌曲详情
export const getMusicById=params=>request({
    method: 'get',
    url: '/song/detail',
    params
}) 
// 根据id获取歌曲url
export const getMusicUrlById=params=>request({
    method: 'get',
    url: '/song/url',
    params
}) 