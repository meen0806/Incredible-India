import { Create, fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "http://localhost:3000";

const httpClient = fetchUtils.fetchJson;

const dataProvider = {
 

  create: (resource, params) => {
    if (["locations", "categories", "places", "transport"].includes(resource)) {
      const formData = new FormData();
  
      if (!params.data.parent_id) {
        params.data.parent_id = null;
      }

      Object.keys(params.data).forEach((key) => {
        if (key === "pictures" && Array.isArray(params.data[key])) {
          params.data[key].forEach((file) => {
            if (file.rawFile) {
              formData.append("pictures", file.rawFile); 
            }
          });
        } else if (key === "picture" && params.data[key]?.rawFile) {
          formData.append("picture", params.data[key].rawFile); 
        } else {
          formData.append(key, params.data[key]);
        }
      });
  
      return fetch(`${apiUrl}/${resource}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => ({ data: { ...data, id: data._id } }));
    }
  
    return Promise.reject("Unknown resource!");
  },  

  getList: (resource, params) => {
    if (
      resource === "locations" ||
      resource === "categories" ||
      resource === "places" ||
      resource === "transport"
    ) {
      const { page, perPage, filter } = params;
      const query = {
        _page: page,
        _limit: perPage,
        ...filter,
      };

      const url = `${apiUrl}/${resource}?${stringify(query)}`;

      return httpClient(url).then(({ json }) => {
        const dataWithIds = json.map((item) => ({
          ...item,
          id: item._id,
        }));

        return {
          data: dataWithIds,
          total: dataWithIds.length,
        };
      });
    }

    return Promise.reject("Unknown resource!");
  },
  update: (resource, params) => {
    if (
      resource === "locations" ||
      resource === "categories" ||
      resource === "places" ||
      resource === "transport"
    ) {
      const url = `${apiUrl}/${resource}/${params.id}`;
      const formData = new FormData();
  
      Object.keys(params.data).forEach((key) => {
        if (key === "pictures" && Array.isArray(params.data[key])) {
         
          params.data[key].forEach((file) => {
            if (file.rawFile) {
              formData.append("pictures", file.rawFile); 
            }
          });
        } else if (key === "picture" && params.data.picture?.rawFile) {
        
          formData.append("picture", params.data.picture.rawFile); 
        } else if (key === "parent_id" && params.data[key] === null) {
          formData.append("parent_id", null); 
        } else if (key === "contact_info" || key === "opening_hours") {
         
          formData.append(key, JSON.stringify(params.data[key]));
        } else {
          formData.append(key, params.data[key]); 
        }
      });
  
      return fetch(url, {
        method: "PUT",
        body: formData, 
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to update ${resource}: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => ({
          data: { ...data, id: data._id }, 
        }))
        .catch((error) => {
          console.error("Update Error:", error); 
          throw error; 
        });
    }
  
    return Promise.reject("Unknown resource!");
  },
  getOne: (resource, params) => {
    if (
      resource === "locations" ||
      resource === "categories" ||
      resource === "places" ||
      resource === "transport"
    ) {
      console.log("Params in getOne:", params);

      const url = `${apiUrl}/${resource}/${params.id}`;

      return httpClient(url).then(({ json }) => ({
        data: {
          ...json,
          id: json._id || json.id,
        },
      }));
    }

    return Promise.reject("Unknown resource!");
  },

  getMany: (resource, params) => {
    console.log("Params in getOne:", params);
    if (["locations", "categories", "places", "transport"].includes(resource)) {
      const query = {
        id: params.ids,
      };

      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      return httpClient(url).then(({ json }) => {
        const dataWithIds = json.map((item) => ({
          ...item,
          id: item._id,
        }));

        return { data: dataWithIds };
      });
    }
    return Promise.reject("Unknown resource!");
  },

  delete: (resource, params) => {
    if (
      resource === "locations" ||
      resource === "categories" ||
      resource === "places" ||
      resource === "transport"
    ) {
      const url = `${apiUrl}/${resource}/${params.id}`;
      return httpClient(url, {
        method: "DELETE",
      }).then(({ json }) => ({
        data: json,
      }));
    }

    return Promise.reject("Unknown resource!");
  },

  getManyReference: (resource, params) => {
    if (["locations", "categories", "places", "transport"].includes(resource)) {
      const { target, id, pagination } = params;
      const query = {
        [target]: id,
        _page: pagination.page,
        _limit: pagination.perPage,
      };

      const url = `${apiUrl}/${resource}?${stringify(query)}`;
      return httpClient(url).then(({ json }) => ({
        data: json.map((item) => ({ ...item, id: item._id })),
        total: json.length,
      }));
    }
    return Promise.reject("Unknown resource!");
  },

  deleteMany: (resource, params) => {
    if (["locations", "categories", "places", "transport"].includes(resource)) {
      const url = `${apiUrl}/${resource}`;
  
      return httpClient(url, {
        method: "DELETE",
      
        body: JSON.stringify({ ids: params.ids }), // Send the array of ids
      }).then(({ json }) => ({
        data: json.ids || params.ids,  // Return the ids of the deleted items
      }));
    }
  
    return Promise.reject("Unknown resource!");
  },

  };
export default dataProvider;
