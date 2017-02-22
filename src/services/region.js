import request from '../utils/request';

export async function queryRegionList(params) {
  return request(`${api.mock_api}/homestay/region.do`, {
    method: 'GET'
  });
}

export async function queryOneRegionDetailByRegionId(params) {
  const { regionId } = params;
  return request(`${api.mock_api}/homestay/region/${regionId}.do`, {
    method: 'GET',
  });
}
