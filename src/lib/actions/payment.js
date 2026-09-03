"use server";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const subscription = async (sessionId, user) => {
  const res = await fetch(`${SERVER_URL}/subscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, userId: user?.id }),
  });

  const result = await res.json();
  return result;
};

export const payment = async (data) => {
  const res = await fetch(`${SERVER_URL}/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};
