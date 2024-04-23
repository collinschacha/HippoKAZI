"use server";

import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import { handleError } from "../utils";
import { ObjectId } from "mongodb";

export async function createOrder(gig: any) {
  function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  console.log(gig);
  const stripeId = generateRandomNumber(1, 100);
  const newOrderId = new ObjectId(); // generate a new _id value for the new order

  try {
    await connectToDatabase();
    await Order.updateMany({}, { $unset: { stripeId: "" } });

    const newOrder = await Order.create({
      _id: newOrderId, // use the new _id value for the new order
      ...gig,
      event: gig._id,
      buyer: gig.organizer._id,
      price: gig.price,
      image: gig.imageUrl,
      title: gig.title,
      description: gig.description,
      organizer: gig.organizer._id,
      status: "true",
    });
    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
}

export async function getOrders(userId: string) {
  try {
    await connectToDatabase();

    const orders = await Order.find({
      buyer: userId, // filter orders by buyer
    }).populate("event");

    return {
      data: orders,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getOrdersAll() {
  try {
    await connectToDatabase();

    const orders = await Order.find({});

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error(error);
  }
}
