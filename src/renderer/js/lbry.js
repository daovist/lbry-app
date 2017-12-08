//@flow

const { ipcRenderer } = require("electron");
const daemonUrl = "http://localhost:5279";

function checkAndParse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    return response.json().then(json => {
      let error;
      if (json.error) {
        error = new Error(json.error);
      } else {
        error = new Error("Protocol error with unknown response signature");
      }
      return Promise.reject(error);
    });
  }
}

function apiCall(
  method: string,
  params: ?{},
  resolve: Function,
  reject: Function
) {
  const counter = parseInt(sessionStorage.getItem("JSONRPCCounter") || 0);
  const options = {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: method,
      params: params,
      id: counter,
    }),
  };

  sessionStorage.setItem("JSONRPCCounter", String(counter + 1));

  return fetch(daemonUrl, options)
    .then(checkAndParse)
    .then(response => {
      const error =
        response.error || (response.result && response.result.error);

      if (error) {
        return reject(error);
      } else {
        return resolve(response.result);
      }
    })
    .catch(reject);
}

export default new Proxy(
  {
    resolve: (
      params: { uri?: string, uris?: Array<string> } = {}
    ): Promise<{}> => {
      return new Promise((resolve, reject) => {
        apiCall(
          "resolve",
          params,
          (data: { [string]: {} }) => {
            if (typeof params.uri === "string") {
              // If only a single URI was requested, don't nest the results in an object
              resolve(data && data[params.uri] ? data[params.uri] : {});
            } else {
              resolve(data || {});
            }
          },
          reject
        );
      });
    },
    getAppVersionInfo: (): Promise<{}> => {
      return new Promise(resolve => {
        ipcRenderer.once("version-info-received", (event, versionInfo) => {
          resolve(versionInfo);
        });
        ipcRenderer.send("version-info-requested");
      });
    },
  },
  {
    get: function(target: {}, name: string) {
      if (name in target) {
        return target[name];
      }

      return (params: {} = {}) => {
        return new Promise((resolve, reject) => {
          apiCall(name, params, resolve, reject);
        });
      };
    },
  }
);
