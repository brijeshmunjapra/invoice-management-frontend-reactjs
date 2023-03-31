import {
  FETCH_PROJECTS,
  FETCH_PROJECTS_SUCCESS,
  ADD_PROJECT,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  EDIT_PROJECT_DETAIL,
} from "../Actions/ProjectAction";
import axios from "axios";
import { call, all, takeEvery, put } from "redux-saga/effects";

function* addProject(projectToBeAdd) {
  const addedProject = yield axios
    .post("https://invoice-management-backend-brijesh.onrender.com/project", projectToBeAdd)
    .then(function (response) {
      console.log(response, "add project responce");
      return response;
    })
    .catch(function (error) {
      console.log(error.response, "add project responce");
      return error.response;
    });
  return addedProject;
}

function* getProjects() {
  const projectData = yield axios
    .get("https://invoice-management-backend-brijesh.onrender.com/project")
    .then((response) => {
      // console.log(response, "All projects");

      return response?.data;
    });

  yield put({
    type: FETCH_PROJECTS_SUCCESS,
    projectData,
  });
}

function* deleteProject(projectID) {
  const deletedProject = yield axios
    .delete(`http://localhost:8080/project/${projectID}`)
    .then(function (response) {
      // console.log(response, "Delete Project responce");
      return response;
    })
    .catch(function (error) {
      console.log(error.response);
      return error.response;
    });

  return deletedProject;
}

function* editProjectDetail(projectID, editedDetail) {
  const editedProject = yield axios
    .put(`http://localhost:8080/project/${projectID}`, editedDetail)
    .then(function (response) {
      console.log(response, "Edit Project responce");

      return response;
    })
    .catch(function (error) {
      console.log(error.response);
      return error.response;
    });

  return editedProject;
}

function* updateProject(payload) {
  const { projectID, editedDetail } = payload;
  yield call(editProjectDetail, projectID, editedDetail);
}

function* removeProject(payload) {
  const { projectID } = payload;
  const deletedProjectData = yield call(deleteProject, projectID);

  if (deletedProjectData?.status === 200) {
    yield put({
      type: DELETE_PROJECT_SUCCESS,
      deletedProjectData,
    });
  } else {
    yield put({
      type: DELETE_PROJECT_FAIL,
      deletedProjectData,
    });
  }
}

function* addProjectCall(payload) {
  const { projectToBeAdd } = payload;
  const addedProjectData = yield call(addProject, projectToBeAdd);

  if (addedProjectData?.status === 201) {
    yield put({
      type: ADD_PROJECT_SUCCESS,
      addedProjectData,
    });
  }

  if (addedProjectData?.status === 409) {
    yield put({
      type: ADD_PROJECT_FAIL,
      errProjectData: addedProjectData,
    });
  }
}

function* projectSaga() {
  yield all([
    takeEvery(FETCH_PROJECTS, getProjects),
    takeEvery(ADD_PROJECT, addProjectCall),
    takeEvery(DELETE_PROJECT, removeProject),
    takeEvery(EDIT_PROJECT_DETAIL, updateProject),
  ]);
}
export default projectSaga;
