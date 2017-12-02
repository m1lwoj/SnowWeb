import * as api from './apiActions';
import * as urlHelper from '../common/urlHelper';

class RouteApi {
  static getDataFilteringUrlQuery(paging, filter) {
    let query = '';
    let containsParameters = false;
    let containsFilter = false;
    if (paging && paging.page && paging.page !== '') {
      query += urlHelper.convertParameter('page', paging.page, containsParameters);
      containsParameters = true;
    }
    if (filter) {
      if (filter.text && filter.text !== '') {
        query += urlHelper.convertFilterParameter('name', filter.text, containsParameters, containsFilter);
        containsParameters = containsFilter = true;
      }
      if (filter.difficulty && filter.difficulty !== '') {
        query += urlHelper.convertFilterParameter('difficulty', filter.difficulty, containsParameters, containsFilter);
        containsParameters = containsFilter = true;
      }
      if (filter.userid && filter.userid !== '') {
        query += urlHelper.convertFilterParameter('userid', filter.userid, containsParameters, containsFilter);
        containsParameters = containsFilter = true;
      }
    }

    return query;
  }

  static getAllRoutes() {
    return new Promise((resolve, reject) => {
      fetch(api.URL + api.GET_ROUTES)
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(Object.assign([], responseJson.results));
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  static getRoutes(paging, filter) {
    return new Promise((resolve, reject) => {
      fetch(api.URL + api.GET_ROUTES + RouteApi.getDataFilteringUrlQuery(paging, filter))
        .then((response) => response.json())
        .then((responseJson) => {
          debugger;
          resolve(Object.assign([], responseJson.results));
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  static getRoute(id) {
    return new Promise((resolve, reject) => {
      fetch(api.URL + api.GET_ROUTES + '/' + id)
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(Object.assign({}, responseJson));
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  static getPoints() {
    return new Promise((resolve, reject) => {
      fetch(api.URL + api.GET_POINTS)
        .then((response) => response.json())
        .then((responseJson) => {
          resolve(Object.assign([], responseJson.results));
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
}

export default RouteApi;

