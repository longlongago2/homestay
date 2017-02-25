import request from '../utils/request';

export async function queryHomeStayInfoById(params) {
  const { id } = params;
  return request(`${api.mock_api}/homestay/${id}.do`, {
    method: 'GET'
  });
}

export async function queryHomeStayAlbumById(params) {
  const { id } = params;
  return request(`${api.mock_api}/homestay/${id}/album.do`, {
    method: 'GET',
  });
}

export async function queryHomeStayHouseById(params) {
  const { id } = params;
  return request(`${api.mock_api}/homestay/${id}/house.do`, {
    method: 'GET',
  });
}
