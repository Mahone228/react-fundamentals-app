const BASE_URL = "http://localhost:4000";

export const getCourses = async () => {
  try {
    const res = await fetch(`${BASE_URL}/courses/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data?.result || "Failed to fetch courses";
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const getAuthors = async () => {
  try {
    const res = await fetch(`${BASE_URL}/authors/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data?.result || "Failed to fetch authors";
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (payload) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data?.result || "User registration failed";
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const login = async (credentials) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data?.result || "Invalid login credentials";
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const createCourse = async (course) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/courses/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(course),
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMsg = data?.result || "Unable to create course";
    throw new Error(errorMsg);
  }

  return data;
};

export const deleteCourse = async (id) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/courses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    const errorMsg = data?.result || "Unable to delete course";
    throw new Error(errorMsg);
  }
};

export const updateCourse = async (course) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/courses/${course.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(course),
  });

  const data = await res.json();

  if (!res.ok) {
    const errorMsg = data?.result || "Unable to update course";
    throw new Error(errorMsg);
  }

  return data;
};
