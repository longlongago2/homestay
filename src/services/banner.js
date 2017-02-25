import request from '../utils/request';

export async function queryBannerList(params) {
  return request(`${api.mock_api}/banner.do`, {
    method: 'GET'
  });
}

export async function update(params) {
  // return request('/api/users', {
  //   method: 'put',
  //   body: params,
  // });
}
