export const apiClient = async (url: string, option?: RequestInit) => {
  try {
    const res = await fetch(url, option);

    if (!res.ok) throw new Error("API Error");

    return res.json();
  } catch (err) {
    console.error("Error : ", err);
    throw new Error("Internal server error");
  }
};
