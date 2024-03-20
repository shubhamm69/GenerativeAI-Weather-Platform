import axios from "axios";


export const getData = async () => {
  try {
    const ip = process.env.NEXT_PUBLIC_IP;
    const endpoint = `http://${ip}/esp`;

    const res = await axios.get(endpoint);
    const data = res.data;

    return data;
  } catch (error) {
    console.log("[ESP_ERROR]", error);
    return null;
  }
};
