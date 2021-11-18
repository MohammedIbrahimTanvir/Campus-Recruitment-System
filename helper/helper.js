import axios from "axios";
export const API_URL = "https://iiuc-campus-recuitement-system.herokuapp.com";
import { SetToken } from "../libs/setToken";

const SAVE_BLOG_API = async (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("blogPic", {
    uri: data.blogPic,
    type: "image/jpeg",
    name: "photo.jpg",
  });
  try {
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };
    const rawResponse = await fetch(`${API_URL}/blog/user`, requestOptions);
    console.log("Helper requestOptions", requestOptions);
    console.log("Helper ", rawResponse);
    const content = await rawResponse.json();
    console.log("Helper Content ", content);
    return content;
  } catch (error) {
    return error;
  }
};

// const GET_ALL_COMMENTS = aync ((token) => {
//
// })

const SAVE_ALUMNI_BLOG_API = async (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("blogPic", {
    uri: data.blogPic,
    type: "image/jpeg",
    name: "photo.jpg",
  });
  try {
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };
    const rawResponse = await fetch(`${API_URL}/blog/alumni`, requestOptions);
    console.log("Helper requestOptions", requestOptions);
    console.log("Helper ", rawResponse);
    const content = await rawResponse.json();
    console.log("Helper Content ", content);
    return content;
  } catch (error) {
    return error;
  }
};

