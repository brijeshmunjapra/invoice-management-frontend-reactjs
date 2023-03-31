export const FETCH_PROJECTS = "FETCH_PROJECTS";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_FAIL = "FETCH_PROJECTS_FAIL";

export const ADD_PROJECT = "ADD_PROJECT";
export const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";
export const ADD_PROJECT_FAIL = "ADD_PROJECT_FAIL";

export const DELETE_PROJECT = "DELETE_PROJECT";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAIL = "DELETE_PROJECT_FAIL";

export const EDIT_PROJECT_DETAIL = "EDIT_PROJECT_DETAIL";

export const getProjects = () => {
  return {
    type: FETCH_PROJECTS,
  };
};

export const addProject = (payload) => {
  return {
    type: ADD_PROJECT,
    projectToBeAdd: payload,
  };
};

export const deleteProject = (payload) => {
  return {
    type: DELETE_PROJECT,
    projectID: payload,
  };
};

export const editProjectDetail = (projectID, editedDetail) => {
  return {
    type: EDIT_PROJECT_DETAIL,
    projectID,
    editedDetail,
  };
};
