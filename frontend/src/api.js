import Axios from 'axios';
import { apiUrl } from './config';
import { getUserInfo } from './localStorage';

export const getProducts = async () => {
  try {
    const res = await Axios({
      url: `${apiUrl}/api/products/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.statusText !== 'OK') {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (err) {
    console.log(err);

    return { error: err.response.data.message || err.message };
  }
};

export const getProduct = async (id) => {
  try {
    const res = await Axios({
      url: `${apiUrl}/api/products/${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.statusText !== 'OK') {
      throw new Error(res.data.message);
    }

    return res.data;
  } catch (err) {
    console.log(err);

    return { error: err.response.data.message || err.message };
  }
};

export const signin = async ({ email, password }) => {
  try {
    const res = await Axios({
      url: `${apiUrl}/api/users/signin`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email,
        password,
      },
    });

    if (res.statusText !== 'OK') throw new Error(res.data.message);

    return res.data;
  } catch (err) {
    console.log(err);

    return { error: err.response.data.message || err.message };
  }
};

export const register = async ({ name, email, password }) => {
  try {
    const res = await Axios({
      url: `${apiUrl}/api/users/register`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name,
        email,
        password,
      },
    });

    if (res.statusText !== 'OK') throw new Error(res.data.message);

    return res.data;
  } catch (err) {
    console.log(err);

    return { error: err.response.data.message || err.message };
  }
};

export const update = async ({ name, email, password }) => {
  try {
    const { _id, token } = getUserInfo();

    const res = await Axios({
      url: `${apiUrl}/api/users/${_id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        email,
        password,
      },
    });

    if (res.statusText !== 'OK') throw new Error(res.data.message);

    return res.data;
  } catch (err) {
    console.log(err);

    return { error: err.response.data.message || err.message };
  }
};

export const createOrder = async (order) => {
  try {
    const { token } = getUserInfo();
    const res = await Axios({
      method: 'POST',
      url: `${apiUrl}/api/orders`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: order,
    });

    if (res.statusText !== 'Created') throw new Error(res.data.message);

    return res.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};

export const getOrder = async (id) => {
  try {
    const { token } = getUserInfo();

    const response = await Axios({
      url: `${apiUrl}/api/orders/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusText !== 'OK') throw new Error(response.data.message);

    return response.data;
  } catch (err) {
    return { error: err.message };
  }
};

export const getMyOrders = async () => {
  try {
    const { token } = getUserInfo();

    const res = await Axios({
      url: `${apiUrl}/api/orders/mine`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.statusText !== 'OK') throw new Error(res.data.message);

    return res.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};

export const getPaypalClientId = async () => {
  const response = await Axios({
    url: `${apiUrl}/api/paypal/clientid`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.statusText !== 'OK') {
    throw new Error(response.data.message);
  }
  return response.data.clientId;
};

export const payOrder = async (orderId, paymentResult) => {
  try {
    console.log(paymentResult);
    const { token } = getUserInfo();

    const response = await Axios({
      url: `${apiUrl}/api/orders/${orderId}/pay`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: paymentResult,
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const { token } = getUserInfo();
    const response = await Axios({
      url: `${apiUrl}/api/orders/${orderId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const getOrders = async () => {
  try {
    const { token } = getUserInfo();
    const response = await Axios({
      url: `${apiUrl}/api/orders`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: err.response.data.message || err.message };
  }
};

export const deliverOrder = async (orderId) => {
  try {
    const { token } = getUserInfo();
    const response = await Axios({
      url: `${apiUrl}/api/orders/${orderId}/deliver`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.statusText !== 'OK') throw new Error(response.data.message);

    return response.data;
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};

export const getSummary = async () => {
  try {
    const { token } = getUserInfo();
    const response = await Axios({
      url: `${apiUrl}/api/orders/summary`,
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    } else {
      return response.data;
    }
  } catch (err) {
    return { error: err.response ? err.response.data.message : err.message };
  }
};

export const uploadProductImage = async (formData) => {
  try {
    const { token } = getUserInfo();
    const response = await Axios({
      url: `${apiUrl}/api/uploads`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });
    if (response.statusText !== 'Created') {
      throw new Error(response.data.message);
    } else {
      return response.data;
    }
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};

export const updateProduct = async (product) => {
  try {
    const { token } = getUserInfo();
    const response = await Axios({
      url: `${apiUrl}/api/products/${product._id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: product,
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};
