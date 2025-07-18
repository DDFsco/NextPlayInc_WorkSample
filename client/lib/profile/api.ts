import axios, { AxiosError } from "axios";
import { TransactionData, DepositMethodData } from './types';
import { PROTOCOL, SERVER_IP, SERVER_PORT } from "../global_var"


export async function getTransactionHistoryData(): Promise<TransactionData[]> {
  try {
    const response = await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/financial_center/transactionHistory`);

    const transactionHistoryJSON = response.data;
    console.log("Transaction History JSON Response:", transactionHistoryJSON);

    if (!transactionHistoryJSON || !transactionHistoryJSON.data) {
      throw new Error("Invalid response structure");
    }

    const transactionHistory: TransactionData[] = transactionHistoryJSON.data.map((item: any) => {
      return new TransactionData(
        item.id,
        new Date(item.date),
        item.product,
        item.category,
        item.currency,
        item.user_id,
        item.amount,
        item.description
      );
    });

    return transactionHistory;
  } catch (error) {
    console.log("Error in getTransactionHistoryData:", error);
    return [];
  }
}


export async function setDepositMethodData(depositMethodData: DepositMethodData[]): Promise<Boolean> {
  try {
    await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/financial_center/depositMethods`, depositMethodData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}




export async function getDepositMethodData(): Promise<DepositMethodData[]> {
  try {
    const response = await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/financial_center/depositMethods`);
    const depositMethodJSON = response.data;
    console.log(depositMethodJSON);

    const depositHistory: DepositMethodData[] = [];
    Object.keys(depositMethodJSON.data).forEach((key) => {
      const deposit = depositMethodJSON.data[key];
      depositHistory.push(new DepositMethodData(deposit.user_id, deposit.method_name, deposit.is_enabled));
    });
    return depositHistory;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export class BalanceOperationResponse {
  balance: number;

  constructor(balance: number) {
    this.balance = balance
  }
}

export async function getBalance(userId: string): Promise<number> {
  try {
    const response = await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/payment/check-balance/${userId}`);

    const balanceJSON = response.data;
    console.log(balanceJSON);

    if (!balanceJSON || !balanceJSON.data || typeof balanceJSON.data.balance !== 'string') {
      throw new Error("Invalid response structure");
    }

    const balanceString = balanceJSON.data.balance;
    const balance = parseFloat(balanceString);

    if (isNaN(balance)) {
      throw new Error("Invalid balance received from server");
    }

    console.log("Parsed Balance:", balance);
    return balance;
  } catch (error) {
    console.log("Error in getBalance:", error);
    return NaN;
  }
}


export async function subtractUserBalance(userId: string, amount: number) {
  try {
    const response = await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/payment/subtract-balance`, { userId, amount });

    if (response.status !== 200) {
      const errorData = response.data;
      console.error('Error subtracting balance:', errorData);
      return null;
    }

    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error during API call:', error);
    return null;
  }
}

export async function getUserInfo(token?: string) {
  if (token) {
    return await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/getUserinfo`, { headers: { "Authorization": `Bearer ${token}` } });

  }
  return await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/getUserinfo`);
}

export async function getProfileInfo(token?: string) {
  if (token) {
    return await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/getProfileinfo`, { headers: { "Authorization": `Bearer ${token}` } });

  }
  return await axios.get(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/getProfileinfo`);
}

export async function getProfileInfoById(userId: number) {
  const url = `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/getProfileinfoById/${userId}`;
  console.log(`Fetching profile for user ${userId} from URL: ${url}`);
  return await axios.get(url);
}

export async function setUserProfilePicture(imageFile: File) {
  const formData = new FormData();
  formData.append('image', imageFile);
  return await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/setProfilePicture`, formData);
}

export async function setUserUsername(newUsername: string) {
  try {
    return await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/setUsername`, { name: newUsername });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return error.response;
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
}
export async function setUserFirstName(newName: string) {
  try {
    return await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/setFirstName`, { name: newName });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return error.response;
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
}
export async function setUserLastName(newName: string) {
  try {
    return await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/setLastName`, { name: newName });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return error.response;
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
}
// added fields to make sure all required components are covered
export async function setUserAddress(addressDetails: Partial<{
  address: string;
  city: string;
  state: string;
  postalCode: string;
}>) {
  return await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/setAddress`, addressDetails);
}

export async function setPassword(newPassword: string) {
  return await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/setPassword`, { password: newPassword });
}

export async function sendPhoneConfirmationCode(newPhoneNumber: string) {
  try {
    const response = await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/send-sms-confirmation`, { phoneNumber: newPhoneNumber });
    if (response.status === 200) {
      return response.data.message;
    } else {

      return null;
    }
  } catch (error) {
    console.error('Error sending SMS:', error);
    return null;
  }
}

export async function setUserPhoneNumber(newPhoneNumber: string) {
  return await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/setPhoneNumber`, { number: newPhoneNumber });
}

export async function setUserEmail(newEmail: string) {
  return await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/setUserEmail`, { email: newEmail });
}

export async function deleteUserAccount() {
  const token = localStorage.getItem('token');
  return await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/deleteAccount`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}


export async function unsubscribeUser(userId: string) {
  try {
    const response = await axios.put(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/unsubscribe`, { subscribe: false },
      {
        params: {
          userId: userId
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400) {
        return error.response.data;
      }
      if (error.response?.status === 404) {
        return error.response.data;
      }
    }
    throw new Error('Failed to unsubscribe');
  }
}

export async function subscribeUser(userId: string) {
  try {
    const response = await axios.put(
      `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/subscribe`,
      {},
      {
        params: {
          userId: userId
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 400 || error.response?.status === 404) {
        return error.response.data;
      }
    }
    throw new Error('Failed to subscribe');
  }
}


interface SubscriptionStatusResponse {
  subscribed: boolean;
  error?: string;
}


export async function getSubscriptionStatus(userId: string): Promise<SubscriptionStatusResponse | null> {
  try {
    const response = await axios.get<SubscriptionStatusResponse>(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/getSubscriptionStatus`, {
      params: { userId },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching subscription status:', error.message);
    return null;
  }
}


export async function verifyPassword(password: any) {
  try {
    const response = await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/profile/profile/checkPassword`, { password });
    return response;
  } catch (error) {
    return error;
  }
}
export async function verifyEmail(email: string) {
  return await axios.post(`${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/user/email_verify`, { email });
}