const SAVE_CREATE_JOB_API = async (formdata, token) => {
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${token}`);

  // const formData = new FormData();
  // formData.append("title", data.title);
  // formData.append("description", data.description);
  try {
    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: data,
    //   redirect: "follow",
    // };
    SetToken(token);
    const createJob = await axios.post(
      "https://iiuc-campus-recuitement-system.herokuapp.com/job/jobPost",
      formdata
    );
    console.log("asdfasdf", createJob);
    // console.log("Helper requestOptions", requestOptions);
    // const content = await rawResponse.json();
    // console.log("Helper content ", content);
    // return content;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const SAVE_USER_PROFILE_PIC_API = async (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formData = new FormData();
  formData.append("profilePic", {
    uri: data.profilePic,
    type: "image/jpeg",
    name: "photo.jpg",
  });
  try {
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };
    const rawResponse = await fetch(
      `${API_URL}/profile/me/profilePic`,
      requestOptions
    );
    //  console.log("Helper rawResponse", rawResponse);
    const content = await rawResponse.json();
    // console.log("Helper profilePic ", content);
    return content;
  } catch (error) {
    return error;
  }
};

const SAVE_ALUMNI_PROFILE_PIC_API = async (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formData = new FormData();
  formData.append("profilePic", {
    uri: data.profilePic,
    type: "image/jpeg",
    name: "photo.jpg",
  });
  try {
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };
    const rawResponse = await fetch(
      `${API_URL}/profile/alumni/profile/me`,
      requestOptions
    );
    console.log("Helper rawResponse", rawResponse);
    const content = await rawResponse.json();
    console.log("Helper profilePic ", content);
    return content;
  } catch (error) {
    return error;
  }
};

const SAVE_COMPANY_PROFILE_PIC_API = async (data, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const formData = new FormData();
  formData.append("profilePic", {
    uri: data.profilePic,
    type: "image/jpeg",
    name: "photo.jpg",
  });
  try {
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formData,
      redirect: "follow",
    };
    const rawResponse = await fetch(
      `${API_URL}/profile/company/uploadProfilePic`,
      requestOptions
    );
    console.log("Helper rawResponse", rawResponse);
    const content = await rawResponse.json();
    console.log("Helper profilePic ", content);
    return content;
  } catch (error) {
    return error;
  }
};

const GET_ALL_USER_POSTS_API = async (token) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const rawResponse = await fetch(
      `${API_URL}/blog/user/all/user`,
      requestOptions
    );
    const content = await rawResponse.json();

    return content;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const GET_ALL_USER_POSTS_API_ALUMNI = async (token) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const rawResponse = await fetch(
      `${API_URL}/blog/user/all/alumni`,
      requestOptions
    );
    const content = await rawResponse.json();

    return content;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const COMMENT_BLOG_API = async (token, id, comment) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      comment: comment,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    };
    const rawResponse = await fetch(
      `${API_URL}/blog/user/${id}/usercomment`,
      requestOptions
    );
    const content = await rawResponse.json();

    return content;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const ALUMNI_COMMENT_BLOG_API = async (token, id, comment) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      comment: comment,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    };
    const rawResponse = await fetch(
      `${API_URL}/blog/Alumni/${id}/usercomment`,
      requestOptions
    );
    const content = await rawResponse.json();

    return content;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const COMMENT_IN_USER_BLOG_API = async (token, id, comment) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      comment: comment,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    };
    const rawResponse = await fetch(
      `${API_URL}/blog/user/${id}/Alumnicomment`,
      requestOptions
    );
    const content = await rawResponse.json();

    return content;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const COMMENT_IN_ALUMNI_BLOG_API = async (token, id, comment) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      comment: comment,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
      body: raw,
    };
    const rawResponse = await fetch(
      `${API_URL}/blog/Alumni/${id}/Alumnicomment`,
      requestOptions
    );
    const content = await rawResponse.json();

    return content;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const GET_ALL_ALUMNI_POSTS_API = async (token) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const rawResponse = await fetch(
      `${API_URL}/blog/alumni/all/user`,
      requestOptions
    );
    const content = await rawResponse.json();
    // console.log("Helper ", content);
    return content;
  } catch (error) {
    return error;
  }
};
const GET_ALL_ALUMNI_POSTS_API_ALUMNI = async (token) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const rawResponse = await fetch(
      `${API_URL}/blog/alumni/all/alumni`,
      requestOptions
    );
    const content = await rawResponse.json();
    // console.log("Helper ", content);
    return content;
  } catch (error) {
    return error;
  }
};
const GET_ALL_JOB_POSTS_API = async (token) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const rawResponse = await fetch(`${API_URL}/allJobs`, requestOptions);
    const content = await rawResponse.json();
    // console.log("Helper ", content);
    return content;
  } catch (error) {
    return error;
  }
};

const GET_MY_JOB_POSTS_API = async (token) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const rawResponse = await fetch(
      `${API_URL}/job/myJobsPost`,
      requestOptions
    );
    const content = await rawResponse.json();
    // console.log("Helper ", content);
    return content;
  } catch (error) {
    console.log("Helper Error", error);
    return error;
  }
};

const getStudentsBySkills = async (token, api_end_point, skills) => {
  // try {
  //   SetToken(token);
  //   const response = await axios.get(`${API_URL}${api_end_point}`);
  //   return response?.data;
  // } catch (error) {
  //   console.log(error);
  //   console.log(error?.response?.data);
  //   return error?.response?.data;
  // }

  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const rawResponse = await fetch(
      `${API_URL}/search/specificUser?skills[]=${skills}`,
      requestOptions
    );
    const content = await rawResponse.json();
    console.log("Helper ", content);
    return content;
  } catch (error) {
    console.log("Helper Error", error);
    return error;
  }
};

const getStudentsByName = async (token, api_end_point, name) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const rawResponse = await fetch(
      `${API_URL}${api_end_point}?search=${name}`,
      requestOptions
    );
    const content = await rawResponse.json();
    console.log("Helper ", content);
    return content;
  } catch (error) {
    console.log("Helper Error", error);
    return error;
  }
};

const appliedUsers = async (token, api_end_point) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const rawResponse = await fetch(
      `${API_URL}${api_end_point}`,
      requestOptions
    );
    const content = await rawResponse.json();
    console.log("Helper ", content);
    return content;
  } catch (error) {
    console.log("Helper Error", error);
    return error;
  }
};

const applyToJob = async (token, job_id) => {
  try {
    SetToken(token);
    const applyJob = await axios.post(`${API_URL}/job/user/${job_id}`);
    console.log(applyJob);
  } catch (error) {
    return error;
  }
};

const getCommentsById = async (token, api_end_point) => {
  try {
    SetToken(token);
    const comments = await axios.get(`${API_URL}${api_end_point}`);
    return comments;
  } catch (error) {
    return error;
  }
};

export {
  SAVE_BLOG_API,
  GET_ALL_USER_POSTS_API,
  GET_ALL_USER_POSTS_API_ALUMNI,
  GET_ALL_JOB_POSTS_API,
  GET_ALL_ALUMNI_POSTS_API,
  COMMENT_BLOG_API,
  SAVE_CREATE_JOB_API,
  GET_MY_JOB_POSTS_API,
  SAVE_USER_PROFILE_PIC_API,
  SAVE_COMPANY_PROFILE_PIC_API,
  SAVE_ALUMNI_PROFILE_PIC_API,
  SAVE_ALUMNI_BLOG_API,
  getStudentsBySkills,
  getStudentsByName,
  appliedUsers,
  applyToJob,
  getCommentsById,
  ALUMNI_COMMENT_BLOG_API,
  COMMENT_IN_USER_BLOG_API,
  GET_ALL_ALUMNI_POSTS_API_ALUMNI,
  COMMENT_IN_ALUMNI_BLOG_API,
};
