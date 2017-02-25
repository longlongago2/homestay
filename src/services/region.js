import request from '../utils/request';

export async function queryRegionList(params) {
  return request(`${api.mock_api}/region.do`, {
    method: 'GET'
  });
}

export async function queryOneRegionDetailByRegionId(params) {
  const { regionId } = params;
  return request(`${api.mock_api}/region/${regionId}.do`, {
    method: 'GET',
  });
}

export async function queryHomeStayListByRegionId(params) {
  const { regionId } = params;
  return request(`${api.mock_api}/region/${regionId}/homestay.do`, {
    method: 'GET'
  });
}
