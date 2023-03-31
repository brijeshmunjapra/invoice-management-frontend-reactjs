import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAIL,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  ADD_PROJECT,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
} from "../Actions/ProjectAction.js";

const initialState = {
  projectList: {
    data: null,
    error: null,
    status: "idle",
    isLoading: false,
  },
  deleteProject: {
    data: null,
    error: null,
    status: "idle",
    isLoading: false,
  },
  addProject: {
    data: null,
    error: null,
    status: "idle",
    isLoading: false,
  },
};

const ProjectReducer = (state = initialState, action) => {
  // console.log(action?.addedProjectData, "action in reducer");
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        ...state,
        projectList: {
          error: null,
          data: [],
          status: "loading",
          isLoading: true,
        },
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projectList: {
          error: null,
          data: action?.projectData,
          status: "success",
          isLoading: false,
        },
      };
    case FETCH_PROJECTS_FAIL:
      return {
        ...state,
        projectList: {
          error: action?.projectData,
          data: [],
          status: "fail",
          isLoading: false,
        },
      };
    case DELETE_PROJECT:
      return {
        ...state,
        deleteProject: {
          error: null,
          data: [],
          status: "loading",
          isLoading: true,
        },
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        deleteProject: {
          error: null,
          data: action?.deletedProjectData,
          status: "success",
          isLoading: false,
        },
      };
    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        deleteProject: {
          error: action?.deletedProjectData,
          data: [],
          status: "fail",
          isLoading: false,
        },
      };

    case ADD_PROJECT:
      return {
        ...state,
        addProject: {
          error: null,
          data: [],
          status: "loading",
          isLoading: true,
        },
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        addProject: {
          error: null,
          data: action?.addedProjectData,
          status: "success",
          isLoading: false,
        },
      };
    case ADD_PROJECT_FAIL:
      return {
        ...state,
        addProject: {
          error: action?.errProjectData,
          data: null,
          status: "fail",
          isLoading: false,
        },
      };

    default:
      return state;
  }
};

export default ProjectReducer;
