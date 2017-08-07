import request from '../utils/request';

export async function queryChartScaleData(params) {
  const { date } = params;
  return request(`${api.mock_api}/operationlogcount/${date}.do`, {
    method: 'GET',
  });
}
