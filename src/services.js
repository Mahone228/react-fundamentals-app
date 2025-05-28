export const createUser = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.result || "Unable to register user");
    }

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status < 200 || response.status >= 300) {
      throw new Error(result?.result || "Invalid credentials");
    }

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
