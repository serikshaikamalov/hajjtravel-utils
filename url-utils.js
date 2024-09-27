/**
 * @document https://developer.mozilla.org/en-US/docs/Web/API/URL
 *
 * URL contructor
 *
 * All functions with dealing with URL
 * Main global objects:
 * window.history - чтобы работать с состоянием url
 * window.location - возвращает текущую информацию о странице
 *
 */

/**
  The URL interface is used to parse, construct, normalize, and encode URLs.
  
  const url = new URL(location.href)
  hash: ""
  host: "localhost:3000"
  hostname: "localhost"
  href: "http://localhost:3000/admin/users"
  origin: "http://localhost:3000"
  pathname: "/admin/users"
  port: "3000"
  protocol: "http"
  search: "?name=Ser"
  searchParams
*/

/**
 * Location interface
 */

/**
 * History interface
 */

/**
  URLSearchParams - used to work with the query string of a URL.
  
  const paramsString = "q=URLUtils.searchParams&topic=api";
  const searchParams = new URLSearchParams(paramsString);

  // Iterating the search parameters
  for (const p of searchParams) {
    console.log(p);
  }

  console.log(searchParams.has("topic")); // true
  console.log(searchParams.has("topic", "fish")); // false
  console.log(searchParams.get("topic") === "api"); // true
  console.log(searchParams.getAll("topic")); // ["api"]
  console.log(searchParams.get("foo") === null); // true
  console.log(searchParams.append("topic", "webdev"));
  console.log(searchParams.toString()); // "q=URLUtils.searchParams&topic=api&topic=webdev"
  console.log(searchParams.set("topic", "More webdev"));
  console.log(searchParams.toString()); // "q=URLUtils.searchParams&topic=More+webdev"
  console.log(searchParams.delete("topic"));
  console.log(searchParams.toString()); // "q=URLUtils.searchParams"


  // Search parameters can also be an object
  const paramsObj = { foo: "bar", baz: "bar" };
  const searchParams = new URLSearchParams(paramsObj);
*/

/**
 * URL patterns
  // A pattern matching with a named group
  const pattern = new URLPattern({ pathname: "/books/:id" });
  console.log(pattern.test("https://example.com/books/123")); // true
  console.log(pattern.exec("https://example.com/books/123").pathname.groups); // { id: '123' }
 */

/**
 * Remove empty params with null values
 * @example
 * {key: 1, name: null} => {key: 1}
 * @returns object
 */
export const cleanParams = (params) => {
  let queryParams = Object.entries(params).reduce((prev, [key, value]) => {
    if (value == null) return prev;

    return {
      ...prev,
      [key]: value,
    };
  }, {});

  return queryParams;
};

/**
 * params: {key: value, key2: value}
 * @returns `key=value&key2=value` json queryparams in string format
 */
export const toQueryParams = (params) => {
  // const queryParams = cleanParams(params);
  return new URLSearchParams(params);
};

/**
 * Обновляет url но не перезагружает страницу
 * replaceState() will change the URL in the browser (ie. pressing the back button won't take you back)
 * pushState() will change the URL, and keep the old one in the browser history (ie. pressing the back button will take you back)
 */
export function urlReplaceState(url, queryParams, isCurrentState = true) {
  const urlObject = new URL(url || window.location.href);
  console.log("urlReplaceState | url: ", urlObject);

  const qp = new URLSearchParams(queryParams);
  const fullUrl = urlObject.pathname + "?" + qp.toString()
  console.log('fullUrl: ', fullUrl);

  if (isCurrentState) {
    return window.history.replaceState(
      {},
      "",
      fullUrl
    );
  }

  return window.history.pushState({}, "", urlObject.pathname);
}

/**
 * Получаем params из url
 */
export function getUrlParams() {
  /**
   * Example:
      let params = new URL(document.location).searchParams;
      let name = params.get("name"); // is the string "Jonathan Smith".
      let age = parseInt(params.get("age")); // is the number 18
   */
  let params = new URL(document.location).searchParams;
  return params;
}

export function reloadPage() {
  return window.location.reload();
}

export function goBack(length = -1) {
  return window.history.go(length);
}
